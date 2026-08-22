---
title: "Prevent Powers (Power Type)"
description: Suppresses other powers on the entity while this one is active.
navigation_title: "Prevent Powers"
---

Suppresses the listed powers for as long as this power is active. A suppressed power is fully inert — it does not tick, does not apply, and its conditions are not evaluated — but it is still *held*, so it comes straight back when this power stops applying.

That is what makes it the right tool for a temporary lockout, where revoking and re-granting would lose the power's state.

Type ID: `apoli:prevent_powers`

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`powers` | array of [Identifier](/docs/datapack/data-types/identifier) | **required** | The power ids to suppress.
`update_rate` | [Integer](/docs/datapack/data-types/integer) | `5` | How often, in ticks, to re-check this power's own `condition`. Raise it if the condition is expensive and does not need to be exact.

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

A silence effect driven by a resource, checked every tick because it needs to feel immediate:

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

> Suppression is by source, so several powers can suppress the same target and it stays suppressed until all of them stop. To suppress from a command or an action instead, use [`apoli:suppress_power`](/docs/datapack/entity-actions/suppress_power).
