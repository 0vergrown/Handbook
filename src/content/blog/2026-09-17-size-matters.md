---
title: "Size matters"
description: "Apoli 1.86.0 gets a scale system of its own, with nineteen scale types, a command, a power, an action and a condition, plus a solid hitbox you can stand on."
date: 2026-09-17
author: Overgrown
---

This is Apoli 1.86.0 and Origins 1.38.1. Changing size is the thing people have asked for most, and until now the answer was "install Pehkui". It's a good mod. It's also one more dependency, one more thing to keep in step with a Minecraft update, and one more system that knows nothing about powers, conditions or expressions. So Apoli has its own now.

## Nineteen dials

A scale type is one axis of an entity's size, and every entity has a value for each one, starting at `1`. `apoli:base` is the master dial, `apoli:width` and `apoli:height` hang off it, and `apoli:hitbox_*` and `apoli:model_*` hang off those, so you can make something that looks enormous and still fits through a door, or the reverse. The full table is on the [Scale Type](/docs/datapack/data-types/scale-type) page.

The dials that aren't geometry are built from the ones that are. `apoli:falling` is one divided by `apoli:motion`, so a bigger entity takes more fall damage and a smaller one takes less without you wiring anything up. It's the square-cube law for free.

## Four ways in

A [power](/docs/datapack/powers/scale) gives size that lasts exactly as long as the power does:

```json
{
    "type": "apoli:scale",
    "scale_types": ["apoli:width", "apoli:height"],
    "modifier": {
        "operation": "set_total",
        "amount": "clamp(health / max_health, 0.35, 1)"
    }
}
```

That's an [Expression](/docs/datapack/data-types/expression), so the entity shrinks as it's hurt and grows back as it heals, every tick, with no resource plumbing.

An [entity action](/docs/datapack/entity-actions/scale) gives size that sticks. It's stored on the entity, survives relogs and dimension changes, and can ease into place over a number of ticks:

```json
{
    "type": "apoli:scale",
    "operation": "multiply",
    "scale": 1.1,
    "ticks": 10,
    "easing": "ease_out_cubic"
}
```

A [condition](/docs/datapack/entity-conditions/scale) reads one back, and a [command](/docs/datapack/commands/scale), `/apoli:scale`, works on any entity, not only players:

```mcfunction
apoli:scale set @s apoli:base 0.25 40 ease_out_cubic
apoli:scale multiply @e[type=zombie,distance=..8] apoli:height 1.5
apoli:scale get @s apoli:model_height
```

All of these sources multiply together, so a stored value, a power and a parent scale stack the way you'd expect instead of fighting over who wins.

## Something to stand on

[apoli:solid_hitbox](/docs/datapack/powers/solid_hitbox) makes an entity's hitbox solid the way a boat or a happy ghast is: other entities walk into it, get stopped by it, and can stand on top of it. Scale a player up to five and give them this, and they're a platform people can walk on. It takes a `bientity_condition` too, so you can be solid to everyone except your own party.

## If you already have Pehkui

Nothing breaks and nothing doubles. When Pehkui is installed, Apoli hands its values to Pehkui instead of applying them itself, so the two mods agree on one size. IDs copied from a Pehkui pack keep working too, since a `pehkui:` namespace resolves to the matching Apoli scale type.
