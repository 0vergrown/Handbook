---
title: "origins:revoke_power"
description: "[Entity Action Type](../entityactiontypes.md)"
---

Entity Action Type

Revokes a power from the entity from a specified power source.

Type ID: `origins:revoke_power`


## Fields

Field | Type | Default | Description
------|------|---------|-------------
`power` | Identifier | | The namespace and ID of the power to be revoked from the entity.
`source` | Identifier | | The namespace and ID of the source of the power.


## Examples

```json
"entity_action": {
    "type": "origins:revoke_power",
    "power": "origins:elytra",
    "source": "origins:elytrian"
}
```

This example will revoke the `origins:elytra` power from the `origins:elytrian` source from the entity.

