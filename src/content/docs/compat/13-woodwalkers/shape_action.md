---
title: "Shape Action (Entity Action Type)"
description: "Runs a bi-entity action between the player and their shape."
navigation_title: "Shape Action"
aliases: ["action_on_shape", "shappoli:shape_action"]
---

Runs a [bi-entity action](/docs/datapack/bientity-actions) with the player as the actor and their current shape as the target. A player with no shape is their own target.

Type ID: `apoli:shape_action` (aliases `apoli:action_on_shape`, `shappoli:shape_action`)

> [!NOTE]
> This type needs [WoodWalkers](/docs/compat/woodwalkers/overview) and doesn't exist without it, so a pack that uses it must depend on the mod.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `bientity_action` | [Bi-entity Action Type](/docs/datapack/bientity-actions) | _required_ | Runs with the player as the actor and the shape as the target. |

## Example

```json
{
  "type": "apoli:shape_action",
  "bientity_action": {
    "type": "apoli:actor_action",
    "action": { "type": "apoli:heal", "amount": 2 }
  }
}
```

This heals the player by 2 health through the actor side of the action. Any bi-entity action that needs to read the shape can use the target side in the same way.
