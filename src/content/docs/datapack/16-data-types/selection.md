---
title: "Selection (Data Type)"
description: Which of a player's origins on a layer a type reads or moves.
navigation_title: "Selection"
---

A string saying **which** of a player's origins on one layer a type should look at. A player can hold
more than one origin per layer once [swapping](/docs/datapack/origins/swapping) is in play — a chosen
origin, a swapped-in origin, and a pool of origins they may swap to — so anything that reads or moves
an origin has to say which it means.

## Values

Value | Meaning
------|--------
`main` | The origin the player **chose** on that layer. This is the default almost everywhere, and the only one that exists on a layer with no swapping.
`active` | The origin the player is **wearing right now** — the swapped-in one, falling back to `main` when nothing is swapped in.
`pool` | The origins sitting in that layer's **swap pool**, waiting to be swapped in. Not the one currently worn.
`all` | Any of the three. For a read that means "matches if any of them does"; for a transfer it means every origin found, not just the first.

## Used by

- [`origins:origin`](/docs/datapack/origins/origin) — which of the player's origins the condition may match.
- [`origins:transfer_origin`](/docs/datapack/origins/transfer_origin) — which of the donor's origins moves.
- [`origins:copy_origin`](/docs/datapack/origins/copy_origin) — which of the target's origins is read.

## Example

```json
{
  "type": "origins:origin",
  "origin": "origins:phantom",
  "selection": "active"
}
```

Passes while the player is actually wearing Phantom, whether that is their chosen origin or one they
swapped in.

> Left out, `selection` defaults to `main` on a normal layer and to `pool` on a swappable one — the
> reading that matches where that layer keeps its origins.
