---
title: "Icon (Data Type)"
description: "An item or a texture, used wherever Apoli or Origins draws a small picture."
navigation_title: "Icon"
---

An item **or** a texture. Used by [skill trees](/docs/datapack/skill-tree/skill-tree-json-format), the in-power `skill` block, and an [origin](/docs/datapack/origins/overview)'s `icon` field.

## Shapes

An icon accepts three shapes. The first two draw an item; the third draws a plain image, so you don't have to register a throwaway item just to get a custom picture.

| Shape | Written as | Use it when |
| --- | --- | --- |
| [Item id](#item-id) | a bare string | you just want a vanilla or modded item's sprite |
| [Item stack](#item-stack) | an object with `item` | you need components/NBT on the item — a specific potion, a dyed leather cap |
| [Texture](#texture) | an object with `texture` | you have your own PNG |

An object carrying `texture` is read as a texture icon; any other object is read as an item stack; a string is read as an item id.

### Item id

The shorthand. The whole value is the item's [Identifier](/docs/datapack/data-types/identifier) — no fields, no object.

```json
"icon": "minecraft:cod"
```

| Value | Type | Default | Description |
| --- | --- | --- | --- |
| _(the string itself)_ | [Identifier](/docs/datapack/data-types/identifier) | **required** | ID of a registered item. Equivalent to `{"item": "<id>"}` with no other fields. |

> A bare string is only checked for **id syntax**, not for whether the item exists. A typo'd or absent id resolves to `minecraft:air`, and the icon silently draws nothing. The object form below validates against the item registry and fails loudly instead, so prefer it when you're pointing at another mod's item.

### Item stack

An object with an `item` field. This is the full [Item Stack](/docs/datapack/data-types/item-stack) data type, so it takes the same fields and the same legacy aliases.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `item` | [Identifier](/docs/datapack/data-types/identifier) | **required** | ID of a registered item. _Alias: `id`._ |
| `amount` | [Integer](/docs/datapack/data-types/integer) | `1` | Size of the stack. _Alias: `count`._ Parsed, but see the note below. |
| `components` | Object | _optional_ | **(1.21.1 only)** Vanilla `DataComponentPatch` JSON — potion contents, dyed colour, enchantments, custom name. |
| `tag` | [NBT](/docs/datapack/data-types/nbt) | _optional_ | **(1.20.1 only)** The pre-components equivalent of `components`. |

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

> **`amount` never shows.** An icon is drawn without item decorations, so the stack-count number and the durability bar are not rendered — only the sprite itself, tinted and glinted by its components.

### Texture

An object with a `texture` field. Draws the PNG directly, with no item model involved.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `texture` | [Identifier](/docs/datapack/data-types/identifier) | **required** | Path to the PNG, relative to `assets/<namespace>/`. |
| `width` | [Integer](/docs/datapack/data-types/integer) | whole file | Width in pixels of the region to draw, measured from the top-left of the file. |
| `height` | [Integer](/docs/datapack/data-types/integer) | whole file | Height in pixels of the region to draw, measured from the top-left of the file. |

```json
"icon": {
  "texture": "example:textures/gui/skills/fireball.png"
}
```

**You normally don't need `width`/`height`.** The file's real size is read from the PNG and the whole image is scaled into the 16×16 icon slot, so a 16×16, 64×64 or 256×256 file all just work. Set them only to draw a *sub-region* of a larger file, e.g. the top-left 32×32 of a sprite sheet:

```json
"icon": {
  "texture": "example:textures/gui/skills/sheet.png",
  "width": 32,
  "height": 32
}
```

> A texture icon is a plain image: no enchantment glint, no item tooltip, no durability bar. Use the item form when you want those.

> Icons larger than the slot are downscaled with smoothing, so fine detail and thin lines survive instead of dropping out. An icon authored at exactly 16×16 is drawn pixel-for-pixel.

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
