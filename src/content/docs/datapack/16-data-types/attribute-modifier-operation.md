---
title: "Attribute Modifier Operation (Data Type)"
description: "A string that picks the operation of an attribute modifier, such as add_base_early or multiply_total_multiplicative."
navigation_title: "Attribute Modifier Operation"
---

A [String](/docs/datapack/data-types/string) that picks the operation of an [Attribute Modifier](/docs/datapack/data-types/attribute-modifier).

> [!NOTE]
> The values below are listed in the order they apply, so `add_base_early` (and its aliases) runs first and `add_total_late` runs last.

## Vanilla and Apoli names

The three vanilla operation names, in both their 1.20 and 1.21 spellings, and the longer Apoli names are interchangeable. Use whichever reads better in your pack.

| Vanilla 1.20 / Apace | Vanilla 1.21 | Apoli name |
| --- | --- | --- |
| `addition` | `add_value` | `add_base_early` |
| `multiply_base` | `add_multiplied_base` | `multiply_base_additive` |
| `multiply_total` | `add_multiplied_total` | `multiply_total_multiplicative` |

The 1.21 names are also accepted in upper case (`ADD_VALUE`, `ADD_MULTIPLIED_BASE`, `ADD_MULTIPLIED_TOTAL`), since some packs write them that way.

## Values

| Value | Description |
| --- | --- |
| `add_base_early` (aliases `addition` and `add_value`) | `NewBase = Base + Modifier`, early in the base phase. |
| `multiply_base_additive` (aliases `multiply_base` and `add_multiplied_base`) | `NewBase = Base + (Base * Modifier)`. |
| `multiply_base_multiplicative` | `NewBase = Base * (1 + Modifier)`. |
| `standard_multiply_base` | `NewBase = Base * Modifier`. |
| `standard_divide_base` | `NewBase = Base / Modifier`. |
| `add_base_late` | `NewBase = Base + Modifier`, late in the base phase. |
| `min_base` | `NewBase = max(Base, Modifier)`, which raises the floor. |
| `max_base` | `NewBase = min(Base, Modifier)`, which caps the ceiling. |
| `set_base` | `NewBase = Modifier`. |
| `add_total_early` | `NewTotal = Total + Modifier`, early in the total phase. |
| `multiply_total_additive` | `NewTotal = Total + (Total * Modifier)`. |
| `multiply_total_multiplicative` (aliases `multiply_total` and `add_multiplied_total`) | `NewTotal = Total * (1 + Modifier)`. |
| `standard_multiply_total` | `NewTotal = Total * Modifier`. |
| `standard_divide_total` | `NewTotal = Total / Modifier`. |
| `min_total` | `NewTotal = max(Total, Modifier)`. |
| `max_total` | `NewTotal = min(Total, Modifier)`. |
| `set_total` | `NewTotal = Modifier`, which overrides everything before it. |
| `add_total_late` | `NewTotal = Total + Modifier`, after everything else, `set_total` included. |

## Phases and ordering

Modifiers run in two phases, base first and then total. Within a phase they follow the order of the table above, top first. When two modifiers share a phase and an operation, the order between them isn't defined, so don't rely on it.

For resource operations (apoli:modify_resource and its apoli:change_resource alias), the resource value is both `Base` and `Total`, so the operations come down to a change of a single number.
