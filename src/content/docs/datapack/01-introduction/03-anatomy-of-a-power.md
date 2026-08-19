---
title: Anatomy of a power
description: Every power, action, condition and data type shares one shape. Learn it once.
---

Apoli looks big — hundreds of types — but it's built from one repeating shape. Once you can read that shape, every page in these docs reads the same way.

## Everything is a typed object

A **power**, an **action**, and a **condition** are all JSON objects with a `type`:

```json
{
   "type":"apoli:heal",
   "amount":4
}
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

## When an optional field is wrong

A **missing** optional field falls back to its default. A field that is *present but malformed* — a typo in a nested field name, broken SNBT escaping — is **dropped**, and the rest of the definition loads without it. The power still works; it just quietly stops doing the part you got wrong.

That is the single most common way a power "ignores" something.

**Every condition field is the exception.** Dropping a gate would leave the power *always active* — or a glow, an area-of-effect or a teleport unfiltered — which is the dangerous direction to fail in. So a condition that is present but unparseable **fails the whole power** instead: the power's own top-level `condition` since Apoli 1.29.1, and since 1.38.0 every nested `entity_condition`, `bientity_condition`, `block_condition`, `item_condition`, `damage_condition`, `biome_condition` and `fluid_condition` on any power, action or condition. The power does not load at all, and the log says why:

```json
// "condtions" is a typo for "conditions", so apoli:all_of is missing its
// required field and the condition cannot be parsed — this power is rejected.
"condition":{
   "type":"apoli:all_of",
   "condtions":[
      {
         "type":"apoli:sneaking"
      }
   ]
}
```

Check the server log first — it names the field and the power either way:

```txt
[Apoli] Failed to parse power my_pack:example: The 'condition' field of
my_pack:example is present but failed to parse:
No key conditions in MapLike[{"type":"apoli:all_of","condtions":[...]}]
```

Every *other* optional field — including nested **action** fields such as a resource's `min_action` and `max_action` — is still dropped rather than fatal, because losing one makes a power do *less*, which is visible rather than dangerous. Since Apoli 1.38.0 every one of those drops is logged with a warning naming the field and the power:

```txt
[Apoli] Ignoring the 'max_action' field of my_pack:example — it is present but
failed to parse, so it was dropped and everything else loaded.
Missing damage_type in MapLike[{"type":"apoli:damage","amount":4,"source":{...}}]
```

> Malformed SNBT in a `tag`/`nbt` string is the other frequent one — the warning gives you the exact character offset (`Invalid SNBT: Expected '}' at position 81`). Remember the string is inside JSON, so every quote the SNBT needs has to be escaped: `"tag": "{display:{Name:'[{\"text\":\"Hi\"}]'}}"`.

## How to read the rest of these docs

Every type page follows the same template:

1. a one-line summary of what it does,
2. a **fields** table (name · type · default · purpose),
3. a working example you can paste into a data pack.

That's it. [Powers](/docs/datapack/introduction/powers), [actions](/docs/datapack/introduction/actions) and [conditions](/docs/datapack/introduction/conditions) are all just this shape, repeated.
