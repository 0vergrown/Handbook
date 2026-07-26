---
title: Origins-specific types
description: The condition and actions Origins adds on top of Apoli.
---

Origins is an [Apoli addon](/docs/datapack/origins/overview), so as well as origins and layers it registers a few Apoli types in the `origins:` namespace. Use them in any power's JSON, exactly like the built-in Apoli types.

## origins:origin (condition)

An [entity condition](/docs/datapack/entity-conditions) that passes when the entity has a given origin.

| Field | Type | Default |
| --- | --- | --- |
| `origin` | identifier | **required** |
| `layer` | identifier | *(any layer)* |

```json
{
   "type":"origins:origin",
   "origin":"origins:phantom",
   "layer":"origins:origin"
}
```

This is how a power can behave differently depending on which origin the player picked — grant it broadly, then gate parts of it on `origins:origin`.

## origins:transfer_origin (bi-entity action)

Move an origin between two players — steal it, give it, or copy it.

| Field | Type | Default |
| --- | --- | --- |
| `mode` | `steal` \| `give` \| `copy` | `steal` |
| `origin` | identifier | *(current)* |
| `from_layer` / `to_layer` | identifier | *(the origin layer)* |
| `actor_action` / `target_action` | [entity action](/docs/datapack/entity-actions) | *(none)* |

## origins:copy_origin (entity action)

Copy an origin from one layer to another on the same entity.

| Field | Type | Default |
| --- | --- | --- |
| `origin` | identifier | *(current)* |
| `from_layer` / `to_layer` | identifier | **required** |
