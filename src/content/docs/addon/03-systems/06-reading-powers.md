---
title: Reading powers
description: Detect a power on an entity, read its config, find out who granted it, and go from a source back to its powers.
---

Three questions come up constantly in addon code, and they have three different answers:

| Question | Use |
| --- | --- |
| Is this power *doing something* right now? | `PowerLookup.hasActive` |
| Is this power *attached*, active or not? | `PowerContainer.hasPower` |
| What powers does this origin / skill tree / `multiple` hand out? | `PowerSources.powersOf` |

## Is a power active?

**Active** means all three of: attached, not [suppressed](/docs/addon/systems/power-container#suppression), and its own `condition` passes right now. That is what every built-in handler means when it asks, and `PowerLookup` is the one place it is implemented:

```java
import dev.overgrown.apoli.power.ApoliIds;
import dev.overgrown.apoli.power.PowerLookup;

if (PowerLookup.hasActive(entity, ApoliIds.ELYTRA_FLIGHT)) {
    // …
}
```

`hasActive` takes a plain `Entity` and a **canonical type id**, tolerates `null`, and early-outs on a missing or empty container before it allocates anything. It is safe on a hot path.

For your own types, intern the id once:

```java
private static final ResourceLocation GLIDE = MyMod.id("glide");
```

> Never write `PowerLookup.hasActive(entity, MyMod.id("glide"))` inline in a tick or render method — that builds a `ResourceLocation` every call. Constants only.

## Reading the config of the power that matched

`hasActive` answers yes/no. When you need the *fields*, ask for the config and pass the class you registered the type with:

```java
// the first active one, or null
GlidePower.Cfg cfg = PowerLookup.firstActive(entity, GLIDE, GlidePower.Cfg.class);
if (cfg != null) speed = cfg.speed();
```

```java
// every active one, folded together
PowerLookup.forEach(entity, GLIDE, GlidePower.Cfg.class, cfg -> total += cfg.speed());
```

```java
// every active one, with the power id — for attribution, cooldowns, resources
PowerLookup.forEachEntry(entity, GLIDE, GlidePower.Cfg.class, (powerId, cfg) -> {
    holder.setAuxInt(powerId, cfg.duration());
});
```

The full set:

| Method | Returns |
| --- | --- |
| `hasActive(entity, typeId)` | `boolean` — any active power of that type |
| `firstActive(entity, typeId, cfgClass)` | the first active config, or `null` |
| `anyActive(entity, typeId, cfgClass, predicate)` | `boolean` — any active config matching a test |
| `forEach(entity, typeId, cfgClass, consumer)` | runs a consumer per active config |
| `forEachEntry(entity, typeId, cfgClass, biConsumer)` | the same, with the power id |
| `collect(entity, typeId, cfgClass, out)` | appends active configs to a list **you** supply |
| `active(entity, typeId, cfgClass)` | a new `List` of active configs |

`collect` into a reused list is the allocation-free one; `active` allocates and is for cold paths only.

`forEach`, `forEachEntry` and `active` push the power onto the attribution stack around the callback, so damage, block changes and grants that happen inside are credited to that power in the ledger. `hasActive`, `firstActive`, `anyActive` and `collect` do not — if your effect needs attribution, run it inside a `forEach`.

## Is a power merely attached?

For the "is it on the sheet" question — a GUI listing, a command, a persistence check — go through the container directly. It does **not** check suppression or the power's condition:

```java
PowerContainer container = PowerContainer.of(entity);
if (container != null && container.hasPower(powerId)) {
    // attached, but it may be suppressed or conditioned off
}
```

## Reading the power definition itself

A power id maps to a loaded `Power` record — the parsed data-pack file, shared by every entity that has it:

```java
import dev.overgrown.apoli.power.ApoliPowers;
import dev.overgrown.apoli.power.Power;

Power power = ApoliPowers.get(powerId);     // null when no pack defines it
if (power == null) return;

ResourceLocation typeId = power.typeId();   // canonical, aliases already resolved
Object config          = power.config();    // cast to your Cfg
Component name         = power.displayName(powerId);
Component description  = power.displayDescription(powerId);
boolean hidden         = power.hidden();
List<String> tags      = power.tags();
Optional<EntityCondition> gate = power.condition();
```

`displayName`/`displayDescription` fall back to the automatic translation keys `power.<namespace>.<path>.name` and `.description` when the file has no `name`/`description`, so you never have to build those keys yourself.

Other useful statics:

```java
Map<ResourceLocation, Power> all = ApoliPowers.view();   // every loaded power
Set<ResourceLocation> grantable  = ApoliPowers.grantableIds();  // minus sub-powers
List<ResourceLocation> tagged    = ApoliPowers.withTag("my_pack:flight");
boolean isSub = ApoliPowers.isSubPower(id);   // true for an apoli:multiple child
boolean any   = ApoliPowers.anyOfType(GLIDE); // is any loaded power of this type at all
int gen       = ApoliPowers.generation();     // bumps on every reload — cache key
```

`generation()` is the reload counter. If you build your own index over `ApoliPowers.view()`, store the generation you built it at and rebuild when it changes — that is how the built-in caches survive `/reload`.

## Who granted it?

Every power on a container is held by one or more **sources**:

```java
Set<ResourceLocation> sources = container.sourcesOf(powerId);
Set<ResourceLocation> every   = container.allSources();
```

A source id is just an id, with no registry behind it. Origins uses the origin's id, skill trees use the tree's, `apoli:multiple` uses the parent power's, and `/apoli:power grant` uses whatever the command was given.

## From a source back to its powers

This is the reverse lookup, and it is the one to reach for when you want "everything this origin hands out" without depending on Origins:

```java
import dev.overgrown.apoli.power.PowerSources;

Set<ResourceLocation> powers = PowerSources.powersOf(sourceId);   // null if unknown
Set<ResourceLocation> all    = PowerSources.powersOfAll(sourceIds);
boolean known                = PowerSources.isKnown(sourceId);
List<ResourceLocation> ids   = PowerSources.knownSources();
```

Apoli itself registers two providers — one for [`apoli:multiple`](/docs/datapack/powers/multiple) (a `multiple` power is a source for its sub-powers) and one for skill trees. Origins registers a third for origins and layers. So `PowerSources.powersOf(Origins.id("enderian"))` works from a mod that has no compile dependency on Origins at all.

### Registering your own provider

If your mod grants powers from something of its own — a class system, an artefact, a prestige tier — teach Apoli about it and every source-aware feature learns it at once: `/apoli:power sources`, `grant_all`, the ledger, and any other addon's reverse lookups.

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

Return `null` — not an empty set — for a source you do not recognise, so the next provider gets a turn. Register during mod init, once.

## Which keys a power uses

For GUI and keybind work, `PowerKeys` reads the key fields out of a power without you knowing which type it is:

```java
String key = PowerKeys.activeKey(power);            // the "primary" key, or null
boolean uses = PowerKeys.uses(power, "key.apoli.primary_active");
List<String> held = PowerKeys.keysHeldBy(container); // every key this entity's powers bind
List<ResourceLocation> onKey = PowerKeys.heldPowersUsingKey(container, key);
```

This is what gives every keyed power an "Active" badge in the Origins screen without a per-type list.

## Client versus server

Powers are synced, so `PowerContainer.of(entity)` and `PowerLookup.hasActive(...)` both work on the client and are the right way to drive rendering.

Two things do **not** survive the trip, and both bite:

- **Conditions that read server-only state.** A power's `condition` is evaluated wherever you ask. On the client, anything reading inventories, scoreboards or other players' state can answer differently from the server. Let the server decide and have the client only render the result — the built-in render powers all work that way.
- **Entity sets.** [`apoli:in_entity_set`](/docs/datapack/bientity-conditions/in_entity_set) is always `false` client-side, because set membership is never synced. If a render path needs it, have the server grant a marker power instead and test for that.
