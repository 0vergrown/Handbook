---
title: "Scripting powers with KubeJS: apoli:script, ApoliEvents, and the sandbox"
description: A complete guide to writing power behaviour in JavaScript - the two authoring styles, every event, what ctx gives you, which loaders can run it, and exactly what the sandbox does and does not allow.
date: 2026-08-22
author: Overgrown
---

JSON is good at describing things and bad at describing *decisions*. Once a power needs "pick the nearest of these four, unless it's raining, and remember what it picked", you are writing a nested `if_else_list` that nobody will be able to read in a month.

Apoli 1.39.0 adds [`apoli:script`](/docs/datapack/entity-actions/script): an action, a condition and a power type that hand control to JavaScript. The runtime is [KubeJS](https://modrinth.com/mod/kubejs) and its Rhino engine — Apoli bundles neither, and does not try to.

## Before anything else: which loaders

| Loader | KubeJS build exists | `apoli:script` |
| --- | --- | --- |
| Fabric 1.20.1 | yes | works |
| NeoForge 1.21.1 | yes | works |
| Fabric 1.21.1 | **no** | types load, log once, do nothing |

KubeJS dropped Fabric for 1.21, so there is no combination of mods that makes scripting work on Fabric 1.21.1. The types are *behaviour-gated* rather than registration-gated, which means a pack that uses them still loads there — every call just logs once and no-ops instead of erroring. That is deliberate: a shared pack should degrade, not refuse to start.

## Style one: ApoliEvents

Register a handler under an id in `kubejs/server_scripts/`, then reference that id from JSON. This is the style to reach for when you are already running KubeJS.

```js
// kubejs/server_scripts/vampire.js
ApoliEvents.entityAction('vampire:drain', event => {
    const player = event.entity
    const level = event.level

    const victims = level.getEntitiesWithin(player.boundingBox.inflate(4))
        .filter(e => e.living && e !== player)

    if (victims.length === 0) return

    const target = victims[0]
    target.attack(2)
    player.heal(1)
})
```

```json
{
  "type": "apoli:action_on_key_press",
  "key": {
    "key": "key.origins.primary_active"
  },
  "cooldown": 60,
  "entity_action": {
    "type": "apoli:script",
    "script": "vampire:drain"
  }
}
```

Conditions return a value:

```js
ApoliEvents.entityCondition('vampire:is_starving', event => {
    return event.entity.foodLevel < 6
})
```

```json
{
  "type": "apoli:script",
  "script": "vampire:is_starving"
}
```

### Every event

All twelve are server-side and all take an id as their first argument.

| Event | Fired by |
| --- | --- |
| `ApoliEvents.entityAction` | `apoli:script` entity action |
| `ApoliEvents.bientityAction` | `apoli:script` bi-entity action |
| `ApoliEvents.blockAction` | `apoli:script` block action |
| `ApoliEvents.itemAction` | `apoli:script` item action |
| `ApoliEvents.entityCondition` | `apoli:script` entity condition |
| `ApoliEvents.bientityCondition` | `apoli:script` bi-entity condition |
| `ApoliEvents.blockCondition` | `apoli:script` block condition |
| `ApoliEvents.itemCondition` | `apoli:script` item condition |
| `ApoliEvents.powerAdded` | `apoli:script` power, `on_added` |
| `ApoliEvents.powerRemoved` | `apoli:script` power, `on_removed` |

There is deliberately no `powerTick` and no `powerActive`. Ticking is [`apoli:action_over_time`](/docs/datapack/powers/action_over_time) with an `apoli:script` action — which also gets you `interval`, `onset_delay`, `rising_action` and `falling_action` — and gating is the `condition` every power already has, holding an `apoli:script` condition.

### What the event gives you

| Property | Present for |
| --- | --- |
| `event.entity` | entity, bi-entity (the actor), item (the holder), power hooks |
| `event.target` | bi-entity only |
| `event.level` | everything |
| `event.pos` | block actions and conditions |
| `event.stack` | item actions and conditions |
| `event.params` | the `params` object from the JSON, as NBT |

`params` is how you write one script and use it from several powers:

```json
{
  "type": "apoli:script",
  "script": "vampire:drain",
  "params": {
    "radius": 6,
    "heal": 2
  }
}
```

```js
ApoliEvents.entityAction('vampire:drain', event => {
    const radius = event.params.getInt('radius')
    const heal = event.params.getInt('heal')
    // ...
})
```

## Style two: a .js file in the data pack

Sometimes the script belongs *with* the pack, not in the server's KubeJS folder — you are shipping a zip and you want the behaviour to travel with it.

Put the file at `data/<namespace>/apoli/scripts/<path>.js` and reference it by that exact path, extension included:

```json
{
  "type": "apoli:script",
  "script": "examplepack:examplescript.js"
}
```

Here the file body **is** the action. `ctx` and `params` are already in scope, and there is no handler to register:

```js
// data/examplepack/apoli/scripts/examplescript.js
ctx.entity.setSecondsOnFire(params.getInt('seconds'))
```

For a condition, the value of the last expression is the result:

```js
// data/examplepack/apoli/scripts/is_night.js
ctx.level.dayTime % 24000 > 13000
```

`ctx` carries the same things the event does, as methods: `ctx.getEntity()`, `ctx.getTarget()`, `ctx.getLevel()`, `ctx.getPos()`, `ctx.getStack()`, `ctx.getParams()`, plus `ctx.getPowers()` for the holder's [power container](/docs/addon/systems/power-container) and `ctx.getPower()` for the id of the power that invoked it.

Data pack scripts are **off by default**. Set `allow_data_pack_scripts` to `true` in `config/apoli-scripts.json`.

## Why that switch is off

The two styles are not equally trusted, and the config switch is where that distinction lives.

A script in `kubejs/server_scripts/` was put there by whoever runs the server. It runs with KubeJS's normal permissions, the same as any other KubeJS script, and Apoli does not sandbox it — sandboxing your own server operator would be theatre.

A `.js` file inside a data pack is different. Data packs get zipped, reposted, bundled into modpacks and dropped into worlds by people who did not write them. Treating "arbitrary JavaScript arrived with a world download" as trusted is how you end up in a security advisory. So Apoli treats it as hostile input:

**Scripts never touch the client.** They load and run server-side only, and script files are not part of any packet Apoli sends. A malicious pack cannot reach a player's machine through this at all — which removes the entire shape of vulnerability that bit Litematica in 2025, where a server could write files onto a connected client.

**There is no path.** Scripts resolve through the resource manager by namespaced id. Nowhere in the pipeline is a filesystem path built from pack-supplied text, so `../../mods/evil.jar` is not a filename that can exist — it is not a valid `ResourceLocation` in the first place, and even if it were, it would be looked up as a resource, not opened as a file.

**There is no Java bootstrap.** The scope is built from Rhino's *safe* standard objects. There is no `Packages`, no `java`, no `JavaAdapter`, no `importClass` or `importPackage`, and `getClass()` is not reachable on any object Apoli hands over — Rhino's member cache stops walking the class hierarchy before `java.lang.Object`, so the classic `thing.getClass().forName(...)` escape has nothing to grab.

**Escape routes are denied by name.** On top of that, any member whose type touches `java.io`, `java.nio.file`, `java.net`, `java.lang.reflect`, `java.lang.invoke`, `Class`, `ClassLoader`, `Runtime`, `Process`, `Thread`, the mod loader internals or `MinecraftServer` itself is filtered out of the object model before a script can see it. You can move an entity; you cannot reach the server's game directory through one.

**Runaway scripts are stopped.** Every invocation runs against an instruction budget with a deadline. `while (true) {}` in a data pack script aborts that script instead of hanging the server thread.

None of this is a reason to run untrusted packs. It is a reason that running one should not be worse than running untrusted JSON.

## Bindings

`Apoli` is bound in KubeJS scripts; the same object is `apoli` inside data pack scripts.

| Call | Result |
| --- | --- |
| `hasPower(entity, id)` | whether the entity holds that power |
| `grantPower(entity, id, source)` | grant a power from a source |
| `revokePower(entity, id, source)` | remove a power from a source |
| `isSuppressed(entity, id)` | whether the power is currently suppressed |

```js
ApoliEvents.powerAdded('vampire:awaken', event => {
  Apoli.grantPower(event.entity, 'vampire:night_vision', 'vampire:awakened')
})
```

## When not to use it

Scripting is the escape hatch, not the default. A script is opaque to Apoli: it cannot be inspected by `/apoli:power`, it does not participate in suppression, and it will not show up in a profiler as anything more specific than "a script ran".

If the thing you want is a comparison, a chance, a loop over nearby entities or a branch, Apoli already has [meta actions](/docs/datapack/meta-actions), [meta conditions](/docs/datapack/meta-conditions), [expressions](/docs/datapack/data-types/expression) and [`apoli:selector_action`](/docs/datapack/entity-actions/selector_action) — and those stay readable to everyone who opens your pack. Reach for a script when the logic genuinely has no JSON shape, and keep the script small enough that the JSON around it still tells the story.
