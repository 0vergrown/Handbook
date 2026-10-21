---
title: "Water Breathing (Power Type)"
description: "Lets the entity breathe underwater, and optionally makes it suffocate out of water."
navigation_title: "Water Breathing"
---

Lets the entity breathe underwater: its air bar refills while it is submerged instead of draining. It can also reverse the rule, so the entity suffocates whenever its eyes are out of water.

Type ID: `apoli:water_breathing`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `suffocate_outside_water` | [Boolean](/docs/datapack/data-types/boolean) | `false` | If `true`, the entity loses air, and eventually takes drowning damage, whenever its eyes are out of water. This is the trade-off for an aquatic creature. |

### How `suffocate_outside_water` behaves

The air bar runs backwards, at vanilla's underwater rates:

- With its eyes in water, the entity regains air at 4 per tick, as vanilla does on land.
- Out of water, air drains at 1 per tick and the entity takes 2 drowning damage each time the bar runs out, as vanilla does underwater. Respiration still slows the drain.
- In rain the drain pauses, so a downpour keeps the entity going without refilling its air.
- Water Breathing or Conduit Power stops the drain completely, so a potion (or [apoli:gain_air](/docs/datapack/entity-actions/gain_air)) works as a stopgap on land.
- A turtle helmet works the other way round. It keeps Water Breathing topped up at 10 seconds while the entity's head is underwater, and the timer runs down on land, so surfacing gives 10 seconds before the air starts to drain. A potion of Water Breathing still works on top of it.

An active conduit counts a `suffocate_outside_water` entity as being in water, so it gives Conduit Power to one standing on dry land anywhere in its range, while vanilla only reaches players who are wet. With the point above, that makes a conduit a base camp: its range is 32 blocks with the smallest frame that activates it and 96 with a full one, and the entity can stay out of the water for as long as it stays in range.

Air set by [apoli:gain_air](/docs/datapack/entity-actions/gain_air) is respected, and then drains away again at 1 per tick.

> [!NOTE]
> On 1.21 the `minecraft:aquatic` entity type tag doesn't let an entity breathe underwater. Vanilla decides that for each entity class. Adding the tag with [apoli:modify_type_tag](/docs/datapack/powers/modify_type_tag) changes what counts as an aquatic mob for other game rules, so use this power for breathing.

## Examples

```json
{
    "type": "apoli:water_breathing",
    "suffocate_outside_water": true
}
```

The entity breathes water and only water: its air refills while submerged and drains on land.
