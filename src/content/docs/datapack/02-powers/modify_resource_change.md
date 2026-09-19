---
title: "Modify Resource Change (Power Type)"
description: "Scales how fast the holder's resources and cooldowns move."
navigation_title: "Modify Resource Change"
---

Scales every change made to the holder's [resources](/docs/datapack/powers/resource) and [cooldowns](/docs/datapack/powers/cooldown) while it is active. It does not set a value — it multiplies the *step*, so a buff that halves cooldowns or doubles mana drain is one power instead of a rewrite of every ability that touches them.

Type ID: `apoli:modify_resource_change`

## Fields

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | A single modifier applied to the size of each change. |
| `modifiers` | Array of Attribute Modifier | _optional_ | Several modifiers applied to the size of each change. |
| `modify` | `gain`, `drain` or `both` | `both` | Which direction of change is affected. `gain` is a change that raises the value, `drain` one that lowers it. |
| `resources` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Affect resource-style powers — `apoli:resource`, `apoli:power_storage` and anything else with a stored value. |
| `cooldowns` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Affect cooldowns, both the `apoli:cooldown` power type and the cooldown built into powers such as `apoli:action_on_key_press` or `apoli:fire_projectile`. |
| `resource` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | Restrict this power to one resource or cooldown power. Omit it to affect all of them. |

## How the modifier is applied

The modifier never sees the resource's value — it sees **how far the value was about to move**, as a positive number, and returns how far it should move instead. The direction is preserved, so a modifier can never turn a gain into a drain.

| Change | `modifier` | Result |
| --- | --- | --- |
| `mana` 40 → 30 (a drain of 10) | `multiply_total: 1` | 40 → 20 |
| `mana` 40 → 30 (a drain of 10) | `multiply_total: -0.5` | 40 → 35 |
| `mana` 40 → 50 (a gain of 10) | `add_base_early: 5` | 40 → 55 |

Cooldowns are counted in **remaining ticks**, so their natural countdown of one tick per tick is a drain of `1`. A modifier that doubles drain empties a cooldown twice as fast; fractions are carried between ticks, so `multiply_total: 0.25` really is 25% faster rather than rounding away to nothing.

`modify: drain` on a cooldown is the recharge speed. `modify: gain` on a cooldown is how much is put *on* the clock when an ability fires — a long-cooldown debuff.

## Examples

Nearby allies recharge twice as fast, resources untouched:

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

Efficient casting — every mana cost is a quarter smaller, but regeneration is unchanged:

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

Exhausted — everything the holder gains comes in at half rate, while costs are unchanged:

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

- Several active `modify_resource_change` powers stack, in the order the modifiers sort.
- This power changes the *size* of a change, so it cannot start one. A resource nothing writes to stays where it is, and a cooldown that is already at `0` is left alone.
- A change is clamped by the target's own bounds afterwards, so a scaled gain still stops at the resource's `max`.
- Writes made by this power are exempt from it, so two holders buffing each other cannot feed back into one another.

> Whenever any loaded pack uses this power, every resource write costs one extra read to learn the value it is moving from. Holders without the power skip the whole path.
