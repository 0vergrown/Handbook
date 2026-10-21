---
title: "Out Of World (Damage Condition Type)"
description: Passes when the damage ignores invulnerability, such as the void.
navigation_title: "Out Of World"
---

Passes when the damage ignores invulnerability entirely, as the void and `/kill` do.

Type ID: `apoli:out_of_world`

## Fields

This condition has no fields. Like every condition, it accepts `inverted` to flip the result.

## How it works

It is shorthand for [`apoli:in_tag`](/docs/datapack/damage-conditions/in_tag) with the `minecraft:bypasses_invulnerability` damage type tag, so a data pack that adds its own damage type to that tag is matched too.

## Example

It is mostly useful as an exclusion, so an otherwise total damage immunity still lets the void through:

```json
{
  "type": "apoli:invulnerability",
  "damage_condition": {
    "type": "apoli:out_of_world",
    "inverted": true
  }
}
```

> [!NOTE]
> Without the inversion, an unconditional `apoli:invulnerability` already lets void damage through, because Minecraft treats it as bypassing invulnerability. This condition lets you refer to that set of damage explicitly.
