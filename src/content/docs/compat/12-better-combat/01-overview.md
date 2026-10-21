---
title: Better Combat
description: "What Apoli does to keep Better Combat's attack handling from crashing."
---

[Better Combat](https://modrinth.com/mod/better-combat) replaces the vanilla click to attack flow with its own swing and upswing state machine. Apoli registers no types for it, and the integration is one defensive patch on the client.

## The crash it prevents

Better Combat's swing handler reads `Minecraft.hitResult` without checking for null when a swing lands on nothing:

```
java.lang.NullPointerException: Cannot invoke "net.minecraft.world.phys.HitResult.getType()"
because "this.hitResult" is null
```

Vanilla only fills `hitResult` once the level has rendered a frame, and it guards every one of its own reads (`Null returned as 'hitResult', this shouldn't happen!`). Better Combat's swing can be resolved from the client tick, which in the first ticks of a session runs before that first frame, and the read crashes the render thread.

When Better Combat is installed, Apoli keeps `Minecraft.hitResult` filled in: as soon as a level and a player exist, a null `hitResult` is replaced with a miss at the player's eye position. Vanilla already treats a miss and a null the same way (it skips the attack), so nothing else changes.

The mixin is only applied when Better Combat's own classes are present, so it doesn't exist at all in a pack without it.
