---
title: Getting started
description: Set up a data pack and write your first Apoli power.
---

This page gets a single, working power into your game. You'll need a world with **Apoli** installed (Origins optional).

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

`pack.mcmeta` tells Minecraft it's a data pack:

```json
{
  "pack": {
    "pack_format": 48,
    "description": "My first Apoli powers"
  }
}
```

> `pack_format` depends on your Minecraft version. `48` is for 1.21.1; use the value that matches your game.

## Write the power

Powers live in `data/<namespace>/powers/`. The file name is the power's id — this one is `my_pack:swim`. Put this in `swim.json`:

```json
{
  "type": "apoli:swim_speed",
  "name": "Strong Swimmer",
  "description": "You move faster through water.",
  "modifier": {
    "operation": "multiply_total_multiplicative",
    "value": 0.5
  }
}
```

Every power has a [`type`](/docs/datapack/powers/overview). Here it's `apoli:swim_speed`, which speeds up swimming. `name` and `description` are shown in-game; the rest of the fields configure the type.

## Grant it to yourself

Powers do nothing until an entity *has* one. Reload and grant it with a command:

```mcfunction
/reload
/power grant @s my_pack:swim
```

Jump in water — you're faster. Take it away again with `/power revoke @s my_pack:swim`.

> With **Origins** installed you'd normally attach powers to an origin instead of granting them by command. See [Origins » Layers](/docs/datapack/origins/layers) for that flow.

## What just happened

- A **data pack** is just a folder of JSON that Minecraft loads.
- Apoli reads every file under `powers/` and registers it as a power.
- `/power grant` attaches the power to an entity; Apoli applies its effect.

From here, the interesting part is the [`type`](/docs/datapack/powers/overview) — there are over a hundred of them.
