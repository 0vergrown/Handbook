---
title: "Revoke Advancement (Entity Action Type)"
description: "Revokes an advancement, or some of its criteria, from the player."
navigation_title: "Revoke Advancement"
---

Revokes an advancement from the player, or only some of its criteria.

Type ID: `apoli:revoke_advancement`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `advancement` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | The ID of the advancement to revoke. The action does nothing without one. |
| `criteria` | [Array](/docs/datapack/data-types/array) of [String](/docs/datapack/data-types/string) | _optional_ | The criteria of the advancement to revoke. |
| `criterion` | [String](/docs/datapack/data-types/string) | _optional_ | A single criterion of the advancement to revoke. |
| `selection` | [String](/docs/datapack/data-types/string) | `"only"` | Which related advancements are included, the same as the `/advancement` command: `"only"`, `"through"`, `"from"`, `"until"` or `"everything"`. |

## Examples

```json
"entity_action": {
    "type": "apoli:revoke_advancement",
    "advancement": "minecraft:adventure/arbalistic"
}
```

This revokes the Arbalistic advancement from the player, if they have it.
