---
title: "Keys, colours, and a rope to a ship"
description: "Apoli 1.54.0 puts alpha where you expect it in a hex colour, aims particles and anchors them to body parts, places and sizes overlays, puts Bedrock models on fired projectiles, gives radial-menu slices a vertical offset, lets a rope drag a Sable structure, and adds apoli:prevent_key_press."
date: 2026-08-30
author: Overgrown
---

A batch of five small things, one of which changes what a value you may already have written means.
That one is first.

## `#RRGGBBAA` — alpha moved to the end

`apoli:custom` takes a colour as a hex string, and an eight-digit one used to be read as
`#AARRGGBB`: alpha in the **first** pair, the way Java writes a packed ARGB int. That is not how
anybody writes a colour by hand. Every colour picker, every CSS file, every image editor puts alpha
last, so `"#FFFFFF00"` looks like transparent white and Apoli was reading it as a slightly-off
opaque cyan. The two digits people reach for to fade a particle out did nothing to its transparency
and quietly changed its blue channel instead.

So the `#` spelling now means what it looks like:

```json
"color":     "#FFC24B",
"end_color": "#FF3B1E00"
```

Six digits is still `#RRGGBB`, fully opaque. Eight digits is `#RRGGBBAA`.

The old order is still reachable, spelled the way Java spells it — a `0x` prefix keeps meaning
`0xAARRGGBB`, as does a bare packed integer:

```json
"color": "0x80FFFFFF"
```

If you wrote an eight-digit `#` colour before this, swap the first pair to the end. A six-digit
colour, a float list and a packed integer are all unchanged.

One thing worth knowing while you are in there: the vanilla particle shader throws away any pixel
under about 10% alpha, so a particle fading to `0` alpha vanishes slightly before the fade finishes.
Fading `end_size` to `0.0` at the same time covers it.

## Particles that aren't all the same colour

`lifetime_variation` and `size_variation` already existed to stop a burst looking like a stamp.
Colour now has the same treatment, in two flavours:

```json
{
  "type": "apoli:custom",
  "texture": "example:textures/particle/spark.png",
  "color": "#FFC24B",
  "end_color": "#FF3B1E00",
  "color_variation": 0.06,
  "hue_variation": 12.0
}
```

`color_variation` jitters each of red, green and blue by ±*n*; `hue_variation` rotates the whole
colour by ±*n* degrees. Both are rolled once per particle at spawn and applied to `color` and
`end_color` identically, so every particle still runs the same fade — just from its own shade. Small
values read as shimmer; `hue_variation: 180` scatters a burst across the whole wheel.

## Radial menus that aren't circles

A radial menu slice could move away from the centre and that was it, so every menu was a ring. Slices
now take `offset_x` and `offset_y` in screen pixels, and an `angle` that overrides the evenly-spaced
one:

```json
{
  "type": "apoli:radial_menu",
  "entries": [
    { "angle": 225, "distance": 60, "offset_y": -10, "item": {"id": "minecraft:blaze_powder"},
      "entity_action": {"type": "apoli:set_on_fire", "duration": 4} },
    { "angle": 270, "distance": 60, "offset_y": -24, "item": {"id": "minecraft:snowball"},
      "entity_action": {"type": "apoli:freeze", "amount": 140} },
    { "angle": 315, "distance": 60, "offset_y": -10, "item": {"id": "minecraft:feather"},
      "entity_action": {"type": "apoli:add_velocity", "y": 1.2, "space": "local"} }
  ]
}
```

That is an arc across the top of the screen. `angle` decides which spoke a slice sits on, `distance`
how far out along it, and the offsets move it anywhere afterwards — arcs, columns, crosses, a row
along the hotbar. The offsets ride the same bloom animation as `distance`, so a displaced slice still
flies out from the middle instead of snapping into place.

## `apoli:prevent_key_press`

A new power type that stops the holder's keys reaching the game. With no `keys` list that is
everything — no movement, no attacking, no items, no inventory, no ability keys — which is the stun
or paralysis effect people keep rebuilding out of a pile of attribute modifiers:

```json
{
  "type": "apoli:prevent_key_press",
  "condition": {
    "type": "apoli:resource",
    "resource": "example:stun_timer",
    "comparison": ">",
    "compare_to": 0
  }
}
```

With a list, only those keys go dead:

```json
{
  "type": "apoli:prevent_key_press",
  "keys": ["key.origins.primary_active", "key.origins.secondary_active"]
}
```

The block sits on the keybind itself, so it covers vanilla controls, data-driven keybinds from
`data/<namespace>/keybinds/`, every key-driven power type, and
[`apoli:key_pressed`](/docs/datapack/entity-conditions/key_pressed) — which reads a blocked key as
not held rather than sticking. The server refuses a blocked key too, so it is not a client-side
honour system.

Keys held by [`apoli:force_key_pressed`](/docs/datapack/entity-actions/force_key_pressed) are
deliberately **not** blocked by default: a paralysed player can still be puppeted, which is usually
the interesting version. Set `affect_forced: true` if you want prevention to win over forcing.
Escape is never blocked, so nobody gets trapped out of the pause menu.

## Ropes and Sable structures

[`apoli:rope_pull`](/docs/datapack/entity-actions/rope_pull) only knew how to shove entities, so a
rope tied to an assembled Sable structure had nothing to pull at the far end. Now `which: "other"`
puts an impulse into that structure's rigid body, at the block the rope is tied to — so a rope on
the bow swings a ship as well as dragging it.

```json
{
  "type": "apoli:rope_pull",
  "which": "both",
  "speed": 0.4,
  "sublevel_force": 2.0
}
```

`speed` is scaled by the structure's mass first, so it reads the same way it does on an entity:
roughly the velocity change you are asking for. A hundred-block ship needs a much bigger shove than a
pig, which is the point. `sublevel_force` multiplies that if a particular rope should be stronger.

Rope endpoints have anchored to sub-levels for a while; alongside this a hit that resolves further
away than the raycast's own `distance` is now discarded rather than anchored, so a structure that
answers a ray in a way Apoli cannot map back to the world gives you no rope rather than one stretched
across the map.

## Overlays you can place and size

`apoli:overlay` could only ever stretch a texture across the whole screen. It now takes `x`, `y`,
`width` and `height`, an `anchor` to measure them from, and `u`/`v` to pull one sprite out of a
sheet — so it is an HUD element as much as a tint:

```json
{
  "type": "apoli:overlay",
  "texture": "example:textures/gui/digits.png",
  "anchor": "bottom_center",
  "x": 0,
  "y": -40,
  "width": 8,
  "height": 16,
  "u": "resource('example:charges') * 8",
  "texture_width": 80,
  "texture_height": 16
}
```

All six of those are [Expressions](/docs/datapack/data-types/expression), which is what makes a
counter one power instead of ten.

A single power can also carry a list of overlays under `overlays`, each with its own `condition`, and
every one whose condition passes is drawn. That is the shape you want for status indicators:

```json
{
  "type": "apoli:overlay",
  "overlays": [
    { "texture": "example:textures/gui/erased.png",
      "condition": {"type": "apoli:power_active", "power": "example:erased"} },
    { "texture": "example:textures/gui/vignette.png", "draw_phase": "below_hud", "strength": 0.6 }
  ]
}
```

The flat single-overlay spelling still works exactly as it did.

## Bedrock models on fired projectiles

A projectile fired with `texture_location` is Apoli's own entity, so it can wear an
[`apoli:custom_model_render`](/docs/datapack/powers/custom_model_render) model the same way a minion
or a clone does — grant the power to the projectile from `projectile_action`:

```json
{
  "type": "apoli:fire_projectile",
  "texture_location": "example:textures/projectile/blank.png",
  "projectile_action": {
    "type": "apoli:grant_power",
    "power": "example:shuriken_model",
    "source": "example:shuriken"
  }
}
```

The model faces the direction of travel and its animations run for the projectile's whole flight.

## Particles that go where you point them

`apoli:particle` and `apoli:spawn_particles` spawned along the world axes, so `offset_z: 2` put the
particles two blocks due south instead of two blocks in front of the player, and there was no way to
give them a direction at all. Both now take a `space`, explicit `velocity_x`/`velocity_y`/`velocity_z`,
and a `speed` that accepts a vector as well as a number:

```json
{
  "type": "apoli:spawn_particles",
  "particle": {"type": "apoli:custom", "texture": "example:textures/particle/spark.png"},
  "count": 12,
  "space": "local",
  "offset_y": 1.4,
  "offset_z": 1.5,
  "velocity_z": 0.6
}
```

`space: "local"` turns both the offset and the velocity with the entity, so that is a cone of sparks
in front of the eyes, travelling the way they are looking.

They also take a `model_part`, using the same names
[`apoli:model_color`](/docs/datapack/powers/model_color) and
[`apoli:modify_model_parts`](/docs/datapack/powers/modify_model_parts) use — `head`, `body`,
`right_arm`, `left_arm`, `right_leg`, `left_leg` — so particles can come off a hand rather than out
of the ground at your feet. The anchor follows body rotation, entity size and the crouching pose; it
does not follow swing animations.

## Cannons need a muzzle

`apoli:fire_projectile` now takes `offset_x` / `offset_y` / `offset_z` and a `space` for where the
projectile appears, which matters a lot more now that it can wear a model:

```json
{
  "type": "apoli:fire_projectile",
  "texture_location": "example:textures/projectile/blank.png",
  "space": "local",
  "offset_y": -0.4,
  "offset_z": 1.6,
  "speed": 2.0,
  "projectile_action": { "type": "apoli:grant_power", "power": "example:cannonball_model", "source": "example:cannon" }
}
```

## A fix worth knowing about

`apoli:stacking_status_effect` treated `min_stacks` as a floor the stack count could never fall
below, in **both** directions. A power with `min_stacks: 2` therefore never dropped to zero when its
condition stopped holding, and re-applied its effects forever. `min_stacks` is now what it reads
like: the count the power jumps to while it is active. Inactive, stacks decay to zero and the effects
stop.

## Origins: the Controls list finally reads in order

Origins registers ten active-power keys, all named "Active Power (Primary)", "Active Power
(Secondary)" and so on. The Controls screen sorts a category alphabetically by the displayed name, so
what players actually saw was Denary, Nonary, Octonary, Primary, Quaternary, Quinary, Secondary,
Senary, Septenary, Ternary — the full list in an order nobody could use.

They are now called "1st Active Power (Primary)" through "10th Active Power (Denary)", which sorts
into the order they are meant to be read in.
