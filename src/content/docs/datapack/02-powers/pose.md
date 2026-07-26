---
title: "apoli:pose"
description: "Forces the entity into an entity pose (body animation state) and/or forces an arm pose (how the arms are held/rendered), while the power is active."
---

Forces the entity into an entity pose (body animation state) and/or forces an arm pose (how the arms are held/rendered), while the power is active.

Type ID: `apoli:pose`

> When multiple `apoli:pose` powers are active on the same entity, the one with the highest `priority` wins.

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`entity_pose` | [String](/docs/datapack/data-types/string) | _optional_ | The entity pose to force. One of the vanilla `Pose` values, e.g. `standing`, `crouching`, `swimming`, `fall_flying`, `sleeping`, `spin_attack`, `sitting`, `sliding`, `shooting`, `inhaling`.
`arm_pose` | [String](/docs/datapack/data-types/string) | _optional_ | The arm pose to force on humanoid models. One of `empty`, `item`, `block`, `bow_and_arrow`, `throw_spear`, `crossbow_charge`, `crossbow_hold`, `spyglass`, `toot_horn`, `brush`.
`hands` | Array of [Hand](/docs/datapack/data-types/hand) | both hands | Which hand(s) the `arm_pose` applies to. Accepts `main_hand` and/or `off_hand` (which arm that is follows the player's main-hand setting). Hands not listed keep their vanilla pose. Has no effect on `entity_pose`.
`priority` | [Integer](/docs/datapack/data-types/integer) | `0` | Pick order when several pose powers are active at once — highest priority wins.

## Examples

```json
{
   "type":"apoli:pose",
   "arm_pose":"crossbow_hold",
   "hands":[
      "main_hand"
   ]
}
```

Holds only the main-hand arm in the crossbow-hold pose; the off hand stays vanilla.

```json
{
    "type": "apoli:pose",
    "entity_pose": "swimming",
    "condition": {
        "type": "apoli:sneaking"
    }
}
```

Forces the swimming (crawling) pose while sneaking.

