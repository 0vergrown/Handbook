---
title: "apoli:spawn_entity"
description: "Spawns an entity at the position of the block."
---

Spawns an entity at the position of the block.

Type ID: `apoli:spawn_entity`


##	Fields

Field | Type | Default | Description
------|------|---------|------------
`entity_type` | Identifier | | The ID of the type of entity that will be spawned.
`tag` | NBT | *optional* | If specified, this NBT data will be applied to the entity that will be spawned.
`entity_action` | Entity Action Type | *optional* | If specified, this entity action will be executed on the spawned entity.


##	Examples

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

This example will summon a Vex with the power `apoli:arcane_skin` power with the source as the ID of the example power at the position of the block.

