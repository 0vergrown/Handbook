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

| Field         | Type                                                       | Default | Purpose                                        |
|---------------|------------------------------------------------------------|---------|------------------------------------------------|
| `type`        | identifier                                                 | —       | **Required.** Which power type this is.        |
| `name`        | [text component](/docs/datapack/data-types/text-component) | auto    | Display name. Falls back to a translation key. |
| `description` | [text component](/docs/datapack/data-types/text-component) | auto    | Description shown in menus.                    |
| `condition`   | [entity condition](/docs/datapack/introduction/conditions)     | none    | The power is only *active* while this passes.  |
| `hidden`      | boolean                                                    | `false` | Hide the power from origin/power screens.      |

The top-level `condition` is worth remembering: it's how you make a power conditional without changing its type. A `condition` of `apoli:sneaking` means the power only works while sneaking.

## Categories of power

There are over a hundred power types — every one has its [own page](/docs/datapack/powers/attribute) in the **Powers** section of the sidebar. They fall into a few loose families:

| Family | What they do | Examples |
| --- | --- | --- |
| Attribute & stat | Change numbers | [`apoli:attribute`](/docs/datapack/powers/attribute), [`apoli:modify_damage`](/docs/datapack/powers/modify_damage_dealt) |
| Movement | Flight, climbing, phasing | [`apoli:creative_flight`](/docs/datapack/powers/creative_flight), [`apoli:climbing`](/docs/datapack/powers/climbing) |
| Prevention & immunity | Take an ability away | [`apoli:invulnerability`](/docs/datapack/powers/invulnerability), [`apoli:prevent_death`](/docs/datapack/powers/prevent_death) |
| Action-driven | Fire [actions](/docs/datapack/introduction/actions) on a trigger | [`apoli:action_on_hit`](/docs/datapack/powers/action_on_hit), [`apoli:action_over_time`](/docs/datapack/powers/action_over_time) |
| Resources & state | Store a number, timer, or group | [`apoli:resource`](/docs/datapack/powers/resource), [`apoli:cooldown`](/docs/datapack/powers/cooldown) |
| Rendering & cosmetic | Colours, overlays, particles | [`apoli:model_color`](/docs/datapack/powers/model_color), [`apoli:particle`](/docs/datapack/powers/particle) |
| Item & inventory | Containers, recipes, projectiles | [`apoli:inventory`](/docs/datapack/powers/inventory), [`apoli:fire_projectile`](/docs/datapack/powers/fire_projectile) |
| Structural | Bundle or flag | [`apoli:multiple`](/docs/datapack/powers/multiple), [`apoli:simple`](/docs/datapack/powers/simple) |

## Powers are inert until granted

Writing a power file doesn't do anything on its own. Something has to give the power to an entity:

- a `/power grant` command,
- an **Origins** origin (via a [layer](/docs/datapack/origins/layers)),
- an [action](/docs/datapack/introduction/actions) like `apoli:grant_power`.

Once granted, Apoli applies the power's effect and — if it has a top-level `condition` — keeps it active only while that condition holds.

## Next

- [`apoli:simple`](/docs/datapack/powers/simple) — the simplest possible power.
- [`apoli:multiple`](/docs/datapack/powers/multiple) — combine powers.
