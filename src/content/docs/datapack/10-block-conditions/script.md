---
title: "Script (Block Condition Type)"
description: Passes when a script returns true for the block position.
navigation_title: "Script"
---

Passes when a script returns a truthy value for the block position.

Type ID: `apoli:script`

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`script` | [Identifier](/docs/datapack/data-types/identifier) | **required** | The script to run. Either an id registered from KubeJS with `ApoliEvents`, or the path of a `.js` file shipped in a data pack at `data/<namespace>/apoli/scripts/<path>.js` — in which case the `.js` is part of the id.
`params` | [NBT](/docs/datapack/data-types/nbt) | _optional_ | Values handed to the script. Read them with `event.params` from KubeJS, or `params` inside a data pack script. This is how one script serves several powers.

## Example

```js
// kubejs/server_scripts/mossy.js
ApoliEvents.blockCondition('mypack:mossy_neighbour', event => {
  return event.pos.allInBox(event.pos.offset(-1, -1, -1), event.pos.offset(1, 1, 1))
    .some(p => event.level.getBlock(p).id.includes('moss'))
})
```

```json
{
  "type": "apoli:action_on_block_break",
  "block_condition": {
    "type": "apoli:script",
    "script": "mypack:mossy_neighbour"
  },
  "block_action": { "type": "apoli:bonemeal" }
}
```

> Needs [KubeJS](/docs/compat/kubejs). Without it the type still loads and the pack still works — the call logs once and does nothing. Scripts always run on the server.
