---
title: "Entity selector options"
description: "The extra selector options Apoli and Origins add: power, suppressed_power, skill, origin and origin_layer."
---

Apoli registers extra options on vanilla's entity selectors, so you can filter by power, skill or origin anywhere a selector is accepted: commands, predicates, `/execute if entity`, advancement rewards and so on.

## Options

| Option | Value | Matches |
| --- | --- | --- |
| `power` | Power ID | Entities holding that power. |
| `suppressed_power` | Power ID | Entities holding that power and currently suppressing it. |
| `skill` | Skill ID | Players who bought that skill. |
| `origin` | Origin ID | Players with that origin in any layer. Needs Origins. |
| `origin_layer` | Layer ID | Players who have chosen an origin in that layer. Needs Origins. |

All five accept `!` for negation and offer tab completion for their values.

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

- `power` works on any entity, so mobs, projectiles and other power holders all match.
- `power` matches on the power being held, whether or not it is active or suppressed. Pair it with `suppressed_power=!…` when you only want powers that aren't suppressed.
- `origin` matches across every layer. Use `origin_layer` when you need to know that a specific layer has been filled in at all.
- `skill` is about bought skills. Powers a skill tree grants for free (its `default_powers`) are matched with `power` instead.
- The options combine with everything vanilla offers, and several Apoli options in one selector must all match, like any other options.

> [!NOTE]
> `origin` and `origin_layer` are registered by Apoli but only work with Origins installed. Without it, they give a clear "needs the Origins mod" error instead of silently matching nothing.
