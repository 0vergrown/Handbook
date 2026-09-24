---
title: "Resource (Command)"
description: "Read and write resource and cooldown values on any entity."
navigation_title: "Resource"
---

Reads and writes the value behind an [`apoli:resource`](/docs/datapack/powers/resource) or [`apoli:cooldown`](/docs/datapack/powers/cooldown) power. Aliased to `/resource`. The same values can also be written from [`/execute store`](#storing-with-execute).

## Sub-commands

| Sub-command | What it does |
|-------------|--------------|
| `get <targets> <power> [position]` | Prints the current value per target, and returns the first one. With `position`, reads that slot of a table resource. |
| `list <targets> <power>` | Prints every slot of a table resource as `0: v, 1: v, …`. |
| `set <targets> <power> <value> [position]` | Sets the value, clamped to the power's `min`/`max`. Without `position` on a table, sets **every** slot. |
| `change <targets> <power> <value> [position]` | Adds `<value>` to the current value (negative to subtract). |
| `has <targets> <power>` | Prints which targets hold that resource, returns the count. |
| `operation <targets> <power> [position] <operation> <source> <objective>` | Combines the value with a scoreboard score, like `/scoreboard players operation`. See [Scoreboard operations](#scoreboard-operations). |

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

## Scoreboard operations

`operation` does to a resource what `/scoreboard players operation` does to a score. The resource is on the left of the operator, and one score (`<source>` in `<objective>`) is on the right.

```mcfunction
resource operation @s example:mana += @s mana_bonus
resource operation @a example:mana < #cap settings
resource operation @s example:table 2 = @s picked_slot
```

| Operation | Result |
|-----------|--------|
| `=` | The resource becomes the score. |
| `+=` | Adds the score. |
| `-=` | Subtracts the score. |
| `*=` | Multiplies by the score. |
| `/=` | Divides by the score, rounding down. |
| `%=` | The remainder after dividing by the score. It has the same sign as the score. |
| `<` | Keeps whichever is smaller. |
| `>` | Keeps whichever is larger. |
| `><` | Swaps the two: the resource takes the score, and the score takes the resource's old value. |

The operators behave exactly like the vanilla command's, because they are the vanilla command's: dividing or taking a remainder by `0` fails with *Cannot divide by zero* and changes nothing. `<source>` is a single score holder, meaning a player name, a fake name like `#cap`, or a selector that matches one entity. As with the vanilla command, naming a holder that has no score yet gives it one of `0`.

The result is clamped to the power's `min`/`max` like any other write. With `><`, the score always receives the resource's old value, even when the resource could not take the whole score.

With a `position`, the operation works on that slot of a table resource. Without one, it reads slot `0` and writes the result to **every** slot, like `set`.

## Storing with /execute

`resource` is also a target for `/execute store`, next to `score`, `entity` and the others:

```mcfunction
execute store result resource <targets> <power> run <command>
execute store success resource <targets> <power> run <command>
```

`result` writes the command's result into each target's resource, and `success` writes `1` if the command succeeded and `0` if it failed. The write is clamped to the power's bounds like `set`, and on a table resource it fills every slot.

```mcfunction
execute store result resource @s example:mana run data get entity @s XpLevel
execute as @a store result resource @s example:mana store result score @s mana run function example:roll
```

The second line stores the same result in a resource and a score at once. `store resource` chains with every other `/execute` sub-command, including other `store` clauses, the same way `store score` does.

> There is no `position` form of `store resource`. To store into one slot of a table, store into a score first and then copy it with `resource operation <targets> <power> <position> = <source> <objective>`.

> A resource's stored value outlives the power itself, so that re-granting the power restores what you had. Every sub-command therefore checks that the target still **holds** the power before reading or writing a value — a leftover value from a power you no longer have never shows up.

> `get`/`set`/`change` without a `position` read and write slot `0` of a table resource — the same value the HUD bar and an unindexed [Expression](/docs/datapack/data-types/expression) reference see. `set`, `operation` and `store resource` are the exceptions: with no position they write every slot.

> `set`, `change` and `operation` respect the power's own bounds — you cannot push a resource past its `max` or below its `min`. To go further, change the power.
