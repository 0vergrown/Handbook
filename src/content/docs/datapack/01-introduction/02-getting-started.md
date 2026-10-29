---
title: Getting started
description: Set up a data pack and write your first Apoli power.
---

This page takes one working power from an empty folder into your game. You need a world with Apoli installed. Origins is optional.

## Create the data pack

Inside your world's `datapacks/` folder, create this structure:

```
datapacks/
└── my_pack/
    ├── pack.mcmeta
    └── data/
        └── my_pack/
            └── powers/
                └── swim.json
```

`pack.mcmeta` tells Minecraft that the folder is a data pack:

```json
{
  "pack": {
    "pack_format": 48,
    "description": "My first Apoli powers"
  }
}
```

> [!NOTE]
> `pack_format` depends on your Minecraft version. `48` is the value for 1.21.1 and `15` is the value for 1.20.1.

## Write the power

Powers go in `data/<namespace>/powers/`, and the file's path gives the power its ID, so this one is `my_pack:swim`. Put this in `swim.json`:

```json
{
  "name": "Strong Swimmer",
  "description": "You move faster through water.",
  "type": "apoli:swim_speed",
  "modifier": {
    "operation": "multiply_total_multiplicative",
    "value": 0.5
  }
}
```

Every power has a [`type`](/docs/datapack/introduction/powers). This one is `apoli:swim_speed`, which makes swimming faster. `name` and `description` are shown in game, and the other fields configure the type.

> [!TIP]
> The file can also be `swim.jsonc` or `swim.json5`, which accept comments and trailing commas. [File formats](/docs/datapack/introduction/file-formats) lists what each one allows.

## Grant it to yourself

A power does nothing until an entity has it. Reload the pack and grant the power with a command:

```mcfunction
/reload
/power grant @s my_pack:swim
```

Jump into water and you swim faster. `/power revoke @s my_pack:swim` takes the power away again.

> [!NOTE]
> With Origins installed, you usually attach powers to an origin instead of granting them by command. [Layers](/docs/datapack/origins/layers) explains how that works.

## What happened

- A data pack is a folder of JSON files that Minecraft loads.
- Apoli reads every file under `powers/` and registers it as a power.
- `/power grant` attaches the power to an entity, and Apoli applies its effect.

Most of what a power does comes from its [`type`](/docs/datapack/introduction/powers), and Apoli has over a hundred of them.
