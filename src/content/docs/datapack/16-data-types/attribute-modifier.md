---
title: "Attribute Modifier (Data Type)"
description: "An object that describes how one number is changed, used by attributes and resources alike."
navigation_title: "Attribute Modifier"
---

An [Object](/docs/datapack/data-types/object) that describes how one number is changed. Attribute powers (apoli:attribute) and resource operations (apoli:modify_resource and its apoli:change_resource alias) both use it, as one data type for both.

## One type for attributes and resources

Apace's Apoli has `AttributeModifier` for the `apoli:attribute` power and a separate `Modifier` for `apoli:modify_resource`, which differ only in whether the `attribute` field is required. Here they are one type with every field optional, and each power or action enforces the fields it needs.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `operation` | [Attribute Modifier Operation](/docs/datapack/data-types/attribute-modifier-operation) | _required_ | The operation this modifier performs. |
| `value` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `0` | The modifier value. `amount` is accepted as an alias. An expression is evaluated each time the modifier is applied. |
| `attribute` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | The vanilla attribute ID this modifier targets. apoli:attribute requires it, and apoli:modify_resource ignores it, since that targets a resource and not an attribute. |
| `name` | [String](/docs/datapack/data-types/string) | derived from the power ID | The vanilla AttributeModifier name, used to seed the modifier's UUID. |
| `resource` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | When set, the value of this resource (or cooldown) power is used as the modifier value instead of `value`. |
| `position` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | _optional_ | Which slot of `resource` to read, when it names a table [apoli:resource](/docs/datapack/powers/resource). Ignored without `resource`. `index` and `slot` are accepted as aliases. |
| `modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | A nested modifier applied to this modifier's own value before it acts, for example to scale a value that comes from a resource. |

## Where the input value comes from

When the modifier is applied to a current base or total, the value fed into the operation is worked out like this:

1. If `resource` is set, it starts from that resource's current value, or the value in slot `position` when one is given.
2. Otherwise, it evaluates `value` (a number or an expression).
3. If a nested `modifier` is set, it runs that modifier on the value from step 1 or 2 and uses the result.

This one rule covers both of Apace's separate forms, a resource as the value and a modifier of a modifier.

Inside a `value` expression, the `value` variable is the unmodified input the modifier chain is applied to: the current resource value in `apoli:modify_resource`, the attribute's base value in `apoli:attribute`, or the incoming amount in `modify_*` powers. So `"value": "value * 0.5"` with `"operation": "set_total"` halves whatever comes in. Every other [expression](/docs/datapack/data-types/expression) variable (`health`, `xp_level`, resource IDs and so on) is available too.

## Examples

Add 9 to a base value, inside `apoli:modify_resource`:

```json
"modifier": { "operation": "add_base_early", "value": 9 }
```

Multiply the current value by 2 additively, in the Apace style:

```json
"modifier": { "operation": "multiply_base_additive", "value": 2 }
```

Use another resource's value as the modifier value, so the input is the value of `example:resource`:

```json
"modifier": {
    "operation": "add_base_early",
    "resource": "example:resource"
}
```

A resource's value, scaled down to 0.001× with a nested modifier, in the style of Apace's nested modifier example:

```json
"modifier": {
    "operation": "add_base_early",
    "resource": "example:resource",
    "modifier": { "operation": "multiply_total_multiplicative", "value": -0.999 }
}
```

A vanilla attribute modifier, inside `apoli:attribute`:

```json
"modifier": {
    "attribute": "minecraft:generic.attack_damage",
    "operation": "addition",
    "value": 9
}
```

An expression value, for a max health bonus that grows with the player's current XP level:

```json
"modifier": {
    "attribute": "minecraft:generic.max_health",
    "operation": "addition",
    "value": "xp_level / 2"
}
```
