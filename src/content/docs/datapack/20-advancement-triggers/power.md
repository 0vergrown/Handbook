---
title: "Power (Advancement Trigger)"
description: "Fires when a power is granted to the player."
navigation_title: "Power"
---

Fires the moment a power is granted to the player, from any source — an origin, a skill tree, `/apoli:power grant`, a global power set or another power.

Trigger ID: `apoli:power`

## Fields

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `player` | Entity predicate | _optional_ | The usual vanilla player predicate. |
| `power` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | The power that was granted. Omit it to match any power. |
| `source` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | The source it was granted from. Omit it to match any source. |

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

## Notes

- It fires on the **first** source to grant a power. Granting the same power a second time from a different source does not fire again until it has been fully revoked.
- A player who already holds the power when the advancement is added will not have it granted retroactively — the trigger is an event, not a state check. Revoke and re-grant, or use [apoli:power](/docs/datapack/entity-conditions/power) in a power's own condition instead.
