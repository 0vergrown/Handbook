---
title: Layers
description: The slots players choose origins from — and how to add to them.
---

A **layer** is a choice a player makes. The base Origins mod ships one layer — `origins:origin` — and that's the "pick your origin" screen everyone knows. Layers are what actually put [origins](/docs/datapack/origins/overview) in front of players; an origin not in any layer is invisible.

You can add origins to the existing layer, or define brand-new layers (a second, independent choice — say a "class" alongside an "origin").

## A layer file

Layers live in `data/<namespace>/origin_layers/`.

```json
{
  "order": 0,
  "enabled": true,
  "name": "layer.my_pack.origin.name",
  "origins": [
    "my_pack:merling",
    "my_pack:ember",
    "origins:human"
  ]
}
```

## Core fields

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `origins` | list of [conditioned origin](#conditioned-origins) | *required* | The origins offered in this layer. |
| `order` | integer | `0` | Order when several layers are chosen in turn. Lowest first. |
| `enabled` | boolean | `true` | Whether the layer is active. |
| `name` | string | `layer.<ns>.<path>.name` | **Translation key** for the layer's title. |
| `gui_title` | object | `{}` | `choose_origin` and `view_origin` translation keys for the two screens. |
| `missing_name` | string | `""` | Translation key shown when the player has no origin in this layer. |
| `missing_description` | string | `""` | Translation key for that placeholder's description. |
| `default_origin` | identifier | — | Fallback for players this layer offers no choice to. |
| `auto_choose` | boolean | `false` | Skip the screen when the layer offers exactly one choosable origin. |
| `hidden` | boolean | `false` | Hide the layer from the origin-viewing screen. |
| `revalidate` | boolean | = `auto_choose` | Take the origin back when its group's condition stops being true — see [Keeping vs. offering](#keeping-vs-offering). |
| `random` | object | — | Random-roll settings — see [Randomised layers](#randomised-layers). |
| `randomiser` | object | — | Re-roll-over-a-life settings — see [Lifecycle & re-rolls](#lifecycle--re-rolls). |
| `replace` | boolean | `false` | Discard lower-priority packs' version of this layer instead of merging into it. |

> `name`, `missing_name`, `missing_description` and both `gui_title` entries are **translation keys**, not literal text. Put the display string in your pack's language file. A raw string still "works" — an unknown key renders as itself — but it will not translate.

## Conditioned origins

An entry in `origins` is either a plain identifier, or an object that gates a group of origins behind an entity condition — any of them, including [origins:origin](/docs/datapack/origins/origin) itself. The two forms mix freely in one list.

```json
{
   "order":2,
   "auto_choose":true,
   "hidden":true,
   "name":"layer.my_pack.evolved.name",
   "origins":[
      {
         "condition":{
            "type":"origins:origin",
            "layer":"origins:origin",
            "origin":"my_pack:ember"
         },
         "origins":[
            "my_pack:ember_evolved"
         ]
      },
      {
         "condition":{
            "type":"origins:origin",
            "layer":"origins:origin",
            "origin":"my_pack:ember",
            "inverted":true
         },
         "origins":[
            "my_pack:unevolved"
         ]
      }
   ]
}
```

The condition is re-evaluated every time the layer's options are listed, so a layer can react to what the player picked in an earlier layer, to a [resource](/docs/datapack/powers/resource) value, or to anything else an entity condition can see.

> An `"unchoosable": true` origin never appears as a button, so a gated group made of them offers the player nothing to pick. That is exactly what a [derived layer](#derived-layers) wants — with `auto_choose` set they are still assigned — but on a layer the player is meant to choose in, it means the layer is skipped entirely.

### Combining conditions

Groups take any [entity condition](/docs/datapack/entity-conditions), so `origins:and` / `origins:or` nest normally and `"inverted": true` works on the whole group or on any condition inside it.

Watch the logic. "Neither ember nor frost" is an **and** of two inverted checks — an `or` of two inverted checks is true for every player, because nobody has two origins in the same layer at once:

```json
"condition":{
  "type": "origins:and",
  "conditions": [
    {
      "type": "origins:origin",
      "layer": "origins:origin",
      "origin": "my_pack:ember",
      "inverted": true
    },
    {
      "type": "origins:origin",
      "layer": "origins:origin",
      "origin": "my_pack:frost",
      "inverted": true
    }
  ]
}
```

Inverting the whole `or` says the same thing, if you prefer it that way:

```json
"condition":{
  "type": "origins:or",
  "inverted": true,
  "conditions": [
    {
      "type": "origins:origin",
      "layer": "origins:origin",
      "origin": "my_pack:ember"
    },
    {
      "type": "origins:origin",
      "layer": "origins:origin",
      "origin": "my_pack:frost"
    }
  ]
}
```

> A group whose condition is accidentally always true keeps its origins permanently on the offer list. If that pushes the layer to two options, `auto_choose` stops firing and the player gets a choose screen instead — the usual symptom of a mixed-up `and`/`or`.

## Keeping vs. offering

There are two kinds of conditioned layer, and they want opposite things:

- A layer the **player chooses in** should keep whatever they picked. A gate like "you may only pick Vampire at night" is about the moment of choosing; taking the origin back at sunrise would be absurd.
- A layer the pack **derives** — one group per state, each yielding a single origin, granted rather than picked — has to keep tracking, or it goes stale the moment the thing it mirrors changes.

`auto_choose` already tells the two apart, so it is the default for `revalidate`. A layer that auto-chooses re-checks its conditions at every reconcile point (join, data-pack reload, orb, and every origin the player picks) and **swaps itself over** when they change; a layer with a real choice never revokes. Set `revalidate` explicitly to override either way.

A revalidating layer only ever switches from one origin to another — it is never emptied. If its conditions stop naming a single origin (none of the groups match, or two do), the player keeps what they already had, falling back to `default_origin` when the layer defines one. Losing a layer's powers with nothing to replace them is always a bug, so the engine will not do it.

### Derived layers

This is the pattern — a hidden layer that follows the main layer's choice:

```json
{
  "auto_choose": true,
  "hidden": true,
  "order": 30,
  "origins": [
    {
      "condition": {
        "type": "origins:origin",
        "layer": "origins:origin",
        "origin": "my_pack:ember"
      },
      "origins": [
        "my_pack:ember_marker"
      ]
    },
    {
      "condition": {
        "type": "origins:origin",
        "layer": "origins:origin",
        "origin": "my_pack:ember",
        "inverted": true
      },
      "origins": [
        "my_pack:no_marker"
      ]
    }
  ]
}
```

Three things make that work, and all three are easy to get wrong:

- **Each group must resolve to exactly one origin.** Groups that can both be true at once leave the layer with two options, which is a choice — so `auto_choose` stops and the player gets a screen. This is the usual symptom of a mixed-up `and`/`or`.
- **`unchoosable` origins are fine here.** A derived layer normally marks its origins `"unchoosable": true` so they never show up in any GUI. A layer with `auto_choose` still assigns them, because there was never a choice to skip.
- **It waits for what it reads.** A layer whose groups test [origins:origin](/docs/datapack/origins/origin) is not decided until *that* layer has been settled — otherwise "the player has neither X nor Y" would be vacuously true during the very first choose screen and the layer would commit to the wrong branch. Only the layers it actually names hold it up; an unrelated layer the player has yet to pick does not. (An origin check with no `layer` field matches against every layer, so it waits for all of them.)

> Revalidation runs on reconcile points, not every tick. A condition on something transient (weather, health, time of day) will not track it live — it settles on the next join, reload, orb use or origin choice.

#### One branch per state, not one per origin

The two groups of a derived layer are each other's complement. Write the condition **once**, as a list, and invert it for the other branch — that way adding a new origin later means editing one list, not rebalancing an `and`/`or` on both sides:

```json
{
  "auto_choose": true,
  "hidden": true,
  "order": 30,
  "origins": [
    {
      "condition": {
        "type": "origins:origin",
        "layer": "origins:origin",
        "origin": [
          "my_pack:base",
          "my_pack:aliens/*"
        ]
      },
      "origins": [
        "my_pack:has_device"
      ]
    },
    {
      "condition": {
        "type": "origins:origin",
        "layer": "origins:origin",
        "origin": [
          "my_pack:base",
          "my_pack:aliens/*"
        ],
        "inverted": true
      },
      "origins": [
        "my_pack:no_device"
      ]
    }
  ]
}
```

The `*` wildcard is what keeps this from becoming a list of every origin in the pack. See [origins:origin](/docs/datapack/origins/origin) for the pattern syntax.

### Overriding a derived layer by hand

`/origin set` **pins** the layer it touches: an origin an operator, a GUI pick, an [Orb of Origin](/docs/datapack/origins/overview), or a power's action puts there is not re-derived, even on a `revalidate` layer whose conditions disagree. Without that, setting a derived layer by command would appear to succeed and be undone in the same tick.

To hand the layer back to its conditions, clear it:

```
/origin set @s my_pack:device origins:empty
```

The pin is also dropped if a data-pack change removes the pinned origin from the layer entirely.

> Only `origins:origin` names a layer, so that is the only dependency the game can see. A derived layer gated on something *downstream* of another layer — a power that origin grants, say — is decided immediately and then corrected by revalidation on the next reconcile, rather than waiting. Condition it on the origin directly if you want it right first time.

## `auto_choose` and `default_origin`

These are how a conditioned layer grants an origin without ever showing a screen — the pattern above needs one of them, or the player is asked to "choose" from a list of one.

- **`auto_choose`** — when the layer offers **exactly one** choosable origin for that player, it is assigned silently and no screen opens. With two or more options the player still chooses normally.
- **`default_origin`** — the fallback for a layer the player is **never asked about**. It is applied only when the layer offers them nothing choosable and no random roll, on join and on data-pack reload. A layer that *can* be chosen always shows its screen — `default_origin` never pre-empts a real choice.

Both are re-checked on join, on data-pack reload, after every origin the player picks, and on Orb of Origin use — so a layer whose condition only becomes true *after* an earlier layer is chosen resolves in the same breath as that choice.

## Adding to an existing layer

To drop your origins into the vanilla Origins screen, define a layer with the **same id** — `origins:origin` — in your own pack listing just your origins. Origins merges layers that share an id across data packs, so your entries appear alongside the built-in ones rather than replacing them.

```json
// data/origins/origin_layers/origin.json  (in your pack)
{
   "origins":[
      "my_pack:merling",
      "my_pack:ember"
   ]
}
```

Set `"replace": true` in the higher-priority pack to throw the merged result away and use only your file.

## Randomised layers

Layers can hand out a **random** origin instead of letting the player choose — the basis for "random origin" servers. Everything lives in the `random` object:

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `allow` | boolean | `true` | Offer the "random" option in the screen. |
| `allow_unchoosable` | boolean | `false` | Let the roll land on unchoosable origins. |
| `exclude` | list of identifier | — | Origins the roll never picks. |
| `style` | string | `"uniform"` | `uniform`, `weighted`, or `roll` (alias `gacha`) for the rolling animation. |
| `weights` | map of identifier → integer | `{}` | Per-origin weighting, for `style: weighted`. |
| `roll_duration` | integer | `80` | Animation length in ticks, for `style: roll`. |

```json
{
   "origins":[
      "my_pack:merling",
      "my_pack:ember"
   ],
   "random":{
      "allow":true,
      "style":"weighted",
      "weights":{
         "my_pack:ember":3
      }
   }
}
```

> The flat `allow_random`, `allow_random_unchoosable` and `exclude_random` fields are the pre-`random`-block spelling and still load. A `random` block wins over all three.

## Lifecycle & re-rolls

The `randomiser` object controls what happens over a life:

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `on_first_join` | boolean | `false` | Roll an origin when the player first joins. |
| `on_death` | boolean | `false` | Re-roll on death. |
| `on_sleep` | boolean | `false` | Re-roll after sleeping. |
| `deaths_between_randomises` | integer | `1` | Deaths required before a re-roll. |
| `sleeps_between_randomises` | integer | `1` | Sleeps required before a re-roll. |
| `lives` | object | `{}` | `enabled` (boolean, `false`) and `starting` (integer, `10`) — lives before the layer locks. |
| `reset_to_default_on_death` | boolean | `false` | Revert to `default_origin` on death instead of re-rolling. |
| `show_screen_on_death` | boolean | `false` | Open the choose screen on death rather than rolling. |
| `allow_duplicate` | boolean | `false` | Let a re-roll land on the origin the player already had. |
| `broadcast_messages` | boolean | `true` | Announce re-rolls in chat. |

> These options are how "hardcore origins", "randomiser", and "one life per origin" servers are configured — all in JSON, no code.
