---
title: Grave inscriptions
description: Add a line of text to a player's grave from your addon, with You're in Grave Danger, Gravestones or the GraveStone Mod.
---

When a player dies with a supported grave mod installed, Apoli asks every registered **inscription provider** for a line of text and stores the answers with the grave. Each supported mod then draws them on the gravestone. Origins uses this to show the origin the player had when they died.

| Grave mod | Where the lines appear |
|-----------|------------------------|
| [You're in Grave Danger](/docs/compat/youre-in-grave-danger/overview) | Under the owner's name, scaled to fit the stone. |
| [Gravestones](/docs/compat/gravestones/overview) | The second sign line, joined with ` / ` when there is more than one. |
| [GraveStone Mod](/docs/compat/gravestone-mod/overview) | Under the owner's name. |

## Registering a provider

```java
import dev.overgrown.apoli.compat.grave.GraveInscriptions;

GraveInscriptions.register(MyMod.id("class"), player -> {
    PlayerClass playerClass = PlayerClasses.of(player);
    return playerClass == null ? null : playerClass.displayName();
});
```

Register once, from your mod initializer. The id identifies your provider: registering the same id again replaces it, and lines appear in registration order.

The provider runs **on the server, once per death**, while the grave is being made. Return a `Component` to add a line, or `null` to add nothing. A translatable component is stored as its key and translated on each viewer's client, so it follows their language.

The lines are saved with the grave, so they show what was true **at the moment of death**. Changing the player afterwards does not change graves they already have.

> A provider that throws is logged and skipped; it never stops the grave from being made.

## What Origins registers

Origins registers `origins:origin`, one line with the name of the player's active origin on every enabled layer that isn't [`hidden`](/docs/datapack/origins/layers), joined with ` / `. A player with no origin gets no line.
