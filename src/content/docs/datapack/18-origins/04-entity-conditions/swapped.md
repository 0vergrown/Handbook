---
title: "Swapped (Entity Condition Type)"
description: "Entity condition — checks whether the player is currently wearing a swapped-in origin."
navigation_title: "Swapped"
---

Checks whether the player is currently wearing an origin from their [swappable pool](/docs/datapack/origins/swapping) rather than their own main origin.

Type ID: `origins:swapped` — an [entity condition](/docs/datapack/entity-conditions).

> **Needs the Origins mod.** Registered by Origins, not core Apoli.

## Fields

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `layer` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | Which layer to check. Accepts either the target layer or the swappable layer itself. Defaults to the first layer that has a swappable pool. |
| `origin` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | Also require that this is the origin they are swapped into. |

False when the player is on their main origin. To test the main origin itself, use [`origins:origin`](/docs/datapack/origins/origin) — it reports the layer's stored pick, which a swap does not change.

## Examples

A HUD tint while borrowing someone else's power:

```json
{
    "type": "apoli:overlay",
    "texture": "example:textures/gui/borrowed.png",
    "condition": {
        "type": "origins:swapped"
    }
}
```

Only while wearing one specific stolen origin:

```json
{
    "type": "origins:swapped",
    "origin": "example:acid"
}
```
