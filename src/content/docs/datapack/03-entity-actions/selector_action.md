---
title: "Selector Action (Entity Action Type)"
description: "Runs a bi-entity action on the entities a target selector finds."
navigation_title: "Selector Action"
---

Runs a bi-entity action on the entities a target selector finds. The actor is the entity that ran the action, and each selected entity is a target.

Type ID: `apoli:selector_action`

> [!TIP]
> [Minecraft Wiki: Target selectors](https://minecraft.wiki/w/Target_selectors) explains how target selectors work.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `selector` | [String](/docs/datapack/data-types/string) | _required_ | Which entities to select: a player's username, an entity's UUID or a target selector. |
| `bientity_action` | [Bi-entity Action Type](/docs/datapack/bientity-actions) | _optional_ | Runs for each selected entity, with the entity that ran the action as the actor and the selected entity as the target. |
| `bientity_condition` | [Bi-entity Condition Type](/docs/datapack/bientity-conditions) | _optional_ | The action only runs for selected entities that pass this, with the same actor and target. |

## Examples

```json
"entity_action": {
    "type": "apoli:selector_action",
    "selector": "Steve",
    "bientity_action": {
        "type": "apoli:damage",
        "amount": 5,
        "damage_type": "minecraft:generic"
    }
}
```

This deals 2.5 hearts of damage to the player named Steve.

```json
"entity_action": {
    "type": "apoli:selector_action",
    "selector": "@e[type = minecraft:armor_stand, tag = some_tag]",
    "bientity_action": {
        "type": "apoli:target_action",
        "action": {
            "type": "apoli:execute_command",
            "command": "kill @s"
        }
    }
}
```

This kills the armor stands that have the `some_tag` tag (added with the `/tag` command).
