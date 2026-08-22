---
title: "Switch Shape (Entity Action Type)"
description: Changes the player's WoodWalkers shape.
navigation_title: "Switch Shape"
aliases: ["change_shape", "morph", "shappoli:switch_shape"]
---

Changes the player's shape. With no `shape` it clears the shape and returns them to normal.

There is a bi-entity version of this action too, which takes its shape from the **target** — that is how you write "become whatever you just killed".

Type ID: `apoli:switch_shape` (aliases `apoli:change_shape`, `apoli:morph`, `shappoli:switch_shape`)

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`shape` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | The entity type to become. Omit it to clear the shape.
`nbt` | [NBT](/docs/datapack/data-types/nbt) | _optional_ | Extra NBT for the shape entity, for variants such as a cat's or a horse's.
`action_on_success` | [Entity Action](/docs/datapack/entity-actions) | _optional_ | Runs on the player only if the shape actually changed. WoodWalkers refuses blacklisted entity types, and an [`apoli:prevent_shape_change`](/docs/compat/woodwalkers/prevent_shape_change) power can refuse too.

## Examples

Become a bat on a keybind, with a puff of smoke to sell it:

```json
{
  "type": "apoli:action_on_key_press",
  "key": { "key": "key.origins.primary_active" },
  "cooldown": 100,
  "entity_action": {
    "type": "apoli:switch_shape",
    "shape": "minecraft:bat",
    "action_on_success": {
      "type": "apoli:spawn_particles",
      "particle": "minecraft:smoke",
      "count": 20
    }
  }
}
```

Turn back into yourself:

```json
{
  "type": "apoli:switch_shape"
}
```

A shape with variant data:

```json
{
  "type": "apoli:switch_shape",
  "shape": "minecraft:cat",
  "nbt": { "variant": "minecraft:black" }
}
```

Become what you killed, using the bi-entity form:

```json
{
  "type": "apoli:action_on_kill",
  "bientity_action": {
    "type": "apoli:switch_shape"
  }
}
```

> Needs [WoodWalkers](/docs/compat/woodwalkers). This type does not exist without it, so a pack using it must depend on the mod.
