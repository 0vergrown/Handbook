---
title: "Switch Shape (Entity Action Type)"
description: "Changes the player's WoodWalkers shape."
navigation_title: "Switch Shape"
aliases: ["change_shape", "morph", "shappoli:switch_shape"]
---

Changes the player's shape. With no `shape`, it clears the shape and returns them to normal.

There is a bi-entity version of this action too, which takes its shape from the target, and that is how you make a player become whatever they just killed.

Type ID: `apoli:switch_shape` (aliases `apoli:change_shape`, `apoli:morph`, `shappoli:switch_shape`)

> [!NOTE]
> This type needs [WoodWalkers](/docs/compat/woodwalkers/overview) and doesn't exist without it, so a pack that uses it must depend on the mod.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `shape` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | The entity type to become. Leave it out to clear the shape. |
| `nbt` | [NBT](/docs/datapack/data-types/nbt) | _optional_ | Extra NBT for the shape entity, for variants such as a cat's or a horse's. |
| `action_on_success` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Runs on the player only if the shape actually changed. WoodWalkers refuses entity types on its blacklist, and an [`apoli:prevent_shape_change`](/docs/compat/woodwalkers/prevent_shape_change) power can refuse too. |

## Examples

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

This turns the player into a bat on a key press, with a puff of smoke when it works.

```json
{
  "type": "apoli:switch_shape"
}
```

This turns the player back into themselves.

```json
{
  "type": "apoli:switch_shape",
  "shape": "minecraft:cat",
  "nbt": { "variant": "minecraft:black" }
}
```

This picks a shape with variant data, a black cat.

```json
{
  "type": "apoli:action_on_kill",
  "bientity_action": {
    "type": "apoli:switch_shape"
  }
}
```

With the bi-entity form, the player becomes whatever they kill.
