---
title: Custom status effects
description: Define new status effects in a data pack. While an entity has one, it holds the powers you list.
---

A data pack can add its own **status effects**. Each one is a real status effect with its own id: `/effect give`, potions, [`apoli:apply_effect`](/docs/datapack/entity-actions/apply_effect) and the [`apoli:status_effect`](/docs/datapack/entity-conditions/status_effect) condition all accept it. While an entity has the effect, it also holds the powers the effect lists.

## Defining an effect

Put a file in `data/<namespace>/effects/<name>.json`. The file's path is the effect's id, so `data/example/effects/frenzy.json` defines `example:frenzy`.

```json
{
    "type": "beneficial",
    "powers": [
        "example:frenzy_speed",
        "example:frenzy_strength"
    ],
    "r": 0.85,
    "g": 0.15,
    "b": 0.1,
    "name": "Frenzy"
}
```

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `type` | [String](/docs/datapack/data-types/string) | _required_ | The effect's category: `beneficial`, `harmful` or `neutral`, written in lower case or all upper case (`HARMFUL`). It decides the colour of the effect's line in potion tooltips and which row it sits in on the HUD. |
| `powers` | [Array](/docs/datapack/data-types/array) of [Identifier](/docs/datapack/data-types/identifier) | _required_ | The powers an entity holds while it has the effect. An empty array makes an effect with no powers. |
| `r` | [Float](/docs/datapack/data-types/float) | `0` | Red part of the effect's colour, from `0` to `1`. |
| `g` | [Float](/docs/datapack/data-types/float) | `0` | Green part of the effect's colour, from `0` to `1`. |
| `b` | [Float](/docs/datapack/data-types/float) | `0` | Blue part of the effect's colour, from `0` to `1`. |
| `name` | [String](/docs/datapack/data-types/string) | _optional_ | The effect's display name, used as plain text everywhere. Leave it out to use a translation instead (see [Name and icon](#name-and-icon)). |
| `icon` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | A different sprite for the effect's icon (see [Name and icon](#name-and-icon)). |
| `loading_priority` | [Integer](/docs/datapack/data-types/integer) | `0` | When more than one data pack has a file with this id, the one with the highest `loading_priority` is used. On a tie, the pack that loads later wins. |

The colour tints the effect's particles and any potion that carries it. Values outside `0`–`1` are clamped, and leaving all three out gives black.

## Using it

Once the data pack is loaded, the effect works anywhere Minecraft expects a status effect:

```mcfunction
effect give @s example:frenzy 30 1
effect clear @s example:frenzy
give @s minecraft:potion[potion_contents={custom_effects:[{id:"example:frenzy",duration:600}]}]
```

In an Apoli action, use it like any other [Status Effect Instance](/docs/datapack/data-types/status-effect-instance):

```json
{
    "type": "apoli:apply_effect",
    "effect": {
        "effect": "example:frenzy",
        "duration": 200,
        "amplifier": 0
    }
}
```

## How the powers are granted

- When the effect is applied, the entity is granted each power in `powers`, with the effect's id as the source. Mobs get them too, even if they had no powers before.
- When the effect ends, those powers are revoked. That covers running out, milk, `/effect clear`, [`apoli:clear_effect`](/docs/datapack/entity-actions/clear_effect) and death. A player who respawns does not keep them.
- Only the effect's own grant is removed. If an origin, a command or another effect also granted the same power, the entity keeps it.
- Applying the effect again while it is already active follows Minecraft's usual rules: a stronger or longer instance replaces the current one. The powers are not granted a second time.
- A power id that does not exist is skipped, and the log says which effect listed it.

## Name and icon

**Name.** With no `name`, the effect's name comes from the translation key `effect.<namespace>.<path>`, for example `effect.example.frenzy`. Add that key to a resource pack's language file to name and translate it. With `name` set, that text is shown everywhere (the inventory, potion tooltips, `/effect` messages) and the translation key is not used.

**Icon.** The icon is drawn from the status effect sprite sheet, which reads `assets/<namespace>/textures/mob_effect/`. With no `icon`, the sprite is the one named after the effect: `example:frenzy` uses `assets/example/textures/mob_effect/frenzy.png`. Set `icon` to use a different sprite from the same folder. For example, `"icon": "example:rage"` uses `assets/example/textures/mob_effect/rage.png`, which is handy when several effects should share one picture. The textures come from a resource pack on each player's client. The data pack only runs on the server.

## Reloading

Effect files load with the rest of the data pack, **before** functions, powers, loot tables and advancements are read. Any of those can refer to a custom effect by id, even on the first start.

`/reload` rebuilds the whole set. Every custom effect that is active on a loaded entity is removed first, along with the powers it granted. If an effect should outlast a reload, apply it again afterwards. While a reload is running, and until every connected player has received the new list, custom effects cannot be applied; the attempt fails the same way it does for an immune mob. If the reload fails, the previous set of effects is put back.

## Multiplayer

The server sends its custom effects to each player's client when they join and after every `/reload`. Players do not need the data pack; they only need a resource pack if you use custom icons or translations. Every player must run the same Apoli version as the server.

## Turning it off

Server owners who don't want data packs adding status effects can switch the feature off in `config/apoli-effects.json`:

```json
{
    "enabled": false
}
```

With `enabled` set to `false`, `effects` folders are ignored and nothing is registered. The file is created with `"enabled": true` on first start. The setting is read once, so restart the server after changing it.

> **Performance.** A custom effect costs exactly what its powers cost. The same powers granted by an origin cost the same, and the effect adds nothing per tick on top. The only extra work happens during `/reload`, which checks every loaded entity once for custom effects to remove, and only does so when custom effects exist.

> **Minecraft 1.20.1 saves active effects by number, not by name.** Custom effects are numbered in id order after every other status effect. Adding or removing an effect file, or a mod that adds status effects, can shift those numbers, and an entity saved with one custom effect may then load with its neighbour. On 1.20.1, clear custom effects (or wait for them to run out) before changing the set. Minecraft 1.21 saves effects by name and is not affected.
