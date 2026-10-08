---
title: "Replace Loot Table (Power Type)"
description: "Replaces a loot table with another loot table."
navigation_title: "Replace Loot Table"
---

Replaces a loot table with another loot table.

Type ID: `apoli:replace_loot_table`

> The keys in the `replace` object field are formatted as a regular expression, where matching loot table namespace, path and IDs will be replaced with the specified value. The expression has to match the whole loot table ID (`minecraft:entities/pig`, not just `pig`). See [Wikipedia: Regular expression](https://en.wikipedia.org/wiki/Regular_expression) for more information about regular expressions and [RegExr](https://regexr.com/) to test regular expressions online.

> In the context of this power type, the '**actor**' entity is the entity whose powers are used, and the '**target**' entity depends on the kind of loot being rolled:
>
> Loot Type  | Actor Entity | Target Entity
> -----------|--------------|--------------
> Barter     | The nearest player the Piglin can see (the Piglin itself if there is none). | The Piglin that was bartered with.
> Block      | The entity that broke the block. | The '**actor**' entity.
> Chest      | The entity that opened the Chest. | The '**actor**' entity.
> Entity     | The entity that killed it (the entity that died, if nothing killed it). | The entity that died.
> Fishing    | The owner of the fishing bobber. | The fishing bobber.
>
> Loot rolled without an entity, such as a loot chest emptied by a hopper, is never replaced.

> Loot tables used from inside other loot tables are matched too. A white sheep drops from `minecraft:entities/sheep/white` (its wool), which uses `minecraft:entities/sheep` (its mutton), so replacing `minecraft:entities/sheep` swaps the mutton and keeps the wool.

## Fields

Field | Type | Default | Description
------|------|---------|------------
`replace` | Object | | An object with `"key": "value"` pairs that determine which loot table (`"key"`) will be replaced with a new loot table (`"value"`). The first key that matches is used. A key that isn't a valid regular expression stops the power from loading, with an error naming it, and a `"value"` that names a missing loot table is skipped with a warning in the log.
`bientity_condition` | Bi-entity Condition Type | _optional_ | If specified, the loot tables will only be replaced if this condition is fulfilled by either or both '**actor**' and '**target**' entities.
`block_condition` | Block Condition Type | _optional_ | If specified, the loot tables will only be replaced if the block at the position of the loot fulfills this condition: the broken block, the opened Chest, or where the entity died or the bobber landed. Bartering has no position, so a power with a `block_condition` never replaces bartering loot.
`item_condition` | Item Condition Type | _optional_ | If specified, the loot tables will only be replaced if the item used for the loot fulfills this condition: the tool that broke the block, or the fishing rod. Loot without such an item, like entity drops and chests, tests an empty item; to check what the actor is holding there, use the power's `condition` with an [apoli:equipped_item](/docs/datapack/entity-conditions/equipped_item) condition, as in the second example.
`priority` | Integer | `0` | Determines the application priority of the power. When several of the actor's powers replace the same loot table, the one with the highest priority rolls the loot, and the `apoli:replaced_loot_table` inside it stands for the next one down; inside the lowest one, it stands for the original loot table.

## Examples

`data/example/loot_table/double_drops.json` (1.21.1; `loot_tables/` on 1.20.1)

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

`data/example/powers/double_ores_except_diamond_ore.json`

```json
{
    "type": "apoli:replace_loot_table",
    "replace": {
        "([a-z|0-9|\\-|_]).*:blocks\/((?!diamond).*)_ore": "example:double_drops"
    }
}
```

This example will essentially double the drops of Ore blocks except for Diamond Ore block, as indicated in the specified regular expression. The `apoli:replaced_loot_table` loot table contains the contents of the replaced loot table, which is in this case would be the loot tables for Ore blocks except for the Diamond Ore block. On 1.20.1, the `minecraft:loot_table` entry names its loot table with `name` instead of `value`.

`data/example/loot_table/entities/custom_creeper_loot.json` (1.21.1; `loot_tables/` on 1.20.1)

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

`data/example/powers/modify_creeper_loot.json`

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

This example will replace the loot table for Creepers with the `example:entities/custom_creeper_loot` loot table if the actor entity is holding a Wooden Sword, which will make the Creeper drop one of the Music Disc items from the `#minecraft:creeper_drop_music_discs` item tag in a random fashion if killed.
