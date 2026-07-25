<!--
  TEMPLATE: a condition page (or one condition within a flavour's page).
  Copy to src/content/docs/datapack/04-conditions/NN-NAME.md
  Source of truth: condition/builtin/FLAVOUR/*Conditions.java and each condition's codec().
  FLAVOUR is one of: entity, bientity, block, item, damage, biome, fluid, meta.
-->
---
title: apoli:CONDITION_ID
description: ONE LINE SAYING WHAT THIS CONDITION TESTS FOR.
---

<!-- One or two sentences. What question does this ask? True when...? -->
Passes when CONDITION. This is a **FLAVOUR condition**.

## Fields

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `FIELD_A` | TYPE | DEFAULT | WHAT IT DOES. |

<!-- Comparison-style conditions take `comparison` + `compare_to`; document those here. -->

## Example

```json
{
  "type": "apoli:CONDITION_ID",
  "FIELD_A": EXAMPLE_VALUE
}
```

EXPLAIN THE EXAMPLE IN ONE LINE.

<!-- Remember: any condition can be inverted with "inverted": true — don't add a separate "not_x". -->

## See also

- [FLAVOUR conditions](/docs/datapack/conditions/FLAVOUR-conditions)
- [Conditions overview](/docs/datapack/conditions/overview)
