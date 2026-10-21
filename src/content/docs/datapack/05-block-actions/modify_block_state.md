---
title: "Modify Block State (Block Action Type)"
description: "Changes one block state property of the block."
navigation_title: "Modify Block State"
---

Changes one block state property of the block. Each kind of property takes a different field: boolean properties use `value`, enum properties use `enum`, and integer properties use `operation` and `change`.

Type ID: `apoli:modify_block_state`

> [!NOTE]
> If none of the fields the property expects are set, the action does nothing.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `property` | [String](/docs/datapack/data-types/string) | _required_ | The name of the property to change, such as `facing` or `age`. |
| `operation` | [String](/docs/datapack/data-types/string) | `"add"` | How `change` is applied to an integer property: `"add"` or `"set"`. |
| `change` | [Integer](/docs/datapack/data-types/integer) | _optional_ | For an integer property, the value to add, subtract or set. |
| `value` | [Boolean](/docs/datapack/data-types/boolean) | _optional_ | For a boolean property, the new value. |
| `enum` | [String](/docs/datapack/data-types/string) | _optional_ | For an enum property, the new value. |
| `cycle` | [Boolean](/docs/datapack/data-types/boolean) | `false` | With `true`, moves the property to its next value in the cycle and ignores the other optional fields. It works on every kind of property. |

## Examples

```json
"block_action": {
	"type": "apoli:modify_block_state",
	"property": "facing",
	"cycle": true
}
```

This cycles through the values of the `facing` property, if the block has one.
