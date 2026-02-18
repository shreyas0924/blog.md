---
title: "On Building Things That Last"
date: "2024-11-15"
description: "Some thoughts on software craftsmanship and why the boring choices are usually the right ones."
tags: ["engineering", "craft"]
---

There's a certain kind of engineer who reaches for the newest tool for every problem. A new framework drops, and suddenly the old one is "legacy." A new pattern emerges, and everything written before is technical debt.

I've been that engineer. I understand the appeal.

But after watching several "revolutionary" tools fade into obscurity—taking entire codebases with them—I've developed a different instinct. Before adopting something new, I now ask: *will this still be here in five years?*

## The Boring Stack Wins

The most durable codebases I've worked on share a common trait: they're built on boring technology.

Postgres. Unix. HTTP. Git. These aren't exciting choices. Nobody writes breathless blog posts about choosing Postgres. But they're reliable precisely *because* they're boring—because thousands of engineers have beaten every edge case out of them over decades.

When you pick boring technology, you're not just picking a tool. You're picking a community of people who've solved problems you haven't encountered yet, documentation that answers questions before you think to ask them, and a hiring pool that isn't limited to early adopters.

## Complexity Is a Cost

Every abstraction you add is a bet that it will pay off. Some do. Most don't.

The temptation is to build for hypothetical scale, hypothetical requirements, hypothetical users. But the code you ship today has to be maintained by someone—often future you—who has lost all context on why the decisions were made.

Simple code that does the job is almost always better than elegant code that anticipates every possible future need. The future has a way of being different from what you expected anyway.

## What Lasts

The things that last in software aren't frameworks or patterns. They're:

- **Clear naming** — code that says what it does
- **Small functions** — things that do one thing well
- **Tests that document behavior** — not tests that mirror implementation
- **Boring dependencies** — libraries that won't disappear

None of these are novel observations. They've been said a thousand times. The hard part isn't knowing them—it's caring enough to practice them when the deadline is tomorrow and the new shiny thing is right there.

---

Building things that last is mostly about resisting temptation. The temptation to be clever, to be modern, to solve problems you don't have yet.

It's unglamorous work. But the codebases that survive and thrive are almost always the unglamorous ones.
