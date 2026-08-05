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

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `powers` | list of identifier | `[]` | The Apoli powers this origin grants. |
| `icon` | [Icon](/docs/datapack/data-types/icon) | — | Shown in the selection screen. An item or a texture. |
| `impact` | 0–3 | `0` | The "impact" dots — how strong the origin is. |
| `name` | [text](/docs/datapack/data-types/text-component) | auto | The origin's display name. |
| `description` | [text](/docs/datapack/data-types/text-component) | auto | The lore shown when selecting. |
| `order` | number | `0` | Sort position in the screen. |
| `loading_priority` | number | `0` | Higher wins when packs define the same id. |
| `unchoosable` | boolean | `false` | Exists but can't be picked (e.g. an admin origin). |
| `name_scroll_speed` | number | — | Speed a long name marquees at. |

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

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `texture` | [Identifier](/docs/datapack/data-types/identifier) | **required** for the texture form | Path to the PNG, relative to `assets/<namespace>/`. |
| `width` | [Integer](/docs/datapack/data-types/integer) | whole file | Width in pixels of the region to draw, measured from the top-left of the file. |
| `height` | [Integer](/docs/datapack/data-types/integer) | whole file | Height in pixels of the region to draw, measured from the top-left of the file. |

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

## Origins need a layer

An origin file alone doesn't appear in-game. It has to be placed into a **layer** — the slot the player chooses from. See [Layers](/docs/datapack/origins/layers).

## The `origins:` namespace

Installing Origins registers a **namespace alias**: every type Apoli provides also answers to `origins:` as well as `apoli:`. `origins:health` *is* `apoli:health` — same class, same fields, same behaviour. There is no separate Origins version of it.

```json
{ "type": "origins:health", "comparison": "<", "compare_to": 6 }
```

```json
{ "type": "apoli:health", "comparison": "<", "compare_to": 6 }
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

| Type | Kind | What it does |
| --- | --- | --- |
| [`origins:origin`](/docs/datapack/origins/origin) | Entity condition | Does this player have a given origin? |
| [`origins:copy_origin`](/docs/datapack/origins/copy_origin) | Bi-entity action | Copy the target's origin onto the actor's copy layer. |
| [`origins:transfer_origin`](/docs/datapack/origins/transfer_origin) | Bi-entity action | Steal, give or copy a whole origin between two players. |
| [`origins:store_origin`](/docs/datapack/origins/store_origin) | Entity action | Remember an origin under a named key. |
| [`origins:store_origin` (bi-entity)](/docs/datapack/origins/store_origin_bientity) | Bi-entity action | Remember the *target's* origin on the actor. |
| [`origins:apply_stored_origin`](/docs/datapack/origins/apply_stored_origin) | Entity action | Put a remembered origin back. |
| [`origins:store_value`](/docs/datapack/origins/store_value) | Entity action | Remember a piece of text. |
| [`origins:stored_origin`](/docs/datapack/origins/stored_origin) | Entity condition | Is an origin remembered? |
| [`origins:stored_value`](/docs/datapack/origins/stored_value) | Entity condition | Is this text remembered? |

The last six are the [origin storage](/docs/datapack/origins/storage) system. Origins also adds four [badge](/docs/datapack/origins/badges) types, and two fields to [`apoli:action_on_callback`](/docs/datapack/powers/action_on_callback) — that power is core Apoli, but its `entity_action_chosen` only fires when Origins is there to report the choice.
