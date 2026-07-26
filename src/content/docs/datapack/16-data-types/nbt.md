---
title: "NBT"
description: "A String or Object that defines a named binary tag (NBT) for storing arbitrary data."
---

A [String](/docs/datapack/data-types/string) or [Object](/docs/datapack/data-types/object) that defines a named binary tag (NBT) for storing arbitrary data. It consists of key-value pairs (the key being the name of the tag) separated by a comma.

## Examples

```json
"nbt": "{example: {is_special: true, numbers: [100, 3, -56]}}"
```

This example defines an object NBT that contains an object NBT named `example`. The `example` object NBT then contains two NBTs: `is_special`, which is a boolean that will be converted into a byte NBT (`1b`), and `numbers`, which is an integer array NBT.

```json
"nbt": {
    "example": {
        "is_special": true,
        "numbers": [
            100,
            3,
            -56
        ]
    }
}
```
This is the same example as above, but formatted as an actual object.
