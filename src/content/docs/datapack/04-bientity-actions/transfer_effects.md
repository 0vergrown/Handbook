---
title: "Transfer Effects (Bi-Entity Action Type)"
description: "Moves or copies status effects between the actor and the target: all of them, a category, or a chosen few."
navigation_title: "Transfer Effects"
---

Moves or copies status effects between the actor and the target. Every status effect works, [custom status effects](/docs/datapack/introduction/custom-status-effects) included. A custom effect takes the powers it grants along with it, so the donor loses them and the recipient gains them.

Type ID: `apoli:transfer_effects`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `mode` | [String](/docs/datapack/data-types/string) | `steal` | `steal` moves effects from the target to the actor, and `give` moves them from the actor to the target. These are the same words as in [apoli:transfer](/docs/datapack/bientity-actions/transfer). |
| `effects` | [Identifier](/docs/datapack/data-types/identifier) or [Array](/docs/datapack/data-types/array) of Identifiers | _optional_ | Only transfers these effects. An entry starting with `#` names an effect tag. Leave it out to transfer every effect. `effect` is accepted as another spelling. |
| `category` | [String](/docs/datapack/data-types/string) or [Array](/docs/datapack/data-types/array) of Strings | _optional_ | Only transfers effects in these categories: `beneficial`, `harmful` or `neutral`. |
| `copy` | [Boolean](/docs/datapack/data-types/boolean) | `false` | With `false`, the donor loses each effect it hands over. With `true`, the donor keeps it. |
| `duration_modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) or [Array](/docs/datapack/data-types/array) of them | _optional_ | Changes the duration the recipient gets, in ticks, starting from the donor's remaining duration. |
| `amplifier_modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) or [Array](/docs/datapack/data-types/array) of them | _optional_ | Changes the amplifier the recipient gets (`0` is level I), starting from the donor's amplifier and kept between `0` and `255`. |
| `donor_duration_modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) or [Array](/docs/datapack/data-types/array) of them | _optional_ | With `copy`, changes the duration the donor keeps, so one effect can be split between the two. Ignored without `copy`. |

`effects` and `category` combine, so when both are written an effect has to pass both.

## How effects move

- An effect the recipient can't have, such as poison on an undead mob, is skipped, and the donor keeps it.
- If the recipient already has the effect, the usual status effect rules decide what stays: the stronger one, then the longer one.
- A transferred effect keeps its particles, icon and ambient setting.
- An effect with an infinite duration stays infinite, and the duration modifiers leave it alone.
- A duration modified down to `0` or less isn't given at all. With `donor_duration_modifier`, the donor loses the effect instead.
- Modifier expressions are worked out against the entity that ends up holding the effect: the recipient for `duration_modifier` and `amplifier_modifier`, and the donor for `donor_duration_modifier`.

## Examples

```json
{
    "type": "apoli:action_on_hit",
    "bientity_action": {
        "type": "apoli:transfer_effects",
        "mode": "give",
        "category": "harmful"
    }
}
```

Every hit hands the holder's harmful effects to whatever they struck, and the holder is rid of them.

```json
{
    "type": "apoli:transfer_effects",
    "category": "beneficial",
    "copy": true,
    "duration_modifier": {
        "operation": "multiply_total",
        "amount": -0.5
    },
    "amplifier_modifier": {
        "operation": "add_base_early",
        "amount": 1
    }
}
```

The actor copies the target's beneficial effects one level stronger but for half as long. The target keeps its own.

```json
{
    "type": "apoli:transfer_effects",
    "mode": "give",
    "copy": true,
    "duration_modifier": {
        "operation": "multiply_total",
        "amount": -0.5
    },
    "donor_duration_modifier": {
        "operation": "multiply_total",
        "amount": -0.5
    }
}
```

This splits every effect down the middle. The target gets half of what the actor had left, and the actor keeps the other half.
