---
title: "Item Stack"
description: "An Object which defines a new item stack."
---

An [Object](/docs/datapack/data-types/object) which defines a new item stack.

> **ALIASES (1.21.1):** Apace renamed `item` → `id` and `amount` → `count` to match vanilla. Both spellings are accepted. (The same aliases apply to [Positioned Item Stack](/docs/datapack/data-types/positioned-item-stack).)

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`item` | [Identifier](/docs/datapack/data-types/identifier) | | ID of a registered item. _Alias: `id`._
`amount` | [Integer](/docs/datapack/data-types/integer) | `1` | Size of the stack. _Alias: `count`._
`tag` | [NBT](/docs/datapack/data-types/nbt) | _optional_ | **(1.20.1 only)** NBT data of the item — enchantments, `Damage`, custom name, etc.
`components` | Object | _optional_ | **(1.21.1 only)** Vanilla `DataComponentPatch` JSON, the modern equivalent of `tag`.

## Version split (1.20.1 ↔ 1.21.1)

Vanilla MC 1.21.1 moved item-side data from NBT to **DataComponents**, so Apoli's data type follows suit: 1.20.1 packs use the `tag` field with [NBT](/docs/datapack/data-types/nbt); 1.21.1 packs use the `components` field with the vanilla component-patch JSON. The shape change is fundamental (e.g. `{Damage: 5}` becomes `{"minecraft:damage": 5}`), so there's no clean way to unify them — the basic case (`{"item": "..."}` with no extra data) works identically on both versions.

## Examples

```json
"stack": {
    "item": "minecraft:coal",
    "amount": 24
}
```

An item stack of 24 coal.

```json
"stack": {
    "item": "minecraft:golden_helmet",
    "tag": "{Enchantments: [{id: \"minecraft:projectile_protection\", lvl: 2s}]}"
}
```
An item stack of a golden helmet with Projectile Protection II.
