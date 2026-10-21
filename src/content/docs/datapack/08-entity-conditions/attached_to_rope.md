---
title: "Attached To Rope (Entity Condition Type)"
description: "Checks whether the entity is at one end of a rope, and optionally how many."
navigation_title: "Attached To Rope"
---

Checks whether the entity is at one end of any rope, and optionally how many. With no fields, it checks for any rope at all. A `slot` only counts ropes with that label, and `comparison` and `compare_to` let you test the number, for example whether both whips are out.

Type ID: `apoli:attached_to_rope`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `slot` | [String](/docs/datapack/data-types/string) | _optional_ | Only counts ropes with this label. Leave it out to count every rope the entity is an end of. |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | `">="` | How the rope count is compared with `compare_to`. |
| `compare_to` | [Integer](/docs/datapack/data-types/integer) | `1` | The number the rope count is compared with. |

## Examples

```json
{
    "type": "apoli:attached_to_rope"
}
```

This passes while the entity has at least one rope, using the default `>= 1`.

```json
{
    "type": "apoli:attached_to_rope",
    "comparison": ">=",
    "compare_to": 2
}
```

This passes once the entity has two or more ropes, which is useful to check that both whips are out before allowing a launch.
