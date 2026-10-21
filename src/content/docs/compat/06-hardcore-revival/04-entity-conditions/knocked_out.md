---
title: "Knocked Out (Entity Condition Type)"
description: "Checks whether the entity is knocked out."
navigation_title: "Knocked Out"
---

Checks whether the entity is in the knocked-out state.

Type ID: `apoli:knocked_out`

> [!NOTE]
> This type needs [Hardcore Revival](https://modrinth.com/mod/hardcore-revival) and doesn't exist without it, so a pack that uses it must depend on the mod.

## Fields

This condition has no fields.

## Examples

```json
{
  "type": "apoli:self_glow",
  "condition": { "type": "apoli:knocked_out" }
}
```

The holder glows while they are down, so allies can see them.

```json
{
  "type": "apoli:target_condition",
  "condition": { "type": "apoli:knocked_out" }
}
```

This bi-entity condition finds downed players around you, which is how a revive ability picks its targets.

```json
{
  "type": "apoli:prevent_powers",
  "powers": ["mypack:blink", "mypack:fire_breath"],
  "condition": { "type": "apoli:knocked_out" }
}
```

This switches off two of the holder's abilities while they are down.
