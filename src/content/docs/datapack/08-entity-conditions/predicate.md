---
title: "Predicate (Entity Condition Type)"
description: "Checks whether the entity passes a vanilla predicate."
navigation_title: "Predicate"
---

Checks whether the entity passes a vanilla [predicate](https://minecraft.wiki/w/Predicate).

Type ID: `apoli:predicate`

> [!WARNING]
> This condition only works on the server, so it can't be used in fields that are evaluated on the client.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `predicate` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The ID of the predicate the entity must pass. |

## Examples

```json
"condition": {
    "type": "apoli:predicate",
    "predicate": "example:weather/is_thunderstorm"
}
```

This checks whether the `example:weather/is_thunderstorm` predicate passes. On 1.21.1 the file is `data/example/predicate/weather/is_thunderstorm.json`, and on 1.20.1 the folder is `predicates`. The predicate itself looks like this:

```json
{
    "condition": "minecraft:weather_check",
    "raining": true,
    "thundering": true
}
```
