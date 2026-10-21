---
title: "Resource (Entity Condition Type)"
description: "Compares the value of a resource power, or the remaining ticks of a power's built-in cooldown, with a number."
navigation_title: "Resource"
---

Compares the value of an [apoli:resource](/docs/datapack/powers/resource) power with a number. It also reads any power type with a built-in cooldown, using the remaining ticks as the value.

Type ID: `apoli:resource`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `resource` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The ID of the power to read. |
| `position` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | _optional_ | Which slot of a table resource to read. Leave it out and the condition passes if any slot satisfies the comparison. `index` and `slot` are accepted as aliases. |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | _required_ | How the power's value is compared with `compare_to`. |
| `compare_to` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | _required_ | The value the resource is compared against. `check` is accepted as an alias. An expression is evaluated again every time the condition is tested, so you can compare a resource against another resource, an entity stat or any arithmetic on them. |

## Checking one slot of a table

When `resource` names an [apoli:resource](/docs/datapack/powers/resource) with a `size` above `1`, `position` picks the slot to read:

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

Leave `position` out and the condition asks whether the value is anywhere in the table:

```json
"condition": {
    "type": "apoli:resource",
    "resource": "example:table",
    "comparison": "==",
    "compare_to": 5
}
```

`position` is an [expression](/docs/datapack/data-types/expression) too, so the slot can be worked out when the condition runs. `"position": "example:cursor"` reads whichever slot another resource points at.

> [!NOTE]
> On a resource with one value (no `size`, or a `size` of `1`), leaving `position` out reads that single value.

## Cooldowns as resources

`resource` doesn't have to name an [apoli:resource](/docs/datapack/powers/resource) or [apoli:cooldown](/docs/datapack/powers/cooldown) power. Every power type with a built-in `cooldown` field exposes that cooldown as a read-only resource whose value is the number of ticks left, where `0` means the power is ready:

- [apoli:action_on_key_press](/docs/datapack/powers/action_on_key_press) (and its `active_self` alias)
- [apoli:action_on_key_sequence](/docs/datapack/powers/action_on_key_sequence)
- [apoli:fire_projectile](/docs/datapack/powers/fire_projectile)
- [apoli:action_on_hit](/docs/datapack/powers/action_on_hit), [apoli:action_when_hit](/docs/datapack/powers/action_when_hit)
- [apoli:action_on_kill](/docs/datapack/powers/action_on_kill)
- [apoli:action_on_collision](/docs/datapack/powers/action_on_collision)
- [apoli:game_event_listener](/docs/datapack/powers/game_event_listener)

So the usual check for whether an ability is off cooldown compares against `0`:

```json
"condition": {
    "type": "apoli:resource",
    "resource": "example:dash",
    "comparison": "==",
    "compare_to": 0
}
```

> [!TIP]
> The same IDs work in [apoli:modify_resource](/docs/datapack/entity-actions/modify_resource) and `/apoli:resource`, so a data pack can shorten or clear an ability's cooldown. Writes are clamped between `0` and `cooldown`.

## Comparing against an expression

`compare_to` accepts a full [expression](/docs/datapack/data-types/expression), as well as a plain number. On top of the usual expression variables, these are bound here:

- `value`: the current value of the resource named in `resource`, the same number as on the left of the comparison.
- `<namespace>:<path>`: the value of any other resource or cooldown power the entity has, written as its full power ID. This is how you compare one resource against another.
- Every other expression variable, such as `health`, `max_health`, `xp_level` and `world_time`. See the [Expression](/docs/datapack/data-types/expression) page for the full list.

## Examples

```json
"condition": {
    "type": "apoli:resource",
    "resource": "example:a_simple_resource",
    "comparison": "==",
    "compare_to": 1
}
```

This checks whether the player has a value of 1 in the `example:a_simple_resource` resource power (`data/example/powers/a_simple_resource.json`).

```json
"condition": {
    "type": "apoli:resource",
    "resource": "example:a_multiple_power_with_resource_subpower",
    "comparison": ">",
    "compare_to": 50
}
```

This checks whether the player has a value above 50 in the `with_resource_subpower` sub-power of the `example:a_multiple_power` power (`data/example/powers/a_multiple_power.json`).

```json
"condition": {
    "type": "apoli:resource",
    "resource": "example:mana",
    "comparison": ">=",
    "compare_to": "example:spell_cost"
}
```

This compares one resource against another, and passes when the entity's `example:mana` resource is at least as large as its `example:spell_cost` resource.

```json
"condition": {
    "type": "apoli:resource",
    "resource": "example:rage",
    "comparison": ">",
    "compare_to": "max_health / 2"
}
```

Expressions can mix resources with entity stats and arithmetic. This passes when the `example:rage` resource is more than half the entity's maximum health.
