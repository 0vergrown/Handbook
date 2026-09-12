---
title: "Impact (Bi-Entity Condition Type)"
description: "Compares one player's origin impact against the other player's, or against a fixed value."
navigation_title: "Impact"
---

The bi-entity form of [`origins:impact`](/docs/datapack/origins/impact). Compares the impact of one side's origins against the **other side's**, so a power can behave differently when it is punching up or punching down.

Type ID: `origins:impact`

## Fields

| Field | Type | Default | Description |
|---|---|---|---|
| `subject` | [String](/docs/datapack/data-types/string) | `actor` | Whose impact is the left-hand value: `actor` or `target`. |
| `compare_to` | [Integer](/docs/datapack/data-types/integer) or impact name | _optional_ | A fixed value to compare against — `0`–`3`, or `none`, `low`, `medium`, `high`. Leave it out to compare against the **other** entity's impact instead. |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | `>=` | How the subject's impact is compared to the right-hand value. |
| `offset` | [Double](/docs/datapack/data-types/float) | `0` | Added to the right-hand value before comparing. `"offset": 1` with `>=` means "at least one step above them". |
| `layer` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | Only look at the origin each side has in this layer. Omit to look at every layer. |
| `aggregate` | [String](/docs/datapack/data-types/string) | `max` | How several layers combine when `layer` is omitted: `max`, `min`, `sum` or `average`. |

`false` if the side being read is not a player — including the other side, when `compare_to` is omitted and both are needed.

## Examples

Deal bonus damage only to someone weaker than you:

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

With no `compare_to`, the actor's impact is the left-hand value and the target's is the right-hand one, so `">"` reads as "I outrank them".

A guard that only triggers when the attacker outclasses you by a full step:

```json
{
    "type": "origins:impact",
    "subject": "target",
    "comparison": ">=",
    "offset": 1
}
```

Read as: the **target**'s impact is at least one higher than the actor's.

Used as a plain check on one side, by giving it a fixed value — here the target, so a bi-entity action can gate on who it is hitting:

```json
{
    "type": "origins:impact",
    "subject": "target",
    "comparison": "<=",
    "compare_to": "low"
}
```
