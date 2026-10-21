---
title: "Modifiers that carry over, ingredients that read components, and skills that pay out"
description: "Apoli 1.118.1 and Origins 1.47.11: attribute_modify_transfer returns and the Avian's Like Air uses it, ingredients read Fabric and NeoForge custom ingredients on both loaders, and skills can cost points from other trees, keep costs secret, give rewards and start their own branches."
date: 2026-10-20
author: Overgrown
---

This is Apoli 1.118.1 and Origins 1.47.11, on Fabric 1.20.1, Fabric 1.21.1 and NeoForge 1.21.1. The skill tree screen receives more information than before, so update the client, the server and Origins together.

## Like Air does what it says

[`apoli:attribute_modify_transfer`](/docs/datapack/powers/attribute_modify_transfer) takes the modifiers on one of the entity's attributes and applies them to a value another power type changes. The Avian's Like Air now uses it, so every bonus to walking speed (Speed, sprinting, Tailwind) also counts while airborne, as its description says.

```json
{
  "type": "apoli:attribute_modify_transfer",
  "class": "modify_air_speed",
  "attribute": "minecraft:generic.movement_speed",
  "multiplier": 1
}
```

Fifteen classes can receive modifiers, from air and swim speed to healing, damage dealt and taken, and status effect durations, and the page lists them all. The attribute's modifiers are summed once whenever they change and kept with the attribute, so a transfer costs about as much per tick as one more modifier.

## Item conditions that read components

On 1.21.1, `apoli:nbt` only sees an item's custom data, so there was no item condition for a potion's contents or a loaded crossbow. [Ingredients](/docs/datapack/data-types/ingredient#custom-ingredients) now take custom ingredients, and through [`apoli:ingredient`](/docs/datapack/item-conditions/ingredient) every item condition can use them:

```json
{
  "type": "apoli:ingredient",
  "ingredient": {
    "fabric:type": "fabric:components",
    "base": "minecraft:potion",
    "components": {
      "minecraft:potion_contents": { "potion": "minecraft:swiftness" }
    }
  }
}
```

The Fabric types (`fabric:components`, `fabric:custom_data`, `fabric:any`, `fabric:all` and `fabric:difference`) and the NeoForge ones (`neoforge:components`, `neoforge:compound`, `neoforge:intersection` and `neoforge:difference`) work on both loaders, so one data pack serves both. Custom ingredient types from other mods work on their own loader. On 1.20.1, `fabric:nbt` checks an item's NBT. Custom data compares numbers by value, so `{"golden_egg": true}` matches `{golden_egg:1b}`.

## Skills that cost more and give back

There are four additions to [skill data](/docs/datapack/skill-tree/skill-tree-power-data):

- A cost can spend any tree's points: `"cost": {"points": 3, "skill_tree": "example:mana"}`, or a list of entries for several trees at once. A tree that's never shown makes a handy shared currency.
- Any point entry or item, or the whole cost, can be `hidden`. The hover card shows `???` in its place, and says "You can't pay for this yet" without giving the secret away.
- `reward` gives points (to any tree) and items when the skill is bought, and the card lists them along with the names of the powers a skill grants. Rewards can be hidden too, and a skill with a reward and no power can be bought.
- `placement: [x, y]` draws a skill at a spot of your choosing as the start of its own branch, with no line to its parent. Its children grow out of it as usual.

Refunds now give back exactly what was paid, and they take the rewards back. If the player has already spent the reward points or lost the items, the refund waits until they have them again, and the hover card explains why. The admin `unbuy` command and resets take back whatever is still there.

## Smaller things

- Skill tree tabs, and sibling skills with the same `order`, sort by ID, instead of changing order between server starts.
- An ingredient object with both `item` and `tag` uses `item`, as documented.
- A broken ingredient now reports what's wrong with it on 1.20.1, instead of `Not a json array`.
