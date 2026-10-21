---
title: "Modify Entity Data (Entity Action Type)"
description: "Changes one piece of an entity's data, such as whether it has gravity."
navigation_title: "Modify Entity Data"
aliases: ["set_entity_data", "change_entity_data", "set_no_gravity", "set_gravity"]
---

Changes one piece of an entity's data, such as whether it has gravity. It works on any entity, living or not.

Type ID: `apoli:modify_entity_data`

> [!NOTE]
> `apoli:set_entity_data` and `apoli:change_entity_data` are plain renames of this action. `apoli:set_no_gravity` and `apoli:set_gravity` are shortcuts that fill in `data: no_gravity`, so you only give (or leave out) `value`.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `data` | [String](/docs/datapack/data-types/string) | _required_ | Which property to change (see the list below). |
| `value` | [Boolean](/docs/datapack/data-types/boolean) or [Float](/docs/datapack/data-types/float) | _optional_ | The new value. For a boolean property, leaving `value` out flips the current state. For a number property, leaving it out does nothing. |

## `data` values

| `data` | Type | Property |
| --- | --- | --- |
| `no_gravity` | boolean | Whether the entity ignores gravity. |
| `invulnerable` | boolean | Whether the entity is invulnerable. |
| `silent` | boolean | Whether the entity is silent. |
| `glowing` | boolean | Whether the entity has the glowing outline. |
| `invisible` | boolean | Whether the entity is invisible. |
| `custom_name_visible` | boolean | Whether the entity's custom name is always shown. |
| `no_ai` | boolean | Whether the mob's AI is turned off (mobs only). |
| `fall_distance` | number | The fall distance built up so far. |
| `air` | number | Remaining air, in ticks. |
| `fire_ticks` | number | Remaining fire, in ticks. |

## Examples

```json
"entity_action": {
    "type": "apoli:modify_entity_data",
    "data": "no_gravity",
    "value": true
}
```

This makes the entity ignore gravity. With the `apoli:set_no_gravity` alias, the same thing is:

```json
"entity_action": {
   "type":"apoli:set_no_gravity",
   "value":true
}
```

Leave `value` out and it toggles gravity instead.

```json
"entity_action": {
    "type": "apoli:modify_entity_data",
    "data": "fire_ticks",
    "value": 100
}
```

This sets the entity on fire for 5 seconds.
