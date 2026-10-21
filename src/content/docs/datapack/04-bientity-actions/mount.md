---
title: "Mount (Bi-Entity Action Type)"
description: "Mounts the actor onto the target, optionally at an offset from the usual seat."
navigation_title: "Mount"
---

Mounts the actor onto the target, optionally holding the rider at an offset from the usual seat, such as on a shoulder, on the head or off to one side.

Type ID: `apoli:mount`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `x` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `0.0` | A sideways offset added to the rider's seat position. |
| `y` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `0.0` | A vertical offset added to the rider's seat position. |
| `z` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `0.0` | A forward offset added to the rider's seat position. |
| `space` | [Space](/docs/datapack/data-types/space) | `world` | How `x`, `y` and `z` are read. `world` is absolute, and the `local` spaces rotate the offset with the vehicle, so a shoulder stays a shoulder when the vehicle turns. |
| `rotation` | [String](/docs/datapack/data-types/string) (`head` or `body`) | `head` | Which of the vehicle's rotations the `local` spaces turn with. `head` is the direction it is looking, and `body` is its body yaw, which ignores pitch entirely. |
| `force` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether to mount even when the target already has a passenger or would normally refuse the rider. |

### Picking a space

`local` and `local_horizontal` both carry the length of the vehicle's look direction into the offset, so looking up or down pulls the rider in toward the vehicle, and straight up or straight down shrinks the offset to zero. That is how those spaces are defined. For a rider that should keep its distance wherever the vehicle looks, use `local_horizontal_normalized`, which is a pure yaw rotation that pitch doesn't affect.

`rotation` decides whose yaw that is, and only affects the three `local` spaces (`world` and the `velocity` spaces ignore it):

- `head` (the default) is the vehicle's look direction. On a player that is the camera, so the rider swings around as the player looks about.
- `body` is the vehicle's body yaw (`yBodyRot` on any living entity, and the plain yaw on anything else). The rider stays put on the model while the player's head turns freely, which is what you want for a Figura or geometry centaur that carries a passenger on its back. Body yaw has no pitch, so `local`, `local_horizontal` and `local_horizontal_normalized` all behave the same with `rotation: "body"`.

> [!NOTE]
> `body` follows the model, not a fixed direction. Vanilla's body yaw isn't independent of the head. It is exactly the rotation the player model's torso is drawn at, which is the point, but it means the rider still moves in three ordinary situations: the body is dragged along whenever the head goes more than 50° off it (15° while the player is blocking with a shield), it turns toward the direction of travel while the player walks, and it snaps toward the head during an attack swing. In all three the torso is turning, so a rider attached to it should turn too. Standing still and looking around within 50° is where `head` and `body` look different, so use that to check whether the option is taking effect at all.

> [!NOTE]
> With `body`, the rider is drawn against the interpolated body yaw, the same value the player model's torso is drawn at, so it stays on the back through a fast turn instead of stepping once per tick. `head` is worked out once per tick instead.

> [!NOTE]
> The offset is remembered per rider until it dismounts, and applies on both sides: on the server for hit detection, and on the client for rendering and the rider's own camera. It isn't saved, so it doesn't survive a server restart, and running `apoli:mount` again replaces it.

> [!NOTE]
> The offset is added on top of whatever seat the vehicle would normally use, so it works on every vehicle: plain mobs, players, and the vanilla mounts that define their own seat position (horses, camels, llamas, striders, boats and minecarts).

> [!NOTE]
> A rider on a player behaves like a rider on any other mount. It gets off with the sneak key or with [`apoli:dismount`](/docs/datapack/entity-actions/dismount), and every client sees it, including the carried player's own. The offset looks the same to everyone: the rider, the carried player and anyone watching.

> [!TIP]
> If the actor is already riding the target, `apoli:mount` still applies or replaces the offset without mounting again. That makes it useful for moving a rider that climbed on in the ordinary way.

> [!NOTE]
> On 1.20.1 only, riders of a player already sit on top of that player's head instead of at vanilla's shoulder height. The offset is added on top of that, so `y: -0.8` brings a rider back down to roughly where 1.21.1 puts them.

## Examples

```json
"bientity_action": {
    "type": "apoli:mount"
}
```

A plain mount, at the vehicle's usual seat.

```json
"bientity_action": {
    "type": "apoli:mount",
    "x": 0.35,
    "y": 1.0,
    "z": 0.0,
    "space": "local_horizontal"
}
```

This sits the actor on the target's right shoulder, turning with the target instead of staying pinned to a compass direction.

```json
"bientity_action": {
    "type": "apoli:mount",
    "y": 0.6,
    "z": -0.9,
    "space": "local_horizontal_normalized",
    "rotation": "body"
}
```

This seats the actor on the target's back. The rider turns with the target's body and stays exactly 0.9 blocks back however the target's head moves, which is the setup for a centaur or any custom model whose seat isn't on the head.

## Which entity the expressions read

`x`, `y` and `z` are [expressions](/docs/datapack/data-types/expression) evaluated against the actor, the entity doing the riding. `target_` reads the mount instead.
