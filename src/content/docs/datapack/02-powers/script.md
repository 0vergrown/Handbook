---
title: "Script (Power Type)"
description: "Runs a script when the power is granted or revoked."
navigation_title: "Script"
---

Runs a script when the power is granted to an entity or taken away again. Needs [KubeJS](/docs/compat/kubejs) — without it the power loads and logs once that no script backend is installed.

Type ID: `apoli:script`

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`on_added` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | Script to run when the power is granted.
`on_removed` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | Script to run when the power is revoked.
`params` | [NBT](/docs/datapack/data-types/nbt) | _optional_ | Values handed to the script as `params`.

## Example

```json
{
  "type": "apoli:script",
  "on_added": "mypack:welcome",
  "params": { "message": "Welcome to the coven." }
}
```

```js
// kubejs/server_scripts/coven.js
ApoliEvents.powerAdded('mypack:welcome', event => {
  event.entity.tell(event.params.getString('message'))
})
```

> This power type only covers grant and revoke, because that is the one thing you cannot compose. To run a script **on a timer**, use [`apoli:action_over_time`](/docs/datapack/powers/action_over_time) with an [`apoli:script`](/docs/datapack/entity-actions/script) action — you get `interval`, `onset_delay`, `rising_action` and `falling_action` for free. To gate a power on a script, put an [`apoli:script`](/docs/datapack/entity-conditions/script) condition in the power's own `condition`.
