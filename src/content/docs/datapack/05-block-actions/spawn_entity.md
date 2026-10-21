---
title: "Spawn Entity (Block Action Type)"
description: "Spawns an entity at the block's position."
navigation_title: "Spawn Entity"
---

Spawns an entity at the block's position.

Type ID: `apoli:spawn_entity`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `entity_type` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The ID of the entity type to spawn. |
| `tag` | [NBT](/docs/datapack/data-types/nbt) | _optional_ | NBT data applied to the spawned entity. |
| `entity_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Runs on the spawned entity. |

> [!NOTE]
> The action runs on any spawned entity, living or not, including markers, arrows, item frames and armour stands.

## Examples

```json
"block_action": {
	"type": "apoli:spawn_entity",
	"entity_type": "minecraft:vex",
	"entity_action": {
		"type": "apoli:grant_power",
		"power": "apoli:arcane_skin",
		"source": "*:*"
	}
}
```

This summons a vex at the block's position and grants it the `apoli:arcane_skin` power, with the ID of the power the action is written in as the source.
