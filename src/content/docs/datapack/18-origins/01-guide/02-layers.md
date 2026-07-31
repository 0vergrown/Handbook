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
  "name": "Origin",
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
| `origins` | list of identifier | `[]` | The origins offered in this layer. |
| `enabled` | boolean | `true` | Whether the layer is active. |
| `name` | [text](/docs/datapack/data-types/text-component) | — | The layer's title in the screen. |
| `order` | number | `0` | Order when several layers are chosen in turn. |
| `starting` | identifier | — | An origin granted before the player chooses. |

## Adding to an existing layer

To drop your origins into the vanilla Origins screen, define a layer with the **same id** — `origins:origin` — in your own pack listing just your origins. Origins merges layers that share an id across data packs, so your entries appear alongside the built-in ones rather than replacing them.

```json
// data/origins/origin_layers/origin.json  (in your pack)
{
  "origins": [ "my_pack:merling", "my_pack:ember" ]
}
```

## Randomised layers

Layers can hand out a **random** origin instead of letting the player choose — the basis for "random origin" servers. The relevant fields:

| Field | Purpose |
| --- | --- |
| `gacha` / `weighted` / `uniform` | pick a randomiser style |
| `weights` | per-origin weighting for `weighted` |
| `roll` | whether to play the rolling animation |
| `roll_duration` | how long the animation lasts |

## Lifecycle & re-rolls

Layers also control what happens over a life:

| Field | Purpose |
| --- | --- |
| `on_first_join` | grant/choose when the player first joins |
| `on_death` | re-choose or re-roll on death |
| `deaths_between_randomises` | deaths required before a re-roll |
| `lives` | number of lives before the layer locks |
| `reset_to_default_on_death` | revert to the starting origin on death |

> These options are how "hardcore origins", "randomiser", and "one life per origin" servers are configured — all in JSON, no code.
