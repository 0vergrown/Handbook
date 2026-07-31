---
title: Custom data types
description: Add reusable JSON value shapes with codecs — usable across your powers.
---

A [data type](/docs/datapack/introduction/data-types) is any reusable value shape a field can accept — an attribute modifier, a status effect, a rope endpoint. In Apoli a data type is just a **codec**: define one once, and reference it from as many power/action/condition codecs as you like.

## A codec is a data type

Say your powers need a "swing" value — an axis and an amount:

```java
public record Swing(Direction.Axis axis, float amount) {
    public static final Codec<Swing> CODEC = RecordCodecBuilder.create(i -> i.group(
        Direction.Axis.CODEC.fieldOf("axis").forGetter(Swing::axis),
        Codec.FLOAT.optionalFieldOf("amount", 1.0f).forGetter(Swing::amount)
    ).apply(i, Swing::new));
}
```

Reference it from any config codec:

```java
Swing.CODEC.fieldOf("swing").forGetter(Cfg::swing)
```

A data pack then writes:

```json
{ "swing": { "axis": "y", "amount": 2.0 } }
```

There's no registry to touch — the codec travels with the field that uses it.

## Single-or-list

Many Apoli fields accept one value *or* an array. Expose both with a small helper:

```java
public static final Codec<List<Swing>> LIST_OR_SINGLE =
    Codec.either(Codec.list(Swing.CODEC), Swing.CODEC)
        .xmap(e -> e.map(l -> l, List::of),
              l -> l.size() == 1 ? Either.right(l.get(0)) : Either.left(l));
```

Then `LIST_OR_SINGLE.fieldOf("swings")` accepts both forms. This is how `modifier`/`modifiers` and `effect`/`effects` work.

## Reusing Apoli's data types

Prefer reusing Apoli's existing codecs over rolling your own — they're public:

| Codec | JSON |
| --- | --- |
| `AttributeModifier.CODEC` | `{ operation, value, attribute }` |
| `Comparison.CODEC` | `"<="` |
| `Space.CODEC` / `Shape.CODEC` | `"local"` / `"sphere"` |
| `HudRender.CODEC` | resource bar config |
| `Expression.FLOAT_OR_EXPR` | a number *or* an [expression](/docs/addon/systems/expressions) |

Reaching for these keeps your JSON consistent with the rest of Apoli, and means fixes and aliases apply to your fields for free.

## Aliasing field names

To accept a legacy field name for a data type, use the [field-alias helpers](/docs/addon/api/aliasing) at registration rather than branching inside the codec.
