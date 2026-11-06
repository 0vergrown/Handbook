---
title: "Resource (Command)"
description: "Reads and writes resource and cooldown values on any entity."
navigation_title: "Resource"
---

Reads and writes the value behind an [`apoli:resource`](/docs/datapack/powers/resource) or [`apoli:cooldown`](/docs/datapack/powers/cooldown) power. The short alias is `/resource`. The same values can also be written from [`/execute store`](#storing-with-execute).

## Sub-commands

| Sub-command | What it does |
| --- | --- |
| `get <targets> <power> [position] [scale]` | Prints the current value per target and returns the first one, rounded down to a whole number. With `position`, it reads that slot of a table resource. A `scale` after the position multiplies the value before rounding, like `/data get`. |
| `list <targets> <power>` | Prints every slot of a table resource as `0: v, 1: v, …`. |
| `set <targets> <power> <value> [position]` | Sets the value, clamped to the power's `min` and `max`. `<value>` can be a decimal. Without `position` on a table, it sets every slot. |
| `change <targets> <power> <value> [position]` | Adds `<value>` to the current value, or subtracts it when negative. `<value>` can be a decimal. |
| `has <targets> <power>` | Prints which targets hold that resource, and returns the count. |
| `operation <targets> <power> [position] <operation> <source> <objective>` | Combines the value with a scoreboard score, like `/scoreboard players operation`. See [Scoreboard operations](#scoreboard-operations). |

`<power>` tab-completes to the resource and cooldown powers the targets hold, and falls back to every loaded one when the targets can't be resolved yet.

`<power>` also accepts any power type with a built-in `cooldown` field: [`apoli:action_on_key_press`](/docs/datapack/powers/action_on_key_press), [`apoli:action_on_key_sequence`](/docs/datapack/powers/action_on_key_sequence), [`apoli:fire_projectile`](/docs/datapack/powers/fire_projectile), [`apoli:action_on_hit`](/docs/datapack/powers/action_on_hit), [`apoli:action_when_hit`](/docs/datapack/powers/action_when_hit), [`apoli:action_on_kill`](/docs/datapack/powers/action_on_kill), [`apoli:action_on_collision`](/docs/datapack/powers/action_on_collision) and [`apoli:game_event_listener`](/docs/datapack/powers/game_event_listener). The value is the remaining cooldown in ticks, so `set <power> 0` clears the cooldown and makes the ability usable again. Cooldowns count whole ticks, so a decimal is rounded to the nearest tick.

## Examples

```mcfunction
resource get @s example:mana
resource set @s example:mana 20
resource change @s example:mana -5
resource change @s example:mana 0.25
resource has @a example:mana
```

Printed values keep their decimals, so a resource at `12.75` prints as `12.75`.

Table resources take the slot as the optional `position`:

```mcfunction
resource list @s example:table
resource get @s example:table 2
resource set @s example:table 5 2
resource set @s example:table 0
```

The last line has no `position`, so it clears every slot at once.

This stores a resource in a scoreboard:

```mcfunction
execute store result score @s mana run resource get @s example:mana
```

A score only holds whole numbers, so `get` rounds the value down. To keep two decimal places, read slot `0` with a scale of `100`, which stores `12.75` as `1275`:

```mcfunction
execute store result score @s mana run resource get @s example:mana 0 100
```

Targets that don't hold the power are skipped. If no target holds it, the command reports that and returns `0`, so `/execute if` behaves sensibly.

## Scoreboard operations

`operation` does to a resource what `/scoreboard players operation` does to a score. The resource is on the left of the operator, and one score (`<source>` in `<objective>`) is on the right.

```mcfunction
resource operation @s example:mana += @s mana_bonus
resource operation @a example:mana < #cap settings
resource operation @s example:table 2 = @s picked_slot
```

| Operation | Result |
| --- | --- |
| `=` | The resource becomes the score. |
| `+=` | Adds the score. |
| `-=` | Subtracts the score. |
| `*=` | Multiplies by the score. |
| `/=` | Divides by the score. The result keeps its decimals. |
| `%=` | The remainder after dividing by the score. It has the same sign as the score. |
| `<` | Keeps whichever is smaller. |
| `>` | Keeps whichever is larger. |
| `><` | Swaps the two: the resource takes the score, and the score takes the resource's old value, rounded down. |

The operators take the same symbols as the vanilla command and work on the resource's exact value, so `/=` and `%=` keep fractions, and a resource at `0.75` multiplied by a score of `2` becomes `1.5`. Dividing or taking a remainder by `0` fails with "Cannot divide by zero" and changes nothing. `<source>` is a single score holder: a player name, a fake name like `#cap`, or a selector that matches one entity. As with the vanilla command, naming a holder that has no score yet gives it a score of `0`.

The result is clamped to the power's `min` and `max` like any other write. With `><`, the score always receives the resource's old value, even when the resource couldn't take the whole score.

With a `position`, the operation works on that slot of a table resource. Without one, it reads slot `0` and writes the result to every slot, like `set`.

## Storing with /execute

`resource` is also a target for `/execute store`, next to `score`, `entity` and the others:

```mcfunction
execute store result resource <targets> <power> run <command>
execute store success resource <targets> <power> run <command>
```

`result` writes the command's result, which is always a whole number, into each target's resource, and `success` writes `1` if the command succeeded and `0` if it failed. The write is clamped to the power's bounds like `set`, and on a table resource it fills every slot.

```mcfunction
execute store result resource @s example:mana run data get entity @s XpLevel
execute as @a store result resource @s example:mana store result score @s mana run function example:roll
```

The second line stores the same result in a resource and a score at once. `store resource` chains with every other `/execute` sub-command, including other `store` clauses, the same way `store score` does.

> [!NOTE]
> There is no `position` form of `store resource`. To store into one slot of a table, store into a score first and then copy it with `resource operation <targets> <power> <position> = <source> <objective>`.

## Notes

- A resource's stored value outlives the power itself, so granting the power again restores what you had. Every sub-command therefore checks that the target still holds the power before reading or writing a value, and a leftover value from a power you no longer have never shows up.
- `get` and `change` without a `position` read and write slot `0` of a table resource, the same value the HUD bar and an [Expression](/docs/datapack/data-types/expression) reference without an index see. `set`, `operation` and `store resource` write every slot when no position is given.
- `set`, `change` and `operation` respect the power's own bounds, so you can't push a resource past its `max` or below its `min`. To go further, change the power.
