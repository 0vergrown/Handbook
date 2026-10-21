---
title: "Gain Air (Entity Action Type)"
description: "Gives a living entity back some of its breath."
navigation_title: "Gain Air"
---

Gives a living entity back some of its breath, the air shown as bubbles above the hunger bar.

Type ID: `apoli:gain_air`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | _required_ | How much breath to restore. |

## Examples

```json
"entity_action": {
    "type": "apoli:gain_air",
    "value": 20
}
```

This restores about 1 second of breath.
