---
title: "Comparison (Data Type)"
description: "A String which specifies how two numbers should be compared."
navigation_title: "Comparison"
---

A [String](/docs/datapack/data-types/string) which specifies how two numbers should be compared. Usually the first number is provided by whatever condition you are in, and the second is specified in an accompanying `compare_to` field.

> On [apoli:resource](/docs/datapack/entity-conditions/resource), `compare_to` is not limited to a literal number — it accepts a full [Expression](/docs/datapack/data-types/expression), so you can compare a resource against another resource or against an entity stat. Every other `compare_to` field takes a plain number.

## Values

Value  | Description
-------|------
`<` | Checks if the first number is **less than** the second number.
`<=` | Checks if the first number is **less than or equal to** the second number.
`>` | Checks if the first number is **greater than** the second number.
`>=` | Checks if the first number is **greater than or equal to** the second number.
`==` | Checks if the first number is **equal to** the second number.
`!=` | Checks if the first number is **not equal to** the second number.

## Examples

```json
{
	"comparison": "=="
}
```

Equal to. There's not much to say about this.

```json
"condition": {
	"type": "apoli:xp_levels",
	"comparison": ">=",
	"compare_to": 3
}
```

A comparison used inside XP Levels (Entity Condition Type), which checks that the player is level 3 or higher.
