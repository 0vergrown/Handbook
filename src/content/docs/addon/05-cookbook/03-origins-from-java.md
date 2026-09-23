---
title: Origins from Java
description: Get an origin's powers, find out what a player has chosen, and do both without a hard dependency.
---

## All the powers of an origin

```java
import dev.overgrown.origins.origin.Origin;
import dev.overgrown.origins.origin.OriginRegistry;

Origin origin = OriginRegistry.get(ResourceLocation.parse("origins:enderian"));
if (origin == null) return;                // no loaded pack defines it

List<ResourceLocation> powers = origin.powers();
```

`powers()` is the flat list of every power id the origin can grant, conditioned entries included. There are two other questions that look the same and are not:

| You want | Call |
| --- | --- |
| Everything the origin *can* grant | `origin.powers()` |
| What this player is *shown* | `origin.powersFor(player)` |
| What this player *actually has* | the [power container](/docs/addon/systems/power-container) |

The third is different because commands, artefacts, skill trees and other layers all add to the same container. If you want "the powers this player has **from** this origin", intersect the two:

```java
PowerContainer container = PowerContainer.of(player);
for (ResourceLocation id : origin.powers()) {
    if (container != null && container.sourcesOf(id).contains(origin.id())) {
        // granted by this origin specifically
    }
}
```

`sourcesOf` is the authoritative answer, because Origins grants with the origin's own id as the source.

### Keeping the conditioned grouping

`powers()` flattens `powerEntries`. Walk the entries yourself when the grouping matters — a GUI that greys out entries the player does not qualify for, say:

```java
for (OriginPowerEntry entry : origin.powerEntries()) {
    boolean shown = entry.visible(player);      // true when the entry has no condition
    for (ResourceLocation id : entry.powers()) {
        render(id, shown);
    }
}
```

## Which origin does this player have?

`OriginView` is the reader that is correct on **both** sides — synced state on the client, the attachment on the server — so use it in render code as well as in commands.

```java
import dev.overgrown.origins.origin.OriginView;

ResourceLocation active = OriginView.activeOn(player, Origins.id("origin"));
boolean enderian        = OriginView.holds(player, Origins.id("enderian"));
Map<ResourceLocation, ResourceLocation> byLayer = OriginView.chosen(player);
```

`activeOn` applies swaps on top of the choice; `chosen` is the raw choice. Most gameplay checks want `activeOn` or `holds`.

### Everything a player's origins grant, across every layer

```java
Set<ResourceLocation> granted = new LinkedHashSet<>();
for (OriginLayer layer : OriginLayers.enabledFor(player)) {
    ResourceLocation originId = OriginView.activeOn(player, layer.id());
    if (originId == null) continue;
    Origin origin = OriginRegistry.get(originId);
    if (origin != null) granted.addAll(origin.powersFor(player));
}
```

This is a cold-path recipe — a command, a GUI, an advancement check. Do not run it per tick; ask the container instead.

## Without depending on Origins

If all you need is "which powers does this source hand out", you do not need Origins on the classpath at all. Apoli's `PowerSources` is the indirection, and Origins registers itself into it:

```java
import dev.overgrown.apoli.power.PowerSources;

Set<ResourceLocation> powers = PowerSources.powersOf(ResourceLocation.parse("origins:enderian"));
```

That returns the origin's powers when Origins is loaded and `null` when it is not, with no import, no `ModList` check and no crash. It works for **layers** too — `PowerSources.powersOf(Origins layer id)` is the union of every member origin's powers — and for skill trees and `apoli:multiple` powers, which is why it is the right call in generic code.

The same indirection tells you who granted a power on a live entity, again with no Origins import:

```java
for (ResourceLocation source : container.sourcesOf(powerId)) {
    if (PowerSources.isKnown(source)) { … }
}
```

## React to a change

There is no event bus. The hook is a power: give the origin a power of the type you care about and let Apoli call you.

- **Something happened to a player who has origin X** — write a power type, put it in the origin, and use its `tick`, `onAdded` and `onRemoved`.
- **Something happened when the player *chose*** — `apoli:action_on_callback`'s `entity_action_chosen` fires once at the moment of choosing. `ActionOnCallbackPower.fireChosen(entity, fromOrb)` is the static that raises it, if your own flow needs to.

> **`onAdded` does not fire on login.** It runs from `addPower` only, on the transition to the first source. A container loaded from NBT fills itself through its codec, and Origins' join-time pass *reconciles* rather than re-adding, so a returning player's powers never pass through `onAdded` again.
>
> This makes any `static` set or map filled in `onAdded` **empty for every player after a restart** — the power still works in the session it was granted in, and is dead thereafter. If you need "every entity that currently has my power", derive it from `PoweredEntities.forEach(...)`, which `attachOwner` maintains as well as `addPower`, and cache the result per `level.getGameTime()`. One pass per tick over the powered entities beats a per-entity scan anyway.

If you must react outside the power system, `OriginManager.reapplyAll(serverPlayer)` is what Origins itself calls after a reload, and calling it re-runs the whole grant pass.

## Declaring the dependency

Make Origins optional unless your addon is meaningless without it:

```json
{
  "depends":    { "apoli": ">=1.93.0" },
  "recommends": { "origins": "*" }
}
```

Then keep every Origins import in its own class, reached only behind a loaded-check, so the classloader never touches it when Origins is absent. The [gated compat module](/docs/compat/writing-compat/gated-modules) pattern is exactly this.
