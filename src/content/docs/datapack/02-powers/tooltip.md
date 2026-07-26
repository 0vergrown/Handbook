---
title: "origins:tooltip"
description: "[Power Type](../powertypes.md)"
---

Power Type

Applies the specified tooltip(s) to an item that is only visible to the entity that has the power.

Type ID: `origins:tooltip`


!!! warning

    Currently, this power type is not able to "resolve" certain JSON text components. See [Minecraft Wiki: Raw JSON text format (Component resolution)](https://minecraft.wiki/w/Raw_JSON_text_format#Component_resolution) for more information.


## Fields

Field | Type | Default | Description
------|------|---------|-------------
`item_condition` | Item Condition Type | _optional_ | If specified, the specified tooltip(s) will only apply to items that fulfills this condition.
`text` | Text Component | _optional_ | If specified, apply this string as a tooltip.
`texts` | Array of Text Components | _optional_ | If specified, apply these strings as a tooltip.
`order` | Integer | `0` | Determines the placement order of the tooltip(s) of the power.


## Examples

```json
{
    "type": "origins:tooltip",
    "item_condition": {
        "type": "origins:ingredient",
        "ingredient": {
            "item": "minecraft:egg"
        }
    },
    "text": "Hmm, egg."
}
```

This example will apply a "`Hmm, egg.`" tooltip to an Egg item.



```json
{
    "type": "origins:tooltip",
    "item_condition": {
        "type": "origins:ingredient",
        "ingredient": {
            "item": "minecraft:cake"
        }
    },
    "text": {
        "text": "Happy birthday!",
        "color": "yellow"
    }
}
```

This example will apply a yellow-colored "`Happy birthday!`" tooltip to a Cake item.

