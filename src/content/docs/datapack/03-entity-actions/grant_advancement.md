---
title: "Grant Advancement (Entity Action Type)"
description: "Grants an advancement to the player."
navigation_title: "Grant Advancement"
---

Grants an advancement to the player.

Type ID: `apoli:grant_advancement`

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`advancement` | Identifier | | The namespace and ID of the advancement to be granted to the player.
`criteria` | Array of Strings | _optional_ | If specified, determines the criteria to grant to the specified advancement.
`criterion` | String | _optional_ | If specified, determines the criterion to grant to the specified advancement.
`selection` | String | `"only"` | Determines how to select the parent advancement(s) or child(ren) advancement(s) of the specified advancement. Can be one of: `"only"`, `"through"`, `"from"`, `"until"`, `"everything"`

## Examples

```json
"entity_action": {
    "type": "apoli:grant_advancement",
    "advancement": "minecraft:adventure/arbalistic"
}
```

This example will grant the player the Arbalistic advancement.
