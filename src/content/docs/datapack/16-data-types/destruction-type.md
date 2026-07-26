---
title: "Destruction Type"
description: "A String used to determine the effect of an explosion to the terrain."
---

A [String](/docs/datapack/data-types/string) used to determine the effect of an explosion to the terrain.

##	Values

  Value      |  Description                                                     
-------------|------------------------------------------------------------------
  `break`    |  The explosion will destroy blocks and drop the loot of said blocks.  
  `none`     |  The explosion will **not** destroy blocks nor drop the loot of said blocks.  
  `destroy`  |  The explosion will destroy blocks and drop the loot of *some* of the said blocks. It has lower chance with higher explosion power; it also checks the `minecraft:survives_explosion` loot condition in loot tables.
