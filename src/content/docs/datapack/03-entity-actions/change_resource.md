---
title: "Change Resource (Entity Action Type)"
description: "Legacy action that changes the value of a Resource or Cooldown."
navigation_title: "Change Resource"
---

Legacy action that changes the value of a [apoli:resource](/docs/datapack/powers/resource) or [apoli:cooldown](/docs/datapack/powers/cooldown). **Use [apoli:modify_resource](/docs/datapack/entity-actions/modify_resource) for new packs** — Change Resource is preserved only for back-compat.

Type ID: `apoli:change_resource` (also accepted: `origins:change_resource`, both alias to `apoli:modify_resource` under the hood)

## Why this page still exists

In Apace's Apoli, `origins:change_resource` came first; `apoli:modify_resource` was added later as a richer replacement. Many existing data packs cite the old name and the old field shape, so this rewrite recognizes both.

The runtime treats `apoli:change_resource` as a type-alias of `apoli:modify_resource` AND auto-translates the `change` / `operation` fields into a synthesized `modifier`. You don't have to update old packs — they just keep working.

## Fields (legacy schema, still accepted)

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `resource` | [Identifier](/docs/datapack/data-types/identifier) | | The target Resource/Cooldown power. |
| `change` | [Integer](/docs/datapack/data-types/integer) OR [Expression](/docs/datapack/data-types/expression) | | The amount; never exceeds the resource's `min`/`max` when `enforce_limits` is true. As an Expression it is evaluated each time the action runs, with `value` bound to the resource's current value. |
| `operation` | [String](/docs/datapack/data-types/string) — `"add"` or `"set"` | `"add"` | `"add"` translates to `add_base_early`; `"set"` translates to `set_base`. |

## Example (kept verbatim from Apace's docs — still valid)

```json
"entity_action": {
    "type": "apoli:change_resource",
    "resource": "namespace:example",
    "change": 1
}
```

This adds 1 to the `namespace:example` (`data/namespace/powers/example.json`) [apoli:resource](/docs/datapack/powers/resource).

`change` also accepts an [Expression](/docs/datapack/data-types/expression):

```json
"entity_action": {
    "type": "apoli:change_resource",
    "resource": "namespace:example",
    "change": "namespace:example_max / 10",
    "operation": "add"
}
```

This tops the resource up by a tenth of its own maximum. `value` is bound to the resource's current value, and `<id>_max` / `<id>_min` read any resource's bounds.
