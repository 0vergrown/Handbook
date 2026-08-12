---
title: "Toggle (Entity Action Type)"
description: "Toggles the state of a power that uses the Toggle (Power Type)."
navigation_title: "Toggle"
---

Toggles the state of a power that uses the [Toggle (Power Type)](/docs/datapack/powers/toggle).

Type ID: `apoli:toggle`

> Not to be confused with [Toggle (Power Type)](/docs/datapack/powers/toggle).


## Fields

Field | Type | Default | Description
------|------|---------|-------------
`power` | Identifier | | The namespace and ID of the power that uses the [Toggle (Power Type)](/docs/datapack/powers/toggle).

## Examples

```json
"entity_action": {
    "type": "apoli:toggle",
    "power": "origins:phantomize"
}
```

This example will toggle the state of the [`origins:phantomize`](https://github.com/apace100/origins-fabric/blob/1.17/src/main/resources/data/origins/powers/phantomize.json) (`data/origins/powers/phantomize.json`) power (e.g: ON --> OFF, OFF --> ON).
