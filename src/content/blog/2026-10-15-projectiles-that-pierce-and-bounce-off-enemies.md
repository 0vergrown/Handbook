---
title: "Projectiles that pierce, bounce off enemies and wait to turn back"
description: "Apoli 1.117.0 and Origins 1.47.10: fire_projectile can pass through the entities it hits, ricochet off them as well as off walls, and hold a returning projectile out until a condition lets it go. Summons placed by their own bientity_action now appear in place."
date: 2026-10-15
author: Overgrown
---

Apoli **1.117.0** and Origins **1.47.10**, on Fabric 1.20.1, Fabric 1.21.1 and NeoForge 1.21.1. Origins only moves up to build against the new Apoli; update both sides together.

All three additions are fields on [`apoli:fire_projectile`](/docs/datapack/powers/fire_projectile), as a power and as an [entity action](/docs/datapack/entity-actions/fire_projectile). Together they are enough for a proper boomerang: one that cuts through a crowd, comes back through it, and stays out for as long as you hold the key.

## Passing through

`pierce` lets a projectile fly on through the entities it hits. Each one takes the hit actions once, and can be hit again only after the projectile bounces off a block or turns back — so a returning shot cuts through the same crowd on its way home. `-1` passes through everything, a positive number through that many. See [Passing through](/docs/datapack/powers/fire_projectile#passing-through).

## Bouncing off enemies

The [`reflective`](/docs/datapack/data-types/projectile-reflection) object has a new `entities` field. With it, a projectile glances off the side of the hitbox it struck, after the hit actions have run, and bounces off walls and enemies alike until `max_bounces` is spent. It cannot hit the enemy it just bounced off again straight away, so paired with `homing` it ricochets from one target to the next. See [Bouncing off enemies](/docs/datapack/powers/fire_projectile#bouncing-off-enemies).

## Holding a projectile out

[`return`](/docs/datapack/data-types/projectile-return) takes a `condition`, a bi-entity condition with the owner as the actor and the projectile as the target. A turn that `after` or `max_distance` calls for waits until it passes, so "keep the boomerang out while the key is held" is one field instead of a hand-written return. A hit that turns the projectile around is never held back, and `lifetime` still ends a shot that is held out too long.

## Summons appear where they are put

A minion or clone that its `bientity_action` moves — a wall raised in front of you, a trap placed under an enemy — used to show up at its summoner's feet for a few ticks before sliding to its spot. Players watching now see it appear in place. Nothing changes for summons that stay where they were spawned.
