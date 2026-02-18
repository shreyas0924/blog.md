---
title: "Hash Table Internals"
date: "2024-02-18"
published: true
description: Hash tables store key-value pairs. Every language has its own implementation — Python calls them dictionaries, Java has HashMaps, JavaScript uses objects.
tags: ['data structres', 'java']
---

## What are they used for?

Beyond direct use, hash tables are building blocks for:

- Classes and their members
- Variable lookup tables (symbol tables)

They provide constant time for **insertion**, **deletion**, and **lookups**.

---

## How they work

Two steps to construct a hash table:

**Step 1 — Application key → hash key**

```js
cat → 1983473
```

**Step 2 — Hash key → smaller key**

```js
1983473 → 13
```

Only specific data types can be used as keys — strings, integers, characters, etc. Custom types work too, as long as they implement a `hash` function.

```py
application domain  →  hash fn.  →  hash key integer domain
```

---

## Why not a naive array?

The simplest approach: pass key `k` through a hash function to get index `i`, store value `v` there.

It's not used because:

- Only works for small `n`
- Requires massive contiguous memory
- Most slots stay empty

---

## Mapping to a smaller range

The second step maps the hash output to a smaller integer range. Array size `m` grows in `O(k)` — same lookup benefits, optimal space.

---

## Dynamic resizing

When the table is full:

1. Size increases by a factor (2x, 3x, developer-defined)
2. All existing keys are remapped to the new array
3. New keys are accepted
