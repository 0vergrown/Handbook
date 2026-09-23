---
title: Hooking the game
description: Make vanilla respect a power — without fighting every other mod for the same instruction.
---

Most of Apoli is mixins into vanilla that ask "does this entity have a power", and the answer shapes what vanilla does next. Writing one is mechanical; writing one that coexists with the rest of a 200-mod pack is the part worth getting right.

## The shape of a power mixin

Three rules make a hook cheap and safe: hold an interned id, ask `PowerLookup`, and put the vanilla answer first so the lookup is skipped whenever vanilla already agrees.

```java
@Mixin(LivingEntity.class)
public abstract class LivingEntityGlideMixin {

    @ModifyExpressionValue(method = "aiStep",
        at = @At(value = "INVOKE", target = "Lnet/minecraft/world/entity/LivingEntity;isFallFlying()Z"))
    private boolean mymod$glide(boolean original) {
        return original || PowerLookup.hasActive((LivingEntity) (Object) this, GLIDE);
    }
}
```

`original ||` is not just style. It short-circuits, so the power lookup only runs on the entities vanilla said no for — and `hasActive` itself early-outs on a missing or empty container before it touches anything.

## Never redirect a contested call

`@Redirect` claims an instruction **exclusively**. If two mods redirect the same call, Mixin logs

```
@Redirect conflict. Skipping <yours> … already redirected by <theirs>
```

and then your injector fails its own require check and takes the game down at boot with `Critical injection failure … (0/1) succeeded`. Whoever loses is decided by mixin application order, which nobody controls.

Use the MixinExtras injectors instead. They are bundled with both loaders, so there is nothing to add to your build:

| Instead of | Use | Because |
| --- | --- | --- |
| `@Redirect` that only post-processes the value | `@ModifyExpressionValue` | never claims the node; composes with anyone |
| `@Redirect` that needs to call the original | `@WrapOperation` | chains with other wrappers |
| `@Redirect` on a void call | `@WrapOperation` | same |
| `@Inject` + a captured local | `@Local` sugar | survives a changed signature |

`@ModifyExpressionValue` is the safest of the three: it does not replace the instruction at all, it inserts a call to your handler *after* it. That means it still finds its target when another mod has already redirected the call — it modifies whatever value that mod produced — and it never stops another mod's `@Redirect` from applying either. It works in both application orders, which `@Redirect` does not.

> Prefer a **specific** target. `ItemStack.is(Item)` appears all over the place; `ElytraItem.isFlyEnabled(ItemStack)` appears once. The more specific the descriptor, the less likely you are to land on the wrong call after someone else injects into the method.

## Gate a mixin on another mod

A mixin that targets a class from an optional dependency must not be applied when that mod is absent, and the check must never **load** a class:

```java
@Override
public boolean shouldApplyMixin(String targetClassName, String mixinClassName) {
    return getClass().getClassLoader()
        .getResource("dev/emi/trinkets/api/TrinketComponent.class") != null;
}
```

`Class.forName` in a mixin config plugin defines the class *and its vanilla supertypes* far too early, which breaks other mods' mixins on those supertypes and hard-crashes the game. Check for the `.class` **resource**, or use the loader's `isModLoaded`. The full pattern is in [gated compat modules](/docs/compat/writing-compat/gated-modules).

## Matching the target method

Two things that cost an evening each:

- **Write the full descriptor.** A bare method name matches nothing when the method is overloaded, and mixin reports it as `Scanned 0 target(s)` rather than as an ambiguity. Put the whole signature in `method = "…"`, and pull it into a `private static final String` when two injectors share it.
- **Check `compatibilityLevel`.** A `JAVA_21` mixin config in a 1.20.1 tree stops the game booting. Match the Java level the target version actually compiles against.

## The early-out ladder

A mixin body is the hottest code you will write: it runs inside a vanilla method that was already hot enough to be worth patching. The order that every built-in uses:

```java
// 1. the cheapest vanilla answer, first — it short-circuits everything else
if (original) return true;

// 2. the container gates — no allocation, two field reads
PowerContainer container = PowerContainer.of(entity);
if (container == null || container.isEmpty()) return false;

// 3. the type index — O(1), not a scan
List<ResourceLocation> powers = container.powersOfType(GLIDE);
if (powers.isEmpty()) return false;

// 4. only now: conditions, contexts, level reads
```

`PowerLookup.hasActive` is exactly this ladder in one call, so prefer it over hand-rolling.

Things that look harmless and are not, in a body that runs per entity per tick: `MyMod.id("glide")` (allocates a `ResourceLocation` every call — use a constant), `Set.copyOf` / `List.copyOf` on the way in, a stream, an `Optional` chain, and any registry or tag lookup that could have been resolved at load time.

## Client or server?

Decide which side the hook belongs on, and say so:

- Gameplay that must be authoritative goes on the **server** and syncs the result.
- Rendering goes on the **client**, and should read a flag the server already decided rather than re-evaluating a condition — conditions that read inventories or other players answer differently on each side.
- A `@Mixin` on a client-only class needs `@Environment(EnvType.CLIENT)` on Fabric or `@OnlyIn(Dist.CLIENT)` on NeoForge, and its entry must live in the client mixin config, not the common one.

See [loaders & versions](/docs/addon/loaders/per-loader) for the rest of the per-loader differences.
