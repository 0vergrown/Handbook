---
title: "Store Power (Bi-Entity Action Type)"
description: "Puts powers into the target's apoli:power_storage, optionally taken from the actor."
navigation_title: "Store Power"
---

Puts powers into the target's [`apoli:power_storage`](/docs/datapack/powers/power_storage), takes them out, or empties it. With `from_held`, the IDs come from the powers the actor holds, so one entity can teach another what it knows.

Type ID: `apoli:store_power`

The fields are the same as in the entity form, [`apoli:store_power`](/docs/datapack/entity-actions/store_power), and only the side that owns the storage differs. Mixing up the two sides is the usual reason nothing gets stored, so with [`/apoli:dev_mode`](/docs/datapack/commands/dev-mode) on, each attempt names the entity whose storage was written and, for `from_held`, the entity it read the powers from.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `storage` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | Only touches this storage power on the target. Leave it out to apply to every one it has. |
| `power` | [Identifier](/docs/datapack/data-types/identifier) or list | _optional_ | The power IDs to store or remove. |
| `tags` | [String](/docs/datapack/data-types/string) or list | _optional_ | Every loaded power carrying one of these tags. |
| `from_held` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Takes the IDs from the powers the actor holds, narrowed by `power` and `tags`. |
| `operation` | [String](/docs/datapack/data-types/string) | `add` | `add`, `remove` or `clear`. `clear` empties the storage and ignores the filters. |

## Examples

Pass on spells with every hit, so the actor's spell-tagged powers land in the target's book:

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
