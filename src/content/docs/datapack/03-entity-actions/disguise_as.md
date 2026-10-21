---
title: "Disguise As (Entity Action Type)"
description: "Makes the entity look like another entity, either a mob type or a player."
navigation_title: "Disguise As"
aliases: ["disguise_as_player"]
---

Makes the entity look like another entity, either a mob type or a player. It was ported from the Sync mod and covers both of its actions, `disguise_as` and `disguise_as_player`. The disguise is only visual, and the entity's real type and behaviour don't change.

Type ID: `apoli:disguise_as` (alias `apoli:disguise_as_player`)

> [!NOTE]
> `apoli:disguise_as_player` is the same action, so use whichever reads better. Give `entity_type` for a mob disguise, or `player_name` or `player_uuid` for a player disguise. A player disguise shows the target's skin and arm model while that player is online. The client can't look up an offline target, so a disguised mob falls back to the default skin for the target's UUID, and a disguised player keeps their own skin.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `entity_type` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | The mob type to look like, such as `minecraft:zombie`. Ignored if a player field is set. |
| `player_name` | [String](/docs/datapack/data-types/string) | _optional_ | The name of the player to look like, resolved from the server's profile cache. |
| `player_uuid` | [String](/docs/datapack/data-types/string) | _optional_ | The UUID of the player to look like. Takes priority over `player_name`. |
| `nbt` | [NBT](/docs/datapack/data-types/nbt) | _optional_ | Extra NBT applied to a mob disguise, for example to set a variant or a custom name. |
| `overwrite` | [Boolean](/docs/datapack/data-types/boolean) | `true` | With `false`, does nothing when the entity is already disguised. |
| `change_name` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether the disguise also changes the name the entity shows in its nameplate, in chat and in the multiplayer tab list. Set it to `false` to keep the original name. |
| `before_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Runs on the entity before the disguise is applied. |
| `after_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Runs on the entity after the disguise is applied. |

## Examples

```json
"entity_action": {
    "type": "apoli:disguise_as",
    "entity_type": "minecraft:armor_stand"
}
```

This disguises the entity as an armor stand.

```json
"entity_action": {
    "type": "apoli:disguise_as_player",
    "player_name": "Notch"
}
```

This disguises the entity as the player "Notch", shown with their skin if they are online.

## How the disguise renders

For a mob disguise, the client builds a hidden copy of that entity type and draws it in place of the real one. Everything about the disguise is on the client, and the hitbox, collisions and behaviour stay the same.

That copy is kept in step with the entity it is hiding:

- Animations play. Walking, swimming, sneaking, the hurt flash, death and pose all follow the real entity.
- Attacks animate too. Swinging, and the attack animations of mobs that have their own (an Iron Golem's arm swing, a Warden's lunge), play when the disguised entity attacks.
- Fire shows on the disguise when the real entity is burning.
- The disguise is silent. It never plays the disguise mob's idle or attack sounds, and only the real entity's own sounds are heard.
- Particle effects that belong to the disguise mob, such as an Enderman's portal particles, do appear.

A disguise as something that isn't alive, such as an arrow, a boat or an item, renders correctly but stays still. Only living disguises are animated.

### Player disguises

A player disguise on a mob builds the same kind of hidden copy, this time a player built from the target's profile. A disguised zombie walks, sneaks and swings as a player, wearing the target's skin and their slim or wide arm model. The mob's own held item and armour are copied onto it, so a zombie carrying an iron sword still carries it while disguised.

A player disguised as another player is the one case that doesn't use a copy. The real player is still drawn, wearing the target's skin and the target's slim or wide arm model in third person, in first person and in the inventory preview, so first person hands and every other player render power keep working. The cape and elytra keep the player's own cape texture.

> [!NOTE]
> An action that damages without a swing, such as a bare [apoli:damage](/docs/datapack/bientity-actions/damage), plays no attack animation, because nothing tells the client an attack happened.

> [!NOTE]
> A disguise also changes the holder's name in chat and in the multiplayer tab list, as well as the nameplate, unless `change_name` is `false`. An active [apoli:modify_label_render](/docs/datapack/powers/modify_label_render) takes priority over the disguise's name.
