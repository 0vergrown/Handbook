---
title: "Modify Stat (Entity Action Type)"
description: "Modifies the value of a certain statistic with Attribute Modifiers."
navigation_title: "Modify Stat"
aliases: ["change_stat", "set_stat"]
---

Modifies the value of a certain statistic with Attribute Modifiers (Data Type). The `stat` accepts a plain id string as shorthand for a `minecraft:custom` statistic (e.g. `"minecraft:jump"`). Writes go through the vanilla stat path, so stat-based scoreboard objectives update too.

Type ID: `apoli:modify_stat`

Aliases: `apoli:change_stat`, `apoli:set_stat`

> Use the `add_base_early` modifier operation to add to a stat and `set_total` to set it outright.

## Fields

Field | Type | Default | Description
------|------|---------|------------
`stat` | [Stat](/docs/datapack/data-types/stat) | | The type and name of the statistic to be modified.
`modifier` | Attribute Modifiers (Data Type) | | This modifier will be applied to the current value of the statistic specified.

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

This example will add 24000 to the value of the player's `minecraft.custom:minecraft.time_since_rest` statistic.

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

This example will add 1 to the value of the player's `minecraft.used:origins.orb_of_origin` statistic.
