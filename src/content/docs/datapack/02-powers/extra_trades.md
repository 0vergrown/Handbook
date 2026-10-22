---
title: "Extra Trades (Power Type)"
description: "Gives merchants extra trades that only players with the power can see."
navigation_title: "Extra Trades"
---

Gives merchants extra trades that only players with the power can see. The trades are rolled the first time a player with the power opens the merchant's trading screen, saved with the merchant, and listed after its own trades every time a player with the power trades with it.

Type ID: `apoli:extra_trades`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `trades` | [Array](/docs/datapack/data-types/array) of [Objects](/docs/datapack/data-types/object) | _required_ | The trades to add, in order. Each one is described below. |
| `bientity_condition` | [Bi-entity Condition Type](/docs/datapack/bientity-conditions) | _optional_ | If set, only merchants that pass this condition get the trades. The actor is the player and the target is the merchant. |

Each trade is an object with these fields:

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `buy` | [Item Stack](/docs/datapack/data-types/item-stack) or loot table object | _required_ | What the merchant wants. |
| `buy_b` | [Item Stack](/docs/datapack/data-types/item-stack) or loot table object | _optional_ | A second item the merchant wants as well. |
| `sell` | [Item Stack](/docs/datapack/data-types/item-stack) or loot table object | _required_ | What the merchant gives. |
| `max_uses` | [Integer](/docs/datapack/data-types/integer) | `12` | How many times the trade can be used before it sells out. |
| `xp` | [Integer](/docs/datapack/data-types/integer) | `1` | The trading experience the merchant earns each time. |
| `price_multiplier` | [Float](/docs/datapack/data-types/float) | `0.05` | How strongly demand raises the price of `buy` when the merchant restocks. |

A loot table object is `{"loot_table": "<id>"}`. The loot table is rolled once, when the trade is rolled, and the first item it gives is used, so a table with `set_count` or an enchantment function makes a random price or a random item. A trade whose `buy` or `sell` rolls nothing is left out.

## How it behaves

- Each power rolls its own trades once per merchant. Every player with the power then sees the same trades and shares their stock.
- Players without the power never see them, and the trades are not part of the merchant's own list in its saved data.
- Gossip discounts and Hero of the Village don't apply to the extra trades.
- Changing the power's `trades` later doesn't change trades a merchant has already rolled.

## Examples

```json
{
    "type": "apoli:extra_trades",
    "bientity_condition": {
        "type": "apoli:target_condition",
        "condition": {
            "type": "apoli:entity_type",
            "entity_type": "minecraft:wandering_trader"
        }
    },
    "trades": [
        {
            "buy": {
                "loot_table": "example:charisma/price"
            },
            "sell": {
                "loot_table": "example:charisma/rare_item"
            },
            "max_uses": 1,
            "xp": 5
        }
    ]
}
```

Wandering traders offer the player one more trade, whose price and item come from two loot tables in the data pack. It can be bought once.

```json
{
    "type": "apoli:extra_trades",
    "bientity_condition": {
        "type": "apoli:target_condition",
        "condition": {
            "type": "apoli:entity_type",
            "entity_type": "minecraft:villager"
        }
    },
    "trades": [
        {
            "buy": {
                "item": "minecraft:emerald",
                "amount": 3
            },
            "sell": {
                "item": "minecraft:golden_apple"
            }
        }
    ]
}
```

Every villager sells the player a golden apple for three emeralds, up to 12 times between restocks.
