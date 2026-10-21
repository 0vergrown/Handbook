---
title: "String (Data Type)"
description: "A piece of text in quotation marks."
navigation_title: "String"
---

A piece of text. It has to be enclosed in quotation marks, and quotation marks inside the text itself must be escaped with a backslash (`\`).

## Examples

```json
{
	"field_name": "You should not sleep here!"
}
```

A plain piece of text.

```json
{
	"type": "apoli:execute_command",
	"command": "give @s minecraft:iron_axe{display:{Name:'{\"text\":\"Brutal Axe\", \"italic\": false}'}}"
}
```

A string holding a command, with escaped quotation marks inside it.
