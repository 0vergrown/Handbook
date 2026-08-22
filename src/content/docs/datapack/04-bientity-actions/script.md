---
title: "Script (Bi-Entity Action Type)"
description: Runs a script against an actor and a target.
navigation_title: "Script"
---

Runs a script against a pair of entities. `event.entity` is the actor and `event.target` is the target.

Type ID: `apoli:script`

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`script` | [Identifier](/docs/datapack/data-types/identifier) | **required** | The script to run. Either an id registered from KubeJS with `ApoliEvents`, or the path of a `.js` file shipped in a data pack at `data/<namespace>/apoli/scripts/<path>.js` — in which case the `.js` is part of the id.
`params` | [NBT](/docs/datapack/data-types/nbt) | _optional_ | Values handed to the script. Read them with `event.params` from KubeJS, or `params` inside a data pack script. This is how one script serves several powers.

## Example

Steal a random effect from whoever you hit and put it on yourself:

```js
// kubejs/server_scripts/thief.js
ApoliEvents.bientityAction('thief:steal_effect', event => {
  const effects = event.target.activeEffectsMap
  const keys = Object.keys(effects)
  if (keys.length === 0) return

  const stolen = effects[keys[Math.floor(Math.random() * keys.length)]]
  event.target.removeEffect(stolen.effect)
  event.entity.potionEffects.add(stolen.effect, stolen.duration, stolen.amplifier)
})
```

```json
{
  "type": "apoli:action_on_hit",
  "bientity_action": {
    "type": "apoli:script",
    "script": "thief:steal_effect"
  }
}
```

> Needs [KubeJS](/docs/compat/kubejs). Without it the type still loads and the pack still works — the call logs once and does nothing. Scripts always run on the server.
