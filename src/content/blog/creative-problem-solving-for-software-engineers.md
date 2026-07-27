---
title: "Creative Problem-Solving for Software Engineers: Where Good Ideas Actually Come From"
description: "Creative problem-solving for software engineers is a trainable process, not a gift. Learn the PAGES framework and five steps to breakthrough ideas."
date: "2026-07-27"
author: "Joel Karr"
tags: ["software-craft", "creative-problem-solving", "task-templates"]
slug: "creative-problem-solving-for-software-engineers"
readingTime: "8 min read"
image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=1200"
imageAlt: "A glowing lightbulb held against a dark background, representing creative breakthroughs in engineering"
---

We'd been stuck for months. Tens of thousands of restaurants on the platform, daily updates causing lock waits, search queries timing out under load. We'd tried everything we knew — maintenance scripts, execution plan tuning, indexes. Nothing got us close to the sub-second response time we needed.

What finally solved it wasn't a smarter index or a bigger server. It was a dating game show from 1990s MTV.

That experience taught me something I now consider a core engineering skill: creative problem-solving for software engineers isn't a personality trait you're born with. It's a process you can run on demand. In my book, *Don't Think When You Code*, I dedicate a full chapter to where new ideas come from — because once you understand the mechanics of creativity, you stop waiting for inspiration and start manufacturing it.

## The Problem That Standard Approaches Couldn't Solve

Back in 2010, I was working with an experienced database administrator on search for a high-traffic e-commerce site. Our database was highly normalized, which meant returning a collection of restaurants required joining over fifteen tables. Updating any restaurant meant potentially locking those tables, quickly creating a backlog of pending search queries.

The DBA built views to query against. We still couldn't hit the target. We had the skills and the experience. What we didn't have was a different way of seeing the problem.

So we started over — not with the technology, but with the definition of success: sub-second response time, filtering on twelve different fields, and returning full restaurant objects. Nothing else was off-limits.

Then we reached for an analogy.

## How a Game Show Fixed a Database

After a few analogies that didn't quite land, we settled on *Singled Out*, the MTV dating show. Fifty contestants compete for a date with a central player called the Picker. The Picker can't see the contestants. Instead, each time the Picker states a preference — favorite sport is basketball, say — contestants who don't match walk off the stage. Round by round, the crowd filters down to a final few.

That's a search engine. We stayed inside the analogy and kept asking questions. How would the host catch contestants who cheated by changing their answers? Probably by holding a single card listing every contestant's number alongside their answers to each question. One card, one glance, instant filtering.

Then we looked back at our system. Built with domain-driven design, it dealt in full restaurant objects as XML — parsed apart into many normalized tables on every update, then reconstructed with complex joins on every search. In the analogy, that was like the host keeping every detail about every contestant on individual cards. No wonder filtering was slow.

But we already knew the full set of filters customers could use — cuisine, star rating, and so on. So instead of joining fifteen tables, we could build a single flat table containing only the filterable fields, with the complete restaurant XML stored alongside them in one column. Query one table, get everything back. NoSQL and Lucene were gaining popularity at the time, but they weren't proven enough to bet the most critical part of our system on. This gave us the best of both worlds inside boring, reliable SQL.

Sub-second search. A game show host with an index card showed us what execution plans never could.

## Creativity Is a Trainable Skill, Not a Gift

Years later, as a student in the first iMBA class at the University of Illinois, I took an innovation course with Professors Jeffrey Loewenstein and Jack Goncalo. Like most people, I'd been told creativity was something you either had or didn't.

Their research said otherwise: creativity is a process that can be trained like any other skill. When they introduced their work on shifting perspectives, I immediately thought back to that restaurant search breakthrough. We hadn't gotten lucky. We had — without knowing it — run a repeatable procedure.

In *The Craft of Creativity*, Loewenstein and Matthew A. Cronin describe an approach where you identify each piece of a scenario, then systematically swap pieces out to change your perspective. Their framework is captured by the acronym PAGES: Parts (the components involved), Actions (the behaviors related to those parts), Goals (the outcomes you want), Events (occurrences that affect the situation), and Self-concept (the identities or roles of the people involved).

Though designed as a general creativity tool, PAGES feels tailor-made for software engineering.

### Applying PAGES to an Engineering Problem

Take an e-commerce search results page. Map it out: the parts are result cards, pagination, filters, the search bar, the API, and the database. The actions are entering search terms, clicking next page, applying filters. The goal is helping the user find the best match quickly. The events are real-time inventory and price changes. The self-concept is a customer looking for a product.

Now swap pieces. What if the results page displayed one item instead of a list? That forces users to give more information up front — could a large language model guide the filtering conversationally instead of through predefined fields? Then swap the self-concept: think like a salesperson instead of a customer. Showing one option loses the cross-sell opportunity, so maybe you add a small section of secondary recommendations under the LLM-driven primary result.

Each swap gives you a different angle. That's the point: you stop waiting for inspiration and start manufacturing it.

## A Five-Step Framework for Engineering Innovation

Creative problem-solving works best when it's focused. In the book I lay out a five-step framework that starts from what already works and innovates only where you're actually stuck.

### 1. Define the Challenge

Software engineering is tradeoffs, and teams lose sight of the original goal the moment one fix creates a new problem. Write down the specific technical challenge, and check back against it throughout. Example: route phone calls to an agent queue in under one second based on department and brand, where the system connects to multiple CRMs that each take 3–5 seconds to respond, at hundreds of calls per minute.

### 2. Choose an Existing Task Template

It's easier to start from something proven than from scratch. Pick a task template — a pre-built approach your team already trusts — that solves at least part of the challenge. For the routing problem, a Basic API template with read and write endpoints against a single data source covers the skeleton.

### 3. Identify the Shortfalls

List exactly where the template falls short. Does it meet performance requirements? Can it handle the scale? This keeps innovation aimed at real gaps rather than reinventing everything. Our Basic API template handled one data source; it couldn't handle multiple CRMs, and their 3–5 second responses blew the one-second budget.

### 4. Swap Parts

Pick the failing piece and swap it for an alternative — change the data store, replace a synchronous call with a cache, try a different messaging pattern. For call routing: replace the real-time CRM lookup with a cache of department and brand data, updated by triggers whenever a CRM changes. Fast responses, multiple CRMs supported. But a new risk appears: the cache can lag, and a stale entry routes a caller to the wrong queue.

### 5. Use Analogies When Swapping Isn't Enough

When part-swapping stalls, shift perspective entirely. We thought about airport security: you scan your boarding pass and get routed toward your terminal immediately — fast, usually correct, keeps traffic flowing. But gates change at the last minute, so monitors past security display updates while you're already moving.

That was the missing idea. Route the caller instantly using cached data, then re-check the CRM while they wait in the queue. If the CRM returns different information, shift the caller to the correct queue before they ever speak to an agent. The analogy didn't just hand us a solution — it revealed a gap that pure technical thinking had missed.

## Stop Working Harder on the Same Approach

The restaurant search problem stumped us for months. Then someone mentioned *Singled Out*, and suddenly we were talking about game show hosts with index cards instead of database administrators with execution plans. The technical constraint hadn't changed. Our perspective had.

That's the real lesson of creative problem-solving for software engineers: when you're stuck, the answer usually isn't more effort on the same approach. It's a deliberate shift in how you see the problem — mapped with PAGES, focused by task templates, and unlocked by analogies.

Chris Hardwick never knew he helped fix a database. But somewhere in that ridiculous MTV game show was an insight we couldn't have found any other way. If you want the full framework — along with the deliberate practice system that builds the pattern library your creativity draws on — it's all in *Don't Think When You Code*. Grab a copy, pick one problem that's had your team stuck for weeks, and run the five steps on it this sprint.

## FAQ

### Isn't creativity just natural talent?

Research from innovation scholars like Jeffrey Loewenstein says no. Creativity is a process of systematically shifting perspectives, and processes can be trained. Engineers who seem naturally inventive are usually running these mechanics intuitively.

### How do analogies actually help solve technical problems?

An analogy maps your problem onto a domain where your intuition works differently. Constraints that felt fixed in the technical framing become obviously changeable in the analogy — like realizing a game show host would never keep contestant data on separate cards.

### What if my team doesn't have task templates yet?

Start by documenting the approach behind your last three successful features: the architecture, the technology choices, the implementation steps. Those become your first templates, and your innovation process gets a proven foundation to build from.

### When should I innovate versus reuse a proven approach?

Innovate only at the identified shortfalls. If an existing template meets the requirements, use it and spend your creativity budget where the template genuinely fails — that's where breakthroughs pay for their risk.
