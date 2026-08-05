---
title: "Icon (Data Type)"
description: "An item or a texture, used wherever Apoli or Origins draws a small picture."
navigation_title: "Icon"
---

An item **or** a texture. Used by [skill trees](/docs/datapack/skill-tree/skill-tree-json-format), the in-power `skill` block, and an [origin](/docs/datapack/origins/overview)'s `icon` field.

## Shapes

An icon accepts three shapes. The first two draw an item; the third draws a plain image, so you don't have to register a throwaway item just to get a custom picture.

```json
"icon": "minecraft:cod"
```

```json
"icon":{
   "item":"minecraft:potion",
   "components":{
      "minecraft:potion_contents":{
         "potion":"minecraft:water_breathing"
      }
   }
}
```

```json
"icon": {
  "texture": "example:textures/gui/skills/fireball.png"
}
```

A bare string is an item id. An object with `item` is a full [Item Stack](/docs/datapack/data-types/item-stack). An object with `texture` is the texture form:

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `texture` | [Identifier](/docs/datapack/data-types/identifier) | **required** for the texture form | Path to the PNG, relative to `assets/<namespace>/`. |
| `width` | [Integer](/docs/datapack/data-types/integer) | whole file | Width in pixels of the region to draw, measured from the top-left of the file. |
| `height` | [Integer](/docs/datapack/data-types/integer) | whole file | Height in pixels of the region to draw, measured from the top-left of the file. |

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
