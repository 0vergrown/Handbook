---
title: "Identifier (Data Type)"
description: "A namespaced string that names a game object — an item, block, power, tag and so on."
navigation_title: "Identifier"
---

An **identifier** (also called a *resource location*) is a [String](/docs/datapack/data-types/string) that names something in the game — an item, block, entity type, status effect, power, tag, or a file in a data/resource pack. It's the single most common value type in Apoli: every `type` field is an identifier, and so are `power`, `attribute`, `effect`, `sound`, and many more.

## Format

An identifier is written as `namespace:path`.

- The **namespace** groups ids by who owns them — `minecraft` for vanilla, `apoli` for this engine, `my_pack` for your own content.
- The **path** names the specific thing within that namespace.

If you write only a path with no colon, the namespace defaults to `minecraft`. So `stone` and `minecraft:stone` are the same.

```json
"apoli:attribute"
"minecraft:diamond_sword"
"my_pack:mana"
```

## Legal characters

Both the namespace and the path may contain only:

- lowercase letters `a`–`z`
- digits `0`–`9`
- underscore `_`, hyphen `-`, and dot `.`

The **path** may additionally contain `/` to indicate folders (e.g. `apoli:textures/rope/rope.png`). The **namespace** may not. There is exactly one colon, separating namespace and path.

> Uppercase letters, spaces, and other symbols are **not** allowed and will cause the file to fail loading.

## Where paths point

For ids that refer to a pack file, the path maps to a folder under that namespace. For example, a power id `my_pack:swim` is the file `data/my_pack/powers/swim.json`.
