---
title: "Glowing sets on servers, and swaps that follow their conditions"
description: "Apoli 1.115.5 and Origins 1.47.8: entity sets work in client-side conditions on dedicated servers, result_item_action acts on the result, accessory slots follow their condition, you hear your own replaced sounds, modify_velocity limits stop gravity building up, creative flight no longer grants fall immunity, and conditional swap pools, the swap key and the swap options all work."
date: 2026-10-14
author: Overgrown
---

Apoli **1.115.5** and Origins **1.47.8**, on Fabric 1.20.1, Fabric 1.21.1 and NeoForge 1.21.1. Update both mods together. On NeoForge a player with an older build of either one cannot join a server running the new one.

## Entity sets on dedicated servers

A bi-entity [`apoli:in_entity_set`](/docs/datapack/bientity-conditions/in_entity_set) check inside a power that the client evaluates did nothing on a dedicated server. The usual case is an [`apoli:entity_glow`](/docs/datapack/powers/entity_glow) that should light up only the entities in your set. It worked in singleplayer, on a LAN host and on an Essential-hosted world, because there the server runs inside your own game and the client could quietly read the server's memory. A dedicated server's client had nothing to read.

Sets are now sent to their owner and to every player who can see the owner, and the condition reads that copy. The glow behaves the same everywhere, including an [`apoli:self_glow`](/docs/datapack/powers/self_glow) that tests the glowing entity's own set. [`apoli:entity_set_size`](/docs/datapack/entity-conditions/entity_set_size) works on the client the same way.

## `result_item_action` acts on the result

On [`apoli:action_on_use`](/docs/datapack/powers/action_on_use) and [`apoli:prevent_use`](/docs/datapack/powers/prevent_use), `result_item_action` ran on whatever was in your hand after `result_stack` had been handed over. That was usually the item you used, which is `held_item_action`'s job, and the stack you were given came out unchanged. It now runs on `result_stack` before it is given to you, as it already did on the block and food powers. Without a `result_stack` there is nothing to act on, so it does nothing.

[`apoli:action_on_block_use`](/docs/datapack/powers/action_on_block_use) and [`apoli:action_on_block_place`](/docs/datapack/powers/action_on_block_place) put their `result_stack` straight into your hand, deleting whatever was left of the stack you were holding. The result now goes into your hand only if that hand is empty, and into your inventory otherwise.

## Accessory slots follow their condition

[`apoli:modify_accessory_slots`](/docs/compat/accessories/modify_accessory_slots) checked its `condition` once, when it was granted: get it while the condition passed and the extra slot stayed whatever happened afterwards. The condition is now checked every tick, and the slots come and go with it. Logging back in or respawning applies them again on the first tick.

With Trinkets, taking a slot away — revoking the power, for example — could crash the server: Trinkets shrank the slot but the player's inventory screen still pointed at it on the next tick. Apoli now has Trinkets rebuild that screen as soon as the slots change, so slots can come and go every time the condition flips.

## Hearing your own replaced sounds

[`apoli:replace_sound_emission`](/docs/datapack/powers/replace_sound_emission) replaced the sounds you make for everyone except you. Your game plays your own hurt, death, step and eating sounds itself instead of waiting for the server, and that path was not covered. It is now, so you hear the replacement too. The power's `entity_action` still runs once, on the server.

## `modify_velocity` limits hold the speed

With a limit such as `min_base` on the `y` axis, [`apoli:modify_velocity`](/docs/datapack/powers/modify_velocity) capped how far you moved each tick, but gravity kept adding up in your real velocity underneath. When the power stopped, or its condition failed, all of that speed arrived at once. The limits — `min_*`, `max_*` and `set_*` — now hold the velocity itself, so a `min_base` of `-0.1` is a true terminal velocity. Multiplying and adding operations still scale the movement each tick, as before.

## Creative flight and fall damage

[`apoli:creative_flight`](/docs/datapack/powers/creative_flight) made its holder immune to all fall damage, flying or not, because Minecraft skips fall damage for anyone who is allowed to fly. Flight from the power no longer does that: stop flying in mid-air, or walk off a ledge, and you take the fall like anyone else. Flying down to land is still safe. For the immunity, add an [`apoli:invulnerability`](/docs/datapack/powers/invulnerability) with an [`apoli:from_falling`](/docs/datapack/damage-conditions/from_falling) condition; the [Creative Flight](/docs/datapack/powers/creative_flight) page has the example.

## Swapping (Origins)

- **Conditional pools are worked out on the server.** A [swappable layer](/docs/datapack/origins/swapping)'s conditioned origins only reached the swap screen when the condition was something your game could check by itself. A condition on a command tag, a scoreboard or an advancement left the screen empty and the S button hidden. The server now evaluates the conditions and sends you the result, and the screen follows within half a second. When the condition stops passing while you are wearing that origin, you go back to your main origin.
- **The swap key works when another mod uses the same key.** Its default, `V`, is also the default for Simple Voice Chat's menu and for other mods, and Minecraft only delivers a key press to one of the mappings that share a key. The swap key now reads the key itself, the way Apoli's power keys do.
- **`shift_returns_to_main` and `wrap_to_main` do what they say.** Both were read from the layer file and then ignored: shift always returned you to your main origin, and cycling past the last option always went back to main.
