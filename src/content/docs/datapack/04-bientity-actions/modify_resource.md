---
title: "Modify Resource (Bi-Entity Action Type)"
description: "Modifies a resource on one side of a bi-entity pair, optionally reading the incoming value from the other side."
navigation_title: "Modify Resource"
aliases: ["change_resource", "origins:change_resource"]
---

Modifies a [apoli:resource](/docs/datapack/powers/resource) or [apoli:cooldown](/docs/datapack/powers/cooldown) on one side of a bi-entity pair, and can take the incoming value from the resource of the *other* side — the part that the entity-action [apoli:modify_resource](/docs/datapack/entity-actions/modify_resource) cannot do on its own.

Type ID: `apoli:modify_resource` (type-aliases: `apoli:change_resource`, `origins:change_resource`)

Every field of the [entity action](/docs/datapack/entity-actions/modify_resource) — `resource`, `modifier`, `position`, `from`, `from_position` — works here unchanged. Two fields choose which entity each half applies to.

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `side` | String | `"target"` | Whose resource is written: `"actor"` or `"target"`. Also aliased as `recipient`. |
| `from_side` | String | the opposite of `side` | Whose resource `from` reads. Also aliased as `from_entity`. Only meaningful together with `from`. |
| `resource` | [Identifier](/docs/datapack/data-types/identifier) | | The resource or cooldown power to modify on `side`. |
| `modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | `set_base` of `0` | Applied to the current value. With `from` set, only its `operation` is used and the incoming value is the source slot. |
| `position` | [Integer](/docs/datapack/data-types/integer) OR [Expression](/docs/datapack/data-types/expression) | *optional* | Which slot of a table resource to write. Omit it on a table and every slot is written. |
| `from` | [Identifier](/docs/datapack/data-types/identifier) | *optional* | Read the incoming value from this resource on `from_side`. |
| `from_position` | [Integer](/docs/datapack/data-types/integer) OR [Expression](/docs/datapack/data-types/expression) | *optional* | Which slot of `from` to read. |

## Examples

```json
"bientity_action": {
  "type": "apoli:modify_resource",
  "side": "target",
  "resource": "example:mana",
  "modifier": {
    "operation": "add_base_early",
    "value": -5
  }
}
```

Drains five mana from the target. With no `from`, this is the same as wrapping the entity action in [apoli:target_action](/docs/datapack/bientity-actions/target_action) — reach for the wrapper when that is all you need.

```json
"bientity_action": {
  "type": "apoli:modify_resource",
  "side": "actor",
  "resource": "example:stolen_charge",
  "from": "example:mana",
  "modifier": {
    "operation": "add_base_early"
  }
}
```

Adds the **target's** current `example:mana` onto the **actor's** `example:stolen_charge`. `from_side` defaults to the opposite of `side`, so the read comes from the target without being spelled out. Set it explicitly when both halves should come from the same entity.
