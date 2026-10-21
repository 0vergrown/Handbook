---
title: "Change Resource (Entity Action Type)"
description: "Legacy action that changes the value of a resource or cooldown."
navigation_title: "Change Resource"
---

A legacy action that changes the value of an [apoli:resource](/docs/datapack/powers/resource) or [apoli:cooldown](/docs/datapack/powers/cooldown). Use [apoli:modify_resource](/docs/datapack/entity-actions/modify_resource) in new packs. This action is kept so older packs keep working.

Type ID: `apoli:change_resource` (`origins:change_resource` is accepted too). Both are read as `apoli:modify_resource`.

## Legacy packs

Many existing data packs written for Apace's Apoli use `origins:change_resource` with its old field shape, so this Apoli reads both names.

`apoli:change_resource` is a type alias of `apoli:modify_resource`, and its `change` and `operation` fields are translated into a `modifier` when the pack loads. Old packs don't need updating.

## Fields (legacy schema)

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `resource` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The resource or cooldown power to change. |
| `change` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | _required_ | The amount. The result never goes past the resource's `min` or `max` while `enforce_limits` is on. An expression is evaluated each time the action runs, with `value` bound to the resource's current value. |
| `operation` | [String](/docs/datapack/data-types/string) (`"add"` or `"set"`) | `"add"` | `"add"` becomes `add_base_early` and `"set"` becomes `set_base`. |

## Examples

```json
"entity_action": {
    "type": "apoli:change_resource",
    "resource": "namespace:example",
    "change": 1
}
```

This adds 1 to the `namespace:example` [apoli:resource](/docs/datapack/powers/resource) (`data/namespace/powers/example.json`).

`change` also accepts an [Expression](/docs/datapack/data-types/expression):

```json
"entity_action": {
    "type": "apoli:change_resource",
    "resource": "namespace:example",
    "change": "namespace:example_max / 10",
    "operation": "add"
}
```

This tops the resource up by a tenth of its own maximum. `value` is bound to the resource's current value, and `<id>_max` and `<id>_min` read any resource's limits.
