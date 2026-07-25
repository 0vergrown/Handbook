---
title: apoli:simple
description: A power that does nothing on its own — a flag other things can test for.
---

`apoli:simple` is the emptiest power there is. It has **no configuration** and no effect of its own. Its entire job is to *exist* on an entity so that something else can check for it.

## Fields

Only the [shared power fields](/docs/datapack/powers/overview#the-shape-of-a-power) apply — `type`, `name`, `description`, `condition`, `hidden`. There are no type-specific fields.

```json
{
  "type": "apoli:simple",
  "name": "Marked",
  "description": "Something is watching you."
}
```

## Why an empty power is useful

A simple power is a **flag**. On its own it's inert, but combined with the [`apoli:power`](/docs/datapack/conditions/entity-conditions) condition it becomes a switch other powers read:

```json
{
  "type": "apoli:attribute",
  "modifiers": [
    { "attribute": "minecraft:generic.movement_speed",
      "operation": "multiply_total_multiplicative", "value": 0.2 }
  ],
  "condition": {
    "type": "apoli:power",
    "power": "my_pack:marked"
  }
}
```

Now the speed boost only applies while the entity also has `my_pack:marked`. Grant or revoke the marker (by command, action, or origin) to turn the boost on and off — without touching the boost power itself.

## The top-level condition

Because `apoli:simple` still accepts the shared `condition` field, you can make the flag itself conditional. A marker that's only "on" at night:

```json
{
  "type": "apoli:simple",
  "condition": { "type": "apoli:daytime", "inverted": true }
}
```

## See also

- [`apoli:multiple`](/docs/datapack/powers/multiple) — bundle several powers under one.
- [Conditions](/docs/datapack/conditions/overview) — how to test for a power.
