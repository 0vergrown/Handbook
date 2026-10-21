---
title: "Bi-entity Action Types"
description: "Bi-entity action types work on a pair of entities: an actor and a target."
---

Bi-entity action types work on a pair of entities, an actor and a target. The power or action that runs them decides which entity is which, and [`apoli:invert`](/docs/datapack/bientity-actions/invert) swaps the two. They can go in any power or action type that has a `bientity_action` field.

As a rule of thumb, the actor is the entity that triggers the action, for example by using or attacking another entity, and the target is the entity on the receiving end, the one being used or attacked.

Every bi-entity action type is listed in this section.

## Meta types

- [apoli:actor_action](/docs/datapack/bientity-actions/actor_action)
- [apoli:invert](/docs/datapack/bientity-actions/invert)
- [apoli:target_action](/docs/datapack/bientity-actions/target_action)

## From Origins

These need the Origins mod installed and are documented in the [Origins](/docs/datapack/origins/overview) section:

- [origins:copy_origin](/docs/datapack/origins/copy_origin)
- [origins:store_origin](/docs/datapack/origins/store_origin_bientity)
- [origins:transfer_origin](/docs/datapack/origins/transfer_origin)
