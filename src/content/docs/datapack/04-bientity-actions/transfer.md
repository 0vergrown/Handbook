---
title: "Transfer (Bi-Entity Action Type)"
description: "Moves or copies powers between the actor and the target through Apoli's power sources."
navigation_title: "Transfer"
---

Moves or copies powers between the actor and the target through Apoli's power source system. It replaces stealing origins or powers with commands, and can steal, give or copy. Paired with a removal by source, it also lets powers be lost and brought back.

Type ID: `apoli:transfer`

> [!NOTE]
> Only top-level powers are transferred. Sub-powers (from `apoli:multiple`) are created again on the recipient and cleaned up on the donor automatically, so nested powers stay consistent and never duplicate. It runs on the server, and the change syncs to clients by itself.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `mode` | [String](/docs/datapack/data-types/string) | `steal` | `steal` moves powers from the target to the actor, and `give` moves them from the actor to the target. |
| `copy` | [Boolean](/docs/datapack/data-types/boolean) | `false` | With `false`, powers are moved and the donor loses them. With `true`, they are copied and the donor keeps them. |
| `sources` | [Array](/docs/datapack/data-types/array) of [Identifier](/docs/datapack/data-types/identifier) | _optional_ | Only transfers powers granted by these sources. Left out, every source on the donor is transferred, except `new_source`. This is how you copy one specific origin or layer: filter to the source it was granted under. |
| `tags` | string or array of strings | _optional_ | Only transfers powers carrying one of these [power tags](/docs/datapack/introduction/powers#tagging-powers). This is how you copy one move from every origin without listing a single power ID. |
| `powers` | [Identifier](/docs/datapack/data-types/identifier) or array | _optional_ | Only transfers these exact powers, if the donor has them. |
| `new_source` | [Identifier](/docs/datapack/data-types/identifier) | `apoli:transferred` | The source the powers are granted under on the recipient. Grouping them under one source lets you remove them all in one call later (see [Losing and restoring](#losing-and-restoring)). |
| `preserve_source` | [Boolean](/docs/datapack/data-types/boolean) | `false` | With `true`, powers keep their original source ID on the recipient instead of using `new_source`. |
| `actor_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Runs on the actor after the transfer, such as a sound or particle. |
| `target_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Runs on the target after the transfer. |

`sources`, `tags` and `powers` all narrow the same set and combine, so a power must pass every filter that is present.

## Copying by tag

Tag the moves you are willing to have copied, once, on the powers themselves:

```json
{
    "type": "apoli:action_on_key_press",
    "tags": ["copyable_move"],
    "entity_action": { "type": "apoli:execute_command", "command": "say hi" }
}
```

Then one action copies whichever of them the target has, whatever origin they came from and however many packs add more later:

```json
{
    "type": "apoli:transfer",
    "mode": "steal",
    "copy": true,
    "tags": ["copyable_move"],
    "new_source": "example:mimicked"
}
```

Strip `example:mimicked` later and the copy goes away.

## Why sources matter

Every power a holder has is tracked by the sources that granted it, and a power stays until its last source is removed. Transferring by source means:

- Copying the same power twice does nothing, because the recipient already holds it under `new_source`.
- Moving only removes the donor's grant for that source. If the donor also had the power from another source, they keep it.
- Sub-powers come along automatically, because granting the top-level power again expands them, and removing it cleans them up.

It all runs on the server and edits the reference-counted container directly, so the client has no authority to get out of sync and there is no way to duplicate a power in multiplayer.

The recipient doesn't need to hold any powers already. One that has never had a power receives them the same way.

## Losing and restoring

To make a transfer temporary, such as stealing powers for 5 minutes, group it under a `new_source` and strip that source later, for example with `apoli:revoke_all_powers` using the same source, or a resource `min_action` that revokes it. Running the transfer again brings the powers back.

## Examples

Steal every power the target has when you use them, keeping the powers grouped so they can be removed later:

```json
{
    "type": "apoli:transfer",
    "mode": "steal",
    "copy": true,
    "new_source": "example:stolen",
    "actor_action": {
        "type": "apoli:play_sound",
        "sound": "minecraft:block.amethyst_cluster.break"
    }
}
```

Copy only the powers of one specific origin (the source it was granted under) from the target to yourself:

```json
{
    "type": "apoli:transfer",
    "mode": "steal",
    "copy": true,
    "sources": [ "origins:origin" ],
    "new_source": "example:copied_origin"
}
```

Give one of your powers' source groups to the target for good, losing it yourself:

```json
{
    "type": "apoli:transfer",
    "mode": "give",
    "copy": false,
    "sources": [ "example:my_gift" ]
}
```
