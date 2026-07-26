<!--
  TEMPLATE: a data type page (a reusable value shape used by fields).
  Copy to src/content/docs/datapack/05-data-types/NN-NAME.md
  Source of truth: data/*.java (the record + its CODEC).
-->
---
title: DATA_TYPE_NAME
description: ONE LINE SAYING WHAT THIS VALUE SHAPE IS AND WHERE IT'S USED.
---

<!-- One or two sentences. What is it, and which power/action/condition fields expect it? -->
ONE OR TWO SENTENCES. Used by [WHO_USES_IT](/docs/datapack/powers/WHO_USES_IT).

## Fields

| Field     | Type | Default | Purpose       |
|-----------|------|---------|---------------|
| `FIELD_A` | TYPE | DEFAULT | WHAT IT DOES. |

## Example

```json
{
  "FIELD_A": EXAMPLE_VALUE,
  "FIELD_B": EXAMPLE_VALUE
}
```

EXPLAIN THE EXAMPLE IN ONE LINE.

<!-- If the type accepts "single or list" forms, or has legacy aliases, document them in their own short section. -->

## See also

- [WHO_USES_IT](/docs/datapack/powers/WHO_USES_IT)
- [Data types overview](/docs/datapack/data-types/overview)
