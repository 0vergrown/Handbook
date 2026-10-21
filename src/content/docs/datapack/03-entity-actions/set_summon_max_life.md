---
title: "Set Summon Max Life (Entity Action Type)"
description: "Changes how long a summon has left to live."
navigation_title: "Set Summon Max Life"
aliases: ["set_summon_max_life_ticks"]
---

Changes how long a summon has left to live. Apply it to the summon, for example through a summon action's `bientity_action` or any action that targets entities (a selector, an area of effect and so on). It has no effect on entities that aren't summons.

Type ID: `apoli:set_summon_max_life` (alias `apoli:set_summon_max_life_ticks`)

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `amount` | [Integer](/docs/datapack/data-types/integer) | _required_ | The new lifetime in ticks. `0` or less makes the summon permanent until it is killed. |
| `summon_id` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | Only affects summons whose `summon_id` matches. Leave it out to affect any summon. |

## Examples

```json
"entity_action": {
    "type": "apoli:summon_minion",
    "max_life_ticks": 200,
    "bientity_action": {
        "type": "apoli:target_action",
        "action": {
            "type": "apoli:set_summon_max_life",
            "amount": 0
        }
    }
}
```

This spawns a minion and immediately makes it permanent by changing its lifetime through the summon's `bientity_action`.
