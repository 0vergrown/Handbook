---
title: "Print (Entity Action Type)"
description: "Writes a line to the server log, and optionally to the entity's chat."
navigation_title: "Print"
aliases: ["log", "logger"]
---

Writes a line to the server log, and optionally to the entity's chat. It is a debugging tool: drop it into an action list to see whether that branch ran and what a value came out as.

Type ID: `apoli:print`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `text` | [Text Component](/docs/datapack/data-types/text-component) | _optional_ | Text to print. A plain string works, and so does a full text component with colour, a translation or a keybind. |
| `number` | [Expression](/docs/datapack/data-types/expression) | _optional_ | A number to print, written as a number or as an expression that is evaluated against the entity every time the action runs. |
| `message_id` | [String](/docs/datapack/data-types/string) | `apoli/print` | The logger name the line is written under, so you can filter your prints out of the rest of the log. |
| `show_in_chat` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Whether the entity also gets the line in chat. Only players can see chat, so on any other entity this does nothing. |

With both `text` and `number`, the line reads `Text: <text> Number: <number>`. With only one of them, the line is just that value. With neither, the line is the `message_id`, which makes a bare `apoli:print` a marker that shows the action ran.

A `number` that lands on a whole value prints without a decimal point, so `5` and not `5.0`.

## Examples

```json
"entity_action": {
    "type": "apoli:print",
    "text": "on_hit fired"
}
```

A trace marker: every time the action list runs, `on_hit fired` appears in the log.

```json
"entity_action": {
    "type": "apoli:print",
    "message_id": "mypack/pollen",
    "text": "pollen level",
    "number": "resource('example:pollen')",
    "show_in_chat": true
}
```

This reads the resource every time the action runs and prints `Text: pollen level Number: 4`, both to the log under the `mypack/pollen` logger and to the player's chat.

> [!WARNING]
> The action costs nothing when nobody is listening. If `show_in_chat` is `false` and the logger's level excludes `INFO`, it returns before evaluating `number`. Take it out of powers that run every tick before you ship a pack, or it writes a log line every tick for every holder.
