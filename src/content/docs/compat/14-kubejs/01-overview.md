---
title: KubeJS
description: Write power behaviour in JavaScript — script actions, conditions and power hooks, backed by KubeJS.
---

Apoli's [`apoli:script`](/docs/datapack/entity-actions/script) types let a pack author write behaviour in JavaScript instead of JSON. The scripting runtime comes from [KubeJS](https://modrinth.com/mod/kubejs) and its Rhino engine — Apoli bundles neither.

| Loader | KubeJS available | `apoli:script` |
| --- | --- | --- |
| Fabric 1.20.1 | yes (`kubejs-fabric`) | works |
| NeoForge 1.21.1 | yes (`kubejs-neoforge`) | works |
| Fabric 1.21.1 | no Fabric build exists | types load, but log that no backend is installed |

The types are **behaviour-gated**, not registration-gated: they always exist, so a pack that uses them still loads without KubeJS — each call just logs once and does nothing.

## Two ways to write a script

### 1. From a KubeJS script — `ApoliEvents`

In `kubejs/server_scripts/`, register a handler under an id and reference that id from JSON:

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

The event handlers are `entityAction`, `bientityAction`, `blockAction`, `itemAction`, `entityCondition`, `bientityCondition`, `blockCondition`, `itemCondition`, `powerAdded`, `powerRemoved`, `powerTick` and `powerActive`. All are **server-side**.

### 2. From the data pack — a `.js` file

Put the file at `data/<namespace>/apoli/scripts/<path>.js` and reference it by that path:

```json
{ "type": "apoli:script", "script": "examplepack:examplescript.js" }
```

The file body *is* the action. `ctx` and `params` are in scope, and for a condition the value of the last expression is the result:

```js
// data/examplepack/apoli/scripts/examplescript.js
ctx.entity.setSecondsOnFire(params.getInt("seconds"))
```

Data-pack scripts are **off by default**. Set `allow_data_pack_scripts` to `true` in `config/apoli-scripts.json` to enable them.

## The sandbox

A data-pack `.js` file is content that arrives with a world, so it is not trusted the way a `kubejs/` script is. Apoli runs it under real constraints:

- **Server only.** Script files are never sent to clients and never execute there.
- **Resolved through the resource manager**, by namespaced id. There is no filesystem path anywhere in the pipeline, so a crafted id cannot escape the data pack — the directory-traversal shape of the 2025 Litematica exploit is not reachable.
- **No Java bootstrap.** The scope is built with Rhino's *safe* standard objects: there is no `Packages`, no `java`, no `JavaAdapter`, no `importClass`, and `getClass()` is not exposed on wrapped objects. A script can only touch what Apoli hands it.
- **Escape routes are denied explicitly.** Members whose type is `java.io`, `java.nio.file`, `java.net`, `java.lang.reflect`, `java.lang.invoke`, `Class`, `ClassLoader`, `Runtime`, `Process`, `Thread`, the loader internals or `MinecraftServer` itself are filtered out of the object model.
- **Bounded.** Scripts run against an instruction budget and are stopped if they exceed it, so a runaway loop cannot hang the server thread.
- **Opt-in.** The whole file-based path is off until an operator turns it on.

Scripts registered from `kubejs/server_scripts/` are *operator-authored* and run with KubeJS's normal permissions — the sandbox above applies to data-pack files.

## Bindings

`Apoli` is bound in KubeJS scripts, and `apoli` inside data-pack scripts:

| Call | Result |
| --- | --- |
| `hasPower(entity, id)` | whether the entity holds the power |
| `grantPower(entity, id, source)` | grants a power from a source |
| `revokePower(entity, id, source)` | removes a power from a source |
| `isSuppressed(entity, id)` | whether the power is currently suppressed |
