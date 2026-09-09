---
title: "Stored Power (Entity Condition Type)"
description: "Checks what an entity is carrying in its apoli:power_storage."
navigation_title: "Stored Power"
---

Checks what an entity is carrying in its [`apoli:power_storage`](/docs/datapack/powers/power_storage). With no filters it is simply "is anything stored?"; with `power` or `tags` it counts only matching entries.

Type ID: `apoli:stored_power`

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`storage` | [Identifier](/docs/datapack/data-types/identifier) | *optional* | Only look in this storage power. Omit to count across every one the entity has.
`power` | [Identifier](/docs/datapack/data-types/identifier) | *optional* | Only count this stored power.
`tags` | [String](/docs/datapack/data-types/string) or list | *optional* | Only count stored powers carrying one of these tags.
`comparison` | [Comparison](/docs/datapack/data-types/comparison) | `>=` | How to compare the number of matches against `compare_to`.
`compare_to` | [Integer](/docs/datapack/data-types/integer) | `1` | The number to compare against.

## Examples

Is a specific spell in the book?

```json
{
  "type": "apoli:stored_power",
  "storage": "example:spell_book",
  "power": "example:fireball"
}
```

Is the book full — three or more spells?

```json
{
  "type": "apoli:stored_power",
  "storage": "example:spell_book",
  "comparison": ">=",
  "compare_to": 3
}
```

Is the book empty?

```json
{
  "type": "apoli:stored_power",
  "comparison": "==",
  "compare_to": 0
}
```
