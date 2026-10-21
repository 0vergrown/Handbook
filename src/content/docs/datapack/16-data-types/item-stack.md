---
title: "Item Stack (Data Type)"
description: "An object that describes a new item stack: the item, the count and its data."
navigation_title: "Item Stack"
---

An [Object](/docs/datapack/data-types/object) that describes a new item stack.

> [!NOTE]
> On 1.21.1, `id` and `count`, the names Apace and vanilla use, are accepted as aliases of `item` and `amount`. The same aliases work in [Positioned Item Stack](/docs/datapack/data-types/positioned-item-stack).

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `item` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The ID of a registered item. `id` is accepted as an alias. |
| `amount` | [Integer](/docs/datapack/data-types/integer) | `1` | The size of the stack. `count` is accepted as an alias. |
| `tag` | [NBT](/docs/datapack/data-types/nbt) | _optional_ | 1.20.1 only. NBT data of the item, such as enchantments, `Damage` or a custom name. |
| `components` | [Object](/docs/datapack/data-types/object) | _optional_ | 1.21.1 only. Vanilla `DataComponentPatch` JSON, the 1.21.1 equivalent of `tag`. |

## Version differences (1.20.1 and 1.21.1)

Minecraft 1.21.1 keeps item data in data components instead of NBT, and this data type follows: 1.20.1 packs use the `tag` field with [NBT](/docs/datapack/data-types/nbt), and 1.21.1 packs use the `components` field with vanilla's component patch JSON. The two shapes are very different (`{Damage: 5}` becomes `{"minecraft:damage": 5}`), so there is no clean way to unify them. The basic case, `{"item": "..."}` with no extra data, works the same on both versions.

## Examples

```json
"stack": {
    "item": "minecraft:coal",
    "amount": 24
}
```

A stack of 24 coal.

```json
"stack": {
    "item": "minecraft:golden_helmet",
    "tag": "{Enchantments: [{id: \"minecraft:projectile_protection\", lvl: 2s}]}"
}
```

A golden helmet with Projectile Protection II.
