---
title: "Exposed To Sun (Entity Condition Type)"
description: "Checks whether the entity is in direct sunlight, the same test vanilla uses to decide whether undead mobs burn."
navigation_title: "Exposed To Sun"
---

Checks whether the entity is in direct sunlight. It combines [Brightness (Entity Condition Type)](/docs/datapack/entity-conditions/brightness), testing for a brightness above 0.5 at the entity's eyes, with [Exposed to Sky (Entity Condition Type)](/docs/datapack/entity-conditions/exposed_to_sky).

Type ID: `apoli:exposed_to_sun`

> [!NOTE]
> All four of these have to hold: it is daytime in the entity's dimension, the sky is visible from the entity's eyes, it isn't raining on the entity, and the light level at the eyes is above `0.5`. Dimensions with a fixed time, such as the Nether and the End, never qualify.

> [!TIP]
> This differs from [apoli:exposed_to_sky](/docs/datapack/entity-conditions/exposed_to_sky), which only asks whether the sky is visible and so is also true at night and in the rain. This condition matches vanilla's test for whether an undead mob burns.

## Fields

This condition has no fields.

## Examples

```json
"condition": {
    "type": "apoli:exposed_to_sun"
}
```
