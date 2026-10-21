---
title: "Pose (Power Type)"
description: "Forces the entity into a body pose, an arm pose, or both, while the power is active."
navigation_title: "Pose"
---

Forces the entity into a body pose, an arm pose (how the arms are held and rendered), or both, while the power is active.

Type ID: `apoli:pose`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `entity_pose` | [String](/docs/datapack/data-types/string) | _optional_ | The body pose to force. One of the vanilla `Pose` values, such as `standing`, `crouching`, `swimming`, `fall_flying`, `sleeping`, `spin_attack`, `sitting`, `sliding`, `shooting` or `inhaling`. |
| `arm_pose` | [String](/docs/datapack/data-types/string) | _optional_ | The arm pose to force on humanoid models. One of `empty`, `item`, `block`, `bow_and_arrow`, `throw_spear`, `crossbow_charge`, `crossbow_hold`, `spyglass`, `toot_horn` or `brush`. |
| `hands` | [Array](/docs/datapack/data-types/array) of [Hand](/docs/datapack/data-types/hand) | both hands | The hands the `arm_pose` applies to: `main_hand`, `off_hand` or both. Which arm is the main hand follows the player's main hand setting. Hands that aren't listed keep their vanilla pose. Has no effect on `entity_pose`. |
| `priority` | [Integer](/docs/datapack/data-types/integer) | `0` | When several pose powers are active on the same entity, the one with the highest `priority` wins. |

## Examples

```json
{
    "type": "apoli:pose",
    "arm_pose": "crossbow_hold",
    "hands": ["main_hand"]
}
```

This holds only the main hand arm in the crossbow hold pose. The off hand stays vanilla.

```json
{
    "type": "apoli:pose",
    "entity_pose": "swimming",
    "condition": {
        "type": "apoli:sneaking"
    }
}
```

This forces the swimming (crawling) pose while the entity sneaks.
