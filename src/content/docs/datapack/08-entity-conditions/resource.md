---
title: "Resource (Entity Condition Type)"
description: "Checks the value of a power that uses the apoli:resource power type, or a power type that has a built-in cooldown (using remaining ticks as the value)."
navigation_title: "Resource"
---

Checks the value of a power that uses the [apoli:resource](/docs/datapack/powers/resource) power type, or a power type that has a built-in cooldown (using remaining ticks as the value).

Type ID: `apoli:resource`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`resource` | Identifier | | The namespace and ID of a power that will be evaluated.
`position` | [Integer](/docs/datapack/data-types/integer) OR [Expression](/docs/datapack/data-types/expression) | _optional_ | Which slot of a table resource to read. Omit it and the condition passes if **any** slot satisfies the comparison. Also aliased as `index` and `slot`.
`comparison` | [Comparison](/docs/datapack/data-types/comparison) | | Determines how the value of the specified power should be compared to the specified value.
`compare_to` | [Integer](/docs/datapack/data-types/integer) OR [Expression](/docs/datapack/data-types/expression) | | The value the resource is compared against. Also aliased as `check`. As an Expression it is re-evaluated every time the condition is tested, so you can compare a resource against another resource, an entity stat, or any math over them.

## Checking one slot of a table

When `resource` names a [apoli:resource](/docs/datapack/powers/resource) with a `size` above `1`, `position` picks the slot to read:

```json
"condition": {
    "type": "apoli:resource",
    "resource": "example:table",
    "position": 2,
    "comparison": "==",
    "compare_to": 5
}
```

That reads the value at position 2 and passes when it is `5`.

Leave `position` out and the condition becomes "is this value anywhere in the table?":

```json
"condition": {
    "type": "apoli:resource",
    "resource": "example:table",
    "comparison": "==",
    "compare_to": 5
}
```

`position` is itself an [Expression](/docs/datapack/data-types/expression), so the slot can be computed — `"position": "example:cursor"` reads whichever slot another resource is pointing at.

> On a scalar resource (no `size`, or `size` of `1`) an omitted `position` behaves exactly as it always has: it reads the single value.

## Cooldowns as resources

`resource` does not have to name a [apoli:resource](/docs/datapack/powers/resource) or [apoli:cooldown](/docs/datapack/powers/cooldown) power. Every power type with a built-in `cooldown` field exposes that cooldown as a read-only resource whose value is the **remaining ticks** — `0` means the power is ready:

- [apoli:action_on_key_press](/docs/datapack/powers/action_on_key_press) (and its `active_self` alias)
- [apoli:action_on_key_sequence](/docs/datapack/powers/action_on_key_sequence)
- [apoli:fire_projectile](/docs/datapack/powers/fire_projectile)
- [apoli:action_on_hit](/docs/datapack/powers/action_on_hit), [apoli:action_when_hit](/docs/datapack/powers/action_when_hit)
- [apoli:action_on_kill](/docs/datapack/powers/action_on_kill)
- [apoli:action_on_collision](/docs/datapack/powers/action_on_collision)
- [apoli:game_event_listener](/docs/datapack/powers/game_event_listener)

So the idiomatic "is this ability off cooldown?" check is a comparison against `0`:

```json
"condition": {
    "type": "apoli:resource",
    "resource": "example:dash",
    "comparison": "==",
    "compare_to": 0
}
```

> The same ids work in [apoli:modify_resource](/docs/datapack/entity-actions/modify_resource) and `/apoli:resource`, so a data pack can shorten or clear an ability's cooldown. Writing clamps to `0 … cooldown`.

## Comparing against an Expression

`compare_to` accepts a full [Expression](/docs/datapack/data-types/expression), not just a literal number. On top of the usual Expression variables, the following are bound here:

- `value`: the current value of the resource named in `resource` — the same number on the left-hand side of the comparison.
- `<namespace>:<path>`: the value of **any other** Resource or Cooldown power the entity has, written as its full power id. This is how you compare one resource against another.
- Every other Expression variable (`health`, `max_health`, `xp_level`, `world_time`, …) — see the [Expression](/docs/datapack/data-types/expression) page for the full list.

## Examples

```json
"condition": {
    "type": "apoli:resource",
    "resource": "example:a_simple_resource",
    "comparison": "==",
    "compare_to": 1
}
```

This example will check if the player has a value of 1 in the `example:a_simple_resource` resource power. (`data\example\powers\a_simple_resource.json`)

```json
"condition": {
    "type": "apoli:resource",
    "resource": "example:a_multiple_power_with_resource_subpower",
    "comparison": ">",
    "compare_to": 50
}
```

This example will check if the player has a value of more than 50 in the `with_resource_subpower` sub-power of `example:a_multiple_power` power. (`data\example\powers\a_multiple_power.json`)

```json
"condition": {
    "type": "apoli:resource",
    "resource": "example:mana",
    "comparison": ">=",
    "compare_to": "example:spell_cost"
}
```

Comparing one resource against another: this passes when the entity's `example:mana` resource is at least as large as its `example:spell_cost` resource.

```json
"condition": {
    "type": "apoli:resource",
    "resource": "example:rage",
    "comparison": ">",
    "compare_to": "max_health / 2"
}
```

Expressions can mix resources with entity stats and arithmetic: this passes when the `example:rage` resource exceeds half the entity's maximum health.
