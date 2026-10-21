---
title: "Scripting powers with KubeJS"
description: "Writing power behaviour in JavaScript with apoli:script: the two ways to write a script, every event, what ctx gives you, which loaders can run it, and what the sandbox allows."
date: 2026-08-22
author: Overgrown
---

JSON is good at describing things and bad at describing decisions. Once a power needs to "pick the nearest of these four, unless it's raining, and remember what it picked", you're writing a nested `if_else_list` that nobody will be able to read in a month.

Apoli 1.39.0 adds [`apoli:script`](/docs/datapack/entity-actions/script): an action, a condition and a power type that hand control to JavaScript. The runtime is [KubeJS](https://modrinth.com/mod/kubejs) and its Rhino engine. Apoli bundles neither, and doesn't try to.

## First, which loaders

| Loader | KubeJS build exists | `apoli:script` |
| --- | --- | --- |
| Fabric 1.20.1 | Yes | Works |
| NeoForge 1.21.1 | Yes | Works |
| Fabric 1.21.1 | No | The types load, log once and do nothing |

KubeJS dropped Fabric for 1.21, so no combination of mods makes scripting work on Fabric 1.21.1. The types are behaviour-gated instead of registration-gated, which means a pack that uses them still loads there. Every call logs once and does nothing, instead of erroring. That's on purpose: a shared pack should lose a feature, not refuse to start.

## ApoliEvents

Register a handler under an ID in `kubejs/server_scripts/`, then use that ID from JSON. This is the way to go when you're already running KubeJS.

```js title="kubejs/server_scripts/vampire.js"
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

All ten run on the server, and all take an ID as their first argument.

| Event | Fired by |
| --- | --- |
| `ApoliEvents.entityAction` | The `apoli:script` entity action |
| `ApoliEvents.bientityAction` | The `apoli:script` bi-entity action |
| `ApoliEvents.blockAction` | The `apoli:script` block action |
| `ApoliEvents.itemAction` | The `apoli:script` item action |
| `ApoliEvents.entityCondition` | The `apoli:script` entity condition |
| `ApoliEvents.bientityCondition` | The `apoli:script` bi-entity condition |
| `ApoliEvents.blockCondition` | The `apoli:script` block condition |
| `ApoliEvents.itemCondition` | The `apoli:script` item condition |
| `ApoliEvents.powerAdded` | The `apoli:script` power, `on_added` |
| `ApoliEvents.powerRemoved` | The `apoli:script` power, `on_removed` |

There's no `powerTick` and no `powerActive`, on purpose. Ticking is [`apoli:action_over_time`](/docs/datapack/powers/action_over_time) with an `apoli:script` action, which also gets you `interval`, `onset_delay`, `rising_action` and `falling_action`. Gating is the `condition` every power already has, holding an `apoli:script` condition.

### What the event gives you

| Property | Present for |
| --- | --- |
| `event.entity` | Entity and bi-entity events (the actor), item events (the holder), and the power hooks |
| `event.target` | Bi-entity events only |
| `event.level` | Everything |
| `event.pos` | Block actions and conditions |
| `event.stack` | Item actions and conditions |
| `event.params` | The `params` object from the JSON, as NBT |

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

    const victims = event.level.getEntitiesWithin(event.entity.boundingBox.inflate(radius))
        .filter(e => e.living && e !== event.entity)

    if (victims.length === 0) return

    victims[0].attack(2)
    event.entity.heal(heal)
})
```

## A .js file in the data pack

Sometimes the script belongs with the pack instead of in the server's KubeJS folder, because you're shipping a zip and want the behaviour to travel with it.

Put the file at `data/<namespace>/apoli/scripts/<path>.js` and refer to it by that exact path, extension included:

```json
{
  "type": "apoli:script",
  "script": "examplepack:examplescript.js"
}
```

Here the file body is the action. `ctx` and `params` are already in scope, and there's no handler to register:

```js title="data/examplepack/apoli/scripts/examplescript.js"
ctx.entity.setSecondsOnFire(params.getInt('seconds'))
```

For a condition, the value of the last expression is the result:

```js title="data/examplepack/apoli/scripts/is_night.js"
ctx.level.dayTime % 24000 > 13000
```

`ctx` carries the same things the event does, as methods: `ctx.getEntity()`, `ctx.getTarget()`, `ctx.getLevel()`, `ctx.getPos()`, `ctx.getStack()` and `ctx.getParams()`, plus `ctx.getPowers()` for the holder's [power container](/docs/addon/systems/power-container) and `ctx.getPower()` for the ID of the power that called it.

Data pack scripts are off by default. Set `allow_data_pack_scripts` to `true` in `config/apoli-scripts.json` to turn them on.

## Why that switch is off

The two ways of writing scripts aren't trusted equally, and the config switch is where that difference lives.

A script in `kubejs/server_scripts/` was put there by whoever runs the server. It runs with KubeJS's normal permissions, like any other KubeJS script, and Apoli doesn't sandbox it. Sandboxing your own server operator would be theatre.

A `.js` file inside a data pack is different. Data packs get zipped, reposted, bundled into modpacks and dropped into worlds by people who didn't write them. Trusting arbitrary JavaScript that arrived with a world download is how you end up in a security advisory, so Apoli treats it as hostile input.

Scripts never touch the client. They load and run on the server only, and script files aren't part of any packet Apoli sends, so a malicious pack can't reach a player's machine through this at all. That rules out the whole kind of vulnerability that bit Litematica in 2025, where a server could write files onto a connected client.

There's no path. Scripts resolve through the resource manager by namespaced ID, and nowhere in the pipeline is a file system path built from text the pack supplies. `../../mods/evil.jar` can't be a filename here, since it isn't a valid `ResourceLocation` in the first place, and even if it were, it would be looked up as a resource, never opened as a file.

There's no Java bootstrap. The scope is built from Rhino's safe standard objects. There's no `Packages`, `java`, `JavaAdapter`, `importClass` or `importPackage`, and `getClass()` can't be reached on any object Apoli hands over. Rhino's member cache stops walking the class hierarchy before `java.lang.Object`, so the classic `thing.getClass().forName(...)` escape has nothing to grab.

Escape routes are denied by name as well. Any member whose type touches `java.io`, `java.nio.file`, `java.net`, `java.lang.reflect`, `java.lang.invoke`, `Class`, `ClassLoader`, `Runtime`, `Process`, `Thread`, the mod loader internals or `MinecraftServer` itself is filtered out of the object model before a script can see it. You can move an entity, but you can't reach the server's game directory through one.

Runaway scripts are stopped. Every call runs against an instruction budget with a deadline, so `while (true) {}` in a data pack script aborts that script instead of hanging the server thread.

None of this makes it a good idea to run untrusted packs. It just means running one shouldn't be worse than running untrusted JSON.

## Bindings

`Apoli` is bound in KubeJS scripts, and the same object is `apoli` inside data pack scripts.

| Call | Result |
| --- | --- |
| `hasPower(entity, id)` | Whether the entity holds that power |
| `grantPower(entity, id, source)` | Grants a power from a source |
| `revokePower(entity, id, source)` | Removes a power from a source |
| `isSuppressed(entity, id)` | Whether the power is currently suppressed |

```js
ApoliEvents.powerAdded('vampire:awaken', event => {
  Apoli.grantPower(event.entity, 'vampire:night_vision', 'vampire:awakened')
})
```

## When not to use it

Scripting is the escape hatch, and I wouldn't make it the default. A script is opaque to Apoli: `/apoli:power` can't inspect it, it doesn't take part in suppression, and it won't show up in a profiler as anything more specific than "a script ran".

If what you want is a comparison, a chance, a loop over nearby entities or a branch, Apoli already has [meta actions](/docs/datapack/meta-actions), [meta conditions](/docs/datapack/meta-conditions), [expressions](/docs/datapack/data-types/expression) and [`apoli:selector_action`](/docs/datapack/entity-actions/selector_action), and those stay readable to everyone who opens your pack. Reach for a script when the logic really has no JSON shape, and keep the script small enough that the JSON around it still tells the story.

