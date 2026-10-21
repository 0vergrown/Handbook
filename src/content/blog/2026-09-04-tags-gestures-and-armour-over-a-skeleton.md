---
title: "Tags, gestures, and armour over a skeleton"
description: "Apoli 1.68.0 tags powers so actions can name a group instead of a list, adds apoli:action_on_mouse_movement, draws custom_model_render onto humanoid disguises, and builds tick rates on Minecraft's own /tick. Origins 1.31.0 tags origins and adds origins:origin_tag."
date: 2026-09-04
author: Overgrown
---

There are four things here, and two of them are the same idea applied twice: labels you put on content so that rules can name a group instead of a list.

## Powers can carry tags

A power can now carry a `tags` list, and three actions can pick powers by tag instead of by ID: [apoli:transfer](/docs/datapack/bientity-actions/transfer), [apoli:suppress_power](/docs/datapack/entity-actions/suppress_power) and [apoli:unsuppress_power](/docs/datapack/entity-actions/unsuppress_power).

```json
{
    "type": "apoli:action_on_key_press",
    "tags": ["copyable_move"],
    "entity_action": { "type": "apoli:execute_command", "command": "say hi" }
}
```
```json
{
    "type": "apoli:transfer",
    "mode": "steal",
    "copy": true,
    "tags": ["copyable_move"],
    "new_source": "example:mimicked"
}
```

That's a mimic power that copies one move off whoever it touches, and it keeps working when another pack adds a fifteenth origin, because the tag finds the move without anyone editing a list.

Tags are plain strings, matched exactly. They aren't namespaced for you, so prefix your own (`mypack.copyable`) on a server running more than one pack.

## Origins can carry tags too

Origins 1.31.0 puts the same `tags` list on an origin, read by the new [origins:origin_tag](/docs/datapack/origins/origin_tag) condition:

```json
{
    "name": "super op origin",
    "tags": ["universeLevel"],
    "icon": { "item": "minecraft:tnt" },
    "impact": 3
}
```
```json
{
    "type": "origins:origin_tag",
    "tag": "universeLevel",
    "inverted": true
}
```

That's "works on anyone below your weight class", written once.

## The mouse is an input now

[apoli:action_on_mouse_movement](/docs/datapack/powers/action_on_mouse_movement) runs an entity action when the holder moves their mouse, with `up`, `down`, `left` and `right` to pick directions and a `threshold` in degrees, so a resting hand triggers nothing. `mouse_x` and `mouse_y` are bound as expression variables while the action runs, so the action can read how far the mouse moved.

The interesting field is `ignore_modify_cursor_speed`. Normally the power sees what actually turned the player, so a [modify_cursor_speed](/docs/datapack/powers/modify_cursor_speed) of `0` means it never fires. Set the field and the power reads the raw mouse movement instead, which turns a frozen view into a gesture control instead of a dead one.

## custom_model_render survives a disguise

[apoli:custom_model_render](/docs/datapack/powers/custom_model_render) now draws onto a [disguise](/docs/datapack/entity-actions/disguise_as) whose model is humanoid: a zombie, husk, drowned, skeleton, stray, wither skeleton or piglin. Texture overlays paint onto the disguise's limbs and geometry follows its live pose, so the "wear armour while looking like a skeleton" build works the way it reads:

```json
{
  "type": "apoli:multiple",
  "skeleton_body": { "type": "apoli:disguise_as", "entity_type": "minecraft:skeleton" },
  "armor": {
    "type": "apoli:custom_model_render",
    "mode": "texture",
    "render_as_overlay": true,
    "wide_texture_location": "example:textures/models/armor/plate_wide.png",
    "slim_texture_location": "example:textures/models/armor/plate_slim.png"
  }
}
```

A disguise with no limbs to bind to, such as a creeper or a bee, still skips the power, and a disguise as another player never needed the change.

## Tick rates now sit on top of `/tick`

[apoli:tick_rate](/docs/datapack/entity-actions/tick_rate) gained a `server` scope, which doesn't use any of Apoli's own machinery: it calls the same code the `/tick` command does. `rate` is `/tick rate`, `frozen` is `/tick freeze`, `step` is `/tick step` and `sprint` is `/tick sprint`. Minecraft syncs that state to every client itself, so rendering, particles and sounds all slow down together and nothing stutters. For a global slow motion effect, that's now the scope to reach for.

```json
{
    "type": "apoli:tick_rate",
    "scope": "server",
    "rate": 5
}
```

Rates for single entities and chunks are still Apoli's own, but they no longer stop at the server. An entity that ends up slower than the server tells its viewers, and their clients stretch the movement interpolation to match, so a slowed mob or projectile glides instead of lurching between updates. A rate on a player now slows that player's own tick too, movement included. It didn't before, because player movement is decided by the client, and there was nothing on the client listening.

> [!NOTE]
> `scope: server` needs the `/tick` command, so it only works on 1.21 and later. On 1.20.1, use `dimension`.
