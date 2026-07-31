---
title: "Give (Entity Action Type)"
description: "Gives the entity an item stack by inserting it into its inventory or dropping it on the ground if there is no available inventory space."
navigation_title: "Give"
---

Gives the entity an item stack by inserting it into its inventory or dropping it on the ground if there is no available inventory space.

Type ID: `apoli:give`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`stack` | Item Stack |  | The item stack to give to the entity.
`item_action` | Item Action Type | _optional_ | If specified, the specified item action type will be executed on the item stack before it's given to the player.
`preferred_slot` | String | _optional_ | If specified, this will prioritize the action to put the item in the specified slot. Accepts `"chest"`, `"feet"`, `"head"`, `"legs"`, `"mainhand"` or `"offhand"`.

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

This example gives the entity 3 Eggs.

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

This example will give the entity an Iron Axe that has a `Damage` value of `20` that will be preferably put in the offhand equipment slot.
