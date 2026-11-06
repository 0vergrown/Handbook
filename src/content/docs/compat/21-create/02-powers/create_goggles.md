---
title: "Create Goggles (Power Type)"
description: "Shows Create's goggle overlay as if the entity wore Engineer's Goggles."
navigation_title: "Create Goggles"
---

Shows the holder Create's goggle overlay, the panel of stress, speed and other details that appears when looking at a Create block, as if they wore Engineer's Goggles. Create treats the holder as a goggle wearer everywhere it checks, so the other goggle-only details Create draws appear as well.

Type ID: `apoli:create_goggles`

> [!NOTE]
> This type only does something with [Create](https://modrinth.com/mod/create) installed. It loads without Create, and does nothing there.

## Fields

This power type has no fields.

> [!WARNING]
> Create draws the overlay on the client, so the power's `condition` is checked against the world as the client knows it. Conditions that need state only the server has never pass there, such as [power inventories](/docs/datapack/powers/inventory), [apoli:command](/docs/datapack/entity-conditions/command), [apoli:advancement](/docs/datapack/entity-conditions/advancement), [apoli:scoreboard](/docs/datapack/entity-conditions/scoreboard) and [apoli:stat](/docs/datapack/entity-conditions/stat). Use [apoli:power_active](/docs/datapack/entity-conditions/power_active) or a [resource](/docs/datapack/powers/resource) instead, because those are synced.

## Examples

```json
{
  "type": "apoli:create_goggles"
}
```

The holder always sees the goggle overlay.

```json
{
  "type": "apoli:create_goggles",
  "condition": {
    "type": "apoli:sneaking"
  }
}
```

The overlay only shows while the holder is sneaking.
