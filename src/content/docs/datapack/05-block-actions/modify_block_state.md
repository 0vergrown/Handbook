---
title: "Modify Block State (Block Action Type)"
description: "Modifies the block state property of the block."
navigation_title: "Modify Block State"
---

Modifies the block state property of the block. Depending on the property type, different values are expected: boolean properties use `value`, enumeration properties use `enum`, and integer properties use `operation` and `change`.

Type ID: `apoli:modify_block_state`

> If none of the expected fields are specified, this action will do nothing.

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`property` | String | | The name of the property that will be modified. Examples are `facing` or `age`.
`operation` | String | `"add"` | Determines how the value specified in the `change` field is operated on the specified property. Accepts `"add"` or `"set"`.
`change` | Integer | _optional_ | If specified, the value to add, remove or set to/from the specified property if the specified property is an integer.
`value` | Boolean | _optional_ | If specified, the boolean to use as the new value for the specified property if the specified property is a boolean.
`enum` | String | _optional_ | If specified, the string to use as the new value for the specified property if the specified property is a string.
`cycle` | Boolean | `false` | If set to true, changes the property to the next state in the cycle, ignoring all other optional fields. All property types can use this operation.

## Examples

```json
"block_action": {
	"type": "apoli:modify_block_state",
	"property": "facing",
	"cycle": true
}
```

This example will cycle through the values of the `facing` property if available.
