---
title: Aliasing legacy JSON
description: Accept old type ids, renamed fields, and injected defaults without touching your codec.
---

When you port powers from another mod — or rename something — old data packs shouldn't break. Apoli's **aliasing** lets one registered type answer to several ids, accept old field names, and inject defaults, all *before* your codec ever runs. Your codec stays clean; the compatibility lives in the registration.

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

The builder:

| Method | Effect |
| --- | --- |
| `addTypeAlias(id)` | The type also answers to this old id. |
| `addTypeAlias(id, defaults)` | As above, and inject these field defaults for that alias only. |
| `renameField(old, new)` | Rewrite an old field name to its canonical name pre-parse. |
| `build()` | Produce the options. |

The same builder works for actions and conditions:

```java
ActionTypes.ENTITY.register(
    MyMod.id("modify_resource"),
    new ModifyResourceAction(),
    AliasingOptions.builder().addTypeAlias(MyMod.id("change_resource")).build()
);
```

## Field renames

If a field was called `entity_action` but you've split it into `self_action`, rename per alias so the old JSON still parses:

```java
PowerTypeRegistry.register(
    MyMod.id("action_on_hit"),
    new ActionOnHitPower(),
    AliasingOptions.builder()
        .addTypeAlias(MyMod.id("self_action_on_hit"))
        .build()
);
// map the legacy field name for that alias
PowerTypeRegistry.registerAliasFieldRenames(
    MyMod.id("self_action_on_hit"), Map.of("entity_action", "self_action"));
```

## Injected defaults

`registerAliasDefaults` (and the two-arg `addTypeAlias`) fill in fields that the alias should imply. This is how `apoli:modify_damage_dealt` and `apoli:modify_damage_taken` are the *same* type with a different default for which side is affected:

```java
PowerTypeRegistry.registerAliasDefaults(MyMod.id("modify_damage_taken"), Map.of("target_used", "true"));
```

## Why do it this way

- Your `configCodec()` only ever sees canonical ids and field names — no legacy branches.
- All the compatibility is declared in one place, next to the registration.
- Removing an alias later is a one-line change.

This is the pattern behind the many aliases you see across the [data-pack docs](/docs/datapack/introduction/powers) (`change_resource`, `set_size`, `disguise_as_player`, …).

## See also

- [Registering power types](/docs/addon/api/registering-power-types)
- [Actions & conditions](/docs/addon/api/actions-and-conditions)
