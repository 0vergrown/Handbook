---
title: "Revoke Power (Entity Action Type)"
description: "Revokes a power from the entity from a specified power source."
navigation_title: "Revoke Power"
---

Revokes a power from the entity from a specified power source.

Type ID: `apoli:revoke_power`

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`power` | Identifier | | The namespace and ID of the power to be revoked from the entity.
`source` | Identifier | | The namespace and ID of the source of the power.

## Examples

```json
"entity_action": {
    "type": "apoli:revoke_power",
    "power": "origins:elytra",
    "source": "origins:elytrian"
}
```

This example will revoke the `origins:elytra` power from the `origins:elytrian` source from the entity.
