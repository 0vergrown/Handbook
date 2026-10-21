---
title: "Self Glow (Power Type)"
description: "Makes the entity that has the power glow while its conditions are met."
navigation_title: "Self Glow"
---

Makes the entity that has the power glow while its conditions are met.

Type ID: `apoli:self_glow` (alias of [`apoli:entity_glow`](/docs/datapack/powers/entity_glow) with `self_glow_target` set to `true`)

The power works on any entity, including ones that aren't alive, such as projectiles. Grant it to an arrow or a custom projectile and the projectile glows.

In `bientity_condition`, the actor is the glowing entity with the power and the target is the viewer. So `apoli:actor_condition` tests the entity with the power, and `apoli:target_condition` tests whoever is looking.

> [!TIP]
> To get colour values from a colour picker, divide each RGB value by 255 to get a number between 0.0 and 1.0.

> [!WARNING]
> `entity_condition` and `bientity_condition` are only evaluated on the client, so condition types that only work on the server won't work here. Your own [apoli:inventory](/docs/datapack/powers/inventory) containers can be read there, but `apoli:command`, `apoli:advancement`, `apoli:scoreboard`, `apoli:stat` and `apoli:predicate` can't.

> [!NOTE]
> A `bientity_condition` or `entity_condition` that fails to parse fails the whole power, with a log line naming it. Check the log first, because a glow that ignores its condition is usually a condition that never parsed.
>
> You can't see your own `apoli:self_glow` in first person. Minecraft never renders the camera entity, so the glow only shows in third person (F5) or to other players.

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `entity_condition` | [Entity Condition Type](/docs/datapack/entity-conditions) | _optional_ | If set, only entities that pass this condition see the glow. |
| `bientity_condition` | [Bi-entity Condition Type](/docs/datapack/bientity-conditions) | _optional_ | If set, only entities that pass this condition together with the entity that has the power see the glow. |
| `use_teams` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether the glow uses the entity's team colour. If `false`, the glow uses the `red`, `green` and `blue` fields. |
| `red` | [Float](/docs/datapack/data-types/float) | `1.0` | Multiplies the red component of the glow, from 0.0 to 1.0. |
| `green` | [Float](/docs/datapack/data-types/float) | `1.0` | Multiplies the green component of the glow, from 0.0 to 1.0. |
| `blue` | [Float](/docs/datapack/data-types/float) | `1.0` | Multiplies the blue component of the glow, from 0.0 to 1.0. |

## Examples

```json
{
    "type": "apoli:self_glow",
    "use_teams": false,
    "red": 0.56862745098,
    "green": 0.89019607843,
    "blue": 0.65098039215,
    "condition": {
        "type": "apoli:in_rain"
    }
}
```

This makes the entity glow for everyone while it is in rain.

```json
{
    "type": "apoli:self_glow",
    "bientity_condition": {
        "type": "apoli:can_see"
    },
    "use_teams": false,
    "red": 1.0,
    "green": 0.0,
    "blue": 0.0
}
```

This makes the entity glow red for any entity that can see it.
