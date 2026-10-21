---
title: KubeJS
description: "Writing power behaviour in JavaScript with script actions, conditions and power hooks, backed by KubeJS."
---

Apoli's [`apoli:script`](/docs/datapack/entity-actions/script) types let a pack author write behaviour in JavaScript instead of JSON. The scripting runtime comes from [KubeJS](https://modrinth.com/mod/kubejs) and its Rhino engine, and Apoli bundles neither.

| Loader | KubeJS available | `apoli:script` |
| --- | --- | --- |
| Fabric 1.20.1 | Yes (`kubejs-fabric`) | Works |
| NeoForge 1.21.1 | Yes (`kubejs-neoforge`) | Works |
| Fabric 1.21.1 | No Fabric build exists | The types load, but log that no backend is installed |

The types are behaviour-gated, not registration-gated. They always exist, so a pack that uses them still loads without KubeJS, and each call logs once and does nothing.

## Two ways to write a script

### From a KubeJS script with ApoliEvents

In `kubejs/server_scripts/`, register a handler under an ID and use that ID from JSON:

```js
ApoliEvents.entityAction('mypack:zap', event => {
  const entity = event.entity
  entity.setSecondsOnFire(5)
})

ApoliEvents.entityCondition('mypack:is_rich', event => {
  return event.entity.experienceLevel > 30
})
```
```json
{ "type": "apoli:script", "script": "mypack:zap" }
```

The event handlers are `entityAction`, `bientityAction`, `blockAction`, `itemAction`, `entityCondition`, `bientityCondition`, `blockCondition`, `itemCondition`, `powerAdded` and `powerRemoved`. All of them run on the server. To run a script every tick, use [`apoli:action_over_time`](/docs/datapack/powers/action_over_time) with an `apoli:script` action, and to switch a power on and off, give it an `apoli:script` condition.

### From the data pack with a .js file

Put the file at `data/<namespace>/apoli/scripts/<path>.js` and refer to it by that path:

```json
{ "type": "apoli:script", "script": "examplepack:examplescript.js" }
```

The file body is the action. `ctx` and `params` are in scope, and for a condition the value of the last expression is the result:

```js title="data/examplepack/apoli/scripts/examplescript.js"
ctx.entity.setSecondsOnFire(params.getInt("seconds"))
```

Data pack scripts are off by default. Set `allow_data_pack_scripts` to `true` in `config/apoli-scripts.json` to enable them.

## The sandbox

A data pack `.js` file is content that arrives with a world, so it isn't trusted the way a `kubejs/` script is. Apoli runs it under real limits:

- Server only. Script files are never sent to clients and never run there.
- Resolved through the resource manager, by namespaced ID. There is no file system path anywhere in the pipeline, so a crafted ID can't escape the data pack, and the directory traversal used in the 2025 Litematica exploit can't happen here.
- No Java bootstrap. The scope is built from Rhino's safe standard objects: there is no `Packages`, `java`, `JavaAdapter` or `importClass`, and `getClass()` isn't exposed on wrapped objects. A script can only touch what Apoli hands it.
- Escape routes are denied explicitly. Members whose type is in `java.io`, `java.nio.file`, `java.net`, `java.lang.reflect` or `java.lang.invoke`, or is `Class`, `ClassLoader`, `Runtime`, `Process`, `Thread`, a loader internal or `MinecraftServer` itself, are filtered out of the object model.
- Bounded. Scripts run against an instruction budget and are stopped if they go over it, so a runaway loop can't hang the server thread.
- Opt-in. The whole file-based path is off until an operator turns it on.

Scripts registered from `kubejs/server_scripts/` are written by the operator and run with KubeJS's normal permissions. The sandbox above only applies to data pack files.

## Bindings

`Apoli` is bound in KubeJS scripts, and `apoli` inside data pack scripts:

| Call | Result |
| --- | --- |
| `hasPower(entity, id)` | Whether the entity holds the power |
| `grantPower(entity, id, source)` | Grants a power from a source |
| `revokePower(entity, id, source)` | Removes a power from a source |
| `isSuppressed(entity, id)` | Whether the power is currently suppressed |
