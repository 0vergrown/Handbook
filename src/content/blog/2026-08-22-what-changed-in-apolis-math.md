---
title: "What changed in Apoli's math"
description: "Expressions can now read the actor and the target, use real values like a raycast's distance, and index a resource that holds more than one number."
date: 2026-08-22
author: Overgrown
---

Apoli lets you put a formula where a number goes. Instead of `"amount": 5` you can write `"amount": "5 + xp_level"`, and the game works it out when the power runs. That's an expression.

Apoli 1.40.0 changes a lot about them. One thing was plain broken, and the rest is new. This post goes through all of it.

## The bug: damage that always dealt the same

Someone wrote this, and it never worked:

```json
{
  "type": "apoli:damage",
  "damage_type": "minecraft:player_attack",
  "amount": "5 + ((max_health - health) * 0.35)"
}
```

The idea is simple: hit harder the more health you are missing. At half health, hit for about 6.7, and at one heart, hit for about 8.

It always dealt exactly 5.

The formula was fine. The problem was who `health` meant. This is a bi-entity action, so two entities are involved: the one whose power fired it (the actor) and the one getting hit (the target). Apoli was reading `health` and `max_health` off the target.

Look at what that does to the maths. Hit a mob at full health and `max_health - health` is zero. Multiply zero by 0.35 and you still have zero, add 5, and you get 5, every single time.

So the formula was quietly throwing away everything except its first number, and there was no way to fix it in the JSON, because there was no way to say "I meant the other entity".

### The fix

In a bi-entity action, a plain variable now means the actor, the one whose power fired. That matches every other place Apoli uses expressions, where a plain variable has always meant the entity holding the power.

The JSON above now does what it reads like, with nothing to change.

To read the other side, put `target_` in front:

| You write | You get |
| --- | --- |
| `health` | The actor's health |
| `actor_health` | The actor's health, said out loud |
| `target_health` | The target's health |

That works on every ordinary variable: `target_max_health`, `target_food`, `target_air` and so on. There's also `target_resource(some:id)` and `target_has_power(some:id)` for reading resources and powers on the other side.

This carries through nested actions too. Wrap something in `apoli:actor_action` and it can still say `target_health` and get the right entity.

### If you relied on the old behaviour

Two actions changed meaning: `apoli:damage` and `apoli:add_velocity`, in their bi-entity form. If a pack of yours deliberately wanted the target, add `target_` to those variables and it goes back to exactly what it did before.

Bi-entity conditions aren't part of this. They run once per nearby entity inside things like `apoli:entity_in_radius`, so they run a lot, and none of them take an expression anyway.

## Reading values that actually happened

The bigger problem was that expressions could only read state: health, position, the time of day, a resource. They couldn't read anything the engine had just worked out.

Say you fire a raycast and want to know how far it went. The engine knows, and your data pack couldn't ask. So people wrote things like this:

```json
{
  "type": "apoli:if_else_list",
  "actions": [
    {
      "condition": {
        "...": "did it hit within 5 blocks?"
      },
      "action": {
        "...": "set the resource to 5"
      }
    },
    {
      "condition": {
        "...": "within 10 blocks?"
      },
      "action": {
        "...": "set the resource to 10"
      }
    },
    {
      "condition": {
        "...": "within 15 blocks?"
      },
      "action": {
        "...": "set the resource to 15"
      }
    }
  ]
}
```

A ladder of hard-coded steps stood in for a number the game already had.

Now `apoli:raycast` hands you the number:

```json
"hit_action": {
  "type": "apoli:modify_resource",
  "resource": "example:last_shot",
  "modifier": {
    "operation": "set_base",
    "value": "distance"
  }
}
```

Six variables are available inside a raycast's hooks, `hit_action`, `miss_action`, `bientity_action` and `block_action`, and in anything nested inside them:

| Variable | What it is |
| --- | --- |
| `distance` | How far it is from the ray's start to what it hit |
| `hit_x`, `hit_y`, `hit_z` | Where it hit |
| `count` | How many entities the ray hit |
| `index` | Which one this is, counting from 0 |

Each hook gets numbers that make sense for it. A hook that runs for each entity gets that entity's own hit point, and the hit and miss hooks get wherever the ray stopped.

So a shot that gets weaker with range is one line now:

```json
"bientity_action": {
  "type": "apoli:damage",
  "damage_type": "minecraft:player_attack",
  "amount": "max(1, 20 - distance)"
}
```

### Counting things

The same problem comes in another shape: how many mobs are near me?

`apoli:area_of_effect` now tells you. `bientity_action` became optional, so you can run the sweep purely to count, and a new `after_action` runs once at the end with `count` available:

```json
{
  "type": "apoli:area_of_effect",
  "radius": 8,
  "shape": "sphere",
  "bientity_condition": {
    "type": "apoli:target_condition",
    "condition": {
      "type": "apoli:living"
    }
  },
  "after_action": {
    "type": "apoli:modify_resource",
    "resource": "example:nearby",
    "modifier": {
      "operation": "set_base",
      "value": "count"
    }
  }
}
```

Nothing happens to the mobs, and you end up with a number.

`index` is also available inside `bientity_action`, counting from 0, if you want to do something different to the first one.

`apoli:entity_in_radius` and `apoli:block_in_radius` now take an expression for `compare_to` too, so the threshold can come from a resource instead of being fixed in the file.

## Resources that hold more than one number

An `apoli:resource` held one number, and if you needed six, you made six powers.

Now one power can hold as many as you want:

```json
{
  "type": "apoli:resource",
  "min": 0,
  "max": 64,
  "start_value": 0,
  "size": 6
}
```

That's six values, all starting at 0. Each one is a slot, numbered 0 to 5.

### Reading and writing a slot

Everything that touches a resource now takes an optional `position`.

This checks one slot:

```json
{
  "type": "apoli:resource",
  "resource": "example:table",
  "position": 2,
  "comparison": "==",
  "compare_to": 5
}
```

Leaving `position` out asks a different question, which is whether this value is anywhere in the table:

```json
{
  "type": "apoli:resource",
  "resource": "example:table",
  "comparison": "==",
  "compare_to": 5
}
```

Writing works the same way. `apoli:modify_resource` with a `position` changes one slot, and without one it changes every slot, which is how you fill or clear a whole table in one action.

In an expression, put the slot in square brackets:

```json
{
  "type": "apoli:add_velocity",
  "x": "example:pos[0]",
  "y": "example:pos[1]",
  "z": "example:pos[2]"
}
```

The thing in brackets is a full expression, so one resource can point into another:

```
example:table[example:cursor + 1]
```

There's also `example:table_size` for how many slots there are, `resource_contains(example:table, 5)` to search the whole thing, and `resource_index_of(example:table, 5)` to find where a value is (or `-1` if it isn't there).

### Copying

`apoli:modify_resource` gained `from`:

```json
{
  "type": "apoli:modify_resource",
  "resource": "example:backup",
  "from": "example:live"
}
```

With no positions on either side, that copies the whole table, slot for slot. With positions, it copies one slot. The operation still applies, so `add_base_early` adds the source into the destination instead of overwriting it.

A single slot could already be copied with an expression, `{ "operation": "set_base", "value": "example:live[2]" }`, and still can. `from` exists so a copy of twenty slots is one action instead of twenty.

### Bounds are optional now

`min` and `max` used to be required, and now both are optional. Leave `max` out and the resource has no ceiling, which is what you want for a score or a running total that should keep climbing.

### So is the size

There's no limit on `size` either, because slots cost nothing until you write to them. A resource with `"size": 1000000` stores one number until you write to a second slot. A slot you've never written reads back as `start_value`, so it behaves as though the whole table is already there.

What you actually pay for is the highest slot you write. Write slot 999999 and you get a million slots' worth of memory for that player, saved to disk and sent to their client along with everything else. The number you declare is free, and the slots you touch aren't.

### What about the HUD bar?

A bar shows how far a value has got between empty and full. A resource with no cap has no full, so there's nothing to draw.

If you ask for one anyway, Apoli doesn't draw the bar and logs one warning naming the power. That's deliberate, since a bar with no scale would sit stuck at one end and look like a different bug.

If you want a bar on a resource with no cap, put a `max` on the `hud_render` instead of on the resource:

```json
{
  "type": "apoli:resource",
  "min": 0,
  "start_value": 0,
  "hud_render": {
    "should_render": true,
    "bar_index": 2,
    "max": "100 * (1 + example:level)"
  }
}
```

The resource still has no ceiling. The bar fills toward 100, then toward 200 once the level goes up, and so on. It's an expression, so the target can be anything you can work out.

`size` doubles as a safety rail. A write to a slot at or above it is refused, so a `position` expression that goes wrong can never allocate past the number you declared. That only helps if the number means something, so pick one that matches the table you want, and don't pick a huge one to be safe. If you declare more than 65536 slots, Apoli logs one warning naming the power, in case it was a typo.

### From the console

```
/apoli:resource list @s example:table
/apoli:resource get @s example:table 2
/apoli:resource set @s example:table 5 2
/apoli:resource set @s example:table 0
```

`list` prints the whole table, and the number on the end of `get` and `set` is the slot. The last line has no slot, so it clears all of them.

## Functions that take an ID

Some questions need an ID instead of a number, and those are written as functions:

| Function | Answer |
| --- | --- |
| `has_power(example:blink)` | 1 if the entity has that power, and 0 otherwise |
| `has_resource(example:mana)` | 1 if it has that resource at all |
| `resource(example:mana)` | The value, the long way of writing `example:mana` |
| `resource(example:table, 2)` | Slot 2, the long way of writing `example:table[2]` |
| `resource_size(example:table)` | How many slots there are |
| `resource_contains(example:table, 5)` | 1 if any slot is 5 |
| `resource_index_of(example:table, 5)` | Which slot, or -1 |

A comparison gives back 1 or 0, so you can multiply by one to switch something on and off:

```
"amount": "5 * has_power(example:rage)"
```

That's five damage if they have the power, and zero if they don't.

## Origins in math

With Origins installed, there are a few more:

| Name | Answer |
| --- | --- |
| `origin_count` | How many layers have an origin that isn't empty |
| `is_swapped` | 1 while any layer is swapped |
| `has_origin(origins:phantom)` | 1 if they have that origin anywhere, counting a swap |
| `in_origin_pool(origins:phantom)` | 1 if it is sitting in their swap pool |
| `has_origin_on(origins:origin)` | 1 if that layer holds anything |
| `origin_impact(origins:origin)` | 0 for none, up to 3 for high |

These work on the client as well as the server, which matters for the next part.

## Model parts driven by math

`apoli:modify_model_parts` used to take a plain number for `value`. It takes an expression now, and so does each keyframe's `value`:

```json
{
  "type": "apoli:modify_model_parts",
  "transformations": [
    {
      "model_part": "head",
      "type": "x_scale",
      "value": "example:charge / 10"
    }
  ]
}
```

The head grows as the charge meter fills, with no power in between, no keyframes and no if-else ladder.

Two things to know. This runs while the model is drawn, on the client, so it can only read things the client knows about. Resources are sent to the client, individual slots included, so those work, and anything that only the server has reads as 0. A plain number also costs nothing extra, since it's worked out once when the pack loads, so keep the maths that really runs every frame small.

## Two small things

`[` used to always mean a random generator, as in `[Uni]` and `[Nat3]`. Those still work exactly as before. Anything else in brackets is now a slot number, and it's only allowed straight after an ID with a colon in it, so `example:table[2]` is a slot and `[Uni]` is still random.

`*:` is shorthand for "my own namespace". It only got expanded when it was the first thing in the string, so `"*:example / 10"` worked and `"5 + *:example"` didn't, and the error message pointed at a variable that looked perfectly fine. It's expanded anywhere in the string now.

## Putting it together

Here's a raycast that stores where it hit, so a later power can use it:

```json
{
  "type": "apoli:raycast",
  "distance": 32,
  "block": true,
  "entity": false,
  "hit_action": {
    "type": "apoli:and",
    "actions": [
      {
        "type": "apoli:modify_resource",
        "resource": "example:mark",
        "position": 0,
        "modifier": {
          "operation": "set_base",
          "value": "hit_x"
        }
      },
      {
        "type": "apoli:modify_resource",
        "resource": "example:mark",
        "position": 1,
        "modifier": {
          "operation": "set_base",
          "value": "hit_y"
        }
      },
      {
        "type": "apoli:modify_resource",
        "resource": "example:mark",
        "position": 2,
        "modifier": {
          "operation": "set_base",
          "value": "hit_z"
        }
      }
    ]
  }
}
```

`example:mark` is a resource with `"size": 3`. That's three slots in one power, and every one of those numbers came from the engine instead of from a guess.

The full details are on the [Expression](/docs/datapack/data-types/expression) page.
