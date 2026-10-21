---
title: "Selection (Data Type)"
description: Which of a player's origins on a layer a type reads or moves.
navigation_title: "Selection"
---

A string saying which of a player's origins on one layer a type should look at. With [swapping](/docs/datapack/origins/swapping), a player can hold more than one origin per layer (a chosen origin, a swapped-in origin and a pool of origins they can swap to), so anything that reads or moves an origin has to say which one it means.

## Values

| Value | Meaning |
| --- | --- |
| `main` | The origin the player chose on that layer. This is the default almost everywhere, and the only one that exists on a layer without swapping. |
| `active` | The origin the player is wearing right now: the swapped-in one, or `main` when nothing is swapped in. |
| `pool` | The origins in that layer's swap pool, waiting to be swapped in, not counting the one being worn. |
| `all` | Any of the three. For a read it matches if any of them does, and for a transfer it means every origin found, not only the first. |

## Used by

- [`origins:origin`](/docs/datapack/origins/origin), for which of the player's origins the condition can match.
- [`origins:transfer_origin`](/docs/datapack/origins/transfer_origin), for which of the donor's origins moves.
- [`origins:copy_origin`](/docs/datapack/origins/copy_origin), for which of the target's origins is read.

## Example

```json
{
  "type": "origins:origin",
  "origin": "origins:phantom",
  "selection": "active"
}
```

This passes while the player is wearing Phantom, whether it is their chosen origin or one they swapped in.

> [!NOTE]
> Left out, `selection` defaults to `main` on a normal layer and to `pool` on a swappable one, which matches where each kind of layer keeps its origins.
