---
title: "Prevent Teleport (Power Type)"
description: "Stops the entity from being teleported by anything."
navigation_title: "Prevent Teleport"
---

Stops the entity from being teleported. It catches every route: `/teleport`, the spectator menu, ender pearls and chorus fruit, enderman escapes, portals and end gateways, and every Apoli action that moves an entity — [apoli:teleport](/docs/datapack/entity-actions/teleport), [apoli:random_teleport](/docs/datapack/entity-actions/random_teleport), [apoli:teleport_to](/docs/datapack/bientity-actions/teleport_to) and the rest.

Type ID: `apoli:prevent_teleport`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`entity_action` | Entity Action Type | _optional_ | Runs on the entity each time a teleport is blocked. Good for a sound or a message; it fires once per blocked attempt, not once per tick.
`prevent_dimension_change` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether portals and end gateways are blocked too. Set it to `false` to leave normal travel alone and only stop teleports within a dimension.

## Examples

```json
{
    "type": "apoli:prevent_teleport"
}
```

Nothing moves this entity but its own legs.

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

While slowed, the entity cannot blink or be pulled anywhere — but portals still work, and each blocked attempt thuds.

> An action that would have teleported still reports failure, so `fail_action` on [apoli:teleport](/docs/datapack/entity-actions/teleport), [apoli:random_teleport](/docs/datapack/entity-actions/random_teleport) and [apoli:teleport_to_location](/docs/datapack/entity-actions/teleport_to_location) runs — that is the hook for telling the player why nothing happened.
>
> With `prevent_dimension_change` left on, a player in the Nether or the End cannot walk back out. Give them a way home, or gate the power on a `condition` they can clear.
