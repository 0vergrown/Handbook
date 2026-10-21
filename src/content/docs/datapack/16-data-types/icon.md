---
title: "Icon (Data Type)"
description: "An item or a texture, used wherever Apoli or Origins draws a small picture."
navigation_title: "Icon"
---

An item or a texture. It is used by [skill trees](/docs/datapack/skill-tree/skill-tree-json-format), the `skill` block inside a power, and an [origin](/docs/datapack/origins/overview)'s `icon` field.

## Shapes

An icon accepts three shapes. The first two draw an item, and the third draws a plain image, so you don't have to register a throwaway item to get a custom picture.

| Shape | Written as | Use it when |
| --- | --- | --- |
| [Item ID](#item-id) | a bare string | you want a vanilla or modded item's sprite |
| [Item stack](#item-stack) | an object with `item` | you need components or NBT on the item, such as a specific potion or a dyed leather cap |
| [Texture](#texture) | an object with `texture` | you have your own PNG |

An object with `texture` is read as a texture icon, any other object is read as an item stack, and a string is read as an item ID.

### Item ID

The shorthand. The whole value is the item's [Identifier](/docs/datapack/data-types/identifier), with no fields and no object.

```json
"icon": "minecraft:cod"
```

| Value | Type | Default | Description |
| --- | --- | --- | --- |
| (the string itself) | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The ID of a registered item. The same as `{"item": "<id>"}` with no other fields. |

> [!WARNING]
> A bare string is only checked for ID syntax, not for whether the item exists. A mistyped or missing ID resolves to `minecraft:air`, and the icon draws nothing without any error. The object form below checks the item registry and fails with an error instead, so use it when you point at another mod's item.

### Item stack

An object with an `item` field. It is the full [Item Stack](/docs/datapack/data-types/item-stack) data type, so it takes the same fields and the same legacy aliases.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `item` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The ID of a registered item. `id` is accepted as an alias. |
| `amount` | [Integer](/docs/datapack/data-types/integer) | `1` | The size of the stack. `count` is accepted as an alias. It is parsed, but see the note below. |
| `components` | [Object](/docs/datapack/data-types/object) | _optional_ | 1.21.1 only. Vanilla `DataComponentPatch` JSON, such as potion contents, a dyed colour, enchantments or a custom name. |
| `tag` | [NBT](/docs/datapack/data-types/nbt) | _optional_ | 1.20.1 only. The NBT equivalent of `components`. |

```json
"icon": {
   "item": "minecraft:potion",
   "components": {
      "minecraft:potion_contents": {
         "potion": "minecraft:water_breathing"
      }
   }
}
```

> [!NOTE]
> `amount` never shows. An icon is drawn without item decorations, so the stack count and the durability bar aren't rendered, only the sprite itself, tinted and glinted by its components.

### Texture

An object with a `texture` field. It draws the PNG directly, with no item model involved.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `texture` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The path to the PNG, relative to `assets/<namespace>/`. |
| `width` | [Integer](/docs/datapack/data-types/integer) | the whole file | The width in pixels of the region to draw, measured from the top-left of the file. |
| `height` | [Integer](/docs/datapack/data-types/integer) | the whole file | The height in pixels of the region to draw, measured from the top-left of the file. |

```json
"icon": {
  "texture": "example:textures/gui/skills/fireball.png"
}
```

You don't normally need `width` and `height`. The file's real size is read from the PNG and the whole image is scaled into the 16×16 icon slot, so a 16×16, 64×64 or 256×256 file all work. Only set them to draw part of a larger file, such as the top-left 32×32 of a sprite sheet:

```json
"icon": {
  "texture": "example:textures/gui/skills/sheet.png",
  "width": 32,
  "height": 32
}
```

> [!NOTE]
> A texture icon is a plain image, with no enchantment glint, no item tooltip and no durability bar. Use the item form when you want those.

> [!NOTE]
> Icons larger than the slot are downscaled with smoothing, so fine detail and thin lines survive instead of dropping out. An icon made at exactly 16×16 is drawn pixel for pixel.

## Examples

A skill tree tab with a custom texture, and a node using a plain item:

```json
{
   "name":"Pyromancy",
   "icon":{
      "texture":"example:textures/gui/skills/pyromancy_tab.png"
   }
}
```

```json
{
   "parent":"example:pyromancy",
   "icon":"minecraft:blaze_powder",
   "cost":1,
   "powers":[
      "example:fireball"
   ]
}
```

An origin icon using a dyed leather helmet, so the sprite carries the origin's colour:

```json
{
   "icon":{
      "item":"minecraft:leather_helmet",
      "components":{
         "minecraft:dyed_color":{
            "rgb":9714970
         }
      }
   }
}
```
