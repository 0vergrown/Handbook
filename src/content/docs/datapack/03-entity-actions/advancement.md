---
title: "Advancement (Entity Action Type)"
description: Grants or revokes an advancement, or specific criteria of one.
navigation_title: "Advancement"
---

Grants or revokes an advancement for the player, or just some of its criteria. The two aliases fill in the `revoke` field: `apoli:grant_advancement` sets it to `false`, `apoli:revoke_advancement` sets it to `true`.

Type ID: `apoli:advancement` (aliases `apoli:grant_advancement`, `apoli:revoke_advancement`)

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`advancement` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | The advancement to act on. Omit it with `selection: everything` to act on all of them.
`criterion` | [String](/docs/datapack/data-types/string) | _optional_ | A single criterion name, rather than the whole advancement.
`criteria` | array of [String](/docs/datapack/data-types/string) | _optional_ | Several criterion names.
`selection` | [String](/docs/datapack/data-types/string) | `only` | Which advancements are affected: `only` just this one, `through` this one and everything leading to it, `from` this one and everything below it, `until` everything leading to it but not itself, `everything` all advancements.
`revoke` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Revoke rather than grant. Filled in by the aliases.

## Examples

Grant one advancement when an origin is chosen:

```json
{
  "type": "apoli:grant_advancement",
  "advancement": "mypack:became_a_vampire"
}
```

Grant a whole branch at once — this one and everything that leads to it, so the tree does not look half-finished:

```json
{
  "type": "apoli:grant_advancement",
  "advancement": "minecraft:nether/all_potions",
  "selection": "through"
}
```

Wipe an origin's progress when the player swaps away from it:

```json
{
  "type": "apoli:revoke_advancement",
  "advancement": "mypack:vampire/root",
  "selection": "from"
}
```

Tick off one criterion of a multi-step advancement:

```json
{
  "type": "apoli:grant_advancement",
  "advancement": "mypack:trials",
  "criterion": "survived_the_night"
}
```
