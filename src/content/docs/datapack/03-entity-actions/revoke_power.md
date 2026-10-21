---
title: "Revoke Power (Entity Action Type)"
description: "Takes a power away from the entity, for one power source only."
navigation_title: "Revoke Power"
---

Takes a power away from the entity, for one power source only. The entity keeps the power if another source still grants it.

Type ID: `apoli:revoke_power`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `power` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The ID of the power to revoke. |
| `source` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The ID of the source the power is revoked from. |

## Examples

```json
"entity_action": {
    "type": "apoli:revoke_power",
    "power": "origins:elytra",
    "source": "origins:elytrian"
}
```

This revokes the `origins:elytra` power granted by the `origins:elytrian` source.
