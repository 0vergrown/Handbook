---
title: "Power (Entity Condition Type)"
description: "Checks whether the entity has a specified power, or any power carrying one of the given tags."
navigation_title: "Power"
---

Checks whether the entity has a specified power, or any power that carries one of the given [tags](/docs/datapack/introduction/powers#tagging-powers). Mostly used for Origin conditions in layers.

Type ID: `apoli:power`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`power` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | The namespace and ID of the power the entity needs to have to pass the check.
`tags` | [String](/docs/datapack/data-types/string) or [Array](/docs/datapack/data-types/array) of Strings | _optional_ | Passes if the entity has any power carrying one of these tags.
`source` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | If specified, the matching power must also come from this power source.

Give `power`, `tags`, or both. A condition with neither fails to load, and the log names the power it is in. With both, the condition passes when either one matches.

## Examples

```json
"condition": {
    "type": "apoli:power",
    "power": "origins:damage_from_potions"
}
```

This example will check if the player has the [`origins:damage_from_potions`](https://github.com/apace100/origins-fabric/blob/master/src/main/resources/data/origins/powers/damage_from_potions.json) power in its origin.

```json
"condition": {
    "type": "apoli:power",
    "tags": ["example.water_breathing", "example.amphibious"],
    "source": "origins:origin"
}
```

This example passes while the entity holds any power tagged `example.water_breathing` or `example.amphibious` that its origin granted, without listing the powers themselves.

> The list of powers carrying each tag is built once when data packs load, so a tag check costs one lookup per power that carries the tag. It does not walk every power the entity has.
