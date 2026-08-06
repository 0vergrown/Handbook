---
title: "Modify Type Tag (Power Type)"
description: "Changes whether the entity counts as a member of an entity type tag."
navigation_title: "Modify Type Tag"
aliases: ["entity_group"]
---

Changes whether the entity counts as a member of an entity type tag, for every check the game makes against that tag.

Type ID: `apoli:modify_type_tag` (type-alias: `apoli:entity_group`)

This replaces the old `apoli:entity_group` power, which could only pick from five hard-coded groups and — in this rewrite — never did anything at all. Tags are the system Minecraft itself uses: `#minecraft:undead` drives Smite damage and healing from Instant Damage, `#minecraft:arthropod` drives Bane of Arthropods, and a data pack's own tags work exactly the same way.

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `tag` | [Identifier](/docs/datapack/data-types/identifier), or an array of them | _required_ | The entity type tag(s) to change membership of. A leading `#` is optional. |
| `included` | [Boolean](/docs/datapack/data-types/boolean) | `true` | `true` adds the entity to the tag; `false` removes it, even if its entity type is genuinely in the tag. |

## Examples

Count as undead — Smite hurts more, Instant Health harms, Instant Damage heals:

```json
{
    "type": "apoli:modify_type_tag",
    "tag": "#minecraft:undead"
}
```

Several tags at once, including one of your own:

```json
{
  "type": "apoli:modify_type_tag",
  "tag": [
    "#minecraft:arthropod",
    "#example:cave_dwellers"
  ]
}
```

Stop counting as undead — a zombie origin that no longer burns to Smite:

```json
{
    "type": "apoli:modify_type_tag",
    "tag": "#minecraft:undead",
    "included": false
}
```

An `included: false` power always wins over an `included: true` one on the same entity and tag, so a removal cannot be undone by another power adding the same tag.

## Upgrading from `apoli:entity_group`

The old ids still load. `"group": "undead"` becomes `"tag": "#minecraft:undead"`, and the same for `arthropod`, `illager` and `aquatic`. `"group": "default"` becomes removal from all four.

## Notes

> The change is visible wherever the game asks "is this entity's type in that tag" — enchantment damage bonuses, mob AI, the `type=#tag` selector argument, and [`apoli:in_tag`](/docs/datapack/entity-conditions/in_tag). It does not rewrite the tag itself, so other entities of the same type are unaffected.

> Membership is **exact**. Adding an entity to `#minecraft:skeletons` does not make it answer yes to `#minecraft:undead` just because the vanilla tag nests one inside the other — name the tag you actually want checked.

> On Minecraft 1.20.1 the four vanilla groups above also feed the pre-1.21 mob-type system, so Smite and Bane of Arthropods react to this power there too.

> Costs nothing when unused. If no loaded power is an `apoli:modify_type_tag`, the hooks fall through on a single boolean read, and entities without the power never pay more than one index lookup.
