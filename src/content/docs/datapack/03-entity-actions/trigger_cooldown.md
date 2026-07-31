---
title: "Trigger Cooldown (Entity Action Type)"
description: "Sets a Cooldown's remaining ticks to its maximum — i.e."
navigation_title: "Trigger Cooldown"
---

Sets a [apoli:cooldown](/docs/datapack/powers/cooldown)'s remaining ticks to its maximum — i.e. "uses" the cooldown so it starts ticking down toward `0` (ready). Does nothing if the cooldown isn't ready yet.

Type ID: `apoli:trigger_cooldown`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `power` | [Identifier](/docs/datapack/data-types/identifier) | | The [apoli:cooldown](/docs/datapack/powers/cooldown) power to trigger. (The legacy field `resource` is still accepted as an alias.) |

## Behaviour

- If the cooldown's current value is `0` (ready), it gets set to `max` (just triggered) and starts ticking down.
- If the cooldown's current value is `> 0` (already cooling), this action is a no-op.
- To unconditionally set the cooldown (ignoring readiness), use [apoli:modify_resource](/docs/datapack/entity-actions/modify_resource) with `operation: set_base, value: <max>`.

## Example

```json
"entity_action": {
    "type": "apoli:trigger_cooldown",
    "power": "example:dash_cooldown"
}
```
