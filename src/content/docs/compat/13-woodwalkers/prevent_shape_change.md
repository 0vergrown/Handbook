---
title: "Prevent Shape Change (Power Type)"
description: "Stops the player from changing shape."
navigation_title: "Prevent Shape Change"
aliases: ["prevent_morph", "shappoli:prevent_shape_change", "shappoli:prevent_morph"]
---

Blocks shape changes. With no condition it blocks every change, including clearing the shape, so add a condition unless you really mean that the player is stuck as they are.

Type ID: `apoli:prevent_shape_change` (aliases `apoli:prevent_morph`, `shappoli:prevent_shape_change`)

> [!NOTE]
> This type needs [WoodWalkers](/docs/compat/woodwalkers/overview) and doesn't exist without it, so a pack that uses it must depend on the mod.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `bientity_condition` | [Bi-entity Condition Type](/docs/datapack/bientity-conditions) | _optional_ | Only blocks when this passes, with the player as the actor and the shape they are trying to become as the target. Without it, every change is blocked. |

## Examples

```json
{
  "type": "apoli:prevent_shape_change",
  "bientity_condition": {
    "type": "apoli:target_condition",
    "condition": { "type": "apoli:in_tag", "tag": "minecraft:undead" }
  }
}
```

The player can't become anything undead.

```json
{
  "type": "apoli:prevent_shape_change",
  "condition": {
    "type": "apoli:resource",
    "resource": "mypack:stamina",
    "comparison": "<=",
    "compare_to": 0
  }
}
```

The player is locked into their current shape while the `mypack:stamina` resource is used up.
