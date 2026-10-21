---
title: "Modify Stat (Entity Action Type)"
description: "Changes the value of a statistic with an attribute modifier."
navigation_title: "Modify Stat"
aliases: ["change_stat", "set_stat"]
---

Changes the value of a statistic with an [attribute modifier](/docs/datapack/data-types/attribute-modifier). `stat` accepts a plain ID string as shorthand for a `minecraft:custom` statistic, such as `"minecraft:jump"`. The change goes through the vanilla stat path, so scoreboard objectives based on stats update too.

Type ID: `apoli:modify_stat` (aliases `apoli:change_stat` and `apoli:set_stat`)

> [!TIP]
> Use the `add_base_early` operation to add to a stat and `set_total` to set it outright.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `stat` | [Stat](/docs/datapack/data-types/stat) | _required_ | The type and name of the statistic to change. |
| `modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _required_ | The modifier applied to the statistic's current value. |

## Examples

```json
"entity_action": {
    "type": "apoli:modify_stat",
    "stat": {
        "type": "minecraft:custom",
        "id": "minecraft:time_since_rest"
    },
    "modifier": {
        "operation": "add_base_early",
        "value": 24000
    }
}
```

This adds 24000 to the player's `minecraft.custom:minecraft.time_since_rest` statistic.

```json
"entity_action": {
    "type": "apoli:modify_stat",
    "stat": {
        "type": "minecraft:used",
        "id": "origins:orb_of_origin"
    },
    "modifier": {
        "operation": "add_base_early",
        "value": 1
    }
}
```

This adds 1 to the player's `minecraft.used:origins.orb_of_origin` statistic.
