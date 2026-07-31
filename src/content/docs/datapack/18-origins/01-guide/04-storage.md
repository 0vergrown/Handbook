---
title: Origin Storage
description: Remember a player's origin under a name and put it back later.
---

Every player carries a small **store**: named entries that survive death, respawn and relog. It exists so you can take an origin away and give it back — "you were a Merling, now you're cursed, and in ten minutes you'll be a Merling again" — without hard-coding which origin that was.

Two kinds of entry live in the store:

- **origins** — an origin id plus the layer it came from;
- **values** — plain text: a marker, a name, a state flag.

They live in separate maps, so the same key can hold one of each. Each type below reads or writes only its own kind.

## The types

| Type | Kind | What it does |
| --- | --- | --- |
| [`origins:store_origin`](/docs/datapack/origins/store_origin) | Entity action | Store the entity's own origin under a key. |
| [`origins:store_origin` (bi-entity)](/docs/datapack/origins/store_origin_bientity) | Bi-entity action | Store the **target's** origin into the **actor's** store. |
| [`origins:apply_stored_origin`](/docs/datapack/origins/apply_stored_origin) | Entity action | Set the entity's origin from a key. |
| [`origins:store_value`](/docs/datapack/origins/store_value) | Entity action | Store text under a key. |
| [`origins:stored_origin`](/docs/datapack/origins/stored_origin) | Entity condition | Is an origin stored (optionally a specific one)? |
| [`origins:stored_value`](/docs/datapack/origins/stored_value) | Entity condition | Is this text stored? |

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

Later, put it back — but only if there is something to put back:

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

[`origins:apply_stored_origin`](/docs/datapack/origins/apply_stored_origin) goes through the normal origin-change path — powers are diffed rather than removed and re-added, so shared resources and [`apoli:inventory`](/docs/datapack/powers/inventory) contents are not disturbed, and gated layers are revalidated afterwards.

## Placeholders

Anywhere the store accepts text — [`origins:store_value`](/docs/datapack/origins/store_value) and the `/origin storage run` command — `[key]` expands to that key's contents. For a stored origin that is its id; `[key.name]` gives its display name instead.

A string whose placeholders cannot all be resolved is **not** used: nothing is stored, and no command is run. That makes it safe to write commands that depend on a key existing.

## Commands

Permission node `origins.command.origin.storage`, operator level 2.

```
/origin storage list <target>
/origin storage get <target> <key>
/origin storage store origin <target> <key> <source> [<layer>]
/origin storage store value <target> <key> <value…>
/origin storage apply <target> <key> [<layer>]
/origin storage clear <target> [<key>]
/origin storage run <target> <command…>
```

`store origin` reads `<source>`'s origin and saves it on `<target>`. `run` executes a command as `<target>`, at their position and rotation, after expanding placeholders — for example:

```
/origin storage run @s tellraw @s {"text":"You used to be [before_curse.name]"}
```

## Notes

- Storage is **server-side**. Conditions that read it are for gameplay logic; a client-only render power can't see it.
- Keys are plain strings and are case-sensitive.
- Storing under an existing key overwrites it.
- To test the origin a player is *currently wearing* rather than one in the store, use [`origins:origin`](/docs/datapack/origins/origin).
