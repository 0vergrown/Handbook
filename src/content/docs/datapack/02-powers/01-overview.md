---
title: Powers
description: The top-level unit — what a power is and the fields every power shares.
---

A **power** is the top-level unit in Apoli: the thing an entity *has*. Every power is a JSON object with a `type`, and the `type` decides what the power does.

## The shape of a power

```json
{
  "type": "apoli:attribute",
  "name": "Tough",
  "description": "You have more health than most.",
  "modifiers": [
    { "attribute": "minecraft:generic.max_health", "operation": "add_base_early", "value": 10 }
  ]
}
```

Five fields are shared by **every** power type. Everything else is type-specific.

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `type` | identifier | — | **Required.** Which power type this is. |
| `name` | [text component](/docs/datapack/data-types/text-component) | auto | Display name. Falls back to a translation key. |
| `description` | [text component](/docs/datapack/data-types/text-component) | auto | Description shown in menus. |
| `condition` | [entity condition](/docs/datapack/conditions/overview) | none | The power is only *active* while this passes. |
| `hidden` | boolean | `false` | Hide the power from origin/power screens. |

The top-level `condition` is worth remembering: it's how you make a power conditional without changing its type. A `condition` of `apoli:sneaking` means the power only works while sneaking.

## Categories of power

There are over a hundred power types. They fall into a few loose groups:

- **Attribute & stat** — `apoli:attribute`, `apoli:swim_speed`, `apoli:modify_damage`. Change numbers.
- **Toggle & simple** — [`apoli:simple`](/docs/datapack/powers/simple), `apoli:invulnerability`, `apoli:climbing`. On/off traits.
- **Action-driven** — `apoli:action_on_hit`, `apoli:action_over_time`, `apoli:action_on_key_press`. Run [actions](/docs/datapack/actions/overview) on a trigger.
- **Resource** — `apoli:resource`, `apoli:cooldown`. Track a number you can read and change.
- **Structural** — [`apoli:multiple`](/docs/datapack/powers/multiple). Bundle many powers into one.

## Powers are inert until granted

Writing a power file doesn't do anything on its own. Something has to give the power to an entity:

- a `/power grant` command,
- an **Origins** origin (via a [layer](/docs/datapack/origins/layers)),
- an [action](/docs/datapack/actions/overview) like `apoli:grant_power`.

Once granted, Apoli applies the power's effect and — if it has a top-level `condition` — keeps it active only while that condition holds.

## Next

- [`apoli:simple`](/docs/datapack/powers/simple) — the simplest possible power.
- [`apoli:multiple`](/docs/datapack/powers/multiple) — combine powers.
