---
title: "apoli:block_state"
description: "Checks a block state property of the block."
---

Checks a block state property of the block.

Type ID: `apoli:block_state`

> If none of the expected fields are specified, this condition will just check if the block has the specified property.

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`property` | [String](/docs/datapack/data-types/string) | | The name of the property that will be checked. Examples are `facing` or `age`.
`comparison` | [Comparison](/docs/datapack/data-types/comparison) | _optional_ | If specified and if the property uses an integer, determines how the integer value of the specified property should be compared to the specified value. **Only used if the specified property has an integer value.**
`compare_to` | [Integer](/docs/datapack/data-types/integer) | _optional_ | If specified, the integer at which the integer value of the specified property will be compared to. **Only used if the specified property has an integer value.**
`value` | [Boolean](/docs/datapack/data-types/boolean) | _optional_ | If specified, the boolean to compare to the boolean value of the specified property. **Only used if the specified property has a boolean value.**
`enum` | [String](/docs/datapack/data-types/string) | _optional_ | If specified, the string at which the string value of the specified property will be compared to. **Only used if the specified property has a string value.**


## Examples

```json
"block_condition": {
    "type": "apoli:and",
    "conditions": [
        {
            "type": "apoli:block",
            "block": "minecraft:chest"
        },
        {
            "type": "apoli:block_state",
            "property": "facing",
            "enum": "north"
        }
    ]
}
```

This example will check if a Chest block is facing north.

```json
"block_condition": {
	"type": "apoli:block_state",
	"property": "age"
}
```

This example will check if the specified block has the `age` Block State property.

