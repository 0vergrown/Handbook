---
title: "Revive (Entity Action Type)"
description: Revives a knocked-out entity.
navigation_title: "Revive"
---

Brings a knocked-out entity back up. Does nothing if they are not down.

Type ID: `apoli:revive`

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`apply_effects` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Apply Hardcore Revival's usual post-revive effects. Set to `false` for a clean revive with no penalty.

## Examples

Revive everyone nearby who is down — a medic's ability:

```json
{
  "type": "apoli:area_of_effect",
  "radius": 8,
  "bientity_condition": {
    "type": "apoli:target_condition",
    "condition": { "type": "apoli:knocked_out" }
  },
  "bientity_action": {
    "type": "apoli:target_action",
    "action": { "type": "apoli:revive" }
  }
}
```

A full-strength revive that skips the usual after-effects, as the payoff for an expensive cost:

```json
{
  "type": "apoli:revive",
  "apply_effects": false
}
```

> Needs [Hardcore Revival](https://modrinth.com/mod/hardcore-revival). These types do not exist without it, so a pack using them must depend on the mod.
