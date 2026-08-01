---
title: "Set Iteration (Data Type)"
description: "A String used to determine which side of an entity set is walked."
navigation_title: "Set Iteration"
---

A [String](/docs/datapack/data-types/string) used by [apoli:action_on_entity_set](/docs/datapack/entity-actions/action_on_entity_set) to decide which side of an [apoli:entity_set](/docs/datapack/powers/entity_set) to walk.

##	Values

  Value      |  Description
-------------|------------------------------------------------------------------
  `members`  |  Walk the set the acting entity owns. The actor is the acting entity, and each target is one member of its set. The acting entity must hold the `set` power, otherwise nothing happens.
  `owners`   |  Walk the sets the acting entity is *in*. One iteration per entity whose `set` power currently contains the acting entity; the actor is that owner and the target is the acting entity. The acting entity does **not** need to hold the `set` power.

> The roles swap between the two values. That is the point of `owners`: bi-entity actions like [apoli:remove_from_entity_set](/docs/datapack/bientity-actions/remove_from_entity_set) act on the actor's set, so the owner has to be the actor for a member to be able to leave a set it does not own.
