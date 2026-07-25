---
title: Attribute modifier
description: How a value changes an attribute — every operation, base and total.
---

An **attribute modifier** describes a single change to an attribute: *which* attribute, by *how much*, and *how* the amount is combined. It's the value type behind [`apoli:attribute`](/docs/datapack/powers/attribute), and the same shape modifies resources.

## Fields

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `operation` | operation | — | **Required.** How the value is applied (see below). |
| `value` | number | — | **Required.** The amount. |
| `attribute` | identifier | — | The attribute to change (for `apoli:attribute`). |
| `resource` | identifier | — | The resource to change (for resource modifiers). |

Give either `attribute` or `resource` depending on what you're modifying.

```json
{
  "attribute": "minecraft:generic.attack_damage",
  "operation": "add_base_early",
  "value": 3
}
```

## Operations

Modifiers apply in two phases. **Base** operations adjust the attribute's base value; **total** operations adjust the final value after base modifiers. Within a phase, `add`s happen first, then multiplies, then min/max/set.

### Base phase

| Operation | Result |
| --- | --- |
| `add_base_early` | `base + value` (applied early) |
| `multiply_base_additive` | `base + base × value` |
| `multiply_base_multiplicative` | `base × (1 + value)` |
| `standard_multiply_base` | `base × value` |
| `standard_divide_base` | `base ÷ value` |
| `add_base_late` | `base + value` (applied late) |
| `min_base` | at least `value` |
| `max_base` | at most `value` |
| `set_base` | exactly `value` |

### Total phase

| Operation | Result |
| --- | --- |
| `add_total_early` | `total + value` |
| `multiply_total_additive` | `total + total × value` |
| `multiply_total_multiplicative` | `total × (1 + value)` |
| `standard_multiply_total` | `total × value` |
| `standard_divide_total` | `total ÷ value` |
| `min_total` | at least `value` |
| `max_total` | at most `value` |
| `set_total` | exactly `value` |
| `add_total_late` | `total + value` |

### Legacy aliases

Older data packs use shorter names. They still work and map onto the above:

| Legacy | Same as |
| --- | --- |
| `addition` | `add_base_early` |
| `multiply_base` | `multiply_base_additive` |
| `multiply_total` | `multiply_total_multiplicative` |

## Choosing an operation

- Flat bonus (`+2 hearts`, `+3 damage`) → `add_base_early`.
- "+30% speed" that stacks additively with other percentages → `multiply_base_additive`.
- A final multiplier applied on top of everything → `multiply_total_multiplicative`.
- A hard cap or floor → `max_total` / `min_total`.

```json
{
  "attribute": "minecraft:generic.movement_speed",
  "operation": "multiply_total_multiplicative",
  "value": 0.3
}
```

That's a clean "30% faster", regardless of other speed modifiers.

## See also

- [`apoli:attribute`](/docs/datapack/powers/attribute) — the power that applies these.
