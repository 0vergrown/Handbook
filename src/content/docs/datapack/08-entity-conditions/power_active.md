---
title: "Power Active (Entity Condition Type)"
description: "Checks whether a power, or any power carrying one of the given tags, is active: held, not suppressed, its condition met and toggled on."
navigation_title: "Power Active"
---

Checks whether a power is active, meaning the entity has it and all of its conditions pass. With `tags`, it checks whether any power carrying one of the given [tags](/docs/datapack/introduction/powers#tagging-powers) is active.

Type ID: `apoli:power_active`

A power is active when the entity holds it, it isn't suppressed, its `condition` passes, and, for an [apoli:toggle](/docs/datapack/powers/toggle) power, it is switched on.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `power` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | The ID of the power to check. |
| `tags` | [String](/docs/datapack/data-types/string) or [Array](/docs/datapack/data-types/array) of Strings | _optional_ | Passes if any power the entity holds that carries one of these tags is active. |

Give `power`, `tags` or both. A condition with neither fails to load, and the log names the power it is in. With both, the condition passes when either one is active.

> [!WARNING]
> Don't put a tag check in the `condition` of a power that carries the same tag. Whether that power is active would then depend on itself, which has no clear answer. Apoli stops the loop instead of crashing, but the result means nothing. Give the checking power a different tag, or none.

## Examples

```json
"condition": {
    "type": "apoli:power_active",
    "power": "origins:phantomize"
}
```

This checks whether the [`origins:phantomize`](https://github.com/apace100/origins-fabric/blob/master/src/main/resources/data/origins/powers/phantomize.json) power is toggled on.

```json
{
    "type": "apoli:attribute",
    "condition": {
        "type": "apoli:power_active",
        "tags": "example.stance",
        "inverted": true
    },
    "modifier": {
        "attribute": "minecraft:generic.movement_speed",
        "value": 0.1,
        "operation": "multiply_base_additive"
    }
}
```

This power gives a small speed boost only while none of the entity's `example.stance` powers is active. A new stance power only needs the tag to count.
