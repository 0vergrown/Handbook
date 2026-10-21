---
title: "Script (Power Type)"
description: "Runs a script when the power is granted or revoked."
navigation_title: "Script"
---

Runs a script when the power is granted to an entity or taken away again. It needs [KubeJS](/docs/compat/kubejs). Without KubeJS the power still loads, and the log says once that no script backend is installed.

Type ID: `apoli:script`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `on_added` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | The script to run when the power is granted. |
| `on_removed` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | The script to run when the power is revoked. |
| `params` | [NBT](/docs/datapack/data-types/nbt) | _optional_ | Values handed to the script as `params`. |

## Example

```json
{
  "type": "apoli:script",
  "on_added": "mypack:welcome",
  "params": { "message": "Welcome to the coven." }
}
```

The script it runs, in `kubejs/server_scripts/coven.js`:

```js title="kubejs/server_scripts/coven.js"
ApoliEvents.powerAdded('mypack:welcome', event => {
  event.entity.tell(event.params.getString('message'))
})
```

> [!TIP]
> This power only covers granting and revoking, because those can't be built from other types. To run a script on a timer, use [`apoli:action_over_time`](/docs/datapack/powers/action_over_time) with an [`apoli:script`](/docs/datapack/entity-actions/script) action, which gives you `interval`, `onset_delay`, `rising_action` and `falling_action`. To make a power depend on a script, put an [`apoli:script`](/docs/datapack/entity-conditions/script) condition in the power's own `condition`.
