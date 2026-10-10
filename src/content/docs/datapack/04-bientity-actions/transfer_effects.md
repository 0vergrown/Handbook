---
title: "Transfer Effects (Bi-Entity Action Type)"
description: "Moves or copies status effects between the actor and target — all of them, a category, or a chosen few."
navigation_title: "Transfer Effects"
---

Moves or copies **status effects** between the **actor** and **target**. Every status effect works, [custom status effects](/docs/datapack/introduction/custom-status-effects) included: a custom effect takes the powers it grants along with it, so the donor loses them and the recipient gains them.

Type ID: `apoli:transfer_effects`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`mode` | [String](/docs/datapack/data-types/string) | `steal` | `steal` moves effects **target → actor**; `give` moves them **actor → target**. The same words as [apoli:transfer](/docs/datapack/bientity-actions/transfer).
`effects` | [Identifier](/docs/datapack/data-types/identifier) or [Array](/docs/datapack/data-types/array) of Identifiers | _optional_ | Only transfer these effects. An entry starting with `#` names an effect tag. Leave it out to transfer every effect. `effect` is accepted as a spelling.
`category` | [String](/docs/datapack/data-types/string) or [Array](/docs/datapack/data-types/array) of Strings | _optional_ | Only transfer effects of these categories: `beneficial`, `harmful` or `neutral`.
`copy` | [Boolean](/docs/datapack/data-types/boolean) | `false` | If `false`, the donor loses each effect it hands over. If `true`, the donor keeps it.
`duration_modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) or [Array](/docs/datapack/data-types/array) of them | _optional_ | Changes the duration the recipient gets, in ticks. Starts from the donor's remaining duration.
`amplifier_modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) or [Array](/docs/datapack/data-types/array) of them | _optional_ | Changes the amplifier the recipient gets (`0` is level I). Starts from the donor's amplifier and is kept between `0` and `255`.
`donor_duration_modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) or [Array](/docs/datapack/data-types/array) of them | _optional_ | With `copy`, changes the duration the donor keeps, so one effect can be split between the two. Ignored without `copy`.

`effects` and `category` stack: an effect has to pass both when both are written.

## How effects move

- An effect the recipient cannot have — poison on an undead mob, say — is skipped, and the donor keeps it.
- If the recipient already has the effect, the usual status effect rules decide what stays: the stronger one, then the longer one.
- A transferred effect keeps its particles, icon and ambient setting.
- An effect with an infinite duration stays infinite; the duration modifiers leave it alone.
- A duration modified down to `0` or less is not given at all. With `donor_duration_modifier`, the donor loses the effect instead.
- Modifier expressions are worked out against the entity that ends up holding the effect: the recipient for `duration_modifier` and `amplifier_modifier`, the donor for `donor_duration_modifier`.

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

Splits every effect down the middle: the target gets half of what the actor had left, and the actor keeps the other half.
