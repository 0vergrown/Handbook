---
title: "origins:modify_exhaustion"
description: "[Power Type](../powertypes.md)"
---

Power Type

Modifies the amount of exhaustion the player receives each time they receive exhaustion.

Type ID: `origins:modify_exhaustion`


## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`modifier` | Attribute Modifier | _optional_ | If specified, this modifier will be applied to the received exhaustion amount.
`modifiers` | Array of Attribute Modifiers | _optional_ | If specified, these modifiers will be applied to the received exhaustion amount.



## Examples

```json
{
    "type": "origins:modify_exhaustion",
    "modifier": {
        "name": "Increased exhaustion",
        "operation": "multiply_base",
        "value": 2.0
    }
}
```

This example triples the exhaustion rate of the player.

