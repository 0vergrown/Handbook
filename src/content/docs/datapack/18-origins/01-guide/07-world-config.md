---
title: World Config
description: Switching layers, origins and individual powers off in one world, without editing any data pack.
---

Every world has its own Origins config at `<world>/origins/config.json`. It lists every origin layer, every origin and every power those origins grant, each with a switch, so a server owner can take something out of one world without touching the data packs that add it.

Origins writes the file when the world starts and fills in anything new whenever the data packs change, so the list is always complete. Nothing is disabled until you set a switch to `false`.

```json
{
  "layers": {
    "origins:origin": {
      "enabled": true,
      "origins": {
        "origins:elytrian": false,
        "origins:human": true,
        "origins:merling": true
      }
    }
  },
  "origins": {
    "origins:merling": {
      "enabled": true,
      "powers": {
        "origins:merling/aqua_affinity": true,
        "origins:merling/water_breathing": false
      }
    },
    "origins:phantom": {
      "enabled": false,
      "powers": {}
    }
  }
}
```

## The switches

| Switch | Turning it off |
| --- | --- |
| `layers.<layer>.enabled` | Removes the whole layer from this world — nobody picks from it, and nobody gets powers through it. |
| `layers.<layer>.origins.<origin>` | Takes that origin out of that one layer. It can still be offered by other layers. |
| `origins.<origin>.enabled` | Removes the origin from this world, in every layer. |
| `origins.<origin>.powers.<power>` | Leaves the origin in place without that power. |

In the example above nobody can choose Elytrian from the origin layer or Phantom from anywhere, and Merlings lose their gills — they breathe air like everyone else.

## When changes apply

The file is read when the world starts and again on every `/reload`, so edit it and run `/reload` — no restart needed.

A player who already has an origin that is now switched off keeps it on record but loses its powers, and gets them back if it is switched on again. Give them something else with [`/origin set`](/docs/datapack/commands/origin) if the change is meant to stay.

Switches for layers, origins or powers that no data pack provides any more are kept while they are `false`, so a pack that is removed and added back comes back the way it was configured. Switches left at `true` for something that no longer exists are dropped.

If the file cannot be read — a stray comma, say — Origins logs a warning, leaves the file exactly as it is so the mistake can be fixed, and treats everything it could not read as switched on until it is.
