---
title: "Shape Action (Entity Action Type)"
description: Runs a bi-entity action between the player and their shape.
navigation_title: "Shape Action"
aliases: ["action_on_shape", "shappoli:shape_action"]
---

Runs a [bi-entity action](/docs/datapack/bientity-actions) with the player as actor and their current shape as target. A player with no shape is their own target.

Type ID: `apoli:shape_action` (aliases `apoli:action_on_shape`, `shappoli:shape_action`)

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`bientity_action` | [Bi-Entity Action](/docs/datapack/bientity-actions) | **required** | Run with the player as actor and the shape as target.

## Example

Heal yourself for a share of the shape's maximum health, which needs the shape as a target to read from:

```json
{
  "type": "apoli:shape_action",
  "bientity_action": {
    "type": "apoli:actor_action",
    "action": { "type": "apoli:heal", "amount": 2 }
  }
}
```

> Needs [WoodWalkers](/docs/compat/woodwalkers). This type does not exist without it, so a pack using it must depend on the mod.
