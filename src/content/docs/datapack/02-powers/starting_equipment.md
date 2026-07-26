---
title: "origins:starting_equipment"
description: "[Power Type](../powertypes.md)"
---

Power Type

Provides the player with items when the power is granted.

Type ID: `origins:starting_equipment`


## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`stack` | Positioned Item Stack | _optional_ | If specified, this item will be given to the player (can be specified in an inventory slot). 
`stacks` | Array of Positioned Item Stacks | _optional_ | If specified, these items will be given to the player (can be specified in an inventory slot). 
`recurrent` | Boolean | `false` | Determines whether the specified item(s) should be given after respawning.


## Examples

```json
{
  	"type": "origins:starting_equipment",
  	"stacks": [
    	{
      		"item": "minecraft:compass"
    	},
    	{
      		"item": "minecraft:clock"
    	},
    	{
      		"item": "minecraft:map",
	    	"amount": 9
    	}
  	]
}
```

This example will give the player the "Explorer Kit" known from Origins: Classes that consists of a compass, a clock and 9 empty maps.



```json
{
    "type": "origins:starting_equipment",
    "stacks": [
        {
            "item": "minecraft:white_stained_glass",
            "amount": 1,
            "slot": 39
        },
        {
            "item": "minecraft:leather_chestplate",
            "amount": 1,
            "tag": "{display: {color: 16383998}}",
            "slot": 38
        },
        {
            "item": "minecraft:leather_leggings",
            "amount": 1,
            "tag": "{display: {color: 16383998}}",
            "slot": 37
        },
        {
            "item": "minecraft:leather_boots",
            "amount": 1,
            "tag": "{display: {color: 16383998}}",
            "slot": 36
        },
        {
            "item": "minecraft:written_book",
            "amount": 1,
            "tag": "{display: {Name: '{\"text\": \"Example Book\", \"color\": \"light_purple\", \"italic\": false}'}, title: \"Example Book\", author: \"eggohito\", pages: ['{\"text\": \"This is page one.\"}', '{\"text\": \"This is page two, the last page.\"}']}",
            "slot": 8
        }
    ]
}
```

This example will give the player a White Stained Glass Block in its head equipment slot, a white-colored Leather Chestplate, Leggings and Boots in its chest, legs, and feet equipment slots respectively and a Written Book with two pages in the 9th hotbar slot.

