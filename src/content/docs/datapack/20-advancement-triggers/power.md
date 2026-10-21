---
title: "Power (Advancement Trigger)"
description: "Fires when a power is granted to the player."
navigation_title: "Power"
---

Fires as soon as a power is granted to the player, from any source: an origin, a skill tree, `/apoli:power grant`, a global power set or another power.

Trigger ID: `apoli:power`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `player` | Entity predicate | _optional_ | The usual vanilla player predicate. |
| `power` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | The power that was granted. Leave it out to match any power. |
| `source` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | The source it was granted from. Leave it out to match any source. |

## Example

```json
{
  "criteria": {
    "learned_to_fly": {
      "trigger": "apoli:power",
      "conditions": {
        "power": "example:flight"
      }
    }
  },
  "requirements": [["learned_to_fly"]]
}
```

This advancement is granted when the player gains `example:flight`.

## Notes

- It fires for the first source that grants a power. Granting the same power again from a different source doesn't fire again until the power has been fully revoked.
- A player who already holds the power when the advancement is added doesn't get it, because the trigger reacts to the grant itself and doesn't check what the player already has. Revoke and grant the power again, or use [apoli:power](/docs/datapack/entity-conditions/power) in a power's own condition instead.
