---
title: "Modify Resource Change (Power Type)"
description: "Scales how fast the entity's resources and cooldowns change."
navigation_title: "Modify Resource Change"
---

Scales every change made to the [resources](/docs/datapack/powers/resource) and [cooldowns](/docs/datapack/powers/cooldown) of the entity with the power while the power is active. It doesn't set a value. It multiplies each step, so a buff that halves cooldowns or doubles mana drain is one power instead of a change to every ability that uses them.

Type ID: `apoli:modify_resource_change`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | A single modifier applied to the size of each change. |
| `modifiers` | [Array](/docs/datapack/data-types/array) of [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | Several modifiers applied to the size of each change. |
| `modify` | `gain`, `drain` or `both` | `both` | Which direction of change is affected. A gain raises the value and a drain lowers it. |
| `resources` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether powers with a stored value are affected, such as `apoli:resource` and `apoli:power_storage`. |
| `cooldowns` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether cooldowns are affected, both the `apoli:cooldown` power type and the cooldown built into powers such as `apoli:action_on_key_press` or `apoli:fire_projectile`. |
| `resource` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | Limits this power to one resource or cooldown power. Leave it out to affect all of them. |

## How the modifier is applied

The modifier never sees the resource's value. It sees how far the value was about to move, as a positive number, and returns how far it should move instead. The direction stays the same, so a modifier can never turn a gain into a drain.

| Change | `modifier` | Result |
| --- | --- | --- |
| `mana` from 40 to 30 (a drain of 10) | `multiply_total: 1` | 40 to 20 |
| `mana` from 40 to 30 (a drain of 10) | `multiply_total: -0.5` | 40 to 35 |
| `mana` from 40 to 50 (a gain of 10) | `add_base_early: 5` | 40 to 55 |

Cooldowns count remaining ticks, so their natural countdown of one tick per tick is a drain of `1`. A modifier that doubles drain empties a cooldown twice as fast. Fractions carry over between ticks, so `multiply_total: 0.25` makes a cooldown 25% faster instead of rounding away to nothing.

`modify: drain` on a cooldown is the recharge speed. `modify: gain` on a cooldown is how much time goes on the clock when an ability fires, which works as a debuff that lengthens cooldowns.

## Examples

Cooldowns recharge twice as fast, and resources are untouched:

```json
{
  "type": "apoli:modify_resource_change",
  "modifier": {
    "value": 1,
    "operation": "multiply_total"
  },
  "modify": "drain",
  "resources": false,
  "cooldowns": true
}
```

Efficient casting, where every mana cost is a quarter smaller but regeneration is unchanged:

```json
{
  "type": "apoli:modify_resource_change",
  "resource": "example:mana",
  "cooldowns": false,
  "modify": "drain",
  "modifier": {
    "value": -0.25,
    "operation": "multiply_total"
  }
}
```

Exhaustion, where everything the entity gains comes in at half the rate while costs are unchanged:

```json
{
  "type": "apoli:modify_resource_change",
  "modify": "gain",
  "cooldowns": false,
  "modifier": {
    "value": -0.5,
    "operation": "multiply_total"
  },
  "condition": {
    "type": "apoli:food_level",
    "comparison": "<=",
    "compare_to": 6
  }
}
```

## Notes

- Several active `modify_resource_change` powers stack, in the order their modifiers sort.
- The power changes the size of a change, so it can't start one. A resource nothing writes to stays where it is, and a cooldown already at `0` is left alone.
- A change is clamped to the target's own bounds afterwards, so a scaled gain still stops at the resource's `max`.
- Writes made by this power aren't affected by it, so two entities buffing each other can't feed back into one another.

> [!NOTE]
> While any loaded pack uses this power, every resource write costs one extra read to learn the value it is moving from. Entities without the power skip that path entirely.
