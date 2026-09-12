---
title: "One pack, two versions"
description: "Apoli 1.79.0 adds apoli:minecraft_version and apoli:mod_loaded, and a load_condition that drops a power before its fields are ever parsed. Origins 1.35.0 reads the same field on origins and layers."
date: 2026-09-11
author: Overgrown
---

Apoli **1.79.0** and Origins **1.35.0**. Two new condition types and one new field, all aimed at the
same problem: a data pack that has to run on more than one version of Minecraft, or with and without
some other mod.

## The problem with a runtime condition

Say you want a coloured dust particle. On 1.21 that is

```json
"particle": { "type": "minecraft:dust", "color": [0.62, 0.82, 1.0], "scale": 0.8 }
```

and on 1.20.1 it is

```json
"particle": { "type": "minecraft:dust", "params": "0.62 0.82 1.0 0.8" }
```

The obvious move is two sub-powers with a condition on each. It does not work, and the reason is
timing. A power's `condition` is evaluated per tick — which means the power has to have **loaded**
first, and loading means every field went through a codec. The branch for the other version is
parsed whether its condition would have passed or not. Sometimes that is merely wasteful; often it
fails, and a failed field takes the whole power down with it.

Registration-gated types make it starker. [`apoli:wings`](/docs/compat/icarus/wings) is only
registered when Icarus is installed. Without Icarus, `"type": "apoli:wings"` is an unknown type id
and the power never exists — there is no runtime for a condition to run in.

## `load_condition`

Every power now takes an optional `load_condition`, checked **during the reload, before the rest of
the JSON reaches a codec**. A power whose `load_condition` does not hold is skipped outright, and
nothing it contains is ever parsed.

```json
{
  "type": "apoli:multiple",
  "modern_dust": {
    "type": "apoli:particle",
    "particle": { "type": "minecraft:dust", "color": [0.62, 0.82, 1.0], "scale": 0.8 },
    "load_condition": { "type": "apoli:minecraft_version", "version": "1.21" }
  },
  "legacy_dust": {
    "type": "apoli:particle",
    "particle": { "type": "minecraft:dust", "params": "0.62 0.82 1.0 0.8" },
    "load_condition": { "type": "apoli:minecraft_version", "version": "1.21", "inverted": true }
  }
}
```

On [`apoli:multiple`](/docs/datapack/powers/multiple) it works per sub-power, and a sub-power that is
gated off is left out of the parent's `sub_powers` list rather than left dangling. Put it at the top
level and it gates the whole bundle. Origins reads the same field on `origins/` and
`origin_layers/` files, so an origin can exist only where its powers do.

Only context-free condition types are allowed inside it — there is no entity to test against during a
reload — so that is `apoli:minecraft_version`, `apoli:mod_loaded`, `apoli:constant`, `apoli:nothing`,
and `apoli:all_of` / `apoli:any_of` over those. Anything else is logged and ignored, and the power is
**kept**: a typo in a gate will never silently delete a power.

## `apoli:minecraft_version`

[The page](/docs/datapack/meta-conditions/minecraft_version). Takes `version` (`"1.21"`),
`data_version` (`3955`), or both, against a `comparison` that defaults to `>=`.

Versions compare group by group, so `1.9` is older than `1.10` and `1.21` is older than `1.21.1`.
Snapshot names do not order against release names at all — reach for `data_version` when you need to
catch one.

## `apoli:mod_loaded`

[The page](/docs/datapack/meta-conditions/mod_loaded). Takes `mod`, or `mods` for a list that must
all be present, and optionally a `version` those mods must satisfy.

```json
{
  "type": "apoli:multiple",
  "dragon_wings": {
    "type": "apoli:wings",
    "wings_type": "icarus:purple_dragon_wings",
    "load_condition": { "type": "apoli:mod_loaded", "mod": "icarus" }
  },
  "elytra": {
    "type": "apoli:elytra_flight",
    "render_elytra": false,
    "load_condition": { "type": "apoli:mod_loaded", "mod": "icarus", "inverted": true }
  }
}
```

Both types are ordinary conditions as well as load-time gates, so they work anywhere a condition
does — entity, bi-entity, item, block, damage, fluid and biome. Neither answer can change while the
game is running, so both resolve once, when the JSON is read; testing one per tick costs nothing.

## What this does not solve

Directory names. 1.21 renamed `functions/` to `function/` and `tags/entity_types/` to
`tags/entity_type/`, and those are read by Minecraft itself long before Apoli sees anything. A pack
that supports both still ships both directories, and each version quietly ignores the one that is
not its own. `load_condition` is for what is *inside* a power — which, for a version-specific
particle or item, is usually a single field.
