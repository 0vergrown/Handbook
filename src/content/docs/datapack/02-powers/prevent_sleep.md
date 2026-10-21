---
title: "Prevent Sleep (Power Type)"
description: "Stops the player from sleeping and tells them why."
navigation_title: "Prevent Sleep"
---

Stops the player from sleeping and sends them a message saying why.

Type ID: `apoli:prevent_sleep`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `block_condition` | [Block Condition Type](/docs/datapack/block-conditions) | _optional_ | If set, sleep is only prevented when the bed block passes this condition. |
| `message` | Default Translatable [Text Component](/docs/datapack/data-types/text-component) | `{"translatable": "text.apoli.cannot_sleep"}` | The message shown when sleep is prevented. |
| `set_spawn_point` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Whether right-clicking the bed still sets the player's spawn point, as it does when you right-click a bed during the day. |
| `priority` | [Integer](/docs/datapack/data-types/integer) | `0` | When several of these powers stop the same bed, the one with the highest `priority` shows its message. The spawn point is only set if every one of them has `set_spawn_point` set to `true`. |

The bed is checked after the vanilla checks that come before setting a spawn point: the bed has to be close enough, not obstructed, and in a dimension where beds work. Past those, the power wins over the time of day and nearby monsters, so during the day the player sees this power's message instead of "You can only sleep at night".

## Examples

```json
{
    "type": "apoli:prevent_sleep",
	"message": "It's not hot enough for you to sleep",
    "condition": {
		"type": "apoli:on_fire",
		"inverted": true
	}
}
```

This stops the player from sleeping unless they are on fire.

```json
{
    "type": "apoli:prevent_sleep",
    "message": {
        "text": "The air down here is too thick to sleep. Find a bed at y 160 or higher.",
        "color": "red"
    },
    "block_condition": {
        "type": "apoli:height",
        "comparison": "<",
        "compare_to": 160
    }
}
```

This only lets the player sleep in a bed placed at Y 160 or higher. A bed lower down doesn't let them sleep and doesn't move their spawn point either.
