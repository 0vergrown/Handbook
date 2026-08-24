---
title: "Owner (Entity Condition Type)"
description: Checks the entity that owns this one — a minion's summoner, a tamed pet's owner, a projectile's shooter.
navigation_title: "Owner"
---

Checks the entity that owns this one. Passes only if there **is** an owner, and — when `bientity_condition` is given — if the pair fulfils it, with this entity as the actor and the owner as the target.

Type ID: `apoli:owner`

An owner is whatever the game already tracks as one: the summoner of an [apoli:summon_minion](/docs/datapack/entity-actions/summon_minion) minion, the player a wolf or cat is tamed to, or the entity that fired a projectile. Anything else has no owner and fails.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `bientity_condition` | Bi-Entity Condition Type | _optional_ | Tested with this entity as the **actor** and its owner as the **target**. Left out, the condition passes as long as an owner exists. |

## Examples

```json
{
    "type": "apoli:owner"
}
```

Passes for any entity that has an owner at all.

```json
{
    "type": "apoli:owner",
    "bientity_condition": {
        "type": "apoli:target_condition",
        "condition": {
            "type": "apoli:sneaking"
        }
    }
}
```

Passes when the **owner** is sneaking. `apoli:target_condition` is what turns an owner check into a plain entity check on that owner.

> This is the condition to reach for on a minion. A power on a minion is held by the *minion*, so every condition in it — including the ones on [apoli:custom_model_render](/docs/datapack/powers/custom_model_render)'s `animations` entries — is tested against the minion, never its summoner. Wrap it in `apoli:owner` to ask about the player instead.
