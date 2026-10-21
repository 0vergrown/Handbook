---
title: "Prevent Powers (Power Type)"
description: "Suppresses other powers on the entity while this one is active."
navigation_title: "Prevent Powers"
---

Suppresses the listed powers for as long as this power is active. A suppressed power does nothing: it doesn't tick or apply, and its conditions aren't evaluated. The entity still holds it, so it comes straight back when this power stops applying.

That makes `apoli:prevent_powers` the right tool for a temporary lockout, because revoking a power and granting it again would lose its state.

Type ID: `apoli:prevent_powers`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `powers` | [Array](/docs/datapack/data-types/array) of [Identifier](/docs/datapack/data-types/identifier) | _required_ | The IDs of the powers to suppress. |
| `update_rate` | [Integer](/docs/datapack/data-types/integer) | `5` | How often, in ticks, this power checks its own `condition` again. Raise it if the condition is expensive and doesn't need to be exact. |

## Examples

Lose your abilities in water:

```json
{
  "type": "apoli:prevent_powers",
  "powers": [
    "mypack:fire_breath",
    "mypack:heat_aura"
  ],
  "condition": {
    "type": "apoli:submerged_in",
    "fluid": "minecraft:water"
  }
}
```

A silence effect driven by a resource, checked every tick so it takes effect immediately:

```json
{
  "type": "apoli:prevent_powers",
  "powers": ["mypack:blink", "mypack:shockwave"],
  "update_rate": 1,
  "condition": {
    "type": "apoli:resource",
    "resource": "mypack:silence",
    "comparison": ">",
    "compare_to": 0
  }
}
```

> [!NOTE]
> Suppression is tracked by source, so several powers can suppress the same power, and it stays suppressed until all of them stop. To suppress a power from a command or an action, use [`apoli:suppress_power`](/docs/datapack/entity-actions/suppress_power).
