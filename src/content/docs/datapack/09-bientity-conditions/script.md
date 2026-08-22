---
title: "Script (Bi-Entity Condition Type)"
description: Passes when a script returns true for the actor and target.
navigation_title: "Script"
---

Passes when a script returns a truthy value for the pair. `event.entity` is the actor, `event.target` is the target.

Type ID: `apoli:script`

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`script` | [Identifier](/docs/datapack/data-types/identifier) | **required** | The script to run. Either an id registered from KubeJS with `ApoliEvents`, or the path of a `.js` file shipped in a data pack at `data/<namespace>/apoli/scripts/<path>.js` — in which case the `.js` is part of the id.
`params` | [NBT](/docs/datapack/data-types/nbt) | _optional_ | Values handed to the script. Read them with `event.params` from KubeJS, or `params` inside a data pack script. This is how one script serves several powers.

## Example

Only glow for players who are on the same scoreboard team *and* below half health — two conditions that are easy apart and awkward together:

```js
// kubejs/server_scripts/pack_sense.js
ApoliEvents.bientityCondition('mypack:wounded_ally', event => {
  const a = event.entity, b = event.target
  if (!a.team || !b.team || a.team.name !== b.team.name) return false
  return b.health < b.maxHealth / 2
})
```

```json
{
  "type": "apoli:entity_glow",
  "bientity_condition": {
    "type": "apoli:script",
    "script": "mypack:wounded_ally"
  }
}
```

> Needs [KubeJS](/docs/compat/kubejs). Without it the type still loads and the pack still works — the call logs once and does nothing. Scripts always run on the server.
