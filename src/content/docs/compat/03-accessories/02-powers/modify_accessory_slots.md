---
title: "Modify Accessory Slots (Power Type)"
description: Adds or removes accessory slots for the entity.
navigation_title: "Modify Accessory Slots"
aliases: ["modify_trinket_slot", "modify_trinket_slots"]
---

Changes how many accessory slots the holder has. Adding slots is the usual case — an origin that can wear two rings instead of one.

Type ID: `apoli:modify_accessory_slots` (aliases `apoli:modify_trinket_slot`, `apoli:modify_trinket_slots`)

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`modifiers` | array of modifier objects | **required** | The slot changes. See below.

### Modifier fields

Field | Type | Default | Description
------|------|---------|-------------
`slot` | [String](/docs/datapack/data-types/string) | **required** | The slot to change, as `group/slot` — for example `hand/ring`.
`id` | [Identifier](/docs/datapack/data-types/identifier) | **required** | A unique id for this modifier, so it can be applied and removed cleanly.
`amount` | [Float](/docs/datapack/data-types/float) | `0.0` | How much to change the count by.
`operation` | [Attribute Modifier Operation](/docs/datapack/data-types/attribute-modifier-operation) | `add_base_early` | How `amount` is applied.

## Examples

One extra ring slot:

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

Take a slot away as a drawback, and add another elsewhere as the compensation:

```json
{
  "type": "apoli:modify_accessory_slots",
  "modifiers": [
    { "slot": "chest/necklace", "id": "mypack:no_necklace", "amount": -1 },
    { "slot": "hand/ring",      "id": "mypack:extra_ring",  "amount": 2 }
  ]
}
```

> Give each modifier a distinct `id`. Two modifiers sharing one id on the same slot will overwrite each other.

> Needs an accessory mod — [Trinkets](https://modrinth.com/mod/trinkets), [Accessories](https://modrinth.com/mod/accessories) or Curios, depending on your loader. These types do not exist without one, so a pack using them must depend on it.
