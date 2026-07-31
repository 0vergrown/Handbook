---
title: "Entity selector options"
description: "Extra @-selector options Apoli and Origins add: power, suppressed_power, skill, origin and origin_layer."
---

Apoli registers extra options on vanilla's entity selectors, so you can filter by power, skill or origin anywhere a selector is accepted — commands, predicates, `/execute if entity`, advancement rewards, anything.

## Options

| Option | Value | Matches |
|--------|-------|---------|
| `power` | power id | Entities holding that power. |
| `suppressed_power` | power id | Entities holding that power **and** currently suppressing it. |
| `skill` | skill id | Players who purchased that skill. |
| `origin` | origin id | Players with that origin in any layer. Needs Origins. |
| `origin_layer` | layer id | Players who have chosen an origin in that layer. Needs Origins. |

All five accept `!` for negation and offer tab-completion for their values.

```mcfunction
say @a[origin=example:phoenix]
say @a[origin=!example:human]
say @a[origin_layer=origins:origin]
say @e[power=example:flight]
say @e[power=example:flight,suppressed_power=!example:flight]
say @a[skill=example:fire_mastery]
kill @e[type=zombie,power=example:cursed]
```

## Notes

- `power` works on **any** entity, not just players — mobs, projectiles and other power-holders all match.
- `power` matches on the power being held, whether or not it is currently active or suppressed. Pair it with `suppressed_power=!…` when you only want live powers.
- `origin` matches across every layer. Use `origin_layer` when you care that a specific layer has been filled in at all.
- `skill` is about *purchased* skills. Powers a skill tree grants for free (its `default_powers`) are matched with `power` instead.
- Options combine with everything vanilla offers, and multiple Apoli options in one selector are ANDed like any other.

> `origin` and `origin_layer` are registered by Apoli but only work with Origins installed. Without it they produce a clear "needs the Origins mod" error rather than silently matching nothing.
