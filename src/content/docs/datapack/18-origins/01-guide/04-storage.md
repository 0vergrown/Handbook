---
title: Origin Storage
description: "Remembering a player's origin under a name and putting it back later."
---

Every player carries a small store of named entries that survive death, respawn and relog. It lets you take an origin away and give it back ("you were a Merling, now you're cursed, and in ten minutes you'll be a Merling again") without hard-coding which origin it was.

The store holds two kinds of entry:

- origins, each an origin ID plus the layer it came from
- values, plain text such as a marker, a name or a state flag

They live in separate maps, so the same key can hold one of each. Each type below reads or writes only its own kind.

## The types

| Type | Kind | What it does |
| --- | --- | --- |
| [`origins:store_origin`](/docs/datapack/origins/store_origin) | Entity action | Stores the entity's own origin under a key. |
| [`origins:store_origin` (bi-entity)](/docs/datapack/origins/store_origin_bientity) | Bi-entity action | Stores the target's origin in the actor's store. |
| [`origins:apply_stored_origin`](/docs/datapack/origins/apply_stored_origin) | Entity action | Sets the entity's origin from a key. |
| [`origins:store_value`](/docs/datapack/origins/store_value) | Entity action | Stores text under a key. |
| [`origins:stored_origin`](/docs/datapack/origins/stored_origin) | Entity condition | Checks whether an origin is stored, optionally a specific one. |
| [`origins:stored_value`](/docs/datapack/origins/stored_value) | Entity condition | Checks whether this text is stored. |

## A round trip

Store what you are, then replace it:

```json
{
   "type":"apoli:and",
   "actions":[
      {
         "type":"origins:store_origin",
         "key":"before_curse"
      },
      {
         "type":"apoli:execute_command",
         "command":"origin set @s origins:origin origins:phantom"
      }
   ]
}
```

Later, put it back, but only if there is something to put back:

```json
{
   "type":"apoli:if_else",
   "condition":{
      "type":"origins:stored_origin",
      "key":"before_curse"
   },
   "if_action":{
      "type":"origins:apply_stored_origin",
      "key":"before_curse",
      "clear":true
   }
}
```

[`origins:apply_stored_origin`](/docs/datapack/origins/apply_stored_origin) goes through the normal origin change path. Powers are compared instead of being removed and added again, so shared resources and [`apoli:inventory`](/docs/datapack/powers/inventory) contents aren't disturbed, and gated layers are revalidated afterwards.

## Placeholders

Anywhere the store accepts text, which is [`origins:store_value`](/docs/datapack/origins/store_value) and the `/origin storage run` command, `[key]` expands to that key's contents. For a stored origin that is its ID, and `[key.name]` gives its display name instead.

A string whose placeholders can't all be resolved isn't used: nothing is stored and no command is run. That makes it safe to write commands that depend on a key existing.

## Commands

The permission node is `origins.command.origin.storage`, at operator level 2.

```
/origin storage list <target>
/origin storage get <target> <key>
/origin storage store origin <target> <key> <source> [<layer>]
/origin storage store value <target> <key> <value…>
/origin storage apply <target> <key> [<layer>]
/origin storage clear <target> [<key>]
/origin storage run <target> <command…>
```

`store origin` reads the origin of `<source>` and saves it on `<target>`. `run` executes a command as `<target>`, at their position and rotation, after expanding placeholders:

```
/origin storage run @s tellraw @s {"text":"You used to be [before_curse.name]"}
```

## Notes

- Storage is server side. Conditions that read it are for gameplay logic, and a client-only render power can't see it.
- Keys are plain strings and are case-sensitive.
- Storing under an existing key overwrites it.
- To test the origin a player currently has instead of one in the store, use [`origins:origin`](/docs/datapack/origins/origin).
