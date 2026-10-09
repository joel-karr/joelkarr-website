---
title: "The Strangler Fig Pattern in Practice: How to Modernize Legacy Code Without Betting the Business"
description: "Learn how the strangler fig pattern helps you modernize legacy code safely: pick the right first slice, preserve hidden business logic, and protect focus."
date: "2026-10-09"
author: "Joel Karr"
tags: ["platform-modernization", "engineering-leadership", "software-craft"]
slug: "strangler-fig-pattern-legacy-modernization"
readingTime: "9 min read"
image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200"
imageAlt: "Sunlight filtering through a dense forest canopy, evoking a strangler fig slowly growing around its host tree"
---

The plan looked perfect on paper. Detailed milestones. Clear ownership. Some of the best engineers in Chicago, a consultant from Microsoft, and an executive team that had asked for "the latest and greatest of everything." We were going to rewrite a decade of Classic ASP into a cloud-native platform on Azure, all at once.

A few months later, the hushed conversations after standup told a different story. That project is where I learned, the hard way, why the **strangler fig pattern** is the most reliable way to modernize legacy code — and why the hardest part of it has nothing to do with technology.

## When a Legacy Rewrite Starts to Unravel

We weren't failing at any one thing. We were failing at trying to do everything.

On top of moving to the cloud, we were adopting domain-driven design, test-driven development, agile, ASP.NET MVC, and a stack of frameworks none of us had used in production. Every standup turned into a debate about naming conventions, test coverage, or which part needed to be rewritten *again* now that we understood the new patterns better.

The demos that had felt like great progress every two weeks slowed to a crawl. When we started testing the new application against the old one, it felt like we were sitting in boats lined up side by side. Every time we bailed a bucket of water out of one boat, it landed in another.

### The Hidden Business Logic in "Bad" Code

Here's what we underestimated: the value of the old, brittle code.

That legacy system handled partner attribution, pricing management, and a web of external API integrations. Thousands of partners sent us customers through links, and each one had a contract about how and for how long they'd get credit. Most contracts were similar. But over the years, special deals had been made — and the custom logic for those deals lived wherever an engineer happened to put it at the time. A landing page. The add-to-cart button. Somewhere after checkout.

Nobody had a spec for what the system *should* do. There was no audit process and no detailed test plan. Occasionally a partner noticed an anomaly, someone fixed it, and the fix became part of the system's hardened, undocumented behavior.

Every time we compared the new site to the old one, we found another pocket of business logic buried in an unexpected function. It felt wrong to copy that logic forward. But we were moving too many pieces at once to stop and redesign it properly.

That's the trap of legacy code modernization. The code looks like a liability, but it's actually a record of every edge case your business has ever survived.

## Spolsky's Warning About Rewriting From Scratch

Back then, Joel Spolsky's *Joel on Software* blog was required reading for engineers who cared about their craft. I quoted it so often that one of our team leads, Bill, started calling me "Spolsky" — we shared a first name, and I wore the nickname proudly.

So it stung when I went back and reread one of his most famous essays, "Things You Should Never Do, Part I." His argument: rewriting code from scratch is the single worst strategic mistake a software company can make. Old code is messy, but it carries years of bug fixes and hard-won knowledge about what works in production. Throw it away, and you get to rediscover every one of those lessons painfully. He pointed to Netscape, whose multi-year browser rewrite handed Microsoft the opening it needed.

The warning felt eerily familiar. We hadn't seriously considered an iterative approach because the full rewrite *felt* right. The old system couldn't scale and was too fragile to repair. Starting over felt like dropping a decade of baggage in one move.

But reality was setting in.

## What Is the Strangler Fig Pattern?

Martin Fowler named the pattern after something he saw on vacation. A strangler fig starts high in a tree's canopy, drawing nutrients from its host until its own roots reach the ground. Over time it envelops the entire tree. Eventually the host dies and decomposes, and only the fig is left standing.

Applied to software, the **strangler fig pattern** means you build new components around the edges of the old system, route traffic to them one piece at a time, and keep going until the legacy system has nothing left to do. Both systems run side by side the entire time. At every step, you have something working in production.

### Our Pivot: Two Systems, One Customer Experience

I proposed that we stop trying to launch everything and instead host a new site in Azure, using URL redirects to move customers between the legacy application and the new one. We'd manage some backend data syncs, but both systems could run simultaneously.

The first piece we moved was the listing page. It pulled its data entirely from a Lucene search index that was already updated by a background job, so it had an isolated data source. The existing landing pages kept handling all that tangled partner attribution logic. And the add-to-cart button on the new listing page simply redirected back to the old site.

There was one painful trade-off. The company had designed a full rebrand — new logo, new colors, new look and feel — to launch alongside the new technology. If the two systems were going to coexist, they had to look the same. We sat down with the business team and agreed: the rebrand would wait until the modernization was done.

That conversation mattered. Incremental modernization isn't just an engineering decision. It changes what the business gets, and when.

## How to Choose Your First Slice of Legacy Code

Choosing what to modernize first is the most important decision you'll make. The rule I use now is simple: **find the most business value with the least entanglement.**

The listing page fit perfectly:

- **High value.** It was high-traffic and central to the customer experience, so improvements were visible.
- **Low entanglement.** It had its own data store and clean interfaces to the landing pages and checkout.
- **Avoided the scariest logic.** We could replace it without touching partner attribution or payments.

When you look at your own legacy system, resist the urge to start with the part that annoys engineers most. Start with the part you can cleanly cut out and hand back to the business improved. Momentum and trust are worth more than elegance in the first slice.

## Protecting Focus: The Real Challenge of Incremental Modernization

Here's the part nobody warns you about. The hardest thing about the strangler fig pattern isn't the redirects, the data syncs, or the architecture. It's maintaining focus.

As soon as you replace one component, you discover its dependency on another. The natural reaction is, "While we're in here, let's modernize that too." Each of those decisions sounds reasonable on its own. Add them up and you've rebuilt the exact quagmire of uncertainty you were trying to escape — a big bang rewrite wearing an incremental costume.

### Make Scope Boundaries Visible

Before you start a slice, define its boundaries explicitly. Write them down somewhere the whole team sees regularly — not buried in a planning doc. What's in. What's out. Which legacy behaviors you're deliberately preserving as-is.

### Add Friction to "Just One More Thing"

Someone will always suggest expanding the scope. That's not a failure; it's engineers caring about quality. But the team should treat every expansion as a real conversation: is this truly required for this slice, or is it the first step down a slippery slope?

The goal isn't to say no to everything. It's to add *enough friction* to overcome the gravitational pull of one more small change. The teams that succeed at legacy modernization protect their focus relentlessly. The teams that fail let scope expand until they've recreated the problem they set out to avoid.

### Preserve First, Redesign Later

This was the hardest lesson for me to accept. Copying old, ugly business logic forward feels like defeat. But that logic is load-bearing. Move it intact, prove the new system behaves the same, *then* redesign it as its own focused slice — like a dedicated partner attribution service — once it's isolated and testable.

## The Quiet Finish Line

When we finally shut down the last virtual machine in the data center, almost no one noticed. There was no big celebration. Customers didn't buy more the next day. The system simply worked the same way it had the day before.

But the original tree was gone, fully replaced by our strangler fig.

The executives got the modern platform they asked for, even if it took longer than they'd hoped. And I'm convinced that a full rewrite would have taken far longer, been far more painful to stabilize, and cost us customers along the way.

That project taught me something I didn't learn in the cloud room, where I'd once rebuilt a search engine over a single weekend. Building fast under pressure is one skill. Resisting the temptation to rebuild everything at once is a harder one — and for anyone leading engineering teams, it's the one that matters more.

## Bringing the Strangler Fig Pattern to Your Team

If you're staring at a legacy system and the word "rewrite" is starting to float around your standups, try this:

1. **Inventory the hidden logic.** List the behaviors customers and partners depend on, especially the ones nobody can explain.
2. **Pick one slice** with high business value and low entanglement.
3. **Run old and new side by side**, routing traffic between them.
4. **Write the boundaries down** and make expanding them a deliberate conversation.
5. **Repeat** until the old system has nothing left to do.

The strangler fig pattern works because it replaces one giant, uncertain bet with a series of small, reversible ones — and because it forces you to respect the knowledge buried in legacy code instead of throwing it away.

This story is one chapter of my book, *Don't Think When You Code*, which is about building the habits, templates, and mental models that let engineers and leaders make better decisions under pressure — including the decision *not* to rewrite everything. If your team is facing a modernization project, or you just want to grow faster as an engineer, pick up a copy of *Don't Think When You Code* and start with the chapter on why big bang rewrites usually fail.
