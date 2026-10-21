---
title: "Shape (Entity Condition Type)"
description: "Tests a bi-entity condition between the player and their current shape."
navigation_title: "Shape"
aliases: ["shape", "shappoli:shape_condition", "shappoli:shape"]
---

Tests a [bi-entity condition](/docs/datapack/bientity-conditions) with the player as the actor and their current WoodWalkers shape as the target. A player who hasn't taken a shape is their own target, so a condition that would pass for a plain player still passes.

This is the general check for what the player is right now, and most questions about a shape are some condition applied to the target.

Type ID: `apoli:shape_condition` (aliases `apoli:shape`, `shappoli:shape_condition`)

> [!NOTE]
> This type needs [WoodWalkers](/docs/compat/woodwalkers/overview) and doesn't exist without it, so a pack that uses it must depend on the mod.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `bientity_condition` | [Bi-entity Condition Type](/docs/datapack/bientity-conditions) | _required_ | Tested with the player as the actor and the shape as the target. |

## Examples

```json
{
  "type": "apoli:shape_condition",
  "bientity_condition": {
    "type": "apoli:target_condition",
    "condition": { "type": "apoli:in_tag", "tag": "minecraft:undead" }
  }
}
```

This checks whether the player is currently something undead.

```json
{
  "type": "apoli:creative_flight",
  "condition": {
    "type": "apoli:shape_condition",
    "bientity_condition": {
      "type": "apoli:target_condition",
      "condition": { "type": "apoli:entity_type", "entity_type": "minecraft:bat" }
    }
  }
}
```

This lets the player fly only while they are shaped as a bat.
