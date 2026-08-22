---
title: "Script (Entity Action Type)"
description: Runs a script against one entity.
navigation_title: "Script"
---

Runs a script against one entity. Use it when the behaviour you want has no shape in JSON — picking a target out of a list, remembering something between calls, or branching on state Apoli has no condition for.

Type ID: `apoli:script`

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`script` | [Identifier](/docs/datapack/data-types/identifier) | **required** | The script to run. Either an id registered from KubeJS with `ApoliEvents`, or the path of a `.js` file shipped in a data pack at `data/<namespace>/apoli/scripts/<path>.js` — in which case the `.js` is part of the id.
`params` | [NBT](/docs/datapack/data-types/nbt) | _optional_ | Values handed to the script. Read them with `event.params` from KubeJS, or `params` inside a data pack script. This is how one script serves several powers.

## Examples

Drain the nearest living entity within four blocks and heal for what you took. The whole search-and-pick is one line of JavaScript instead of a nested `apoli:selector` and `apoli:if_else_list`:

```js
// kubejs/server_scripts/vampire.js
ApoliEvents.entityAction('vampire:drain', event => {
  const player = event.entity
  const victim = event.level.getEntitiesWithin(player.boundingBox.inflate(4))
    .filter(e => e.living && e !== player)
    .sort((a, b) => a.distanceToSqr(player) - b.distanceToSqr(player))[0]

  if (!victim) return
  victim.attack(event.params.getFloat('damage'))
  player.heal(event.params.getFloat('heal'))
})
```

```json
{
  "type": "apoli:action_on_key_press",
  "key": { "key": "key.origins.primary_active" },
  "cooldown": 60,
  "entity_action": {
    "type": "apoli:script",
    "script": "vampire:drain",
    "params": { "damage": 4.0, "heal": 2.0 }
  }
}
```

The same action written as a data pack file instead, so the behaviour ships inside the zip. The file body *is* the action, and `ctx` and `params` are already in scope:

```js
// data/vampire/apoli/scripts/drain.js
ctx.entity.heal(params.getFloat('heal'))
```

```json
{
  "type": "apoli:script",
  "script": "vampire:drain.js",
  "params": { "heal": 2.0 }
}
```

Data pack scripts are disabled until an operator enables them — see [the KubeJS page](/docs/compat/kubejs) for that and for what the sandbox allows.

> Needs [KubeJS](/docs/compat/kubejs). Without it the type still loads and the pack still works — the call logs once and does nothing. Scripts always run on the server.
