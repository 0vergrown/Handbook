---
title: Powers
description: What a power is, and the fields every power type shares.
---

A power is the top-level unit in Apoli: something an entity has. Every power is a JSON object with a `type`, and the `type` decides what the power does.

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

Every power type shares these seven fields. All other fields depend on the type.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `type` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | Which power type this is. |
| `name` | [Text Component](/docs/datapack/data-types/text-component) | auto | The display name. Falls back to a translation key. |
| `description` | [Text Component](/docs/datapack/data-types/text-component) | auto | The description shown in menus. Falls back to a translation key. |
| `condition` | [Entity Condition](/docs/datapack/introduction/conditions) | _optional_ | The power is only active while this passes. |
| `hidden` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Hides the power from the origin and power screens. |
| `tags` | string or list of strings | `[]` | Free-form labels. Actions that work on powers can select powers by tag instead of by ID. See [Tagging powers](#tagging-powers). |
| `load_condition` | [Meta condition](/docs/datapack/meta-conditions/constant) | _optional_ | Checked during the reload. If it fails, the power is skipped before it is parsed. See [Skipping a power at load time](#skipping-a-power-at-load-time). |

The top-level `condition` makes any power conditional without changing its type. With a `condition` of `apoli:sneaking`, the power only works while the entity sneaks.

## Skipping a power at load time

`condition` decides whether a loaded power is active. `load_condition` decides whether the power is read at all.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `load_condition` | [Meta condition](/docs/datapack/meta-conditions/constant) | _optional_ | Checked once during the reload, before the rest of the power reaches a codec. If it doesn't hold, the power is skipped entirely. |

The order matters. A power whose `load_condition` fails is dropped before its other fields are parsed, so those fields don't have to parse on this game version or with this set of mods. A `condition` can't do that: the power has to load first, and a field the codec rejects takes the whole power with it.

Only condition types that need no context are allowed here, because a reload has no entity, item or block to test:

- [`apoli:minecraft_version`](/docs/datapack/meta-conditions/minecraft_version)
- [`apoli:mod_loaded`](/docs/datapack/meta-conditions/mod_loaded)
- [`apoli:constant`](/docs/datapack/meta-conditions/constant) and [`apoli:nothing`](/docs/datapack/meta-conditions/nothing)
- [`apoli:all_of`](/docs/datapack/meta-conditions/all_of) and [`apoli:any_of`](/docs/datapack/meta-conditions/any_of) over those types

`inverted` works as it does on any other condition. Any other type is rejected with a line in the log and the power is kept, so a typo never deletes a power without telling you.

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

On an [`apoli:multiple`](/docs/datapack/powers/multiple) sub-power, `load_condition` applies to that sub-power alone. A dropped sub-power is left out of the parent's `sub_powers` list, so nothing goes looking for it. Put `load_condition` at the top level of the `apoli:multiple` to apply it to the whole bundle.

Origins reads the same field on files in `origins/` and `origin_layers/`, so an origin can exist only where its powers do.

## Kinds of power

There are over a hundred power types, and each one has its own page in the Powers section of the sidebar. They fall into a few loose groups:

| Group | What they do | Examples |
|-------|--------------|----------|
| Attributes and stats | Change numbers | [`apoli:attribute`](/docs/datapack/powers/attribute), [`apoli:modify_damage`](/docs/datapack/powers/modify_damage) |
| Movement | Flight, climbing, phasing | [`apoli:creative_flight`](/docs/datapack/powers/creative_flight), [`apoli:climbing`](/docs/datapack/powers/climbing) |
| Prevention and immunity | Take an ability away | [`apoli:invulnerability`](/docs/datapack/powers/invulnerability), [`apoli:prevent_death`](/docs/datapack/powers/prevent_death) |
| Action powers | Run [actions](/docs/datapack/introduction/actions) on a trigger | [`apoli:action_on_hit`](/docs/datapack/powers/action_on_hit), [`apoli:action_over_time`](/docs/datapack/powers/action_over_time) |
| Resources and state | Store a number, a timer or a group | [`apoli:resource`](/docs/datapack/powers/resource), [`apoli:cooldown`](/docs/datapack/powers/cooldown) |
| Rendering | Colours, overlays, particles | [`apoli:model_color`](/docs/datapack/powers/model_color), [`apoli:particle`](/docs/datapack/powers/particle) |
| Items and inventories | Containers, recipes, projectiles | [`apoli:inventory`](/docs/datapack/powers/inventory), [`apoli:fire_projectile`](/docs/datapack/powers/fire_projectile) |
| Structure | Bundle powers or act as a flag | [`apoli:multiple`](/docs/datapack/powers/multiple), [`apoli:simple`](/docs/datapack/powers/simple) |

## Granting powers

A power file does nothing on its own. Something has to give the power to an entity:

- the `/power grant` command,
- an Origins origin, through a [layer](/docs/datapack/origins/layers),
- an [action](/docs/datapack/introduction/actions) such as [`apoli:grant_power`](/docs/datapack/entity-actions/grant_power),
- a [global power set](#global-powers), which grants powers to whole entity types.

Once an entity has the power, Apoli applies its effect. If the power has a top-level `condition`, it is only active while that condition holds.

## Global powers

A file in `data/<namespace>/global_powers/<name>.json` grants powers to entities by entity type, with no origin and no command. Every matching entity gets the powers when it loads into the world.

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
| `entity_types` | [Identifier](/docs/datapack/data-types/identifier), or an array of them | all entities | The entity types that get the powers. Entries starting with `#` are entity type tags. Leave the field out to match every entity. |
| `powers` | [Array](/docs/datapack/data-types/array) of [Identifier](/docs/datapack/data-types/identifier) | _required_ | The powers to grant. |
| `replace` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Discards the powers that every set with an earlier `order` gave this entity type, then adds these. |
| `order` | [Integer](/docs/datapack/data-types/integer) | `0` | Which sets apply first. Ties are broken by file ID. |
| `loading_priority` | [Integer](/docs/datapack/data-types/integer) | `0` | When two data packs define the same file ID, the higher value wins. |

The powers come from the source `apoli:global`, so they sit alongside anything an origin or a command granted, and they are revoked cleanly when a set stops matching.

> [!WARNING]
> Global power sets are the most expensive feature in Apoli when misused. A set with no `entity_types` grants its powers to every entity in the world, including arrows, dropped items and area effect clouds, and each of those entities then ticks each power. Limit sets to the types or tags you need, and think hard before putting an [`apoli:action_over_time`](/docs/datapack/powers/action_over_time) in one.

Which powers an entity type receives is worked out once per entity type each time data packs load, and the result is cached, so spawning a thousand zombies doesn't evaluate the sets a thousand times. When no global power sets exist, the whole system costs one boolean check each time an entity loads.

Sets are evaluated again on `/reload`, and every loaded entity is checked against the new result. Powers whose set no longer matches are revoked in the same pass.

## Tagging powers

`tags` puts one or more free-form labels on a power. Nothing reads them by default. They let actions that work on powers name a group of powers instead of listing every ID:

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

Three actions take a `tags` list and act on every power the entity holds that has one of those tags:

- [apoli:transfer](/docs/datapack/bientity-actions/transfer) steals or copies the tagged powers.
- [apoli:suppress_power](/docs/datapack/entity-actions/suppress_power) switches them off.
- [apoli:unsuppress_power](/docs/datapack/entity-actions/unsuppress_power) switches them back on.

Two conditions accept `tags` too:

- [apoli:power](/docs/datapack/entity-conditions/power) passes when the entity holds a power with one of the tags.
- [apoli:power_active](/docs/datapack/entity-conditions/power_active) passes when a power with one of the tags is active.

With tags, "copy one move from whatever origin you touched" is a single action. Tag the moves once and the action finds them, including powers a pack adds later.

Tags are plain strings, matched exactly and case-sensitively. They are not [identifiers](/docs/datapack/data-types/identifier) and get no namespace, so on a server with several packs, prefix your tags with something of your own (`mypack.copyable`) so two packs don't use the same word for different things.
