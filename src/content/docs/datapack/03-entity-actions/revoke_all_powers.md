---
title: "Revoke All Powers (Entity Action Type)"
description: "Revokes every power that came from the named sources."
navigation_title: "Revoke All Powers"
---

Revokes every power that came from one or more named sources.

Type ID: `apoli:revoke_all_powers`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `source` | [Identifier](/docs/datapack/data-types/identifier) or [Array](/docs/datapack/data-types/array) of Identifier | _required_ | The sources to revoke powers from. |

## Behaviour

Two things happen for each source:

1. Every power the entity holds under that source tag loses that grant. A power granted by two sources survives with one grant left.
2. If the ID also names a real power source (an origin, an origin layer, a skill tree or an [apoli:multiple](/docs/datapack/powers/multiple) power), every power that source provides is removed completely, sub-powers included, whichever source granted it.

The second step is why `"source": "example:phoenix"` strips a whole origin however those powers arrived.

## Examples

```json
{
    "type": "apoli:revoke_all_powers",
    "source": "example:phoenix"
}
```

Undo grants from several sources at once:

```json
{
   "type":"apoli:revoke_all_powers",
   "source":[
      "example:absorbed",
      "example:temporary_boon"
   ]
}
```

> [!NOTE]
> Powers an origin grants come back when the origin applies again (on relog, `/reload` or a layer revalidation). To remove them for good, change the player's origin.
