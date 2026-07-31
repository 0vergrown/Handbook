---
title: "Summon Clone (Entity Action Type)"
description: "Summons a clone that fights for the player who has the power."
navigation_title: "Summon Clone"
---

Summons a **clone** that fights for the player who has the power. The clone is player-shaped, attacks with melee, a bow, or a crossbow (whatever it holds), defends/assists its owner, and can be told to sit by right-clicking it. It mirrors the owner's `entity_texture_overlay` so they look the same. Only works when the action's entity is a player.

Type ID: `apoli:summon_clone`

## Fields

| Field                  | Type                             | Default    | Description                                                                                                 |
|------------------------|----------------------------------|------------|-------------------------------------------------------------------------------------------------------------|
| `can_attack`           | [Boolean](/docs/datapack/data-types/boolean)              | `true`     | Whether the clone attacks the owner's enemies.                                                              |
| `can_sit`              | [Boolean](/docs/datapack/data-types/boolean)              | `true`     | Whether the owner can toggle the clone sitting by right-clicking it.                                        |
| `follow_owner`         | [Boolean](/docs/datapack/data-types/boolean)              | `true`     | Whether the clone follows the owner when far away.                                                          |
| `inherit_equipment`    | [Boolean](/docs/datapack/data-types/boolean)              | `true`     | Whether the clone copies the owner's worn/held equipment.                                                   |
| `inherit_enchantments` | [Boolean](/docs/datapack/data-types/boolean)              | `true`     | Whether inherited equipment keeps its enchantments (and other components).                                  |
| `slim`                 | [Boolean](/docs/datapack/data-types/boolean)              | `false`    | Forces the slim arm model. Only used when custom textures are set; otherwise the owner's model is mirrored. |
| `wide_texture`         | [Identifier](/docs/datapack/data-types/identifier)           | _optional_ | Custom texture for the wide model. If unset, the owner's skin is used.                                      |
| `slim_texture`         | [Identifier](/docs/datapack/data-types/identifier)           | _optional_ | Custom texture for the slim model. If unset, the owner's skin is used.                                      |
| `max_life_ticks`       | [Integer](/docs/datapack/data-types/integer)              | `1200`     | Ticks before the clone vanishes. `0` or less = permanent until killed.                                      |
| `summon_id`            | [Identifier](/docs/datapack/data-types/identifier)           | _optional_ | A tag used by [apoli:set_summon_max_life](/docs/datapack/entity-actions/set_summon_max_life) to target this clone.                                |
| `powers`               | [Array](/docs/datapack/data-types/array) of Identifiers | _optional_ | Powers to grant the clone on spawn.                                                                         |
| `bientity_action`      | Bi-entity Action Type            | _optional_ | Runs once after the clone spawns, with the owner as actor and the clone as target.                          |

## Examples

```json
"entity_action": {
    "type": "apoli:summon_clone",
    "max_life_ticks": 600,
    "inherit_equipment": true
}
```

Summons a clone that looks like the player, inherits their gear, fights for them, and disappears after 30 seconds.
