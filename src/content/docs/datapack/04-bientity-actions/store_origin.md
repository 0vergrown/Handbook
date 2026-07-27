---
title: "origins:store_origin"
description: "Stores the target's origin into the actor's store under a named key."
---

Reads the **target's** origin and writes it into the **actor's** store under a named key. The target is not changed — this copies the id, it does not take the origin.

Type ID: `origins:store_origin`

> This is an Origins addon action (not core Apoli). **Both** the actor and target must be players. See [Origin storage](/docs/datapack/origins/storage) for the system as a whole.

## Fields

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `key` | [String](/docs/datapack/data-types/string) | _required_ | The name to store the entry under on the actor. |
| `layer` | [Identifier](/docs/datapack/data-types/identifier) | `origins:origin` | Which of the target's layers to read, and the layer recorded with the entry. |
| `origin` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | Store this origin id literally instead of reading the target's. |
| `clear` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Remove the entry at `key` from the actor instead of writing one. |

Wrap it in [`apoli:invert`](/docs/datapack/bientity-actions/invert) to store the *actor's* origin onto the *target* instead.

## Examples

Note down what you just hit:

```json
{
  "type": "apoli:action_on_hit",
  "bientity_action": { "type": "origins:store_origin", "key": "last_victim" }
}
```

Read the target's origin but write it to the target's own store:

```json
{
  "type": "apoli:invert",
  "action": { "type": "origins:store_origin", "key": "mine" }
}
```

## See also

- [`origins:store_origin`](/docs/datapack/entity-actions/store_origin) — the entity form, which reads the acting entity's own origin.
- [`origins:transfer_origin`](/docs/datapack/bientity-actions/transfer_origin) — actually move an origin between players.
- [Origin storage](/docs/datapack/origins/storage)
