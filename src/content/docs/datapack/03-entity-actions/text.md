---
title: "Text (Entity Action Type)"
description: "Shows text on the player's screen in a vanilla title or actionbar slot, or at one of Apoli's HUD anchors, with fade timing."
navigation_title: "Text"
aliases: ["text_bar", "show_text"]
---

Shows text on the target player's screen at a chosen position, with fade in, stay and fade out timing. The position can be one of the vanilla title, subtitle and actionbar slots or one of Apoli's own HUD anchors. Each entry in a `text` list carries its own condition, so one action can show several segments side by side and restyle or hide each one, for example two options where the active one is highlighted. Colours and other styling come from the text components themselves, and there is no separate colour field.

Type ID: `apoli:text` (aliases `apoli:text_bar` and `apoli:show_text`)

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `text` | [Text Component](/docs/datapack/data-types/text-component), or list of text entries | _required_ | What to show. A plain string or text component, or a list of text entries (see below) joined in order. Entries whose condition fails are skipped. |
| `bar` | [String](/docs/datapack/data-types/string) | `actionbar` | Where to show it: `actionbar`, `title`, `subtitle`, `top_left`, `top_center`, `top_right`, `left`, `right`, `bottom_left` or `bottom_right`. |
| `bold` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Base bold styling. |
| `italic` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Base italic styling. |
| `underlined` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Base underline styling. |
| `strikethrough` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Base strikethrough styling. |
| `obfuscated` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Base obfuscated styling. |
| `fadein` | [Integer](/docs/datapack/data-types/integer) | `10` | Fade in time in ticks. |
| `duration` | [Integer](/docs/datapack/data-types/integer) | `70` | How long the text stays fully visible, in ticks. `-1` keeps it until it is replaced or cleared, like `duration: -1` on Apply Effect. |
| `fadeout` | [Integer](/docs/datapack/data-types/integer) | `20` | Fade out time in ticks. |

### Text entries

Each element of a `text` list is an object with these fields:

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `text` | [Text Component](/docs/datapack/data-types/text-component) | _required_ | The text of this segment. Full vanilla text components work. |
| `condition` | [Entity Condition Type](/docs/datapack/entity-conditions) | _optional_ | The segment only shows while this condition passes. It is tested on the player the text is shown to, on the server. |

## Notes

- Each `bar` position holds one text per player, and sending to the same bar replaces what is there. Sending an empty `text`, or a list where no entry passes, clears that bar, so conditional entries disappear when nothing applies.
- Every bar draws above the chat overlay, so `bottom_left` and `left` stay readable while chat is open or scrolled.
- The action is built for `interval: 1` loops. The finished text is only sent when it changes, and timed texts are refreshed about halfway through their stay so they never flicker out while the action keeps firing. That avoids the per-tick parsing cost of running `/title` through `execute_command` every tick.
- `title` and `subtitle` render at vanilla title size in the middle of the screen through Apoli's own overlay, so they never clash with vanilla `/title` output. `top_center` sits just below the boss bar area.
- The action only works on players, since the target needs a screen. Segment conditions are evaluated on the server.

## Example

A selector with two options side by side. The selected one, tracked by a resource, is white and bold, and the other is grey:

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

A title shown once on a key press:

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
