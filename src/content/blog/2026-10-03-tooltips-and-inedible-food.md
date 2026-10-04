---
title: "Tooltips, and food you can't eat"
description: "Apoli 1.109.0 and Origins 1.47.0: apoli:tooltip now adds its lines on every loader and can place them right under an item's name, and Origins labels the food an origin can't eat."
date: 2026-10-03
author: Overgrown
---

Apoli **1.109.0** and Origins **1.47.0**.

## apoli:tooltip works

[`apoli:tooltip`](/docs/datapack/powers/tooltip) loaded without errors but never added anything to a tooltip. It does now, on Fabric 1.20.1, Fabric 1.21.1 and NeoForge 1.21.1, and only for the player who has the power.

It also gained a `position` field. `"below_lore"`, the default, puts the lines after the item's own description, enchantments and lore, above the attribute modifiers. `"below_name"` puts them directly under the item's name, where a short label is easiest to spot. `order` still sorts lines from several powers that share a position.

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
    },
    "position": "below_name"
}
```

The tooltip is built on the player's own client, so its conditions should be things the client can check: item conditions, equipment, powers and resources.

## Inedible

Origins with a restricted diet now say so. Hover over a food your origin can't eat and a gray **Inedible** sits right under its name:

- **Arachnid** (Carnivore): anything that isn't meat.
- **Avian** (Vegetarian): meat.
- **Buzzborne** (Nectarivore): everything except honey bottles and honeycomb.
- **Enderian**: pumpkin pie.

Each label uses the same item condition as the restriction it describes, so the two can't disagree. For the three diets that includes the `origins:ignore_diet` tag: an item added to it loses its label along with its restriction.

The text comes from the `origins.tooltip.inedible` translation key, so translators can cover it, and your own powers can reuse it. Pair a [`apoli:prevent_item_use`](/docs/datapack/powers/prevent_item_use) with an `apoli:tooltip` that has the same `item_condition` inside one [`apoli:multiple`](/docs/datapack/powers/multiple) and your origin's diet gets the same label. The [tooltip page](/docs/datapack/powers/tooltip) has the full example.

Power ids haven't changed, so data packs that refer to `origins:arachnid/carnivore` or `origins:avian/vegetarian` keep working, and players who already have these origins get the label on their own the next time they join.
