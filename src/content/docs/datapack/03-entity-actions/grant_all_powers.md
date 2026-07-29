---
title: "apoli:grant_all_powers"
description: "Grants every power a named source provides — an origin, a skill tree, or an apoli:multiple power."
---

Grants every power that a named **power source** provides.

Type ID: `apoli:grant_all_powers`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `from` | [Identifier](/docs/datapack/data-types/identifier) or [Array](/docs/datapack/data-types/array) of Identifier | _optional_ | The source(s) to draw powers from. |
| `source` | [Identifier](/docs/datapack/data-types/identifier) | the `from` id | The source id the grants are recorded under. |
| `namespace` | [String](/docs/datapack/data-types/string) | _optional_ | Only grant powers in this namespace. |
| `include_hidden` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether to include powers marked `hidden`. |

## What counts as a source

`from` accepts anything that owns a list of powers:

- an **origin** id (needs Origins), e.g. `example:phoenix`
- an **origin layer** id, which resolves to every power of every origin in it
- a **skill tree** id, which resolves to its `default_powers` plus every skill under it
- an [`apoli:multiple`](/docs/datapack/powers/multiple) power id, which resolves to its sub-powers

An id that resolves to none of those is skipped with a warning in the log.

`source` defaults to the `from` id, so [`apoli:revoke_all_powers`](/docs/datapack/entity-actions/revoke_all_powers) with the same id undoes the grant exactly. Set it explicitly if you want several sources filed under one tag.

## Examples

Grant everything one origin has:

```json
{
    "type": "apoli:grant_all_powers",
    "from": "example:phoenix"
}
```

Grant two origins' worth of powers under a single source, so one action can take them all back:

```json
{
    "type": "apoli:grant_all_powers",
    "from": ["example:phoenix", "example:merling"],
    "source": "example:absorbed"
}
```

Grant a skill tree's powers without the hidden plumbing ones:

```json
{
    "type": "apoli:grant_all_powers",
    "from": "example:magic",
    "include_hidden": false
}
```

> With `from` omitted this grants **every loaded power in the game**, which is almost never what you want and will happily hand a player every power of every origin in the pack. Always name a source.

## See also

- [apoli:revoke_all_powers](/docs/datapack/entity-actions/revoke_all_powers)
- [apoli:grant_power](/docs/datapack/entity-actions/grant_power)
- [/apoli:power grantall](/docs/datapack/commands/power)
