---
title: "Resource (Advancement Trigger)"
description: "Fires when a resource or cooldown the player holds changes value."
navigation_title: "Resource"
---

Fires every time a [resource](/docs/datapack/powers/resource) or [cooldown](/docs/datapack/powers/cooldown) the player holds is written to, with the value it ended up at.

Trigger ID: `apoli:resource`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `player` | Entity predicate | _optional_ | The usual vanilla player predicate. |
| `resource` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | The resource power that changed. Leave it out to match any of them. |
| `value` | Int range | _any_ | Bounds the value must land inside, written like vanilla's `{"min": x, "max": y}`. A plain number means exactly that value. |

## Examples

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

This advancement is granted when `example:mana` reaches 100 or more.

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

This one is granted for spending everything, when `example:mana` lands on 0.

## Notes

- It fires on a write, which is what [apoli:modify_resource](/docs/datapack/entity-actions/modify_resource), `/apoli:resource set` and a resource power's own recharge all do. A cooldown counting itself down tick by tick isn't a write and doesn't fire it.
- The value reported is the one actually stored, after the resource's `min` and `max` clamp and after any [apoli:modify_resource_change](/docs/datapack/powers/modify_resource_change).
