---
title: "Area Of Effect (Entity Action Type)"
description: "Runs a bi-entity action on every entity in an area around the entity."
navigation_title: "Area Of Effect"
---

Runs a bi-entity action on every entity in an area around the entity. The actor is the entity that ran the action, and each entity in the area is a target.

Type ID: `apoli:area_of_effect`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `radius` | [Vector](/docs/datapack/data-types/vector) | `16.0` | The size of the area: a single number for the same size on every axis, or `{"x":.., "y":.., "z":..}` for a separate size on each axis. |
| `shape` | [Shape](/docs/datapack/data-types/shape) | `"cube"` | The outline of the area: `cube`, `sphere`, `star`, `cone`, or a hollow one (`cube_hollow`, `sphere_hollow`, `star_hollow`, `cone_hollow`). |
| `hollow_thickness` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `1` | How thick a hollow `shape` is, in blocks, read from the actor each time the action runs. Ignored by the solid shapes. |
| `bientity_action` | [Bi-entity Action Type](/docs/datapack/bientity-actions) | _optional_ | Runs for each target. Leave it out to count matches without doing anything to them. |
| `bientity_condition` | [Bi-entity Condition Type](/docs/datapack/bientity-conditions) | _optional_ | The action only runs on targets that pass this condition. |
| `include_actor` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Whether the actor counts as a target too. |
| `after_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Runs once on the actor after the sweep, with `count` bound to how many entities matched. |
| `offset` | [Vector](/docs/datapack/data-types/vector) | `0.0` | Moves the centre of the area away from the actor by this much before the sweep runs. |
| `space` | [Space](/docs/datapack/data-types/space) | `"world"` | The frame `offset` is read in. `"local"` follows the actor's full look direction, and `"local_horizontal_normalized"` follows only its yaw, keeping `y` as world up. |

## Counting what it found

Two [expression](/docs/datapack/data-types/expression) variables are bound while this action runs:

- `count` is how many entities matched. It is available in `bientity_action` and in `after_action`.
- `index` is the zero-based iteration number, in `bientity_action` only.

That turns "how many mobs are near me?" into a number you can store, instead of an `if_else_list` of hard-coded bands:

```json
"entity_action": {
  "type": "apoli:area_of_effect",
  "radius": 8,
  "shape": "sphere",
  "bientity_condition": {
    "type": "apoli:target_condition",
    "condition": {
      "type": "apoli:living"
    }
  },
  "after_action": {
    "type": "apoli:modify_resource",
    "resource": "example:nearby",
    "modifier": {
      "operation": "set_base",
      "value": "count"
    }
  }
}
```

With `bientity_action` left out, nothing happens to the entities themselves, and the sweep only produces `count`.

## Putting the area somewhere else

By default the sweep is centred on the actor. `offset` moves that centre and `space` says which way the offset points, so a small sphere placed a few blocks along the player's look works as a check for what is in front of their face, without the limits of a single ray from [apoli:raycast](/docs/datapack/entity-actions/raycast):

```json
"entity_action": {
  "type": "apoli:area_of_effect",
  "shape": "sphere",
  "radius": 1.5,
  "offset": {
    "x": 0,
    "y": 1.5,
    "z": 2.5
  },
  "space": "local_horizontal_normalized",
  "bientity_action": {
    "type": "apoli:grab"
  }
}
```

`local_horizontal_normalized` rotates the offset by the actor's yaw only, so `z` is forward and `y` stays world up. The sphere sits in front of the player's head and doesn't dive into the floor when they look down. Use `"local"` instead when the area should follow pitch as well.

## Examples

```json
"entity_action": {
    "type": "apoli:area_of_effect",
    "radius": 10,
    "shape": "sphere",
    "bientity_action": {
        "type": "apoli:target_action",
        "action": {
            "type": "apoli:spawn_entity",
            "entity_type": "minecraft:lightning_bolt"
        }
    }
}
```

This summons a lightning bolt on every entity within a 10-block sphere.

```json
"entity_action": {
    "type": "apoli:area_of_effect",
    "radius": 32,
    "bientity_action": {
        "type": "apoli:target_action",
        "action": {
            "type": "apoli:set_on_fire",
            "duration": 5
        }
    },
    "bientity_condition": {
        "type": "apoli:can_see"
    }
}
```

This sets entities within 32 blocks on fire for 5 seconds, as long as the entity that ran the action can see them.

```json
"entity_action": {
  "type": "apoli:area_of_effect",
  "shape": "cube",
  "radius": {
    "x": 12,
    "y": 3,
    "z": 12
  },
  "bientity_action": {
    "type": "apoli:target_action",
    "action": {
      "type": "apoli:set_on_fire",
      "duration": 3
    }
  }
}
```

This gives `radius` a vector, one size per axis, to make a wide, flat 25×7×25 slab (12 out on each horizontal axis and only 3 up and down). The result hugs the ground instead of filling a full cube.
