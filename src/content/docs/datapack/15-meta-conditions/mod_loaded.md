---
title: "Mod Loaded (Meta Condition Type)"
description: "Checks whether another mod is installed, optionally at a given version."
navigation_title: "Mod Loaded"
aliases: ["mod_installed"]
---

Checks whether another mod is installed, optionally at a given version. It ignores its context entirely, so the same type works wherever a condition does (entity, bi-entity, item, block, damage, fluid and biome) and in a power's [`load_condition`](/docs/datapack/introduction/powers#skipping-a-power-at-load-time).

Type ID: `apoli:mod_loaded`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `mod` | [String](/docs/datapack/data-types/string) | _optional_ | A mod ID that must be installed. |
| `mods` | list of [String](/docs/datapack/data-types/string) | `[]` | Mod IDs that must all be installed. |
| `version` | [String](/docs/datapack/data-types/string) | _optional_ | When set, every named mod's version must also satisfy `comparison` against this. |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | `>=` | How each mod's version is compared with `version`. |

At least one of `mod` and `mods` must be given, and with neither the condition never passes. Give both and every ID in both has to match.

Versions are compared one group of numbers at a time, so `1.9` is older than `1.10`, and a release is newer than its own pre-releases (`4.2.0` beats `4.2.0-beta.1`). Anything after a `+` is build metadata and is ignored, so `4.7.6+Fabric` compares as `4.7.6`.

> [!NOTE]
> Whether a mod is installed never changes while the game runs, so this is worked out once, when the JSON is read. Testing it every tick costs nothing.

## Examples

```json
"condition": {
    "type": "apoli:mod_loaded",
    "mod": "icarus"
}
```

This passes while Icarus is installed.

```json
"condition": {
    "type": "apoli:mod_loaded",
    "mods": ["pehkui", "trinkets"],
    "inverted": true
}
```

This passes unless both Pehkui and Trinkets are installed.

```json
"load_condition": {
    "type": "apoli:mod_loaded",
    "mod": "icarus",
    "version": "4.0.0"
}
```

As a `load_condition` on a power, the power is only read at all when Icarus 4.0.0 or newer is installed. That is the only way to use a power type that doesn't exist without its mod. [`apoli:wings`](/docs/compat/icarus/wings) is only registered when Icarus is, so a plain `condition` can't save a power that names it.
