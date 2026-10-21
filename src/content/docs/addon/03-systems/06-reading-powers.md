---
title: Reading powers
description: "Detecting a power on an entity, reading its config, finding out who granted it, and going from a source back to its powers."
---

Three questions come up all the time in addon code, and they have three different answers:

| Question | Use |
| --- | --- |
| Is this power doing something right now? | `PowerLookup.hasActive` |
| Is this power attached, active or not? | `PowerContainer.hasPower` |
| What powers does this origin, skill tree or `multiple` hand out? | `PowerSources.powersOf` |

## Is a power active?

Active means all three of these: attached, not [suppressed](/docs/addon/systems/power-container#suppression), and its own `condition` passes right now. That is what every built-in handler means when it asks, and `PowerLookup` is the one place it is implemented:

```java
import dev.overgrown.apoli.power.ApoliIds;
import dev.overgrown.apoli.power.PowerLookup;

if (PowerLookup.hasActive(entity, ApoliIds.ELYTRA_FLIGHT)) {
    allowGliding(entity);
}
```

`hasActive` takes a plain `Entity` and a canonical type ID, accepts `null`, and returns early on a missing or empty container before it allocates anything. It is safe on a hot path.

For your own types, intern the ID once:

```java
private static final ResourceLocation GLIDE = MyMod.id("glide");
```

> [!WARNING]
> Never write `PowerLookup.hasActive(entity, MyMod.id("glide"))` inline in a tick or render method, because that builds a `ResourceLocation` on every call. Use constants only.

## Reading the config of the power that matched

`hasActive` only answers yes or no. When you need the fields, ask for the config and pass the class you registered the type with. `firstActive` returns the first active config, or null:

```java
GlidePower.Cfg cfg = PowerLookup.firstActive(entity, GLIDE, GlidePower.Cfg.class);
if (cfg != null) speed = cfg.speed();
```

`forEach` runs for every active one, so you can fold them together:

```java
PowerLookup.forEach(entity, GLIDE, GlidePower.Cfg.class, cfg -> total += cfg.speed());
```

`forEachEntry` also passes the power ID, for attribution, cooldowns and resources:

```java
PowerLookup.forEachEntry(entity, GLIDE, GlidePower.Cfg.class, (powerId, cfg) -> {
    holder.setAuxInt(powerId, cfg.duration());
});
```

The full set:

| Method | Returns |
| --- | --- |
| `hasActive(entity, typeId)` | A `boolean`: whether any power of that type is active |
| `firstActive(entity, typeId, cfgClass)` | The first active config, or `null` |
| `anyActive(entity, typeId, cfgClass, predicate)` | A `boolean`: whether any active config passes a test |
| `forEach(entity, typeId, cfgClass, consumer)` | Runs a consumer for each active config |
| `forEachEntry(entity, typeId, cfgClass, biConsumer)` | The same, with the power ID |
| `collect(entity, typeId, cfgClass, out)` | Adds the active configs to a list you supply |
| `active(entity, typeId, cfgClass)` | A new `List` of active configs |

`collect` into a reused list is the one that doesn't allocate. `active` allocates, so keep it for cold paths.

`forEach`, `forEachEntry` and `active` push the power onto the attribution stack around the callback, so damage, block changes and grants that happen inside are credited to that power in the ledger. `hasActive`, `firstActive`, `anyActive` and `collect` don't, so if your effect needs attribution, run it inside a `forEach`.

## Is a power merely attached?

For the question of whether a power is on the entity at all, as for a list in a screen, a command or a persistence check, go through the container directly. It doesn't check suppression or the power's condition, so the power may be suppressed or switched off by its condition:

```java
PowerContainer container = PowerContainer.of(entity);
if (container != null && container.hasPower(powerId)) {
    listPower(powerId);
}
```

## Reading the power definition itself

A power ID maps to a loaded `Power` record, the parsed data pack file, shared by every entity that has it. `ApoliPowers.get` returns null when no pack defines the power:

```java
import dev.overgrown.apoli.power.ApoliPowers;
import dev.overgrown.apoli.power.Power;

Power power = ApoliPowers.get(powerId);
if (power == null) return;

ResourceLocation typeId = power.typeId();
Object config          = power.config();
Component name         = power.displayName(powerId);
Component description  = power.displayDescription(powerId);
boolean hidden         = power.hidden();
List<String> tags      = power.tags();
Optional<EntityCondition> gate = power.condition();
```

`typeId()` is canonical, with aliases already resolved, and you cast `config()` to your own `Cfg`. `displayName` and `displayDescription` fall back to the automatic translation keys `power.<namespace>.<path>.name` and `.description` when the file has no `name` or `description`, so you never have to build those keys yourself.

Other useful statics:

```java
Map<ResourceLocation, Power> all = ApoliPowers.view();
Set<ResourceLocation> grantable  = ApoliPowers.grantableIds();
List<ResourceLocation> tagged    = ApoliPowers.withTag("my_pack:flight");
boolean isSub = ApoliPowers.isSubPower(id);
boolean any   = ApoliPowers.anyOfType(GLIDE);
int gen       = ApoliPowers.generation();
```

`view()` holds every loaded power, and `grantableIds()` the same without sub-powers. `isSubPower` is true for a child of an `apoli:multiple`, and `anyOfType` says whether any loaded power has that type at all.

`generation()` is the reload counter, which goes up on every reload. If you build your own index over `ApoliPowers.view()`, store the generation you built it at and rebuild when it changes. That is how the built-in caches survive `/reload`.

## Who granted it?

Every power on a container is held by one or more sources:

```java
Set<ResourceLocation> sources = container.sourcesOf(powerId);
Set<ResourceLocation> every   = container.allSources();
```

A source ID is only an ID, with no registry behind it. Origins uses the origin's ID, skill trees use the tree's, `apoli:multiple` uses the parent power's, and `/apoli:power grant` uses whatever the command was given.

## From a source back to its powers

This is the reverse lookup, and it is the one to use when you want everything an origin hands out without depending on Origins. `powersOf` returns null for a source it doesn't know:

```java
import dev.overgrown.apoli.power.PowerSources;

Set<ResourceLocation> powers = PowerSources.powersOf(sourceId);
Set<ResourceLocation> all    = PowerSources.powersOfAll(sourceIds);
boolean known                = PowerSources.isKnown(sourceId);
List<ResourceLocation> ids   = PowerSources.knownSources();
```

Apoli registers two providers itself, one for [`apoli:multiple`](/docs/datapack/powers/multiple) (a `multiple` power is a source for its sub-powers) and one for skill trees. Origins registers a third for origins and layers. So `PowerSources.powersOf` with the ID `origins:enderian` works from a mod that has no compile dependency on Origins at all.

### Registering your own provider

If your mod grants powers from something of its own, such as a class system, an artefact or a prestige tier, tell Apoli about it and every feature that knows about sources picks it up at once: `/apoli:power has` (which lists each power with its sources), `grant_all`, the ledger, and the reverse lookups of other addons.

```java
PowerSources.register(new PowerSources.Provider() {
    @Override
    public @Nullable Collection<ResourceLocation> powersOf(ResourceLocation sourceId) {
        ClassDef def = ClassRegistry.get(sourceId);
        return def == null ? null : def.powers();
    }

    @Override
    public void collectSources(Collection<ResourceLocation> out) {
        for (ClassDef def : ClassRegistry.all()) out.add(def.id());
    }
});
```

Return `null`, not an empty set, for a source you don't recognise, so the next provider gets a turn. Register once, during mod initialisation.

## Which keys a power uses

For screens and keybind work, `PowerKeys` reads the key fields out of a power without you knowing its type:

```java
String key = PowerKeys.activeKey(power);
boolean uses = PowerKeys.uses(power, "key.apoli.primary_active");
List<String> held = PowerKeys.keysHeldBy(container);
List<ResourceLocation> onKey = PowerKeys.heldPowersUsingKey(container, key);
```

`activeKey` returns the primary key, or null, and `keysHeldBy` lists every key the entity's powers bind.

This is what gives every keyed power an "Active" badge in the Origins screen without a list of types.

## Client versus server

Powers are synced, so `PowerContainer.of(entity)` and `PowerLookup.hasActive(...)` both work on the client and are the right way to drive rendering.

Two things don't survive the trip, and both cause bugs:

- Conditions that read state only the server has. A power's `condition` is evaluated wherever you ask. On the client, anything reading inventories, scoreboards or other players' state can answer differently from the server. Let the server decide and have the client only render the result, which is how all the built-in render powers work.
- Entity sets. [`apoli:in_entity_set`](/docs/datapack/bientity-conditions/in_entity_set) is always `false` on the client, because set membership is never synced. If a render path needs it, have the server grant a marker power and test for that instead.
