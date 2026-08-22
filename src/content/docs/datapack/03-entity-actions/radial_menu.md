---
title: "Radial Menu (Entity Action Type)"
description: Opens a radial selection menu of actions for the player to choose from.
navigation_title: "Radial Menu"
aliases: ["sync:radial_menu"]
---

Opens a radial menu on the player's screen. Each slice runs an entity action when it is picked, so this is how one keybind becomes a set of choices rather than a single ability.

Type ID: `apoli:radial_menu`

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`entries` | array of entry objects | **required** | The slices, in order. See below.
`sprite_location` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | A texture used for the menu's own background sprites.

### Entry fields

Field | Type | Default | Description
------|------|---------|-------------
`entity_action` | [Entity Action](/docs/datapack/entity-actions) | **required** | What picking this slice does.
`item` | [Item Stack](/docs/datapack/data-types/item-stack) | _optional_ | An item drawn as the slice's icon.
`icon` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | A texture drawn as the icon instead of an item.
`highlight_icon_texture` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | Icon used while the slice is hovered.
`button_texture` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | The slice's background.
`highlight_button_texture` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | Background while hovered.
`tooltip` | [Text Component](/docs/datapack/data-types/text-component) | _optional_ | Text shown while hovered.
`distance` | [Integer](/docs/datapack/data-types/integer) | `-1` | How far from the centre the slice sits, in pixels. `-1` uses the default.
`velocity` | [Integer](/docs/datapack/data-types/integer) | `-1` | How quickly the slice animates outward. `-1` uses the default.
`button_width`, `button_height` | [Integer](/docs/datapack/data-types/integer) | `16`, `20` | Slice size in pixels.
`icon_width`, `icon_height` | [Integer](/docs/datapack/data-types/integer) | `16` | Icon size.
`item_width`, `item_height` | [Integer](/docs/datapack/data-types/integer) | `16` | Item icon size.

## Example

One keybind, three elemental choices:

```json
{
  "type": "apoli:action_on_key_press",
  "key": { "key": "key.origins.primary_active" },
  "cooldown": 40,
  "entity_action": {
    "type": "apoli:radial_menu",
    "entries": [
      {
        "item": { "id": "minecraft:blaze_powder" },
        "tooltip": { "translate": "mypack.menu.fire" },
        "entity_action": { "type": "apoli:set_on_fire", "duration": 4 }
      },
      {
        "item": { "id": "minecraft:snowball" },
        "tooltip": { "translate": "mypack.menu.frost" },
        "entity_action": { "type": "apoli:freeze", "amount": 140 }
      },
      {
        "item": { "id": "minecraft:feather" },
        "tooltip": { "translate": "mypack.menu.leap" },
        "entity_action": { "type": "apoli:add_velocity", "y": 1.2, "space": "local" }
      }
    ]
  }
}
```

> The choice is made on the client and confirmed by the server, so a slice whose action the player should not be able to run still needs its own `condition`.
