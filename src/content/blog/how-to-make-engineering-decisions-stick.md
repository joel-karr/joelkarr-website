---
title: "The Cost of Re-Deciding: How to Make Engineering Decisions Stick"
description: "Reopened decisions quietly drain engineering teams. Here's how to make engineering decisions stick by separating new information from new opinions."
date: "2026-08-08"
author: "Joel Karr"
tags: ["engineering-leadership", "decision-making", "team-alignment"]
slug: "how-to-make-engineering-decisions-stick"
readingTime: "8 min read"
image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200"
imageAlt: "Engineering team gathered around a table debating a decision, representing the hidden cost of reopening settled choices"
---

Most engineering teams worry about making the wrong decision. In my experience, that's rarely what kills a project. Teams are far more likely to fail from reopening good decisions than from making bad ones. If you want to make engineering decisions stick, you need something stronger than consensus in a meeting — you need a rule for when a decision is allowed to come back open.

I've watched this pattern destroy momentum on otherwise healthy teams, and it's one of the ideas I explore in depth in my book, *Don't Think When You Code*. Here's the story that made it click for me.

## When a Sound Plan Unravels Without a Single Flaw

Chris Babb was one of the core engineers behind a transportation management system his company had built from the ground up — a system that, after several acquisitions, all of Redwood Logistics now ran on. It was ahead of its time when it was built, but it was built for a different scale. The cracks were showing.

The highest-traffic area was a queue tracking the status of every truckload in the system. Logistics still runs on data formats that predate most modern software: EDI messages arriving from external carriers to report when a shipment is scheduled, picked up, and delivered, while users inside the brokerage update those same shipments through the application. All of it flowed through a desktop WPF application and in-memory queues straining under the company's growth.

Chris led the team through a methodical modernization plan: put APIs in front of the existing queues, migrate everything to read from the APIs, then swap the underlying queues one at a time to Azure Service Bus. Each step was designed so that if something went wrong, only one piece would be affected.

The team agreed. The plan was sound. They started building.

Then a senior engineer — deeply familiar with the current system, instrumental in keeping it running — raised a concern about message ordering in Service Bus. Chris heard him out. The team walked through it, confirmed the API layer would handle sequencing, and agreed to proceed.

Two weeks later, at standup, the same engineer brought it up again. Different angle, same core concern: failover scenarios. The team discussed it, reviewed Azure's SLA guarantees, walked through the rollback plan, and agreed — again — to proceed.

The third time, the room was quieter. The energy to defend the plan one more time just wasn't there. People started hedging. "Maybe we should pause and do a deeper spike on alternatives." Within a month, a migration plan everyone had agreed to was unraveling. No flaw had been discovered. One person's persistent concern simply wore down the team's willingness to hold the line.

## The Hidden Cost of Reopening Decisions

On the surface, those conversations looked like healthy debate — calm, controlled discussion of tradeoffs. Many teams would love to have that level of psychological safety and intellectual humility.

But the cost of rework builds invisibly. Changes in direction never fully propagate. Components drift apart. One change spawns a series of others. Technical debt accumulates not from bad decisions, but from decisions that never stayed decided.

Every reopened discussion burned hours. Engineers who had been building with confidence started second-guessing their own work. And here's the part that took me a while to see: nobody was doing anything wrong. Chris was doing what good leaders do — creating space for concerns. The engineer was doing what the culture encouraged — speaking up. The cost of that openness was accumulating anyway.

## Why Teams Keep Re-Deciding: Simon and Klein

In the years after World War II, Herbert Simon studied how organizations make decisions under uncertainty — exactly the conditions software engineers face daily. The dominant assumption was that people gather information, weigh alternatives, and select the best option. Simon observed something different: organizations never stopped deciding. Choices were endlessly refined long after action had begun.

His explanation was **bounded rationality**. Humans decide with limited information, limited attention, and limited cognitive bandwidth. Experts, he found, make a decision once it meets the constraints of the situation, then deliberately stop searching for alternatives. He called it **satisficing** — not because the decision is ideal, but because it's sufficient to act. When decisions stayed open, organizations slowed down. Everyone acted reasonably. No one acted decisively.

Decades later, psychologist Gary Klein got closer to what happens inside the room. Studying military commanders, ICU nurses, and emergency responders, Klein found that in over 80% of decisions, experts didn't compare options at all — they recognized the situation, matched it to experience, and committed. But he also found the biggest threat to good decisions in teams wasn't poor analysis. It was social dynamics overriding judgment: teams abandoning sound plans because someone with enough authority or persistence pushed hard enough to reopen the conversation.

That maps precisely onto engineering teams. Raising a concern costs the raiser almost nothing socially — they're just being thoughtful. But each time, the whole team must stop, re-engage arguments they've already worked through, and rebuild conviction. One person can raise concerns indefinitely. A team's willingness to defend the same decision has a shelf life. Eventually the math tips, and it becomes easier to let the persistent person win.

The deeper damage is what this teaches everyone else. If persistence beats evidence, some engineers learn to be the loudest voice. The rest learn to stop caring. Why commit to an architecture someone can undo next month by being more stubborn than you?

## The Durability Rule That Makes Engineering Decisions Stick

If you want to preserve momentum, you need a rule stronger than "let's keep talking." Here it is:

**Decisions are durable until new information enters the system. New opinions do not qualify.**

The mechanism is simple. The moment your team reaches a decision, write down the assumptions behind it. For the Redwood migration, that might have looked like: the in-memory queues can't handle post-acquisition volume; Azure Service Bus meets our throughput and reliability requirements; the top priority is stabilizing the system without changing functionality for users.

Those written assumptions do two things. They make the reasoning legible to anyone who joins later. And they create a clear threshold for reopening: if an assumption changes, revisit. If none have changed, the decision stands.

This isn't about silencing dissent. It's about deciding where dissent belongs in time. Before a decision, dissent is valuable. After a decision, only new information justifies reopening it.

### Four Things That Sound Like New Information (But Aren't)

Real new information is observable, not hypothetical; it wasn't available when you decided; and it directly challenges a stated assumption. Most of what comes up fails those tests, in one of four familiar shapes:

**"I've been thinking about it."** The most common, and the hardest to push back on, because it sounds responsible. But nothing new has been learned — the same inputs were reprocessed into a different conclusion. That's a change in opinion, not circumstances. The response: "Our decision rests on these assumptions, and none have changed. If one does, we'll absolutely revisit."

**"I read an article about a different approach."** Learning is valuable, but another company's choices don't change your requirements or deadlines. Capture the insight without undoing the work: add it to the decision framework for next time.

**"I talked to someone who had a bad experience."** This one might qualify — if their context genuinely matches yours. A team running the same workload at comparable scale hitting a concrete failure mode is worth examining against your assumptions. A vague bad feeling from a different system at a different scale is not.

**"What if something changes in the future?"** Pure speculation, and it kills more good decisions than the rest combined. Every decision could theoretically be wrong. The response: "We've identified the conditions that trigger a revisit. Has one happened?" If yes, reopen. If no, proceed.

### Watch the Language Around Past Decisions

Certain phrases function as quiet reopening mechanisms: "I'm still thinking about…," "I just want to sanity check…," "Before we go too far…" They sound like thoroughness, but they signal the decision isn't really closed. As teams practice the durability rule, the language shifts on its own — from "I've been thinking" to "this assumption may have changed because of what we observed last week." Dissent gets sharper and more valuable because it has to clear a bar.

## What Redwood Could Have Looked Like

Imagine Chris's team had decided with explicit assumptions written down. Two weeks later, when the message-ordering concern resurfaced, Chris asks one question: "Which assumption has changed?"

If the answer is none, the conversation is short — not dismissive, just clear. The team completes the API layer, migrates the first queue, and makes future decisions with real production data instead of hypothetical worry. Instead, the project stalled for weeks, undermined not by anything wrong with the architecture, but by the team's inability to let a good decision stay decided.

If decisions can be overturned by repetition, people stop committing. They hedge, wait to see which way the wind blows, and learn that nothing is ever really final. That's why learning to make engineering decisions stick matters more than getting any single decision perfect: teams are far more likely to fail from reopening good decisions than from making bad ones.

This chapter is one piece of a larger system I lay out in *Don't Think When You Code* — how deliberate practice, task templates, mental models, and durable decisions free your conscious mind for the problems that actually need it. If your team keeps relitigating settled choices, the book will show you how to draw the line between healthy debate and costly repetition. Grab a copy, write down your next decision's assumptions, and watch how much faster your team moves.
