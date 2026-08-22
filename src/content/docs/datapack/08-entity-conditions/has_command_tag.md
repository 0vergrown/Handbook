---
title: "Has Command Tag (Entity Condition Type)"
description: Passes when the entity carries one of the given /tag command tags.
navigation_title: "Has Command Tag"
---

Passes when the entity carries one of the given command tags — the ones set with vanilla's `/tag <target> add <name>`. This is the simplest way to let a command or a function flip a power on without inventing a resource for it.

Type ID: `apoli:has_command_tag`

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`command_tag` | [String](/docs/datapack/data-types/string) | _optional_ | A single tag to look for.
`command_tags` | array of [String](/docs/datapack/data-types/string) | `[]` | Several tags. Passes if the entity has **any** of them. Combines with `command_tag`.

With neither field set, it passes whenever the entity has *any* command tag at all.

## Example

Grant flight only while a tag is present, so a command can toggle it:

```json
{
  "type": "apoli:creative_flight",
  "condition": {
    "type": "apoli:has_command_tag",
    "command_tag": "mypack.flying"
  }
}
```

```mcfunction
tag @s add mypack.flying
tag @s remove mypack.flying
```

Several tags, any of which counts:

```json
{
  "type": "apoli:has_command_tag",
  "command_tags": ["mypack.vip", "mypack.staff"]
}
```
