---
title: Mod compatibility
description: "How Apoli integrates with other mods without depending on them, and how to do the same in your addon."
---

Apoli ships integrations with several other mods, such as accessory frameworks, Figura, Icarus and Hardcore Revival. Each one is a gated compat module: it adds features when the other mod is present, and does nothing (and never crashes) when it isn't. This page is the pattern to follow for compat of your own.

## The gated module pattern

A compat module lives in its own package (`compat/<modid>/`) and is only set up when the target mod is loaded:

```java
if (FabricLoader.getInstance().isModLoaded("trinkets")) {
    TrinketsBackend.register();
}
```

Everything specific to the other mod, the types it registers and the mixins it applies, stays behind that check. Nothing in the core touches the other mod's classes directly.

## Built-in compat modules

Some of the modules Apoli ships:

| Module | Adds | Needs |
| --- | --- | --- |
| `compat.accessory` | Accessory slots, conditions and actions | Trinkets, Accessories or Curios |
| `compat.figura` | `modify_player_model` with Figura avatars | Figura |
| `compat.icarus` | `apoli:wings` flight | Icarus |
| `compat.hardcorerevival` | Knockouts and revives | Hardcore Revival |

The [compatibility overview](/docs/compat/introduction/overview) lists every mod Apoli integrates with.

The accessory module is itself split behind a backend interface with a Trinkets, an Accessories and a Curios implementation, each gated, so one bridge serves all three frameworks.

## Mixins that might not apply

A compat mixin targets a class that only exists when the other mod is present. Gate it in the mixin plugin, and never load the class to check. `getResource` looks for the class file without defining the class, which `Class.forName` would do:

```java
@Override
public boolean shouldApplyMixin(String targetClassName, String mixinClassName) {
    return getClass().getClassLoader()
        .getResource("dev/emi/trinkets/api/TrinketComponent.class") != null;
}
```

Loading a class in a config plugin defines it, and its supertypes, too early and crashes other mods' mixins. Check for the `.class` resource, or use the loader's `isModLoaded`.

## Rules

1. No hard dependency. Your mod must run with the compat target absent.
2. Gate every entry point: registration, events and mixins.
3. Keep imports specific to the other mod inside the compat package, so the core stays clean.
4. Put the target's build coordinates in `compileOnly` or `modCompileOnly`, not `modImplementation`.
