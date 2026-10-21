---
title: "Blockbench animations on a custom model"
description: "Apoli 1.42.0 plays Bedrock .animation.json files on custom_model_render geometry: where the file goes, how a clip is chosen, what each channel does, and the timing rule that decides whether a one-shot ever plays again."
date: 2026-08-22
author: Overgrown
---

[`apoli:custom_model_render`](/docs/datapack/powers/custom_model_render) in geometry mode has drawn a Blockbench model on a player since Apoli 1.21.0. It followed the player's own limbs, and that was all the movement it had, so a pair of wings sat there rigidly, doing nothing wings do.

Apoli 1.42.0 adds an `animations` field. Blockbench already exports animations as a `.animation.json` next to the model. Apoli now reads that file and plays it, and a condition decides which clip plays. That last part is what makes it a data pack feature and more than a decoration: a list of conditions in priority order is a state machine, and a state machine is what an animated model needs.

This is the long version. If you only read one section, read [Timing, and the rule about one-shots](#timing-and-the-rule-about-one-shots).

## The five minute version

1. Model your thing in Blockbench as a Bedrock Model project.
2. Switch to the Animate tab, make an animation and keyframe it.
3. Save the animation. Blockbench writes `<model>.animation.json`.
4. Put it in `assets/example/animations/wings.animation.json`.
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

That plays `animation.wings.idle` forever, as long as you ticked Loop in Blockbench.

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

The ID drops the folder and the extension, exactly the way `model_location` does, so `example:wings` is `assets/example/animations/wings.animation.json`. A plain `.json` extension works too, and so do subfolders: `example:birds/wings` is `assets/example/animations/birds/wings.animation.json`.

Model and animation IDs are independent. They match in the example above because Blockbench names both files after the project, and Apoli doesn't require it.

Everything lives in assets, not data, and it's a render feature on the client: every player who should see the animation needs the resource pack. A data pack on the server alone gets you nothing.

On every resource reload, the log prints:

```
[Apoli] Loaded 7 custom model animation(s) from 2 file(s).
```

There are two numbers because "the file never loaded" and "the file loaded but the clip name is wrong" are different problems, and one number couldn't tell you which one you have.

## Exporting from Blockbench

There's nothing unusual here, since this is the format Blockbench writes by default for a Bedrock project.

- The project must be a Bedrock Model. Blockbench's Modded Entity format has its own animation exporter that writes Java source instead of a `.animation.json`, so a Java Entity project gives you nothing to point `animation` at.
- In the Animate tab, the animation's name is the key Apoli's `name` field matches. Blockbench's convention is `animation.<model>.<clip>`, such as `animation.wings.flap`. Keep it, because it keeps clips from different models apart in your head.
- The Loop dropdown on an animation maps straight through: Play Once, Loop and Hold On Last Frame all mean what they say. See [Timing](#timing-and-the-rule-about-one-shots).
- One file can hold as many clips as you like. That's the normal way to work, with one file per model and one clip per state.

A file with several clips looks like this, and the `name` field picks one of these keys:

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

Leave `name` out and you get the first clip in the file. That's fine for a file with one clip. Once there's more than one, write the name, because you don't want to depend on which clip comes first in a file you're still editing.

## Choosing a clip

`animations` takes one object or an array. The array is the interesting form, and it works exactly like [HUD Render](/docs/datapack/data-types/hud-render): entries are read from top to bottom, and the first one whose `condition` passes is the one that plays.

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

Three rules follow from the first match winning, and they're all you need to reason about a list of any length:

- Order is priority. Flapping beats gliding here because it's written first. Swap the two entries and a sneaking, elytra-flying player glides instead.
- An entry with no `condition` always passes, so it's a fallback, and anything after it can never be reached. Put it last, and put exactly one of them there.
- No match means no animation. Delete the idle entry and a player who is neither flying nor sneaking has wings that sit in whatever pose their body puts them in. That's a legitimate thing to want, and it's also the first thing to check when an animation seems to stop at random.

Conditions here are evaluated on the client, because this is a render layer. State the client can see works: pose, flags, equipment, resources, cooldowns, `power_active`, the world and the time. Conditions that only work on the server (`apoli:command`, `apoli:advancement`, `apoli:scoreboard`, `apoli:stat`, `apoli:predicate`, and `apoli:inventory` over power inventories) silently read false there. If a clip never plays and its condition is one of those, that's why.

## What the animation moves

An animation's `bones` are matched to your model's bones by name, using the same forgiving comparison as everywhere else in Apoli: case, spaces, `_` and `-` are all ignored. `Left_Wing`, `leftwing` and `LEFT WING` are the same bone.

Two behaviours are worth knowing about.

Body part bones get the animation and the player's motion. A bone named `right_arm` already follows the player's arm swing, and keyframing it adds your rotation on top of the swing without replacing it. That's what you want for a gauntlet that should shudder while it still swings, and the wrong thing if you meant to override the arm. If you want the animation alone, give the bone a name that isn't a body part.

Animating a body part also animates its second layer. Because `right_sleeve` binds to the `right_arm` slot, a channel on `right_arm` moves both bones, so you don't need a second channel for the sleeve, the jacket or the hat layer.

Bones your animation doesn't mention are left exactly where the model and the player's pose put them. You never have to keyframe a bone into place just to hold it still.

## The channels

Three are read: `position`, `rotation` and `scale`. They're in Blockbench's own units, so a value you read off the sidebar in the Animate tab is the value that lands in game.

| Channel | Unit | Neutral value | What it does |
| --- | --- | --- | --- |
| `position` | Model units (16 is one block) | `[0, 0, 0]` | Moves the bone relative to where the model puts it. |
| `rotation` | Degrees | `[0, 0, 0]` | Rotates the bone about its own pivot. |
| `scale` | A multiplier | `[1, 1, 1]` | Multiplies the bone's size. |

`rotation` is in degrees here, unlike [`apoli:modify_model_parts`](/docs/datapack/powers/modify_model_parts), which takes radians. There's a reason for the difference: `modify_model_parts` is a field you type by hand, while this is a number Blockbench wrote for you, and each matches what the author is looking at.

Everything is relative to the model's rest pose. A `position` of `[0, 2, 0]` lifts the bone two units above wherever you modelled it, which is what lets one animation work on two rigs that put the same bone in different places.

Rotation happens about the bone's own pivot, the same rule the [pivot advice for body part bones](/docs/datapack/powers/custom_model_render) is about. If a wing rotates around a point out in space instead of where it meets the back, the pivot is in the wrong place in the model, and no amount of editing the animation will fix it.

### Interpolation

Between two keyframes, values move linearly unless the keyframe asks for something else. Blockbench's stepped keyframes work too. They come across as a keyframe whose before and after values differ, and Apoli honours both sides, so the value jumps at that instant instead of sliding into it.

Since 1.43.0, smooth keyframes are smooth too: `lerp_mode: catmullrom` and GeckoLib's `easing` and `easingArgs` fields are read and applied. In 1.42.0 they were read but interpolated linearly, so a three keyframe swoop looked a little more mechanical than the Blockbench preview.

## Timing, and the rule about one-shots

Playback time is measured from the moment the selected entry changed. It isn't measured from when the power was granted, or from world time.

That one sentence explains the behaviour people find surprising, so here it is spelled out:

- A clip whose entry has just been selected starts at frame 0. A flap animation starts on the wind-up every time, wherever the world clock happens to be.
- A clip keeps playing as long as its entry stays selected. Evaluating the condition again doesn't restart it, and only a change of selection does.
- A Play Once clip therefore plays once and stops, and stays stopped until something else is selected and then it is selected again. If your one-shot fires the first time and never again, this is why. Nothing changed, so nothing restarted.

To make a one-shot repeat, give the selection something to change to and back. A [cooldown](/docs/datapack/powers/cooldown) or a [resource](/docs/datapack/powers/resource) that the trigger sets is the tidy way, because both are synced to the client and so the condition can see them:

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

Set `example:furl_timer` to, say, 8 and tick it down. While it's above zero, the furl clip is selected, and when it hits zero, the idle clip takes over. Set it again and the selection changes back, so the furl plays from frame 0 again.

### The three loop modes

| Blockbench | In the file | After the clip's length |
| --- | --- | --- |
| Play Once | `"loop": false`, or no `loop` | Nothing is applied, and the bones return to the pose the model and the body give them. |
| Loop | `"loop": true` | It starts over. |
| Hold On Last Frame | `"loop": "hold_on_last_frame"` | It freezes on the final frame. |

The `loop` field on the JSON entry overrides the file: `true` forces looping, and `false` forces playing once. There's no JSON spelling for hold on purpose. If you want a clip to hold, set it in Blockbench, where you can see the last frame you're holding.

The clip's length is its `animation_length`. If it has none, Apoli uses the time of the last keyframe.

### Speed

`speed` multiplies the playback rate, so `2.0` is twice as fast and `0.5` is half. It scales elapsed time, so a looping clip at `0.5` also takes twice as long to come round.

Changing `speed` doesn't restart the clip, since only a change of which clip is selected does that. It does shift where in the clip you are, because elapsed time is scaled by `speed` instead of being added up at it. At 5 seconds elapsed, `1.6` is 8 seconds into the clip and `2.5` is 12.5. On a short loop that's a frame's worth of pop and nobody will see it. On a long clip, change the speed at a moment where a jump doesn't matter.

## Worked examples

### A looping idle

This is the whole feature at its smallest. Tick Loop in Blockbench and there's nothing else to do.

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

### A creature with four states

Priority order is the whole design here. Read it from the top down as "if, else if, else".

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

`speed` is a plain number, not an [Expression](/docs/datapack/data-types/expression), so a rate that follows a resource is written as a short ladder of entries over the same clip. I actually prefer it to a formula, because each rung says what state it is:

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

All three rungs name the same clip, and the restart rule looks at which clip is selected, not which entry, so crossing a threshold changes the rate without sending the pulse back to frame 0. It skips forward a little, for the reason in [Speed](#speed), and on a one second pulse that's invisible.

### A minion with a life of its own

Geometry mode works on the minions from [`apoli:summon_minion`](/docs/datapack/entity-actions/summon_minion), and so do animations. Give the minion the power through the action's `powers` list:

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

The conditions on a minion's entries are evaluated against the minion, since the minion is what holds the power. That's why `apoli:sneaking` on a minion entry never fires: it asks whether the minion is sneaking. Since 1.44.0, wrap it in [`apoli:owner`](/docs/datapack/entity-conditions/owner) to ask about the summoner instead.

## What isn't supported

- Molang isn't evaluated. A keyframe whose value is a formula instead of a number reads as `0`. If Blockbench's variable placeholder panel appeared when you imported an animation, that animation uses Molang, and the affected channels will sit at zero. Bake the motion into keyframes.
- Sound, particle and timeline keyframes are ignored. They're server effects, and this is a render layer with no authority to fire them. Drive them from the same condition that selects the clip, with an [`apoli:action_over_time`](/docs/datapack/powers/action_over_time).
- `relative_to` is ignored, and every bone animates in its own frame.
- The limits on the model side are unchanged: only the first geometry in a `.geo.json` is read, and `uv_rotation` isn't supported.

## When it doesn't work

| What you see | Usually |
| --- | --- |
| Nothing moves, and the log says `Loaded 0 custom model animation(s)` | The file isn't under `assets/<ns>/animations/`, or the resource pack isn't enabled. |
| The log counts the file but nothing moves | The `name` doesn't match a key under `animations` in the file. Since 1.42.2, the log says so outright (`Animation file 'x' has no clip called 'y'`) and lists the clips the file does contain. |
| Every clip loads, every bone binds, and nothing moves at all | Apoli 1.42.1 and earlier only read keyframes written as a bare `[x, y, z]` array. The GeckoLib Blockbench plugin writes them as `{"vector": [x, y, z]}` instead, and every one of those read as zero. 1.42.2 fixes it. |
| Some bones move and others don't | The bone names differ between the `.geo.json` and the `.animation.json`. Matching ignores case, spaces, `_` and `-`, and nothing else. |
| A limb moves twice as far as it should | The bone is named after a body part, so it gets the player's motion plus the animation. Rename it if you meant to replace the motion. |
| The model takes a pose and then never moves | The clip has no keyframes over time. A channel written as a bare value, such as `"rotation": [-12.5, 0, -5]`, is one keyframe at 0:00, which Blockbench writes whenever a bone was only posed on the first frame. The clip is a static pose, and `loop` can't change that. A moving channel looks like `"rotation": {"0.0": [...], "0.5": [...]}`. Apoli applies the pose and says so in the log. |
| A clip plays once and never again, or you never see it play at all | This is the most common report, and it's the loop flag. Blockbench's loop mode defaults to Play Once and writes no `loop` key for it, so Apoli plays the clip once and then applies nothing. Playback only restarts when the selected entry changes, and a single entry with no `condition` never changes, so on a power that is always on, the clip runs once at login, before you're looking, and the model sits in its bind pose forever after. Set the clip to Loop in Blockbench, or put `"loop": true` on the entry. Since 1.42.2, the log names the problem. See [Timing](#timing-and-the-rule-about-one-shots). |
| A clip never plays, and its condition is `apoli:scoreboard`, `apoli:advancement`, `apoli:command`, `apoli:stat` or `apoli:predicate` | Those only work on the server and read false in a render layer. Since 1.43.1, one that throws is caught and skipped with a warning that names it, instead of breaking the render. |
| Adding conditions broke the whole `animations` block | Before 1.43.1, a single entry that didn't parse, such as one with a mistyped condition type, dropped the entire list, fallback included. It now skips only that entry and names it. |
| A conditioned pose snaps back while the condition is still true | The clip is Play Once, so it applies nothing after its last frame. Use `"loop": "hold_on_last_frame"` to freeze there instead. |
| Everything sits in a bind pose | No entry matched. Add a fallback entry with no `condition`, last. |
| It works for you and not for anyone else | They don't have the resource pack. |

## Getting it

Apoli 1.42.0 is out, with Origins 1.23.0 alongside it, for Fabric 1.21.1, Fabric 1.20.1 and NeoForge 1.21.1. The full field list is on [Model Animation](/docs/datapack/data-types/model-animation). The same release also brings [`apoli:fluid_vision`](/docs/datapack/powers/fluid_vision), which means water vision at last, along with the [`apoli:damage_would_kill`](/docs/datapack/entity-conditions/damage_would_kill) and [`apoli:critical`](/docs/datapack/damage-conditions/critical) conditions.
