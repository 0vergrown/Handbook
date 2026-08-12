---
title: "Identifier (Data Type)"
description: "A namespaced string that names a game object — an item, block, power, tag and so on."
navigation_title: "Identifier"
---

An **identifier** (also called a *resource location*) is a [String](/docs/datapack/data-types/string) that names something in the game — an item, block, entity type, status effect, power, tag, or a file in a data/resource pack. It's the single most common value type in Apoli: every `type` field is an identifier, and so are `power`, `attribute`, `effect`, `sound`, and many more.

## Format

An identifier is written as `namespace:path`.

- The **namespace** groups ids by who owns them — `minecraft` for vanilla, `apoli` for this engine, `my_pack` for your own content.
- The **path** names the specific thing within that namespace.

If you write only a path with no colon, the namespace defaults to `minecraft`. So `stone` and `minecraft:stone` are the same.

```json
"apoli:attribute"
"minecraft:diamond_sword"
"my_pack:mana"
```

## Legal characters

Both the namespace and the path may contain only:

- lowercase letters `a`–`z`
- digits `0`–`9`
- underscore `_`, hyphen `-`, and dot `.`

The **path** may additionally contain `/` to indicate folders (e.g. `apoli:textures/rope/rope.png`). The **namespace** may not. There is exactly one colon, separating namespace and path.

> Uppercase letters, spaces, and other symbols are **not** allowed and will cause the file to fail loading.

## Where paths point

For ids that refer to a pack file, the path maps to a folder under that namespace. For example, a power id `my_pack:swim` is the file `data/my_pack/powers/swim.json`.

## Tags, wildcards, and which is allowed where

Three rules cover every identifier field in Apoli. You never have to guess which one a
particular field follows — the field's job tells you.

### 1. A field that *matches* something also takes a `#tag`

If the field asks "is this thing one of X?", it accepts either a single id or a
`#`-prefixed [tag](https://minecraft.wiki/w/Tag):

```json
{ "type": "apoli:block", "block": "minecraft:oak_log" }
{ "type": "apoli:block", "block": "#minecraft:logs" }
```

That holds for [`apoli:block`](/docs/datapack/block-conditions/block),
[`apoli:entity_type`](/docs/datapack/entity-conditions/entity_type),
[`apoli:type`](/docs/datapack/damage-conditions/type),
[`apoli:prevent_game_event`](/docs/datapack/powers/prevent_game_event)'s `event` and `events`,
`entity_types` on a [global power set](/docs/datapack/powers/global_powers), and every
[Ingredient](/docs/datapack/data-types/ingredient) entry.

### 2. A field that *is* a tag takes the tag id, with `#` optional

Some fields only ever hold a tag — the field name says so (`tag`, `event_tag`), or the
value is documented as a tag (`fluid` on [`apoli:submerged_in`](/docs/datapack/entity-conditions/submerged_in),
[`apoli:fluid_height`](/docs/datapack/entity-conditions/fluid_height) and
[`apoli:walk_on_fluid`](/docs/datapack/powers/walk_on_fluid)). Write it with or without the
`#`; both mean the same tag:

```json
{ "type": "apoli:in_tag", "tag": "minecraft:logs" }
{ "type": "apoli:in_tag", "tag": "#minecraft:logs" }
```

### 3. `*` means "the file I am written in"

Anywhere inside a `powers`, `origins`, `origin_layers`, `global_powers` or `skill_trees`
file, `*` stands in for that file's own id:

| You write | It becomes (in `data/my_pack/powers/sub/stasis.json`) |
| --- | --- |
| `*:*` | `my_pack:sub/stasis` — this file's full id |
| `*:domain_mode` | `my_pack:domain_mode` — this file's namespace, your path |
| `*:sub/stasis` | `my_pack:sub/stasis` — folders in the path are fine |
| `#*:heavy` | `#my_pack:heavy` — works for tags too |

Use it so a pack can be renamed or re-namespaced without editing every cross-reference:

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

> Inside an [`apoli:multiple`](/docs/datapack/powers/multiple) sub-power, `*:*` is the
> **parent** power's id, not the generated sub-power id — that is what makes
> `"*:*_stasis"` the idiom for referring to a sibling sub-power.

### 4. Everything else needs an exact id

Fields that *name* a thing to create or use — `block` on
[`apoli:set_block`](/docs/datapack/block-actions/set_block), `entity_type` on
[`apoli:spawn_entity`](/docs/datapack/entity-actions/spawn_entity), `sound`, `texture`,
`function`, `power`, `resource` — take one exact id. A tag has no meaning there, so passing
one is an error, and Apoli says so by name rather than complaining about an illegal
character:

```
'#minecraft:logs' is a tag, and this field takes a single id.
Drop the '#', or use the matching in_tag condition.
```

An unresolved `*` reports itself the same way, which is what you'll see if you used a
wildcard somewhere Apoli doesn't expand it.
