---
title: "Grabbed (Entity Condition Type)"
description: "Checks whether the entity is being held by an apoli:grab."
navigation_title: "Grabbed"
---

Checks whether the entity is being held by someone's [apoli:grab](/docs/datapack/bientity-actions/grab).

Type ID: `apoli:grabbed`

This condition has no fields. To check who is holding it, use the [bi-entity condition of the same name](/docs/datapack/bientity-conditions/grabbed).

## Example

```json
"condition": {
    "type": "apoli:grabbed"
}
```

Passes while the entity is held. Put it in a power's `condition` to switch that power off while its holder is being carried.

> Grabs are tracked on the server, so this condition is always false when the client evaluates it — it can't drive a purely visual power.
