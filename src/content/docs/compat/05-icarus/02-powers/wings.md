---
title: "Wings (Power Type)"
description: "Grants flapping wings with a stamina bar."
navigation_title: "Wings"
---

Grants the holder a pair of Icarus wings without them having to wear the item: flapping flight with a stamina bar that drains as you fly and refills on the ground.

Every field except `wings_type` defaults to whatever Icarus itself uses for that pair of wings, so a minimal power behaves exactly like the item.

Type ID: `apoli:wings`

> [!NOTE]
> This type needs [Icarus](https://modrinth.com/mod/icarus) and doesn't exist without it.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `wings_type` | [Identifier](/docs/datapack/data-types/identifier) or [Item Stack](/docs/datapack/data-types/item-stack) | _required_ | The wings to grant. An item ID is enough, and the object form lets you set components for a custom look. |
| `stamina` | [Float](/docs/datapack/data-types/float) | _the wings' own_ | The maximum stamina. Higher means longer flight before you have to land. |
| `wings_speed` | [Float](/docs/datapack/data-types/float) | _the wings' own_ | How hard a flap pushes you. |
| `exhaustion_amount` | [Float](/docs/datapack/data-types/float) | _the wings' own_ | The hunger exhaustion added per flap. |
| `armor_slows` | [Boolean](/docs/datapack/data-types/boolean) | _the wings' own_ | Whether wearing armour slows flight. |
| `max_slowed_multiplier` | [Float](/docs/datapack/data-types/float) | _the wings' own_ | How much armour can slow you, when `armor_slows` is on. |
| `max_height_above_world` | [Integer](/docs/datapack/data-types/integer) | _the wings' own_ | How far above the build limit you can climb. |

## Examples

```json
{
  "type": "apoli:wings",
  "wings_type": "icarus:feathered_wings"
}
```

These plain feathered wings behave exactly as the item does.

```json
{
  "type": "apoli:wings",
  "wings_type": "icarus:phantom_membrane_wings",
  "stamina": 40.0,
  "wings_speed": 1.4,
  "armor_slows": false
}
```

This pair is tuned for an origin built around flight, with more stamina, more speed and no slowdown from armour.

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

These wings only work while the `mypack:updraft` resource holds out, so flight becomes an ability to spend instead of a permanent one.
