---
title: "Invisible means the backpack too, and errors that point at the line"
description: "Apoli 1.128.0 and Origins 1.52.0: invisibility hides accessories and modded layers, a new equipped_accessory condition, accessory slots in equipped_item, and load errors with the file, line and path."
date: 2026-11-07
author: Overgrown
---

This is Apoli 1.128.0 and Origins 1.52.0, on Fabric 1.20.1, Fabric 1.21.1 and NeoForge 1.21.1. Origins 1.52.0 needs Apoli 1.128.0, and the network format hasn't changed. Most of it is accessory support, plus a long overdue pass over what the log tells you when a data pack is broken.

## Invisible players with goggles on

Someone sent me a screenshot of an invisible player: no body, no armor, but a backpack floating at chest height and a pair of Create goggles hovering where the face should be. The goggles were in a Curios slot. The backpack was in the vanilla chestplate slot, drawn by the backpack mod itself.

[`apoli:invisibility`](/docs/datapack/powers/invisibility) with `render_armor: false` only ever hid the vanilla armor layer, which is what Apace's version did too. Everything else a mod draws on the body slipped past it. It now hides every layer on top of the body: elytra, capes, a head on the helmet slot, whatever sits in Trinkets, Accessories or Curios slots, and anything another mod draws there. Held items still follow `render_held_items`, and layers from Apoli's own powers, like a custom model, still draw, so a pack that swaps the body for a model keeps working.

`render_armor: false` is the default, so most invisibility powers out there get this without touching a file. If you want the accessories back, set `render_armor` to `true` and they show along with the armor.

## Checking for a specific accessory

You could count accessories, react when one changed and move them around, but there was no plain way to ask "is my charm equipped?". That's probably the most common thing anyone wants from accessory support, so there are now two ways to ask it.

The new [`apoli:equipped_accessory`](/docs/compat/accessories/equipped_accessory) condition passes when a worn accessory matches an item condition, in any slot or the slots you list:

```json
{
  "type": "apoli:action_over_time",
  "interval": 20,
  "condition": {
    "type": "apoli:equipped_accessory",
    "slots": "charm",
    "item_condition": {
      "type": "apoli:ingredient",
      "ingredient": {
        "item": "example:moon_charm"
      }
    }
  },
  "entity_action": {
    "type": "apoli:apply_effect",
    "effect": {
      "effect": "minecraft:night_vision",
      "duration": 300,
      "show_particles": false
    }
  }
}
```

Like the other accessory types, it only exists when an accessory mod is installed. If your pack has to load without one, [`apoli:equipped_item`](/docs/datapack/entity-conditions/equipped_item) takes an `accessory_slot` field now, next to `equipment_slot`. `"accessory_slot": "*"` means any accessory slot, and with both fields set the condition passes when either one matches, which is handy for goggles you can wear as a helmet or as an accessory. `equipment_slot` isn't required anymore, but you need at least one of the two.

[`apoli:accessory_equipped_count`](/docs/compat/accessories/accessory_equipped_count) also takes an `item_condition`, so "wearing two or more lucky charms" is one condition.

Two smaller fixes came out of reading the accessory mods' source. With the Accessories compatibility layer installed next to real Curios on NeoForge (or Trinkets on Fabric), Apoli read the same items through both, so counts came out doubled and `action_on_accessory_change` fired twice. It reads them once now, through Accessories. And all of these checks scan the slots without building lists, since they tend to end up in `action_over_time` on every player.

## Errors that tell you where

This is the part I've wanted for a while. A broken power used to log something like this:

```txt
Failed to parse power example:blast: Unknown entity_action type: apoli:explod
```

That's fine for a five-line file. In a 200-line power with nested `and` actions it leaves you searching. Now you get the file, the pack, the path into the JSON, the line and column, and the line itself with a caret under the broken value:

```txt
[Apoli] Couldn't load power example:blast from data/example/powers/blast.json (pack file/example)
  at $.entity_action.actions[1].type, line 8, column 17
    8 |       { "type": "apoli:explod", "power": 3 }
      |                 ^
  - Unknown entity_action type: apoli:explod
```

Syntax errors already had a line and column; they use the same layout now. The new part is the errors that come after parsing, from a type that doesn't know a field or a value of the wrong kind, which Minecraft's codec system reports with no position at all. When a power fails, Apoli runs it through the codec a second time while recording which JSON value each step was looking at, and matches that against the error. Only failing files pay for that, so a pack that loads cleanly loads exactly as fast as before.

Warnings got the same treatment. When an optional field is wrong, Apoli drops it and loads the rest, and the warning now points at that field. The messages are shorter, too: no more `MapLike[{...}]` dumps of the whole object, and no more three nested "field X failed to parse" sentences before the actual reason.

Origins, layers, badges, skill trees, keybinds, global power sets and custom status effects all report this way. Once everything has loaded, one line counts the errors and warnings by kind, and if you have [`/apoli:dev_mode`](/docs/datapack/commands/dev-mode) on, the same list shows up in chat after every `/reload`. Hover a line for the full report and click it to copy the file path. [File formats](/docs/datapack/introduction/file-formats#when-a-file-parses-but-doesnt-load) has more examples.
