---
title: "Action On Accessory Change (Power Type)"
description: "Runs an action when an accessory is equipped or unequipped."
navigation_title: "Action On Accessory Change"
aliases: ["action_on_trinket_change"]
---

Fires when the holder equips or unequips an accessory. You can react on the wearer, on the item, or both, on either side of the change.

Type ID: `apoli:action_on_accessory_change` (alias `apoli:action_on_trinket_change`)

> [!NOTE]
> This type only exists when an accessory mod is installed: [Trinkets](https://modrinth.com/mod/trinkets), [Accessories](https://modrinth.com/mod/accessories) or Curios, depending on your loader. A pack that uses it must depend on one.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `entity_action_on_equip` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Runs on the wearer when something is equipped. |
| `item_action_on_equip` | [Item Action Type](/docs/datapack/item-actions) | _optional_ | Runs on the item when it is equipped. |
| `entity_action_on_unequip` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Runs on the wearer when something is unequipped. |
| `item_action_on_unequip` | [Item Action Type](/docs/datapack/item-actions) | _optional_ | Runs on the item when it is unequipped. |
| `item_condition` | [Item Condition Type](/docs/datapack/item-conditions) | _optional_ | Only fires for items that pass it. |
| `slots` | [Array](/docs/datapack/data-types/array) of [slots](/docs/compat/accessories/overview#slots) | `[]` | The accessory slots to watch. A string is `slot`, `group/slot` or `group/slot/index`, such as `"ring"`, `"hand/ring"` or `"hand/ring/0"`. An empty list means every slot. |

## Examples

```json
{
  "type": "apoli:action_on_accessory_change",
  "slots": ["hand/ring"],
  "entity_action_on_equip": {
    "type": "apoli:spawn_particles",
    "particle": "minecraft:enchant",
    "count": 20
  },
  "entity_action_on_unequip": {
    "type": "apoli:play_sound",
    "sound": "minecraft:block.beacon.deactivate"
  }
}
```

This makes a puff of enchantment particles when a ring goes on, and plays a sound when one comes off.

```json
{
  "type": "apoli:action_on_accessory_change",
  "item_condition": {
    "type": "apoli:ingredient",
    "ingredient": { "item": "minecraft:echo_shard" }
  },
  "entity_action_on_unequip": {
    "type": "apoli:damage",
    "amount": 4,
    "damage_type": "minecraft:magic"
  }
}
```

This cursed amulet, an echo shard in an accessory slot, burns the wearer for 4 damage when they take it off.
