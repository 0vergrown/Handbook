---
title: Entity conditions
description: Tests about a single entity — its state, stats, surroundings and powers.
---

An **entity condition** asks a question about one entity. These are the tests you'll reach for most: what is the entity doing, what does it have, and where is it?

## Movement & pose

| Condition | True when… |
| --- | --- |
| `apoli:sneaking` | the entity is sneaking |
| `apoli:sprinting` | the entity is sprinting |
| `apoli:swimming` | the entity is swimming |
| `apoli:moving` | the entity is moving |
| `apoli:fall_flying` | gliding with an elytra |

```json
{ "type": "apoli:sneaking" }
```

## Body state

`apoli:health`, `apoli:food_level` and similar compare a value. They take a `comparison` and a `compare_to`:

```json
{
  "type": "apoli:health",
  "comparison": "<=",
  "compare_to": 6
}
```

Valid `comparison` values: `<`, `<=`, `==`, `>=`, `>`, `!=`. Other body-state tests: `apoli:on_fire`, `apoli:submerged_in`, `apoli:invisible`, `apoli:glowing`.

## Surroundings

| Condition | Tests |
| --- | --- |
| `apoli:in_rain` | standing in rain |
| `apoli:in_snow` | standing in snow |
| `apoli:in_thunderstorm` | in an active thunderstorm |
| `apoli:daytime` | it's day where the entity is |
| `apoli:dimension` | the entity is in a given dimension |
| `apoli:biome` | the biome matches |
| `apoli:exposed_to_sky` | nothing solid overhead |

```json
{ "type": "apoli:dimension", "dimension": "minecraft:the_nether" }
```

## Gameplay state

- `apoli:gamemode` — survival, creative, etc.
- `apoli:using_item` — currently using/holding-use an item.
- `apoli:riding` — riding a vehicle or mount.
- `apoli:entity_type` — the entity is of a given type.

## Apoli-aware tests

Conditions can ask about the entity's *own* Apoli state:

| Condition | True when… |
| --- | --- |
| `apoli:power` | the entity has a given power |
| `apoli:power_active` | it has the power **and** the power is active |
| `apoli:resource` | a resource/cooldown compares as specified |

```json
{
  "type": "apoli:resource",
  "resource": "my_pack:mana",
  "comparison": ">=",
  "compare_to": 10
}
```

## Advanced escape hatches

For anything not covered by a dedicated condition:

- `apoli:nbt` — match against the entity's NBT.
- `apoli:predicate` — run a vanilla loot-table predicate.
- `apoli:scoreboard` — compare a scoreboard value.

> `apoli:nbt` is powerful but heavier than a purpose-built condition — it reads the entity's data. Prefer a specific condition when one exists.

## See also

- [Conditions overview](/docs/datapack/conditions/overview) — flavours, inverting, combining.
- [`apoli:simple`](/docs/datapack/powers/simple) — pairs with `apoli:power` to make toggles.
