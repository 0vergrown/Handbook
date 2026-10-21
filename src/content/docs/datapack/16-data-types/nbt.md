---
title: "NBT (Data Type)"
description: "A string or object holding named binary tag (NBT) data."
navigation_title: "NBT"
---

A [String](/docs/datapack/data-types/string) or [Object](/docs/datapack/data-types/object) holding named binary tag (NBT) data. It is made of key and value pairs, where the key is the name of the tag, separated by commas.

## Examples

```json
"nbt": "{example: {is_special: true, numbers: [100, 3, -56]}}"
```

This is an object NBT containing another object NBT named `example`. `example` holds two tags: `is_special`, a boolean that becomes a byte NBT (`1b`), and `numbers`, an integer array NBT.

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

The same example, written as a JSON object.
