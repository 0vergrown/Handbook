---
title: "Scale (Command)"
description: "Reads and changes the scales stored on entities."
navigation_title: "Scale"
---

Reads and changes the scales stored on entities. A value set here persists on the entity, survives relogs and dimension changes, and multiplies with any [apoli:scale](/docs/datapack/powers/scale) power the entity holds.

Requires permission level 2 (`apoli.command.scale`).

```mcfunction
apoli:scale get <targets> [<scale_type>]
apoli:scale set <targets> <scale_type> <value> [<ticks>] [<easing>]
apoli:scale add <targets> <scale_type> <value> [<ticks>] [<easing>]
apoli:scale subtract <targets> <scale_type> <value> [<ticks>] [<easing>]
apoli:scale multiply <targets> <scale_type> <value> [<ticks>] [<easing>]
apoli:scale divide <targets> <scale_type> <value> [<ticks>] [<easing>]
apoli:scale power <targets> <scale_type> <value> [<ticks>] [<easing>]
apoli:scale reset <targets>
apoli:scale list
```

| Argument | Meaning |
|----------|---------|
| `<targets>` | Any entity selector. Scales work on every entity, not just players. |
| `<scale_type>` | A [Scale Type](/docs/datapack/data-types/scale-type). `get` defaults to `apoli:base`. |
| `<value>` | The right-hand side of the operation, between `0.0001` and `10000`. |
| `<ticks>` | How long the change takes. Omitted or `0` snaps immediately. |
| `<easing>` | How the change is spread over `<ticks>`; defaults to `linear`. |

`get` prints the **final** value — stored value, powers and parent scales folded together — which is what the game actually uses. `reset` clears every stored scale on the target; it does not touch scales that come from a power.

```mcfunction
apoli:scale set @s apoli:base 2
apoli:scale set @s apoli:base 0.25 40 ease_out_cubic
apoli:scale multiply @e[type=zombie,distance=..8] apoli:height 1.5
apoli:scale get @s apoli:model_height
apoli:scale reset @a
```
