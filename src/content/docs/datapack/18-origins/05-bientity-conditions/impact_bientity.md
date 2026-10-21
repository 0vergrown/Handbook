---
title: "Impact (Bi-Entity Condition Type)"
description: "Compares one player's origin impact against the other player's, or against a fixed value."
navigation_title: "Impact"
---

The bi-entity form of [`origins:impact`](/docs/datapack/origins/impact). It compares the impact of one side's origins against the other side's, so a power can behave differently against a stronger or a weaker player.

Type ID: `origins:impact`

> [!NOTE]
> This condition comes from the Origins mod.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `subject` | [String](/docs/datapack/data-types/string) | `actor` | Whose impact is the left-hand value: `actor` or `target`. |
| `compare_to` | [Integer](/docs/datapack/data-types/integer) or impact name | _optional_ | A fixed value to compare against: `0` to `3`, or `none`, `low`, `medium` or `high`. Leave it out to compare against the other entity's impact instead. |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | `>=` | How the subject's impact is compared to the right-hand value. |
| `offset` | [Float](/docs/datapack/data-types/float) | `0` | Added to the right-hand value before comparing. `"offset": 1` with `>=` means at least one step above the other side. |
| `layer` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | Only looks at the origin each side has in this layer. Leave it out to look at every layer. |
| `aggregate` | [String](/docs/datapack/data-types/string) | `max` | How several layers combine when `layer` is left out: `max`, `min`, `sum` or `average`. |

The condition is `false` when the side being read isn't a player, including the other side when `compare_to` is left out and both are needed.

## Examples

```json
{
    "type": "apoli:action_on_hit",
    "bientity_action": {
        "type": "apoli:damage",
        "amount": 3,
        "damage_type": "minecraft:player_attack"
    },
    "bientity_condition": {
        "type": "origins:impact",
        "comparison": ">"
    }
}
```

This power deals 3 extra damage, but only to someone weaker than you. With no `compare_to`, the actor's impact is the left-hand value and the target's is the right-hand one, so `>` means the actor outranks the target.

```json
{
    "type": "origins:impact",
    "subject": "target",
    "comparison": ">=",
    "offset": 1
}
```

This passes when the target's impact is at least one step higher than the actor's, for a guard against someone who outclasses you by a full step.

```json
{
    "type": "origins:impact",
    "subject": "target",
    "comparison": "<=",
    "compare_to": "low"
}
```

With a fixed value, it works as a plain check on one side. This one checks the target, so a bi-entity action can depend on who it is hitting.
