---
title: "Owner (Bi-Entity Condition Type)"
description: "Checks whether the actor entity is the owner of the tamable target entity."
navigation_title: "Owner"
---

Checks whether the actor entity is the owner of the tamable target entity. It also passes for an entity that remembers who made it, such as a projectile or primed TNT; to match projectiles and nothing else, use [`apoli:projectile_owner`](/docs/datapack/bientity-conditions/projectile_owner).

Type ID: `apoli:owner`
## Fields
_None._
## Examples

```json
"bientity_condition": {
    "type": "apoli:owner"
}
```
