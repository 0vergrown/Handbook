---
title: "Grant Advancement (Entity Action Type)"
description: "Grants an advancement, or some of its criteria, to the player."
navigation_title: "Grant Advancement"
---

Grants an advancement to the player, or only some of its criteria.

Type ID: `apoli:grant_advancement`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `advancement` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | The ID of the advancement to grant. The action does nothing without one. |
| `criteria` | [Array](/docs/datapack/data-types/array) of [String](/docs/datapack/data-types/string) | _optional_ | The criteria of the advancement to grant. |
| `criterion` | [String](/docs/datapack/data-types/string) | _optional_ | A single criterion of the advancement to grant. |
| `selection` | [String](/docs/datapack/data-types/string) | `"only"` | Which related advancements are included, the same as the `/advancement` command: `"only"`, `"through"`, `"from"`, `"until"` or `"everything"`. |

## Examples

```json
"entity_action": {
    "type": "apoli:grant_advancement",
    "advancement": "minecraft:adventure/arbalistic"
}
```

This grants the player the Arbalistic advancement.
