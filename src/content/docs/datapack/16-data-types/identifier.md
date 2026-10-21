---
title: "Identifier (Data Type)"
description: "A namespaced string that names something in the game, such as an item, block, power or tag."
navigation_title: "Identifier"
---

An identifier, also called a resource location, is a [String](/docs/datapack/data-types/string) that names something in the game: an item, block, entity type, status effect, power, tag, or a file in a data or resource pack. It is the most common value type in Apoli. Every `type` field is an identifier, and so are `power`, `attribute`, `effect`, `sound` and many more.

## Format

An identifier is written as `namespace:path`.

- The namespace groups IDs by who owns them: `minecraft` for vanilla, `apoli` for this engine and `my_pack` for your own content.
- The path names the specific thing within that namespace.

If you only write a path with no colon, the namespace defaults to `minecraft`, so `stone` and `minecraft:stone` are the same.

```json
"apoli:attribute"
"minecraft:diamond_sword"
"my_pack:mana"
```

## Legal characters

The namespace and the path can only contain:

- lowercase letters `a` to `z`
- digits `0` to `9`
- underscore `_`, hyphen `-` and dot `.`

The path can also contain `/` to mark folders, as in `apoli:textures/rope/rope.png`. The namespace can't. There is exactly one colon, between the namespace and the path.

> [!WARNING]
> Uppercase letters, spaces and other symbols aren't allowed and make the file fail to load.

## Where paths point

For IDs that refer to a pack file, the path maps to a folder under that namespace. For example, the power ID `my_pack:swim` is the file `data/my_pack/powers/swim.json`.

## Tags, wildcards, and which is allowed where

Three rules cover every identifier field in Apoli, and the field's job tells you which one it follows.

### 1. A field that matches something also takes a `#tag`

If the field asks whether something is one of a set, it accepts either a single ID or a [tag](https://minecraft.wiki/w/Tag) starting with `#`:

```json
{ "type": "apoli:block", "block": "minecraft:oak_log" }
{ "type": "apoli:block", "block": "#minecraft:logs" }
```

That holds for [`apoli:block`](/docs/datapack/block-conditions/block), [`apoli:entity_type`](/docs/datapack/entity-conditions/entity_type), [`apoli:type`](/docs/datapack/damage-conditions/type), the `event` and `events` of [`apoli:prevent_game_event`](/docs/datapack/powers/prevent_game_event), `entity_types` on a [global power set](/docs/datapack/introduction/powers), and every [Ingredient](/docs/datapack/data-types/ingredient) entry.

### 2. A field that is a tag takes the tag ID, with `#` optional

Some fields only ever hold a tag. Either the field name says so (`tag`, `event_tag`), or the value is documented as a tag (`fluid` on [`apoli:submerged_in`](/docs/datapack/entity-conditions/submerged_in), [`apoli:fluid_height`](/docs/datapack/entity-conditions/fluid_height) and [`apoli:walk_on_fluid`](/docs/datapack/powers/walk_on_fluid)). Write it with or without the `#`, since both mean the same tag:

```json
{ "type": "apoli:in_tag", "tag": "minecraft:logs" }
{ "type": "apoli:in_tag", "tag": "#minecraft:logs" }
```

### 3. `*` means "the file I am written in"

Anywhere inside a `powers`, `origins`, `origin_layers`, `global_powers` or `skill_trees` file, `*` stands for that file's own ID:

| You write | It becomes (in `data/my_pack/powers/sub/stasis.json`) |
| --- | --- |
| `*:*` | `my_pack:sub/stasis`, this file's full ID |
| `*:domain_mode` | `my_pack:domain_mode`, this file's namespace with your path |
| `*:sub/stasis` | `my_pack:sub/stasis`, since folders in the path are fine |
| `#*:heavy` | `#my_pack:heavy`, which works for tags too |

Use it so a pack can be renamed or moved to another namespace without editing every cross-reference:

```json
{
   "type": "apoli:action_on_key_press",
   "entity_action": {
      "type": "apoli:change_resource",
      "resource": "*:sub/stasis",
      "change": -1
   }
}
```

> [!NOTE]
> Inside an [`apoli:multiple`](/docs/datapack/powers/multiple) sub-power, `*:*` is the parent power's ID, not the generated sub-power ID. That is what makes `"*:*_stasis"` the usual way to refer to a sibling sub-power.

### 4. Everything else needs an exact ID

Fields that name a thing to create or use, such as `block` on [`apoli:set_block`](/docs/datapack/block-actions/set_block), `entity_type` on [`apoli:spawn_entity`](/docs/datapack/entity-actions/spawn_entity), `sound`, `texture`, `function`, `power` and `resource`, take one exact ID. A tag means nothing there, so passing one is an error, and Apoli says so by name instead of complaining about an illegal character:

```
'#minecraft:logs' is a tag, and this field takes a single id.
Drop the '#', or use the matching in_tag condition.
```

A `*` that wasn't resolved reports itself the same way, which is what you see if you used a wildcard somewhere Apoli doesn't expand it.
