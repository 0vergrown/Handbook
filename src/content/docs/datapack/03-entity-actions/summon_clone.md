---
title: "Summon Clone (Entity Action Type)"
description: "Summons a clone that fights for the player who has the power."
navigation_title: "Summon Clone"
---

Summons a clone that fights for the player who has the power. The clone is player-shaped and attacks in melee or with a bow or crossbow, whichever it holds. It defends and assists its owner, and right-clicking it tells it to sit. It copies the owner's [apoli:custom_model_render](/docs/datapack/powers/custom_model_render) texture overlays so the two look the same. The action only works when its entity is a player.

Type ID: `apoli:summon_clone`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `can_attack` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether the clone attacks the owner's enemies. |
| `can_sit` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether the owner can make the clone sit or stand by right-clicking it. |
| `follow_owner` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether the clone follows the owner when it gets far away. |
| `inherit_equipment` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether the clone copies the equipment the owner wears and holds. |
| `inherit_enchantments` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether copied equipment keeps its enchantments and other components. |
| `slim` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Forces the slim arm model. Only used when custom textures are set. Otherwise the owner's model is copied. |
| `wide_texture` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | A custom texture for the wide model. Without it, the owner's skin is used. |
| `slim_texture` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | A custom texture for the slim model. Without it, the owner's skin is used. |
| `max_life_ticks` | [Integer](/docs/datapack/data-types/integer) | `1200` | Ticks before the clone dies by itself. `0` or less makes it permanent until it is killed. |
| `summon_id` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | A tag that [apoli:set_summon_max_life](/docs/datapack/entity-actions/set_summon_max_life) can use to target this clone. |
| `powers` | [Array](/docs/datapack/data-types/array) of Identifiers | _optional_ | Powers to grant the clone when it spawns. |
| `bientity_action` | [Bi-entity Action Type](/docs/datapack/bientity-actions) | _optional_ | Runs once after the clone spawns, with the owner as the actor and the clone as the target. If it moves the clone, every player watching sees it appear at its new spot instead of at yours. |

## Examples

```json
"entity_action": {
    "type": "apoli:summon_clone",
    "max_life_ticks": 600,
    "inherit_equipment": true
}
```

This summons a clone that looks like the player, copies their gear, fights for them and disappears after 30 seconds.

> [!NOTE]
> Running out of `max_life_ticks` kills the clone instead of deleting it, so an [apoli:action_on_death](/docs/datapack/powers/action_on_death) granted through `powers` fires, and bookkeeping such as returning a summon slot or clearing an [apoli:entity_set](/docs/datapack/powers/entity_set) runs exactly as it does when something kills the clone. Losing its owner (they log out or change dimension) ends it the same way. It drops nothing either way.
