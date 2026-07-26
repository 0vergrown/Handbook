---
title: "origins:resource"
description: "[Entity Condition Type](../entityconditiontypes.md)"
---

Entity Condition Type

Checks the value of a power that uses the [[apoli:resource](/docs/datapack/powers/resource)](/docs/datapack/entity-conditions/resource) or a power type that has a built-in cooldown (using remaining ticks as the value).

Type ID: `origins:resource`


## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`resource` | Identifier | | The namespace and ID of a power that will be evaluated.
`comparison` | Comparison | | Determines how the value of the specified power should be compared to the specified value.
`compare_to` | Integer | | The value at which the value of the specified power will be compared to.


## Examples

```json
"condition": {
    "type": "origins:resource",
    "resource": "example:a_simple_resource",
    "comparison": "==",
    "compare_to": 1
}
```

This example will check if the player has a value of 1 in the `example:a_simple_resource` resource power. (`data\example\powers\a_simple_resource.json`)



```json
"condition": {
    "type": "origins:resource",
    "resource": "example:a_multiple_power_with_resource_subpower",
    "comparison": ">",
    "compare_to": 50
}
```

This example will check if the player has a value of more than 50 in the `with_resource_subpower` sub-power of `example:a_multiple_power` power. (`data\example\powers\a_multiple_power.json`)

