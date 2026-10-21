---
title: "Random Teleport (Entity Action Type)"
description: "Teleports the entity to a random spot inside an area around it."
navigation_title: "Random Teleport"
---

Teleports the entity to a random spot inside an area around it.

Type ID: `apoli:random_teleport`

> [!NOTE]
> The area is twice the given width and height, plus 1 for the block the entity stands on in the middle.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `area_width` | [Float](/docs/datapack/data-types/float) | `8.0` | The width of the area. |
| `area_height` | [Float](/docs/datapack/data-types/float) | `8.0` | The height of the area. |
| `heightmap` | [Heightmap Type](/docs/datapack/data-types/heightmap-type) | _optional_ | Places the spot above the highest Y level of the world given by this heightmap type. |
| `attempts` | [Integer](/docs/datapack/data-types/integer) | _optional_ | How many random spots to try. Defaults to `area_width` * 2 + `area_height` * 2. |
| `landing_block_condition` | [Block Condition Type](/docs/datapack/block-conditions) | _optional_ | The entity only lands on top of a block that passes this. Without it, the entity only lands on blocks with solid collision. |
| `landing_condition` | [Entity Condition Type](/docs/datapack/entity-conditions) | _optional_ | The entity only lands at a spot where it would pass this condition. It is tested once per attempt, as though the entity were already standing there, so everything that depends on where the entity is gets read at the destination: the fluid around it ([apoli:fluid_height](/docs/datapack/entity-conditions/fluid_height), [apoli:submerged_in](/docs/datapack/entity-conditions/submerged_in)), the block under it ([apoli:on_block](/docs/datapack/entity-conditions/on_block)), the blocks it overlaps and the sky above it. Without it, the entity only lands in empty space, with no blocks or fluids. |
| `landing_offset` | [Vector](/docs/datapack/data-types/vector) | `{"x": 0, "y": 0, "z": 0}` | An offset added to the landing spot. If the X and Z offsets are set, the X and Z coordinates are floored before the offset is applied. |
| `loaded_chunks_only` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether the entity only lands in loaded chunks. Keep it `true` for performance. |
| `success_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Runs on the entity after it has been teleported. |
| `fail_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Runs on the entity when no spot was found. |

## Examples

```json
"entity_action": {
	"type": "apoli:random_teleport",
	"area_width": 8,
	"area_height": 8,
	"success_action": {
		"type": "apoli:spawn_particles",
		"particle": "minecraft:poof",
		"count": 8
	},
	"fail_action": {
		"type": "apoli:execute_command",
		"command": "title @s actionbar {\"text\": \"Cannot teleport!\", \"color\": \"red\"}"
	}
}
```

This teleports the entity to a random spot within a 17×17×17 area. On success the entity gives off a poof of particles, and on failure a message says it can't be teleported.

```json
"entity_action": {
	"type": "apoli:random_teleport",
	"area_width": 4,
	"area_height": 8,
	"landing_block_condition": {
		"type": "apoli:in_tag",
		"tag": "minecraft:wool"
	},
	"landing_offset": {
		"x": 0.5,
		"z": 0.5
	}
}
```

This teleports the entity onto the centre of a random block in the `minecraft:wool` block tag, within a 9×17×9 area.

> [!NOTE]
> The teleport is refused outright when the entity has [apoli:prevent_teleport](/docs/datapack/powers/prevent_teleport), and `fail_action` runs.
