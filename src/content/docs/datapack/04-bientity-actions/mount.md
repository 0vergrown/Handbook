---
title: "Mount (Bi-Entity Action Type)"
description: "Mounts the actor entity onto the target entity, optionally at an offset."
navigation_title: "Mount"
---

Mounts the actor entity onto the target entity, optionally holding the rider at an offset from the usual seat — on a shoulder, on the head, or off to one side.

Type ID: `apoli:mount`

> Since July 2026 the mount is properly synced to the clients involved: when the target (or actor) is a player, that player's client is sent the updated passenger list directly — previously the ridden player never saw the rider (the entity appeared frozen in place and "teleported" on dismount). apoli:dismount got the matching fix.

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`x` | Float, or [Expression](/docs/datapack/data-types/expression) | `0.0` | Sideways offset added to the rider's seat position.
`y` | Float, or [Expression](/docs/datapack/data-types/expression) | `0.0` | Vertical offset added to the rider's seat position.
`z` | Float, or [Expression](/docs/datapack/data-types/expression) | `0.0` | Forward offset added to the rider's seat position.
`space` | [Space](/docs/datapack/data-types/space) | `world` | How `x`/`y`/`z` are interpreted. `world` is absolute; the `local` spaces rotate the offset with the **vehicle**, so a shoulder stays a shoulder when the vehicle turns.
`rotation` | String — `head` or `body` | `head` | Which of the vehicle's rotations the `local` spaces turn with. `head` is the direction it is looking; `body` is its body yaw, which ignores pitch entirely.
`force` | Boolean | `true` | Whether to mount even when the target already has a passenger or would normally refuse the rider.

### Picking a space

`local` and `local_horizontal` both carry the *length* of the vehicle's look direction into the offset, so looking up or down pulls the rider in toward the vehicle — at straight up or straight down they collapse to zero. That is the defined behaviour of those spaces, not a bug. For a rider that should keep its distance no matter where the vehicle looks, use **`local_horizontal_normalized`**: it is a pure yaw rotation, unaffected by pitch.

`rotation` decides *whose* yaw that is, and only affects the three `local` spaces (`world` and the `velocity` spaces ignore it):

- **`head`** (default) — the vehicle's look direction. On a player that is the camera, so the rider swings around as the player looks about.
- **`body`** — the vehicle's body yaw (`yBodyRot` on any living entity, the plain yaw on anything else). The rider stays put on the model while the player's head turns freely, which is what you want for a Figura or geometry centaur that carries a passenger on its back. Because body yaw has no pitch, `local`, `local_horizontal` and `local_horizontal_normalized` all behave the same under `rotation: "body"`.

> The offset is remembered per rider until it dismounts, and is applied on both sides — the server for hit detection and the client for rendering and the rider's own camera. It is runtime state: it does not survive a server restart, and re-running `apoli:mount` replaces it.

> The offset is applied on top of whatever seat the vehicle would normally use, so it works on every vehicle — plain mobs, players, and the vanilla mounts that define their own seat position (horses, camels, llamas, striders, boats, minecarts). Before Apoli 1.38.1 those vanilla mounts silently ignored it, because the hook sat on the seat-position method they override.

> If the actor is **already** riding the target, `apoli:mount` no longer does nothing — it applies (or replaces) the offset without re-mounting. That makes it usable to re-position a rider that climbed on by ordinary means.

> **1.20.1 only:** riders of a *player* already sit on top of that player's head rather than at vanilla's shoulder height — that predates this action and is unchanged. The offset is added on top of it, so `y: -0.8` brings a rider back down to roughly where 1.21.1 puts them.

## Examples

```json
"bientity_action": {
    "type": "apoli:mount"
}
```

Plain mount, at the vehicle's usual seat.

```json
"bientity_action": {
    "type": "apoli:mount",
    "x": 0.35,
    "y": 1.0,
    "z": 0.0,
    "space": "local_horizontal"
}
```

Sits the actor on the target's right shoulder, turning with the target rather than staying pinned to a compass direction.

```json
"bientity_action": {
    "type": "apoli:mount",
    "y": 0.6,
    "z": -0.9,
    "space": "local_horizontal_normalized",
    "rotation": "body"
}
```

Seats the actor on the target's back, behind it. The rider turns with the target's body and stays exactly 0.9 blocks back however the target's head moves — the setup for a centaur or any custom model whose seat is not on the head.

## Which entity the Expressions read

`x`, `y` and `z` are [Expressions](/docs/datapack/data-types/expression) evaluated against the **actor** — the entity doing the riding. `target_` reads the mount instead.
