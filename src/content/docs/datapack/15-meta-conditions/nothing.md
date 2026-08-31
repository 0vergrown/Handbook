---
title: "Nothing (Meta Condition Type)"
description: Tests nothing, and always passes.
navigation_title: "Nothing"
---

Tests nothing, and therefore always passes. It is the condition half of [`apoli:nothing`](/docs/datapack/meta-actions/nothing) — a way to write "no condition here" in a field that requires one.

Type ID: `apoli:nothing`

It is a meta type, so it is available wherever a condition is: entity, bi-entity, block, item, damage, fluid and biome conditions all accept it. Use [`apoli:constant`](/docs/datapack/meta-conditions/constant) instead when you want to pick the answer, since `apoli:nothing` is always `true`.

## Fields

_None._

## Examples

```json
"condition": {
  "type": "apoli:nothing"
}
```

As the placeholder branch of an [`apoli:if_case`](/docs/datapack/meta-actions/if_case) chain, where the last case should always be reached:

```json
{
  "type": "apoli:if_case",
  "cases": [
    {
      "condition": { "type": "apoli:on_fire" },
      "action": { "type": "apoli:extinguish" }
    },
    {
      "condition": { "type": "apoli:nothing" },
      "action": { "type": "apoli:set_on_fire", "duration": 40 }
    }
  ]
}
```

> `inverted: true` works here like it does on any condition, so `{"type": "apoli:nothing", "inverted": true}` never passes.
