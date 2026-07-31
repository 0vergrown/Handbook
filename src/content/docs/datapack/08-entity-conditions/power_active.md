---
title: "Power Active (Entity Condition Type)"
description: "Checks whether the specified power is 'active', meaning that the entity has the power and the power has all its conditions fulfilled."
navigation_title: "Power Active"
---

Checks whether the specified power is "active", meaning that the entity has the power and the power has all its conditions fulfilled.

Type ID: `apoli:power_active`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`power` | Identifier | | The namespace and ID of the power which will be checked for being active.

## Examples

```json
"condition": {
    "type": "apoli:power_active",
    "power": "origins:phantomize"
}
```

This example will check if the [`origins:phantomize`](https://github.com/apace100/origins-fabric/blob/master/src/main/resources/data/origins/powers/phantomize.json) power is toggled on.
