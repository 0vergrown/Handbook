---
title: "Comments in data packs, and voice powers in their own addon"
description: "Apoli 1.123.0, Origins 1.49.0 and the first release of Birdsong: JSONC and JSON5 data files, the voice chat and speech types moved into a new addon, and speech commands that set themselves up."
date: 2026-10-28
author: Overgrown
---

This is Apoli 1.123.0 and Origins 1.49.0, on Fabric 1.20.1, Fabric 1.21.1 and NeoForge 1.21.1, plus the first release of a new addon called Birdsong. Update the client, the server and Origins together: this Apoli refuses to load next to an older Origins, and Origins 1.49.0 needs this Apoli. If your packs use the voice chat or speech powers, install Birdsong as well.

## Comments in your data files

FLD sent a pull request that let Apoli and Origins read JSONC and JSON5 files through Quilt's parser library. I liked the feature and didn't want Apoli depending on Quilt to get it, so Apoli now has its own reader that follows the same rules.

A file ending in `.jsonc` can have `//` and `/* */` comments and a comma after the last item. A file ending in `.json5` can do all of that, and also leave the quotes off names, use single quotes, and write numbers like `0x1F` or `.5`. It works in every folder Apoli and Origins read: powers, macros, global powers, custom effects, keybinds, skill trees, origins, layers and badges. Tags, recipes and the other vanilla folders are read by Minecraft, so they stay `.json`. The [file formats page](/docs/datapack/introduction/file-formats) has the details.

The reader also writes better errors. A broken file names the pack it came from and the exact spot:

```txt
Couldn't parse data file example:swim (example:powers/swim.json in file/example): Expected ',' or '}' after a value, found '"' at line 3 column 3 path $.name
```

A comment in a plain `.json` file gets a message telling you to rename it to `.jsonc`, rather than a vague syntax error. In my tests it also reads files about twice as fast as Gson, which handled them before. You'll mostly notice that on `/reload` with big packs.

Two smaller fixes came out of the same work:

- `loading_priority` on [global power sets](/docs/datapack/introduction/powers#global-powers) and [origins](/docs/datapack/origins/overview) now decides between packs. Only the top pack's file was ever read before, so the field did nothing there. Custom status effects already worked this way.
- Two files with the same ID in one pack, such as `swim.json` and `swim.json5`, now log a warning that names both, and the `.json` wins.

## Birdsong

The voice chat powers have moved out of Apoli into an addon of their own, called Birdsong. The speech recogniser and its native libraries made up most of Apoli's download, and most people never used them. Apoli's jar went from 31.7 MB to 4.3 MB.

The types have the same names under a new namespace, [`birdsong:`](/docs/compat/birdsong/overview), and the old `apoli:` IDs still work with Birdsong installed, so existing packs don't need editing. Without Birdsong, Apoli still accepts the old `apoli:` IDs and turns them into powers and conditions that do nothing, so a pack that uses voice powers keeps loading on a server that doesn't have it.

## Speech commands that work

I'll be honest: [`action_on_speech`](/docs/compat/birdsong/action_on_speech) didn't work for most people. It was off by default, and even after turning it on you had to find, download and unpack a speech model by hand. Almost nobody got that far, so for most people it looked broken.

Birdsong sets itself up. When you join a world where you hold a speech power, it asks in chat whether to turn speech recognition on. Say yes and it downloads the speech model for your game language, tells you how big it is first, and remembers it for next time. Recognition still happens on your own computer, and the server only hears which power matched.

Matching got smarter too. Phrases match whole words now, so `fire` no longer goes off in the middle of "fireball", and a phrase still matches when the recogniser splits or joins words, as in "fire ball". On a finished sentence, words that are close to a phrase also count, which catches the usual recognition slips like "firebolt" for "fireball". The new [`tolerance`](/docs/compat/birdsong/action_on_speech#close-matches) field sets how close is close enough, and `0` turns it off. The close-match rules borrow from [Handy](https://github.com/cjpais/Handy), an open source speech-to-text app that solves the same problem for dictation.

For when something doesn't fire, `/birdsong speech status` shows whether Birdsong is listening and with which model, and the Show What Was Heard setting prints every sentence it recognised. Pack authors can test without a microphone at all: `/birdsong:speech fireball` runs your speech powers as if you'd said it.

The voice chat side got lighter as well. Birdsong records each voice packet with a couple of field writes, where Apoli used to schedule a task on the server thread for every packet anyone sent.

## Under the hood

Apoli and Origins are built against Fabric Loader 0.20.1, Fabric API 0.116.17 on 1.21.1 and 0.92.12 on 1.20.1, and NeoForge 21.1.265.
