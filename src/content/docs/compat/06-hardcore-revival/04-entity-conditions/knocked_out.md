---
title: "Knocked Out (Entity Condition Type)"
description: Passes while the entity is knocked out.
navigation_title: "Knocked Out"
---

Passes while the entity is in the knocked-out state.

Type ID: `apoli:knocked_out`

## Fields

_None._

## Examples

Glow while you are down, so allies can see you:

```json
{
  "type": "apoli:self_glow",
  "condition": { "type": "apoli:knocked_out" }
}
```

Find the downed players around you, which is how a revive ability picks its targets:

```json
{
  "type": "apoli:target_condition",
  "condition": { "type": "apoli:knocked_out" }
}
```

Suppress your abilities while you are down:

```json
{
  "type": "apoli:prevent_powers",
  "powers": ["mypack:blink", "mypack:fire_breath"],
  "condition": { "type": "apoli:knocked_out" }
}
```

> Needs [Hardcore Revival](https://modrinth.com/mod/hardcore-revival). These types do not exist without it, so a pack using them must depend on the mod.
