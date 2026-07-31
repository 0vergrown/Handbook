---
title: "Inventory (Power Type)"
description: "Provides an inventory that can be opened with the specified Key; may or may not persist on death."
navigation_title: "Inventory"
---

Provides an inventory that can be opened with the specified [Key](/docs/datapack/data-types/key); may or may not persist on death.

Type ID: `apoli:inventory`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`title` | [Text Component](/docs/datapack/data-types/text-component) | `"container.inventory"` | The translation key or literal text to use as the display name for the inventory.
`container_type` | [Container Type](/docs/datapack/data-types/container-type) | `"dropper"` | Determines what type of container the inventory will be similar to.
`drop_on_death` | [Boolean](/docs/datapack/data-types/boolean) | `false` | When this is set to true, the player will drop the items in the inventory on death (vanishing items will vanish!).
`drop_on_death_filter` | Item Condition Type | _optional_ | If this is set, only item stacks matching this condition will be dropped on death.
`recoverable` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Determines if the content of the inventory should be dropped upon losing the power.
`key` | [Key](/docs/datapack/data-types/key) | `{"key": "key.apoli.primary_active"}` | Which active key this power should respond to.

## Examples

```json
{
	"type": "apoli:inventory",
	"container_type": "hopper",
	"drop_on_death": false,
	"key": {
		"key": "key.hotbar.9"
	}
}
```

This example will allow the player to open an inventory similar to a Hopper; consisting only of 5 slots but does not drop on death.

```json
{
  	"type": "apoli:inventory",
  	"drop_on_death": true,
	"drop_on_death_filter": {
		"type": "apoli:food",
		"inverted": true
	}
}
```

This example will allow the player to open a 9-slots inventory of which only non-food items will drop on death.
