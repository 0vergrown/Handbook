---
title: "Block State (Block Condition Type)"
description: "Checks a block state property of the block, such as facing or age."
navigation_title: "Block State"
---

Checks a block state property of the block, such as `facing` or `age`.

Type ID: `apoli:block_state`

> [!NOTE]
> If none of the value fields are set, the condition only checks that the block has the property.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `property` | [String](/docs/datapack/data-types/string) | _required_ | The name of the property to check, such as `facing` or `age`. |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | _optional_ | For an integer property, how its value is compared with `compare_to`. Only used when the property is an integer. |
| `compare_to` | [Integer](/docs/datapack/data-types/integer) | _optional_ | For an integer property, the number its value is compared with. Only used when the property is an integer. |
| `value` | [Boolean](/docs/datapack/data-types/boolean) | _optional_ | For a boolean property, the value it must have. Only used when the property is a boolean. |
| `enum` | [String](/docs/datapack/data-types/string) | _optional_ | For an enum property, the value it must have. Only used when the property is an enum. |

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

This checks whether a chest is facing north.

```json
"block_condition": {
	"type": "apoli:block_state",
	"property": "age"
}
```

This checks whether the block has the `age` property.
