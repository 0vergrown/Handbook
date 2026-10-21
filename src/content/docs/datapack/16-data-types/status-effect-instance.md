---
title: "Status Effect Instance (Data Type)"
description: "An object that describes a status effect with its duration, amplifier and display settings."
navigation_title: "Status Effect Instance"
---

An [Object](/docs/datapack/data-types/object) that describes a status effect with its duration, amplifier and display settings.

> [!TIP]
> To make the effect last forever, set `duration` to `-1`.

> [!NOTE]
> On 1.21.1, `id` and `ambient`, the names Apace and vanilla use, are accepted as aliases of `effect` and `is_ambient`, so data packs written for either load unchanged.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `effect` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The ID of the status effect. [Custom status effects](/docs/datapack/introduction/custom-status-effects) from a data pack work here too. `id` is accepted as an alias. |
| `duration` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | `100` | How long the effect lasts, in ticks. An expression is evaluated against the entity the effect is applied to, when it is applied. |
| `amplifier` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | `0` | The strength of the effect, where 0 is level I. It accepts an expression like `duration`. |
| `is_ambient` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Whether the effect's particles are less noticeable. `ambient` is accepted as an alias. |
| `show_particles` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether the effect shows particles on the entity. |
| `show_icon` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether the effect shows an icon on the HUD. |

## Examples

```json
"effect": {
    "effect": "minecraft:slowness",
    "amplifier": 1,
    "duration": -1
}
```

Slowness II that lasts forever.

```json
"effect": {
    "effect": "minecraft:levitation",
    "duration": 200,
    "is_ambient": true,
    "show_particles": true,
    "show_icon": false
}
```

Levitation I for 10 seconds, ambient and mostly hidden.

```json
"effects": [
    {
        "effect": "minecraft:slow_falling",
        "duration": 400,
        "is_ambient": false,
        "show_particles": false,
        "show_icon": true
    },
    {
        "effect": "minecraft:slowness",
        "duration": 400,
        "is_ambient": false,
        "show_particles": false,
        "show_icon": true
    }
]
```

An [Array](/docs/datapack/data-types/array) of effects, giving Slow Falling I and Slowness I for 20 seconds.

```json
"effect": {
    "effect": "minecraft:speed",
    "duration": "100 + health * 10",
    "amplifier": "clamp(my_pack:mana / 10, 0, 3)"
}
```

Speed whose duration grows with the target's current health and whose level comes from an [apoli:resource](/docs/datapack/powers/resource) value, capped at Speed IV.
