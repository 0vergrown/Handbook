---
title: "Give (Entity Action Type)"
description: "Gives the entity an item stack, or drops it on the ground when its inventory is full."
navigation_title: "Give"
---

Gives the entity an item stack by putting it in its inventory. If there is no room, the stack drops on the ground.

Type ID: `apoli:give`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `stack` | [Item Stack](/docs/datapack/data-types/item-stack) | _required_ | The item stack to give. |
| `item_action` | [Item Action Type](/docs/datapack/item-actions) | _optional_ | Runs on the item stack before it is given. |
| `preferred_slot` | [String](/docs/datapack/data-types/string) | _optional_ | The slot to try first: `"chest"`, `"feet"`, `"head"`, `"legs"`, `"mainhand"` or `"offhand"`. |

## Examples

```json
"entity_action": {
  	"type": "apoli:give",
  	"stack": {
	  "item": "minecraft:egg",
	  "amount": 3
  	}
}
```

This gives the entity 3 eggs.

```json
"entity_action": {
    "type": "apoli:give",
    "stack": {
        "item": "minecraft:iron_axe"
    },
    "item_action": {
        "type": "apoli:damage",
        "amount": 20,
        "ignore_unbreaking": true
    },
    "preferred_slot": "offhand"
}
```

This gives the entity an iron axe with a `Damage` value of `20`, put in the offhand slot if possible.
