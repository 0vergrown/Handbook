---
title: Anatomy of a power
description: Every power, action, condition and data type shares one shape. Learn it once.
---

Apoli looks big — hundreds of types — but it's built from one repeating shape. Once you can read that shape, every page in these docs reads the same way.

## Everything is a typed object

A **power**, an **action**, and a **condition** are all JSON objects with a `type`:

```json
{ "type": "apoli:heal", "amount": 4 }
```

The `type` is an [identifier](/docs/datapack/introduction/data-types) (`namespace:path`). It selects *which* thing this is; the remaining fields configure it. Apoli looks the type up, and if it doesn't recognise it, the power fails to load with an error in the log.

## Fields are typed too

Each field expects a particular kind of value. Some are primitives (a number, a string, a boolean). Many are **nested typed objects**, an action field wants an action, a condition field wants a condition:

```json
{
   "type":"apoli:action_on_hit",
   "cooldown":20,
   "bientity_action":{
      "type":"apoli:damage",
      "amount":2
   },
   "condition":{
      "type":"apoli:sneaking"
   }
}
```

Here `cooldown` is a number, `bientity_action` is an [action](/docs/datapack/introduction/actions), and `condition` is a [condition](/docs/datapack/introduction/conditions). This nesting is the whole trick, you compose behaviour by putting typed objects inside typed objects.

## Lists where it makes sense

Wherever one value is allowed, a **list** of them usually is too. Apoli's `apoli:and` runs a list of actions; `apoli:multiple` bundles a list of powers.

```json
{
   "type":"apoli:and",
   "actions":[
      {
         "type":"apoli:extinguish"
      },
      {
         "type":"apoli:heal",
         "amount":2
      }
   ]
}
```

## Optional fields have defaults

Most fields are optional and fall back to a default. In the `action_on_hit` example, `cooldown` defaults to `1` and `condition` defaults to "always". Only write the fields you actually want to change - the docs list every field, its type, and its default.

## Inverting a condition

Any condition can be flipped by adding `"inverted": true`. There's no separate "not sneaking" condition - you invert `apoli:sneaking`:

```json
{
   "type":"apoli:sneaking",
   "inverted":true
}
```

## How to read the rest of these docs

Every type page follows the same template:

1. a one-line summary of what it does,
2. a **fields** table (name · type · default · purpose),
3. a working example you can paste into a data pack.

That's it. [Powers](/docs/datapack/introduction/powers), [actions](/docs/datapack/introduction/actions) and [conditions](/docs/datapack/introduction/conditions) are all just this shape, repeated.
