---
title: "Expression (Data Type)"
description: "A string holding a maths expression that is worked out when the game reads it, with variables for the entity and the world."
navigation_title: "Expression"
---

A [String](/docs/datapack/data-types/string) holding a maths expression. Any field documented as accepting an expression also accepts a plain number.

## Where expressions work

| Used by | Fields |
| --- | --- |
| [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | `value` |
| [Status Effect Instance](/docs/datapack/data-types/status-effect-instance) | `duration` and `amplifier`, evaluated against the entity receiving the effect |
| [apoli:chance](/docs/datapack/meta-actions/chance) | `chance` |
| [apoli:resource](/docs/datapack/powers/resource) and [apoli:cooldown](/docs/datapack/powers/cooldown) | `min`, `max` and `start_value`, and `cooldown` |
| [apoli:action_on_key_press](/docs/datapack/powers/action_on_key_press), [apoli:action_on_key_sequence](/docs/datapack/powers/action_on_key_sequence), [apoli:action_on_hit](/docs/datapack/powers/action_on_hit), [apoli:action_when_hit](/docs/datapack/powers/action_when_hit), [apoli:action_on_kill](/docs/datapack/powers/action_on_kill), [apoli:action_on_collision](/docs/datapack/powers/action_on_collision), [apoli:fire_projectile](/docs/datapack/powers/fire_projectile), [apoli:game_event_listener](/docs/datapack/powers/game_event_listener) | `cooldown` |
| [apoli:resource](/docs/datapack/entity-conditions/resource) (condition) | `compare_to` and `position` |
| [apoli:modify_resource](/docs/datapack/entity-actions/modify_resource) | `position` and `from_position` |
| [apoli:raycast](/docs/datapack/entity-actions/raycast) and [apoli:raycast](/docs/datapack/bientity-actions/raycast) | `distance`, `spacing`, `entity_distance`, `block_distance`, `radius`, `cone_angle`, `command_hit_offset` and `command_step` |
| [apoli:raycast](/docs/datapack/entity-conditions/raycast) (entity condition) | `distance`, `entity_distance` and `block_distance` |
| [apoli:raycast](/docs/datapack/bientity-conditions/raycast) (bi-entity condition) | `distance`, `radius` and `cone_angle` |
| [Model Part Transformation](/docs/datapack/data-types/model-part-transformation) | `value`, and each keyframe's `value` |
| [apoli:model_color](/docs/datapack/powers/model_color) | `red`, `green`, `blue` and `alpha`, also inside each `parts` entry, evaluated every frame on the client |
| [apoli:entity_in_radius](/docs/datapack/entity-conditions/entity_in_radius), [apoli:block_in_radius](/docs/datapack/entity-conditions/block_in_radius) | `compare_to` |
| [apoli:change_resource](/docs/datapack/entity-actions/change_resource) | `change` |
| [apoli:cooldown](/docs/datapack/item-actions/cooldown) (item action) | `ticks`, evaluated against the player holding the item |
| [apoli:aggro_at](/docs/datapack/bientity-actions/aggro_at) | `duration`, evaluated against the actor |
| Entity actions | `add_velocity` (`x`, `y` and `z`), `damage` (`amount`), `heal`, `exhaust`, `feed` (`food` and `saturation`), `gain_air`, `add_xp` (`points` and `levels`), `set_on_fire` (`duration`) |

## Operators

| Operation | Operators | Syntax | Description |
| --- | :---: | --- | --- |
| Addition | `+` | `a + b` | Adds `a` and `b`. |
| Subtraction | `-` | `a - b` | Subtracts `b` from `a`. |
| Multiplication | `*`, `×` | `a * b` | Multiplies `a` by `b`. |
| Division | `/`, `÷` | `a / b` | Divides `a` by `b`. |
| Fraction | `_` | `a_b` | The fraction `a / b`. |
| Mixed number | `_` | `c_a_b` | `c + (a / b)`. |
| Exponentiation | `^` | `a^b` | Raises `a` to the power of `b` (right-associative). |
| Factorial | `!` | `a!` | The factorial of `a`. |
| Modulo | `#` | `a # b` | `a mod b`. |
| Percentage | `%` | `a%` | `a` as a decimal percentage, `(a / 100)`. |
| Negation | `-` | `-a` | The negative of `a`. |
| Tetration (hyper-4) | `^^` | `a^^b` | `a` raised to itself `b` times. |
| Integer division | `\` | `a\b` | The whole number part of `a / b`. |
| Implied multiplication | `()` | `a(b)`, `2x` | `a * b`. |
| Comparison | `==`/`=`, `!=`/`<>`, `<`, `<=`, `>`, `>=` | `a < b` | `1` if true and `0` if false. Multiply by it or feed it into `if()` to branch. |
| Boolean AND | `&&`, `&` | `a && b` | `1` if both are non-zero, otherwise `0`. Binds tighter than OR. |
| Boolean OR | `\|\|`, `\|` | `a \|\| b` | `1` if either is non-zero, otherwise `0`. Lowest precedence. |

## Functions

| Name | Function | Syntax | Description |
| --- | --- | --- | --- |
| Square root | `sqrt()` | `sqrt(a)` | √a. |
| Absolute value | `abs()` | `abs(a)` | \|a\|. |
| Minimum and maximum | `min()`, `max()` | `min(a, b, ...)` | The smallest or largest argument, with any number of arguments. |
| Clamp | `clamp()` | `clamp(v, lo, hi)` | `v` kept between `lo` and `hi`. |
| Floor and ceiling | `floor()`, `ceil()` | `floor(a)` | Rounds down or up. |
| Round | `round()` | `round(a)` | Rounds to the nearest integer. |
| Sign | `sign()`, `sgn()` | `sign(a)` | `-1`, `0` or `1`. |
| Linear interpolation | `lerp()` | `lerp(a, b, t)` | `a + (b - a) * t`. |
| Branch | `if()` | `if(cond, then, else)` | `then` if `cond` is non-zero, otherwise `else`. Only the branch taken is evaluated. |
| Logic | `and()`, `or()`, `not()` | `and(a, b, ...)` | Boolean logic over non-zero values, returning `1` or `0`. |
| Modulo and power | `mod()`, `pow()` | `mod(a, b)` | Function forms of `#` and `^`. |
| Sine, cosine and tangent | `sin()`, `cos()`, `tan()`, `tg()` | `sin(a)` | Trigonometry, in radians. |
| Secant, cosecant and cotangent | `sec()`, `csc()`, `cosec()`, `cot()`, `ctg()`, `ctan()` | `sec(a)` | Reciprocal trigonometry. |
| Inverse trigonometry | `asin()`, `acos()`, `atan()` (plus `ar…` and `arc…` aliases) | `asin(a)` | Inverse trigonometry. |
| Two-argument arctangent | `atan2()` | `atan2(y, x)` | The angle of the point `(x, y)`, in radians. |
| Hyperbolic | `sinh()`, `cosh()`, `tanh()` (`tgh`, `th`), `coth()` (`ctgh`, `cth`), `sech()`, `csch()` (`cosech`) | `sinh(a)` | Hyperbolic functions. |
| Inverse hyperbolic | `asinh()`, `acosh()`, `atanh()` (plus `ar…` and `arc…` aliases) | `asinh(a)` | Inverse hyperbolic functions. |
| Logarithms | `ln()`, `log2()`, `lg()`, `log10()` | `ln(a)` | Natural, binary and common logarithms. |
| Logarithm in any base | `log()` | `log(base, a)` | The logarithm of `a` in base `base`. |
| Exponential | `exp()` | `exp(a)` | e^a. |
| Cube root and n-th root | `cbrt()`, `root()` | `root(n, a)` | ∛a, or the n-th root of `a`. Odd integer roots of negative numbers work. |
| Hypotenuse | `hypot()` | `hypot(a, b)` | √(a² + b²), without overflow. |
| Degrees and radians | `deg()`, `rad()` | `deg(a)` | Converts radians to degrees, or degrees to radians. |
| Average | `avg()`, `mean()` | `avg(a, b, ...)` | The arithmetic mean of the arguments, with any number of arguments. |

Constants: `pi` and `e`.

## Random functions

| Name | Function | Syntax | Description |
| --- | --- | --- | --- |
| Uniform continuous | `rUni()` | `rUni(a, b)` | A random real number between `a` and `b`. |
| Uniform discrete | `rUnid()` | `rUnid(a, b)` | A random integer between `a` and `b`. |
| Normal (Gaussian) | `rNor()` | `rNor(μ, σ)` | A number drawn from `N(μ, σ)`. |
| Random from a list | `rList()` | `rList(a, b, ..., z)` | A random element. Only the chosen one is evaluated. |

## Random generators

| Name | Function | Description |
| --- | --- | --- |
| Random integer | `[Int]` | A random integer from `-2^31` to `2^31 - 1`. |
| Random bounded integer | `[IntX]` | A random integer from `-(10^X)` to `10^X`, where X is 1 to 9. |
| Random natural (including 0) | `[nat]` | A random integer from `0` to `2^31 - 1`. |
| Random natural (including 0, bounded) | `[natX]` | A random integer from `0` to `10^X`. |
| Random natural (excluding 0) | `[Nat]` | A random integer from `1` to `2^31 - 1`. |
| Random natural (excluding 0, bounded) | `[NatX]` | A random integer from `1` to `10^X`. |
| Random uniform from 0 to 1 | `[Uni]` | A random real number from `0` to `1`. |
| Standard normal | `[Nor]` | A number drawn from `N(0, 1)`. |

> [!NOTE]
> `[` only starts a random generator when the brackets contain one of the names above. After `enchantment`, `durability`, `attribute`, `nbt` or `data` it holds that function's arguments (see [Enchantment levels](#enchantment-levels), [Durability](#durability), [Attributes](#attributes) and [Reading NBT](#reading-nbt)). Everywhere else it indexes a table resource, so `example:table[Nat]` is a resource times a random natural, while `example:table[2]` is slot 2.

## Bound variables

Variables are resolved when the expression is compiled and read live from the entity each time it is evaluated. If there is no entity where the expression is evaluated (such as `chance` in a block action), entity variables read `0`.

| Variable | Meaning |
| --- | --- |
| `value` | Depends on where it is used: the current resource or cooldown value in resource operations, and the unmodified base value inside an [Attribute Modifier](/docs/datapack/data-types/attribute-modifier). `0` everywhere else. |
| `damage` | The damage of the hit, inside actions fired by `action_on_hit` and `action_when_hit` (including their self, target, attacker and bi-entity actions and anything nested in them, such as a `modify_resource` with `"value": "damage * 2"`). `0` outside a hit. |
| `<namespace>:<path>` | The value of any resource or cooldown power the entity has, with the full power ID as the variable name. Missing reads `0`. |
| `<namespace>:<path>_max` | The maximum of that resource or cooldown power, read live, so it follows a `max` written as an expression. If no such resource exists, the whole name is read as a plain resource ID instead. Missing reads `0`. |
| `<namespace>:<path>_min` | The minimum of that resource power, with the same rules as `_max`. |
| `<namespace>:<path>_size` | How many slots that resource power has (`1` for a resource with one value). The same fallback rules as `_max` apply. |
| `<namespace>:<path>[n]` | Slot `n` of a table resource. `n` is itself an expression, so `example:table[example:cursor + 1]` works. Out of range reads `0`. |
| `distance` | The distance from the ray's origin to the hit, inside [apoli:raycast](/docs/datapack/entity-actions/raycast) hooks. `0` everywhere else. |
| `hit_x`, `hit_y`, `hit_z` | The hit position, inside raycast hooks. `0` everywhere else. |
| `count` | How many entities matched, inside [apoli:area_of_effect](/docs/datapack/entity-actions/area_of_effect) and raycast hooks. How many blocks are in the group, inside [apoli:connected_blocks](/docs/datapack/block-actions/connected_blocks) and the modifiers of an [apoli:modify_break_speed](/docs/datapack/powers/modify_break_speed) with `connected_blocks`. `0` everywhere else. |
| `index` | The zero-based iteration number, inside the per-entity hooks of `area_of_effect` and raycast and the `block_action` of `connected_blocks`. `0` everywhere else. |
| `held_ticks` | How many ticks the key was held, inside the `entity_action_released` of [apoli:action_on_key_press](/docs/datapack/powers/action_on_key_press). `0` everywhere else. |
| `power_count` | How many powers the entity holds. |
| `health`, `max_health` | Current and maximum health. |
| `absorption` | Absorption hearts. |
| `armor` | Armor value. |
| `air`, `max_air` | Air supply in ticks, and its maximum. |
| `fall_distance` | The current fall distance in blocks. |
| `x`, `y`, `z` | The entity's position. |
| `yaw`, `pitch` | The head's rotation in degrees. |
| `velocity_x`, `velocity_y`, `velocity_z` | The current motion vector. |
| `food` | The food level, from 0 to 20. Players only, otherwise `0`. |
| `saturation` | The saturation level. Players only, otherwise `0`. |
| `xp_level` | The experience level. Players only, otherwise `0`. |
| `xp_progress` | Progress through the current XP level, from 0.0 to 1.0. Players only, otherwise `0`. |
| `world_time` | The level's game time, in ticks. |
| `day_time` | The level's time of day (use `# 24000` for the time on a clock). |
| `moon_phase` | The moon phase, from 0 to 7. |
| `attack_charge` | How charged the entity's attack is, from `0.0` to `1.0`. During a melee hit it is the charge of that swing, read before the game resets it. Players only, otherwise `0`. |
| `biome_temperature` | The temperature of the biome at the entity's feet: `0.8` in plains, `2.0` in a desert, `0.0` on snowy plains and `-0.7` on frozen peaks. It is the same value [apoli:temperature](/docs/datapack/biome-conditions/temperature) compares. |
| `brightness` | How bright it is where the entity stands, from `0.0` to `1.0`, following the dimension's light curve and the time of day. It is the same value [apoli:brightness](/docs/datapack/entity-conditions/brightness) compares. |
| `light` | The light level at the entity's feet, from 0 to 15: the higher of block light and sky light, with sky light dimmed at night. |
| `block_light` | The block light at the entity's feet, from 0 to 15, from torches, lava, glowstone and the like. |
| `sky_light` | The sky light at the entity's feet, from 0 to 15, whatever the time of day. |
| `night_vision` | The strength of the entity's Night Vision effect: `0` without it, `1` while it has more than 10 seconds left, then flickering between `0.4` and `1` as it runs out, which is the value the game renders with. |

### Reading the surroundings

`biome_temperature`, `brightness` and the light levels turn the world into numbers, so a power can scale smoothly instead of switching between a ladder of conditioned copies. Feed one into a [Resource](/docs/datapack/powers/resource) a step at a time and the power ramps up and down instead of jumping at a biome border. This `heat` resource drifts toward `50 − 25 × temperature` (`30` in plains, `0` in a desert, `50` on snowy plains and `68` on frozen peaks) by at most one point a tick:

```json
{
  "type": "apoli:action_over_time",
  "interval": 1,
  "entity_action": {
    "type": "apoli:modify_resource",
    "resource": "example:heat",
    "modifier": {
      "operation": "add_base_early",
      "value": "clamp(round(50 - 25 * biome_temperature) - value, -1, 1)"
    }
  }
}
```

`value` is the resource's current value, so the step always goes toward the target and stops once it arrives. Anything else can then read `example:heat`, such as an [attribute](/docs/datapack/powers/attribute) modifier, a damage multiplier or a HUD bar.

The same idea lifts the dark. This [apoli:night_vision](/docs/datapack/powers/night_vision) fades in as the light fades out, so the world never looks darker than a dim evening:

```json
{
  "type": "apoli:night_vision",
  "strength": "clamp((0.5 - brightness) * 1.6, 0, 0.8)"
}
```

### Actor and target

In a bi-entity context (any bi-entity action or condition), a bare variable reads the actor, the entity the power belongs to. Add the `target_` prefix to read the other side instead, and `actor_` is an explicit way to write the default:

```json
{
  "type": "apoli:damage",
  "damage_type": "player_attack",
  "amount": "5 + ((max_health - health) * 0.35)"
}
```

As a bi-entity action, that deals more damage the more health the actor is missing. `"target_max_health - target_health"` would read the victim instead.

The binding covers the whole bi-entity action, including anything nested inside it. An [apoli:actor_action](/docs/datapack/bientity-actions/actor_action) wrapping an [apoli:modify_resource](/docs/datapack/entity-actions/modify_resource) can still read `target_health`, and a bare variable inside an `apoli:target_action` reads the target, because that is the entity in scope there, while `actor_` still reaches back to the actor.

Outside a bi-entity context there is no second entity, so `target_` and `actor_` both fall back to the one entity in scope. The prefixes work on the plain variables above, not on resource IDs, so use `target_resource(...)` and `actor_resource(...)` for those. That matters when an [apoli:target_action](/docs/datapack/bientity-actions/target_action) runs an action that takes coordinates, such as [apoli:teleport](/docs/datapack/entity-actions/teleport). A bare `my_pack:aim_x` there reads the target's resource, which is `0` if the target doesn't have it, so write `actor_resource(my_pack:aim_x)` to read the number the caster stored.

> [!NOTE]
> Bi-entity conditions don't set the binding, and only actions do. That keeps the path that checks each candidate free of the extra bookkeeping.

### Inside a damage modifier

The `amount` of an [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) on [apoli:modify_damage_dealt](/docs/datapack/powers/modify_damage_dealt), [apoli:modify_damage_taken](/docs/datapack/powers/modify_damage_taken) and [apoli:modify_projectile_damage](/docs/datapack/powers/modify_projectile_damage) is an expression, and it is bound the same way: a bare variable reads the power holder, `actor_` reads the attacker and `target_` reads the entity being hit. `resource(...)` reads the holder's resource, and `actor_resource(...)` and `target_resource(...)` reach the other side.

So on a `modify_damage_dealt`, `health` is the attacker's health and `target_health` is the victim's. This one hits for exactly as much health as the attacker has:

```json
{
    "type": "apoli:modify_damage_dealt",
    "modifier": {
        "operation": "set_total",
        "amount": "health"
    }
}
```

`"amount": "target_health"` would hit for exactly the victim's remaining health. `nbt[...]` follows the same rule: `nbt[Health]` is the holder, and `nbt[target, Health]` is the other side.

### Functions that take an ID

A few functions take a bare `namespace:path` ID as their first argument. Any other arguments are ordinary expressions.

| Function | Meaning |
| --- | --- |
| `resource(id)` / `resource(id, n)` | The resource's value, or the value in slot `n`. The explicit form of `id` and `id[n]`. |
| `target_resource(id)` / `target_resource(id, n)` | The same, read from the target in a bi-entity context. |
| `actor_resource(id)` / `actor_resource(id, n)` | The same, read from the actor in a bi-entity context. |
| `resource_size(id)` | How many slots the resource has. |
| `resource_contains(id, v)` | `1` if any slot of the resource holds `v`, otherwise `0`. |
| `resource_index_of(id, v)` | The first slot holding `v`, or `-1`. |
| `has_resource(id)` | `1` if the entity has that resource at all, otherwise `0`. |
| `has_power(id)` / `target_has_power(id)` / `actor_has_power(id)` | `1` if the entity holds that power, otherwise `0`. |

With the Origins mod installed, five more are registered:

| Function | Meaning |
| --- | --- |
| `has_origin(id)` / `target_has_origin(id)` | `1` if the player has that origin on any layer, counting an active swap. |
| `in_origin_pool(id)` | `1` if that origin is in any of the player's swap pools. |
| `has_origin_on(layer)` | `1` if the player has an origin that isn't empty on that layer. |
| `origin_impact(layer)` | The impact of the layer's active origin: `0` none, `1` low, `2` medium and `3` high. |

Origins also registers the plain variables `origin_count` (the number of layers with an origin that isn't empty) and `is_swapped` (`1` while any layer is swapped).

[Birdsong](/docs/compat/birdsong/overview#expression-variables) adds five voice chat variables, such as `voice_loudness` and `voice_speaking`. Without Birdsong, Apoli still accepts those five names and reads them as `0`.

Unknown variable names, unknown functions and any other syntax error are an error when the pack loads. The power (or other JSON file) containing the expression fails to parse, and the error message names the expression and the position of the problem. Apoli has one compiled expression engine and no fallback evaluator.

## Reading a table resource

An [apoli:resource](/docs/datapack/powers/resource) with a `size` above `1` stores several values. Index it with square brackets:

```json
{
  "type": "apoli:add_velocity",
  "x": "example:pos[0]",
  "y": "example:pos[1]",
  "z": "example:pos[2]"
}
```

The index is a full expression, so it can be worked out. `example:table_size` gives the slot count, and `resource_contains(example:table, 5)` searches the whole table. A reference without an index reads slot `0`.

## Reading a resource's bounds

Adding `_max` or `_min` to a resource ID reads that resource's limit instead of its current value:

```json
{
  "type": "apoli:change_resource",
  "resource": "example:mana",
  "change": "example:mana_max / 10",
  "operation": "add"
}
```

The limit is evaluated at the same moment as the expression around it, so a resource whose `max` is itself an expression (`"max": "20 + 5 * xp_level"`) reports its current ceiling, not an old one.

If there is no resource power at the ID without the suffix, the name is treated as an ordinary resource ID, so a resource really called `example:mana_max` still resolves to its own value. Lookups of limits nest up to 8 deep, and beyond that they read `0`, which stops a loop (a `max` that refers to its own `_max`) from hanging the server.

## Enchantment levels

`enchantment[...]` reads the level of an enchantment on the entity's gear:

```json
{
  "type": "apoli:heal",
  "amount": "10 + enchantment[minecraft:mending, weapon.mainhand, sum]"
}
```

The arguments, separated by commas:

| Argument | Values | Default |
| --- | --- | --- |
| Enchantment | An enchantment ID such as `minecraft:sharpness`. The namespace can be left out. | _required_ |
| Where | An [Item Slot](/docs/datapack/data-types/item-slot) such as `weapon.mainhand`, `armor.chest` or `hotbar.3`; `armor` for the four armour slots; `hands` for both hands; or `equipment` (also `any` or `all`) for every equipment slot. | `equipment` |
| Calculation | `sum` adds the levels found in each slot, and `max` takes the highest, the same choice as the `calculation` of [apoli:enchantment](/docs/datapack/entity-conditions/enchantment). | `sum` |

Everything after the ID is optional and can come in either order, so `enchantment[minecraft:mending, weapon.mainhand]`, `enchantment[minecraft:protection, armor, max]` and `enchantment[minecraft:feather_falling]` all work. On a single slot, `sum` and `max` give the same number.

An enchantment that isn't installed reads `0` instead of failing to load, so an expression can mention an enchantment from another mod. Hotbar, inventory and ender chest slots only read players, and on any other entity they read `0`. In a bi-entity context, `target_enchantment[...]` and `actor_enchantment[...]` read the target's and the actor's gear, like the `target_` and `actor_` variables.

## Durability

`durability[...]` reads how many more uses the item in a slot has before it breaks: its maximum durability minus the damage it has taken.

```json
{
  "type": "apoli:modify_damage_dealt",
  "modifier": {
    "operation": "add_base_late",
    "value": "if(durability[weapon.mainhand] > 0 && durability[weapon.mainhand] < 20, 4, 0)"
  }
}
```

This adds 4 damage while the held weapon has fewer than 20 uses left.

The one argument is an [Item Slot](/docs/datapack/data-types/item-slot), such as `weapon.mainhand`, `armor.head` or `hotbar.0`. An empty slot or an item without durability reads `0`, and an unbreakable item reads the durability it would have. Hotbar, inventory and ender chest slots only read players. In a bi-entity context, `target_durability[...]` and `actor_durability[...]` read the target's and the actor's items.

## Attributes

`attribute[...]` reads one of the entity's attributes, the same numbers the `/attribute` command reports:

```json
{
  "type": "apoli:heal",
  "amount": "attribute[minecraft:generic.max_health] - attribute[minecraft:generic.max_health, base]"
}
```

This heals by however much extra max health the entity's modifiers give it.

The arguments, separated by commas:

| Argument | Values | Default |
| --- | --- | --- |
| Attribute | An attribute ID such as `minecraft:generic.armor`. It can be written in quotes, as in `attribute['minecraft:generic.armor', get]`. | _required_ |
| Query | `get` is the value with every modifier applied, like `/attribute <target> <id> get`. `base` is the base value, like `/attribute <target> <id> base get`. `default` is the attribute's default value. `min` and `max` are the lowest and highest value the attribute allows. `has` is `1` if the entity has the attribute, otherwise `0`. `modifier, <modifier id>` is the amount of one modifier, like `/attribute <target> <id> modifier value get <modifier id>`, or `0` if the attribute doesn't carry it. `has_modifier, <modifier id>` is `1` if the attribute carries that modifier, otherwise `0`. | `get` |

So `attribute[minecraft:generic.armor]`, `attribute[minecraft:generic.movement_speed, base]`, `attribute[minecraft:generic.max_health, max]` and `attribute[minecraft:generic.attack_damage, modifier, example:sharp_claws]` are all valid. An entity that doesn't have the attribute at all, such as an entity that isn't alive or a mob the attribute isn't registered for, reads `0` for `get`, `base` and `modifier`.

Modifier IDs are written the way `/attribute` takes them on your version: `namespace:path` on 1.21.1 and a UUID on 1.20.1.

An attribute ID that doesn't exist is a load error that names the expression, so a typo shows up in the log instead of reading `0` without a word. In a bi-entity context, `target_attribute[...]` and `actor_attribute[...]` read the target's and the actor's attributes, like the `target_` and `actor_` variables.

> [!NOTE]
> Expressions that run on the client, such as the channels of [apoli:model_color](/docs/datapack/powers/model_color), only see the attributes the game sends to clients, such as armor, max health and movement speed. Others read the entity type's default there.

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

| Argument | Values | Default |
| --- | --- | --- |
| Source | `self` (also `entity`) for the entity the expression runs on; `target` or `actor` for the other entity in a bi-entity context; an [Item Slot](/docs/datapack/data-types/item-slot) for the item in that slot; `block, <x>, <y>, <z>` for the block entity at a position, where each coordinate is an expression of its own; or `storage, <id>` for a command storage, as in `/data get storage`. | `self` |
| Path | An NBT path, written exactly as in `/data get`, such as `Health`, `Inventory[0].count` or `Items[{Slot:0b}].count`. | _required_ |
| Aggregate | What to do when the path matches more than one value: `first`, `sum`, `max`, `min`, or `count` (also `size`) for how many values matched. | `first` |

So `nbt[Health]`, `nbt[Inventory[].count, sum]`, `nbt[weapon.mainhand, components."minecraft:damage"]`, `nbt[storage, example:vars, counter]` and `nbt[block, x, y - 1, z, Items[].count, sum]` are all valid. The value is read the way `/data get` reports it: a number as itself, a string as its length, a list or compound as how many entries it holds, and a path that matches nothing as `0`.

The paths are whatever `/data get` shows on your version of the game, so item data lives under `components` on 1.21.1 and under `tag` on 1.20.1.

> [!WARNING]
> Writing an entity out to NBT isn't free. Apoli does it at most once per entity per tick and shares the result between every `nbt[...]` that reads that entity during the tick, and it caches items and block entities the same way, so a change made earlier in a tick shows up from the next tick. Where a plain variable exists (`health`, `food`, `xp_level`), use it, because it reads the value directly. Expressions that run on the client see the client's copy of the entity, which carries much less data, and `storage` reads `0` there.

## NaN policy

If an expression comes out as `NaN` or `±Infinity`, for example from dividing by zero or `sqrt(-1)`, Apoli uses `0` instead. Use `if()` for an explicit fallback: `if(max_health > 0, health / max_health, 1)`.
