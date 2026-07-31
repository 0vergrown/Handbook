---
title: "Restrict Armor (Power Type)"
description: "Restricts the entity that has the power from equipping items as armor (via right-click, dispensing or by dragging and dropping the item in the equipment…"
navigation_title: "Restrict Armor"
---

Restricts the entity that has the power from equipping items as armor (via right-click, dispensing or by dragging and dropping the item in the equipment slot(s)) in the specified equipment slot(s).

Type ID: `apoli:restrict_armor`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`head` | Item Condition Type | _optional_ | If specified, items which fulfills this condition cannot be equipped in the head equipment slot.
`chest` | Item Condition Type | _optional_ | If specified, items which fulfills this condition cannot be equipped in the chest equipment slot.
`legs` | Item Condition Type | _optional_ | If specified, items which fulfills this condition cannot be equipped in the legs equipment slot.
`feet` | Item Condition Type | _optional_ | If specified, items which fulfills this condition cannot be equipped in the feet equipment slot.

## Examples

```json
{
    "type": "apoli:restrict_armor",
    "head": {
        "type": "apoli:armor_value",
        "comparison": ">",
        "compare_to": 2
    },
    "chest": {
        "type": "apoli:armor_value",
        "comparison": ">",
        "compare_to": 5
    },
    "legs": {
        "type": "apoli:armor_value",
        "comparison": ">",
        "compare_to": 4
    },
    "feet": {
        "type": "apoli:armor_value",
        "comparison": ">",
        "compare_to": 1
    }
}
```

This example will prevent the entity from equipping any armor which has more defense than chainmail.

```json
{
    "type": "apoli:restrict_armor",
    "head": {
        "type": "apoli:ingredient",
        "ingredient": {
            "item": "minecraft:turtle_helmet"
        }
    },
    "chest": {
        "type": "apoli:ingredient",
        "ingredient": {
            "item": "minecraft:elytra"
        }
    }
}
```

This example will prevent the entity from equipping a Turtle Shell or an Elytra.
