---
title: "Equipped Accessory (Entity Condition Type)"
description: "Checks whether the entity wears an accessory that passes an item condition."
navigation_title: "Equipped Accessory"
aliases: []
---

Checks whether the entity has an item equipped in an accessory slot, optionally one that passes an item condition and optionally in specific slots.

Type ID: `apoli:equipped_accessory`

> [!NOTE]
> This type only exists when an accessory mod is installed: [Trinkets](https://modrinth.com/mod/trinkets), [Accessories](https://modrinth.com/mod/accessories) or Curios, depending on your loader. A pack that uses it must depend on one. To check an accessory slot from a pack that should still load without one, use the `accessory_slot` field of [`apoli:equipped_item`](/docs/datapack/entity-conditions/equipped_item).

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `item_condition` | [Item Condition Type](/docs/datapack/item-conditions) | _optional_ | The condition a worn accessory must pass. Without it, any equipped accessory counts. |
| `slots` | [Array](/docs/datapack/data-types/array) of [slots](/docs/compat/accessories/overview#slots) | `[]` | The accessory slots to look in, such as `"charm"`, `"necklace"` or `"hand/ring"`. An empty list means every slot. |

The condition passes as soon as one equipped accessory in the listed slots passes `item_condition`. Empty slots are never tested, so to check that a slot is empty use [`apoli:accessory_equipped_count`](/docs/compat/accessories/accessory_equipped_count) with `"compare_to": 0`.

## Examples

```json
{
  "type": "apoli:equipped_accessory",
  "item_condition": {
    "type": "apoli:ingredient",
    "ingredient": {
      "item": "example:moon_charm"
    }
  }
}
```

This passes while the entity wears `example:moon_charm` in any accessory slot.

```json
{
  "type": "apoli:action_over_time",
  "interval": 20,
  "condition": {
    "type": "apoli:equipped_accessory",
    "slots": "charm",
    "item_condition": {
      "type": "apoli:ingredient",
      "ingredient": {
        "item": "example:moon_charm"
      }
    }
  },
  "entity_action": {
    "type": "apoli:apply_effect",
    "effect": {
      "effect": "minecraft:night_vision",
      "duration": 300,
      "show_particles": false
    }
  }
}
```

This gives night vision every second while the moon charm sits in a `charm` slot. Wearing it in any other slot does nothing.

```json
{
  "type": "apoli:equipped_accessory",
  "slots": [
    "necklace",
    "hand/ring"
  ]
}
```

This passes when anything at all is worn in a necklace slot or a Trinkets ring slot.
