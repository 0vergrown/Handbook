---
title: "A redirect nobody can win"
description: "Apoli 1.93.0 and Origins 1.43.0: the elytra mixin stops fighting other mods for the same instruction, apoli:crafting_table stays open, Water Protection buys time instead of softening hits, and the addon docs gain a cookbook."
date: 2026-09-22
author: Overgrown
---

This is Apoli 1.93.0 and Origins 1.43.0: a crash on startup that was never really Apoli's fault and never really the other mod's either, a portable crafting table that closed itself, and a rebalance of Hydrophobia that a player suggested.

## A redirect nobody can win

Someone launched with Apoli and [Clockwork](https://modrinth.com/mod/clockwork) and got this:

```
@Redirect conflict. Skipping apoli.mixins.json:flag.LocalPlayerElytraMixin …
    already redirected by clockwork.neoforge.mixins.json:LocalPlayerGlideMixin
…
Critical injection failure: Redirector apoli$canElytraFly … (0/1) succeeded.
```

Both mods want the same thing from the same instruction. `LocalPlayer.aiStep` asks the chest slot whether it can glide before it tells the server you pressed jump. Apoli wants a power to be able to say yes, and Clockwork wants its own wings to say yes, and both reached for `@Redirect`.

`@Redirect` claims an instruction for itself alone, so two of them on the same call is a fight. Mixin picks whichever applied first and logs a warning at the loser, and then the loser's own require check fails and takes the game down before the title screen. Which mod loses depends on the order mixins are applied in, which nobody controls, so this was a coin toss that landed on Apoli.

Winning the fight wasn't the answer. The answer was to stop having one. All three trees now use MixinExtras' `@ModifyExpressionValue` instead:

```java
@ModifyExpressionValue(method = "aiStep", at = @At(value = "INVOKE",
    target = "Lnet/minecraft/world/item/ItemStack;canElytraFly(Lnet/minecraft/world/entity/LivingEntity;)Z",
    remap = false))
private boolean apoli$canElytraFly(boolean original) {
    return original || PowerLookup.hasActive((LivingEntity) (Object) this, ApoliIds.ELYTRA_FLIGHT);
}
```

That injector never replaces the instruction. It inserts a call to the handler after it, so it modifies whatever value came out, whether that's vanilla's or another mod's redirect. It works whichever order the two mods apply in, and it never stops Clockwork's redirect from applying either. Apoli's `elytra_flight` and Clockwork's gliders now work together, and either one saying yes is enough.

The same change went to the two Fabric trees, which had the identical collision waiting on `ItemStack.is` and `ElytraItem.isFlyEnabled`, and to the three remaining `@Redirect`s in the pose and elytra render path, the ones animation and cosmetic wing mods are most likely to want.

`original ||` is doing real work there, by the way. It short-circuits, so the power lookup only runs for players vanilla already said no for.

## The crafting table that closed itself

`apoli:crafting_table` opened a 3×3 grid and then shut it again on the next tick.

Vanilla's `CraftingMenu` only stays open while there's a crafting table at the position it was opened at, and the action was handing it the player's position. `stillValid` looked there, found grass, and the server closed the screen, correctly by its own rules.

The obvious fix is to hand it a null position instead, and that's worse. The same object is what `removed` uses to give you your items back and what `slotsChanged` uses to work out the result, so a null one loses the grid's contents and never computes a recipe. The menu is now a small subclass that keeps a real position and answers `true` to `stillValid`, the way the inventory menu does. Items come back on close, the recipe preview works, and walking away no longer shuts it.

## Water Protection buys time, not armour

This one came in as a player suggestion, and their reasoning was better than the version we shipped:

> Hydrophobia doesn't do enough damage to justify damage reduction. At only 2 points of damage, having Water Prot 4 pretty much handled everything… I believe all origins should never have a way to remove a weakness without an equal loss.

They were right. Water Protection did two things, delaying the hits and softening them, and the softening was most of the value. Four combined levels took each hit from 2 down to 1.68, and a full set took it to 0.72, which turned a 10 second death into a 28 second one before you even counted the delay.

From 1.43.0 it does exactly one thing: each combined level adds 0.3 seconds to the gap between hits, up to 8 levels.

| Combined level | Gap | Time to lose full health |
| --- | --- | --- |
| 0 | 1 s | about 10 s |
| 4 | 2.2 s | about 22 s |
| 8 or more | 3.4 s | about 34 s |

Every hit is a flat 2 damage at every level. The cap at 8 means two pieces of Water Protection IV already buy the whole 3.4 seconds, so the other two slots are free for Protection against everything that isn't water, which is the trade the enchantment is supposed to be about.

Nothing else moved. The first hit still lands on the tick you touch water, with no grace second, the clock still runs while you're on dry land so you can't tap in and out of a pool, and Conduit Power is still the only thing that makes you immune. A conduit stays where you build it, so it can't follow you around.

The whole mechanic is still one power file you can edit. See [Water Protection](/docs/datapack/origins/water-protection).

## Docs

Two things in the Handbook were actively wrong, and both were the kind of wrong that wastes an afternoon.

Badge sprites: every badge example pointed at `origins:textures/gui/badge/active.png`, which doesn't exist. Every icon Origins ships lives in a set folder, so the real path is `origins:textures/gui/badge/isaacfanta/active.png`. The [badges guide](/docs/datapack/origins/badges) now lists all 75 sprites in both sets, `isaacfanta` and `silent`, with their real paths.

Badge type IDs: the four badge pages had been rewritten to say `apoli:tooltip`, `apoli:sprite` and so on. Badges are Origins types, so the IDs are `origins:tooltip`, `origins:sprite`, `origins:keybind` and `origins:crafting_recipe`, and the `apoli:` spelling is rejected outright with "Unknown badge type". That's fixed on all four pages, and in the script that had been rewriting them.

The addon side also got a cookbook. Someone asked "is there a good way to get all the powers of an origin from Java?", which turned out to have a one-line answer nobody could find. There's now a [Cookbook](/docs/addon/cookbook/overview) section that answers questions in the shape people ask them: [detecting, granting and suppressing powers](/docs/addon/cookbook/powers-on-an-entity), [origins from Java](/docs/addon/cookbook/origins-from-java) (including how to do it without a dependency on Origins), a worked [action](/docs/addon/cookbook/writing-actions) and [condition](/docs/addon/cookbook/writing-conditions) of every flavour, and [hooking the game](/docs/addon/cookbook/hooking-the-game), which is where the `@Redirect` story above became a rule.

Alongside it, [Reading powers](/docs/addon/systems/reading-powers) and [The Origins API](/docs/addon/api/origins-api) are new reference pages, and Contexts, Actions & conditions and The power container were rewritten against the actual source. A few things they used to claim were simply untrue: `EntityCtx.living()` returns `null` for an entity that isn't living instead of throwing, and `onAdded` doesn't fire when a player logs back in, which quietly empties any static registry built from it after every restart.
