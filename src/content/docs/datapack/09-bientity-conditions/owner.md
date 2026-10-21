---
title: "Owner (Bi-Entity Condition Type)"
description: "Checks whether the actor owns the target, such as a tamed animal or a projectile it fired."
navigation_title: "Owner"
---

Checks whether the actor owns the target, for example a tamed animal. It also passes for an entity that remembers who made it, such as a projectile or primed TNT. To match projectiles and nothing else, use [`apoli:projectile_owner`](/docs/datapack/bientity-conditions/projectile_owner).

Type ID: `apoli:owner`

## Fields

This condition has no fields.

## Examples

```json
"bientity_condition": {
    "type": "apoli:owner"
}
```
