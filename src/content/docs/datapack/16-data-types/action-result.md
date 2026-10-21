---
title: "Action Result (Data Type)"
description: "A string that gives the result of an action, such as success or pass."
navigation_title: "Action Result"
---

A [String](/docs/datapack/data-types/string) that gives the result of an action.

## Values

| Value | Description |
| --- | --- |
| `consume_partial` | The action happens, but the actor's hand doesn't swing and no statistic goes up. |
| `consume` | The action happens, but the actor's hand doesn't swing. |
| `fail` | The action doesn't happen, and other actions are stopped too. |
| `pass` | The action doesn't happen, but other actions can still happen. |
| `success` | The action happens and the actor's hand swings. |
