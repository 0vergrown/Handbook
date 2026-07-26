---
title: "Attribute Modifier"
description: "An Object describing how a single numerical value should be modified."
---

An [Object](/docs/datapack/data-types/object) describing how a single numerical value should be modified. Used by both vanilla-attribute powers (apoli:attribute) and by resource operations (apoli:modify_resource, apoli:change_resource alias). One data type, both call sites.

## Why one type and not two

Apace's Apoli had `AttributeModifier` for the `apoli:attribute` power and a separate `Modifier` for `apoli:modify_resource`, which differed only in whether the `attribute` field was required. In this rewrite they're one type with all-optional fields — the consuming power/action enforces which fields are required for its own purposes.

## Fields

| Field       | Type                                        | Default               | Description                                                                                                                                                          |
| ----------- | ------------------------------------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `operation` | [Attribute Modifier Operation](/docs/datapack/data-types/attribute-modifier-operation)    |                       | The operation performed by this modifier.                                                                                                                            |
| `value`     | [Float](/docs/datapack/data-types/float) OR [Expression](/docs/datapack/data-types/expression) | `0`                   | The modifier value. _Also accepts the alias `amount`._ When an Expression, evaluated each time the modifier is applied.                                                                                 |
| `attribute` | [Identifier](/docs/datapack/data-types/identifier)                      | _optional_            | The vanilla attribute id this modifier targets. **Required** by apoli:attribute; ignored by apoli:modify_resource (since that targets a resource, not an attribute). |
| `name`      | [String](/docs/datapack/data-types/string)                          | derived from power id | The vanilla AttributeModifier name (used for the modifier's UUID seed).                                                                                              |
| `resource`  | [Identifier](/docs/datapack/data-types/identifier)                      | _optional_            | If set, use the value of this Resource (or Cooldown) power as the modifier value instead of `value`/`value`-as-Expression.                                           |
| `modifier`  | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier)              | _optional_            | A nested modifier applied to **the value of this modifier** before it acts. Lets you scale a resource-driven value, etc.                                             |

## Order of precedence for the input value

When the modifier is applied to a current base/total, the "modifier value" fed into the operation is computed as:

1. If `resource` is set, start with that resource's current value.
2. Otherwise, evaluate `value` (Float or Expression).
3. If `modifier` (nested) is set, run that modifier against the value from step 1 or 2 and use the result.

That single rule subsumes Apace's separate "resource-as-value" and "modifier-of-modifier" forms.

**Expression context:** inside a `value` Expression, the `value` variable is bound to the **unmodified input** the modifier chain is being applied to — the current resource value in `apoli:modify_resource`, the attribute's base value in `apoli:attribute`, or the incoming amount in `modify_*` powers. So `"value": "value * 0.5"` with `"operation": "set_total"` halves whatever comes in. All other [Expression](/docs/datapack/data-types/expression) variables (`health`, `xp_level`, resource ids, …) are available too.

## Examples

Add 9 to a base value (used inside `apoli:modify_resource`):

```json
"modifier": { "operation": "add_base_early", "value": 9 }
```

Multiply current value by 2 additive (Apace-style):

```json
"modifier": { "operation": "multiply_base_additive", "value": 2 }
```

Use another resource's value as the modifier value (the input is the value of `example:resource`):

```json
"modifier": {
    "operation": "add_base_early",
    "resource": "example:resource"
}
```

Resource value, scaled down 0.001× via nested modifier (Apace-style nested modifier example):

```json
"modifier": {
    "operation": "add_base_early",
    "resource": "example:resource",
    "modifier": { "operation": "multiply_total_multiplicative", "value": -0.999 }
}
```

Vanilla attribute apply (used inside `apoli:attribute`):

```json
"modifier": {
    "attribute": "minecraft:generic.attack_damage",
    "operation": "addition",
    "value": 9
}
```

Expression value (a max-health bonus that scales with the player's current XP level):

```json
"modifier": {
    "attribute": "minecraft:generic.max_health",
    "operation": "addition",
    "value": "xp_level / 2"
}
```

## See also

- [Attribute Modifier Operation](/docs/datapack/data-types/attribute-modifier-operation) — the operation table.
- [Expression](/docs/datapack/data-types/expression) — what `value` accepts in addition to Float.
- [apoli:modify_resource](/docs/datapack/entity-actions/modify_resource) — the primary action that consumes this data type for resources.
- [apoli:attribute](/docs/datapack/powers/attribute) — the power that consumes it for vanilla attributes.

