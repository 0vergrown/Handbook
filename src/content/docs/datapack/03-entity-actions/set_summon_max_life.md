---
title: "Set Summon Max Life (Entity Action Type)"
description: "Re-targets a summon's remaining lifetime."
navigation_title: "Set Summon Max Life"
aliases: ["set_summon_max_life_ticks"]
---

Re-targets a summon's remaining lifetime. Apply it **to the summon**. For example, through a summon action's `bientity_action`, or any entity-targeting action (selector, area of effect, …). Has no effect on entities that are not summons.

Type ID: `apoli:set_summon_max_life`
Alias: `apoli:set_summon_max_life_ticks`.

## Fields

| Field       | Type                   | Default    | Description                                                                                    |
|-------------|------------------------|------------|------------------------------------------------------------------------------------------------|
| `amount`    | [Integer](/docs/datapack/data-types/integer)    | —          | The new lifetime in ticks. `0` or less = permanent until killed.                               |
| `summon_id` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | If set, only summons whose `summon_id` matches are affected. If unset, any summon is affected. |

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

Spawns a minion and immediately makes it permanent by re-targeting its lifetime through the summon's `bientity_action`.
