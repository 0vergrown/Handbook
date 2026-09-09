---
title: "Store Power (Bi-Entity Action Type)"
description: "Puts powers into the target's apoli:power_storage, optionally taken from the actor."
navigation_title: "Store Power"
---

Puts powers into the **target's** [`apoli:power_storage`](/docs/datapack/powers/power_storage), takes them out, or empties it. With `from_held`, the ids come from the powers the **actor** holds — one entity teaching another what it knows.

Type ID: `apoli:store_power`

The fields are the same as the entity form, [`apoli:store_power`](/docs/datapack/entity-actions/store_power); only which side owns the storage differs.

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`storage` | [Identifier](/docs/datapack/data-types/identifier) | *optional* | Only touch this storage power on the target. Omit to apply to every one it has.
`power` | [Identifier](/docs/datapack/data-types/identifier) or list | *optional* | The power ids to store or remove.
`tags` | [String](/docs/datapack/data-types/string) or list | *optional* | Every loaded power carrying one of these tags.
`from_held` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Take the ids from the powers the **actor** holds, narrowed by `power` and `tags`.
`operation` | `add`, `remove` or `clear` | `add` | What to do. `clear` empties the storage and ignores the filters.

## Examples

Steal a spell on hit — the actor's spell-tagged powers land in the target's book:

```json
{
  "type": "apoli:action_on_hit",
  "bientity_action": {
    "type": "apoli:store_power",
    "from_held": true,
    "tags": "spell"
  }
}
```

Hand one named power to whoever you are looking at:

```json
{
  "type": "apoli:store_power",
  "storage": "example:spell_book",
  "power": "example:frost_nova"
}
```
