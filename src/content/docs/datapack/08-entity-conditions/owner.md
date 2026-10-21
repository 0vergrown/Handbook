---
title: "Owner (Entity Condition Type)"
description: "Checks the entity that owns this one, such as a minion's summoner, a pet's owner or a projectile's shooter."
navigation_title: "Owner"
---

Checks the entity that owns this one. It only passes if there is an owner and, when `bientity_condition` is given, if the pair passes it, with this entity as the actor and the owner as the target.

Type ID: `apoli:owner`

An owner is whatever the game already tracks as one: the summoner of an [apoli:summon_minion](/docs/datapack/entity-actions/summon_minion) minion, the player a wolf or cat is tamed to, or the entity that fired a projectile. Anything else has no owner and fails.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `bientity_condition` | [Bi-entity Condition Type](/docs/datapack/bientity-conditions) | _optional_ | Tested with this entity as the actor and its owner as the target. Without it, the condition passes as long as an owner exists. |

## Examples

```json
{
    "type": "apoli:owner"
}
```

This passes for any entity that has an owner at all.

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

This passes when the owner is sneaking. `apoli:target_condition` turns the owner check into a plain entity check on the owner.

> [!TIP]
> Use this condition on a minion. A power on a minion is held by the minion, so every condition in it, including the ones on the `animations` entries of [apoli:custom_model_render](/docs/datapack/powers/custom_model_render), is tested against the minion and never its summoner. Wrap it in `apoli:owner` to ask about the player instead.
