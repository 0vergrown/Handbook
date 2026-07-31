---
title: "Origin (Entity Condition Type)"
description: "Entity condition — passes when the player has a given origin."
navigation_title: "Origin"
---

Passes when the player currently has a given origin — on one specific [layer](/docs/datapack/origins/layers), or on any layer at all.

Type ID: `origins:origin` — an [entity condition](/docs/datapack/entity-conditions).

> **Needs the Origins mod.** Registered by Origins, not core Apoli. It only passes for players; any other entity fails.

## Fields

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `origin` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The origin to look for. |
| `layer` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | Only check this layer. Omit to pass if the origin is held on **any** layer. |

## Examples

Is this player a Phantom on the main layer?

```json
{
  "type": "origins:origin",
  "origin": "origins:phantom",
  "layer": "origins:origin"
}
```

Anywhere at all — including a copy layer they picked it up on:

```json
{
  "type": "origins:origin",
  "origin": "origins:merling"
}
```

## Gating one power on several origins

This is how a power behaves differently depending on which origin the player picked. Grant the power broadly, then branch inside it:

```json
{
  "type": "apoli:action_over_time",
  "interval": 20,
  "entity_action": {
    "type": "apoli:if_else",
    "condition": { "type": "origins:origin", "origin": "origins:merling" },
    "if_action": { "type": "apoli:gain_air", "value": 4 },
    "else_action": { "type": "apoli:feed", "food": 1, "saturation": 0.5 }
  }
}
```

## Notes

- This reads the player's **current** choice. To test an origin saved earlier, use [`origins:stored_origin`](/docs/datapack/origins/stored_origin).
- It works on both sides: the server reads the player's origin state, the client reads its synced copy, so it's safe in render- and HUD-side conditions.
