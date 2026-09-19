---
title: "Resource (Advancement Trigger)"
description: "Fires when a resource or cooldown the player holds changes value."
navigation_title: "Resource"
---

Fires every time a [resource](/docs/datapack/powers/resource) or [cooldown](/docs/datapack/powers/cooldown) the player holds is written to, carrying the value it landed on.

Trigger ID: `apoli:resource`

## Fields

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `player` | Entity predicate | _optional_ | The usual vanilla player predicate. |
| `resource` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | The resource power that changed. Omit it to match any of them. |
| `value` | Int range | any | Bounds the value must land inside, as vanilla's `{"min": x, "max": y}` — a bare number means exactly that value. |

## Example

```json
{
  "criteria": {
    "full_mana": {
      "trigger": "apoli:resource",
      "conditions": {
        "resource": "example:mana",
        "value": { "min": 100 }
      }
    }
  },
  "requirements": [["full_mana"]]
}
```

An advancement for spending everything you had:

```json
{
  "criteria": {
    "ran_dry": {
      "trigger": "apoli:resource",
      "conditions": {
        "resource": "example:mana",
        "value": 0
      }
    }
  },
  "requirements": [["ran_dry"]]
}
```

## Notes

- It fires on a **write**, which is what [apoli:modify_resource](/docs/datapack/entity-actions/modify_resource), `/apoli:resource set` and a resource power's own recharge all do. A cooldown counting itself down tick by tick is not a write and does not fire.
- The value reported is the one actually stored, after the resource's `min`/`max` clamp and after any [apoli:modify_resource_change](/docs/datapack/powers/modify_resource_change).
