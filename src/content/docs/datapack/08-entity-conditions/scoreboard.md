---
title: "Scoreboard (Entity Condition Type)"
description: "Compares the score of the entity from a specified scoreboard objective to a specified value."
navigation_title: "Scoreboard"
---

Compares the score of the entity from a specified scoreboard objective to a specified value.

Type ID: `apoli:scoreboard`

> If the player does not have the scoreboard objective, this condition would always return false (even if `"!="` is used). You can then use the `"!="` comparison in combination with the `"=="` comparison to test if the player does not have this objective set (for example, if a player has newly joined a world or had their objectives reset).


> This entity condition type only operates on the **server-side**, meaning that it cannot be used in fields that are evaluated on the client-side.


## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`name` | String | _optional_ | If specified, the condition will check for the score of this score holder.
`objective` | String | | The name of the scoreboard objective to retrieve the value from and compare.
`comparison` | Comparison | | Determines how the score of the specified score holder should be compared to the specified value.
`compare_to` | Integer | | The value at which the score of the specified score holder will be compared to.

## Examples

```json
"condition": {
    "type": "apoli:scoreboard",
    "objective": "obj",
    "comparison": ">",
    "compare_to": 3
}
```

This example will check if the score of the player in the `obj` scoreboard objective is greater than 3.
