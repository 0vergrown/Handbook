---
title: "Prevent Shape Change (Power Type)"
description: Stops the player from changing shape.
navigation_title: "Prevent Shape Change"
aliases: ["prevent_morph", "shappoli:prevent_shape_change", "shappoli:prevent_morph"]
---

Blocks shape changes. With no condition it blocks every change, including clearing the shape — so gate it unless you really mean "you are stuck like this".

Type ID: `apoli:prevent_shape_change` (aliases `apoli:prevent_morph`, `shappoli:prevent_shape_change`)

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`bientity_condition` | [Bi-Entity Condition](/docs/datapack/bientity-conditions) | _optional_ | Only block when this passes. Actor is the player, target is the shape they are trying to become. Absent means block everything.

## Examples

You cannot become anything undead:

```json
{
  "type": "apoli:prevent_shape_change",
  "bientity_condition": {
    "type": "apoli:target_condition",
    "condition": { "type": "apoli:in_tag", "tag": "minecraft:undead" }
  }
}
```

Locked into your current shape while a resource is spent:

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

> Needs [WoodWalkers](/docs/compat/woodwalkers). This type does not exist without it, so a pack using it must depend on the mod.
