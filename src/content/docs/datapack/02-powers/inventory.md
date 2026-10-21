---
title: "Inventory (Power Type)"
description: "Gives the player an extra inventory that opens with a key, and can keep or drop its items on death."
navigation_title: "Inventory"
---

Gives the player an extra inventory that opens with the chosen [Key](/docs/datapack/data-types/key). Its items can stay with the player when they die or drop with the rest.

Type ID: `apoli:inventory`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `title` | [Text Component](/docs/datapack/data-types/text-component) | `"container.inventory"` | The translation key or literal text shown as the inventory's name. |
| `container_type` | [Container Type](/docs/datapack/data-types/container-type) | `"dropper"` | The kind of container the inventory looks like. |
| `drop_on_death` | [Boolean](/docs/datapack/data-types/boolean) | `false` | If `true`, the player drops the inventory's items on death. Items with Curse of Vanishing are destroyed. |
| `drop_on_death_filter` | [Item Condition Type](/docs/datapack/item-conditions) | _optional_ | If set, only item stacks that pass this condition drop on death. |
| `recoverable` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether the inventory's contents drop when the player loses the power. |
| `key` | [Key](/docs/datapack/data-types/key) | `{"key": "key.apoli.primary_active"}` | The active key the power responds to. |

## Closing the inventory

Pressing the power's `key` again closes the inventory, and so do Esc and the inventory key. The key has to be let go first, so holding it down after opening doesn't close the inventory. The press that closes the inventory doesn't open it again, even while the key is still held.

When `key` is also one of Minecraft's slot keys (a hotbar number, swap offhand, drop or pick block), pressing it with the cursor over a slot does the usual slot action, and pressing it anywhere else closes the inventory.

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

This lets the player open a 5-slot inventory like a hopper's, which doesn't drop on death.

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

This lets the player open a 9-slot inventory, and only the items in it that aren't food drop on death.

> [!NOTE]
> With a grave mod installed, the items that would drop go into the grave instead: [You're in Grave Danger](/docs/compat/youre-in-grave-danger/overview), [Gravestones](/docs/compat/gravestones/overview) and the [GraveStone Mod](/docs/compat/gravestone-mod/overview). With the first two, collecting the grave puts them back into this power.
