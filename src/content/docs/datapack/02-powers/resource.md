---
title: "Resource (Power Type)"
description: "Stores a number on the entity, with limits that can be expressions, and runs actions when the value changes or reaches a limit."
navigation_title: "Resource"
---

Stores a number on the entity that has the power. The limits can be fixed numbers or expressions, so the range can move, and the resource can run actions when the value changes or reaches a limit.

Type ID: `apoli:resource`

Change the value with [apoli:modify_resource](/docs/datapack/entity-actions/modify_resource) (or the legacy [apoli:change_resource](/docs/datapack/entity-actions/change_resource), which is read as a modify resource action), and test it with the [apoli:resource](/docs/datapack/entity-conditions/resource) entity condition.

## Differences from Apace's `apoli:resource`

- `min`, `max` and `start_value` take an [Integer](/docs/datapack/data-types/integer) or an [Expression](/docs/datapack/data-types/expression). An expression limit is evaluated again every tick, so the ceiling can move with other resources, entity stats or world state.
- `enforce_limits` and `retain_value` come from the `apoli:modifiable_resource` power type in Origins: Math. When `enforce_limits` is `false`, the value can go outside `[min, max]` until something clamps it.
- Values persist across server restarts in the entity's `PowerContainer` aux data store.
- `max` is optional. Leave it out and the resource has no upper limit, which suits score counters and running totals. `min` is optional too, and leaving it out removes the lower limit.
- `size` turns one power into a table of that many slots, each addressed on its own.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `min` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | _unbounded_ | The lowest value. An expression is evaluated again each tick. Leave it out for no lower limit. |
| `max` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | _unbounded_ | The highest value. An expression is evaluated again each tick. Leave it out for no upper limit. |
| `start_value` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | the value of `min`, or `0` when there is no `min` | The value when the entity first gets the power. `default` is accepted as an alias. |
| `size` | [Integer](/docs/datapack/data-types/integer) | `1` | How many values the resource stores. Above `1`, the power becomes a table of that many slots, each addressed by a `position` from `0` to `size - 1`. `positions` and `slots` are accepted as aliases. There is no upper limit (see [Big tables](#big-tables)). |
| `hud_render` | [Hud Render](/docs/datapack/data-types/hud-render) | _hidden_ | How the resource shows on the HUD. A bar needs a value to fill up to, so an uncapped resource needs a `max` on the `hud_render`. See [Hud Render](/docs/datapack/data-types/hud-render). |
| `enforce_limits` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether the value is clamped to `[min, max]`. |
| `retain_value` | [Boolean](/docs/datapack/data-types/boolean) | `false` | With `enforce_limits` on, a change that would push the value outside the limits keeps the old value instead of clamping. |
| `min_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Runs on the entity whenever the value reaches `min`. |
| `max_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Runs on the entity whenever the value reaches `max`. |
| `on_change` | [Array](/docs/datapack/data-types/array) of [Object](/docs/datapack/data-types/object) | `[]` | Actions to run when the value changes, each with an optional test on the new value. See [Reacting to changes](#reacting-to-changes). |
| `persistent` | [Boolean](/docs/datapack/data-types/boolean) | `true` | With `true`, the value survives a server restart and the entity unloading and loading again. With `false`, it resets to `start_value` whenever the entity rejoins the world, which suits resources that should reset, such as daily quest counters or cooldowns you want cleared on login. |

## Reacting to changes

`on_change` is a list of entries. Every time the value changes, each entry is checked in order against the new value, and the ones that match run their `entity_action` on the holder.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `entity_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | What to run. An entry without one never runs. |
| `value` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | _optional_ | The number the new value is compared with. |
| `values` | [Array](/docs/datapack/data-types/array) of [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | `[]` | More numbers to compare with. The entry matches if the comparison holds for `value` or for any of these. |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | `"=="` | How the new value is compared. |

An entry with neither `value` nor `values` matches every change. Inside these expressions, `value` is the resource's new value.

```json
{
   "type":"apoli:resource",
   "min":0,
   "max":10,
   "on_change":[
      {
         "value":3,
         "comparison":"<=",
         "entity_action":{
            "type":"apoli:execute_command",
            "command":"title @s actionbar {\"text\":\"Low on mana\",\"color\":\"red\"}"
         }
      },
      {
         "values":[5, 10],
         "entity_action":{
            "type":"apoli:play_sound",
            "sound":"minecraft:block.amethyst_block.chime"
         }
      }
   ]
}
```

The warning shows on every change that leaves the value at 3 or below, and the chime plays when it lands exactly on 5 or 10.

> [!NOTE]
> Entries run after `min_action` and `max_action`, and only when the value changes. Setting it to the number it already holds runs nothing. In table mode they run per slot, like `min_action` and `max_action`.

> [!NOTE]
> An action that changes a resource can set off that resource's actions again. Apoli follows up to 64 of these chained changes, then stops running `min_action`, `max_action` and `on_change` for the rest of that chain and logs one warning that names the power. A resource that adds to itself on every change stops there instead of taking the server down.

## Storing more than one value

Set `size` and the resource holds a row of independent values instead of a single one. Every slot shares the same `min`, `max`, `start_value` and `enforce_limits` rules, and each slot is addressed by a position, which is a zero-based index.

```json
{
   "type":"apoli:resource",
   "min":0,
   "max":64,
   "start_value":0,
   "size":6
}
```

That stores six values, `0` through `5`, all starting at `0`.

Reading and writing a slot:

- [apoli:resource](/docs/datapack/entity-conditions/resource) (entity condition) takes a `position`. Leave it out and the condition passes if any slot matches.
- [apoli:modify_resource](/docs/datapack/entity-actions/modify_resource) takes a `position`. Leave it out and the change applies to every slot.
- In an [expression](/docs/datapack/data-types/expression), `example:table[2]` reads slot 2, `example:table_size` is the slot count, and `resource_contains(example:table, 5)` asks whether any slot holds `5`.
- `/apoli:resource get|set|change <targets> <power> [position]` reads or writes one slot, and `/apoli:resource list` prints the whole table.

Slot `0` is the resource's scalar value. Anything that reads the resource without a position (the HUD bar, an expression reference without an index, `min_action` and `max_action`) sees slot `0`.

### Big tables

Slots are only allocated when they are written. Declaring `"size": 1000000` costs nothing on its own: the resource stores slot 0 and grows only as far as the highest slot you have written to. A slot that has never been written reads as `start_value`, so an unwritten table behaves exactly as if it were full of that value.

That is why `size` has no cap. The cost comes from the slots you write, and the declared number adds nothing. Writing slot 999999 does allocate a million slots' worth of memory for that holder, about 4 MB, and that memory is saved to disk and sent to clients with the rest of the power's data, so only write high slots on purpose.

`size` is also the guard on a computed `position`. A write to a slot at or above `size` is refused, so however wrong an index expression goes, it can never allocate past the number you declared. A size far larger than you need leaves that guard with nothing to do, so pick a number that matches the table you want.

Apoli logs one warning naming the power if a declared `size` is above 65536, to catch a typo like an extra zero.

> [!NOTE]
> `min_action`, `max_action` and `on_change` fire per slot in table mode, so a write with no `position`, which touches every slot, can fire them several times at once.

> [!TIP]
> Slots are ordinary expression values, so a table doubles as a vector store. `example:pos[0]`, `example:pos[1]` and `example:pos[2]` feed straight into any field that takes an expression (a velocity, a damage amount, a modifier) with no `if_else_list` of hard-coded numbers in between.

## Variables in expression fields

When `min`, `max` or `start_value` are written as [expression](/docs/datapack/data-types/expression) strings, these variables are bound:

- `value`: the current value of this resource, for limits that depend on the current amount, such as a max that grows as the resource builds up.
- `<namespace>:<path>`: any other resource the entity has, by its full power ID. Add `[n]` to read a slot of a table resource, and the `_min`, `_max` and `_size` suffixes to read its limits and length.
- `health`, `max_health`, `food`, `air`, `xp_level`, `xp_progress`: common entity stats.
- `world_time`, `day_time`: long ticks from the entity's level.

See the [Expression](/docs/datapack/data-types/expression) page for the full list.

> [!WARNING]
> A `min_action` or `max_action` that fails to parse is dropped. The log carries a warning that starts with `[Apoli] Ignoring the 'max_action' field of <power id>`, followed by the underlying reason. The rest of the resource still loads, so the bar works and only the limit action is missing.
>
> The most common cause is a legacy damage source: [apoli:damage](/docs/datapack/entity-actions/damage) takes `damage_type` (a damage type ID) instead of the pre-1.19.4 `source` object.

## Examples

A binary flag, a resource that works like a boolean:

```json
{
   "type":"apoli:resource",
   "min":0,
   "max":1,
   "hud_render":{
      "should_render":false
   },
   "min_action":{
      "type":"apoli:heal",
      "amount":6
   }
}
```

A mana pool whose maximum grows with the player's XP level:

```json
{
   "type":"apoli:resource",
   "min":0,
   "max":"20 + 5 * xp_level",
   "start_value":0,
   "hud_render":{
      "should_render":true,
      "bar_index":2
   }
}
```

> [!TIP]
> A bar has no scale without a `max`. To show one on an uncapped resource, put a `max` on the `hud_render` instead. The resource stays uncapped and the bar fills up to that value.

An uncapped score counter. With no `max`, it can grow forever:

```json
{
   "type":"apoli:resource",
   "min":0,
   "start_value":0
}
```

A six-slot table used as a saved position (x, y, z) plus three spare slots:

```json
{
   "type":"apoli:resource",
   "min":-30000000,
   "max":30000000,
   "start_value":0,
   "size":6
}
```

A resource whose ceiling is the value of another resource, with no nesting needed:

```json
{
   "type":"apoli:resource",
   "min":0,
   "max":"example:mana_capacity",
   "start_value":0
}
```
