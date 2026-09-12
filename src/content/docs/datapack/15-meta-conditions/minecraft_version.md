---
title: "Minecraft Version (Meta Condition Type)"
description: "Checks the Minecraft version the game is running."
navigation_title: "Minecraft Version"
aliases: ["game_version", "mc_version"]
---

Checks the Minecraft version the game is running. It ignores its context entirely, so the same type is available wherever a condition is — entity, bi-entity, item, block, damage, fluid and biome — and in a power's [`load_condition`](/docs/datapack/introduction/powers#gating-a-power-at-load-time), which is where it earns its keep: a data pack that ships one set of files for several game versions can drop the branch that this version could not parse.

Type ID: `apoli:minecraft_version`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`version` | [String](/docs/datapack/data-types/string) | optional | A version name such as `1.21` or `1.20.1`, compared with `comparison`.
`data_version` | [Integer](/docs/datapack/data-types/integer) | optional | The world data version (`3465` on 1.20.1, `3955` on 1.21.1), compared with `comparison`.
`comparison` | [Comparison](/docs/datapack/data-types/comparison) | `>=` | How the running version is compared to `version` / `data_version`.

At least one of `version` / `data_version` must be given; with neither, the condition is never fulfilled. Give both and both have to match.

`version` is compared number-group by number-group, so `1.9` is older than `1.10` and `1.21` is older than `1.21.1`. Snapshot names (`24w03a`) do not order against release names at all — use `data_version` when you need to catch one.

> The game version never changes while the game runs, so this is resolved **once**, when the JSON is read. Testing it per tick costs nothing.

## Examples

```json
"condition": {
    "type": "apoli:minecraft_version",
    "version": "1.21"
}
```

Fulfilled on 1.21 and newer. Add `"inverted": true` for the other half of the split.

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

One coloured dust particle, written in both spellings. Exactly one sub-power survives the reload, and the other's `particle` field is never handed to a codec that would reject it.

```json
"load_condition": {
    "type": "apoli:minecraft_version",
    "data_version": 3837,
    "comparison": ">="
}
```

Keyed off the data version instead, which orders snapshots correctly.
