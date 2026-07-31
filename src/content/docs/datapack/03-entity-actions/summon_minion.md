---
title: "Summon Minion (Entity Action Type)"
description: "Summons a minion owned by the living entity that has the power."
navigation_title: "Summon Minion"
---

Summons a **minion** owned by the living entity that has the power. The minion is a lightweight follower with no combat AI. It follows the owner (optionally at an offset) or hovers in place.

Type ID: `apoli:summon_minion`

## Fields

| Field             | Type                             | Default                                     | Description                                                                          |
|-------------------|----------------------------------|---------------------------------------------|--------------------------------------------------------------------------------------|
| `texture`         | [Identifier](/docs/datapack/data-types/identifier)           | `apoli:textures/entity/minion_template.png` | The minion's texture.                                                                |
| `follow_owner`    | [Boolean](/docs/datapack/data-types/boolean)              | `false`                                     | If `true`, the minion follows the owner (and floats, ignoring gravity).              |
| `follow_offset`   | [Vector](/docs/datapack/data-types/vector)               | _optional_                                  | Position offset from the owner when following (and the spawn offset).                |
| `scale`           | [Float](/docs/datapack/data-types/float)                | `1.0`                                       | Render/hitbox scale.                                                                 |
| `invulnerable`    | [Boolean](/docs/datapack/data-types/boolean)              | `false`                                     | Whether the minion is invulnerable.                                                  |
| `max_life_ticks`  | [Integer](/docs/datapack/data-types/integer)              | `1200`                                      | Ticks before the minion vanishes. `0` or less = permanent until killed.              |
| `summon_id`       | [Identifier](/docs/datapack/data-types/identifier)           | _optional_                                  | A tag used by [apoli:set_summon_max_life](/docs/datapack/entity-actions/set_summon_max_life) to target this minion.        |
| `powers`          | [Array](/docs/datapack/data-types/array) of Identifiers | _optional_                                  | Powers to grant the minion on spawn. Granting it a geometry-mode [apoli:custom_model_render](/docs/datapack/powers/custom_model_render) replaces the minion's model with a Blockbench one. |
| `bientity_action` | Bi-entity Action Type            | _optional_                                  | Runs once after the minion spawns, with the owner as actor and the minion as target. |

## Examples

```json
"entity_action": {
    "type": "apoli:summon_minion",
    "texture": "example:textures/entity/orbiter.png",
    "follow_owner": true,
    "follow_offset": [0.0, 1.5, -1.0],
    "max_life_ticks": 0
}
```

Summons a permanent minion that floats above and behind the owner.
