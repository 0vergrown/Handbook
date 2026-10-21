---
title: "Modify Accessory Slots (Power Type)"
description: "Adds or removes accessory slots for the entity."
navigation_title: "Modify Accessory Slots"
aliases: ["modify_trinket_slot", "modify_trinket_slots"]
---

Changes how many accessory slots the holder has. Adding slots is the usual case, such as an origin that can wear two rings instead of one.

Type ID: `apoli:modify_accessory_slots` (aliases `apoli:modify_trinket_slot`, `apoli:modify_trinket_slots`)

> [!NOTE]
> This type only exists when an accessory mod is installed: [Trinkets](https://modrinth.com/mod/trinkets), [Accessories](https://modrinth.com/mod/accessories) or Curios, depending on your loader. A pack that uses it must depend on one.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `modifiers` | [Array](/docs/datapack/data-types/array) of modifier objects | _required_ | The slot changes (see below). |

### Modifier fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `slot` | [String](/docs/datapack/data-types/string) | _required_ | The slot to change, named the way your accessory mod names it. Trinkets uses `group/slot` (`hand/ring`), and Accessories and Curios use the slot name alone (`ring`). |
| `id` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | A unique ID for this modifier, so it can be applied and removed cleanly. |
| `amount` | [Float](/docs/datapack/data-types/float) | `0.0` | How much to change the count by. |
| `operation` | [Attribute Modifier Operation](/docs/datapack/data-types/attribute-modifier-operation) | `add_base_early` | How `amount` is applied. |

## Examples

```json
{
  "type": "apoli:modify_accessory_slots",
  "modifiers": [
    {
      "slot": "hand/ring",
      "id": "mypack:extra_ring",
      "amount": 1
    }
  ]
}
```

This gives the holder one extra ring slot.

```json
{
  "type": "apoli:modify_accessory_slots",
  "modifiers": [
    { "slot": "chest/necklace", "id": "mypack:no_necklace", "amount": -1 },
    { "slot": "hand/ring",      "id": "mypack:extra_ring",  "amount": 2 }
  ]
}
```

This takes the necklace slot away as a drawback and adds two ring slots to make up for it.

The power's `condition` is checked every tick. The slots are added while it passes and taken away again while it fails, so a slot can follow a resource, a toggle or anything else the condition reads:

```json
{
  "type": "apoli:modify_accessory_slots",
  "condition": {
    "type": "apoli:resource",
    "resource": "mypack:ring_charge",
    "comparison": ">",
    "compare_to": 0
  },
  "modifiers": [
    { "slot": "hand/ring", "id": "mypack:charged_ring", "amount": 1 }
  ]
}
```

> [!WARNING]
> Give each modifier a different `id`. Two modifiers sharing an ID on the same slot overwrite each other.
