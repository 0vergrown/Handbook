---
title: "Punch (Bi-Entity Action Type)"
description: "Makes the actor hit the target as if it had attacked with its held item."
navigation_title: "Punch"
---

Makes the actor hit the target as if it had attacked it in melee with the item in its main hand. Unlike [`apoli:damage`](/docs/datapack/bientity-actions/damage), which deals a number you choose, this one runs the same attack the game would: the attack damage attribute, the held item's modifiers and enchantments, knockback, the sweep, sounds, and the enchantment effects that fire on hit.

Type ID: `apoli:punch`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`stack` | [Item Stack](/docs/datapack/data-types/item-stack) | _optional_ | Punch with this item instead of whatever is in the actor's main hand. The item is held for the duration of the attack only — its attribute modifiers and enchantments count, the actor's real inventory is untouched, and the item takes no durability damage from the swap itself.
`damage_type` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | Deal the punch's damage under this damage type instead of `minecraft:player_attack` / `minecraft:mob_attack`. Doing so takes the direct route — the amount is still the attack damage the item would have dealt, but the knockback, sweep and on-hit enchantment effects of a real attack are skipped.
`swing_hand` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether the actor visibly swings its main arm.
`ignore_cooldown` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Land the punch at full attack strength no matter where the actor's attack-strength cooldown currently sits.
`reset_cooldown` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether the punch resets the actor's attack-strength cooldown, the way a real swing does. Set to `false` to leave the actor's own melee timing untouched.

The actor must be a living entity. Players punch through the same path as a normal left-click, which means the attack-strength cooldown applies and is reset: a punch landed straight after another one hits for less, exactly as it would in the player's hands. Other living entities have no attack cooldown, so both cooldown fields only matter when the actor is a player.

> Both cooldown fields exist for area-of-effect punches. Running `apoli:punch` over several targets in one tick charges the cooldown on the first hit, so every target after it takes minimum damage. `"ignore_cooldown": true` gives each target the full hit; add `"reset_cooldown": false` when the burst should not eat the player's own next swing either.

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

A phantom second strike: every hit is followed by what a Fire Aspect II diamond sword would deal, burn included, without the player ever holding one. `swing_hand` is off here because the real hit already animated the arm.

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

Everything within five blocks is hit for a fully-charged swing of whatever the actor is holding, and the actor's own attack timing is left exactly where it was.

> `damage_type` is the escape hatch for "the same number, but not a melee hit" — useful when the damage should bypass armour through a damage type tag, or when a death message should read differently. Leave it out whenever you want a real punch.
