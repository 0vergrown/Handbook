---
title: "apoli:roped_together"
description: "Checks whether the actor and the target are connected by a rope (in either direction) — see the [Attach…"
---

Checks whether the actor and the target are connected by a rope (in either direction) — see the [Attach Rope](/docs/datapack/entity-actions/attach_rope) action. Useful for logic like a captured entity checking whether it is still tied to its captor, or a whip user checking they still hold their target.

Type ID: `apoli:roped_together`

This condition takes no fields.

## Example
```json
{
    "type": "apoli:roped_together"
}
```

True while a rope has the actor as one end and the target as the other.

