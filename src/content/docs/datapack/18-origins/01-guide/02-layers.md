---
title: Layers
description: "The slots players choose origins from, and how to add to them."
---

A layer is one choice a player makes. The base Origins mod ships one layer, `origins:origin`, which is the familiar "pick your origin" screen. Layers are what put [origins](/docs/datapack/origins/overview) in front of players, and an origin that isn't in any layer can't be seen.

You can add origins to the existing layer, or define new layers that each make a separate choice, such as a class alongside an origin.

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

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `origins` | [Array](/docs/datapack/data-types/array) of [conditioned origins](#conditioned-origins) | _required_ | The origins offered in this layer. |
| `order` | [Integer](/docs/datapack/data-types/integer) | `0` | The order in which several layers are chosen, lowest first. |
| `enabled` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether the layer is active. |
| `name` | [String](/docs/datapack/data-types/string) | _a translation key_ | The translation key for the layer's title. Without it, `layer.<namespace>.<path>.name` is used. |
| `gui_title` | [Object](/docs/datapack/data-types/object) | `{}` | The translation keys `choose_origin` and `view_origin` for the two screens. They fall back to `layer.<namespace>.<path>.choose_origin.name` and `layer.<namespace>.<path>.view_origin.name`. |
| `missing_name` | [String](/docs/datapack/data-types/string) | `""` | The translation key shown when the player has no origin in this layer. |
| `missing_description` | [String](/docs/datapack/data-types/string) | `""` | The translation key for that placeholder's description. |
| `default_origin` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | The origin a player gets when they join without one in this layer, so the layer's choose screen doesn't open for them (see [`auto_choose` and `default_origin`](#auto_choose-and-default_origin)). |
| `auto_choose` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Skips the screen when the layer offers exactly one choosable origin. |
| `hidden` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Hides the layer from the origin view screen. A hidden layer's origin is also left off [grave inscriptions](/docs/addon/api/grave-inscriptions). |
| `revalidate` | [Boolean](/docs/datapack/data-types/boolean) | _the value of `auto_choose`_ | Takes the origin back when its group's condition stops being true (see [Keeping vs. offering](#keeping-vs-offering)). |
| `swappable` | [Boolean](/docs/datapack/data-types/boolean) or [Object](/docs/datapack/data-types/object) | `false` | Makes this layer a pool the player can temporarily swap their main origin for, instead of a layer they choose in (see [Swappable layers](/docs/datapack/origins/swapping)). |
| `random` | [Object](/docs/datapack/data-types/object) | _optional_ | The random roll settings (see [Randomised layers](#randomised-layers)). |
| `randomiser` | [Object](/docs/datapack/data-types/object) | _optional_ | The settings for re-rolling over a life (see [Lifecycle and re-rolls](#lifecycle-and-re-rolls)). |
| `max_players_per_origin` | [Integer](/docs/datapack/data-types/integer) | `0` | The default player cap for every origin in this layer (see [Capping a whole layer](#capping-a-whole-layer)). |
| `replace` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Discards lower-priority packs' versions of this layer instead of merging into them. |

> [!NOTE]
> `name`, `missing_name`, `missing_description` and both `gui_title` entries are translation keys, not literal text. Put the display string in your pack's language file. A raw string still shows, because an unknown key renders as itself, but it won't translate.

## Conditioned origins

An entry in `origins` is either an identifier or an object that gates a group of origins behind an entity condition. Any entity condition works, including [origins:origin](/docs/datapack/origins/origin) itself, and the two forms can be mixed in one list.

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

The condition is checked again every time the layer's options are listed, so a layer can react to what the player picked in an earlier layer, to a [resource](/docs/datapack/powers/resource) value, or to anything else an entity condition can see.

> [!NOTE]
> An origin with `"unchoosable": true` never appears as a button, so a gated group made of them offers the player nothing to pick. A [derived layer](#derived-layers) wants exactly that, and with `auto_choose` set its origins are still assigned. On a layer the player is meant to choose in, it means the layer is skipped entirely.

### Combining conditions

Groups take any [entity condition](/docs/datapack/entity-conditions), so `origins:and` and `origins:or` nest normally, and `"inverted": true` works on the whole group or on any condition inside it.

Watch the logic. "Neither ember nor frost" is an `and` of two inverted checks. An `or` of two inverted checks is true for every player, because nobody has two origins in the same layer at once:

```json
"condition":{
  "type": "apoli:and",
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

Inverting the whole `or` says the same thing:

```json
"condition":{
  "type": "apoli:or",
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

> [!WARNING]
> A group whose condition is always true by mistake keeps its origins on the offer list permanently. If that brings the layer to two options, `auto_choose` stops working and the player gets a choose screen instead, which is the usual sign of a mixed-up `and` and `or`.

## Keeping vs. offering

There are two kinds of conditioned layer, and they need opposite things:

- A layer the player chooses in should keep whatever they picked. A gate like "you can only pick Vampire at night" is about the moment of choosing, and taking the origin back at sunrise would make no sense.
- A layer the pack derives, with one group per state that each give a single origin, granted instead of picked, has to keep tracking, or it goes stale as soon as the thing it mirrors changes.

`auto_choose` already tells the two apart, so it is the default for `revalidate`. A layer that auto-chooses checks its conditions again at every reconcile point (join, data pack reload, orb use and every origin the player picks) and switches its origin over when they change. A layer with a real choice never revokes. Set `revalidate` explicitly to override either way.

A revalidating layer only ever switches from one origin to another and is never emptied. If its conditions stop naming a single origin (none of the groups match, or two do), the player keeps what they already had, with `default_origin` as the fallback when the layer defines one. Losing a layer's powers with nothing to replace them is always a bug, so Origins never does it.

### Derived layers

A derived layer is a hidden layer that follows the main layer's choice:

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

Three things make it work, and all three are easy to get wrong:

- Each group must resolve to exactly one origin. Groups that can both be true at once leave the layer with two options, which is a choice, so `auto_choose` stops and the player gets a screen. This is the usual sign of a mixed-up `and` and `or`.
- `unchoosable` origins are fine here. A derived layer normally marks its origins `"unchoosable": true` so they never show up in any screen, and a layer with `auto_choose` still assigns them, because there was never a choice to skip.
- It waits for what it reads. A layer whose groups test [origins:origin](/docs/datapack/origins/origin) isn't decided until the layer it names has been settled. Otherwise "the player has neither X nor Y" would be true by default during the very first choose screen, and the layer would commit to the wrong branch. Only the layers it names hold it up, and an unrelated layer the player hasn't picked yet doesn't. An origin check with no `layer` field matches against every layer, so it waits for all of them.

> [!NOTE]
> Revalidation runs at reconcile points, not every tick. A condition on something that changes all the time (weather, health, time of day) won't follow it live, and settles on the next join, reload, orb use or origin choice.

#### Writing the condition once

The two groups of a derived layer are each other's complement. Write the condition once, as a list, and invert it for the other branch. Adding a new origin later then means editing one list instead of rebalancing an `and` or `or` on both sides:

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

The `*` wildcard keeps this from turning into a list of every origin in the pack. See [origins:origin](/docs/datapack/origins/origin) for the pattern syntax.

### Overriding a derived layer by hand

Setting a layer by hand pins it. An origin that `/origin set`, a pick in the screen, an [Orb of Origin](/docs/datapack/origins/overview) or a power's action puts there isn't derived again, even on a `revalidate` layer whose conditions disagree. Without the pin, setting a derived layer by command would seem to work and then be undone in the same tick.

To hand the layer back to its conditions, clear it:

```mcfunction
/origin set @s my_pack:device origins:empty
```

The pin is also dropped if a data pack change removes the pinned origin from the layer entirely.

> [!NOTE]
> Only `origins:origin` names a layer, so that is the only dependency Origins can see. A derived layer gated on something that follows from another layer, such as a power that origin grants, is decided straight away and then corrected by revalidation at the next reconcile point instead of waiting. Condition it on the origin directly to get it right the first time.

## `auto_choose` and `default_origin`

These two settings assign an origin without showing the choose screen. The conditioned pattern above needs one of them, or the player is asked to choose from a list of one.

- With `auto_choose`, when the layer offers exactly one choosable origin for that player, it is assigned silently and no screen opens. With two or more options, the player chooses on the screen, unless the layer also has a `default_origin`.
- `default_origin` is given to a player who has no origin in the layer when they join or when a data pack reload runs, and the layer's screen doesn't open for them. This happens even when the layer lists other origins to choose from. An `auto_choose` layer that settles on a single origin takes that origin first, so a derived layer only falls back to its default when its conditions don't name exactly one.

When the origins assigned on join leave no layer to choose, the player has finished choosing. Their [`entity_action_chosen`](/docs/datapack/powers/action_on_callback) actions run and [`apoli:modify_player_spawn`](/docs/datapack/powers/modify_player_spawn) moves them to its spawn, the same as picking the last layer on the screen.

A `default_origin` of `origins:empty` does nothing. The default is also skipped when that origin has reached its [player cap](#capping-a-whole-layer) or the [world config](/docs/datapack/origins/world-config) turns it off, and the player gets the screen instead. The Orb of Origin never applies a default, so a player who uses one always picks on the screen. If they leave before picking, they get the default when they next join.

`auto_choose` is checked again on join, on data pack reload, after every origin the player picks and on Orb of Origin use, so a layer whose condition only becomes true after an earlier layer is chosen resolves straight after that choice.

## Adding to an existing layer

To add your origins to the main Origins screen, define a layer with the same ID, `origins:origin`, in your own pack, listing only your origins. Origins merges layers that share an ID across data packs, so your entries appear alongside the built-in ones instead of replacing them.

```json title="data/origins/origin_layers/origin.json"
{
   "origins":[
      "my_pack:merling",
      "my_pack:ember"
   ]
}
```

Set `"replace": true` in the higher-priority pack to discard the merged result and use only your file.

## Randomised layers

A layer can hand out a random origin instead of letting the player choose, which is the basis for random origin servers. The settings go in the `random` object:

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `allow` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Offers the random option in the screen. |
| `allow_unchoosable` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Lets the roll land on unchoosable origins. |
| `exclude` | [Array](/docs/datapack/data-types/array) of [Identifier](/docs/datapack/data-types/identifier) | _optional_ | Origins the roll never picks. |
| `style` | [String](/docs/datapack/data-types/string) | `uniform` | `uniform`, `weighted`, or `roll` (also `gacha`) for the rolling animation. Any other value reads as `uniform`. |
| `weights` | [Object](/docs/datapack/data-types/object) of origin IDs and [Integers](/docs/datapack/data-types/integer) | `{}` | The weight of each origin, for `style: weighted`. Negative weights count as 0. |
| `roll_duration` | [Integer](/docs/datapack/data-types/integer) | `80` | The animation length in ticks, for `style: roll`. |

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

> [!NOTE]
> A layer without a `random` block reads the flat fields `allow_random`, `allow_random_unchoosable` and `exclude_random` instead, and only offers the random option when `allow_random` is `true`. A `random` block takes over from all three, except that `exclude_random` still applies when the block has no `exclude`.

## Lifecycle and re-rolls

The `randomiser` object controls what happens over a life:

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `on_first_join` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Rolls an origin when the player first joins. |
| `on_death` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Re-rolls on death. |
| `on_sleep` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Re-rolls after sleeping. |
| `deaths_between_randomises` | [Integer](/docs/datapack/data-types/integer) | `1` | The deaths needed before a re-roll. |
| `sleeps_between_randomises` | [Integer](/docs/datapack/data-types/integer) | `1` | The sleeps needed before a re-roll. |
| `lives` | [Object](/docs/datapack/data-types/object) | `{}` | `enabled` ([Boolean](/docs/datapack/data-types/boolean), default `false`) and `starting` ([Integer](/docs/datapack/data-types/integer), default `10`, at least 1): the lives before the layer locks. |
| `reset_to_default_on_death` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Goes back to `default_origin` on death instead of re-rolling. |
| `show_screen_on_death` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Opens the choose screen on death instead of rolling. |
| `allow_duplicate` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Lets a re-roll land on the origin the player already had. |
| `broadcast_messages` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Announces re-rolls in chat. |

These options are how hardcore origin, randomiser and one life per origin servers are set up, all in JSON with no code.

## Capping a whole layer

`max_players_per_origin` sets a default player cap for every origin the layer offers, so a layer where everyone is unique needs one field instead of one per origin:

```json
{
  "order": 0,
  "max_players_per_origin": 1,
  "origins": [
    "example:pyromancer",
    "example:tidecaller",
    "example:stormwright",
    "example:human"
  ]
}
```

`0`, the default, means unlimited. An origin overrides the layer with its own [`max_players`](/docs/datapack/origins/overview#capping-an-origin): `"max_players": 3` raises it, and `"max_players": 0` opts out entirely, which is how you keep a fallback origin like `example:human` open to everyone on an otherwise exclusive layer.

The cap is per layer and per origin. Offering the same origin in two layers gives it a separate cap in each, counted separately.

> [!WARNING]
> Leave at least one origin uncapped on any layer a player must choose in. If every option fills up, the layer stops offering anything and is skipped the same way a layer of only `unchoosable` origins is, so new players never get an origin there.
