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
| `resource` | [Identifier](/docs/datapack/data-types/identifier) | | The [apoli:resource](/docs/datapack/powers/resource) or [apoli:cooldown](/docs/datapack/powers/cooldown) power to modify. Any power with a built-in `cooldown` also works — see below. |
| `modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | `set_base` of `0` | The modifier to apply to the current value of the target power. When `from` is set, only the modifier's `operation` is used, and the incoming value is the source slot. |
| `position` | [Integer](/docs/datapack/data-types/integer) OR [Expression](/docs/datapack/data-types/expression) | _optional_ | Which slot of a table resource to modify. Omit it on a table and **every** slot is modified. Also aliased as `index` and `slot`. |
| `from` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | Copy from this resource instead of computing a value from the modifier. Also aliased as `from_resource`. |
| `from_position` | [Integer](/docs/datapack/data-types/integer) OR [Expression](/docs/datapack/data-types/expression) | _optional_ | Which slot of `from` to read. Also aliased as `from_index` and `from_slot`. |

## Working on a table resource

When `resource` names a [apoli:resource](/docs/datapack/powers/resource) with a `size` above `1`:

| What you write | What happens |
| --- | --- |
| `position` set | only that slot is modified |
| `position` omitted | the modifier runs on **every** slot |

```json
"entity_action": {
  "type": "apoli:modify_resource",
  "resource": "example:table",
  "position": 2,
  "modifier": {
    "operation": "set_base",
    "value": 5
  }
}
```

`position` is an [Expression](/docs/datapack/data-types/expression), so the slot can be computed at run time — `"position": "example:cursor"` writes wherever another resource points.

## Copying resources

`from` copies a value across instead of computing one:

```json
"entity_action": {
    "type": "apoli:modify_resource",
    "resource": "example:backup",
    "from": "example:live"
}
```

- With neither `position` nor `from_position`, the **whole table** is copied slot for slot (stopping at whichever of the two is shorter). On scalar resources that is a plain copy of the single value.
- With `from_position` only, that source slot is copied into the same-numbered destination slot.
- With both, the copy goes from `from_position` to `position`.
- The modifier's `operation` still applies, so `add_base_early` adds the source value into the destination instead of overwriting it. The default is `set_base` — a straight copy.

> A single-slot copy is also expressible as an [Expression](/docs/datapack/data-types/expression) — `{ "operation": "set_base", "value": "example:live[2]" }`. `from` exists because a whole-table copy would otherwise need one action per slot.

## Modifying a power's cooldown

`resource` accepts any power type that carries a `cooldown` field, not just Resource and Cooldown powers — the value it reads and writes is the **remaining ticks** (`0` = ready). The full list is on the [apoli:resource condition](/docs/datapack/entity-conditions/resource) page. Writes are clamped to `0 … cooldown`, so this is how a data pack shortens or clears an ability's cooldown:

```json
"entity_action": {
  "type": "apoli:modify_resource",
  "resource": "example:dash",
  "modifier": {
    "operation": "set_base",
    "value": 0
  }
}
```

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
  "modifier": {
    "operation": "add_base_early",
    "value": 1
  }
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
