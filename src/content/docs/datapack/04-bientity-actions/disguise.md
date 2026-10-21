---
title: "Disguise (Bi-Entity Action Type)"
description: "Disguises the actor as the target, copying the target's type and NBT so the two look the same."
navigation_title: "Disguise"
---

Disguises the actor as the target, copying the target's type and NBT so the actor looks identical to it. It was ported from the Sync mod, and suits powers where you become whatever you hit or look at.

Type ID: `apoli:disguise`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `overwrite` | [Boolean](/docs/datapack/data-types/boolean) | `true` | With `false`, does nothing when the actor is already disguised. |
| `change_name` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether the disguise also changes the name the actor shows in its nameplate, in chat and in the multiplayer tab list. Set it to `false` to keep the original name. |

## Examples

```json
"bientity_action": {
    "type": "apoli:disguise"
}
```

The actor takes on the appearance of the target.

Neither the actor nor the target has to be a player. A mob or a player told to disguise as a player is drawn as that player, skin and arm model included. See [apoli:disguise_as](/docs/datapack/entity-actions/disguise_as) for how the disguise is rendered.

> [!NOTE]
> A disguise also changes the actor's name in chat and in the multiplayer tab list, as well as the nameplate, unless `change_name` is `false`. An active [apoli:modify_label_render](/docs/datapack/powers/modify_label_render) takes priority over the disguise's name.
