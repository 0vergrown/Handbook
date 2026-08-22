---
title: "Blockbench animations on a custom model: a complete guide"
description: Apoli 1.42.0 plays Bedrock .animation.json files on Custom Model Render (Power Type) geometry. Where the file goes, how a clip is chosen, what each channel does, and the timing rule that decides whether a one-shot ever replays.
date: 2026-08-22
author: Overgrown
---

[`Custom Model Render (Power Type)`](/docs/datapack/powers/custom_model_render) in **geometry mode** has drawn a Blockbench model on a player since Apoli 1.21.0. It followed the player's own limbs, and that was all the movement it had — a pair of wings sat there, rigidly, doing nothing wings do.

Apoli **1.42.0** adds an `animations` field. Blockbench already exports animations as a `.animation.json` next to the model; Apoli now reads that file and plays it, and *which* clip plays is decided by a condition. That last part is what makes it a data-pack feature rather than a decoration: a list of conditions in priority order is a state machine, and a state machine is what an animated model needs.

This is the long version. If you only read one section, read [Timing, and the rule about one-shots](#timing-and-the-rule-about-one-shots).

## The five-minute version

1. Model your thing in Blockbench as a **Bedrock Model** project.
2. Switch to the **Animate** tab, make an animation, keyframe it.
3. Save the animation. Blockbench writes `<model>.animation.json`.
4. Drop it in `assets/example/animations/wings.animation.json`.
5. Point a power at it:

```json
{
  "type": "apoli:custom_model_render",
  "mode": "geometry",
  "model_location": "example:wings",
  "texture_location": "example:textures/entity/wings.png",
  "render_type": "cutout_no_cull",
  "animations": {
    "animation": "example:wings",
    "name": "animation.wings.idle"
  }
}
```

That plays `animation.wings.idle` forever, if you ticked **Loop** in Blockbench.

## Where the file goes

```
assets/
  example/
    geo/
      wings.geo.json                 <- model_location: "example:wings"
    animations/
      wings.animation.json           <- animation:      "example:wings"
    textures/entity/
      wings.png                      <- texture_location
```

The identifier drops the folder and the extension, exactly the way `model_location` does. `example:wings` is `assets/example/animations/wings.animation.json`. A plain `.json` extension works too, and subfolders work: `example:birds/wings` is `assets/example/animations/birds/wings.animation.json`.

Model and animation ids are independent. They match in the example above because Blockbench names both files after the project, not because Apoli requires it.

Everything lives in **assets**, not data, and it is a client-side render feature: every player who should see the animation needs the resource pack. A server-side data pack alone gets you nothing.

On every resource reload the log prints:

```
[Apoli] Loaded 7 custom model animation(s) from 2 file(s).
```

Two numbers, because "the file never loaded" and "the file loaded but the clip name is wrong" are different problems and one number cannot tell you which you have.

## Exporting from Blockbench

Nothing unusual — this is the format Blockbench writes by default for a Bedrock project.

- The project must be a **Bedrock Model**. Blockbench's Modded Entity format has its own animation exporter that emits Java source rather than a `.animation.json`, so a Java Entity project gives you nothing to point `animation` at.
- In the **Animate** tab, the animation's name is the key Apoli's `name` field matches. Blockbench's convention is `animation.<model>.<clip>`, e.g. `animation.wings.flap` — keep it, it keeps clips from different models apart in your head.
- The **Loop** dropdown on an animation maps straight through: *Play Once*, *Loop*, and *Hold On Last Frame* all mean what they say. See [Timing](#timing-and-the-rule-about-one-shots).
- One file can hold as many clips as you like. That is the normal way to work — one file per model, one clip per state.

A file with several clips looks like this, and the `name` field is picking one of these keys:

```json
{
  "format_version": "1.8.0",
  "animations": {
    "animation.wings.idle": {
      "loop": true,
      "animation_length": 4,
      "bones": {
        ...
      }
    },
    "animation.wings.flap": {
      "loop": true,
      "animation_length": 0.6,
      "bones": {
        ...
      }
    },
    "animation.wings.furl": {
      "loop": false,
      "animation_length": 0.4,
      "bones": {
        ...
      }
    }
  }
}
```

Leave `name` out and you get the **first** clip in the file. Fine for a one-clip file; write the name once there is more than one, because "first in the file" is not something you want to be depending on while you are still editing it.

## Choosing a clip

`animations` takes one object, or an array. The array is the interesting form, and it works exactly like [`HUD Render (Data Type)`](/docs/datapack/data-types/hud-render): entries are read **top to bottom**, and the **first** one whose `condition` passes is the one that plays.

```json
"animations": [
  {
    "animation": "example:wings",
    "name": "animation.wings.flap",
    "condition": {
      "type": "apoli:fall_flying"
    }
  },
  {
    "animation": "example:wings",
    "name": "animation.wings.glide",
    "condition": {
      "type": "apoli:sneaking"
    }
  },
  {
    "animation": "example:wings",
    "name": "animation.wings.idle"
  }
]
```

Three rules fall out of "first match wins", and they are all you need to reason about a list of any length:

- **Order is priority.** Flapping beats gliding here because it is written first. Swap the two entries and a sneaking, elytra-flying player glides instead.
- **An entry with no `condition` always passes**, so it is a fallback — and anything after it is unreachable. Put it last, and put exactly one of them there.
- **No match means no animation.** Delete the idle entry and a player who is neither flying nor sneaking has wings that sit in whatever pose their body puts them in. That is a legitimate thing to want; it is also the first thing to check when an animation "randomly stops".

Conditions here are evaluated on the **client**, because this is a render layer. Client-visible state — pose, flags, equipment, resources, cooldowns, `power_active`, the world and the time — all works. Server-only conditions (`apoli:command`, `apoli:advancement`, `apoli:scoreboard`, `apoli:stat`, `apoli:predicate`, and `apoli:inventory` over power inventories) silently read **false** there. If a clip never plays and its condition is one of those, that is why.

## What the animation moves

An animation's `bones` are matched to your model's bones **by name**, and the matching is the same forgiving comparison used everywhere else in Apoli: case, spaces, `_` and `-` are all ignored. `Left_Wing`, `leftwing` and `LEFT WING` are the same bone.

Two behaviours are worth knowing about:

**Body-part bones get the animation *and* the player's motion.** A bone named `right_arm` is already following the player's arm swing. Keyframing it adds your rotation on top of the swing rather than replacing it — which is what you want for a gauntlet that should shudder while still swinging, and not what you want if you meant to override the arm. If you want the animation alone, give the bone a name that is not a body part.

**Animating a body part also animates its second layer.** Because `right_sleeve` binds to the `right_arm` slot, a channel on `right_arm` moves both bones. You do not need a second channel for the sleeve, the jacket or the hat layer.

Bones your animation does not mention are left exactly where the model and the player's pose put them. You never have to keyframe a bone into place just to hold it still.

## The channels

Three are read: `position`, `rotation` and `scale`. They are in Blockbench's own units, so a value you read off the Animate tab's sidebar is the value that lands in game.

| Channel | Unit | Neutral value | What it does |
| --- | --- | --- | --- |
| `position` | model units (16 = one block) | `[0, 0, 0]` | Moves the bone relative to where the model puts it. |
| `rotation` | **degrees** | `[0, 0, 0]` | Rotates the bone about its own pivot. |
| `scale` | multiplier | `[1, 1, 1]` | Multiplies the bone's size. |

Note that `rotation` is in **degrees** here, unlike [`Modify Model Parts (Power Type)`](/docs/datapack/powers/modify_model_parts), which takes radians. The difference is not arbitrary: `modify_model_parts` is a field you type by hand, and this is a number Blockbench wrote for you. Both match the thing the author is looking at.

Everything is **relative to the model's rest pose**, not absolute. A `position` of `[0, 2, 0]` lifts the bone two units above wherever you modelled it. This is what lets one animation work on two rigs that put the same bone in different places.

Rotation happens about the bone's **own pivot**, which is the same rule the [pivot advice for body-part bones](/docs/datapack/powers/custom_model_render) is about. If a wing rotates around a point out in space rather than where it meets the back, the pivot is in the wrong place in the *model*, and no amount of editing the animation will fix it.

### Interpolation

Between two keyframes, values move linearly. Blockbench's **stepped** keyframes work too — they come across as a keyframe whose "before" and "after" values differ, and Apoli honours both sides, so the value jumps at that instant instead of sliding into it.

Catmull-Rom (smooth) keyframes are read, but they are interpolated linearly. On a dense animation the difference is invisible; on a three-keyframe swoop it will look a little more mechanical than the Blockbench preview. Add a keyframe or two if it matters.

## Timing, and the rule about one-shots

Playback time is measured from the moment **the selected entry changed**. Not from when the power was granted, not from world time.

That single sentence explains the behaviour people find surprising, so it is worth spelling out:

- A clip whose entry has just been selected starts at frame 0. A flap animation starts on the wind-up, every time, rather than wherever the world clock happened to be.
- A clip keeps playing as long as its entry stays selected. It does **not** restart because the condition was re-evaluated, only because the *selection* changed.
- **A `Play Once` clip therefore plays once and stops** — and stays stopped until something else gets selected and then it gets selected again. If your one-shot fires the first time and never again, this is why, and it is not a bug: nothing changed, so nothing restarted.

The fix for a one-shot that should repeat is to give the selection something to change to and back. A [`Cooldown (Power Type)`](/docs/datapack/powers/cooldown) or a [`Resource (Power Type)`](/docs/datapack/powers/resource) that the trigger sets is the tidy way, because both are synced to the client and so are visible to the condition:

```json
"animations": [
  {
    "animation": "example:wings",
    "name": "animation.wings.furl",
    "loop": false,
    "condition": {
      "type": "apoli:resource",
      "resource": "example:furl_timer",
      "comparison": ">",
      "compare_to": 0
    }
  },
  {
    "animation": "example:wings",
    "name": "animation.wings.idle"
  }
]
```

Set `example:furl_timer` to, say, 8 and tick it down. While it is above zero the furl clip is selected; when it hits zero the idle clip takes over. Set it again and the selection changes back — so the furl plays from frame 0 again.

### The three loop modes

| Blockbench | In the file | After the clip's length |
| --- | --- | --- |
| Play Once | `"loop": false` or absent | Nothing is applied — the bones return to the pose the model and the body give them. |
| Loop | `"loop": true` | Starts over. |
| Hold On Last Frame | `"loop": "hold_on_last_frame"` | Freezes on the final frame. |

The `loop` field on the JSON entry overrides the file: `true` forces looping, `false` forces play-once. There is deliberately no JSON spelling for *hold* — if you want a clip to hold, set it in Blockbench, where you can see the last frame you are holding.

The clip's length is its `animation_length`. If it has none, Apoli uses the time of the last keyframe.

### Speed

`speed` multiplies playback rate: `2.0` is twice as fast, `0.5` is half. It scales elapsed time, so a looping clip at `0.5` also takes twice as long to come round.

Changing `speed` does **not** restart the clip — only a change of *which* clip is selected does that. It does shift where in the clip you are, because elapsed time is scaled by `speed` rather than accumulated at it: at 5 seconds elapsed, `1.6` is 8 seconds into the clip and `2.5` is 12.5. On a short loop that is a frame's worth of pop and nobody will see it; on a long clip, change speed at a moment where a jump does not matter.

## Worked examples

### A looping idle

The whole feature, minimally. Tick **Loop** in Blockbench and there is nothing else to do.

```json
{
  "type": "apoli:custom_model_render",
  "mode": "geometry",
  "model_location": "example:tail",
  "texture_location": "example:textures/entity/tail.png",
  "render_type": "cutout_no_cull",
  "animations": {
    "animation": "example:tail",
    "name": "animation.tail.sway"
  }
}
```

### A four-state creature

Priority order is the whole design. Read it top to bottom as "if… else if… else".

```json
{
  "type": "apoli:custom_model_render",
  "mode": "geometry",
  "model_location": "example:wings",
  "texture_location": "example:textures/entity/wings.png",
  "render_type": "cutout_no_cull",
  "show_first_person": true,
  "animations": [
    {
      "animation": "example:wings",
      "name": "animation.wings.flap",
      "condition": {
        "type": "apoli:fall_flying"
      }
    },
    {
      "animation": "example:wings",
      "name": "animation.wings.beat",
      "condition": {
        "type": "apoli:sprinting"
      },
      "speed": 1.6
    },
    {
      "animation": "example:wings",
      "name": "animation.wings.furled",
      "condition": {
        "type": "apoli:sneaking"
      }
    },
    {
      "animation": "example:wings",
      "name": "animation.wings.idle"
    }
  ]
}
```

### One clip at three speeds

`speed` is a plain number, not an [`Expression`](/docs/datapack/data-types/expression), so a rate that tracks a resource is written as a short ladder of entries over the same clip. That is not a workaround — it reads better than a formula, because each rung says what state it is:

```json
"animations": [
  {
    "animation": "example:core",
    "name": "animation.core.pulse",
    "speed": 2.5,
    "condition": {
      "type": "apoli:resource",
      "resource": "example:charge",
      "comparison": ">=",
      "compare_to": 15
    }
  },
  {
    "animation": "example:core",
    "name": "animation.core.pulse",
    "speed": 1.6,
    "condition": {
      "type": "apoli:resource",
      "resource": "example:charge",
      "comparison": ">=",
      "compare_to": 5
    }
  },
  {
    "animation": "example:core",
    "name": "animation.core.pulse"
  }
]
```

All three rungs name the same clip, and the restart rule keys off *which clip* is selected rather than which entry — so crossing a threshold changes the rate without sending the pulse back to frame 0. It will skip forward a little, for the reason in [Speed](#speed); on a one-second pulse that is invisible.

### A minion with a life of its own

Geometry mode works on the minions from [`Summon Minion (Entity Action Type)`](/docs/datapack/entity-actions/summon_minion), and so do animations. Give the minion the power through the action's `powers` list:

```json
{
  "type": "apoli:summon_minion",
  "follow_owner": true,
  "follow_offset": [
    0,
    1.2,
    -0.8
  ],
  "max_life_ticks": 0,
  "powers": [
    "example:wisp_model"
  ]
}
```

```json
{
  "type": "apoli:custom_model_render",
  "mode": "geometry",
  "model_location": "example:wisp",
  "texture_location": "example:textures/entity/wisp.png",
  "render_type": "cutout_no_cull",
  "animations": {
    "animation": "example:wisp",
    "name": "animation.wisp.hover"
  }
}
```

The conditions on a minion's entries are evaluated against **the minion**, not its owner — it is the minion that holds the power.

## What is not supported

- **Molang is not evaluated.** A keyframe whose value is a formula rather than a number reads as `0`. If Blockbench's variable-placeholder panel appeared when you imported an animation, that animation uses Molang and the affected channels will sit at zero. Bake the motion into keyframes.
- **Sound, particle and timeline keyframes are ignored.** They are server-side effects, and this is a render layer with no authority to fire them. Drive them from the same condition that selects the clip, with an [`Action Over Time (Power Type)`](/docs/datapack/powers/action_over_time).
- **`relative_to` is ignored** — every bone animates in its own frame.
- The model-side limits are unchanged: only the first geometry in a `.geo.json` is read, and `uv_rotation` is not supported.

## When it does not work

| What you see | Usually |
| --- | --- |
| Nothing moves, and the log says `Loaded 0 custom model animation(s)` | The file is not under `assets/<ns>/animations/`, or the resource pack is not enabled. |
| The log counts the file but nothing moves | The `name` does not match a key under `animations` in the file. Leave `name` out to test with the first clip. |
| Some bones move, others do not | Bone names differ between the `.geo.json` and the `.animation.json`. Matching ignores case, spaces, `_` and `-`, but nothing else. |
| A limb moves *twice as far* as it should | The bone is named after a body part, so it is getting the player's motion plus the animation. Rename it if you meant to replace the motion. |
| A clip plays once and never again | Working as intended — see [Timing](#timing-and-the-rule-about-one-shots). |
| A clip never plays, and its condition is `apoli:scoreboard` / `apoli:advancement` / `apoli:command` / `apoli:stat` / `apoli:predicate` | Those are server-only and read false in a render layer. |
| Everything sits in a bind pose | No entry matched. Add a fallback entry with no `condition`, last. |
| It works for you and not for anyone else | They do not have the resource pack. |

## Getting it

Apoli **1.42.0**, with Origins **1.23.0** alongside it, for Fabric 1.21.1, Fabric 1.20.1 and NeoForge 1.21.1. The full field list is on [`Model Animation (Data Type)`](/docs/datapack/data-types/model-animation), and the same release also brings [`Fluid Vision (Power Type)`](/docs/datapack/powers/fluid_vision) — water vision, at last — along with the [`Damage Would Kill`](/docs/datapack/entity-conditions/damage_would_kill) and [`Critical`](/docs/datapack/damage-conditions/critical) conditions.
