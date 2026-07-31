<!--
  TEMPLATE: an action page (or one action within a flavour's page).
  Copy to src/content/docs/datapack/03-actions/NN-NAME.md
  Source of truth: action/builtin/FLAVOUR/*Actions.java (registration) and each action's codec().
  FLAVOUR is one of: entity, bientity, block, item, meta.
-->
---
title: apoli:ACTION_ID
description: ONE LINE SAYING WHAT HAPPENS WHEN THIS ACTION RUNS.
---

<!-- One or two sentences. What does this action DO, and what does it act on? -->
ONE OR TWO SENTENCES. This is a **FLAVOUR action** — it goes in a `FLAVOUR_action` field.

## Fields

| Field     | Type | Default | Purpose       |
|-----------|------|---------|---------------|
| `FIELD_A` | TYPE | DEFAULT | WHAT IT DOES. |

<!-- If the action takes no config, say so: "This action has no fields." -->

## Example

```json
{
  "type": "apoli:ACTION_ID",
  "FIELD_A": EXAMPLE_VALUE
}
```

EXPLAIN THE EXAMPLE IN ONE LINE.

<!-- Optional: show it fired from a power, e.g. inside an action_on_hit's bientity_action. -->
