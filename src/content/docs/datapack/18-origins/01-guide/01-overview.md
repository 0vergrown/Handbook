---
title: Origins
description: The addon that turns Apoli powers into choosable origins.
---

**Origins** is an addon built on Apoli. Apoli gives you [powers](/docs/datapack/introduction/powers); Origins gives players a way to *choose* a bundle of them at spawn. An **origin** is that bundle — a name, an icon, some lore, and a list of Apoli powers.

Everything on this page is Origins-specific. If you're not using the Origins mod, you don't need any of it — you can grant Apoli powers by command or your own addon instead.

## An origin file

Origins live in `data/<namespace>/origins/`. The file name is the origin's id.

```json
{
  "powers": [
    "origins:aqua_affinity",
    "origins:water_breathing",
    "origins:like_water"
  ],
  "icon": "minecraft:cod",
  "impact": 2,
  "name": "Merling",
  "description": "You breathe water — but air is another matter."
}
```

## Fields

| Field               | Type                                             | Default | Purpose                                              |
|---------------------|--------------------------------------------------|---------|------------------------------------------------------|
| `powers`            | list of [power entry](#hiding-powers-in-the-gui) | `[]`    | The Apoli powers this origin grants.                 |
| `icon`              | [Icon](/docs/datapack/data-types/icon)           | —       | Shown in the selection screen. An item or a texture. |
| `impact`            | 0–3                                              | `0`     | The "impact" dots — how strong the origin is.        |
| `name`              | [text](/docs/datapack/data-types/text-component) | auto    | The origin's display name.                           |
| `description`       | [text](/docs/datapack/data-types/text-component) | auto    | The lore shown when selecting.                       |
| `order`             | number                                           | `0`     | Sort position in the screen.                         |
| `loading_priority`  | number                                           | `0`     | Higher wins when packs define the same id.           |
| `unchoosable`       | boolean                                          | `false` | Exists but can't be picked (e.g. an admin origin).   |
| `name_scroll_speed` | number                                           | —       | Speed a long name marquees at.                       |
| `max_players`       | number                                           | `-1`    | How many players may hold this origin at once — see [Capping an origin](#capping-an-origin). |
| `upgrades`          | list of [upgrade](#upgrading-into-another-origin) | `[]`    | Conditions that turn this origin into another one — see [Upgrading into another origin](#upgrading-into-another-origin). |

## Upgrading into another origin

`upgrades` lets an origin **become** another one when the player meets a condition. Each entry names an
[entity condition](/docs/datapack/entity-conditions) and the origin to change into; the moment the
condition holds, the player's origin on that layer is swapped for the new one and its powers are
reconciled in place.

| Field | Type | Default | Purpose |
|---|---|---|---|
| `condition` | [Entity Condition](/docs/datapack/entity-conditions) | **required** | Tested against the holder. When it passes, the upgrade fires. |
| `origin` | [Identifier](/docs/datapack/data-types/identifier) | **required** | The origin to change into. |
| `announcement` | [text](/docs/datapack/data-types/text-component) | _optional_ | A message sent to that player when the upgrade fires. Left out, nothing is said. |

```json
{
  "icon": {
    "item": "minecraft:phantom_membrane"
  },
  "impact": 2,
  "powers": [
    "example:gliding"
  ],
  "upgrades": [
    {
      "condition": {
        "type": "apoli:advancement",
        "advancement": "minecraft:end/kill_dragon"
      },
      "origin": "origins:elytrian",
      "announcement": "You have slain the dragon. Your wings are whole."
    }
  ]
}
```

Entries are tested in order and the first one that passes wins, so put the most specific condition
first. An entry naming the origin it is written in is ignored, and so is one naming an origin no pack
defines.

Powers the two origins share are left alone, so a resource, cooldown or stored inventory that both
sides grant survives the upgrade untouched; only the powers that differ are revoked and granted.

An origin sitting in a [swap pool](/docs/datapack/origins/swapping) upgrades too — the old entry
leaves the pool and the new one takes its place, without disturbing whatever is swapped in.

> The check runs on the server, once a second per player, and only while at least one loaded origin
> declares `upgrades` — a pack that uses none pays nothing. Conditions that are expensive to evaluate
> are still evaluated at that rate, so prefer cheap ones (an advancement, a resource, a tag) over a
> raycast.

## Capping an origin

`max_players` locks an origin to a limited number of players. Once that many hold it, nobody else can take it: it disappears from the choose screen, the random roll never lands on it, `auto_choose` and derived layers skip it, and a client that picks it anyway is refused with a message and shown the screen again.

| Value | Meaning |
|---|---|
| `-1` (default) | Inherit the layer's `max_players_per_origin`. |
| `0` | Unlimited — takes the origin out of a capped layer. |
| `n > 0` | At most `n` players. `1` makes the origin exclusive to whoever takes it first. |

```json
{
  "icon": {
    "item": "minecraft:dragon_egg"
  },
  "impact": 3,
  "max_players": 1,
  "powers": [
    "example:dragon_flight"
  ]
}
```

A cap is counted across the **whole server, including offline players** — the ledger lives in the world save, so a player who logs off keeps their slot. It is per layer *and* origin, so the same origin offered in two layers is capped separately in each.

The origin's current holder keeps it: a cap never revokes an origin someone already has, and being at the cap does not stop that holder from seeing it in the view screen. Swap pools count too — an origin granted into a [swappable layer's](/docs/datapack/origins/swapping) pool claims a slot.

> Explicit grants are not capped. `/origin set`, [origins:grant_origin](/docs/datapack/origins/grant_origin), [origins:transfer_origin](/docs/datapack/origins/transfer_origin) and [origins:copy_origin](/docs/datapack/origins/copy_origin) all go through regardless, so an operator or a datapack can always hand out an origin. Only player-driven selection is limited.

Layer-wide defaults live on the layer as [`max_players_per_origin`](/docs/datapack/origins/layers#capping-a-whole-layer), and `/origin cap` inspects and clears the ledger — see [the command](/docs/datapack/commands/origin#cap).

## The `icon` field

`icon` accepts three shapes:

```json
"icon": "minecraft:cod"
```

```json
"icon":{
   "item":"minecraft:potion",
   "components":{
      "minecraft:potion_contents":{
         "potion":"minecraft:water_breathing"
      }
   }
}
```

```json
"icon":{
   "texture":"example:textures/gui/origins/merling.png"
}
```

The first two are an item id and a full [Item Stack](/docs/datapack/data-types/item-stack); the third draws a texture instead, so you don't have to register a throwaway item just to have a custom icon. This is the shared [Icon](/docs/datapack/data-types/icon) data type — Apoli's skill trees take exactly the same shapes.

| Field     | Type                                               | Default                           | Description                                                                     |
|-----------|----------------------------------------------------|-----------------------------------|---------------------------------------------------------------------------------|
| `texture` | [Identifier](/docs/datapack/data-types/identifier) | **required** for the texture form | Path to the PNG, relative to `assets/<namespace>/`.                             |
| `width`   | [Integer](/docs/datapack/data-types/integer)       | whole file                        | Width in pixels of the region to draw, measured from the top-left of the file.  |
| `height`  | [Integer](/docs/datapack/data-types/integer)       | whole file                        | Height in pixels of the region to draw, measured from the top-left of the file. |

**You normally don't need `width`/`height`.** The file's real size is read from the PNG, and the whole image is scaled into the 16×16 icon slot — a 16×16, 64×64 or 256×256 icon all just work. Set them only to draw a *sub-region* of a larger file, e.g. the top-left 32×32 of a sprite sheet:

```json
{
  "icon": {
    "texture": "example:textures/gui/origins/sheet.png",
    "width": 32,
    "height": 32
  }
}
```

> A texture icon is a plain image: no enchantment glint, no item tooltip, no durability bar. Use the item form when you want those.

> Icons larger than the slot are downscaled with smoothing, so fine detail and thin lines survive instead of dropping out. An icon authored at exactly 16×16 is drawn pixel-for-pixel.

## Powers come from Apoli

The `powers` list is just Apoli power ids. There's nothing Origins-specific about them — they're the same powers you'd write in any data pack. A good origin is usually **one [`apoli:multiple`](/docs/datapack/powers/multiple)** that bundles the traits, plus a couple of standalone powers, so the selection screen stays readable.

## Hiding powers in the GUI

Each entry in `powers` is either a bare power id, or an object grouping several ids behind an [entity condition](/docs/datapack/entity-conditions). The two forms mix freely in one list.

| Field       | Type                                                 | Default | Purpose                                                                                                          |
|-------------|------------------------------------------------------|---------|------------------------------------------------------------------------------------------------------------------|
| `condition` | [entity condition](/docs/datapack/entity-conditions) | —       | While this fails, the group's powers are **hidden from the origin's power list** in the choose and view screens. |
| `powers`    | list of identifier                                   | `[]`    | The power ids in this group.                                                                                     |

```json
{
  "name": "Aviator",
  "powers": [
    "example:flight",
    "example:slow_falling",
    {
      "condition": {
        "type": "apoli:advancement",
        "advancement": "example:mastery"
      },
      "powers": [
        "example:double_jump",
        "example:air_dash"
      ]
    }
  ]
}
```

Flight and slow-falling always show. The double-jump and air-dash group stays hidden until the player earns `example:mastery`, then appears — an "unlockable powers" reveal that needs no change to the origin itself.

> **The condition is a display filter, not a gate.** Every power in the list is granted the moment the origin is chosen, condition or not. To make a power *inert* until something is true, put a `condition` on the power's own JSON — Apoli already gates a power's activity that way at no runtime cost. Use both together if you want a power that is neither visible nor active yet.

> The condition is evaluated **on the client**, so it can only read state the client knows about — the same limitation as a layer's [conditioned origins](/docs/datapack/origins/layers#conditioned-origins).

## Origins need a layer

An origin file alone doesn't appear in-game. It has to be placed into a **layer** — the slot the player chooses from. See [Layers](/docs/datapack/origins/layers).

## The `origins:` namespace

Installing Origins registers a **namespace alias**: every type Apoli provides also answers to `origins:` as well as `apoli:`. `origins:health` *is* `apoli:health` — same class, same fields, same behaviour. There is no separate Origins version of it.

```json
{
  "type": "origins:health",
  "comparison": "<",
  "compare_to": 6
}
```

```json
{
  "type": "apoli:health",
  "comparison": "<",
  "compare_to": 6
}
```

Those two are the same condition. The alias exists because years of packs were written for the original Origins mod, before powers were split out into Apoli — so that JSON keeps working untouched.

What this means when reading these docs:

- **Every** power, action, condition, meta-type and data type in the Data Pack reference can be written with either namespace, whether or not its page mentions it. Only the types listed below are genuinely Origins-only.
- The reference pages all print the `apoli:` spelling, because that is what the mod registers. Anywhere you see `apoli:x`, `origins:x` works too.
- Prefer `apoli:` in new packs. It does not imply a dependency on Origins.

> A pack that only uses `origins:`-spelled Apoli types still needs Origins installed for those ids to resolve. Writing them as `apoli:` removes that dependency.
>
> This is only about **type** ids. Power ids like `origins:phantomize` are real Origins data-pack content and have no `apoli:` equivalent.

## The types Origins adds

Origins is an Apoli addon, so as well as origins and layers it registers a handful of Apoli types in the `origins:` namespace. Use them in any power's JSON, exactly like the built-in Apoli types — but a power that uses one **fails to load without Origins installed**.

| Type                                                                               | Kind             | What it does                                            |
|------------------------------------------------------------------------------------|------------------|---------------------------------------------------------|
| [`origins:origin`](/docs/datapack/origins/origin)                                  | Entity condition | Does this player have a given origin?                   |
| [`origins:copy_origin`](/docs/datapack/origins/copy_origin)                        | Bi-entity action | Copy the target's origin onto the actor's copy layer.   |
| [`origins:transfer_origin`](/docs/datapack/origins/transfer_origin)                | Bi-entity action | Steal, give or copy a whole origin between two players. |
| [`origins:store_origin`](/docs/datapack/origins/store_origin)                      | Entity action    | Remember an origin under a named key.                   |
| [`origins:store_origin` (bi-entity)](/docs/datapack/origins/store_origin_bientity) | Bi-entity action | Remember the *target's* origin on the actor.            |
| [`origins:apply_stored_origin`](/docs/datapack/origins/apply_stored_origin)        | Entity action    | Put a remembered origin back.                           |
| [`origins:store_value`](/docs/datapack/origins/store_value)                        | Entity action    | Remember a piece of text.                               |
| [`origins:stored_origin`](/docs/datapack/origins/stored_origin)                    | Entity condition | Is an origin remembered?                                |
| [`origins:stored_value`](/docs/datapack/origins/stored_value)                      | Entity condition | Is this text remembered?                                |

The last six are the [origin storage](/docs/datapack/origins/storage) system. Origins also adds four [badge](/docs/datapack/origins/badges) types, and two fields to [`apoli:action_on_callback`](/docs/datapack/powers/action_on_callback) — that power is core Apoli, but its `entity_action_chosen` only fires when Origins is there to report the choice.