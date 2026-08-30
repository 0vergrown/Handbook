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
`condition` | [Entity Condition](/docs/datapack/entity-conditions) | _optional_ | Checked when the menu opens. A slice whose condition fails is left out of the menu entirely, so the remaining slices close up around it.
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
`offset_x` | [Integer](/docs/datapack/data-types/integer) | `0` | Pixels to shift the slice right of where the ring puts it. Negative moves it left.
`offset_y` | [Integer](/docs/datapack/data-types/integer) | `0` | Pixels to shift the slice **down**. Negative moves it up. This is the one that lets a menu be something other than a flat circle.
`angle` | [Float](/docs/datapack/data-types/float) | evenly spaced | The slice's own angle around the centre, in degrees, `0` pointing right and increasing clockwise. Set it on every entry to build an arc, a column or a cross instead of a full ring.

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

### Laying the menu out by hand

`distance` moves a slice away from the centre along its own spoke; `offset_x` /
`offset_y` move it anywhere afterwards, and `angle` decides which spoke it sits on
in the first place. The offsets ride the same bloom animation as `distance`, so a
displaced slice still flies out from the middle rather than snapping into place.

A three-slice arc across the top of the screen, each one a little higher than the last:

```json
{
  "type": "apoli:radial_menu",
  "entries": [
    { "angle": 225, "distance": 60, "offset_y": -10, "item": {"id": "minecraft:blaze_powder"},
      "entity_action": {"type": "apoli:set_on_fire", "duration": 4} },
    { "angle": 270, "distance": 60, "offset_y": -24, "item": {"id": "minecraft:snowball"},
      "entity_action": {"type": "apoli:freeze", "amount": 140} },
    { "angle": 315, "distance": 60, "offset_y": -10, "item": {"id": "minecraft:feather"},
      "entity_action": {"type": "apoli:add_velocity", "y": 1.2, "space": "local"} }
  ]
}
```

> The choice is made on the client and confirmed by the server, so a slice whose action the player should not be able to run still needs its own `condition`.
