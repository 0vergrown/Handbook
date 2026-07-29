---
title: "/apoli:resource"
description: "Read and write resource and cooldown values on any entity."
---

Reads and writes the value behind an [`apoli:resource`](/docs/datapack/powers/resource) or [`apoli:cooldown`](/docs/datapack/powers/cooldown) power. Aliased to `/resource`.

## Sub-commands

| Sub-command | What it does |
|-------------|--------------|
| `get <targets> <power>` | Prints the current value per target, and returns the first one. |
| `set <targets> <power> <value>` | Sets the value, clamped to the power's `min`/`max`. |
| `change <targets> <power> <value>` | Adds `<value>` to the current value (negative to subtract). |
| `has <targets> <power>` | Prints which targets hold that resource, returns the count. |

`<power>` tab-completes to the loaded resource and cooldown powers.

## Examples

```mcfunction
resource get @s example:mana
resource set @s example:mana 20
resource change @s example:mana -5
resource has @a example:mana
```

Store a resource in a scoreboard:

```mcfunction
execute store result score @s mana run resource get @s example:mana
```

Targets that do not hold the power are skipped. If no target holds it the command fails with a message and returns `0`, so `/execute if` behaves sensibly.

> `set` and `change` respect the power's own bounds — you cannot push a resource past its `max` or below its `min`. To go further, change the power.

## See also

- [apoli:resource](/docs/datapack/powers/resource)
- [apoli:cooldown](/docs/datapack/powers/cooldown)
- [apoli:change_resource](/docs/datapack/entity-actions/change_resource)
- [Commands overview](/docs/datapack/commands/overview)
