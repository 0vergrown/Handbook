---
title: "apoli:revoke_all_powers"
description: "Revokes every power that came from the named source(s)."
---

Revokes every power that came from the named source(s).

Type ID: `apoli:revoke_all_powers`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `source` | [Identifier](/docs/datapack/data-types/identifier) or [Array](/docs/datapack/data-types/array) of Identifier | **required** | The source(s) to revoke powers from. |

## Behaviour

Two things happen per source:

1. Every power the entity holds **under that source tag** loses that grant. A power granted by two sources survives with one grant left.
2. If the id also names a real power source — an origin, an origin layer, a skill tree or an [`Multiple (Power Type)`](/docs/datapack/powers/multiple) power — every power that source provides is removed **completely**, including sub-powers, whichever source granted it.

That second step is what makes `"source": "example:phoenix"` strip a whole origin regardless of how those powers arrived.

## Examples

```json
{
    "type": "apoli:revoke_all_powers",
    "source": "example:phoenix"
}
```

Undo a multi-source grant in one go:

```json
{
   "type":"apoli:revoke_all_powers",
   "source":[
      "example:absorbed",
      "example:temporary_boon"
   ]
}
```

> Powers an origin grants come back when the origin re-applies (on relog, `/reload`, or a layer revalidation). To remove them permanently, change the player's origin.