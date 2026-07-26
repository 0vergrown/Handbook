---
title: Expressions
description: The compiled math engine behind number fields that read the world.
---

Many numeric fields — `amount`, `chance`, velocity components, `duration` — accept not just a constant but an **expression**: a bit of math that can reference the entity's state. `"amount": "health * 0.5"` heals for half the entity's current health. This page is for addon authors who want their own fields to accept expressions.

## Accepting an expression

Use `Expression.FLOAT_OR_EXPR` instead of `Codec.FLOAT` for a field that should accept either a number or an expression string:

```java
public record Cfg(Expression amount) {}

Expression.FLOAT_OR_EXPR.fieldOf("amount").forGetter(Cfg::amount)
```

A data pack can now write either form:

```json
{ "amount": 4 }
{ "amount": "2 + armor" }
```

## Evaluating it

Expressions are **compiled once** at load, then evaluated cheaply per use. Evaluate against the entity, its container, and the level:

```java
float value = cfg.amount().eval(entity, container, level, /* fallback */ 0f);
```

The engine resolves variables (like `health`, `armor`, resource values) from that entity without allocating maps. Keep a compiled `Expression`; never re-parse a string at runtime.

## Contextual variables

Some triggers expose extra variables. In a damage context, `damage` is bound to the incoming amount, so a modifier can be `"damage * 0.5"`. These are set on a thread-local before evaluation and cleared after — read them, don't hold them.

## Performance

- **Compile once, eval many.** Parsing is done at load; `eval` is the hot path and must stay allocation-free.
- The built-in engine is the fast path; a general parser exists only as a fallback for expressions it can't compile. Prefer syntax the fast engine understands.
- Don't call `eval` more often than you need — cache the result within a tick if it's reused.

## See also

- [Performance](/docs/addon/systems/performance)
- Number fields in the [data-pack docs](/docs/datapack/entity-actions) marked *expression*.
