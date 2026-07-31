---
title: "Modify Resource (Entity Action Type)"
description: "Modifies the value of a Resource or Cooldown via an Attribute Modifier."
navigation_title: "Modify Resource"
aliases: ["change_resource", "origins:change_resource"]
---

Modifies the value of a [apoli:resource](/docs/datapack/powers/resource) or [apoli:cooldown](/docs/datapack/powers/cooldown) via an [Attribute Modifier](/docs/datapack/data-types/attribute-modifier).

Type ID: `apoli:modify_resource` (type-aliases: `apoli:change_resource`, `origins:change_resource` — the legacy `change`/`operation` fields are translated automatically)

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `resource` | [Identifier](/docs/datapack/data-types/identifier) | | The [apoli:resource](/docs/datapack/powers/resource) or [apoli:cooldown](/docs/datapack/powers/cooldown) power to modify. |
| `modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | | The modifier to apply to the current value of the target power. |

## Legacy field schema (Change Resource compat)

For back-compat with packs that target Apace's `apoli:change_resource`, this action also accepts the legacy field shape on the same id:

| Legacy field          | Translated into                         | Notes                          |
| --------------------- | --------------------------------------- | ------------------------------ |
| `change` (Integer)    | `modifier.value`                        | The numeric amount to add/set. |
| `operation` (`"add"`) | `modifier.operation` = `add_base_early` | The default.                   |
| `operation` (`"set"`) | `modifier.operation` = `set_base`       |                                |

If `modifier` is present in the JSON it wins; the legacy shim only fires when `modifier` is absent and at least one of `change` / `operation` is present. This means it's safe to migrate a pack file-by-file — both schemas coexist on the same type id.

## Examples

Add 1 to a resource (canonical):

```json
"entity_action": {
    "type": "apoli:modify_resource",
    "resource": "example:1st_resource",
    "modifier": { "operation": "add_base_early", "value": 1 }
}
```

Set the value of resource A to the current value of resource B (no nesting needed — `resource` on the inner modifier reads the source):

```json
"entity_action": {
    "type": "apoli:modify_resource",
    "resource": "example:1st_resource",
    "modifier": {
        "operation": "set_base",
        "resource": "example:2nd_resource"
    }
}
```

Increase a resource by an Expression that scales with the player's XP level:

```json
"entity_action": {
    "type": "apoli:modify_resource",
    "resource": "example:mana",
    "modifier": {
        "operation": "add_base_early",
        "value": "5 * xp_level"
    }
}
```

Legacy `apoli:change_resource` (or `origins:change_resource`) — still works unmodified:

```json
"entity_action": {
    "type": "apoli:change_resource",
    "resource": "namespace:example",
    "change": 1,
    "operation": "add"
}
```
