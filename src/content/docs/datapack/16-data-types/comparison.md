---
title: "Comparison (Data Type)"
description: "A string that says how two numbers are compared, such as < or >=."
navigation_title: "Comparison"
---

A [String](/docs/datapack/data-types/string) that says how two numbers are compared. The first number usually comes from the condition it is in, and the second is given in a `compare_to` field next to it.

> [!NOTE]
> On [apoli:resource](/docs/datapack/entity-conditions/resource), `compare_to` isn't limited to a plain number. It accepts a full [Expression](/docs/datapack/data-types/expression), so you can compare a resource against another resource or against an entity stat. Every other `compare_to` field takes a plain number.

## Values

| Value | Description |
| --- | --- |
| `<` | Checks whether the first number is less than the second. |
| `<=` | Checks whether the first number is less than or equal to the second. |
| `>` | Checks whether the first number is greater than the second. |
| `>=` | Checks whether the first number is greater than or equal to the second. |
| `==` | Checks whether the first number is equal to the second. |
| `!=` | Checks whether the first number isn't equal to the second. |

## Examples

```json
{
	"comparison": "=="
}
```

This compares for equality.

```json
"condition": {
	"type": "apoli:xp_levels",
	"comparison": ">=",
	"compare_to": 3
}
```

A comparison inside an XP Levels entity condition, which checks that the player is level 3 or higher.
