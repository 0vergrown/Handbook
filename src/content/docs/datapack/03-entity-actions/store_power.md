---
title: "Store Power (Entity Action Type)"
description: "Puts powers into the entity's own apoli:power_storage, or takes them out again."
navigation_title: "Store Power"
---

Puts powers into the entity's own [`apoli:power_storage`](/docs/datapack/powers/power_storage), takes them out, or empties it. A stored power is granted to the holder unless the storage sets `grant: false`, in which case it sits there inert until [`apoli:run_stored_power`](/docs/datapack/entity-actions/run_stored_power) fires it.

Type ID: `apoli:store_power`

The bi-entity form, [`apoli:store_power`](/docs/datapack/bientity-actions/store_power), stores into the **target's** storage instead, which is how one entity teaches another a power.

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`storage` | [Identifier](/docs/datapack/data-types/identifier) | *optional* | Only touch this storage power. Omit to apply to every `apoli:power_storage` the entity has.
`power` | [Identifier](/docs/datapack/data-types/identifier) or list | *optional* | The power ids to store or remove.
`tags` | [String](/docs/datapack/data-types/string) or list | *optional* | Every loaded power carrying one of these tags. Combined with `power`, both sets are used.
`from_held` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Take the ids from the powers the entity actually holds, narrowed by `power` and `tags`, instead of from the ids themselves.
`operation` | `add`, `remove` or `clear` | `add` | What to do. `clear` empties the storage and ignores the filters.

A power is refused if the storage is full (unless it sets `replace_oldest`), if it is already stored, if the storage's own `powers` / `tags` whitelist rejects it, or if no power with that id is loaded.

## Examples

Learn a spell:

```json
{
  "type": "apoli:store_power",
  "storage": "example:spell_book",
  "power": "example:fireball"
}
```

Forget everything on death:

```json
{
  "type": "apoli:action_on_death",
  "entity_action": {
    "type": "apoli:store_power",
    "operation": "clear"
  }
}
```

Copy every spell-tagged power the entity currently holds into its book:

```json
{
  "type": "apoli:store_power",
  "from_held": true,
  "tags": "spell"
}
```
