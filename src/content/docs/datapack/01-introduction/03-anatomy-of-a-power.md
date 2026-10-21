---
title: Anatomy of a power
description: Powers, actions, conditions and data types all share one JSON shape.
---

Apoli has hundreds of types, but they all use one shape. Once you can read it, every page in this reference follows the same pattern.

## Everything is a typed object

A power, an action and a condition are all JSON objects with a `type`:

```json
{
   "type":"apoli:heal",
   "amount":4
}
```

The `type` is an [identifier](/docs/datapack/introduction/data-types) (`namespace:path`). It says which thing the object is, and the other fields configure it. Apoli looks the type up, and if it doesn't recognise it, the power fails to load with an error in the log.

## Fields are typed too

Each field expects a particular kind of value. Some take a number, a string or a boolean. Many take another typed object: an action field takes an action, and a condition field takes a condition.

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

Here `cooldown` is a number, `bientity_action` is an [action](/docs/datapack/introduction/actions) and `condition` is a [condition](/docs/datapack/introduction/conditions). You build behaviour by putting typed objects inside other typed objects.

## Lists

Where a field takes one value, it usually takes a list too. Some types exist to group others: `apoli:and` runs a list of actions, and `apoli:multiple` bundles a list of powers.

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

Most fields are optional and fall back to a default. In the `action_on_hit` example, `cooldown` defaults to `1`, and without a `condition` the power is always active. Write only the fields you want to change. Each type page lists every field with its type and default.

## Inverting a condition

Add `"inverted": true` to any condition to flip its result. There is no separate "not sneaking" condition, so you invert `apoli:sneaking`:

```json
{
   "type":"apoli:sneaking",
   "inverted":true
}
```

## When an optional field is wrong

A missing optional field falls back to its default. A field that is present but malformed, such as a typo in a nested field name or broken SNBT escaping, is dropped, and the rest of the definition loads without it. The power still works, minus the part you got wrong. This is the most common reason a power seems to ignore part of its JSON.

Condition fields are the exception. Dropping a condition would leave a power always active, or leave a glow, an area of effect or a teleport unfiltered, which is the dangerous way to fail. So a condition that is present but can't be parsed fails the whole power instead. That applies to the power's own `condition` and to every nested `entity_condition`, `bientity_condition`, `block_condition`, `item_condition`, `damage_condition`, `biome_condition` and `fluid_condition` on any power, action or condition. The power doesn't load, and the log says why.

In this example `condtions` is a typo for `conditions`, so `apoli:all_of` is missing its required field, the condition can't be parsed and the power is rejected:

```json
"condition":{
   "type":"apoli:all_of",
   "condtions":[
      {
         "type":"apoli:sneaking"
      }
   ]
}
```

Check the server log first. It names the field and the power in both cases:

```txt
[Apoli] Failed to parse power my_pack:example: The 'condition' field of
my_pack:example is present but failed to parse:
No key conditions in MapLike[{"type":"apoli:all_of","condtions":[...]}]
```

Every other optional field, including nested action fields such as a resource's `min_action` and `max_action`, is dropped instead of failing the power. Losing one of those makes the power do less, which is easy to notice and not dangerous. Each drop is logged as a warning that names the field and the power:

```txt
[Apoli] Ignoring the 'max_action' field of my_pack:example — it is present but
failed to parse, so it was dropped and everything else loaded.
Missing damage_type in MapLike[{"type":"apoli:damage","amount":4,"source":{...}}]
```

> [!TIP]
> Malformed SNBT in a `tag` or `nbt` string is the other common case. The warning gives the exact character offset (`Invalid SNBT: Expected '}' at position 81`). The SNBT string sits inside JSON, so every quote it needs has to be escaped: `"tag": "{display:{Name:'[{\"text\":\"Hi\"}]'}}"`.

## Reading a type page

Every type page has the same parts:

1. a short summary of what the type does,
2. a fields table with each field's name, type, default and description,
3. working examples you can paste into a data pack.

The [Powers](/docs/datapack/introduction/powers), [Actions](/docs/datapack/introduction/actions) and [Conditions](/docs/datapack/introduction/conditions) pages cover what each kind has in common.
