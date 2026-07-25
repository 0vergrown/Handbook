<!--
  TEMPLATE: a power type page. Copy to src/content/docs/datapack/02-powers/NN-NAME.md
  Replace every UPPER_SNAKE placeholder and delete these comments.
  Source of truth: power/PowerTypes.java (id -> class) and power/builtin/CLASSPower.java (configCodec).
-->
---
title: apoli:TYPE_ID
description: ONE LINE, PLAIN, SAYING WHAT THIS POWER DOES.
---

<!-- One or two sentences. What does having this power do? No "in this article". -->
ONE OR TWO SENTENCES DESCRIBING THE POWER.

## Fields

<!-- List EVERY field from the configCodec. optionalFieldOf("x", d) -> optional, default d. fieldOf("x") -> required, default "—". Link nested types. -->

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `FIELD_A` | TYPE | DEFAULT | WHAT IT DOES. |
| `FIELD_B` | [DATA_TYPE](/docs/datapack/data-types/DATA_TYPE) | DEFAULT | WHAT IT DOES. |

<!-- The five shared power fields (type, name, description, condition, hidden) are documented once on the Powers overview — don't repeat them unless this power treats one specially. -->

## Example

<!-- A real, working power a reader can paste into a data pack. -->

```json
{
  "type": "apoli:TYPE_ID",
  "name": "EXAMPLE NAME",
  "FIELD_A": EXAMPLE_VALUE
}
```

EXPLAIN WHAT THE EXAMPLE DOES IN ONE LINE.

<!-- Optional: a second example showing a common variation, or a > blockquote for a gotcha / performance note. -->

## See also

- [RELATED_PAGE_TITLE](/docs/datapack/powers/RELATED)
- [Powers overview](/docs/datapack/powers/overview)
