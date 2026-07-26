---
title: "Bi-entity Action Types"
description: "Bi-entity Action Types operate on a Pair<Entity, Entity>; in simpler terms: an actor and a target."
---

Bi-entity Action Types operate on a `Pair<Entity, Entity>`; in simpler terms: an actor and a target. The actor and target are determined by the used power type, and can be swapped using `invert`. These are available to power/action types that provide a `bientity_action` object field.

As a rule of thumb, the actor is usually the entity that "triggers" the action (e.g. uses or attacks another entity), while the target is the entity that is being targeted (e.g. the entity that is being used or attacked).

## List

- [apoli:add_to_entity_set](/docs/datapack/bientity-actions/add_to_entity_set)
- [apoli:add_velocity](/docs/datapack/bientity-actions/add_velocity)
- [origins:copy_origin](/docs/datapack/bientity-actions/copy_origin)
- [apoli:mount](/docs/datapack/bientity-actions/mount)
- [apoli:remove_from_entity_set](/docs/datapack/bientity-actions/remove_from_entity_set)
- [apoli:tame](/docs/datapack/bientity-actions/tame)
- [apoli:transfer](/docs/datapack/bientity-actions/transfer)
- [origins:transfer_origin](/docs/datapack/bientity-actions/transfer_origin)

## Meta Types

- [apoli:actor_action](/docs/datapack/bientity-actions/actor_action)
- [apoli:invert](/docs/datapack/bientity-actions/invert)
- [apoli:target_action](/docs/datapack/bientity-actions/target_action)

