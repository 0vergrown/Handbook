---
title: "Elytra Flight Possible (Entity Condition Type)"
description: "Checks whether the entity can glide, with an elytra or an apoli:elytra_flight power."
navigation_title: "Elytra Flight Possible"
---

Checks whether the entity can glide, either with an elytra or with a power that uses [apoli:elytra_flight](/docs/datapack/powers/elytra_flight).

Type ID: `apoli:elytra_flight_possible`

> [!NOTE]
> With both `check_state` and `check_abilities` set to `true`, the condition checks whether the player could start gliding right now. With both set to `false`, it always passes.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `check_state` | [Boolean](/docs/datapack/data-types/boolean) | `false` | With `true`, checks whether pressing `key.jump` would start gliding, if the player had the ability to. |
| `check_abilities` | [Boolean](/docs/datapack/data-types/boolean) | `true` | With `true`, checks whether the player has the ability to glide, for example by wearing an elytra or having a power that uses [apoli:elytra_flight](/docs/datapack/powers/elytra_flight). |

## Examples

```json
"condition": {
    "type": "apoli:elytra_flight_possible",
    "check_state": true,
    "check_abilities": true
}
```

This checks whether the player can start gliding.
