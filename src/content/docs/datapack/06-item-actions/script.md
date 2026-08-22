---
title: "Script (Item Action Type)"
description: Runs a script against an item stack.
navigation_title: "Script"
---

Runs a script against an item stack. `event.stack` is the stack and `event.entity` is whoever is holding it, when there is one.

Type ID: `apoli:script`

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`script` | [Identifier](/docs/datapack/data-types/identifier) | **required** | The script to run. Either an id registered from KubeJS with `ApoliEvents`, or the path of a `.js` file shipped in a data pack at `data/<namespace>/apoli/scripts/<path>.js` — in which case the `.js` is part of the id.
`params` | [NBT](/docs/datapack/data-types/nbt) | _optional_ | Values handed to the script. Read them with `event.params` from KubeJS, or `params` inside a data pack script. This is how one script serves several powers.

## Example

Rename the stack after the holder, which needs a value only known at runtime:

```js
// kubejs/server_scripts/soulbound.js
ApoliEvents.itemAction('soulbound:brand', event => {
  if (!event.entity) return
  event.stack.setCustomName(`${event.entity.username}'s ${event.stack.name.string}`)
})
```

```json
{
  "type": "apoli:action_on_item_use",
  "item_action": {
    "type": "apoli:script",
    "script": "soulbound:brand"
  }
}
```

> Needs [KubeJS](/docs/compat/kubejs). Without it the type still loads and the pack still works — the call logs once and does nothing. Scripts always run on the server.
