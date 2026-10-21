---
title: "Modify Accessory (Entity Action Type)"
description: "Acts on the accessories the entity is wearing."
navigation_title: "Modify Accessory"
aliases: ["modify_trinket"]
---

Runs an action on the accessories the entity currently has equipped, optionally filtering which ones and how many.

Type ID: `apoli:modify_accessory` (alias `apoli:modify_trinket`)

> [!NOTE]
> This type only exists when an accessory mod is installed: [Trinkets](https://modrinth.com/mod/trinkets), [Accessories](https://modrinth.com/mod/accessories) or Curios, depending on your loader. A pack that uses it must depend on one.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `slots` | [Array](/docs/datapack/data-types/array) of [slots](/docs/compat/accessories/overview#slots) | `[]` | The accessory slots to look in. A string is `slot`, `group/slot` or `group/slot/index`, such as `"ring"`, `"hand/ring"` or `"hand/ring/0"`. An empty list means every slot. |
| `item_condition` | [Item Condition Type](/docs/datapack/item-conditions) | _optional_ | Only acts on accessories that pass it. |
| `item_action` | [Item Action Type](/docs/datapack/item-actions) | _optional_ | Runs on each matching accessory. |
| `entity_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Runs once on the wearer, if anything matched. |
| `limit` | [Integer](/docs/datapack/data-types/integer) | `0` | Stops after this many matches. `0` means no limit. |
| `unequip` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Removes each matching accessory after acting on it. |

## Examples

```json
{
  "type": "apoli:modify_accessory",
  "item_action": { "type": "apoli:damage", "amount": 1 }
}
```

This damages every equipped accessory by one point.

```json
{
  "type": "apoli:modify_accessory",
  "limit": 1,
  "unequip": true,
  "item_condition": {
    "type": "apoli:ingredient",
    "ingredient": { "tag": "c:ingots/iron" }
  },
  "entity_action": {
    "type": "apoli:text",
    "text": { "translate": "mypack.accessory.stripped" }
  }
}
```

This takes off one iron accessory and tells the wearer, which is the shape a disarming ability needs.
