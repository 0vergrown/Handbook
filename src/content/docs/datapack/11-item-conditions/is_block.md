---
title: "Is Block (Item Condition Type)"
description: Passes when the item places a block.
navigation_title: "Is Block"
aliases: ["block", "shappoli:is_block", "shappoli:block"]
---

Passes when the stack is a block item — anything that would place a block when you use it on a surface.

Type ID: `apoli:is_block` (aliases `apoli:block`, `shappoli:is_block`)

## Fields

This type has no fields.

## Example

An origin that cannot build, only mine:

```json
{
  "type": "apoli:prevent_block_place",
  "item_condition": {
    "type": "apoli:is_block"
  }
}
```

Or the opposite of a check you already have — only non-block items count towards something:

```json
{
  "type": "apoli:is_block",
  "inverted": true
}
```
