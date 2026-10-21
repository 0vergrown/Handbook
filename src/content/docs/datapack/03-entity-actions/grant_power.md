---
title: "Grant Power (Entity Action Type)"
description: "Grants a power to the entity under a power source."
navigation_title: "Grant Power"
---

Grants a power to the entity under a power source.

Type ID: `apoli:grant_power`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `power` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The ID of the power to grant. |
| `source` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The ID of the source the power is granted under. |

## Examples

```json
"entity_action": {
    "type": "apoli:grant_power",
    "power": "origins:burn_in_daylight",
    "source": "example:power_source"
}
```

This grants the entity the `origins:burn_in_daylight` power under the `example:power_source` source.

## Any entity can receive a power

The entity doesn't need to hold any powers already. A mob, an item, an armor stand or a projectile that has never had a power gets one the first time `apoli:grant_power` runs on it. That is how the `projectile_action` of [apoli:fire_projectile](/docs/datapack/powers/fire_projectile) gives a projectile its model, its trail or a marker power to read on impact:

```json
"projectile_action": {
    "type": "apoli:grant_power",
    "power": "example:spirit_orb_trail",
    "source": "example:spirit_orb"
}
```

## Choosing a source

The source is how the power is taken away again. [apoli:revoke_power](/docs/datapack/entity-actions/revoke_power) removes the pair, and a power stays while any of its sources remain.

> [!WARNING]
> Never use the ID of an [apoli:multiple](/docs/datapack/powers/multiple) power the entity holds as the source. A multiple owns every power granted under its own ID and keeps that set equal to its `sub_powers`, so anything else granted under that ID is removed again within a tick. Give the grant a source of its own. The ID of the power or upgrade doing the granting is the usual choice.
