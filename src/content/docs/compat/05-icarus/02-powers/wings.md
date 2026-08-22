---
title: "Wings (Power Type)"
description: Grants flapping wings with a stamina bar.
navigation_title: "Wings"
---

Grants the holder a pair of Icarus wings without them having to wear the item — flapping flight with a stamina bar that drains as you fly and refills on the ground.

Every field except `wings_type` defaults to whatever Icarus itself uses for that pair of wings, so a minimal power gives you exactly the item's behaviour.

Type ID: `apoli:wings`

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`wings_type` | [Identifier](/docs/datapack/data-types/identifier) or [Item Stack](/docs/datapack/data-types/item-stack) | **required** | Which wings to grant. An item id is enough; the object form lets you set components for a custom appearance.
`stamina` | [Float](/docs/datapack/data-types/float) | the wings' own | Maximum stamina. Higher means longer flight before you have to land.
`wings_speed` | [Float](/docs/datapack/data-types/float) | the wings' own | How fast a flap pushes you.
`exhaustion_amount` | [Float](/docs/datapack/data-types/float) | the wings' own | Hunger exhaustion added per flap.
`armor_slows` | [Boolean](/docs/datapack/data-types/boolean) | the wings' own | Whether wearing armour slows flight.
`max_slowed_multiplier` | [Float](/docs/datapack/data-types/float) | the wings' own | How much armour can slow you, when `armor_slows` is on.
`max_height_above_world` | [Integer](/docs/datapack/data-types/integer) | the wings' own | How far above the build limit you can climb.

## Examples

Plain feathered wings, behaving exactly as the item does:

```json
{
  "type": "apoli:wings",
  "wings_type": "icarus:feathered_wings"
}
```

A tuned pair for a flight-focused origin — more stamina, faster, and unaffected by armour:

```json
{
  "type": "apoli:wings",
  "wings_type": "icarus:phantom_membrane_wings",
  "stamina": 40.0,
  "wings_speed": 1.4,
  "armor_slows": false
}
```

Only while a resource holds out, so flight is a spendable ability rather than a permanent one:

```json
{
  "type": "apoli:wings",
  "wings_type": "icarus:feathered_wings",
  "condition": {
    "type": "apoli:resource",
    "resource": "mypack:updraft",
    "comparison": ">",
    "compare_to": 0
  }
}
```

> Needs [Icarus](https://modrinth.com/mod/icarus). This type does not exist without it.
