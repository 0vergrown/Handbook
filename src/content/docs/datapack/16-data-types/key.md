---
title: "Key"
description: "An Object which defines a keybinding, used in active powers to define which key they react to."
---

An [Object](/docs/datapack/data-types/object) which defines a keybinding, used in active powers to define which key they react to.

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`key` | [String](/docs/datapack/data-types/string) | | A string specifying the keybinding.
`continuous` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Determines how the keybinding behaves when the key is held down. If set to `false`, the power will activate only once when the key is first pressed. If set to `true`, the power will try to activate continuously as long as the key is held down, accounting for any cooldown or conditions the power may have.


## Examples

```json
"key": {
    "key": "key.apoli.secondary_active"
}
```

This key will trigger each time the secondary active power key of Origins (by default unbound) is pressed.

```json
"key": {
    "key": "key.attack",
    "continuous": true
}
```

This key will trigger each tick while the Minecraft attack key (default: left mouse button) is held.
