---
title: "/apoli:power"
description: "Grant, revoke, inspect and suppress powers on any entity."
---

Grants, revokes, inspects and suppresses powers. Aliased to `/power`.

Every sub-command takes an entity selector, not just players — Apoli holds powers on any entity that can carry them.

## Sub-commands

| Sub-command | What it does |
|-------------|--------------|
| `grant <targets> <power> [source]` | Adds a power. |
| `revoke <targets> <power>` | Removes a power completely, including its sub-powers. |
| `revoke <targets> <power> from <source>` | Removes only one source's grant of that power. |
| `grantall <targets> <source>` | Adds every power that `<source>` provides. |
| `revokeall <targets> <source>` | Removes every power that came from `<source>`. |
| `has <targets>` | Lists every power the targets hold. |
| `has <targets> <power>` | Reports `true`/`false` per target. |
| `suppress <targets> power <power> [source]` | Suppresses one power. |
| `suppress <targets> key <key> [source]` | Suppresses every held power bound to a keybind. |
| `unsuppress <targets> power <power> [source]` | Lifts a suppression. |
| `unsuppress <targets> key <key> [source]` | Lifts suppressions on a keybind. |
| `unsuppress <targets> all` | Lifts every suppression on the targets. |

## grant

```mcfunction
power grant @s example:flight
power grant @e[type=zombie] example:flight example:zombie_kit
```

`<source>` is the tag the grant is recorded under. It defaults to the power's own id, which is what you want unless you plan to `revokeall` a whole batch later. A power is only really gone once every source that granted it has been removed — that is how an origin, a skill tree and a command can all hand out the same power without stepping on each other.

Granting an [`apoli:multiple`](/docs/datapack/powers/multiple) power also grants its sub-powers.

## revoke

```mcfunction
power revoke @s example:fire
power revoke @s example:fire_dome
power revoke @s example:fire from example:origin_kit
```

`revoke` removes the power **entirely** — every source that granted it, plus any sub-powers it owns. That is almost always what you mean.

Sub-powers of an `apoli:multiple` power are named `<parent>_<key>`, so a `dome` block inside `example:fire` becomes `example:fire_dome`. Type `example:fire_` at the prompt and tab-completion lists the sub-powers you can target individually.

Use `from <source>` when you specifically want to drop one grant and leave the others — for example removing a command-granted copy while the player's origin keeps its own.

> Revoking a power an origin grants is temporary: the origin re-applies its powers on relog or `/reload`. Change the origin instead if you want it to stick.

## grantall / revokeall

```mcfunction
power grantall @s example:phoenix
power revokeall @s example:phoenix
```

`<source>` here is a **power source** — something that owns a list of powers:

- an **origin** id (Origins), e.g. `example:phoenix`
- a **skill tree** id, which resolves to its `default_powers` plus every skill under it
- an [`apoli:multiple`](/docs/datapack/powers/multiple) power id, which resolves to its sub-powers

Anything else is rejected with a message telling you so, rather than silently doing nothing. `grantall` records the source id on each power, so `revokeall` with the same id undoes it exactly.

`revokeall` also removes powers held under a literal source of that name, so it still works for sources you invented yourself in `grant`.

> `grantall` used to mean "every power in the pack". It no longer does — it always needs a source to draw from. The [`apoli:grant_all_powers`](/docs/datapack/entity-actions/grant_all_powers) action has the same `from` field for JSON.

## has

```mcfunction
power has @s
power has @a example:flight
```

With no power id it prints every power the target holds, one per line, with the sources that granted it and a marker on suppressed ones. Sub-powers are dimmed so a long list is still readable.

With a power id it prints `true` or `false` per target and returns the number of targets that hold it, so it drops straight into `/execute`:

```mcfunction
execute store result score @s has_flight run power has @s example:flight
```

## suppress / unsuppress

Suppression switches a power off without taking it away: it stops ticking, stops rendering its HUD, and stops responding to its keybind, but it stays in the container and comes back the moment the suppression is lifted.

```mcfunction
power suppress @s power example:flight
power suppress @s power example:flight example:silenced
power unsuppress @s power example:flight
power unsuppress @s all
```

Like grants, suppressions are tracked per source (default `apoli:suppressed`), so two systems can suppress the same power and it only wakes up when both let go.

### By keybind

```mcfunction
power suppress @a key "key.origins.primary"
power unsuppress @a key "key.origins.primary"
```

`key` mode suppresses every power the target holds that is bound to that key — handy when a pack maps a dozen active powers onto the same button and you want to disable the lot during a cutscene or a minigame round. Tab-completion offers the keys the selected targets actually use.

Keys are quoted strings, matching the `key` field on [`apoli:action_on_key_press`](/docs/datapack/powers/action_on_key_press), [`apoli:toggle`](/docs/datapack/powers/toggle), [`apoli:inventory`](/docs/datapack/powers/inventory), [`apoli:fire_projectile`](/docs/datapack/powers/fire_projectile) and [`apoli:action_on_key_sequence`](/docs/datapack/powers/action_on_key_sequence).

## See also

- [Commands overview](/docs/datapack/commands/overview)
- [Entity selector options](/docs/datapack/commands/selectors)
- [apoli:grant_all_powers](/docs/datapack/entity-actions/grant_all_powers)
- [apoli:suppress_power](/docs/datapack/entity-actions/suppress_power)
