---
title: Mod compatibility
description: How Apoli integrates with other mods without hard-depending on them.
---

Apoli ships integrations with several other mods — accessory frameworks, Figura, Icarus, Simple Voice Chat, downed-state mods. Each is a **gated compat module**: it adds features when the other mod is present and does nothing (and never crashes) when it isn't. This page is the pattern to follow for your own compat.

## The gated-module pattern

A compat module lives in its own package (`compat/<modid>/`) and is only wired up when the target mod is loaded:

```java
if (FabricLoader.getInstance().isModLoaded("trinkets")) {
    TrinketsBackend.register();
}
```

Everything mod-specific — the types it registers, the mixins it applies — stays behind that gate. Nothing in the core touches the other mod's classes directly.

## Built-in compat modules

| Module                   | Adds                                   | Needs                           |
|--------------------------|----------------------------------------|---------------------------------|
| `compat.accessory`       | accessory slots, conditions & actions  | Trinkets / Accessories / Curios |
| `compat.figura`          | `modify_player_model` → Figura avatars | Figura                          |
| `compat.icarus`          | `apoli:wings` flight                   | Icarus                          |
| `compat.voicechat`       | voice conditions & speak actions       | Simple Voice Chat               |
| `compat.hardcorerevival` | knockout / revive                      | a downed-state mod              |

The accessory module is itself split behind a backend interface with Trinkets/Accessories/Curios implementations, each gated — so one bridge serves all three frameworks.

## Mixins that might not apply

A compat mixin targets a class that only exists when the other mod is present. Gate it in the mixin plugin — and **never load the class to check**:

```java
@Override
public boolean shouldApplyMixin(String targetClassName, String mixinClassName) {
    // getResource — does NOT define the class (Class.forName would, and break things)
    return getClass().getClassLoader()
        .getResource("dev/emi/trinkets/api/TrinketComponent.class") != null;
}
```

Loading a class in a config plugin defines it (and its supertypes) too early and hard-crashes other mods' mixins. Check for the `.class` **resource**, or use the loader's `isModLoaded`.

## Rules

1. **No hard dependency.** The mod must run with the compat target absent.
2. **Gate at every entry** — registration, events, and mixins.
3. **Isolate** mod-specific imports inside the compat package; the core stays clean.
4. Build coordinates for the target go in `compileOnly` / `modCompileOnly`, not `modImplementation`.

## See also

- [Performance » mixin config plugins](/docs/addon/systems/performance)
- [Per-loader notes](/docs/addon/loaders/per-loader)
