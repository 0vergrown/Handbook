---
title: "Script (Item Condition Type)"
description: Passes when a script returns true for the item stack.
navigation_title: "Script"
---

Passes when a script returns a truthy value for the stack. `event.stack` is the stack, and `event.entity` is the holder when there is one.

Type ID: `apoli:script`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `script` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The script to run. Either an ID registered from KubeJS with `ApoliEvents`, or the path of a `.js` file shipped in a data pack at `data/<namespace>/apoli/scripts/<path>.js`, in which case the `.js` is part of the ID. |
| `params` | [NBT](/docs/datapack/data-types/nbt) | _optional_ | Values handed to the script. Read them with `event.params` from KubeJS, or `params` inside a data pack script. This is how one script serves several powers. |

## Example

Stop a named item with three or more enchantments from being used. The script goes in `kubejs/server_scripts/heirloom.js`:

```js title="kubejs/server_scripts/heirloom.js"
ApoliEvents.itemCondition('mypack:is_heirloom', event => {
  return event.stack.hasCustomName() && event.stack.enchantments.size() >= 3
})
```

```json
{
  "type": "apoli:prevent_item_use",
  "item_condition": {
    "type": "apoli:script",
    "script": "mypack:is_heirloom"
  }
}
```

> [!NOTE]
> This condition needs [KubeJS](/docs/compat/kubejs). Without it the type still loads and the pack still works, but the call logs once and does nothing. Scripts always run on the server.
