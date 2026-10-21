---
title: "Grant All Powers (Entity Action Type)"
description: "Grants every power a named source provides, such as an origin, a skill tree or an apoli:multiple power."
navigation_title: "Grant All Powers"
---

Grants every power that a named power source provides.

Type ID: `apoli:grant_all_powers`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `from` | [Identifier](/docs/datapack/data-types/identifier) or [Array](/docs/datapack/data-types/array) of Identifier | _optional_ | The sources to take powers from. |
| `source` | [Identifier](/docs/datapack/data-types/identifier) | the `from` ID | The source ID the grants are recorded under. |
| `namespace` | [String](/docs/datapack/data-types/string) | _optional_ | Only grants powers in this namespace. |
| `include_hidden` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether to include powers marked `hidden`. |

## What counts as a source

`from` accepts anything that owns a list of powers:

- an origin ID (needs Origins), such as `example:phoenix`
- an origin layer ID, which resolves to every power of every origin in it
- a skill tree ID, which resolves to its `default_powers` plus every skill under it
- an [`apoli:multiple`](/docs/datapack/powers/multiple) power ID, which resolves to its sub-powers

An ID that resolves to none of those is skipped with a warning in the log.

`source` defaults to the `from` ID, so [`apoli:revoke_all_powers`](/docs/datapack/entity-actions/revoke_all_powers) with the same ID undoes the grant exactly. Set it yourself if you want several sources filed under one tag.

## Examples

Grant everything one origin has:

```json
{
    "type": "apoli:grant_all_powers",
    "from": "example:phoenix"
}
```

Grant the powers of two origins under a single source, so one action can take them all back:

```json
{
    "type": "apoli:grant_all_powers",
    "from": ["example:phoenix", "example:merling"],
    "source": "example:absorbed"
}
```

Grant a skill tree's powers without the hidden helper ones:

```json
{
    "type": "apoli:grant_all_powers",
    "from": "example:magic",
    "include_hidden": false
}
```

> [!WARNING]
> With `from` left out, this grants every loaded power in the game, which hands a player every power of every origin in the pack. Always name a source.

The entity doesn't need to hold any powers already. One that has never had a power, such as a mob, an item or a projectile, gets them all the same.
