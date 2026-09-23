---
title: The Origins API
description: Read a player's origin and layers from Java, list an origin's powers, and grant or revoke one.
---

Origins is itself an Apoli addon, and everything it adds is reachable from another mod. This page covers the parts worth depending on. Everything here lives under `dev.overgrown.origins`.

> **You often don't need this.** If all you want is "which powers does this source hand out", [`PowerSources.powersOf`](/docs/addon/systems/reading-powers#from-a-source-back-to-its-powers) answers it for origins and layers with **no** compile dependency on Origins at all. Reach for this page when you need origins specifically — their names, impact, layers, or the act of choosing one.

## Getting all the powers of an origin

An `Origin` is a record, and it knows its own powers:

```java
import dev.overgrown.origins.origin.Origin;
import dev.overgrown.origins.origin.OriginRegistry;

Origin origin = OriginRegistry.get(ResourceLocation.parse("origins:enderian"));
if (origin == null) return;                 // no pack defines it

List<ResourceLocation> powers = origin.powers();
```

`powers()` is the flat list of every power id the origin grants, including the ones behind a condition. If you want the list **as a particular player sees it** — with conditioned entries filtered by whether they currently apply — use:

```java
List<ResourceLocation> visible = origin.powersFor(player);
```

That is the difference between "what this origin can grant" (a wiki listing, a validity check) and "what this player is being shown" (a GUI). Neither is the same as *what the player actually has* — for that, read the [power container](/docs/addon/systems/power-container), because commands, skill trees and other origins can add to it.

Both come from `origin.powerEntries()`, a `List<OriginPowerEntry>` where each entry is a nullable `EntityCondition` plus a list of power ids. Walk that yourself if you need the grouping:

```java
for (OriginPowerEntry entry : origin.powerEntries()) {
    boolean shown = entry.visible(player);   // true when there is no condition
    for (ResourceLocation id : entry.powers()) { … }
}
```

## The rest of the `Origin` record

```java
ResourceLocation id      = origin.id();
IconData icon            = origin.icon();
Impact impact            = origin.impact();        // NONE / LOW / MEDIUM / HIGH
int order                = origin.order();
boolean unchoosable      = origin.unchoosable();
boolean special          = origin.special();
int maxPlayers           = origin.maxPlayers();
List<OriginUpgrade> ups  = origin.upgrades();
List<String> tags        = origin.tags();
boolean tagged           = origin.hasTag("my_pack:aquatic");
```

`OriginRegistry` is the whole-registry view:

```java
Collection<Origin> all = OriginRegistry.all();
boolean exists         = OriginRegistry.contains(id);
Origin orEmpty         = OriginRegistry.getOrEmpty(id);   // never null
int count              = OriginRegistry.size();
```

`OriginRegistry.EMPTY_ID` (`origins:empty`) is the placeholder a layer holds before anything is chosen. Treat it as "no origin", not as an origin.

## What origin does this player have?

Use `OriginView`. It is the only reader that is correct on **both sides** — on the client it reads the synced state, on the server the attachment — so it is what you want in a render path as well as in a command.

```java
import dev.overgrown.origins.origin.OriginView;

// every layer the player has chosen in: layer id -> origin id
Map<ResourceLocation, ResourceLocation> chosen = OriginView.chosen(player);

// the origin actually in force on one layer, swaps included; null when none
ResourceLocation active = OriginView.activeOn(player, Origins.id("origin"));

// does the player hold this origin on any layer?
boolean isEnderian = OriginView.holds(player, Origins.id("enderian"));
```

| Method | Answers |
| --- | --- |
| `chosen(player)` | layer → origin, as chosen |
| `swaps(player)` | layer → the origin temporarily swapped in |
| `activeOn(player, layerId)` | the origin in force on a layer — a swap wins over the choice |
| `holds(player, originId)` | is this origin chosen or swapped in, on any layer |
| `pool(player)` | the origins granted into the player's swap pools |
| `inPool(player, originId)` | is this origin in one of those pools |
| `impactOn(player, layerId)` | the impact level of the active origin, `0` when none |
| `layerCount(player)` | how many layers the player has a real origin on |

`chosen` returns the raw choice; `activeOn` applies swaps on top. Most gameplay checks want `activeOn` or `holds`.

Putting the two halves together — every power an origin grants a specific player, on a specific layer:

```java
ResourceLocation originId = OriginView.activeOn(player, layerId);
Origin origin = originId == null ? null : OriginRegistry.get(originId);
List<ResourceLocation> powers = origin == null ? List.of() : origin.powersFor(player);
```

## Layers

```java
import dev.overgrown.origins.origin.OriginLayer;
import dev.overgrown.origins.origin.OriginLayers;

OriginLayer layer            = OriginLayers.get(layerId);      // null if none
Collection<OriginLayer> all  = OriginLayers.all();
List<OriginLayer> ordered    = OriginLayers.enabledOrdered();  // in display order
List<OriginLayer> forPlayer  = OriginLayers.enabledFor(player);
```

A layer knows which origins belong to it:

```java
List<ResourceLocation> every     = layer.allOrigins();
List<ResourceLocation> available = layer.availableOrigins(player);  // conditions applied
Component name                   = layer.name();
boolean swappable                = layer.swappable();
```

`allOrigins()` is every member; `availableOrigins(player)` is the subset whose conditions pass for that player — the list the choose screen builds from.

## Changing a player's origin

The mutating side is server-only and lives on `OriginManager`. Go through it rather than writing the attachment yourself: it revokes the old origin's powers, grants the new one's, fires the swap callbacks, re-checks layers that depend on the choice, and syncs.

```java
import dev.overgrown.origins.origin.OriginManager;

OriginManager.chooseOrigin(serverPlayer, layerId, originId, false); // last arg: came from an orb
OriginManager.removeOrigin(serverPlayer, layerId);
OriginManager.reapplyAll(serverPlayer);        // re-grant everything from scratch
OriginManager.reconcileLayers(serverPlayer);   // after a /reload or a pack change
boolean ok = OriginManager.upgradeOrigin(serverPlayer, layerId, originId);
boolean moved = OriginManager.transferOrigin(donor, recipient, fromLayer, toLayer, copy);
```

`reapplyAll` is the hammer: it is what `/reload` and a re-login run, and it is the right call after your mod changes something an origin's conditions depend on.

## Badges

Badges are Origins' annotation layer on a power. Four types ship — `origins:sprite`, `origins:tooltip`, `origins:keybind` and `origins:crafting_recipe` — and the set is **closed**: `BadgeTypes` registers them itself and the registration method is private, so an addon cannot add a fifth. A badge is sent to the client with the origin, so a new type would need a codec, a network reader and a renderer on both sides.

What you can read:

```java
Map<ResourceLocation, Badge> standalone = BadgeManager.STANDALONE;  // data/<ns>/badges/*.json
Map<ResourceLocation, List<Badge>> byPower = BadgeManager.BY_POWER; // inline `badges` arrays
```

`BadgeManager.collectForSend(server)` builds the map that actually goes over the wire, and it is where the automatic keybind and crafting-recipe badges are generated for powers that declared none. See the [badges guide](/docs/datapack/origins/badges) for the data-pack side, including the sprite paths Origins ships.

## Depending on Origins

Origins is an ordinary mod dependency, but make it an **optional** one unless your addon is useless without it:

```json
{
  "depends":    { "apoli": ">=1.93.0" },
  "recommends": { "origins": "*" }
}
```

Then gate every touch of the Origins classes behind a loaded-check, and keep those touches in their own class so the classloader never sees them when Origins is absent. That is the same pattern as any other [gated compat module](/docs/compat/writing-compat/gated-modules).
