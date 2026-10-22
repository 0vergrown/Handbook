---
title: "Modify XP Gain (Power Type)"
description: "Changes how much XP the player gains from experience orbs, or from cooking in a chosen furnace."
navigation_title: "Modify XP Gain"
---

Changes how much XP the player gains when they pick up an experience orb. With a `block_condition`, it changes the experience from cooking in a furnace, smoker or blast furnace instead.

Type ID: `apoli:modify_xp_gain`

> [!WARNING]
> Keep the multiplier modest. If it is too high, a player can gain more experience than they lose by dying.

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | If set, this modifier is applied to the experience gained. |
| `modifiers` | [Array](/docs/datapack/data-types/array) of [Attribute Modifiers](/docs/datapack/data-types/attribute-modifier) | _optional_ | If set, these modifiers are applied to the experience gained. |
| `block_condition` | [Block Condition Type](/docs/datapack/block-conditions) | _optional_ | If set, the power stops changing orbs. It changes the experience a furnace, smoker or blast furnace matching this condition gives the player when they take cooked items out of it, before the orbs appear. |

## How it behaves

Without a `block_condition`, the modifiers apply to each orb as the player picks it up. Mending repairs gear with the orb's experience first, and only what is left over is changed. Experience given by `/xp` or by another mod directly is not changed. A result with a fraction rounds up or down at random, so `2.5` gives `3` half of the time.

With a `block_condition`, the modifiers apply to the experience each cooked item is worth. A furnace stores the experience of everything it cooks until a player takes items out of the result slot, then hands it all over at once, so the player who takes them out is the one whose power counts.

## Examples

```json
{
    "type": "apoli:modify_xp_gain",
    "modifier": {
        "operation": "multiply_base",
        "value": 2.0
    }
}
```

This triples the experience gained from experience orbs.

```json
{
    "type": "apoli:modify_xp_gain",
    "block_condition": {
        "type": "apoli:block",
        "block": "minecraft:smoker"
    },
    "modifier": {
        "operation": "multiply_base_multiplicative",
        "value": 1
    }
}
```

This doubles the experience the player gets from food they cook in a smoker. A regular furnace and a blast furnace give the usual amount.
