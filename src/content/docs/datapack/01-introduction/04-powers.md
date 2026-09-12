---
title: Powers
description: The top-level unit: What a power is and the fields every power shares.
---

A **power** is the top-level unit in Apoli: the thing an entity *has*. Every power is a JSON object with a `type`, and the `type` decides what the power does.

## The shape of a power

```json
{
   "name":"Tough",
   "description":"You have more health than most.",
   "type":"apoli:attribute",
   "modifiers":[
      {
         "attribute":"minecraft:generic.max_health",
         "operation":"add_base_early",
         "value":10
      }
   ]
}
```

Seven fields are shared by **every** power type. Everything else is type-specific.

| Field         | Type                                                       | Default  | Purpose                                                      |
|---------------|------------------------------------------------------------|----------|--------------------------------------------------------------|
| `type`        | [Identifier](/docs/datapack/data-types/identifier)         | —        | **Required.** Which power type this is.                      |
| `name`        | [Text Component](/docs/datapack/data-types/text-component) | auto     | Display name. Falls back to a translation key.               |
| `description` | [Text Component](/docs/datapack/data-types/text-component) | auto     | Description shown in menus. Falls back to a translation key. |
| `condition`   | [Entity Condition](/docs/datapack/introduction/conditions) | optional | The power is only *active* while this passes.                |
| `hidden`      | [Boolean](/docs/datapack/data-types/boolean)               | `false`  | Hide the power from origin/power screens.                    |
| `tags`        | string or list of strings                                  | `[]`     | Free-form labels for this power. Actions that work on powers can select by tag instead of by id — see [Tagging powers](#tagging-powers). |
| `load_condition` | [Meta condition](/docs/datapack/meta-conditions/constant) | optional | Checked during the reload; the power is skipped before it parses if it fails — see [Gating a power at load time](#gating-a-power-at-load-time). |

The top-level `condition` is worth remembering: it's how you make a power conditional without changing its type. A `condition` of `apoli:sneaking` means the power only works while sneaking.

## Gating a power at load time

`condition` decides whether an already-loaded power is *active*. A seventh field, `load_condition`, decides whether the power is **read at all**.

| Field | Type | Default | Purpose |
|-------|------|---------|---------|
| `load_condition` | [Meta condition](/docs/datapack/meta-conditions/constant) | optional | Checked once, during the reload, before the rest of the power reaches a codec. If it does not hold, the power is skipped entirely. |

That ordering is the whole point. A power whose `load_condition` fails is dropped *before* its other fields are parsed, so it does not matter whether they would have parsed on this version of the game or with this set of mods. A `condition` cannot do that — the power has to load successfully first, and a field the codec rejects takes the whole power with it.

Only **context-free** condition types are allowed there, because there is no entity, item or block to test against during a reload:

- [`apoli:minecraft_version`](/docs/datapack/meta-conditions/minecraft_version)
- [`apoli:mod_loaded`](/docs/datapack/meta-conditions/mod_loaded)
- [`apoli:constant`](/docs/datapack/meta-conditions/constant) and [`apoli:nothing`](/docs/datapack/meta-conditions/nothing)
- [`apoli:all_of`](/docs/datapack/meta-conditions/all_of) / [`apoli:any_of`](/docs/datapack/meta-conditions/any_of) over those

`inverted` works as it does on any other condition. Anything else is rejected with a log line and the power is **kept**, so a typo never silently deletes a power.

```json
{
  "type": "apoli:multiple",
  "dragon_wings": {
    "type": "apoli:wings",
    "wings_type": "icarus:purple_dragon_wings",
    "load_condition": { "type": "apoli:mod_loaded", "mod": "icarus" }
  },
  "elytra": {
    "type": "apoli:elytra_flight",
    "render_elytra": false,
    "load_condition": { "type": "apoli:mod_loaded", "mod": "icarus", "inverted": true }
  }
}
```

Written on [`apoli:multiple`](/docs/datapack/powers/multiple), `load_condition` works on each sub-power independently — a dropped sub-power is left out of the parent's `sub_powers` list, so nothing goes looking for it. Put it at the top level of the `apoli:multiple` instead and it gates the whole bundle.

Origins reads the same field on `origins/` and `origin_layers/` files, so an origin can exist only where its powers do.

## Categories of power

There are over a hundred power types and every one has its __own page__ in the **Powers** section of the sidebar. They fall into a few loose families:

| Family                | What they do                                                     | Examples                                                                                                                                     |
|-----------------------|------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| Attribute & stat      | Change numbers                                                   | [`Attribute (Power Type)`](/docs/datapack/powers/attribute), [`Modify Damage (Power Type)`](/docs/datapack/powers/modify_damage_dealt)       |
| Movement              | Flight, climbing, phasing                                        | [`Creative Flight (Power Type)`](/docs/datapack/powers/creative_flight), [`Climbing (Power Type)`](/docs/datapack/powers/climbing)           |
| Prevention & immunity | Take an ability away                                             | [`Invulnerability (Power Type)`](/docs/datapack/powers/invulnerability), [`Prevent Death (Power Type)`](/docs/datapack/powers/prevent_death) |
| Action-driven         | Fire [actions](/docs/datapack/introduction/actions) on a trigger | [`apoli:action_on_hit`](/docs/datapack/powers/action_on_hit), [`apoli:action_over_time`](/docs/datapack/powers/action_over_time)             |
| Resources & state     | Store a number, timer, or group                                  | [`apoli:resource`](/docs/datapack/powers/resource), [`apoli:cooldown`](/docs/datapack/powers/cooldown)                                       |
| Rendering & cosmetic  | Colours, overlays, particles                                     | [`apoli:model_color`](/docs/datapack/powers/model_color), [`apoli:particle`](/docs/datapack/powers/particle)                                 |
| Item & inventory      | Containers, recipes, projectiles                                 | [`apoli:inventory`](/docs/datapack/powers/inventory), [`apoli:fire_projectile`](/docs/datapack/powers/fire_projectile)                       |
| Structural            | Bundle or flag                                                   | [`apoli:multiple`](/docs/datapack/powers/multiple), [`apoli:simple`](/docs/datapack/powers/simple)                                           |

## Powers are inert until granted

Writing a power file doesn't do anything on its own. Something has to give the power to an entity:

- a `/power grant` command,
- an **Origins** origin (via a [layer](/docs/datapack/origins/layers)),
- an [action](/docs/datapack/introduction/actions) like `Grant Power (Entity Action Type)`,
- a [global power set](#global-powers), which grants to whole entity types automatically.

Once granted, Apoli applies the power's effect and if it has a top-level `condition`, it keeps it active only while that condition holds.

## Global powers

A file in `data/<namespace>/global_powers/<name>.json` grants powers to entities **by entity type**, with no origin and no command. Every matching entity gets them when it loads into the world.

```json
{
  "entity_types": [
    "minecraft:pig",
    "#minecraft:undead"
  ],
  "powers": [
    "example:tough"
  ],
  "order": 0
}
```

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `entity_types` | [Identifier](/docs/datapack/data-types/identifier), or an array of them | all entities | Which entity types get the powers. `#`-prefixed entries are entity type tags. Omit the field entirely to match **everything**. |
| `powers` | [Array](/docs/datapack/data-types/array) of [Identifier](/docs/datapack/data-types/identifier) | _required_ | The powers to grant. |
| `replace` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Discard the powers every earlier-ordered set contributed to this entity type, then add these. |
| `order` | [Integer](/docs/datapack/data-types/integer) | `0` | Sets which sets are applied first. Ties break by file id. |
| `loading_priority` | [Integer](/docs/datapack/data-types/integer) | `0` | Higher wins when two data packs define the same file id. |

The powers arrive under the source `apoli:global`, so they sit alongside anything an origin or a command granted and are revoked cleanly when a set stops matching.

> **This is the most expensive feature in Apoli if you misuse it.** A set with no `entity_types` grants to *every* entity in the world — arrows, item drops, area-effect clouds — and each one then ticks each power. Scope by type or tag, and think hard before putting an [`apoli:action_over_time`](/docs/datapack/powers/action_over_time) in one.

> Which powers a given entity type receives is worked out **once per entity type per data-pack load** and cached, so spawning a thousand zombies does not re-evaluate a thousand times. When no global power sets exist at all, the whole system costs a single boolean check per entity load.

> Sets are re-evaluated on `/reload`, and every already-loaded entity is reconciled against the new result — powers whose set no longer matches are revoked in the same pass.

## Tagging powers

`tags` puts one or more free-form labels on a power. Nothing reads them on its own — they exist so
that actions which operate on powers can name a *group* of powers instead of listing every id:

```json
{
    "type": "apoli:action_on_key_press",
    "tags": ["copyable_move"],
    "entity_action": {
        "type": "apoli:execute_command",
        "command": "say hi"
    }
}
```

Three actions take a `tags` list and act on every power the entity holds that carries one of them:

- [apoli:transfer](/docs/datapack/bientity-actions/transfer) — steal or copy the tagged powers.
- [apoli:suppress_power](/docs/datapack/entity-actions/suppress_power) — switch them off.
- [apoli:unsuppress_power](/docs/datapack/entity-actions/unsuppress_power) — switch them back on.

That is what makes "copy one move from whatever origin you touched" a single action rather than a
list that has to be updated whenever a pack adds a power: tag the moves once, and the action finds
them.

Tags are plain strings, matched exactly and case-sensitively. They are not
[identifiers](/docs/datapack/data-types/identifier) and are not namespaced for you, so on a server
running several packs, prefix them with something of your own (`mypack.copyable`) to avoid two packs
meaning different things by the same word.
