---
title: "Is Block (Item Condition Type)"
description: Passes when the item places a block.
navigation_title: "Is Block"
aliases: ["block", "shappoli:is_block", "shappoli:block"]
---

Passes when the stack is a block item, anything that places a block when you use it on a surface.

Type ID: `apoli:is_block` (aliases `apoli:block` and `shappoli:is_block`)

## Fields

This condition has no fields.

## Example

An origin that can't build, only mine:

```json
{
  "type": "apoli:prevent_block_place",
  "item_condition": {
    "type": "apoli:is_block"
  }
}
```

Or the opposite, where only items that aren't blocks count towards something:

```json
{
  "type": "apoli:is_block",
  "inverted": true
}
```
