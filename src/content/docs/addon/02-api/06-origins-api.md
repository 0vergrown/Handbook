---
title: The Origins API
description: "Reading a player's origin and layers from Java, listing an origin's powers, and granting or revoking one."
---

Origins is itself an Apoli addon, and everything it adds can be reached from another mod. This page covers the parts worth depending on, all under `dev.overgrown.origins`.

> [!TIP]
> You often don't need this. If all you want is the list of powers a source hands out, [`PowerSources.powersOf`](/docs/addon/systems/reading-powers#from-a-source-back-to-its-powers) answers it for origins and layers with no compile dependency on Origins at all. Use this page when you need origins specifically: their names, impact, layers, or choosing one.

## Getting all the powers of an origin

An `Origin` is a record, and it knows its own powers. `OriginRegistry.get` returns null when no pack defines the origin:

```java
import dev.overgrown.origins.origin.Origin;
import dev.overgrown.origins.origin.OriginRegistry;

Origin origin = OriginRegistry.get(ResourceLocation.parse("origins:enderian"));
if (origin == null) return;

List<ResourceLocation> powers = origin.powers();
```

`powers()` is the flat list of every power ID the origin grants, including the ones behind a condition. For the list as a particular player sees it, with conditioned entries filtered by whether they currently apply, use:

```java
List<ResourceLocation> visible = origin.powersFor(player);
```

That is the difference between what this origin can grant (for a wiki listing or a validity check) and what this player is being shown (for a screen). Neither is the same as what the player actually has. For that, read the [power container](/docs/addon/systems/power-container), because commands, skill trees and other origins can add to it.

Both come from `origin.powerEntries()`, a `List<OriginPowerEntry>` in which each entry is a nullable `EntityCondition` plus a list of power IDs. `entry.visible(player)` is `true` when the entry has no condition or its condition passes. Walk the entries yourself if you need the grouping:

```java
for (OriginPowerEntry entry : origin.powerEntries()) {
    boolean shown = entry.visible(player);
    for (ResourceLocation id : entry.powers()) { … }
}
```

## The rest of the `Origin` record

```java
ResourceLocation id      = origin.id();
IconData icon            = origin.icon();
Impact impact            = origin.impact();
int order                = origin.order();
boolean unchoosable      = origin.unchoosable();
boolean special          = origin.special();
int maxPlayers           = origin.maxPlayers();
List<OriginUpgrade> ups  = origin.upgrades();
List<String> tags        = origin.tags();
boolean tagged           = origin.hasTag("my_pack:aquatic");
```

`Impact` is one of `NONE`, `LOW`, `MEDIUM` and `HIGH`. `OriginRegistry` is the view of the whole registry, and `getOrEmpty` never returns null:

```java
Collection<Origin> all = OriginRegistry.all();
boolean exists         = OriginRegistry.contains(id);
Origin orEmpty         = OriginRegistry.getOrEmpty(id);
int count              = OriginRegistry.size();
```

`OriginRegistry.EMPTY_ID` (`origins:empty`) is the placeholder a layer holds before anything is chosen. Treat it as no origin at all.

## What origin does this player have?

Use `OriginView`. It is the only reader that is correct on both sides, since it reads the synced state on the client and the attachment on the server, so it is what you want in a render path as well as in a command:

```java
import dev.overgrown.origins.origin.OriginView;

Map<ResourceLocation, ResourceLocation> chosen = OriginView.chosen(player);

ResourceLocation active = OriginView.activeOn(player, Origins.id("origin"));

boolean isEnderian = OriginView.holds(player, Origins.id("enderian"));
```

`chosen` maps each layer the player has chosen in to its origin, `activeOn` gives the origin in force on one layer, swaps included, or null when there is none, and `holds` checks whether the player has the origin on any layer.

| Method | Answers |
| --- | --- |
| `chosen(player)` | Each layer and its origin, as chosen |
| `swaps(player)` | Each layer and the origin temporarily swapped in |
| `activeOn(player, layerId)` | The origin in force on a layer, where a swap wins over the choice |
| `holds(player, originId)` | Whether this origin is chosen or swapped in, on any layer |
| `pool(player)` | The origins granted into the player's swap pools |
| `inPool(player, originId)` | Whether this origin is in one of those pools |
| `impactOn(player, layerId)` | The impact level of the active origin, or `0` when there is none |
| `layerCount(player)` | How many layers the player has a real origin on |

`chosen` returns the raw choice, and `activeOn` applies swaps on top. Most gameplay checks want `activeOn` or `holds`.

Putting the two halves together gives every power an origin grants a specific player, on a specific layer:

```java
ResourceLocation originId = OriginView.activeOn(player, layerId);
Origin origin = originId == null ? null : OriginRegistry.get(originId);
List<ResourceLocation> powers = origin == null ? List.of() : origin.powersFor(player);
```

## Layers

```java
import dev.overgrown.origins.origin.OriginLayer;
import dev.overgrown.origins.origin.OriginLayers;

OriginLayer layer            = OriginLayers.get(layerId);
Collection<OriginLayer> all  = OriginLayers.all();
List<OriginLayer> ordered    = OriginLayers.enabledOrdered();
List<OriginLayer> forPlayer  = OriginLayers.enabledFor(player);
```

`OriginLayers.get` returns null when there is no such layer, and `enabledOrdered` lists the enabled layers in display order.

A layer knows which origins belong to it:

```java
List<ResourceLocation> every     = layer.allOrigins();
List<ResourceLocation> available = layer.availableOrigins(player);
Component name                   = layer.name();
boolean swappable                = layer.swappable();
```

`allOrigins()` is every member, and `availableOrigins(player)` is the subset whose conditions pass for that player, which is the list the choose screen builds from.

## Changing a player's origin

The side that changes things is server-only and lives on `OriginManager`. Go through it instead of writing the attachment yourself: it revokes the old origin's powers, grants the new one's, runs the swap callbacks, checks again the layers that depend on the choice, and syncs.

```java
import dev.overgrown.origins.origin.OriginManager;

OriginManager.chooseOrigin(serverPlayer, layerId, originId, false);
OriginManager.removeOrigin(serverPlayer, layerId);
OriginManager.reapplyAll(serverPlayer);
OriginManager.reconcileLayers(serverPlayer);
boolean ok = OriginManager.upgradeOrigin(serverPlayer, layerId, originId);
boolean moved = OriginManager.transferOrigin(donor, recipient, fromLayer, toLayer, copy);
```

The last argument of `chooseOrigin` says whether the choice came from an orb. `reapplyAll` grants everything again from scratch, and `reconcileLayers` is for after a `/reload` or a pack change.

`reapplyAll` is the heavy option. It is what `/reload` and a relog run, and it is the right call after your mod changes something an origin's conditions depend on.

## Badges

Badges are how Origins annotates a power. Four types ship, `origins:sprite`, `origins:tooltip`, `origins:keybind` and `origins:crafting_recipe`, and the set is closed: `BadgeTypes` registers them itself and its registration method is private, so an addon can't add a fifth. A badge is sent to the client with the origin, so a new type would need a codec, a network reader and a renderer on both sides.

You can read the standalone badges from `data/<ns>/badges/*.json` and the inline `badges` arrays of each power:

```java
Map<ResourceLocation, Badge> standalone = BadgeManager.STANDALONE;
Map<ResourceLocation, List<Badge>> byPower = BadgeManager.BY_POWER;
```

`BadgeManager.collectForSend(server)` builds the map that actually goes over the network, and it is where the automatic keybind and crafting recipe badges are made for powers that declared none. See the [badges guide](/docs/datapack/origins/badges) for the data pack side, including the sprite paths Origins ships.

## Depending on Origins

Origins is an ordinary mod dependency, but make it an optional one unless your addon is useless without it:

```json
{
  "depends":    { "apoli": ">=1.93.0" },
  "recommends": { "origins": "*" }
}
```

Then put every use of the Origins classes behind a check that Origins is loaded, and keep those uses in their own class so the classloader never sees them when Origins is absent. It is the same pattern as any other [gated compat module](/docs/compat/writing-compat/gated-modules).
