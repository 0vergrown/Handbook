---
title: "Punch (Bi-Entity Action Type)"
description: "Makes the actor hit the target as if it had attacked with its held item."
navigation_title: "Punch"
---

Makes the actor hit the target as if it had attacked it in melee with the item in its main hand, or its off hand with `hand`. [`apoli:damage`](/docs/datapack/bientity-actions/damage) deals a number you choose, while this action runs the same attack the game would: the attack damage attribute, the held item's modifiers and enchantments, knockback, the sweep, sounds and the enchantment effects that fire on hit.

Type ID: `apoli:punch`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `hand` | [Hand](/docs/datapack/data-types/hand) | `"main_hand"` | Which hand the punch is thrown with. With `"off_hand"` the attack uses the offhand item's damage, attribute modifiers and enchantments, and the offhand item takes any durability cost. The actor's hands are exactly as they were afterwards. |
| `stack` | [Item Stack](/docs/datapack/data-types/item-stack) | _optional_ | Punches with this item instead of whatever is in the actor's `hand`. The item is only held for the attack: its attribute modifiers and enchantments count, the actor's real inventory is untouched, and the item takes no durability damage from the swap itself. |
| `damage_type` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | Deals the punch's damage under this damage type instead of `minecraft:player_attack` or `minecraft:mob_attack`. That takes the direct route: the amount is still the attack damage the item would have dealt, but the knockback, sweep and on-hit enchantment effects of a real attack are skipped. |
| `swing_hand` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether the actor visibly swings the arm of `hand`. |
| `ignore_cooldown` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Lands the punch at full attack strength wherever the actor's attack strength cooldown is. |
| `reset_cooldown` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether the punch resets the actor's attack strength cooldown, the way a real swing does. Set it to `false` to leave the actor's own melee timing alone. |

The actor must be a living entity. Players punch through the same path as a normal left-click, so the attack strength cooldown applies and is reset, and a punch landed straight after another one hits for less, exactly as it would in the player's hands. Other living entities have no attack cooldown, so both cooldown fields only matter when the actor is a player.

An actor with no attack damage attribute at all, such as a ghast, a pig or an armor stand, punches for that attribute's default of `2`, plus the attack damage modifiers and enchantments of the item it punches with. It always takes the direct route described under `damage_type`, with no knockback, sweep or on-hit enchantment effects.

> [!TIP]
> Both cooldown fields are there for punches over an area. Running `apoli:punch` on several targets in one tick charges the cooldown on the first hit, so every target after it takes minimum damage. `"ignore_cooldown": true` gives each target the full hit, and adding `"reset_cooldown": false` keeps the burst from eating the player's own next swing too.

## Examples

```json
"bientity_action": {
    "type": "apoli:punch"
}
```

The actor hits the target with whatever it is holding, for exactly what a normal melee hit would do.

```json
"bientity_action": {
    "type": "apoli:punch",
    "stack": {
        "item": "minecraft:netherite_axe"
    }
}
```

The actor hits as though it were swinging a netherite axe, whether or not it owns one.

```json
"bientity_action": {
    "type": "apoli:punch",
    "hand": "off_hand"
}
```

The actor strikes with whatever is in its off hand and swings its off arm. A sword there hits for sword damage, enchantments included, even though a normal attack only ever uses the main hand.

```json
{
    "type": "apoli:action_on_hit",
    "bientity_action": {
        "type": "apoli:punch",
        "swing_hand": false,
        "stack": {
            "item": "minecraft:diamond_sword",
            "components": {
                "minecraft:enchantments": {
                    "levels": {"minecraft:fire_aspect": 2}
                }
            }
        }
    }
}
```

A phantom second strike: every hit is followed by what a Fire Aspect II diamond sword would deal, burn included, without the player ever holding one. `swing_hand` is off because the real hit already animated the arm.

```json
{
    "type": "apoli:area_of_effect",
    "radius": 5,
    "bientity_action": {
        "type": "apoli:punch",
        "ignore_cooldown": true,
        "reset_cooldown": false,
        "swing_hand": false
    }
}
```

Everything within five blocks is hit for a fully charged swing of whatever the actor is holding, and the actor's own attack timing stays exactly where it was.

> [!TIP]
> Use `damage_type` when you want the same number but not a melee hit, for example when the damage should bypass armour through a damage type tag or the death message should read differently. Leave it out whenever you want a real punch.
