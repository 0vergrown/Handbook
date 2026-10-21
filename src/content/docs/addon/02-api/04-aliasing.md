---
title: Aliasing legacy JSON
description: "Accepting old type IDs, renamed fields and injected defaults without touching your codec."
---

When you port powers from another mod, or rename something, old data packs shouldn't break. Apoli's aliasing lets one registered type answer to several IDs, accept old field names and add defaults, all before your codec runs. Your codec stays clean, and the compatibility lives in the registration.

## AliasingOptions

Pass an `AliasingOptions` as the third argument when registering:

```java
PowerTypeRegistry.register(
    MyMod.id("attribute"),
    new AttributePower(),
    AliasingOptions.builder()
        .addTypeAlias(MyMod.id("conditioned_attribute"))
        .build()
);
```

Now both `mymod:attribute` and `mymod:conditioned_attribute` load through `AttributePower`.

The builder has these methods:

| Method | Effect |
| --- | --- |
| `addTypeAlias(id)` | The type also answers to this old ID. |
| `addTypeAlias(id, defaults)` | The same, and adds these field defaults for that alias only. |
| `renameField(old, new)` | Rewrites an old field name to its current name before parsing. |
| `build()` | Produces the options. |

The same builder works for actions and conditions:

```java
ActionTypes.ENTITY.register(
    MyMod.id("modify_resource"),
    new ModifyResourceAction(),
    AliasingOptions.builder().addTypeAlias(MyMod.id("change_resource")).build()
);
```

## Field renames

If a field was called `entity_action` and is now `self_action`, rename it for the alias so the old JSON still parses. `registerAliasFieldRenames` maps the legacy field name for that one alias:

```java
PowerTypeRegistry.register(
    MyMod.id("action_on_hit"),
    new ActionOnHitPower(),
    AliasingOptions.builder()
        .addTypeAlias(MyMod.id("self_action_on_hit"))
        .build()
);
PowerTypeRegistry.registerAliasFieldRenames(
    MyMod.id("self_action_on_hit"), Map.of("entity_action", "self_action"));
```

## Injected defaults

`registerAliasDefaults`, and the two-argument `addTypeAlias`, fill in fields that the alias should imply. That is how `apoli:modify_damage_dealt` and `apoli:modify_damage_taken` are the same type with a different default for which side is affected:

```java
PowerTypeRegistry.registerAliasDefaults(MyMod.id("modify_damage_taken"), Map.of("target_used", "true"));
```

## Why do it this way

- Your `configCodec()` only ever sees current IDs and field names, with no legacy branches.
- All the compatibility is declared in one place, next to the registration.
- Removing an alias later is a one-line change.

This is the pattern behind the many aliases across the [data pack docs](/docs/datapack/introduction/powers), such as `change_resource`, `set_size` and `disguise_as_player`.
