---
title: "Entity Set (Power Type)"
description: "A set of entities that actions can run on and conditions can check membership of."
navigation_title: "Entity Set"
---

A set of entities. Actions can run on the entities in the set, and conditions can check whether an entity is in it, either [from the owner's side](/docs/datapack/bientity-conditions/in_entity_set) or [from the member's](/docs/datapack/entity-conditions/in_entity_set).

Type ID: `apoli:entity_set`

The actor is the entity that has the power, and the target is an entity in the set. Entities aren't stored in the set physically, so they carry on existing as they are. The set remembers each member by its UUID, so it can find the entity again later while it exists.

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `action_on_add` | [Bi-entity Action Type](/docs/datapack/bientity-actions) | _optional_ | If set, this action runs on the actor, the target or both when the target is added to the set. |
| `action_on_remove` | [Bi-entity Action Type](/docs/datapack/bientity-actions) | _optional_ | If set, this action runs on the actor, the target or both when the target is removed from the set. |
| `persistent` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Keeps members through death and logout, and keeps the set through server restarts. See [Persistent sets](#persistent-sets). |

## What keeps or removes a member

| Event | Default set | `"persistent": true` |
|-------|-------------|----------------------|
| A member dies, or is removed from the world for good | Removed, without running `action_on_remove` | Stays in the set |
| A member logs out, or its chunk unloads | Stays in the set | Stays in the set |
| The owner logs out | The set stays on the server | The set stays on the server |
| The server restarts | The set is emptied | The set comes back from the world save |
| A `time_limit` from [apoli:add_to_entity_set](/docs/datapack/bientity-actions/add_to_entity_set) runs out | Removed, with `action_on_remove` | Removed, with `action_on_remove` |
| [apoli:remove_from_entity_set](/docs/datapack/bientity-actions/remove_from_entity_set) | Removed, with `action_on_remove` | Removed, with `action_on_remove` |
| The owner loses the power | The set is emptied, and `action_on_remove` runs for each member | The set is emptied, and `action_on_remove` runs for each member |
| A mob that owns the set dies, or is removed for good | The set is deleted | The set is deleted |
| A member mob converts (a zombie villager is cured) | The new mob takes its place | The new mob takes its place |

A `time_limit` is checked while the owner is loaded and the power is active. If it runs out while the owner is away, the member leaves when the owner is back.

## Persistent sets

A persistent set is a link that lasts until something removes a member on purpose. Members stay through death and logout, the set stays while its owner is offline, and the whole set is saved with the world.

- A member that died is still a member. A player who respawns is still in the set, [apoli:entity_set_size](/docs/datapack/entity-conditions/entity_set_size) keeps counting members that no longer exist, and the [bi-entity condition](/docs/datapack/bientity-conditions/in_entity_set) still answers yes about a member that has just died.
- A member can find a set whose owner is offline with [apoli:action_on_entity_set](/docs/datapack/entity-actions/action_on_entity_set) and `"iterate": "owners"`. With `"include_offline": true`, an offline player owner is handed to the action as an offline copy, so the member can test conditions against them or leave the set with [apoli:remove_from_entity_set](/docs/datapack/bientity-actions/remove_from_entity_set).
- The set is sent to its owner when they join, so client-side conditions such as [apoli:entity_glow](/docs/datapack/powers/entity_glow) can read it right away.
- Sets are stored in the world's `data/apoli_entity_sets.dat`, which is only written when a persistent set changes. The file keeps sets whose power is missing from the loaded data packs, so removing a pack for a while doesn't lose them.

> [!WARNING]
> A member that no longer exists can only be removed by revoking the set power from its owner, because no action can target it. Keep that in mind for sets that collect mobs.

## Examples

```json
{
	"type": "apoli:entity_set"
}
```

This only provides a set. No actions run on entities added to or removed from it.

```json
{
	"type": "apoli:entity_set",
	"action_on_remove": {
		"type": "apoli:tame"
	}
}
```

This tames entities when they are removed from the set, with the actor as their owner.

```json
{
	"type": "apoli:entity_set",
	"persistent": true,
	"action_on_add": {
		"type": "apoli:target_action",
		"action": {
			"type": "apoli:execute_command",
			"command": "tellraw @s {\"text\":\"You are now soul-bound.\"}"
		}
	}
}
```

A soul bond: players added to it stay bound through deaths, logouts and restarts, until an [apoli:remove_from_entity_set](/docs/datapack/bientity-actions/remove_from_entity_set) breaks the bond.
