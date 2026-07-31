---
title: "Grant Power (Entity Action Type)"
description: "Grants a power to the entity from a specified power source."
navigation_title: "Grant Power"
---

Grants a power to the entity from a specified power source.

Type ID: `apoli:grant_power`

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`power` | Identifier | | The namespace and ID of the power to be granted to the entity.
`source` | Identifier | | The namespace and ID of the source of the granted power.

## Examples

```json
"entity_action": {
    "type": "apoli:grant_power",
    "power": "origins:burn_in_daylight",
    "source": "example:power_source"
}
```

This example will grant the entity the `origins:burn_in_daylight` power from the `example:power_source` source.
