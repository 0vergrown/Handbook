---
title: "Revoke Advancement (Entity Action Type)"
description: "Revokes an advancement from the player."
navigation_title: "Revoke Advancement"
---

Revokes an advancement from the player.

Type ID: `apoli:revoke_advancement`

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`advancement` | Identifier | _optional_ | The namespace and ID of the advancement to be revoked from the player.
`criteria` | Array of Strings | _optional_ | If specified, determines the criteria to revoke from the specified advancement.
`criterion` | String | _optional_ | If specified, determines the criterion to revoke from the specified advancement.
`selection` | String | _optional_ | Determines how to select the parent advancement(s) or child(ren) advancement(s) of the specified advancement. Can be one of: `"only"`, `"through"`, `"from"`, `"until"`, `"everything"`

## Examples

```json
"entity_action": {
    "type": "apoli:revoke_advancement",
    "advancement": "minecraft:adventure/arbalistic"
}
```

This example will revoke the Arbalistic advancement from the player, if they have it.
