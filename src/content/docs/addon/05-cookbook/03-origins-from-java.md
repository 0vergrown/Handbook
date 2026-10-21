---
title: Origins from Java
description: "Getting an origin's powers, finding out what a player has chosen, and doing both without a hard dependency."
---

These recipes read origins and their powers from Java, with and without a compile dependency on Origins.

## All the powers of an origin

`OriginRegistry.get` returns null when no loaded pack defines the origin:

```java
import dev.overgrown.origins.origin.Origin;
import dev.overgrown.origins.origin.OriginRegistry;

Origin origin = OriginRegistry.get(ResourceLocation.parse("origins:enderian"));
if (origin == null) return;

List<ResourceLocation> powers = origin.powers();
```

`powers()` is the flat list of every power ID the origin can grant, conditioned entries included. Two other questions look the same and aren't:

| You want | Call |
| --- | --- |
| Everything the origin can grant | `origin.powers()` |
| What this player is shown | `origin.powersFor(player)` |
| What this player actually has | The [power container](/docs/addon/systems/power-container) |

The third is different because commands, artefacts, skill trees and other layers all add to the same container. For the powers a player has from this origin in particular, combine the two:

```java
PowerContainer container = PowerContainer.of(player);
for (ResourceLocation id : origin.powers()) {
    if (container != null && container.sourcesOf(id).contains(origin.id())) {
        showFromOrigin(id);
    }
}
```

`sourcesOf` is the reliable answer, because Origins grants with the origin's own ID as the source.

### Keeping the conditioned grouping

`powers()` flattens `powerEntries`. Walk the entries yourself when the grouping matters, as in a screen that greys out entries the player doesn't qualify for. `entry.visible(player)` is true when the entry has no condition or its condition passes:

```java
for (OriginPowerEntry entry : origin.powerEntries()) {
    boolean shown = entry.visible(player);
    for (ResourceLocation id : entry.powers()) {
        render(id, shown);
    }
}
```

## Which origin does this player have?

`OriginView` is the reader that is correct on both sides, since it reads the synced state on the client and the attachment on the server, so use it in render code as well as in commands.

```java
import dev.overgrown.origins.origin.OriginView;

ResourceLocation active = OriginView.activeOn(player, Origins.id("origin"));
boolean enderian        = OriginView.holds(player, Origins.id("enderian"));
Map<ResourceLocation, ResourceLocation> byLayer = OriginView.chosen(player);
```

`activeOn` applies swaps on top of the choice, and `chosen` is the raw choice. Most gameplay checks want `activeOn` or `holds`.

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

This recipe is for cold paths, such as a command, a screen or an advancement check. Don't run it every tick, and ask the container instead.

## Without depending on Origins

If all you need is the list of powers a source hands out, you don't need Origins on the classpath at all. Apoli's `PowerSources` stands in between, and Origins registers itself into it:

```java
import dev.overgrown.apoli.power.PowerSources;

Set<ResourceLocation> powers = PowerSources.powersOf(ResourceLocation.parse("origins:enderian"));
```

That returns the origin's powers when Origins is loaded and `null` when it isn't, with no import, no `ModList` check and no crash. It works for layers too, where `PowerSources.powersOf` with a layer ID gives every member origin's powers together, and for skill trees and `apoli:multiple` powers, which is why it is the right call in generic code.

The same lookup tells you who granted a power on a live entity, again with no Origins import:

```java
for (ResourceLocation source : container.sourcesOf(powerId)) {
    if (PowerSources.isKnown(source)) { … }
}
```

## React to a change

There is no event bus. The hook is a power: give the origin a power of the type you care about and let Apoli call you.

- When something should happen to a player who has origin X, write a power type, put it in the origin, and use its `tick`, `onAdded` and `onRemoved`.
- When something should happen as the player chooses, use `entity_action_chosen` on `apoli:action_on_callback`, which runs once the player has chosen. `ActionOnCallbackPower.fireChosen(entity, fromOrb)` is the static method that raises it, if your own flow needs to.

> [!WARNING]
> `onAdded` doesn't run on login. It only runs from `addPower`, when the first source is added. A container loaded from NBT fills itself through its codec, and the pass Origins makes when a player joins reconciles instead of adding powers again, so a returning player's powers never pass through `onAdded` again.
>
> Any `static` set or map filled in `onAdded` is therefore empty for every player after a restart: the power still works in the session it was granted in, and never again. If you need every entity that currently has your power, get it from `PoweredEntities.forEach(...)`, which `attachOwner` keeps up to date as well as `addPower`, and cache the result for each `level.getGameTime()`. One pass per tick over the powered entities beats scanning every entity anyway.

If you have to react outside the power system, `OriginManager.reapplyAll(serverPlayer)` is what Origins itself calls after a reload, and calling it runs the whole grant pass again.

## Declaring the dependency

Make Origins optional unless your addon is meaningless without it:

```json
{
  "depends":    { "apoli": ">=1.93.0" },
  "recommends": { "origins": "*" }
}
```

Then keep every Origins import in its own class, reached only behind a check that Origins is loaded, so the classloader never touches it when Origins is absent. That is the [gated compat module](/docs/compat/writing-compat/gated-modules) pattern.
