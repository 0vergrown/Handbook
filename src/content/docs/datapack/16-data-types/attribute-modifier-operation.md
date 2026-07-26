---
title: "Attribute Modifier Operation"
description: "A String used to specify the operation in an Attribute Modifier."
---

A [String](/docs/datapack/data-types/string) used to specify the operation in an [Attribute Modifier](/docs/datapack/data-types/attribute-modifier).

> The listed values are ordered by application priority — `add_base_early` (and its `addition` alias) runs first, `set_total` runs last.

## Quick map: vanilla ↔ Apoli

The three "short" operation names from vanilla Minecraft and the long-named Apoli equivalents are interchangeable. Use whichever reads better in your pack.

| Short (vanilla / Apace alias) | Canonical (Apoli rewrite) |
|-------------------------------|---------------------------|
| `addition`                    | `add_base_early`          |
| `multiply_base`               | `multiply_base_additive`  |
| `multiply_total`              | `multiply_total_multiplicative` |

## Values

| Value                                                     | Description                                            |
| --------------------------------------------------------- | ------------------------------------------------------ |
| `add_base_early` (alias: `addition`)                      | `NewBase = Base + Modifier` (early in the base phase). |
| `multiply_base_additive` (alias: `multiply_base`)         | `NewBase = Base + (Base * Modifier)`.                  |
| `multiply_base_multiplicative`                            | `NewBase = Base * (1 + Modifier)`.                     |
| `standard_multiply_base`                                  | `NewBase = Base * Modifier`.                           |
| `standard_divide_base`                                    | `NewBase = Base / Modifier`.                           |
| `add_base_late`                                           | `NewBase = Base + Modifier` (late in the base phase).  |
| `min_base`                                                | `NewBase = max(Base, Modifier)` (raise the floor).     |
| `max_base`                                                | `NewBase = min(Base, Modifier)` (cap the ceiling).     |
| `set_base`                                                | `NewBase = Modifier`.                                  |
| `multiply_total_additive`                                 | `NewTotal = Total * (Total * Modifier)`.               |
| `multiply_total_multiplicative` (alias: `multiply_total`) | `NewTotal = Total * (1 + Modifier)`.                   |
| `standard_multiply_total`                                 | `NewTotal = Total * Modifier`.                         |
| `standard_divide_total`                                   | `NewTotal = Total / Modifier`.                         |
| `min_total`                                               | `NewTotal = max(Total, Modifier)`.                     |
| `max_total`                                               | `NewTotal = min(Total, Modifier)`.                     |
| `set_total`                                               | `NewTotal = Modifier` (last, overrides everything).    |

## Phases and ordering

Modifiers run in two phases: **base** first, then **total**. Within a phase, ordering follows the table above (top is earliest). When two modifiers share a phase and order, evaluation order is undefined — don't rely on it.

For resource operations (apoli:modify_resource, apoli:change_resource alias), the resource value plays the role of both `Base` and `Total` — i.e. the operations effectively reduce to a single-number transform.

