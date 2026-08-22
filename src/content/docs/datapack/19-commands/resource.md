---
title: "Resource (Command)"
description: "Read and write resource and cooldown values on any entity."
navigation_title: "Resource"
---

Reads and writes the value behind an [`apoli:resource`](/docs/datapack/powers/resource) or [`apoli:cooldown`](/docs/datapack/powers/cooldown) power. Aliased to `/resource`.

## Sub-commands

| Sub-command | What it does |
|-------------|--------------|
| `get <targets> <power> [position]` | Prints the current value per target, and returns the first one. With `position`, reads that slot of a table resource. |
| `list <targets> <power>` | Prints every slot of a table resource as `0: v, 1: v, …`. |
| `set <targets> <power> <value> [position]` | Sets the value, clamped to the power's `min`/`max`. Without `position` on a table, sets **every** slot. |
| `change <targets> <power> <value> [position]` | Adds `<value>` to the current value (negative to subtract). |
| `has <targets> <power>` | Prints which targets hold that resource, returns the count. |

`<power>` tab-completes to the resource and cooldown powers the **targets actually hold**, falling back to every loaded one when the targets cannot be resolved yet.

`<power>` also accepts any power type with a built-in `cooldown` field — [`apoli:action_on_key_press`](/docs/datapack/powers/action_on_key_press), [`apoli:action_on_key_sequence`](/docs/datapack/powers/action_on_key_sequence), [`apoli:fire_projectile`](/docs/datapack/powers/fire_projectile), [`apoli:action_on_hit`](/docs/datapack/powers/action_on_hit), [`apoli:action_when_hit`](/docs/datapack/powers/action_when_hit), [`apoli:action_on_kill`](/docs/datapack/powers/action_on_kill), [`apoli:action_on_collision`](/docs/datapack/powers/action_on_collision) and [`apoli:game_event_listener`](/docs/datapack/powers/game_event_listener). The value is the **remaining cooldown in ticks**, so `set <power> 0` clears the cooldown and puts the ability back on line.

## Examples

```mcfunction
resource get @s example:mana
resource set @s example:mana 20
resource change @s example:mana -5
resource has @a example:mana
```

Table resources — the optional `position` is the slot:

```mcfunction
resource list @s example:table
resource get @s example:table 2
resource set @s example:table 5 2
resource set @s example:table 0
```

The last line has no `position`, so it clears every slot at once.

Store a resource in a scoreboard:

```mcfunction
execute store result score @s mana run resource get @s example:mana
```

Targets that do not hold the power are skipped. If no target holds it the command reports that and returns `0`, so `/execute if` behaves sensibly.

> A resource's stored value outlives the power itself, so that re-granting the power restores what you had. All four sub-commands therefore check that the target still **holds** the power before reporting a value — a leftover value from a power you no longer have never shows up.

> `get`/`set`/`change` without a `position` read and write slot `0` of a table resource — the same value the HUD bar and an unindexed [Expression](/docs/datapack/data-types/expression) reference see. `set` is the exception: with no position it writes every slot.

> `set` and `change` respect the power's own bounds — you cannot push a resource past its `max` or below its `min`. To go further, change the power.
