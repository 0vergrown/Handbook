---
title: "Has Location (Entity Condition Type)"
description: "Checks whether the entity has a position saved under a name."
navigation_title: "Has Location"
---

Checks whether the entity has a position saved by [apoli:save_location](/docs/datapack/entity-actions/save_location).

Type ID: `apoli:has_location`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `id` | [String](/docs/datapack/data-types/string) | _optional_ | The name to look for. Without an `id`, the condition passes when the entity has any saved position. |

## Examples

```json
"condition": {
    "type": "apoli:has_location",
    "id": "example:recall"
}
```

This passes once the entity has saved an anchor called `example:recall`.

```json
{
    "type": "apoli:action_on_key_press",
    "cooldown": 600,
    "hud_render": { "sprite_location": "apoli:textures/gui/resource_bar.png", "bar_index": 6 },
    "condition": {
        "type": "apoli:has_location",
        "id": "example:recall"
    },
    "entity_action": {
        "type": "apoli:teleport_to_location",
        "id": "example:recall"
    }
}
```

The recall key does nothing, and the HUD bar stays hidden, until an anchor has been set.

> [!WARNING]
> Only the server knows the answer, so this is `false` on the client. Don't use it anywhere a condition is evaluated on the client, such as [apoli:prevent_entity_selection](/docs/datapack/powers/prevent_entity_selection) or a render power's own condition.
