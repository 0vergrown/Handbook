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
| `entity_pose` | [String](/docs/datapack/data-types/string) | _optional_ | The body pose to force. See [Body poses](#body-poses) for the values and what each one looks like. |
| `arm_pose` | [String](/docs/datapack/data-types/string) | _optional_ | The arm pose to force on humanoid models. One of `empty`, `item`, `block`, `bow_and_arrow`, `throw_spear`, `crossbow_charge`, `crossbow_hold`, `spyglass`, `toot_horn` or `brush`. |
| `hands` | [Array](/docs/datapack/data-types/array) of [Hand](/docs/datapack/data-types/hand) | both hands | The hands the `arm_pose` applies to: `main_hand`, `off_hand` or both. Which arm is the main hand follows the player's main hand setting. Hands that aren't listed keep their vanilla pose. Has no effect on `entity_pose`. |
| `priority` | [Integer](/docs/datapack/data-types/integer) | `0` | When several pose powers are active on the same entity, the one with the highest `priority` wins. |

## Body poses

`entity_pose` takes any vanilla pose name. On players, and on mobs drawn with the humanoid model such as zombies, husks and skeletons, the poses look like this:

| Pose | What the model does |
|------|---------------------|
| `standing` | Stands normally. |
| `crouching` | Sneaks. A player also moves at sneaking speed, as if holding the sneak key. |
| `swimming` | Swims in water and crawls on land. |
| `fall_flying` | Glides as if flying with an elytra. |
| `spin_attack` | Spins like a Riptide trident throw. |
| `sleeping` | Lies flat, as in a bed. |
| `dying` | Falls over sideways and stays down. |
| `sitting` | Sits on the ground with the legs out in front and the hands on the thighs. |
| `sliding` | Leans far back with the feet out in front and one hand on the ground, like a slide into base. |
| `shooting` | Holds both arms out toward wherever the entity is looking. |
| `inhaling` | Leans back with the head tipped up and the arms drawn back, breathing slowly. |
| `long_jumping` | Leaps, with the legs split and both arms reaching forward. |
| `croaking` | Lifts the chin and spreads the arms and legs, puffing in and out. |
| `using_tongue` | Leans forward with the head pushed out and the arms back. |
| `roaring` | Throws the head back and spreads the arms wide, shaking a little. |
| `sniffing` | Bends forward and sweeps the head from side to side. |
| `emerging` | Reaches up overhead with both arms, as if climbing out of the ground. |
| `digging` | Bends low and scoops at the ground with both hands. |

The model eases into a pose over a fifth of a second. While `sitting`, `sliding` or `dying`, the legs stop the walking animation even if the entity moves.

`swimming` and `fall_flying` only change how players are drawn. Mobs with models of their own only show a pose if their model already animates it, such as a warden roaring.

> [!NOTE]
> `sliding`, `shooting` and `inhaling` come from the breeze and only exist on Minecraft 1.21.1. On 1.20.1 those names fail to load.

> [!TIP]
> To draw a pose yourself, list it in the `override_pose` of an [apoli:modify_model_parts](/docs/datapack/powers/modify_model_parts) power. Apoli then leaves the model standing while that pose is forced, and your transformations start from there.

### Hitbox and camera

A forced pose changes a player's hitbox and eye height the same way the pose does in vanilla, and `sitting` and `sliding` lower them as well:

| Pose | Hitbox height | Eye height |
|------|---------------|------------|
| `crouching` | 1.5 | 1.27 |
| `sitting` | 1.2 | 1.0 |
| `sliding` | 0.9 | 0.6 |
| `swimming`, `fall_flying`, `spin_attack` | 0.6 | 0.4 |
| `sleeping` | 0.2 | 0.2 |
| `dying` | 0.2 | 1.62 |
| Any other pose | 1.8 | 1.62 |

The eye height is where the first person camera sits. When the power ends somewhere too low to stand up in, the player crouches or crawls instead, as they would in vanilla.

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

```json
{
    "type": "apoli:pose",
    "entity_pose": "sliding",
    "condition": {
        "type": "apoli:sprinting"
    }
}
```

This makes a player slide feet first while sprinting. The hitbox drops to 0.9 blocks, so they can slide under a one block gap.
