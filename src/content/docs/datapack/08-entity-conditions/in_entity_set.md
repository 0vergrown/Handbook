---
title: "In Entity Set (Entity Condition Type)"
description: "Counts how many entity sets the entity is a member of."
navigation_title: "In Entity Set"
aliases: ["in_set"]
---

Checks whether the entity is a member of someone's [entity set](/docs/datapack/powers/entity_set), by counting the sets it is in. With no fields, it passes when the entity is in at least one set.

Type ID: `apoli:in_entity_set` (alias `apoli:in_set`)

This asks from the member's side. The [bi-entity condition of the same name](/docs/datapack/bientity-conditions/in_entity_set) asks from the owner's side instead, checking whether the target is in the actor's set.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `set` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | Only counts sets that come from this [apoli:entity_set](/docs/datapack/powers/entity_set) power. Without it, every entity set counts. |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | `">="` | How the number of sets is compared with `compare_to`. |
| `compare_to` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | `1` | The number of sets to compare against. |

Each owner's set counts separately, so an entity that two players have each added to their `example:party` set is in 2 sets.

## Examples

```json
"condition": {
    "type": "apoli:in_entity_set",
    "set": "example:party"
}
```

This passes while anyone has the entity in their `example:party` set.

```json
"condition": {
    "type": "apoli:in_entity_set",
    "comparison": ">=",
    "compare_to": 3
}
```

This passes when the entity is in three or more sets at once, of any kind.

> [!WARNING]
> Only the server knows how many sets an entity is in, so this condition is always false when the client evaluates it. To drive a visual power such as [apoli:model_color](/docs/datapack/powers/model_color) or [apoli:entity_glow](/docs/datapack/powers/entity_glow), ask from the owner's side with the [bi-entity condition of the same name](/docs/datapack/bientity-conditions/in_entity_set), which works on the client.
