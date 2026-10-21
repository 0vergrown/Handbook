---
title: "Modify Bounciness (Power Type)"
description: "Makes the entity bounce off blocks it lands on, and decides whether the landing still hurts."
navigation_title: "Modify Bounciness"
aliases: ["modify_block_bounciness"]
---

Makes the entity bounce off blocks it lands on. The speed it hits the ground with goes through the [attribute modifiers](/docs/datapack/data-types/attribute-modifier) and becomes upward speed. A result of `0.125` or less is too small to bounce and is ignored.

Type ID: `apoli:modify_bounciness`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `block_condition` | [Block Condition Type](/docs/datapack/block-conditions) | _optional_ | Only bounce off blocks that pass this condition. Without it, every block bounces. |
| `modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | Applied to the landing speed to get the bounce height. |
| `modifiers` | [Array](/docs/datapack/data-types/array) of [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | Several modifiers. |
| `block_action` | [Block Action Type](/docs/datapack/block-actions) | _optional_ | Runs on the block landed on each time the entity bounces. |
| `entity_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Runs on the bouncing entity each time it bounces. |
| `damage` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Whether the entity still takes fall damage on a matching block. With `false`, a matching landing doesn't hurt, as on a slime block. |
| `preventable` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether sneaking cancels the bounce, as it does on a slime block. Set it to `false` and the entity bounces even while sneaking. |

`damage` and `preventable` are read from every matching power. If any of them sets `damage: true` the landing hurts, and if any sets `preventable: true` sneaking cancels the bounce. Neither field does anything unless a power matches the block being landed on, so an entity without `apoli:modify_bounciness` takes fall damage as it does in vanilla.

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

Bounce and play a sound each time:

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
