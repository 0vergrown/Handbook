---
title: "Action On Accessory Change (Power Type)"
description: Runs an action when an accessory is equipped or unequipped.
navigation_title: "Action On Accessory Change"
aliases: ["action_on_trinket_change"]
---

Fires when the holder equips or unequips an accessory. You can react to the wearer, the item, or both, and on either side of the change.

Type ID: `apoli:action_on_accessory_change` (alias `apoli:action_on_trinket_change`)

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`entity_action_on_equip` | [Entity Action](/docs/datapack/entity-actions) | _optional_ | Runs on the wearer when something is equipped.
`item_action_on_equip` | [Item Action](/docs/datapack/item-actions) | _optional_ | Runs on the item when it is equipped.
`entity_action_on_unequip` | [Entity Action](/docs/datapack/entity-actions) | _optional_ | Runs on the wearer when something is unequipped.
`item_action_on_unequip` | [Item Action](/docs/datapack/item-actions) | _optional_ | Runs on the item when it is unequipped.
`item_condition` | [Item Condition](/docs/datapack/item-conditions) | _optional_ | Only fire for items matching this.
`slots` | array of [String](/docs/datapack/data-types/string) or objects | `[]` | Which accessory slots to look at. A string is `slot`, `group/slot`, or `group/slot/index` — for example `"ring"`, `"hand/ring"`, `"hand/ring/0"`. An empty list means every slot.

## Examples

A puff of particles whenever a ring goes on or comes off:

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

A cursed amulet that burns you when you take it off:

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

> Needs an accessory mod — [Trinkets](https://modrinth.com/mod/trinkets), [Accessories](https://modrinth.com/mod/accessories) or Curios, depending on your loader. These types do not exist without one, so a pack using them must depend on it.
