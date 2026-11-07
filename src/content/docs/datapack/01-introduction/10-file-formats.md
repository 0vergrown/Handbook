---
title: File formats
description: "Apoli and Origins data files can be plain JSON, JSONC with comments and trailing commas, or JSON5."
---

Apoli and Origins read their data files in three formats, and the file extension picks the format:

| Extension | Format | What it allows on top of plain JSON |
| --- | --- | --- |
| `.json` | JSON | Nothing. |
| `.jsonc` | JSON with comments | Comments, and a comma after the last item of an object or array. |
| `.json5` | [JSON5](https://json5.org) | Everything `.jsonc` allows, plus [the JSON5 extras](#json5). |

The format only changes how the file is written. A power in `swim.jsonc` loads exactly like the same power in `swim.json`, and the ID still comes from the path without the extension, so `data/example/powers/swim.jsonc` is `example:swim`.

## Where they work

| Folder | Holds |
| --- | --- |
| `powers` | [Powers](/docs/datapack/introduction/powers) and [macros](/docs/datapack/introduction/macros), and with Origins the badges written inside them. |
| `global_powers` | [Global power sets](/docs/datapack/introduction/powers#global-powers). |
| `effects` | [Custom status effects](/docs/datapack/introduction/custom-status-effects). |
| `keybinds` | [Data-driven keybinds](/docs/datapack/data-types/key#data-driven-keybinds). |
| `skill_trees` | [Skill trees](/docs/datapack/skill-tree/skill-tree-json-format). |
| `origins` | [Origins](/docs/datapack/origins/overview), with Origins installed. |
| `origin_layers` | [Origin layers](/docs/datapack/origins/layers), with Origins installed. |
| `badges` | [Badges](/docs/datapack/origins/badges) in their own files, with Origins installed. |

> [!WARNING]
> Minecraft reads its own folders itself, so tags, recipes, loot tables, advancements and every other vanilla file still have to be `.json`. Minecraft ignores a `.jsonc` or `.json5` file there without a word.

## JSONC

A `.jsonc` file accepts two kinds of comment, anywhere that spaces are allowed. `//` starts a comment that runs to the end of the line, and `/*` starts one that runs until the next `*/`, across as many lines as it needs. The file can also leave a comma after the last item of an object or array:

```jsonc title="data/example/powers/swim.jsonc"
{
  "name": "Strong Swimmer",
  "description": "You move faster through water.",
  "type": "apoli:swim_speed",
  "modifier": {
    "operation": "multiply_total_multiplicative",
    "value": 0.5,
  },
}
```

This is the swimming power from [Getting started](/docs/datapack/introduction/getting-started) with a comma after each last item.

## JSON5

A `.json5` file accepts everything a `.jsonc` file does, and also:

- Names without quotes. A bare name ends at the first space, colon, comma or bracket, so a name that contains one of those still needs quotes. Values that are text always need quotes.
- Strings and names in single quotes.
- Hexadecimal numbers, such as `0x1F`, which is read as `31`.
- A `+` before a number, and a decimal point at the start or the end, as in `.5` and `5.`.
- `Infinity`, `-Infinity` and `NaN`.
- More characters as whitespace: form feed, vertical tab and Unicode spaces such as the no-break space.

```json5 title="data/example/powers/swim.json5"
{
  name: 'Strong Swimmer',
  description: 'You move faster through water.',
  type: 'apoli:swim_speed',
  modifier: {
    operation: 'multiply_total_multiplicative',
    value: .5,
  },
}
```

This is the same power again, with bare names, single quotes and `.5` for `0.5`.

## When a file exists twice

When two data packs have a file with the same ID, the pack higher in the load order wins, whatever the extensions. A `.jsonc` in an upper pack replaces a `.json` in a lower one.

Global power sets, custom status effects and origins check their `loading_priority` field first: the version with the highest value wins, and the load order only breaks a tie. Origin layers with the same ID are merged across packs, as [Layers](/docs/datapack/origins/layers) explains.

Inside one pack, two files with the same ID and different extensions are a mistake. Apoli keeps the `.json` over the `.jsonc` and the `.jsonc` over the `.json5`, and logs a warning that names both files:

```txt
[Apoli] Problem in power example:swim from data/example/powers/swim.json (pack file/example)
  - Defined twice in pack file/example (example:powers/swim.json5 and example:powers/swim.json); using example:powers/swim.json
```

## When a file doesn't parse

A file with a syntax error is skipped, and the rest of the pack still loads. The log names the file and its pack, gives the path to the value, the line and the column, prints that line with a caret under the spot, and says what was expected:

```txt
[Apoli] Couldn't load power example:swim from data/example/powers/swim.json (pack file/example)
  at $.name, line 3, column 3
    3 |   "description": "Swim faster."
      |   ^
  - Expected ',' or '}' after a value, found '"'
```

That message comes from a missing comma after the value of `name`. A comment or a trailing comma in a `.json` file is an error too, and the message names the extension that would accept it, such as `Use a .jsonc or .json5 file for comments`.

Text after the closing bracket of the file doesn't stop it loading. Apoli ignores it and logs a warning with the line where it starts.

## When a file parses but doesn't load

A file can be valid JSON and still be wrong for its type: an action type that doesn't exist, a required field that is missing, or text where a number belongs. Apoli finds the value that caused it and logs it in the same shape, so the caret points at the broken part even when it sits deep inside nested actions:

```txt
[Apoli] Couldn't load power example:blast from data/example/powers/blast.json (pack file/example)
  at $.entity_action.actions[1].type, line 8, column 17
    8 |       { "type": "apoli:explod", "power": 3 }
      |                 ^
  - Unknown entity_action type: apoli:explod
```

A power that fails like this is skipped. When only an optional field is wrong, Apoli drops that field, loads the rest of the power, and logs a warning that points at the field instead:

```txt
[Apoli] Problem in power example:regen from data/example/powers/regen.json (pack file/example)
  at $.interval, line 3, column 15
    3 |   "interval": "twenty",
      |               ^
  - Ignored the 'interval' field, everything else loaded. Not a number: "twenty" / Invalid expression "twenty": unknown variable 'twenty' (at index 0)
```

Two reasons joined by `/` mean the field accepts two forms, and the value fit neither. Sub-powers of an [`apoli:multiple`](/docs/datapack/powers/multiple) point into the file they were written in, so the path starts at the sub-power's key.

Origins, origin layers, badges, skill trees, keybinds, global power sets and custom status effects report problems the same way. Once all packs have loaded, one line sums them up by kind:

```txt
[Apoli] Data packs loaded with 2 errors and 1 warning (power 2, origin layer 1). Each one is logged above with its file and line; /apoli:dev_mode shows them in chat.
```

Players with [`/apoli:dev_mode`](/docs/datapack/commands/dev-mode) on see the same problems in chat.
