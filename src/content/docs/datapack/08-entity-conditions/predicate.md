---
title: "Predicate (Entity Condition Type)"
description: "Checks whether the entity fulfills a specified Predicate."
navigation_title: "Predicate"
---

Checks whether the entity fulfills a specified [Predicate](https://minecraft.wiki/w/Predicate).

Type ID: `apoli:predicate`

> This entity condition type only operates on the **server-side**, meaning that it cannot be used in fields that are evaluated on the client-side.


## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`predicate` | Identifier | | The namespace and ID of the predicate the entity needs to pass.

## Examples

```json
"condition": {
    "type": "apoli:predicate",
    "predicate": "example:weather/is_thunderstorm"
}
```

This example will check if the `example:check_if_thunderstorm` predicate (`data\example\predicates\weather\is_thunderstorm.json`) is true.

```json
{
    "condition": "minecraft:weather_check",
    "raining": true,
    "thundering": true
}
```

This being the contents of the `example:check_if_thunderstorm` predicate. (`data\example\predicates\weather\is_thunderstorm.json`)
