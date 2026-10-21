---
title: "Scoreboard (Entity Condition Type)"
description: "Compares the entity's score in a scoreboard objective with a number."
navigation_title: "Scoreboard"
---

Compares the entity's score in a scoreboard objective with a number.

Type ID: `apoli:scoreboard`

> [!NOTE]
> If the player has no score in the objective, this condition is always false, even with `"!="`. Combine a `"!="` check with a `"=="` check to test whether the player has no score set, for example after joining a world for the first time or having their scores reset.

> [!WARNING]
> This condition only works on the server, so it can't be used in fields that are evaluated on the client.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | [String](/docs/datapack/data-types/string) | _optional_ | A score holder to read the score of, instead of the entity. |
| `objective` | [String](/docs/datapack/data-types/string) | _required_ | The name of the scoreboard objective to read. |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | _required_ | How the score is compared with `compare_to`. |
| `compare_to` | [Integer](/docs/datapack/data-types/integer) | _required_ | The number the score is compared with. |

## Examples

```json
"condition": {
    "type": "apoli:scoreboard",
    "objective": "obj",
    "comparison": ">",
    "compare_to": 3
}
```

This checks whether the player's score in the `obj` objective is greater than 3.
