---
title: Better Combat
description: What Apoli does to keep Better Combat's attack handling from crashing.
---

[Better Combat](https://modrinth.com/mod/better-combat) replaces the vanilla click-to-attack flow with its own swing/upswing state machine. Apoli registers **no types** for it — the integration is one defensive client-side patch.

## The crash it prevents

Better Combat's swing handler reads `Minecraft.hitResult` without a null check when a swing lands on nothing:

```
java.lang.NullPointerException: Cannot invoke "net.minecraft.world.phys.HitResult.getType()"
because "this.hitResult" is null
```

Vanilla only fills `hitResult` once the level has rendered a frame, and it guards every one of its own reads (`Null returned as 'hitResult', this shouldn't happen!`). Better Combat's swing can be resolved from the client tick, which on the first ticks of a session runs before that first frame — and the read crashes the render thread.

When Better Combat is installed, Apoli keeps `Minecraft.hitResult` populated: as soon as a level and player exist, a null `hitResult` is replaced with a *miss* at the player's eye position. Vanilla already treats a miss and a null the same way (it skips the attack), so nothing else changes.

The mixin is registration-gated on Better Combat's own classes being present, so it does not exist at all in a pack without it.
