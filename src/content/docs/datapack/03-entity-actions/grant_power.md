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

## Any entity can receive a power

The entity does not need to hold any powers already. A mob, an item, an armor stand or a projectile
that has never had a power gets one the first time `apoli:grant_power` runs on it — which is how
[apoli:fire_projectile](/docs/datapack/powers/fire_projectile)'s `projectile_action` gives a
projectile its model, its trail or a marker power read on impact:

```json
"projectile_action": {
    "type": "apoli:grant_power",
    "power": "example:spirit_orb_trail",
    "source": "example:spirit_orb"
}
```

## Choosing a source

The source is how the power is taken away again: [apoli:revoke_power](/docs/datapack/entity-actions/revoke_power)
removes the pair, and a power stays while any of its sources remain.

> **Never use the id of an [apoli:multiple](/docs/datapack/powers/multiple) power the entity holds as
> the source.** A multiple owns every power granted under its own id and keeps that set equal to its
> `sub_powers`, so anything else granted under that id is removed again within a tick. Give the
> grant a source of its own — the id of the power or upgrade doing the granting is the usual choice.
