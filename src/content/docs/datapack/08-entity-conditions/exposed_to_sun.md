---
title: "Exposed To Sun (Entity Condition Type)"
description: "Checks whether the entity is currently exposed to the sun, which is essentially a mix of Brightness (Entity Condition Type) that checks if the brightness level at the entity's eyes is greater than 0.5 and Exposed to Sky (Entity Condition Type)."
navigation_title: "Exposed To Sun"
---

Checks whether the entity is currently exposed to the sun, which is essentially a mix of [Brightness (Entity Condition Type)](/docs/datapack/entity-conditions/brightness) that checks if the brightness level at the entity's eyes is greater than 0.5 and [Exposed to Sky (Entity Condition Type)](/docs/datapack/entity-conditions/exposed_to_sky).

Type ID: `apoli:exposed_to_sun`

> All four of these have to hold: it is **daytime** in the entity's dimension, the sky is visible from the entity's eyes, it is **not raining on** the entity, and the light level at the eyes is above `0.5`. Dimensions with a fixed time (the Nether, the End) never qualify.

> Not the same as [apoli:exposed_to_sky](/docs/datapack/entity-conditions/exposed_to_sky), which only asks whether the sky is visible and is therefore true at night and in the rain. This is the condition that matches vanilla's "will an undead burn here" test.

## Fields

_None._

## Examples

```json
"condition": {
    "type": "apoli:exposed_to_sun"
}
```
