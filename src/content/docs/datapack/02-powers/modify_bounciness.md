---
title: "Modify Bounciness (Power Type)"
description: "Makes the entity bounce off blocks it lands on, and decides whether that landing still hurts."
navigation_title: "Modify Bounciness"
---

Makes the entity bounce off blocks it lands on. The speed it hits the ground with is run through the [attribute modifiers](/docs/datapack/data-types/attribute-modifier) and becomes upward speed; a result of `0.125` or less is too small to bounce and is ignored.

Type ID: `apoli:modify_bounciness`

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`block_condition` | Block Condition Type | *optional* | Only bounce off blocks matching this. Omit and every block bounces.
`modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | *optional* | Applied to the landing speed to get the bounce height.
`modifiers` | list of [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | *optional* | Several of the above.
`block_action` | Block Action Type | *optional* | Runs on the landed-on block each time a bounce happens.
`entity_action` | Entity Action Type | *optional* | Runs on the bouncing entity each time a bounce happens.
`damage` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Whether the entity still takes fall damage on a matching block. Left `false`, a matching landing hurts nothing — the slime-block behaviour.
`preventable` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether sneaking cancels the bounce, the way it cancels a slime block's. Set `false` and the entity bounces even while sneaking.

`damage` and `preventable` are read from **every** matching power: if any of them sets `damage: true` the landing hurts, and if any sets `preventable: true` sneaking cancels the bounce. Neither field does anything unless a power actually matches the block being landed on, so an entity with no `apoli:modify_bounciness` takes fall damage exactly as vanilla does.

## Examples

Bounce off everything at half the speed you hit the ground with:

```json
{
  "type": "apoli:modify_bounciness",
  "modifier": {
    "operation": "multiply_base_multiplicative",
    "value": 0.5
  }
}
```

Bounce only off wool, keep taking fall damage, and ignore sneaking:

```json
{
  "type": "apoli:modify_bounciness",
  "block_condition": {
    "type": "apoli:in_tag",
    "tag": "minecraft:wool"
  },
  "modifier": {
    "operation": "multiply_base_multiplicative",
    "value": 0.8
  },
  "damage": true,
  "preventable": false
}
```

Bounce and make a noise about it:

```json
{
  "type": "apoli:modify_bounciness",
  "modifier": {
    "operation": "multiply_base_multiplicative",
    "value": 0.9
  },
  "entity_action": {
    "type": "apoli:play_sound",
    "sound": "minecraft:entity.slime.squish",
    "volume": 0.6
  }
}
```
