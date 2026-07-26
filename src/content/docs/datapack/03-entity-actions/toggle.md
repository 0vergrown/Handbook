---
title: "origins:toggle"
description: "[Entity Action Type](../entityactiontypes.md)"
---

Entity Action Type

Toggles the state of a power that uses the [Toggle (Power Type)](/docs/datapack/powers/toggle).

Type ID: `origins:toggle`

!!! note

    Not to be confused with [Toggle (Power Type)](/docs/datapack/powers/toggle).


## Fields

Field | Type | Default | Description
------|------|---------|-------------
`power` | Identifier | | The namespace and ID of the power that uses the [Toggle (Power Type)](/docs/datapack/powers/toggle).


## Examples

```json
"entity_action": {
    "type": "origins:toggle",
    "power": "origins:phantomize"
}
```

This example will toggle the state of the [`origins:phantomize`](https://github.com/apace100/origins-fabric/blob/1.17/src/main/resources/data/origins/powers/phantomize.json) (`data/origins/powers/phantomize.json`) power (e.g: ON --> OFF, OFF --> ON).

