---
title: "Revive (Entity Action Type)"
description: "Revives a knocked-out entity."
navigation_title: "Revive"
---

Brings a knocked-out entity back up. It does nothing if they aren't down.

Type ID: `apoli:revive`

> [!NOTE]
> This type needs [Hardcore Revival](https://modrinth.com/mod/hardcore-revival) and doesn't exist without it, so a pack that uses it must depend on the mod.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `apply_effects` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether Hardcore Revival's usual effects after a revive are applied. Set it to `false` for a clean revive with no penalty. |

## Examples

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

This medic's ability revives everyone within 8 blocks who is down.

```json
{
  "type": "apoli:revive",
  "apply_effects": false
}
```

This revive skips the usual after-effects, as the reward for an expensive cost.
