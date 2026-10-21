---
title: "Tooltip (Power Type)"
description: "Adds lines of text to item tooltips that only the entity with the power sees."
navigation_title: "Tooltip"
---

Adds lines of text to the tooltip of an item. Only the entity that has the power sees them, so the same item can read differently to different players.

Type ID: `apoli:tooltip`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `item_condition` | [Item Condition Type](/docs/datapack/item-conditions) | _optional_ | If set, the lines are only added to items that pass this condition. |
| `text` | [Text Component](/docs/datapack/data-types/text-component) | _optional_ | A line to add. |
| `texts` | [Array](/docs/datapack/data-types/array) of [Text Components](/docs/datapack/data-types/text-component) | _optional_ | Several lines to add, in order. It can be combined with `text`, which comes first. |
| `order` | [Integer](/docs/datapack/data-types/integer) | `0` | Sorts the lines of several tooltip powers that share a `position`. Lower values go higher up. |
| `position` | [String](/docs/datapack/data-types/string) | `"below_lore"` | Where in the tooltip the lines go: `"below_name"` or `"below_lore"`. |

| Position | Where the lines appear |
|----------|------------------------|
| `below_name` | Directly under the item's name, above everything else in the tooltip. |
| `below_lore` | After the item's own lines (its description, enchantments, dye colour and lore) and above its attribute modifiers ("When in Main Hand:"). |

A `position` that isn't one of these logs a warning naming the power, and the lines go to `below_lore`.

## Examples

```json
{
    "type": "apoli:tooltip",
    "item_condition": {
        "type": "apoli:ingredient",
        "ingredient": {
            "item": "minecraft:egg"
        }
    },
    "text": "Hmm, egg."
}
```

This adds the line "Hmm, egg." to the egg's tooltip.

```json
{
    "type": "apoli:tooltip",
    "item_condition": {
        "type": "apoli:ingredient",
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

This adds a yellow "Happy birthday!" line to the cake's tooltip.

```json
{
    "type": "apoli:multiple",
    "prevent_eating": {
        "type": "apoli:prevent_item_use",
        "item_condition": {
            "type": "apoli:ingredient",
            "ingredient": {
                "item": "minecraft:bread"
            }
        }
    },
    "inedible_tooltip": {
        "type": "apoli:tooltip",
        "item_condition": {
            "type": "apoli:ingredient",
            "ingredient": {
                "item": "minecraft:bread"
            }
        },
        "text": {
            "translate": "tooltip.example.inedible",
            "color": "gray"
        },
        "position": "below_name"
    }
}
```

This [apoli:multiple](/docs/datapack/powers/multiple) stops the player eating bread and labels the bread's tooltip, in gray, right under its name. Both halves use the same `item_condition`, so the label always matches what is blocked. The text is a translation key, so it shows in the player's language. Add `"tooltip.example.inedible": "Inedible"` to a resource pack's `assets/<namespace>/lang/en_us.json`. With Origins installed you can reuse its `origins.tooltip.inedible` key instead, which Origins' own diet powers use.

> [!WARNING]
> The tooltip is built on the player's own client, so `item_condition` and the power's `condition` must be things the client can check. Item conditions, equipment, powers and resources all work. Conditions that read state only the server has, such as `apoli:scoreboard`, `apoli:advancement` or `apoli:command`, always read as false there. Text components are shown as written, so score, selector and NBT components are not resolved (see the Minecraft Wiki's [raw JSON text page](https://minecraft.wiki/w/Raw_JSON_text_format#Component_resolution)).
