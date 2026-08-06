---
title: "Prevent Feature Render (Power Type)"
description: "Prevents certain feature renderers (a sheep's wool coat, a mob's worn armor, and so on) from rendering on the entity that has the power."
navigation_title: "Prevent Feature Render"
---

Hides one or more of the vanilla *feature renderers* — the extra layers drawn on top of an entity's base model, like worn armor, a held item, a cape, or a sheep's wool.

Type ID: `apoli:prevent_feature_render`

## Fields

Field | Type | Default | Description
------|------|---------|------------
`feature` | String | _optional_ | A single feature name to hide. Merged into `features`.
`features` | Array of String | _optional_ | Feature names to hide. **Omit both fields to hide every feature layer.**

## Feature names

A name matches its class *and every subclass*, so `held_item` also covers the player's own item layer, and `eyes` covers spider, enderman, phantom and breeze eyes at once.

Name | Hides
-----|------
`armor` | worn armor on humanoid mobs and players
`cape` | the player cape (and elytra texture slot)
`cat_collar` | a tamed cat's collar
`creeper_power` | the charged-creeper swirl
`deadmau5` | the deadmau5 ears easter egg
`dolphin_held_item` | an item a dolphin is carrying
`drowned_overlay` | the drowned's outer layer
`elytra` | worn elytra wings
`enderman_block` | the block an enderman is carrying
`energy_swirl_overlay` | charged/powered swirl overlays
`eyes` | glowing eye overlays (spider, enderman, phantom, breeze, warden)
`fox_held_item` | an item a fox is carrying
`head` | anything worn in the head slot (skulls, pumpkins, blocks)
`held_item` | items held in either hand
`horse_armor` | horse armor
`horse_marking` | a horse's coat markings
`iron_golem_crack` | iron golem damage cracks
`iron_golem_flower` | the poppy an iron golem holds
`llama_decor` | a llama's carpet
`mooshroom_mushroom` | mooshroom mushrooms
`panda_held_item` | an item a panda is holding
`saddle` | saddles
`sheep_wool` | a sheep's wool coat
`shoulder_parrot` | parrots sitting on a player's shoulders
`shulker_head` | the shulker head
`skeleton_clothing` | the stray's icy overlay
`slime_overlay` | the slime's translucent outer cube
`snowman_pumpkin` | the snow golem's pumpkin
`stuck_arrows` | arrows stuck in the entity
`stuck_objects` | anything stuck in the entity (arrows *and* bee stingers)
`stuck_stingers` | bee stingers stuck in the entity
`trident_riptide` | the riptide spin-attack swirl
`tropical_fish_color` | tropical fish patterns
`villager_clothing` | villager profession clothing
`villager_held_item` | an item a villager is holding
`witch_item` | the potion a witch holds
`wither_armor` | the wither's armor
`wolf_armor` | wolf armor
`wolf_collar` | a tamed wolf's collar
`breeze_wind` | the breeze's wind body

> An unrecognised name simply never matches anything — the power is not rejected. Check the spelling against this table if a layer refuses to disappear.

## Examples

Hide the worn armor, held item and elytra:

```json
{
    "type": "apoli:prevent_feature_render",
    "features": [
        "armor",
        "held_item",
        "elytra"
    ]
}
```

Hide *every* feature layer while sneaking, leaving only the bare model:

```json
{
    "type": "apoli:prevent_feature_render",
    "condition": {
        "type": "apoli:sneaking"
    }
}
```
