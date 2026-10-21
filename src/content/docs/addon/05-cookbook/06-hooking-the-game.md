---
title: Hooking the game
description: "Making vanilla respect a power without fighting every other mod for the same instruction."
---

Most of Apoli is mixins into vanilla that ask whether an entity has a power, and the answer shapes what vanilla does next. Writing one is mechanical. Writing one that coexists with the rest of a 200-mod pack is the part worth getting right.

## The shape of a power mixin

Three rules make a hook cheap and safe: hold an interned ID, ask `PowerLookup`, and put the vanilla answer first so the lookup is skipped whenever vanilla already agrees.

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

`original ||` does real work. It short-circuits, so the power lookup only runs for the entities vanilla said no for, and `hasActive` itself returns early on a missing or empty container before it touches anything.

## Never redirect a contested call

`@Redirect` claims an instruction for itself alone. If two mods redirect the same call, Mixin logs this:

```
@Redirect conflict. Skipping <yours> … already redirected by <theirs>
```

Your injector then fails its own require check and takes the game down at startup with `Critical injection failure … (0/1) succeeded`. Which mod loses depends on the order mixins are applied in, which nobody controls.

Use the MixinExtras injectors instead. Both loaders bundle them, so there is nothing to add to your build:

| Instead of | Use | Because |
| --- | --- | --- |
| A `@Redirect` that only changes the value afterwards | `@ModifyExpressionValue` | It never claims the instruction and works alongside anyone. |
| A `@Redirect` that needs to call the original | `@WrapOperation` | It chains with other wrappers. |
| A `@Redirect` on a void call | `@WrapOperation` | The same reason. |
| An `@Inject` with a captured local | `@Local` | It survives a changed signature. |

`@ModifyExpressionValue` is the safest of these. It doesn't replace the instruction at all, and inserts a call to your handler after it. So it still finds its target when another mod has already redirected the call, and modifies whatever value that mod produced, and it never stops another mod's `@Redirect` from applying either. It works in both application orders, which `@Redirect` doesn't.

> [!TIP]
> Prefer a specific target. `ItemStack.is(Item)` appears all over the place, while `ElytraItem.isFlyEnabled(ItemStack)` appears once. The more specific the descriptor, the less likely you are to land on the wrong call after someone else injects into the method.

## Gate a mixin on another mod

A mixin that targets a class from an optional dependency must not be applied when that mod is absent, and the check must never load a class:

```java
@Override
public boolean shouldApplyMixin(String targetClassName, String mixinClassName) {
    return getClass().getClassLoader()
        .getResource("dev/emi/trinkets/api/TrinketComponent.class") != null;
}
```

`Class.forName` in a mixin config plugin defines the class and its vanilla supertypes far too early, which breaks other mods' mixins on those supertypes and crashes the game. Check for the `.class` resource, or use the loader's `isModLoaded`. The full pattern is in [gated compat modules](/docs/compat/writing-compat/gated-modules).

## Matching the target method

Two things that cost an evening each:

- Write the full descriptor. A bare method name matches nothing when the method is overloaded, and Mixin reports it as `Scanned 0 target(s)` instead of as an ambiguity. Put the whole signature in `method = "…"`, and pull it into a `private static final String` when two injectors share it.
- Check `compatibilityLevel`. A `JAVA_21` mixin config in a 1.20.1 tree stops the game from starting. Match the Java level the target version actually compiles against.

## The early-out ladder

A mixin body is the hottest code you will write, because it runs inside a vanilla method that was already hot enough to be worth patching. Every built-in type uses the same order:

1. The cheapest vanilla answer comes first, because it short-circuits everything else.
2. Then the container checks, which allocate nothing and cost two field reads.
3. Then the type index, which is O(1) and doesn't scan.
4. Only after that come conditions, contexts and reads from the level.

```java
if (original) return true;

PowerContainer container = PowerContainer.of(entity);
if (container == null || container.isEmpty()) return false;

List<ResourceLocation> powers = container.powersOfType(GLIDE);
if (powers.isEmpty()) return false;
```

`PowerLookup.hasActive` is this whole ladder in one call, so prefer it over writing your own.

Some things look harmless in a body that runs for every entity every tick, and aren't: `MyMod.id("glide")`, which allocates a `ResourceLocation` on every call (use a constant), `Set.copyOf` or `List.copyOf` on the way in, a stream, an `Optional` chain, and any registry or tag lookup that could have been resolved at load time.

## Client or server?

Decide which side the hook belongs on, and say so:

- Gameplay that must be authoritative goes on the server, which syncs the result.
- Rendering goes on the client, and should read a flag the server already decided instead of evaluating a condition again, because conditions that read inventories or other players answer differently on each side.
- A `@Mixin` on a client-only class needs `@Environment(EnvType.CLIENT)` on Fabric or `@OnlyIn(Dist.CLIENT)` on NeoForge, and its entry must live in the client mixin config, not the common one.

See [loaders and versions](/docs/addon/loaders/per-loader) for the rest of the differences between loaders.
