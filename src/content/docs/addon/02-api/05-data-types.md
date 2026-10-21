---
title: Custom data types
description: "Reusable JSON value shapes built from codecs and shared across your powers."
---

A [data type](/docs/datapack/introduction/data-types) is any reusable value shape a field can accept, such as an attribute modifier, a status effect or a rope endpoint. In Apoli a data type is a codec: define it once, and reference it from as many power, action and condition codecs as you like.

## A codec is a data type

Say your powers need a "swing" value, made of an axis and an amount:

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

There is no registry to touch, because the codec travels with the field that uses it.

## Single or list

Many Apoli fields accept one value or an array. A small helper exposes both:

```java
public static final Codec<List<Swing>> LIST_OR_SINGLE =
    Codec.either(Codec.list(Swing.CODEC), Swing.CODEC)
        .xmap(e -> e.map(l -> l, List::of),
              l -> l.size() == 1 ? Either.right(l.get(0)) : Either.left(l));
```

Then `LIST_OR_SINGLE.fieldOf("swings")` accepts both forms. That is how `modifier` and `modifiers`, or `effect` and `effects`, work.

## Reusing Apoli's data types

Prefer Apoli's existing codecs over writing your own. They are public:

| Codec | JSON |
| --- | --- |
| `AttributeModifier.CODEC` | `{ operation, value, attribute }` |
| `Comparison.CODEC` | `"<="` |
| `Space.CODEC`, `Shape.CODEC` | `"local"`, `"sphere"` |
| `HudRender.CODEC` | The resource bar settings |
| `Expression.FLOAT_OR_EXPR` | A number or an [expression](/docs/addon/systems/expressions) |

Using these keeps your JSON consistent with the rest of Apoli, and fixes and aliases then apply to your fields as well.

## Aliasing field names

To accept a legacy field name for a data type, use the [field alias helpers](/docs/addon/api/aliasing) at registration instead of branching inside the codec.
