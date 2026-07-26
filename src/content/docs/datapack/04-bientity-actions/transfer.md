---
title: "apoli:transfer"
description: "Moves or copies powers between the actor and target using Apoli's power source system."
---

Moves or copies powers between the **actor** and **target** using Apoli's power **source** system. This is the flexible replacement for command-based origin/power "stealing" — it can steal, give, copy, and (paired with a removal by source) let powers be lost and brought back.

Type ID: `apoli:transfer`

> Only **top-level** powers are transferred. Sub-powers (from `apoli:multiple`) are re-created on the recipient and cleaned up on the donor automatically, so nested powers stay consistent and never duplicate. Runs on the server; the change syncs to clients on its own.

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`mode` | [String](/docs/datapack/data-types/string) | `steal` | `steal` moves powers **target → actor**; `give` moves them **actor → target**.
`copy` | [Boolean](/docs/datapack/data-types/boolean) | `false` | If `false`, powers are **moved** (removed from the donor). If `true`, they are **copied** (the donor keeps them).
`sources` | [Array](/docs/datapack/data-types/array) of [Identifier](/docs/datapack/data-types/identifier) | *optional* | Only transfer powers granted by these sources. If omitted, every source on the donor is transferred (except `new_source`). This is how you copy one specific origin/layer — filter to the source it was granted under.
`new_source` | [Identifier](/docs/datapack/data-types/identifier) | `apoli:transferred` | The source the powers are granted under on the **recipient**. Grouping under one source lets you later remove them all in one call (see *Losing / restoring* below).
`preserve_source` | [Boolean](/docs/datapack/data-types/boolean) | `false` | If `true`, powers keep their **original** source id on the recipient instead of `new_source`.
`actor_action` | Entity Action | *optional* | Action run on the actor after the transfer (e.g. a sound or particle).
`target_action` | Entity Action | *optional* | Action run on the target after the transfer.

## Why sources matter (dupe-safety)

Every power a holder has is tracked by the *sources* that granted it, and a power stays until its last source is removed. Transferring by source means:

- **Copying** the same power twice is a no-op — the recipient already holds it under `new_source`.
- **Moving** removes only the donor's grant for that source; if the donor had the power from another source too, they keep it.
- Sub-powers ride along automatically because re-granting the top-level power re-expands them, and removing it cleans them up.

Because it all runs server-side and edits the ref-counted container directly, there is no client authority to desync and no path to duplicate a power in multiplayer.

## Losing / restoring

To make a transfer temporary (the classic "steal for 5 minutes"), group it under a `new_source` and later strip that source — e.g. with `apoli:revoke_all_powers` sharing the same source, or a resource `min_action` that revokes it. Bringing it back is just running the transfer again.

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

Permanently give one of your powers' source group to the target and lose it yourself:

```json
{
    "type": "apoli:transfer",
    "mode": "give",
    "copy": false,
    "sources": [ "example:my_gift" ]
}
```

## See also

- `apoli:revoke_all_powers` — remove every power that shares a source (use the transfer's `new_source` to undo a steal).
- `apoli:grant_power` / `apoli:grant_all_powers` — the single-entity source-based grant actions.

