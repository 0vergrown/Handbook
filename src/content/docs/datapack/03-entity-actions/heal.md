---
title: "Heal (Entity Action Type)"
description: "Restores health to the entity, or takes health away when the amount is negative."
navigation_title: "Heal"
---

Restores health to the entity. A negative amount takes health away instead.

Type ID: `apoli:heal`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `amount` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | _required_ | How much health to restore. A negative amount removes that much health. |

## Examples

```json
"entity_action": {
    "type": "apoli:heal",
    "amount": 6
}
```

This restores 3 hearts.

```json
"entity_action": {
    "type": "apoli:heal",
    "amount": -4
}
```

This takes 2 hearts away.

> [!NOTE]
> A negative `amount` changes health directly. Armor, absorption and damage modifiers don't apply, and the entity doesn't flinch. If it would leave the entity at 0 health or less, the action deals lethal `minecraft:generic` damage instead, so the entity dies normally (death message, drops, [`apoli:action_on_death`](/docs/datapack/powers/action_on_death)) and a Totem of Undying or [`apoli:prevent_death`](/docs/datapack/powers/prevent_death) can still save it. An entity that can't take that damage, like a player in Creative mode, keeps its current health.
