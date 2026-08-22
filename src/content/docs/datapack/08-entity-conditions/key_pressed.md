---
title: "Key Pressed (Entity Condition Type)"
description: Passes while a keybinding is held down.
navigation_title: "Key Pressed"
aliases: ["key_held", "held_key"]
---

Passes for as long as the key is held, unlike [`apoli:action_on_key_press`](/docs/datapack/powers/action_on_key_press) which fires once on the press. Use it for abilities that last while you hold a key — a sustained beam, a glide, a charge-up.

Type ID: `apoli:key_pressed` (aliases `apoli:key_held`, `apoli:held_key`)

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`key` | [Key](/docs/datapack/data-types/key) | primary active | The keybinding to watch.

## Examples

Glide while the primary ability key is held:

```json
{
  "type": "apoli:creative_flight",
  "condition": {
    "type": "apoli:key_pressed",
    "key": { "key": "key.origins.primary_active" }
  }
}
```

Drain a resource for as long as the key is down, which is the shape most sustained abilities want:

```json
{
  "type": "apoli:action_over_time",
  "interval": 10,
  "entity_action": {
    "type": "apoli:change_resource",
    "resource": "mypack:energy",
    "change": -1
  },
  "condition": {
    "type": "apoli:key_pressed",
    "key": { "key": "key.origins.secondary_active" }
  }
}
```

> The key state is reported by the client, so this only works for players — and only for keys Apoli is watching, which it works out from the powers the player holds. [`apoli:force_key_pressed`](/docs/datapack/entity-actions/force_key_pressed) can hold a key down artificially, including on non-player entities.
