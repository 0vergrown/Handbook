---
title: "Modify Resource (Entity Action Type)"
description: "Changes the value of a resource or cooldown with an attribute modifier."
navigation_title: "Modify Resource"
aliases: ["change_resource", "origins:change_resource"]
---

Changes the value of an [apoli:resource](/docs/datapack/powers/resource) or [apoli:cooldown](/docs/datapack/powers/cooldown) with an [Attribute Modifier](/docs/datapack/data-types/attribute-modifier).

Type ID: `apoli:modify_resource` (type aliases `apoli:change_resource` and `origins:change_resource`, whose legacy `change` and `operation` fields are translated automatically)

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `resource` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The [apoli:resource](/docs/datapack/powers/resource) or [apoli:cooldown](/docs/datapack/powers/cooldown) power to change. Any power with a built-in `cooldown` works too (see below). |
| `modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | `set_base` of `0` | The modifier applied to the power's current value. When `from` is set, only the modifier's `operation` is used, and the incoming value is the source slot. |
| `position` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | _optional_ | Which slot of a table resource to change. Leave it out on a table and every slot is changed. `index` and `slot` are accepted as aliases. |
| `from` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | Copies from this resource instead of working out a value from the modifier. `from_resource` is accepted as an alias. |
| `from_position` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | _optional_ | Which slot of `from` to read. `from_index` and `from_slot` are accepted as aliases. |

## Working on a table resource

When `resource` names an [apoli:resource](/docs/datapack/powers/resource) with a `size` above `1`:

| What you write | What happens |
| --- | --- |
| `position` set | only that slot changes |
| `position` left out | the modifier runs on every slot |

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

`position` is an [expression](/docs/datapack/data-types/expression), so the slot can be worked out when the action runs. `"position": "example:cursor"` writes wherever another resource points.

## Copying resources

`from` copies a value across instead of working one out:

```json
"entity_action": {
    "type": "apoli:modify_resource",
    "resource": "example:backup",
    "from": "example:live"
}
```

- With neither `position` nor `from_position`, the whole table is copied slot for slot, stopping at whichever of the two is shorter. On resources with one value, that is a plain copy of the value.
- With `from_position` only, that source slot is copied into the destination slot with the same number.
- With both, the copy goes from `from_position` to `position`.
- The modifier's `operation` still applies, so `add_base_early` adds the source value to the destination instead of overwriting it. The default is `set_base`, which is a straight copy.

> [!TIP]
> A copy of one slot can also be written as an [expression](/docs/datapack/data-types/expression): `{ "operation": "set_base", "value": "example:live[2]" }`. `from` exists because copying a whole table would otherwise need one action per slot.

## Modifying a power's cooldown

`resource` accepts any power type that has a `cooldown` field, as well as resource and cooldown powers. The value it reads and writes is the number of ticks left (`0` means ready). The full list is on the [apoli:resource condition](/docs/datapack/entity-conditions/resource) page. Writes are clamped between `0` and `cooldown`, so this is how a data pack shortens or clears an ability's cooldown:

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

To work with packs written for Apace's `apoli:change_resource`, this action also accepts the legacy field shape on the same ID:

| Legacy field | Translated into | Notes |
| --- | --- | --- |
| `change` (Integer) | `modifier.value` | The amount to add or set. |
| `operation` (`"add"`) | `modifier.operation` = `add_base_early` | The default. |
| `operation` (`"set"`) | `modifier.operation` = `set_base` | |

If `modifier` is present in the JSON, it wins. The translation only happens when `modifier` is absent and at least one of `change` and `operation` is present, so you can migrate a pack one file at a time while both shapes work on the same type ID.

## Examples

Add 1 to a resource:

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

Set resource A to the current value of resource B. No nesting is needed, because `resource` on the modifier reads the source:

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

Increase a resource by an expression that grows with the player's XP level:

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

The legacy `apoli:change_resource` (or `origins:change_resource`) shape works without changes:

```json
"entity_action": {
    "type": "apoli:change_resource",
    "resource": "namespace:example",
    "change": 1,
    "operation": "add"
}
```
