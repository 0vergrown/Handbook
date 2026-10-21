---
title: "Attribute Modify Transfer (Power Type)"
description: "Applies the modifiers on one of the entity's attributes to a value another power type changes, such as its speed in the air."
navigation_title: "Attribute Modify Transfer"
---

Applies the modifiers on one of the entity's attributes to a value that another power type changes. The Avian's _Like Air_ uses it, so everything that makes the Avian walk faster (Speed, sprinting, its own tailwind) also makes it faster in the air.

Type ID: `apoli:attribute_modify_transfer`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `class` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The power type whose value receives the modifiers. A bare name such as `modify_air_speed` means `apoli:modify_air_speed`, and the `origins:` namespace works too. See [Classes](#classes). |
| `attribute` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The attribute to take the modifiers from, such as `minecraft:generic.movement_speed`. An unknown attribute is a load error. |
| `multiplier` | [Float](/docs/datapack/data-types/float) | `1` | Scales each transferred modifier. `0.5` passes on half of every bonus, and a negative number turns bonuses into penalties. |

## Classes

| `class` | What the modifiers change |
| --- | --- |
| `modify_air_speed` | Movement while in the air, as [Modify Air Speed](/docs/datapack/powers/modify_air_speed) |
| `modify_swim_speed` | How much momentum the entity keeps in water, as [Modify Swim Speed](/docs/datapack/powers/modify_swim_speed) |
| `modify_jump` | Jump strength, as [Modify Jump](/docs/datapack/powers/modify_jump) |
| `modify_slipperiness` | The friction of the block the entity stands on, as [Modify Slipperiness](/docs/datapack/powers/modify_slipperiness) |
| `modify_velocity` | Movement on all three axes, as [Modify Velocity](/docs/datapack/powers/modify_velocity) |
| `modify_falling` | Gravity while falling, as [Modify Falling](/docs/datapack/powers/modify_falling) |
| `modify_break_speed` | Mining speed (not block hardness), as [Modify Break Speed](/docs/datapack/powers/modify_break_speed) |
| `modify_exhaustion` | Hunger exhaustion, as [Modify Exhaustion](/docs/datapack/powers/modify_exhaustion) |
| `modify_healing` | Every heal, as [Modify Healing](/docs/datapack/powers/modify_healing) |
| `modify_damage_dealt` | Damage the entity deals, as [Modify Damage](/docs/datapack/powers/modify_damage) with `target_used: false` |
| `modify_damage_taken` | Damage the entity takes, as [Modify Damage](/docs/datapack/powers/modify_damage) with `target_used: true` |
| `modify_projectile_damage` | Damage from the entity's projectiles, as [Modify Projectile Damage](/docs/datapack/powers/modify_projectile_damage) |
| `modify_status_effect_amplifier` | The amplifier of every effect the entity receives, as [Modify Status Effect Amplifier](/docs/datapack/powers/modify_status_effect_amplifier) |
| `modify_status_effect_duration` | The duration of every effect the entity receives, as [Modify Status Effect Duration](/docs/datapack/powers/modify_status_effect_duration) |
| `modify_fov` | The field of view, as [Modify FOV](/docs/datapack/powers/modify_fov) |

Any other power type, `modify_damage` itself included, is a load error that lists these classes.

## How the modifiers are applied

The transfer reads every modifier on the attribute, whatever added it, and applies them the way the attribute does:

1. `add_value` modifiers are added to the value.
2. `add_multiplied_base` modifiers are added together and multiply the result once.
3. Each `add_multiplied_total` modifier multiplies the result in turn.

`multiplier` scales each modifier's amount first. The transferred modifiers join the class's own powers in the usual [operation order](/docs/datapack/data-types/attribute-modifier-operation), so a `set_total` from a `modify_air_speed` power still has the last word.

- The transfer works even when the entity has no power of that class itself.
- It ignores the class's filters. A `modify_break_speed` transfer speeds up every block, a `modify_status_effect_duration` transfer lengthens every effect, and a `modify_velocity` transfer acts on all three axes.
- The power's own `condition` turns it on and off as usual.

> [!NOTE]
> The modifiers are added up once, when something changes them on the attribute, and the result is stored with the attribute. A transfer costs about as much per tick as one more modifier on the class's power.

## Examples

```json
{
  "type": "apoli:attribute_modify_transfer",
  "class": "modify_air_speed",
  "attribute": "minecraft:generic.movement_speed",
  "multiplier": 1
}
```

Every bonus to walking speed also applies in the air. This is the Avian's _Like Air_.

```json
{
  "type": "apoli:attribute_modify_transfer",
  "class": "modify_jump",
  "attribute": "minecraft:generic.movement_speed",
  "multiplier": 0.5,
  "condition": {
    "type": "apoli:sprinting"
  }
}
```

While sprinting, half of each walking speed bonus also strengthens the jump. With Speed II (+40%) and the sprint bonus (+30%), the jump is 1.2 × 1.15 times as strong.
