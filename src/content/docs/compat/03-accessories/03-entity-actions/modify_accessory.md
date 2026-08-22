---
title: "Modify Accessory (Entity Action Type)"
description: Acts on the accessories the entity is wearing.
navigation_title: "Modify Accessory"
aliases: ["modify_trinket"]
---

Runs an action on the accessories the entity currently has equipped, optionally filtering which ones and how many.

Type ID: `apoli:modify_accessory` (alias `apoli:modify_trinket`)

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`slots` | array of [String](/docs/datapack/data-types/string) or objects | `[]` | Which accessory slots to look at. A string is `slot`, `group/slot`, or `group/slot/index` — for example `"ring"`, `"hand/ring"`, `"hand/ring/0"`. An empty list means every slot.
`item_condition` | [Item Condition](/docs/datapack/item-conditions) | _optional_ | Only act on accessories matching this.
`item_action` | [Item Action](/docs/datapack/item-actions) | _optional_ | Runs on each matching accessory.
`entity_action` | [Entity Action](/docs/datapack/entity-actions) | _optional_ | Runs on the wearer, once, if anything matched.
`limit` | [Integer](/docs/datapack/data-types/integer) | `0` | Stop after this many matches. `0` means no limit.
`unequip` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Remove each matching accessory after acting on it.

## Examples

Damage every equipped accessory by one point:

```json
{
  "type": "apoli:modify_accessory",
  "item_action": { "type": "apoli:damage", "amount": 1 }
}
```

Strip one iron accessory and tell the wearer, which is the shape a "disarm" ability wants:

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

> Needs an accessory mod — [Trinkets](https://modrinth.com/mod/trinkets), [Accessories](https://modrinth.com/mod/accessories) or Curios, depending on your loader. These types do not exist without one, so a pack using them must depend on it.
