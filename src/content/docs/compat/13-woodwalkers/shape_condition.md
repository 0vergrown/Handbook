---
title: "Shape (Entity Condition Type)"
description: Tests a bi-entity condition between the player and their current shape.
navigation_title: "Shape"
aliases: ["shape", "shappoli:shape_condition", "shappoli:shape"]
---

Tests a [bi-entity condition](/docs/datapack/bientity-conditions) with the player as the actor and their current WoodWalkers shape as the target. A player who has not taken a shape is their own target, so a condition that would pass for a plain player still passes.

This is the general-purpose "what am I right now" check — most shape questions are some condition applied to the target.

Type ID: `apoli:shape_condition` (aliases `apoli:shape`, `shappoli:shape_condition`)

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`bientity_condition` | [Bi-Entity Condition](/docs/datapack/bientity-conditions) | **required** | Tested with the player as actor and the shape as target.

## Examples

Am I currently something undead?

```json
{
  "type": "apoli:shape_condition",
  "bientity_condition": {
    "type": "apoli:target_condition",
    "condition": { "type": "apoli:in_tag", "tag": "minecraft:undead" }
  }
}
```

Only fly while shaped as a bat:

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

> Needs [WoodWalkers](/docs/compat/woodwalkers). This type does not exist without it, so a pack using it must depend on the mod.
