---
title: "Starting Equipment (Power Type)"
description: "Gives the player items when the power is granted."
navigation_title: "Starting Equipment"
---

Gives the player items when the power is granted.

Type ID: `apoli:starting_equipment`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `stack` | [Positioned Item Stack](/docs/datapack/data-types/positioned-item-stack) | _optional_ | If set, this item is given to the player, optionally in a specific inventory slot. |
| `stacks` | [Array](/docs/datapack/data-types/array) of [Positioned Item Stacks](/docs/datapack/data-types/positioned-item-stack) | _optional_ | If set, these items are given to the player, optionally in specific inventory slots. |
| `recurrent` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Whether the items are given again after the player respawns. |

## Examples

```json
{
  	"type": "apoli:starting_equipment",
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

This gives the player the Explorer Kit from the Origins: Classes mod: a compass, a clock and 9 empty maps.

```json
{
    "type": "apoli:starting_equipment",
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

This gives the player a white stained glass block in the head slot, white leather chestplate, leggings and boots in the chest, legs and feet slots, and a written book with two pages in the ninth hotbar slot.
