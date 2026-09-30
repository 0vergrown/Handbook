---
title: "Attribute Modifier Operation (Data Type)"
description: "A String used to specify the operation in an Attribute Modifier."
navigation_title: "Attribute Modifier Operation"
---

A [String](/docs/datapack/data-types/string) used to specify the operation in an [Attribute Modifier](/docs/datapack/data-types/attribute-modifier).

> The listed values are ordered by application priority — `add_base_early` (and its aliases) runs first, `add_total_late` runs last.

## Quick map: vanilla ↔ Apoli

The three vanilla operation names — in both their 1.20 and 1.21 spellings — and the long-named Apoli equivalents are interchangeable. Use whichever reads better in your pack.

| Vanilla 1.20 / Apace | Vanilla 1.21 | Canonical (Apoli) |
|----------------------|--------------|-------------------|
| `addition`           | `add_value`            | `add_base_early`                |
| `multiply_base`      | `add_multiplied_base`  | `multiply_base_additive`        |
| `multiply_total`     | `add_multiplied_total` | `multiply_total_multiplicative` |

The 1.21 names are also accepted in upper case (`ADD_VALUE`, `ADD_MULTIPLIED_BASE`, `ADD_MULTIPLIED_TOTAL`), as some packs write them.

## Values

| Value                                                     | Description                                            |
| --------------------------------------------------------- | ------------------------------------------------------ |
| `add_base_early` (aliases: `addition`, `add_value`)      | `NewBase = Base + Modifier` (early in the base phase). |
| `multiply_base_additive` (aliases: `multiply_base`, `add_multiplied_base`) | `NewBase = Base + (Base * Modifier)`.                  |
| `multiply_base_multiplicative`                            | `NewBase = Base * (1 + Modifier)`.                     |
| `standard_multiply_base`                                  | `NewBase = Base * Modifier`.                           |
| `standard_divide_base`                                    | `NewBase = Base / Modifier`.                           |
| `add_base_late`                                           | `NewBase = Base + Modifier` (late in the base phase).  |
| `min_base`                                                | `NewBase = max(Base, Modifier)` (raise the floor).     |
| `max_base`                                                | `NewBase = min(Base, Modifier)` (cap the ceiling).     |
| `set_base`                                                | `NewBase = Modifier`.                                  |
| `add_total_early`                                         | `NewTotal = Total + Modifier` (early in the total phase). |
| `multiply_total_additive`                                 | `NewTotal = Total + (Total * Modifier)`.               |
| `multiply_total_multiplicative` (aliases: `multiply_total`, `add_multiplied_total`) | `NewTotal = Total * (1 + Modifier)`.                   |
| `standard_multiply_total`                                 | `NewTotal = Total * Modifier`.                         |
| `standard_divide_total`                                   | `NewTotal = Total / Modifier`.                         |
| `min_total`                                               | `NewTotal = max(Total, Modifier)`.                     |
| `max_total`                                               | `NewTotal = min(Total, Modifier)`.                     |
| `set_total`                                               | `NewTotal = Modifier` — overrides everything before it. |
| `add_total_late`                                          | `NewTotal = Total + Modifier`, after everything else, `set_total` included. |

## Phases and ordering

Modifiers run in two phases: **base** first, then **total**. Within a phase, ordering follows the table above (top is earliest). When two modifiers share a phase and order, evaluation order is undefined — don't rely on it.

For resource operations (apoli:modify_resource, apoli:change_resource alias), the resource value plays the role of both `Base` and `Total` — i.e. the operations effectively reduce to a single-number transform.
