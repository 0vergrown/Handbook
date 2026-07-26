---
title: "apoli:attached_to_rope"
description: "Checks whether the entity is an end of some rope, and optionally how many."
---

Checks whether the entity is an end of some rope, and optionally how many. With no fields it is simply "attached to any rope". A `slot` narrows the count to ropes with that label, and `comparison`/`compare_to` let you gate on the number — e.g. "are both whips out?".

Type ID: `apoli:attached_to_rope`
## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`slot` | String | _optional_ | Only count ropes with this label. If omitted, all ropes the entity is an end of are counted.
`comparison` | [Comparison](/docs/datapack/data-types/comparison) | `">="` | How the rope count is compared against `compare_to`.
`compare_to` | [Integer](/docs/datapack/data-types/integer) | `1` | The number the rope count is compared against.

## Examples
```json
{
    "type": "apoli:attached_to_rope"
}
```
True while the entity has at least one rope (the default `>= 1`).

```json
{
    "type": "apoli:attached_to_rope",
    "comparison": ">=",
    "compare_to": 2
}
```
True once the entity has two or more ropes — useful to detect that both whips are deployed before allowing a launch.

