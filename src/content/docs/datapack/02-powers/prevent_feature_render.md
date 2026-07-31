---
title: "Prevent Feature Render (Power Type)"
description: "Prevents certain Feature Renderers (like the wool coat of a Sheep, the worn armor of a mob, etc.) from rendering on the entity that has the power."
navigation_title: "Prevent Feature Render"
---

Prevents certain Feature Renderers (like the wool coat of a Sheep, the worn armor of a mob, etc.) from rendering on the entity that has the power.

Type ID: `apoli:prevent_feature_render`

## Fields

Field | Type | Default | Description
------|------|---------|------------
`feature` | Feature Renderer | _optional_ | If specified, this feature renderer will not be rendered.
`features` | Array of Feature Renderers | _optional_ | If specified, these feature renderers will not be rendered.

## Examples

```json
{
    "type": "apoli:prevent_feature_render",
    "features": [
        "armor",
        "held_item",
        "elytra"
    ]
}
```

This example will make the worn armor, held item and worn Elytra of the entity that has this power disappear as if they weren't wearing or holding an item.
