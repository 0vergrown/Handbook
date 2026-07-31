---
title: "Modify Entity Data (Entity Action Type)"
description: "Changes a single piece of an entity's data (e.g."
navigation_title: "Modify Entity Data"
aliases: ["set_entity_data", "change_entity_data", "set_no_gravity", "set_gravity"]
---

Changes a single piece of an entity's data (e.g. whether it has gravity). Works on any entity, not just living ones.

Type ID: `apoli:modify_entity_data`

> **Aliases:** `apoli:set_entity_data` and `apoli:change_entity_data` are plain renames of this action. `apoli:set_no_gravity` and `apoli:set_gravity` are shortcuts that pre-fill `data: no_gravity`, so you only supply (or omit) `value`.

## Fields

| Field   | Type                                     | Default    | Description                                                                                                                                   |
|---------|------------------------------------------|------------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| `data`  | [String](/docs/datapack/data-types/string)                       | —          | Which property to change (see the list below).                                                                                                |
| `value` | [Boolean](/docs/datapack/data-types/boolean) or [Float](/docs/datapack/data-types/float) | _optional_ | The new value. For a boolean property, **omitting** `value` inverts the current state. For a numeric property, omitting `value` does nothing. |

## `data` values

| `data`                | Type    | Property                                          |
|-----------------------|---------|---------------------------------------------------|
| `no_gravity`          | boolean | Whether the entity ignores gravity.               |
| `invulnerable`        | boolean | Whether the entity is invulnerable.               |
| `silent`              | boolean | Whether the entity makes sounds.                  |
| `glowing`             | boolean | Whether the entity has the glowing outline.       |
| `invisible`           | boolean | Whether the entity is invisible.                  |
| `custom_name_visible` | boolean | Whether the entity's custom name is always shown. |
| `no_ai`               | boolean | Disables AI (mobs only).                          |
| `fall_distance`       | number  | The accumulated fall distance.                    |
| `air`                 | number  | Remaining air (in ticks).                         |
| `fire_ticks`          | number  | Remaining fire (in ticks).                        |

## Examples

```json
"entity_action": {
    "type": "apoli:modify_entity_data",
    "data": "no_gravity",
    "value": true
}
```

This makes the entity ignore gravity. Using the `apoli:set_no_gravity` alias, the same effect is:

```json
"entity_action": {
   "type":"apoli:set_no_gravity",
   "value":true
}
```

and omitting `value` toggles gravity instead.

```json
"entity_action": {
    "type": "apoli:modify_entity_data",
    "data": "fire_ticks",
    "value": 100
}
```

This sets the entity on fire for 5 seconds.
