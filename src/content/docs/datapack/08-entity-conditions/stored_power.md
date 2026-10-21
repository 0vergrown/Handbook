---
title: "Stored Power (Entity Condition Type)"
description: "Checks what an entity is carrying in its apoli:power_storage."
navigation_title: "Stored Power"
---

Checks what an entity is carrying in its [`apoli:power_storage`](/docs/datapack/powers/power_storage). With no filters it asks whether anything is stored, and with `power` or `tags` it only counts matching entries. An entry whose power is no longer loaded isn't counted, so this agrees with the number [`apoli:resource`](/docs/datapack/entity-conditions/resource) reads from the same storage.

Type ID: `apoli:stored_power`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `storage` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | Only looks in this storage power. Leave it out to count across every one the entity has. |
| `power` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | Only counts this stored power. |
| `tags` | [String](/docs/datapack/data-types/string) or list | _optional_ | Only counts stored powers carrying one of these tags. |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | `>=` | How the number of matches is compared with `compare_to`. |
| `compare_to` | [Integer](/docs/datapack/data-types/integer) | `1` | The number to compare against. |

## Examples

Is a specific spell in the book?

```json
{
  "type": "apoli:stored_power",
  "storage": "example:spell_book",
  "power": "example:fireball"
}
```

Is the book full, with three or more spells?

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
