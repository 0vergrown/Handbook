---
title: "Text (Entity Action Type)"
description: "Displays text on the target player's screen at a chosen position — the vanilla title, subtitle and actionbar slots, or one of Apoli's custom HUD anchors —…"
navigation_title: "Text"
aliases: ["text_bar", "show_text"]
---

Displays text on the target player's screen at a chosen position — the vanilla title, subtitle and actionbar slots, or one of Apoli's custom HUD anchors — with fade-in/stay/fade-out timing. Each entry in a `text` list carries its own condition, so a single action can render several segments side by side and restyle or hide them individually (e.g. two selectable options where the active one is highlighted). Colors and other styling come from the text components themselves — there is no separate color field.

Type ID: `apoli:text`

Aliases: `apoli:text_bar`, `apoli:show_text`

## Fields

| Field           | Type                                    | Default     | Description                                                                                                                                    |
| --------------- | --------------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `text`          | Text Component, or list of Text Entries | *required*  | What to display. A plain string/text component, or a list of text entries (see below) concatenated in order — entries whose condition fails are skipped. |
| `bar`           | [String](/docs/datapack/data-types/string)                      | `actionbar` | Where to display: `actionbar`, `title`, `subtitle`, `top_left`, `top_center`, `top_right`, `left`, `right`, `bottom_left`, `bottom_right`.      |
| `bold`          | [Boolean](/docs/datapack/data-types/boolean)                     | `false`     | Base bold styling.                                                                                                                              |
| `italic`        | [Boolean](/docs/datapack/data-types/boolean)                     | `false`     | Base italic styling.                                                                                                                            |
| `underlined`    | [Boolean](/docs/datapack/data-types/boolean)                     | `false`     | Base underline styling.                                                                                                                         |
| `strikethrough` | [Boolean](/docs/datapack/data-types/boolean)                     | `false`     | Base strikethrough styling.                                                                                                                     |
| `obfuscated`    | [Boolean](/docs/datapack/data-types/boolean)                     | `false`     | Base obfuscated styling.                                                                                                                        |
| `fadein`        | [Integer](/docs/datapack/data-types/integer)                     | `10`        | Fade-in time in ticks.                                                                                                                          |
| `duration`      | [Integer](/docs/datapack/data-types/integer)                     | `70`        | How long the text stays fully visible, in ticks. `-1` keeps it until replaced or cleared (like a `duration: -1` Apply Effect).                  |
| `fadeout`       | [Integer](/docs/datapack/data-types/integer)                     | `20`        | Fade-out time in ticks.                                                                                                                         |

### Text Entry (elements of a `text` list)

| Field       | Type                    | Default    | Description                                                       |
| ----------- | ----------------------- | ---------- | ----------------------------------------------------------------- |
| `text`      | Text Component          | *required* | The text of this segment (full vanilla text component supported). |
| `condition` | Entity Condition        | *optional* | The segment only shows while this condition passes (tested on the displaying player, server side). |

## Notes

- Each `bar` position holds **one** text per player — sending to the same bar replaces what is there. Sending an empty `text` (or a list where no entry passes) **clears** that bar, so conditioned entries naturally disappear when nothing applies.
- Every bar draws **above the chat overlay**, so `bottom_left` and `left` stay readable while chat is open or scrolled.
- The action is built for `interval: 1` loops: the composed text is **only sent when it changes** (timed texts are silently refreshed about halfway through their stay so they never flicker out while the action keeps firing). This replaces `/title` `execute_command` spam and its per-tick command parsing cost.
- `title` and `subtitle` render at vanilla title scale in the screen center through Apoli's own overlay, so they never fight vanilla `/title` output; `top_center` sits just below the boss bar area.
- Only works on players (the target must be a player to have a screen). Segment conditions are evaluated on the server.

## Example

Cycling "order" selector — two options side by side; the selected one (tracked by a resource) is white and bold, the other gray:

```json
{
   "type":"apoli:action_over_time",
   "entity_action":{
      "type":"apoli:text",
      "bar":"actionbar",
      "duration":20,
      "text":[
         {
            "text":{
               "text":"FIRST ORDER  ",
               "color":"#FFFFFF"
            },
            "condition":{
               "type":"apoli:resource",
               "resource":"quirk:neworder/twoorder_resource",
               "comparison":"==",
               "compare_to":1
            }
         },
         {
            "text":{
               "text":"FIRST ORDER  ",
               "color":"#555555"
            },
            "condition":{
               "type":"apoli:resource",
               "resource":"quirk:neworder/twoorder_resource",
               "comparison":"!=",
               "compare_to":1
            }
         },
         {
            "text":{
               "text":"SECOND ORDER",
               "color":"#FFFFFF"
            },
            "condition":{
               "type":"apoli:resource",
               "resource":"quirk:neworder/twoorder_resource",
               "comparison":"==",
               "compare_to":2
            }
         },
         {
            "text":{
               "text":"SECOND ORDER",
               "color":"#555555"
            },
            "condition":{
               "type":"apoli:resource",
               "resource":"quirk:neworder/twoorder_resource",
               "comparison":"!=",
               "compare_to":2
            }
         }
      ]
   },
   "interval":1
}
```

A one-shot title on key press:

```json
{
   "type":"apoli:action_on_key_press",
   "entity_action":{
      "type":"apoli:text",
      "bar":"title",
      "text":{
         "text":"Power unleashed!",
         "color":"gold"
      },
      "bold":true,
      "fadein":5,
      "duration":30,
      "fadeout":10
   },
   "key":{
      "key":"key.use"
   }
}
```
