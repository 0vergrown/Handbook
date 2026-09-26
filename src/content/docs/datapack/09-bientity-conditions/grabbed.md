---
title: "Grabbed (Bi-Entity Condition Type)"
description: "Checks whether the actor is holding the target with an apoli:grab."
navigation_title: "Grabbed"
---

Checks whether the actor is holding the target with an [apoli:grab](/docs/datapack/bientity-actions/grab) — the same roles as the grab action itself: actor holds, target is held. To ask it the other way round, wrap it in [apoli:invert](/docs/datapack/bientity-conditions/invert).

Type ID: `apoli:grabbed`

This condition has no fields. To check whether an entity is held by anyone at all, use the [entity condition of the same name](/docs/datapack/entity-conditions/grabbed).

## Example

```json
"bientity_condition": {
    "type": "apoli:grabbed"
}
```

In an [apoli:action_on_hit](/docs/datapack/powers/action_on_hit), limits the power to hits on whoever the actor is currently carrying.

> Grabs are tracked on the server, so this condition is always false when the client evaluates it.
