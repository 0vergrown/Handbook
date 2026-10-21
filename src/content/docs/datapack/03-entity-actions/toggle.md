---
title: "Toggle (Entity Action Type)"
description: "Switches a toggle power on or off."
navigation_title: "Toggle"
---

Switches a power that uses the [Toggle power type](/docs/datapack/powers/toggle) on if it is off, and off if it is on.

Type ID: `apoli:toggle`

> [!NOTE]
> This is the entity action. For the power type it switches, see [Toggle (Power Type)](/docs/datapack/powers/toggle).

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `power` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The ID of a power that uses the [Toggle power type](/docs/datapack/powers/toggle). |

## Examples

```json
"entity_action": {
    "type": "apoli:toggle",
    "power": "origins:phantomize"
}
```

This switches the [`origins:phantomize`](https://github.com/apace100/origins-fabric/blob/1.17/src/main/resources/data/origins/powers/phantomize.json) power (`data/origins/powers/phantomize.json`) to its other state.
