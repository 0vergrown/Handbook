---
title: "Area Of Effect (Entity Action Type)"
description: "Executes a Bi-Entity Action within a specified radius."
navigation_title: "Area Of Effect"
---

Executes a Bi-Entity Action within a specified radius.

Type ID: `apoli:area_of_effect`

> In the context of this entity action type, the '**actor**' is the entity that invoked the action and the '**target(s)**' is/are the entity/entities within the specified radius.

## Fields

Field | Type | Default | Description
------|------|---------|------------
`radius` | [Vector](/docs/datapack/data-types/vector) | `16.0` | The size of the area — a single number (uniform on all axes) or `{"x":.., "y":.., "z":..}` for independent per-axis extents.
`shape` | [Shape](/docs/datapack/data-types/shape) | `"cube"` | The outline of the area: `cube`, `sphere`, `star`, or `cone`.
`bientity_action` | Bi-entity Action Type | *optional* | The bi-entity action to execute on either or both the '**actor**' or the '**target(s)**'. Leave it out to count matches without doing anything to them.
`bientity_condition` | Bi-entity Condition Type | *optional* | If specified, the specified bi-entity action will only be executed on either or both the '**actor**' or '**target(s)**' that fulfill this bi-entity condition.
`include_actor` | Boolean | `false` | Determines whether the '**actor**' should be included as a target.
`after_action` | Entity Action Type | *optional* | Run once on the '**actor**' after the sweep, with `count` bound to how many entities matched.

## Counting what it found

Two [Expression](/docs/datapack/data-types/expression) variables are bound while this action runs:

- `count` — how many entities matched. Available in `bientity_action` and in `after_action`.
- `index` — the zero-based iteration number, in `bientity_action` only.

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

With `bientity_action` omitted, nothing happens to the entities themselves — the sweep is only there to produce `count`.

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

This example will summon a lightning bolt on entities within a 10 block spherical radius.

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

This example will set entities within a 32 block radius on fire for 5 seconds if the entities that are within the radius can be "seen" by the entity that invoked the action.

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

This example gives `radius` a per-axis vector to make a wide, flat 25×7×25 slab (12 out on each horizontal axis, only 3 up/down) — a ground-hugging area effect instead of a full cube.
