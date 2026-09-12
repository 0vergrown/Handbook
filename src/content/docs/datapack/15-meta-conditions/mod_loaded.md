---
title: "Mod Loaded (Meta Condition Type)"
description: "Checks whether another mod is installed, optionally at a given version."
navigation_title: "Mod Loaded"
aliases: ["mod_installed"]
---

Checks whether another mod is installed, optionally at a given version. It ignores its context entirely, so the same type is available wherever a condition is — entity, bi-entity, item, block, damage, fluid and biome — and in a power's [`load_condition`](/docs/datapack/introduction/powers#gating-a-power-at-load-time).

Type ID: `apoli:mod_loaded`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`mod` | [String](/docs/datapack/data-types/string) | optional | A mod id that must be installed.
`mods` | list of [String](/docs/datapack/data-types/string) | `[]` | Mod ids that must **all** be installed.
`version` | [String](/docs/datapack/data-types/string) | optional | If set, every named mod's version must also satisfy `comparison` against this.
`comparison` | [Comparison](/docs/datapack/data-types/comparison) | `>=` | How each mod's version is compared to `version`.

At least one of `mod` / `mods` must be given; with neither, the condition is never fulfilled. Give both and every id in both has to match.

Versions are compared number-group by number-group, so `1.9` is older than `1.10`, and a release is newer than its own pre-releases (`4.2.0` beats `4.2.0-beta.1`). Anything after a `+` is build metadata and is ignored, so `4.7.6+Fabric` compares as `4.7.6`.

> A mod's presence never changes while the game runs, so this is resolved **once**, when the JSON is read. Testing it per tick costs nothing.

## Examples

```json
"condition": {
    "type": "apoli:mod_loaded",
    "mod": "icarus"
}
```

Fulfilled while Icarus is installed.

```json
"condition": {
    "type": "apoli:mod_loaded",
    "mods": ["pehkui", "trinkets"],
    "inverted": true
}
```

Fulfilled unless **both** Pehkui and Trinkets are installed.

```json
"load_condition": {
    "type": "apoli:mod_loaded",
    "mod": "icarus",
    "version": "4.0.0"
}
```

As a `load_condition` on a power: the power is only read at all when Icarus 4.0.0 or newer is installed. That is the only way to use a power type that does not exist without its mod — [`apoli:wings`](/docs/compat/icarus/wings) is registered only when Icarus is, so a plain `condition` cannot save a power that names it.
