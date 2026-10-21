---
title: "Modify Resource (Bi-Entity Action Type)"
description: "Changes a resource on one side of a bi-entity pair, optionally reading the value from the other side."
navigation_title: "Modify Resource"
aliases: ["change_resource", "origins:change_resource"]
---

Changes an [apoli:resource](/docs/datapack/powers/resource) or [apoli:cooldown](/docs/datapack/powers/cooldown) on one side of a bi-entity pair. It can take the incoming value from a resource on the other side, which the entity action [apoli:modify_resource](/docs/datapack/entity-actions/modify_resource) can't do on its own.

Type ID: `apoli:modify_resource` (type aliases `apoli:change_resource` and `origins:change_resource`)

Every field of the [entity action](/docs/datapack/entity-actions/modify_resource) (`resource`, `modifier`, `position`, `from` and `from_position`) works here unchanged. Two more fields choose which entity each half applies to.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `side` | [String](/docs/datapack/data-types/string) | `"target"` | Whose resource is written: `"actor"` or `"target"`. `recipient` is accepted as an alias. |
| `from_side` | [String](/docs/datapack/data-types/string) | the opposite of `side` | Whose resource `from` reads. `from_entity` is accepted as an alias. It only matters together with `from`. |
| `resource` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The resource or cooldown power to change on `side`. |
| `modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | `set_base` of `0` | Applied to the current value. With `from` set, only its `operation` is used and the incoming value is the source slot. |
| `position` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | _optional_ | Which slot of a table resource to write. Leave it out on a table and every slot is written. |
| `from` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | Reads the incoming value from this resource on `from_side`. |
| `from_position` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | _optional_ | Which slot of `from` to read. |

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

This drains five mana from the target. With no `from`, it is the same as wrapping the entity action in [apoli:target_action](/docs/datapack/bientity-actions/target_action), so use the wrapper when that is all you need.

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

This adds the target's current `example:mana` to the actor's `example:stolen_charge`. `from_side` defaults to the opposite of `side`, so the read comes from the target without being written out. Set it yourself when both halves should come from the same entity.

## Reading the other side in `value`

`from_side` only decides where `from` reads. An expression in the modifier's `value` reads the entity on `side`, the one being written. To use a number from the other entity, name its side with `actor_resource(...)` or `target_resource(...)` (see [Expression](/docs/datapack/data-types/expression)):

```json
"bientity_action": {
    "type": "apoli:modify_resource",
    "side": "target",
    "resource": "example:minion_speed",
    "modifier": {
        "operation": "set_base",
        "value": "1 + actor_resource(example:haste_upgrade)"
    }
}
```

Run from the `bientity_action` of an [apoli:summon_minion](/docs/datapack/entity-actions/summon_minion), this copies the summoner's upgrade onto the new minion. A bare `example:haste_upgrade` would be read off the minion, which doesn't have it, and come out as `0`.
