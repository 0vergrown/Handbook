---
title: "Script (Entity Condition Type)"
description: Passes when a script returns true for the entity.
navigation_title: "Script"
---

Passes when a script returns a truthy value for the entity. Returning nothing counts as false.

Type ID: `apoli:script`

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`script` | [Identifier](/docs/datapack/data-types/identifier) | **required** | The script to run. Either an id registered from KubeJS with `ApoliEvents`, or the path of a `.js` file shipped in a data pack at `data/<namespace>/apoli/scripts/<path>.js` — in which case the `.js` is part of the id.
`params` | [NBT](/docs/datapack/data-types/nbt) | _optional_ | Values handed to the script. Read them with `event.params` from KubeJS, or `params` inside a data pack script. This is how one script serves several powers.

## Example

A condition that has no JSON equivalent — is the player standing on a block whose id contains a word:

```js
// kubejs/server_scripts/stone_sense.js
ApoliEvents.entityCondition('mypack:on_stone', event => {
  const below = event.level.getBlock(event.entity.block.pos.below())
  return below.id.includes('stone')
})
```

```json
{
  "type": "apoli:attribute",
  "modifiers": [
    {
      "attribute": "minecraft:generic.movement_speed",
      "operation": "multiply_base_multiplicative",
      "value": 0.3
    }
  ],
  "condition": {
    "type": "apoli:script",
    "script": "mypack:on_stone"
  }
}
```

A data pack script used as a condition is just an expression — the value of the last line is the answer:

```js
// data/mypack/apoli/scripts/is_late.js
ctx.level.dayTime % 24000 > 18000
```

> A condition can be checked many times a tick. Keep the script short, and prefer a real condition type when one exists.

> Needs [KubeJS](/docs/compat/kubejs). Without it the type still loads and the pack still works — the call logs once and does nothing. Scripts always run on the server.
