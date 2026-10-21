---
title: "Modify Label Render (Power Type)"
description: "Changes the entity's floating name label: new text, dimmed like sneaking, or hidden, optionally different for each viewer."
navigation_title: "Modify Label Render"
aliases: ["sync:modify_label_render"]
---

Changes how the nameplate (the floating name label) of the entity with the power renders. It can replace the text, dim the label as sneaking does, or hide it completely, with optional conditions on the viewer so different players see different labels. The label can also replace the player's name in chat and in the multiplayer tab list, and it takes priority over a disguise's name.

Type ID: `apoli:modify_label_render`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `text` | [Text Component](/docs/datapack/data-types/text-component) | _optional_ | The replacement label text. Selector and score components (such as `{"selector": "@s"}`) are resolved on the server every `tick_rate` ticks. Leave it out for a power that only changes the mode, such as hiding the label. |
| `render_mode` | [String](/docs/datapack/data-types/string) | `default` | `default` shows the label as usual, `hide_partially` renders it like a sneaking player's (dim, and not visible through walls), and `hide_completely` shows no label at all. |
| `tick_rate` | [Integer](/docs/datapack/data-types/integer) | `20` | How often, in ticks, the server resolves `text` again and checks the power's `condition` again. Higher is cheaper. |
| `priority` | [Integer](/docs/datapack/data-types/integer) | `0` | When several `modify_label_render` powers apply to the same entity, the highest priority one that passes its viewer conditions wins. |
| `entity_condition` | [Entity Condition](/docs/datapack/entity-conditions) | _optional_ | Tested against the viewer (the player looking at the entity) on the client. The label only changes for viewers who pass. |
| `bientity_condition` | [Bi-entity Condition](/docs/datapack/bientity-conditions) | _optional_ | Tested on the client, with the viewer as the actor and the entity with the power as the target. |
| `before_parse_action` | [Entity Action](/docs/datapack/entity-actions) | _optional_ | Runs on the entity with the power, on the server, right before each time the text is resolved. |
| `after_parse_action` | [Entity Action](/docs/datapack/entity-actions) | _optional_ | Runs on the entity with the power, on the server, whenever resolving the text produced a different result. |
| `override_chat_name` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Players only. The resolved label replaces the player's name everywhere the server uses a display name: chat, both directions of `/msg` (the "X whispers to you" line and the "You whisper to X" line), `/say`, `/me`, team chat, death messages, advancement announcements, and join and leave messages. |
| `override_tab_name` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Players only. The resolved label also replaces the player's name in the multiplayer tab list. |

## Notes

- A disguise already changes the nameplate, chat and tab names. An active `modify_label_render` takes priority over the disguise's name, always on the nameplate, and in chat and the tab list when the matching `override_*` option is on. A pack can keep a disguise's appearance and show a different name, or a different name for each viewer.
- The real username still appears in command tab completion (`/msg <name>` suggestions come from the actual player list) and in server logs, because the override changes every displayed name but not the underlying profile. To message a player with a label, someone still has to type the real name, and the conversation then shows the label on both ends.
- The power's regular `condition` works as usual. While the condition fails, the label goes back to vanilla, checked every `tick_rate` ticks.
- The text is resolved on the server every `tick_rate` ticks, and the result is only synced to nearby players when the text changes. The client only does work every frame for entities with an active label power, and the viewer conditions are the only cost per frame, so keep them cheap and avoid `apoli:nbt` there.
- `hide_partially` matches how vanilla renders a sneaking player's name. `hide_completely` stops the label rendering entirely, including scoreboard text shown below the name and anything other mods draw through the vanilla label.

## Examples

A mysterious stranger whose name shows as `???` to everyone who isn't on their team:

```json
{
    "type": "apoli:modify_label_render",
    "text": "???",
    "bientity_condition": {
        "type": "apoli:both",
        "inverted": true,
        "condition": {
            "type": "apoli:in_set",
            "set": "example:same_team"
        }
    }
}
```

A live power level readout above the head, refreshed every second and also shown in the tab list:

```json
{
   "type":"apoli:modify_label_render",
   "text":[
      {
         "selector":"@s"
      },
      " §7[",
      {
         "score":{
            "name":"@s",
            "objective":"power_level"
         }
      },
      "§7]"
   ],
   "tick_rate":20,
   "override_tab_name":true
}
```

Hide the nameplate entirely while invisible:

```json
{
    "type": "apoli:modify_label_render",
    "render_mode": "hide_completely",
    "condition": {
        "type": "apoli:status_effect",
        "effect": "minecraft:invisibility"
    }
}
```
