---
title: "Replace Loot Table (Power Type)"
description: "Replaces a loot table with another one."
navigation_title: "Replace Loot Table"
---

Replaces a loot table with another one.

Type ID: `apoli:replace_loot_table`

Each key in the `replace` object is a regular expression. Loot tables whose ID it matches are replaced with the value. The expression has to match the whole loot table ID (`minecraft:entities/pig`, not just `pig`). [Wikipedia's regular expression page](https://en.wikipedia.org/wiki/Regular_expression) explains the syntax, and [RegExr](https://regexr.com/) can test an expression online.

## Actors and targets

The actor is the entity whose powers are used, and the target depends on the kind of loot being rolled:

| Loot type | Actor | Target |
|-----------|-------|--------|
| Barter | The nearest player the piglin can see, or the piglin itself if there is none. | The piglin that was bartered with. |
| Block | The entity that broke the block. | The actor. |
| Chest | The entity that opened the chest. | The actor. |
| Entity | The entity that killed it, or the entity that died if nothing killed it. | The entity that died. |
| Fishing | The owner of the fishing bobber. | The fishing bobber. |

Loot rolled without an entity, such as a loot chest emptied by a hopper, is never replaced.

Loot tables used from inside other loot tables are matched too. A white sheep drops from `minecraft:entities/sheep/white` (its wool), which uses `minecraft:entities/sheep` (its mutton), so replacing `minecraft:entities/sheep` swaps the mutton and keeps the wool.

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `replace` | [Object](/docs/datapack/data-types/object) | | `"key": "value"` pairs that decide which loot table (`"key"`) is replaced with which new loot table (`"value"`). The first key that matches is used. A key that isn't a valid regular expression stops the power from loading, with an error naming it, and a `"value"` that names a missing loot table is skipped with a warning in the log. |
| `bientity_condition` | [Bi-entity Condition Type](/docs/datapack/bientity-conditions) | _optional_ | If set, loot tables are only replaced when the actor and target pass this condition. |
| `block_condition` | [Block Condition Type](/docs/datapack/block-conditions) | _optional_ | If set, loot tables are only replaced when the block at the loot's position passes this condition: the broken block, the opened chest, or where the entity died or the bobber landed. Bartering has no position, so a power with a `block_condition` never replaces bartering loot. |
| `item_condition` | [Item Condition Type](/docs/datapack/item-conditions) | _optional_ | If set, loot tables are only replaced when the item used for the loot passes this condition: the tool that broke the block, or the fishing rod. Loot without such an item, like entity drops and chests, tests an empty item. To check what the actor is holding in those cases, use the power's `condition` with an [apoli:equipped_item](/docs/datapack/entity-conditions/equipped_item) condition, as in the second example. |
| `priority` | [Integer](/docs/datapack/data-types/integer) | `0` | When several of the actor's powers replace the same loot table, the one with the highest priority rolls the loot, and the `apoli:replaced_loot_table` inside it stands for the next one down. Inside the lowest one, it stands for the original loot table. |

## Examples

`data/example/loot_table/double_drops.json` (`loot_tables/` on 1.20.1):

```json
{
    "type": "minecraft:block",
    "pools": [
        {
            "rolls": 2,
            "entries": [
                {
                    "type": "minecraft:loot_table",
                    "value": "apoli:replaced_loot_table"
                }
            ]
        }
    ]
}
```

`data/example/powers/double_ores_except_diamond_ore.json`:

```json
{
    "type": "apoli:replace_loot_table",
    "replace": {
        "([a-z|0-9|\\-|_]).*:blocks\/((?!diamond).*)_ore": "example:double_drops"
    }
}
```

This doubles the drops of every ore block except diamond ore, as the regular expression says. `apoli:replaced_loot_table` holds the contents of the loot table being replaced, which here is the loot table of whichever ore was broken. On 1.20.1, the `minecraft:loot_table` entry names its loot table with `name` instead of `value`.

`data/example/loot_table/entities/custom_creeper_loot.json` (`loot_tables/` on 1.20.1):

```json
{
    "type": "minecraft:entity",
    "pools": [
        {
            "rolls": 1,
            "entries": [
                {
                    "type": "minecraft:tag",
                    "name": "minecraft:creeper_drop_music_discs",
                    "expand": true
                }
            ]
        }
    ]
}
```

`data/example/powers/modify_creeper_loot.json`:

```json
{
    "type": "apoli:replace_loot_table",
    "replace": {
        "minecraft:entities/creeper": "example:entities/custom_creeper_loot"
    },
    "condition": {
        "type": "apoli:equipped_item",
        "equipment_slot": "mainhand",
        "item_condition": {
            "type": "apoli:ingredient",
            "ingredient": {
                "item": "minecraft:wooden_sword"
            }
        }
    }
}
```

When the actor holds a wooden sword, this replaces the creeper's loot table with `example:entities/custom_creeper_loot`, so a creeper killed that way drops a random music disc from the `#minecraft:creeper_drop_music_discs` item tag.
