---
title: "Store Origin (Bi-Entity Action Type)"
description: "Stores the target's origin in the actor's store under a named key."
navigation_title: "Store Origin"
---

Reads the target's origin and writes it into the actor's store under a named key. The target isn't changed, since this only copies the ID.

Type ID: `origins:store_origin`

It shares its ID and fields with the [entity action of the same name](/docs/datapack/origins/store_origin). Which one you get depends on whether you write it in a `bientity_action` field or an `entity_action` field.

> [!NOTE]
> This action comes from the Origins mod. Both the actor and the target must be players, and it only runs on the server. See [Origin storage](/docs/datapack/origins/storage) for the whole system.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `key` | [String](/docs/datapack/data-types/string) | _required_ | The name to store the entry under on the actor. |
| `layer` | [Identifier](/docs/datapack/data-types/identifier) | `origins:origin` | The target's layer to read, which is also recorded with the entry. |
| `origin` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | Stores this origin ID as given instead of reading the target's. |
| `clear` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Removes the entry at `key` from the actor instead of writing one. |

Wrap it in [`apoli:invert`](/docs/datapack/bientity-actions/invert) to store the actor's origin on the target instead.

## Examples

```json
{
  "type": "apoli:action_on_hit",
  "bientity_action": { "type": "origins:store_origin", "key": "last_victim" }
}
```

This power remembers the origin of whoever you hit under `last_victim`.

```json
{
  "type": "apoli:invert",
  "action": { "type": "origins:store_origin", "key": "mine" }
}
```

This reads the actor's origin and writes it to the target's own store, under `mine`.
