---
title: Expressions
description: "The compiled math engine behind number fields that read the world."
---

Many number fields, such as `amount`, `chance`, velocity components and `duration`, accept an expression as well as a constant: a bit of math that can read the entity's state. `"amount": "health * 0.5"` heals for half the entity's current health. This page is for addon authors who want their own fields to accept expressions.

## Accepting an expression

Use `Expression.FLOAT_OR_EXPR` instead of `Codec.FLOAT` for a field that should accept either a number or an expression string:

```java
public record Cfg(Expression amount) {}

Expression.FLOAT_OR_EXPR.fieldOf("amount").forGetter(Cfg::amount)
```

`INT_OR_EXPR` and `DOUBLE_OR_EXPR` do the same for whole numbers and doubles. A data pack can then write either form:

```json
{ "amount": 4 }
{ "amount": "2 + armor" }
```

## Evaluating it

Expressions are compiled once, when the pack loads, and are cheap to evaluate after that:

```java
double amount = cfg.amount().eval(entity);
double withValue = cfg.amount().eval(entity, current);
double withHolder = cfg.amount().evalWith(entity, container, current);
int rounded = cfg.amount().evalInt(entity);
```

`eval(entity)` finds the entity's power container by itself. The second argument, when there is one, is what the expression reads as `value`. `evalWith` takes a container you already have, which saves the lookup, and the `evalInt` forms round to the nearest whole number. `eval(level)` evaluates with no entity at all, for fields that only read the world. When the expression is a plain number, `constantValue()` returns it, and every `eval` returns it straight away.

The engine resolves variables (like `health`, `armor` and resource values) from that entity without allocating maps. Keep the compiled `Expression`, and never parse a string again at runtime.

## Contextual variables

Some triggers expose extra variables. In a damage context, `damage` is bound to the incoming amount, so a modifier can be `"damage * 0.5"`. These are set on a thread-local before evaluation and cleared afterwards, so read them and don't hold on to them.

## Performance

- Compile once and evaluate many times. Parsing happens at load, and `eval` is the hot path, which must stay free of allocations.
- A string that doesn't parse is rejected by the codec when the pack loads, so syntax mistakes never reach the hot path.
- Don't call `eval` more often than you need, and cache the result within a tick if it is used again.
