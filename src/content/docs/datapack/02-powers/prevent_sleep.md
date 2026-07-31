---
title: "Prevent Sleep (Power Type)"
description: "Prevents sleeping and sends the player a message about why they can't sleep."
navigation_title: "Prevent Sleep"
---

Prevents sleeping and sends the player a message about why they can't sleep.

Type ID: `apoli:prevent_sleep`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`block_condition` | Block Condition Type | _optional_ | If specified, sleep will only be prevented if this condition is fulfilled by the bed block.
`message` | Default Translatable Text Component | `{"translatable": "text.apoli.cannot_sleep"}` | The message that will be shown when sleep is prevented this way.
`set_spawn_point` | Boolean | `false` | Determines whether the spawnpoint of the player is set upon right-clicking a bed while being prevented. (similar to what happens when you right-click a bed while it's daytime)
`priority` | Integer | `0` | Determines the priority of which power will prevent the player to sleep, set their spawn and display a message. The power with `set_spawn_point` set to `true` and the highest `priority` value will be prioritized.

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

This example will prevent the player from sleeping unless they are burning.
