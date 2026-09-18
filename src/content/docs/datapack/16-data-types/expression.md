---
title: "Expression (Data Type)"
description: "A String representing a mathematical expression."
navigation_title: "Expression"
---

A [String](/docs/datapack/data-types/string) representing a mathematical expression. Any field documented as accepting an Expression also accepts a plain number.

## Where Expressions work

| Consumer | Fields |
|----------|--------|
| [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | `value` |
| [Status Effect Instance](/docs/datapack/data-types/status-effect-instance) | `duration`, `amplifier` (evaluated against the entity receiving the effect) |
| [apoli:chance](/docs/datapack/meta-actions/chance) | `chance` |
| [apoli:resource](/docs/datapack/powers/resource) / [apoli:cooldown](/docs/datapack/powers/cooldown) | `min`, `max`, `start_value` / `cooldown` |
| [apoli:action_on_key_press](/docs/datapack/powers/action_on_key_press), [apoli:action_on_key_sequence](/docs/datapack/powers/action_on_key_sequence), [apoli:action_on_hit](/docs/datapack/powers/action_on_hit), [apoli:action_when_hit](/docs/datapack/powers/action_when_hit), [apoli:action_on_kill](/docs/datapack/powers/action_on_kill), [apoli:action_on_collision](/docs/datapack/powers/action_on_collision), [apoli:fire_projectile](/docs/datapack/powers/fire_projectile), [apoli:game_event_listener](/docs/datapack/powers/game_event_listener) | `cooldown` |
| Resource | `compare_to`, `position` |
| [apoli:modify_resource](/docs/datapack/entity-actions/modify_resource) | `position`, `from_position` |
| [Model Part Transformation](/docs/datapack/data-types/model-part-transformation) | `value`, and each keyframe's `value` |
| [apoli:entity_in_radius](/docs/datapack/entity-conditions/entity_in_radius), [apoli:block_in_radius](/docs/datapack/entity-conditions/block_in_radius) | `compare_to` |
| [apoli:change_resource](/docs/datapack/entity-actions/change_resource) | `change` |
| Entity actions | `add_velocity` (`x`/`y`/`z`), `damage` (`amount`), `heal`, `exhaust`, `feed` (`food`/`saturation`), `gain_air`, `add_xp` (`points`/`levels`), `set_on_fire` (`duration`) |

## Operators

| Operation              |                Operator(s)                | Syntax       | Description                                                        |
| ---------------------- | :---------------------------------------: | ------------ | ------------------------------------------------------------------ |
| Addition               |                    `+`                    | `a + b`      | Adds `a` and `b`.                                                  |
| Subtraction            |                    `-`                    | `a - b`      | Subtracts `b` from `a`.                                            |
| Multiplication         |                 `*`, `×`                  | `a * b`      | Multiplies `a` by `b`.                                             |
| Division               |                 `/`, `÷`                  | `a / b`      | Divides `a` by `b`.                                                |
| Fraction               |                    `_`                    | `a_b`        | Represents a fraction of `a / b`.                                  |
| Mixed number           |                    `_`                    | `c_a_b`      | `c + (a / b)`.                                                     |
| Exponentiation         |                    `^`                    | `a^b`        | Raises `a` by the power of `b` (right-associative).                |
| Factorial              |                    `!`                    | `a!`         | Factorial of `a`.                                                  |
| Modulo                 |                    `#`                    | `a # b`      | `a mod b`.                                                         |
| Percentage             |                    `%`                    | `a%`         | Decimal form of `a` as a percentage: `(a / 100)`.                  |
| Negation               |                    `-`                    | `-a`         | Negative of `a`.                                                   |
| Tetration (hyper-4)    |                   `^^`                    | `a^^b`       | `a` raised to itself `b` times.                                    |
| Integer division       |                    `\`                    | `a\b`        | Integer part of `a / b`.                                           |
| Implied multiplication |                   `()`                    | `a(b)`, `2x` | `a * b`.                                                           |
| Comparison             | `==`/`=`, `!=`/`<>`, `<`, `<=`, `>`, `>=` | `a < b`      | `1` if true, `0` if false, multiply or feed into `if()` to branch. |
| Boolean AND            |                `&&`, `&`                  | `a && b`     | `1` if both are non-zero, else `0`. Binds tighter than OR.         |
| Boolean OR             |                `\|\|`, `\|`               | `a \|\| b`   | `1` if either is non-zero, else `0`. Lowest precedence.            |

## Functions

| Name | Function | Syntax | Description |
|------|----------|--------|-------------|
| Square root | `sqrt()` | `sqrt(a)` | √a. |
| Absolute value | `abs()` | `abs(a)` | \|a\|. |
| Minimum / Maximum | `min()`, `max()` | `min(a, b, ...)` | Smallest / largest argument (any count). |
| Clamp | `clamp()` | `clamp(v, lo, hi)` | `v` limited to `[lo, hi]`. |
| Floor / Ceiling | `floor()`, `ceil()` | `floor(a)` | Round down / up. |
| Round | `round()` | `round(a)` | Round to nearest integer. |
| Sign | `sign()`, `sgn()` | `sign(a)` | `-1`, `0` or `1`. |
| Linear interpolation | `lerp()` | `lerp(a, b, t)` | `a + (b - a) * t`. |
| Branch | `if()` | `if(cond, then, else)` | `then` if `cond` is non-zero, else `else`. Only the taken branch is evaluated. |
| Logic | `and()`, `or()`, `not()` | `and(a, b, ...)` | Boolean logic over non-zero values, returns `1`/`0`. |
| Modulo / Power | `mod()`, `pow()` | `mod(a, b)` | Function forms of `#` and `^`. |
| Sine / Cosine / Tangent | `sin()`, `cos()`, `tan()`, `tg()` | `sin(a)` | Trigonometry (radians). |
| Secant / Cosecant / Cotangent | `sec()`, `csc()`, `cosec()`, `cot()`, `ctg()`, `ctan()` | `sec(a)` | Reciprocal trigonometry. |
| Inverse trig | `asin()`, `acos()`, `atan()` (+ `ar…`/`arc…` aliases) | `asin(a)` | Inverse trigonometry. |
| Two-argument arctangent | `atan2()` | `atan2(y, x)` | Angle of the point `(x, y)` in radians. |
| Hyperbolic | `sinh()`, `cosh()`, `tanh()` (`tgh`, `th`), `coth()` (`ctgh`, `cth`), `sech()`, `csch()` (`cosech`) | `sinh(a)` | Hyperbolic functions. |
| Inverse hyperbolic | `asinh()`, `acosh()`, `atanh()` (+ `ar…`/`arc…` aliases) | `asinh(a)` | Inverse hyperbolic functions. |
| Logarithms | `ln()`, `log2()`, `lg()`, `log10()` | `ln(a)` | Natural, binary and common log. |
| Arbitrary-base logarithm | `log()` | `log(base, a)` | Log of `a` in base `base`. |
| Exponential | `exp()` | `exp(a)` | e^a. |
| Cube root / n-th root | `cbrt()`, `root()` | `root(n, a)` | ∛a / n-th root of `a` (odd integer roots of negatives work). |
| Hypotenuse | `hypot()` | `hypot(a, b)` | √(a² + b²) without overflow. |
| Degrees / Radians | `deg()`, `rad()` | `deg(a)` | Radians → degrees / degrees → radians. |
| Average | `avg()`, `mean()` | `avg(a, b, ...)` | Arithmetic mean of the arguments (any count). |

Constants: `pi`, `e`.

## Random functions

| Name | Function | Syntax | Description |
|------|----------|--------|-------------|
| Random uniform continuous | `rUni()` | `rUni(a, b)` | Random real in `[a, b]`. |
| Random uniform discrete | `rUnid()` | `rUnid(a, b)` | Random integer in `[a, b]`. |
| Normal (Gaussian) | `rNor()` | `rNor(μ, σ)` | Drawn from `N(μ, σ)`. |
| Random from list | `rList()` | `rList(a, b, ..., z)` | Random element (only the chosen one is evaluated). |

## Random generators

| Name | Function | Description |
|------|----------|-------------|
| Random integer | `[Int]` | Random integer in `[-2^31, 2^31 - 1]`. |
| Random bounded integer | `[IntX]` | Random integer in `[-(10^X), 10^X]`, X = 1–9. |
| Random natural (incl. 0) | `[nat]` | Random integer in `[0, 2^31 - 1]`. |
| Random natural (incl. 0, bounded) | `[natX]` | Random integer in `[0, 10^X]`. |
| Random natural (excl. 0) | `[Nat]` | Random integer in `[1, 2^31 - 1]`. |
| Random natural (excl. 0, bounded) | `[NatX]` | Random integer in `[1, 10^X]`. |
| Random uniform `[0, 1]` | `[Uni]` | Random uniform real in `[0, 1]`. |
| Standard normal | `[Nor]` | Drawn from `N(0, 1)`. |

> `[` only starts a random generator when the brackets contain one of the names above. After `enchantment`, `nbt` or `data` it holds that function's arguments (see [Enchantment levels](#enchantment-levels) and [Reading NBT](#reading-nbt)). Everywhere else it indexes a table resource, so `example:table[Nat]` is a resource times a random natural, while `example:table[2]` is slot 2.

## Bound variables

Variables are resolved when the expression is compiled and read live from the entity each evaluation. If the evaluating context has no entity (e.g. `chance` in a block action), entity variables read `0`.

| Variable                                 | Meaning                                                                                                                                                               |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `value`                                  | Context-dependent: the current resource/cooldown value in resource operations; the unmodified base value inside an [Attribute Modifier](/docs/datapack/data-types/attribute-modifier). `0` elsewhere. |
| `damage`                                 | The damage amount of the hit, inside actions fired by `action_on_hit` / `action_when_hit` (including their self/target/attacker/bi-entity actions and anything nested in them, e.g. a `modify_resource` with `"value": "damage * 2"`). `0` outside a hit context. |
| `<namespace>:<path>`                     | Value of any Resource/Cooldown power the entity has (the full power id is the variable name). Missing → `0`.                                                          |
| `<namespace>:<path>_max`                 | The **maximum** of that Resource/Cooldown power, evaluated live — so it follows an expression-valued `max`. If no such resource exists, the whole name is read as a plain resource id instead. Missing → `0`. |
| `<namespace>:<path>_min`                 | The **minimum** of that Resource power, same rules as `_max`.                                                                                                          |
| `<namespace>:<path>_size`                | How many slots that Resource power has (`1` for a scalar resource). Same fallback rules as `_max`.                                                                     |
| `<namespace>:<path>[n]`                  | Slot `n` of a table Resource. `n` is itself an expression, so `example:table[example:cursor + 1]` works. Out of range → `0`.                                            |
| `distance`                               | Distance from the ray origin to the hit, inside [apoli:raycast](/docs/datapack/entity-actions/raycast) hooks. `0` elsewhere.                                            |
| `hit_x`, `hit_y`, `hit_z`                | The hit position, inside raycast hooks. `0` elsewhere.                                                                                                                 |
| `count`                                  | How many entities matched, inside [apoli:area_of_effect](/docs/datapack/entity-actions/area_of_effect) and raycast hooks. `0` elsewhere.                                |
| `index`                                  | The zero-based iteration number, inside per-entity hooks of `area_of_effect` and raycast. `0` elsewhere.                                                                |
| `power_count`                            | How many powers the entity holds.                                                                                                                                      |
| `health` / `max_health`                  | Current / maximum health.                                                                                                                                             |
| `absorption`                             | Absorption hearts.                                                                                                                                                    |
| `armor`                                  | Armor value.                                                                                                                                                          |
| `air` / `max_air`                        | Air supply ticks / maximum.                                                                                                                                           |
| `fall_distance`                          | Current fall distance in blocks.                                                                                                                                      |
| `x`, `y`, `z`                            | Entity position.                                                                                                                                                      |
| `yaw`, `pitch`                           | Head rotation in degrees.                                                                                                                                             |
| `velocity_x`, `velocity_y`, `velocity_z` | Current motion vector.                                                                                                                                                |
| `food`                                   | Food level (0–20). Players only, else `0`.                                                                                                                            |
| `saturation`                             | Saturation level. Players only, else `0`.                                                                                                                             |
| `xp_level`                               | Experience level. Players only, else `0`.                                                                                                                             |
| `xp_progress`                            | Progress in the current XP level (0.0–1.0). Players only, else `0`.                                                                                                   |
| `world_time`                             | The level's game time (ticks).                                                                                                                                        |
| `day_time`                               | The level's time-of-day (`# 24000` for the clock time).                                                                                                               |
| `moon_phase`                             | Moon phase, 0–7.                                                                                                                                                      |

### Actor and target

In a **bi-entity** context (any bi-entity action or condition), a bare variable reads the **actor** — the entity the power belongs to. Prefix it with `target_` to read the other side instead, and `actor_` is an explicit synonym for the default:

```json
{
  "type": "apoli:damage",
  "damage_type": "player_attack",
  "amount": "5 + ((max_health - health) * 0.35)"
}
```

As a bi-entity action that deals more damage the more health the **actor** is missing. `"target_max_health - target_health"` would read the victim instead.

The binding covers the **whole** bi-entity action, including anything nested inside it — so an [apoli:actor_action](/docs/datapack/bientity-actions/actor_action) wrapping a [apoli:modify_resource](/docs/datapack/entity-actions/modify_resource) can still read `target_health`, and a bare variable inside an `apoli:target_action` reads the target because that is the entity in scope there while `actor_` still reaches back to the actor.

Outside a bi-entity context there is no second entity, so `target_` and `actor_` both fall back to the one entity in scope. The prefixes work on the plain variables above, not on resource ids — use `target_resource(...)` and `actor_resource(...)` for those. That matters when an [apoli:target_action](/docs/datapack/bientity-actions/target_action) runs a coordinate-taking action such as [apoli:teleport](/docs/datapack/entity-actions/teleport): a bare `my_pack:aim_x` there reads the **target's** resource, which is `0` if the target does not have it, so write `actor_resource(my_pack:aim_x)` to read the number the caster stored.

> Bi-entity **conditions** do not set the binding; only actions do. That keeps the per-candidate condition path free of the extra bookkeeping.

### Inside a damage modifier

The `amount` of an [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) on [apoli:modify_damage_dealt](/docs/datapack/powers/modify_damage_dealt), [apoli:modify_damage_taken](/docs/datapack/powers/modify_damage_taken) and [apoli:modify_projectile_damage](/docs/datapack/powers/modify_projectile_damage) is an expression, and it is bound the same way: a bare variable reads the **power holder**, `actor_` reads the attacker and `target_` reads the entity being hit. `resource(...)` reads the holder's resource; `actor_resource(...)` and `target_resource(...)` reach the other side.

So on a `modify_damage_dealt`, `health` is the attacker's health and `target_health` is the victim's:

```json
{
    "type": "apoli:modify_damage_dealt",
    "modifier": {
        "operation": "set_total",
        "amount": "health"
    }
}
```

hits for exactly as much as the attacker currently has, and `"amount": "target_health"` hits for exactly the victim's remaining health. `nbt[...]` follows the same rule — `nbt[Health]` is the holder, `nbt[target, Health]` the other side.

### Functions that take an id

A few functions take a bare `namespace:path` id as their **first** argument. Any remaining arguments are ordinary expressions.

| Function | Meaning |
| --- | --- |
| `resource(id)` / `resource(id, n)` | The resource's value, or the value in slot `n`. The explicit form of `id` and `id[n]`. |
| `target_resource(id)` / `target_resource(id, n)` | The same, read from the **target** in a bi-entity context. |
| `actor_resource(id)` / `actor_resource(id, n)` | The same, read from the **actor** in a bi-entity context. |
| `resource_size(id)` | How many slots the resource has. |
| `resource_contains(id, v)` | `1` if any slot of the resource holds `v`, else `0`. |
| `resource_index_of(id, v)` | The first slot holding `v`, or `-1`. |
| `has_resource(id)` | `1` if the entity has that resource at all, else `0`. |
| `has_power(id)` / `target_has_power(id)` / `actor_has_power(id)` | `1` if the entity holds that power, else `0`. |

With the Origins mod installed, five more are registered:

| Function | Meaning |
| --- | --- |
| `has_origin(id)` / `target_has_origin(id)` | `1` if the player has that origin on any layer, counting an active swap. |
| `in_origin_pool(id)` | `1` if that origin is in any of the player's swap pools. |
| `has_origin_on(layer)` | `1` if the player has a non-empty origin on that layer. |
| `origin_impact(layer)` | The impact of the layer's active origin: `0` none, `1` low, `2` medium, `3` high. |

Origins also registers the plain variables `origin_count` (layers with a non-empty origin) and `is_swapped` (`1` while any layer is swapped).

Unknown variable names, unknown functions and any other syntax error are a **load-time error**: the power (or other JSON file) containing the expression fails to parse and the error message names the offending expression and position. There is no fallback engine — the compiled engine is the only evaluator (the bundled mXparser fallback was removed in July 2026; everything it was kept around for is now supported natively).

## Reading a table resource

A [apoli:resource](/docs/datapack/powers/resource) with a `size` above `1` stores several values. Index it with square brackets:

```json
{
  "type": "apoli:add_velocity",
  "x": "example:pos[0]",
  "y": "example:pos[1]",
  "z": "example:pos[2]"
}
```

The index is a full expression, so it can be computed. `example:table_size` gives the slot count, and `resource_contains(example:table, 5)` searches the whole table. An unindexed reference reads slot `0`.

## Reading a resource's bounds

Suffixing a resource id with `_max` or `_min` reads that resource's limit rather than its current value:

```json
{
  "type": "apoli:change_resource",
  "resource": "example:mana",
  "change": "example:mana_max / 10",
  "operation": "add"
}
```

The bound is evaluated at the same moment as the expression around it, so a resource whose `max` is itself an Expression (`"max": "20 + 5 * xp_level"`) reports its *current* ceiling, not a stale one.

If there is no resource power at the stripped id, the name is treated as an ordinary resource id — so a resource genuinely called `example:mana_max` still resolves to its own value. Bound lookups nest up to 8 deep; beyond that they read `0`, which stops a cycle (a `max` referring to its own `_max`) from hanging the server.

## Enchantment levels

`enchantment[...]` reads the level of an enchantment on the entity's gear:

```json
{
  "type": "apoli:heal",
  "amount": "10 + enchantment[minecraft:mending, weapon.mainhand, sum]"
}
```

The arguments, separated by commas:

Argument | Values | Default
---------|--------|--------
Enchantment | An enchantment id such as `minecraft:sharpness`. The namespace can be left out. | _required_
Where | An [Item Slot](/docs/datapack/data-types/item-slot) such as `weapon.mainhand`, `armor.chest` or `hotbar.3`; `armor` for the four armour slots; `hands` for both hands; `equipment` (also `any` or `all`) for every equipment slot. | `equipment`
Calculation | `sum` adds the levels found in each slot, `max` takes the highest — the same choice as [apoli:enchantment](/docs/datapack/entity-conditions/enchantment)'s `calculation`. | `sum`

Everything after the id is optional and can come in either order, so `enchantment[minecraft:mending, weapon.mainhand]`, `enchantment[minecraft:protection, armor, max]` and `enchantment[minecraft:feather_falling]` all work. On a single slot `sum` and `max` give the same number.

An enchantment that is not installed reads `0` rather than failing to load, so an expression can mention an enchantment from another mod. Hotbar, inventory and ender chest slots read players only; on any other entity they read `0`. In a bi-entity context, `target_enchantment[...]` and `actor_enchantment[...]` read the target's and the actor's gear, like the `target_` and `actor_` variables.

## Reading NBT

`nbt[...]` reads a number out of NBT data, the same way `/data get` does. `data[...]` is another name for it.

```json
{
  "type": "apoli:modify_resource",
  "resource": "example:ammo",
  "modifier": {
    "operation": "set_total",
    "amount": "nbt[Inventory[{id:\"minecraft:arrow\"}].count, sum]"
  }
}
```

The arguments, separated by commas:

Argument | Values | Default
---------|--------|--------
Source | `self` (also `entity`) — the entity the expression runs on; `target` or `actor` — the other entity in a bi-entity context; an [Item Slot](/docs/datapack/data-types/item-slot) — the item in that slot; `block, <x>, <y>, <z>` — the block entity at a position, where each coordinate is an expression of its own; `storage, <id>` — a command storage, as in `/data get storage`. | `self`
Path | An NBT path, written exactly as in `/data get`: `Health`, `Inventory[0].count`, `Items[{Slot:0b}].count`. | _required_
Aggregate | What to do when the path matches more than one value: `first`, `sum`, `max`, `min`, or `count` (also `size`) for how many values matched. | `first`

So `nbt[Health]`, `nbt[Inventory[].count, sum]`, `nbt[weapon.mainhand, components."minecraft:damage"]`, `nbt[storage, example:vars, counter]` and `nbt[block, x, y - 1, z, Items[].count, sum]` are all valid. The value is read the way `/data get` reports it: a number as itself, a string as its length, a list or compound as how many entries it holds, and a path that matches nothing as `0`.

The paths are whatever `/data get` shows on your version of the game — item data lives under `components` on 1.21.1 and under `tag` on 1.20.1.

> Writing an entity out to NBT is not free. Apoli does it at most once per entity per tick and shares the result between every `nbt[...]` that reads that entity during the tick, and caches items and block entities the same way — so a change made earlier in a tick shows up from the next tick. Where a plain variable exists (`health`, `food`, `xp_level`), use it: it reads the value directly. Expressions that run on the client see the client's copy of the entity, which carries much less data, and `storage` reads `0` there.

## NaN policy

If an Expression evaluates to `NaN` or `±Infinity` (e.g. division by zero, `sqrt(-1)`), Apoli substitutes `0`. Use `if()` for explicit fallbacks: `if(max_health > 0, health / max_health, 1)`.
