---
title: "Prevent Teleport (Power Type)"
description: "Stops the entity from being teleported by anything."
navigation_title: "Prevent Teleport"
---

Stops the entity from being teleported. It catches every route: `/teleport`, the spectator menu, ender pearls and chorus fruit, endermen escaping, portals and end gateways, and every Apoli action that moves an entity, such as [apoli:teleport](/docs/datapack/entity-actions/teleport), [apoli:random_teleport](/docs/datapack/entity-actions/random_teleport) and [apoli:teleport_to](/docs/datapack/bientity-actions/teleport_to).

Type ID: `apoli:prevent_teleport`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `entity_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Runs on the entity each time a teleport is blocked, once per blocked attempt. Useful for a sound or a message. |
| `prevent_dimension_change` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether portals and end gateways are blocked too. Set it to `false` to leave normal travel alone and only stop teleports within a dimension. |

## Examples

```json
{
    "type": "apoli:prevent_teleport"
}
```

Nothing moves this entity except its own legs.

```json
{
    "type": "apoli:prevent_teleport",
    "prevent_dimension_change": false,
    "entity_action": {
        "type": "apoli:play_sound",
        "sound": "minecraft:block.note_block.bass",
        "pitch": 0.5
    },
    "condition": {
        "type": "apoli:status_effect",
        "effect": "minecraft:slowness"
    }
}
```

While the entity has Slowness, nothing can teleport or pull it, but portals still work, and each blocked attempt plays a low bass note.

> [!NOTE]
> An action that would have teleported the entity still reports failure, so the `fail_action` of [apoli:teleport](/docs/datapack/entity-actions/teleport), [apoli:random_teleport](/docs/datapack/entity-actions/random_teleport) and [apoli:teleport_to_location](/docs/datapack/entity-actions/teleport_to_location) runs. Use it to tell the player why nothing happened.

> [!WARNING]
> With `prevent_dimension_change` left on, a player in the Nether or the End can't walk back out through a portal. Give them a way home, or put the power behind a `condition` they can clear.
