---
title: "Summon Minion (Entity Action Type)"
description: "Summons a minion owned by the living entity that has the power."
navigation_title: "Summon Minion"
---

Summons a minion owned by the living entity that has the power. A minion is a lightweight follower with no combat AI. It follows the owner, optionally at an offset, or hovers in place.

Type ID: `apoli:summon_minion`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `texture` | [Identifier](/docs/datapack/data-types/identifier) | `apoli:textures/entity/minion_template.png` | The minion's texture. |
| `follow_owner` | [Boolean](/docs/datapack/data-types/boolean) | `false` | With `true`, the minion follows the owner and floats, ignoring gravity. |
| `follow_offset` | [Vector](/docs/datapack/data-types/vector) | _optional_ | The offset from the owner while following. The minion also spawns this far from the spawn point. |
| `scale` | [Float](/docs/datapack/data-types/float) | `1.0` | The render and hitbox scale. |
| `invulnerable` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Whether the minion is invulnerable. |
| `max_life_ticks` | [Integer](/docs/datapack/data-types/integer) | `1200` | Ticks before the minion dies by itself. `0` or less makes it permanent until it is killed. |
| `summon_id` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | A tag that [apoli:set_summon_max_life](/docs/datapack/entity-actions/set_summon_max_life) can use to target this minion. |
| `powers` | [Array](/docs/datapack/data-types/array) of Identifiers | _optional_ | Powers to grant the minion when it spawns. Granting it a geometry mode [apoli:custom_model_render](/docs/datapack/powers/custom_model_render) replaces the minion's model with a Blockbench one. |
| `bientity_action` | [Bi-entity Action Type](/docs/datapack/bientity-actions) | _optional_ | Runs once after the minion spawns, with the owner as the actor and the minion as the target. If it moves the minion, for example with an [`apoli:teleport_to`](/docs/datapack/bientity-actions/teleport_to) that puts it in front of you, every player watching sees it appear at its new spot instead of at yours. |
| `offset` | [Vector](/docs/datapack/data-types/vector) | `{"x": 0, "y": 0, "z": 0}` | Moves the spawn point away from the owner by this much, in blocks. |
| `space` | [Space](/docs/datapack/data-types/space) | `"world"` | The frame `offset` is read in. `"local"` follows where the owner is looking, so `z` is forward and `x` is to its left. |

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

This summons a permanent minion that floats above and behind the owner.

> [!NOTE]
> Running out of `max_life_ticks` kills the minion instead of deleting it, so an [apoli:action_on_death](/docs/datapack/powers/action_on_death) granted through `powers` fires, and bookkeeping such as returning a summon slot or clearing an [apoli:entity_set](/docs/datapack/powers/entity_set) runs exactly as it does when something kills the minion. Losing its owner (they log out or change dimension) ends it the same way. It drops nothing either way.
