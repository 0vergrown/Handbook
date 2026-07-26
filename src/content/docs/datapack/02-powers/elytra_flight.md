---
title: "apoli:elytra_flight"
description: "Allows the player to fly as if they had an Elytra equipped."
---

Allows the player to fly as if they had an Elytra equipped.

Type ID: `apoli:elytra_flight`


## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`render_elytra` | Boolean |  | Determines whether an Elytra should render on the player's back while this power is active.
`texture_location` | Identifier | _optional_ | If specified, this will be the texture used by the Elytra granted by this power.


## Examples

```json
{
    "type": "apoli:elytra_flight",
    "render_elytra": false
}
```

This example will grant the player the ability to fall-fly, with the Elytra not being rendered.

```json
{
    "type": "apoli:elytra_flight",
    "render_elytra": true,
    "texture_location": "minecraft:textures/entity/elytra.png"
}
```

This example will grant the player the ability to fall-fly, with the Elytra being rendered as the default texture.

