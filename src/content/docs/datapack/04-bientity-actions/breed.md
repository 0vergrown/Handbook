---
title: "Breed (Bi-Entity Action Type)"
description: "The actor and the target have a baby together, as if they had just been bred."
navigation_title: "Breed"
---

The actor and the target have a baby together, as if they had just been bred. They don't need to be in love, and they don't need to be off their breeding cooldown.

Type ID: `apoli:breed`

Both have to be adult animals that can breed with each other: two of the same kind, or a horse and a donkey, which have a mule. The baby appears where the actor stands.

Everything that follows a normal breeding happens too. The player who fed either parent is credited with the breeding, experience orbs drop, and both parents get the five minute cooldown before they can breed again. Frogs get ready to lay spawn and sniffers lay an egg, as they do when bred normally.

## Fields

This action has no fields.

## Examples

```json
"bientity_action": {
    "type": "apoli:breed"
}
```

Used as the `parents_action` of [apoli:action_on_breed](/docs/datapack/powers/action_on_breed), this gives the two parents a second baby.
