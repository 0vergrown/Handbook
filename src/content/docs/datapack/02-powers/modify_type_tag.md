---
title: "Modify Type Tag (Power Type)"
description: "Changes whether the entity counts as a member of an entity type tag."
navigation_title: "Modify Type Tag"
aliases: ["entity_group"]
---

Changes whether the entity counts as a member of an entity type tag, for every check the game makes against that tag.

Type ID: `apoli:modify_type_tag` (type alias: `apoli:entity_group`)

Tags are the system Minecraft itself uses: `#minecraft:undead` drives Smite and how Instant Damage and Instant Health affect an entity, `#minecraft:arthropod` drives Bane of Arthropods, and a data pack's own tags work the same way.

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `tag` | [Identifier](/docs/datapack/data-types/identifier), or an array of them | _required_ | The entity type tags to change membership of. A leading `#` is optional. |
| `included` | [Boolean](/docs/datapack/data-types/boolean) | `true` | `true` adds the entity to the tag. `false` removes it, even if its entity type is in the tag. |

## Examples

Count as undead, so Smite hurts more, Instant Health harms and Instant Damage heals:

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

Stop counting as undead, for a zombie origin that takes no extra damage from Smite:

```json
{
    "type": "apoli:modify_type_tag",
    "tag": "#minecraft:undead",
    "included": false
}
```

An `included: false` power always wins over an `included: true` one on the same entity and tag, so another power adding the tag can't undo a removal.

## The apoli:entity_group alias

`apoli:entity_group` still loads. `"group": "undead"` is read as `"tag": "#minecraft:undead"`, and the same goes for `arthropod`, `illager` and `aquatic`. `"group": "default"` removes the entity from all four.

## Notes

- The change shows wherever the game asks whether the entity's type is in the tag: enchantment damage bonuses, mob AI, the `type=#tag` selector argument and [`apoli:in_tag`](/docs/datapack/entity-conditions/in_tag). The tag itself isn't rewritten, so other entities of the same type are unaffected.
- Membership is exact. Adding an entity to `#minecraft:skeletons` doesn't make it count for `#minecraft:undead`, even though the vanilla tag nests one inside the other. Name the tag you want checked.
- On Minecraft 1.20.1 the four vanilla groups above also feed the old mob type system, so Smite and Bane of Arthropods react to this power there too.
- It costs nothing when unused. If no loaded power is an `apoli:modify_type_tag`, the hooks stop after reading one boolean, and entities without the power never pay more than one index lookup.
