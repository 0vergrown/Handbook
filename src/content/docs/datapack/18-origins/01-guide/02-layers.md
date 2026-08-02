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

> The origins in a gated group must be **choosable** (`"unchoosable": true` excludes them). An unchoosable origin never appears as an option and `auto_choose` will not pick it.

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
