---
title: "Set Iteration (Data Type)"
description: "A string that decides which side of an entity set is walked."
navigation_title: "Set Iteration"
---

A [String](/docs/datapack/data-types/string) that [apoli:action_on_entity_set](/docs/datapack/entity-actions/action_on_entity_set) uses to decide which side of an [apoli:entity_set](/docs/datapack/powers/entity_set) to walk.

## Values

| Value | Description |
| --- | --- |
| `members` | Walks the set the acting entity owns. The actor is the acting entity, and each target is one member of its set. The acting entity must hold the `set` power, or nothing happens. |
| `owners` | Walks the sets the acting entity is in, once per entity whose `set` power contains the acting entity. The actor is that owner and the target is the acting entity. The acting entity doesn't need to hold the `set` power. |

> [!NOTE]
> The roles swap between the two values, and that is what `owners` is for. Bi-entity actions like [apoli:remove_from_entity_set](/docs/datapack/bientity-actions/remove_from_entity_set) act on the actor's set, so the owner has to be the actor for a member to leave a set it doesn't own.
