---
title: "apoli:modify_label_render"
description: "Modifies how the holder's nameplate (the floating name label) renders, replace the text, dim it like sneaking, or hide it entirely with optional per-viewer…"
---

Modifies how the holder's nameplate (the floating name label) renders, replace the text, dim it like sneaking, or hide it entirely with optional per-viewer conditions so different players can see different labels. Optionally the label also replaces the holder's name in chat and in the multiplayer tab list, taking priority over a disguise's name.

Type ID: `apoli:modify_label_render`
## Fields

| Field                 | Type                | Default    | Description                                                                                                                                                                                               |
| --------------------- | ------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `text`                | Text Component      | *optional* | Replacement label text. Selector/score components (e.g. `{"selector": "@s"}`, score lookups) are resolved on the server every `tick_rate` ticks. Omit for a mode-only power (e.g. just hiding the label). |
| `render_mode`         | [String](/docs/datapack/data-types/string)  | `default`  | `default` (label shows normally), `hide_partially` (renders like a sneaking player's, dim, not visible through walls), `hide_completely` (no label at all).                                               |
| `tick_rate`           | [Integer](/docs/datapack/data-types/integer) | `20`       | How often (in ticks) the server re-resolves `text` and re-checks the power's `condition`. Higher = cheaper.                                                                                               |
| `priority`            | [Integer](/docs/datapack/data-types/integer) | `0`        | When several modify_label_render powers apply to the same holder, the highest priority (that passes its viewer conditions) wins.                                                                          |
| `entity_condition`    | Entity Condition    | *optional* | Tested against the **viewer** (the player looking at the holder), client-side. The label modification only applies for viewers who pass.                                                                  |
| `bientity_condition`  | Bi-entity Condition | *optional* | Tested with the **viewer as actor** and the **holder as target**, client-side.                                                                                                                            |
| `before_parse_action` | Entity Action       | *optional* | Runs on the holder (server side) right before each text resolve.                                                                                                                                          |
| `after_parse_action`  | Entity Action       | *optional* | Runs on the holder (server side) whenever a resolve produced a *changed* text.                                                                                                                            |
| `override_chat_name`  | [Boolean](/docs/datapack/data-types/boolean) | `false`    | Player holders only: the resolved label replaces their name **everywhere the server uses a display name**: chat, both directions of `/msg` (the "X whispers to you" line and the "You whisper to X" line), `/say`, `/me`, team chat, death messages, advancement announcements and join/leave messages.  |
| `override_tab_name`   | [Boolean](/docs/datapack/data-types/boolean) | `false`    | Player holders only: the resolved label also replaces their name in the multiplayer tab list.                                                                                                             |

## Notes

- **Interaction with Disguise:** a disguise already changes the nameplate, chat and tab names. An active `modify_label_render` takes priority over the disguise's name, on the nameplate always, and in chat / the tab list when the matching `override_*` option is enabled. This lets a pack keep a disguise's appearance but present a different (or per-viewer) name.
- **What is NOT hidden:** the real username still appears in command **tab-completion** (`/msg <name>` suggestions come from the actual player list) and in server logs — the override changes every displayed name, not the underlying profile. Someone must still type the real name to message a labeled player; the conversation then shows the label on both ends.
- The power's regular `condition` field gates it as usual, while the condition fails the label reverts to vanilla (checked every `tick_rate` ticks).
- Performance: text resolving happens on the server at `tick_rate` and results are synced to nearby players **only when the text actually changes**. Per-frame client work only happens for entities that actually have an active label power; the viewer conditions are the only per-frame cost, so keep them cheap (avoid `apoli:nbt` there).
- The stripped-down label (`hide_partially`) matches how vanilla renders sneaking players' names; `hide_completely` suppresses the label render entirely (including scoreboard below-name text shown above heads for other mods' renderers hooked into the vanilla label).

## Examples

A "mysterious stranger" whose name shows as `???` to everyone who isn't on their team:

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

A live power-level readout above the head, refreshed every second, also shown in the tab list:

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

Hide nameplates entirely while invisible:

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

