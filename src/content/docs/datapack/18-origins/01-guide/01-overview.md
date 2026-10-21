---
title: Origins
description: "Origins is the Apoli addon that bundles powers into origins for players to choose."
---

Origins is an addon built on Apoli. Apoli provides the [powers](/docs/datapack/introduction/powers), and Origins lets players pick a bundle of them at spawn. That bundle is an origin: a name, an icon, some lore and a list of Apoli powers.

Everything on this page is specific to Origins. Without the Origins mod you don't need any of it, and you can grant Apoli powers by command or from your own addon instead.

## An origin file

Origins live in `data/<namespace>/origins/`, and the file name is the origin's ID.

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
  "description": "You breathe water, but air is another matter."
}
```

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `powers` | [Array](/docs/datapack/data-types/array) of [power entries](#hiding-powers-in-the-gui) | `[]` | The Apoli powers this origin grants. |
| `icon` | [Icon](/docs/datapack/data-types/icon) | _optional_ | The item or texture shown in the selection screen. |
| `impact` | [Integer](/docs/datapack/data-types/integer) from 0 to 3, or `none`, `low`, `medium` or `high` | `0` | The impact dots that show how strong the origin is. [origins:impact](/docs/datapack/origins/impact) reads it back. |
| `name` | [Text Component](/docs/datapack/data-types/text-component) | _a translation key_ | The origin's display name. Without it, the translation key `origin.<namespace>.<path>.name` is used. |
| `description` | [Text Component](/docs/datapack/data-types/text-component) | _a translation key_ | The lore shown in the selection screen. Without it, the translation key `origin.<namespace>.<path>.description` is used. |
| `order` | [Integer](/docs/datapack/data-types/integer) | _last_ | The sort position in the screen. Origins are sorted by impact first, lowest first, then by `order`, and an origin without an `order` goes after those that have one. |
| `loading_priority` | [Integer](/docs/datapack/data-types/integer) | `0` | When several packs define the same ID, the highest value wins. |
| `unchoosable` | [Boolean](/docs/datapack/data-types/boolean) | `false` | The origin exists but can't be picked, as with an admin origin. |
| `name_scroll_speed` | [Float](/docs/datapack/data-types/float) | `1.0` | How fast a long name scrolls across its box. |
| `max_players` | [Integer](/docs/datapack/data-types/integer) | `-1` | How many players can hold this origin at once (see [Capping an origin](#capping-an-origin)). |
| `upgrades` | [Array](/docs/datapack/data-types/array) of [upgrades](#upgrading-into-another-origin) | `[]` | Conditions that turn this origin into another one (see [Upgrading into another origin](#upgrading-into-another-origin)). |
| `tags` | [String](/docs/datapack/data-types/string) or [Array](/docs/datapack/data-types/array) of strings | `[]` | Free-form labels on the origin. [origins:origin_tag](/docs/datapack/origins/origin_tag) tests them, so a condition can name a group of origins instead of listing IDs. |

## Upgrading into another origin

With `upgrades`, an origin becomes another one when the player meets a condition. Each entry names an [entity condition](/docs/datapack/entity-conditions) and the origin to change into. As soon as the condition holds, the player's origin on that layer is swapped for the new one and their powers are reconciled in place.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `condition` | [Entity Condition Type](/docs/datapack/entity-conditions) | _required_ | Tested against the holder. When it passes, the upgrade happens. |
| `origin` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The origin to change into. |
| `announcement` | [Text Component](/docs/datapack/data-types/text-component) | _optional_ | A message sent to the player when the upgrade happens. Without it, nothing is said. |

```json
{
  "icon": { "item": "minecraft:phantom_membrane" },
  "impact": 2,
  "powers": ["example:gliding"],
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

Entries are tested in order and the first one that passes wins, so put the most specific condition first. An entry that names the origin it is written in is ignored, and so is one that names an origin no pack defines.

Powers the two origins share are left alone, so a resource, cooldown or stored inventory that both grant survives the upgrade untouched. Only the powers that differ are revoked and granted.

An origin in a [swap pool](/docs/datapack/origins/swapping) upgrades too. The old entry leaves the pool and the new one takes its place, without disturbing whatever is swapped in.

> [!NOTE]
> The check runs on the server, once a second per player, and only while at least one loaded origin declares `upgrades`, so a pack without any pays nothing. Expensive conditions are still evaluated at that rate, so prefer cheap ones (an advancement, a resource, a tag) over a raycast.

## Capping an origin

`max_players` limits an origin to a number of players. Once that many hold it, nobody else can take it: it disappears from the choose screen, the random roll never lands on it, `auto_choose` and derived layers skip it, and a client that picks it anyway is refused with a message and shown the screen again.

| Value | Meaning |
| --- | --- |
| `-1` (default) | Use the layer's `max_players_per_origin`. |
| `0` | Unlimited, which takes the origin out of a capped layer's limit. |
| A number above 0 | At most that many players. `1` makes the origin exclusive to whoever takes it first. |

```json
{
  "icon": { "item": "minecraft:dragon_egg" },
  "impact": 3,
  "max_players": 1,
  "powers": ["example:dragon_flight"]
}
```

The cap counts the whole server, offline players included. The record lives in the world save, so a player who logs off keeps their slot. It is counted per layer and origin, so the same origin offered in two layers has a separate cap in each.

The current holder keeps the origin. A cap never revokes an origin someone already has, and being at the cap doesn't stop that holder from seeing it in the view screen. Swap pools count too: an origin granted into a [swappable layer's](/docs/datapack/origins/swapping) pool takes a slot.

> [!NOTE]
> Explicit grants aren't capped. `/origin set`, [origins:grant_origin](/docs/datapack/origins/grant_origin), [origins:transfer_origin](/docs/datapack/origins/transfer_origin) and [origins:copy_origin](/docs/datapack/origins/copy_origin) all go through regardless, so an operator or a data pack can always hand out an origin. Only selection by players is limited.

Layer-wide defaults go on the layer as [`max_players_per_origin`](/docs/datapack/origins/layers#capping-a-whole-layer), and `/origin cap` inspects and clears the record (see [the command](/docs/datapack/commands/origin#cap)).

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

The first is an item ID and the second a full [Item Stack](/docs/datapack/data-types/item-stack). The third draws a texture instead, so you don't have to register an item just to have a custom icon. This is the shared [Icon](/docs/datapack/data-types/icon) data type, and Apoli's skill trees take the same shapes.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `texture` | [Identifier](/docs/datapack/data-types/identifier) | _required_ for the texture form | The path to the PNG, relative to `assets/<namespace>/`. |
| `width` | [Integer](/docs/datapack/data-types/integer) | _the whole file_ | The width in pixels of the region to draw, measured from the top-left corner of the file. |
| `height` | [Integer](/docs/datapack/data-types/integer) | _the whole file_ | The height in pixels of the region to draw, measured from the top-left corner of the file. |

You don't usually need `width` and `height`. The file's real size is read from the PNG, and the whole image is scaled into the 16×16 icon slot, so a 16×16, 64×64 or 256×256 icon all work. Set them only to draw part of a larger file, such as the top-left 32×32 of a sprite sheet:

```json
{
  "icon": {
    "texture": "example:textures/gui/origins/sheet.png",
    "width": 32,
    "height": 32
  }
}
```

> [!NOTE]
> A texture icon is a plain image, with no enchantment glint, item tooltip or durability bar. Use the item form when you want those.

Icons larger than the slot are scaled down with smoothing, so fine detail and thin lines survive. An icon made at exactly 16×16 is drawn pixel for pixel.

## Powers come from Apoli

The `powers` list is plain Apoli power IDs. Nothing about them is specific to Origins, and they are the same powers you would write in any data pack. A good origin is usually one [`apoli:multiple`](/docs/datapack/powers/multiple) that bundles the traits, plus a couple of standalone powers, which keeps the selection screen readable.

## Hiding powers in the GUI

Each entry in `powers` is either a power ID or an object that groups several IDs behind an [entity condition](/docs/datapack/entity-conditions). The two forms can be mixed in one list.

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `condition` | [Entity Condition Type](/docs/datapack/entity-conditions) | _optional_ | While this fails, the group's powers are hidden from the origin's power list in the choose and view screens. |
| `powers` | [Array](/docs/datapack/data-types/array) of [Identifier](/docs/datapack/data-types/identifier) | `[]` | The power IDs in this group. |

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

Flight and slow falling always show. The double jump and air dash group stays hidden until the player earns `example:mastery` and then appears, so powers can be revealed as they unlock without changing the origin itself.

> [!IMPORTANT]
> The condition only filters what is displayed. Every power in the list is granted as soon as the origin is chosen, whatever the condition says. To keep a power inactive until something is true, put a `condition` on the power's own JSON, which is how Apoli already gates a power at no runtime cost. Use both together for a power that is neither visible nor active yet.

> [!NOTE]
> The condition is evaluated on the client, so it can only read state the client knows about. A layer's [conditioned origins](/docs/datapack/origins/layers#conditioned-origins) have the same limitation.

## Origins need a layer

An origin file on its own doesn't appear in game. It has to be placed in a layer, the slot the player chooses from. See [Layers](/docs/datapack/origins/layers).

## The `origins:` namespace

Apoli registers a namespace alias, so every type Apoli provides also answers to `origins:` as well as `apoli:`, with or without Origins installed. `origins:health` is `apoli:health`, with the same class, fields and behaviour. There is no separate Origins version of it.

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

Those two are the same condition. The alias exists because years of packs were written for the original Origins mod, before powers were split out into Apoli, and it keeps that JSON working unchanged.

For reading these docs, that means:

- Every power, action, condition, meta type and data type in the data pack reference can be written with either namespace, whether or not its page mentions it. Only the types listed below are Origins-only.
- The reference pages print the `apoli:` spelling, because that is what the mod registers. Wherever you see `apoli:x`, `origins:x` works too.
- Prefer `apoli:` in new packs, since that is the name the types are registered under.

> [!NOTE]
> The alias resolves on an Apoli server without Origins too, so a pack written with `origins:` type IDs keeps working there. This only applies to type IDs: power IDs like `origins:phantomize` are real Origins data pack content and have no `apoli:` equivalent.

## The types Origins adds

As an Apoli addon, Origins also registers Apoli types of its own in the `origins:` namespace. They work in any power's JSON exactly like the built-in Apoli types, but a power that uses one fails to load without Origins installed. The alias only works in one direction, so these types have no `apoli:` spelling.

| Type | Kind | What it does |
| --- | --- | --- |
| [`origins:origin`](/docs/datapack/origins/origin) | Entity condition | Checks whether the player has a given origin. |
| [`origins:origin_tag`](/docs/datapack/origins/origin_tag) | Entity condition | Checks whether the player's origin carries a given tag. |
| [`origins:impact`](/docs/datapack/origins/impact) | Entity condition | Compares the impact of the player's origins against a value. |
| [`origins:swapped`](/docs/datapack/origins/swapped) | Entity condition | Checks whether the player is wearing an origin from their swap pool. |
| [`origins:stored_origin`](/docs/datapack/origins/stored_origin) | Entity condition | Checks whether an origin is remembered. |
| [`origins:stored_value`](/docs/datapack/origins/stored_value) | Entity condition | Checks whether a piece of text is remembered. |
| [`origins:impact` (bi-entity)](/docs/datapack/origins/impact_bientity) | Bi-entity condition | Compares one player's impact against the other's. |
| [`origins:grant_origin`](/docs/datapack/origins/grant_origin) | Entity action | Gives the player a named origin, on a layer or into a swap pool. |
| [`origins:revoke_origin`](/docs/datapack/origins/revoke_origin) | Entity action | Takes an origin away from the player. |
| [`origins:force_swap`](/docs/datapack/origins/force_swap) | Entity action | Swaps the player to another origin from their pool. |
| [`origins:open_swap_menu`](/docs/datapack/origins/open_swap_menu) | Entity action | Opens the swap picker. |
| [`origins:store_origin`](/docs/datapack/origins/store_origin) | Entity action | Remembers an origin under a named key. |
| [`origins:apply_stored_origin`](/docs/datapack/origins/apply_stored_origin) | Entity action | Puts a remembered origin back. |
| [`origins:store_value`](/docs/datapack/origins/store_value) | Entity action | Remembers a piece of text. |
| [`origins:copy_origin`](/docs/datapack/origins/copy_origin) | Bi-entity action | Copies the target's origin onto the actor's copy layer. |
| [`origins:transfer_origin`](/docs/datapack/origins/transfer_origin) | Bi-entity action | Takes, gives or copies a whole origin between two players. |
| [`origins:store_origin` (bi-entity)](/docs/datapack/origins/store_origin_bientity) | Bi-entity action | Remembers the target's origin on the actor. |
| [`origins:action_on_swap`](/docs/datapack/origins/action_on_swap) | Power type | Runs an entity action when the player swaps origins. |
| [`origins:chose_origin`](/docs/datapack/origins/chose_origin) | Advancement trigger | Fires when the player takes an origin. |

The store and stored types make up the [origin storage](/docs/datapack/origins/storage) system. Origins also adds four [badge](/docs/datapack/origins/badges) types and two fields to [`apoli:action_on_callback`](/docs/datapack/powers/action_on_callback). That power is core Apoli, but its `entity_action_chosen` only runs when Origins is there to report the choice.
