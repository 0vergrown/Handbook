---
title: "Water Breathing (Power Type)"
description: "Lets the entity breathe underwater, and optionally suffocate out of it."
navigation_title: "Water Breathing"
---

Lets the entity breathe underwater — its air bar refills while submerged instead of draining. Optionally reverses the rule entirely, so it suffocates whenever its eyes are **not** in water.

Type ID: `apoli:water_breathing`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`suffocate_outside_water` | Boolean | `false` | If `true`, the entity loses air and eventually takes drowning damage whenever its eyes are not in water — the aquatic-creature trade-off.

### How `suffocate_outside_water` behaves

The air bar runs backwards, at exactly vanilla's underwater rates:

- **Eyes in water** — air refills, 4 per tick, same as vanilla on land.
- **Out of water** — air drains 1 per tick and the entity takes 2 drowning damage each time it bottoms out, same as vanilla underwater. Respiration still slows the drain.
- **In rain** — the drain pauses, so a downpour keeps you going without refilling you.
- **Water Breathing or Conduit Power** — either effect stops the drain entirely, which is what makes a potion (or [apoli:gain_air](/docs/datapack/entity-actions/gain_air)) a usable stopgap on land.
- **Turtle helmet** — works the other way round. It keeps Water Breathing topped up at 10 seconds while the holder's head is underwater, and the timer runs down on land, so surfacing buys 10 seconds before the air starts to drain. A potion of Water Breathing still works normally on top of it.

An active **conduit** counts a `suffocate_outside_water` entity as being in the water, so it hands out Conduit Power to one standing dry on land anywhere in its range — vanilla only reaches players who are wet. Together with the bullet above, that turns a conduit into a base of operations: its range is 32 blocks for the smallest activating frame and 96 for a full one, and the holder can stay out of the water for as long as they stay inside it.

Air set by [apoli:gain_air](/docs/datapack/entity-actions/gain_air) is respected — it simply drains away again at 1 per tick.

> On 1.21 the `minecraft:aquatic` entity type tag does **not** grant underwater breathing; vanilla decides that per entity class. Adding that tag with [apoli:modify_type_tag](/docs/datapack/powers/modify_type_tag) changes what counts as an aquatic mob for *other* game rules, not whether you can breathe — use this power for breathing.

## Examples

```json
{
    "type": "apoli:water_breathing",
    "suffocate_outside_water": true
}
```

Breathes water and only water: the air bar refills while submerged and drains on land.
