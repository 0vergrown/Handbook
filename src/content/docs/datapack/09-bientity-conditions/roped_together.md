---
title: "Roped Together (Bi-Entity Condition Type)"
description: Passes when the two entities are connected by an Apoli rope.
navigation_title: "Roped Together"
---

Passes when the actor and the target are joined by a rope created with [`apoli:attach_rope`](/docs/datapack/entity-actions/attach_rope). Direction does not matter — it is true from either end.

Type ID: `apoli:roped_together`

## Fields

_None._

## Examples

Glow for whoever you are tied to:

```json
{
  "type": "apoli:entity_glow",
  "bientity_condition": {
    "type": "apoli:roped_together"
  }
}
```

Do not damage the person on the other end of your rope:

```json
{
  "type": "apoli:modify_damage_dealt",
  "bientity_condition": { "type": "apoli:roped_together" },
  "modifier": {
    "operation": "multiply_base_multiplicative",
    "value": -1.0
  }
}
```

Pull them along when you use an ability:

```json
{
  "type": "apoli:area_of_effect",
  "radius": 32,
  "bientity_condition": { "type": "apoli:roped_together" },
  "bientity_action": {
    "type": "apoli:rope_pull",
    "speed": 0.4
  }
}
```
