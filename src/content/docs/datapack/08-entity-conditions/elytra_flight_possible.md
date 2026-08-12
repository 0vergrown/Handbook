---
title: "Elytra Flight Possible (Entity Condition Type)"
description: "Checks if the entity can fly with either an Elytra item or a power that uses the apoli:elytraflight."
navigation_title: "Elytra Flight Possible"
---

Checks if the entity can fly with either an Elytra item or a power that uses the [apoli:elytra_flight](/docs/datapack/powers/elytra_flight).

Type ID: `apoli:elytra_flight_possible`

> If both `check_state` and `check_abilities` boolean fields are set to `true`, the entity condition type will check if the player can activate elytra flight at the very moment.


> If both `check_state` and `check_abilities` boolean fields are set to `false`, the entity condition type will evaluate to true.


## Fields

Field | Type | Default | Description
------|------|---------|------------
`check_state` | Boolean | `false` | If set to `true`, the entity condition type will check if pressing the `key.jump` keybind would activate elytra flight if the player had the ability to.
`check_abilities` | Boolean | `true` | If set to `true`, the entity condition type will check whether the player has the ability to activate elytra flight. (e.g: wearing an elytra or have a power that uses the [apoli:elytra_flight](/docs/datapack/powers/elytra_flight))

## Examples

```json
"condition": {
    "type": "apoli:elytra_flight_possible",
    "check_state": true,
    "check_abilities": true
}
```

This example will check if the player can activate elytra flight.
