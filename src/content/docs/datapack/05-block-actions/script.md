---
title: "Script (Block Action Type)"
description: Runs a script against a block position.
navigation_title: "Script"
---

Runs a script against a block position. `event.pos` is the position and `event.level` is the world; there is no entity.

Type ID: `apoli:script`

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`script` | [Identifier](/docs/datapack/data-types/identifier) | **required** | The script to run. Either an id registered from KubeJS with `ApoliEvents`, or the path of a `.js` file shipped in a data pack at `data/<namespace>/apoli/scripts/<path>.js` — in which case the `.js` is part of the id.
`params` | [NBT](/docs/datapack/data-types/nbt) | _optional_ | Values handed to the script. Read them with `event.params` from KubeJS, or `params` inside a data pack script. This is how one script serves several powers.

## Example

Turn the block into whatever the `params` name, but only if the block above is air, which is the sort of check that reads badly as nested block conditions:

```js
// kubejs/server_scripts/gardener.js
ApoliEvents.blockAction('gardener:sprout', event => {
  const above = event.pos.above()
  if (!event.level.getBlock(above).isAir()) return
  event.level.getBlock(above).set(event.params.getString('block'))
})
```

```json
{
  "type": "apoli:action_on_block_use",
  "block_action": {
    "type": "apoli:script",
    "script": "gardener:sprout",
    "params": { "block": "minecraft:short_grass" }
  }
}
```

> Needs [KubeJS](/docs/compat/kubejs). Without it the type still loads and the pack still works — the call logs once and does nothing. Scripts always run on the server.
