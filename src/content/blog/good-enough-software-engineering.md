---
title: "Good Enough Software Engineering: Why Over-Engineering Costs More Than Failure"
description: "Good enough software engineering is a strategy, not a compromise. Learn how to match reliability controls to business impact and stop over-engineering."
date: "2026-07-27"
author: "Joel Karr"
tags: ["software-craft", "engineering-leadership", "decision-making"]
slug: "good-enough-software-engineering"
readingTime: "8 min read"
image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200"
imageAlt: "Engineer weighing tradeoffs at a desk with a laptop and handwritten notes"
---

I was walking up to historic Wrigley Field for a Cubs game, buzzing with excitement, when I opened the ticket app I'd checked minutes earlier. Instead of my ticket, I got a spinning icon. The line kept moving. I kept refreshing. By the time I reached the attendant, the screen was still loading.

She smiled and said, "This happens all the time. Just give it a couple more seconds."

The ticket appeared. I got in. Total damage: a brief rush of panic, embarrassment, and relief. Early in my career, I would have called that failure inexcusable. Twenty years of building software later, I've come to a different conclusion — and it's the heart of what I call good enough software engineering. The team behind that app made a deliberate decision about how much reliability was enough, and they were right.

## The Team That Was Too Good to Ship

Here's the puzzle that changed my thinking. I once worked with an engineer who was widely respected for his command of complex architectural patterns. He was the person other teams called when nobody else could solve a problem. His designs were sound. On paper, his team should have been one of the highest-performing in the organization.

They weren't.

The team usually had a working solution early. Core functionality was done, demos looked promising. But weeks would pass before anything reached production. By the time the business could actually use a new feature, what should have been a clear win had turned into crisis management for the tech leadership.

The team wasn't disorganized, blocked, or slow. It took a director shadowing them to spot the pattern. After finishing the original scope, they would start hunting edge cases. What if a user closed their browser mid-workflow? They added state persistence. What if saving failed? They built retry logic and recovery notifications. What if two requests arrived out of order? More safeguards.

Every one of those changes made the software more reliable. Individually, none of the work was unreasonable — it was the kind of engineering most teams aspire to. But from the business's perspective, restarting a workflow was an inconvenience, not a failure. It happened rarely, and the impact was limited. The team had built software that was excellent in isolation and misaligned in context.

That's the trap. Modern software lives in a world with dozens of ways to fail: browsers close unexpectedly, networks drop packets, dependencies time out, users click things nobody anticipated. Every experienced team already knows the best practices — testing, logging, alerting, retries. The knowledge isn't the bottleneck. The critical skill is deciding **which risks are worth paying to prevent**.

## Good Enough Software Is a Strategy, Not a Compromise

The mental shift that helps most is thinking in terms of *controls*. Mitigating risk rarely means eliminating it. It means deciding, in advance, how you'll respond when something goes wrong.

Take a dependent API that occasionally fails. One control is an automatic retry: the system recovers silently and the user never knows. To an engineer, that feels like the responsible choice. Another control is far simpler: show the user an error message with guidance on what to do next.

Both reduce risk. But at wildly different cost. Automatic retries drag in traffic spikes, cascading failures, back-off strategies, and observability. They need tuning and ongoing maintenance. An error message shifts recovery to the user — minor friction in exchange for dramatically lower system complexity.

The question is never whether a more reliable system *can* be built. It's whether the additional reliability justifies its cost. How often does the failure occur? What's the impact when it does? Is the user blocked or merely inconvenienced? What happens when the retry itself fails?

Teams skip these questions and default to the most robust control they know how to build. It feels safer. It feels more professional. It's certainly easier to defend in a postmortem. But every control becomes part of the system that must be understood, tested, and monitored — and as controls accumulate, they quietly shape how hard the system is to change.

## Why Over-Engineering Feels So Right: Loss Aversion

If good enough is rational, why is it so hard? The answer has less to do with technology and more to do with how people perceive risk.

In the 1970s, psychologists Daniel Kahneman and Amos Tversky showed that people don't weigh costs and benefits objectively. We experience losses far more intensely than equivalent gains — a tendency Kahneman called **loss aversion**. It shows up wherever decisions are made under uncertainty, which in software engineering is nearly all the time.

Engineers respond to *visible* failures, not to actual business impact. A small defect feels catastrophic when the wrong person notices it at the wrong time. When systems fail, the failure is loud: users complain, executives ask questions, postmortems get written. But the cost of extra engineering effort is nearly silent. Delayed features blend into shifting roadmaps. Extra work hides behind technical explanations. Nobody calculates the business value lost by shipping late.

So teams optimize for minimizing regret and blame instead of maximizing value. The safest *emotional* choice often carries the highest *operational* cost — and the complexity added in the name of safety eventually creates new risks of its own.

## A Practical Framework: Four Tiers of Control

Once you accept that not every failure should be prevented, you need a way to decide what response each failure deserves. In my book *Don't Think When You Code*, I frame this as thinking in tiers — and, critically, agreeing on the tier with the business *before* anything breaks.

### Tier 1: Visibility Only

Log and track errors so you know how often they occur. Nothing is shown to the user; nothing auto-corrects. This tier exists to answer one question: is this problem frequent or impactful enough to justify further investment? If the answer is no, logging alone is sufficient. **Choosing not to build additional controls is a success, not a failure.**

### Tier 2: User Notification

Instead of failing silently, tell the user something went wrong and what to do next. The failure stays explicit, confusion goes down, and system complexity barely moves.

### Tier 3: Automatic Retries

The system attempts to recover on its own; the user may never see the failure. Used intentionally, this meaningfully improves experience — but you're now buying back-off logic, cascading-failure protection, and monitoring along with it.

### Tier 4: Fallback Behavior

When the primary path fails, take an alternate route: a backup service, cached data. Maximum resilience, maximum cost, including long-term maintenance and recovery work.

None of these is universally correct. Problems arise when teams default to the highest tier without asking whether the cost matches the business value — or when the tier decision lives only inside engineering, while the people most affected by the tradeoff never agreed to it. When responses are agreed upon in advance, teams reduce fear, avoid blame-driven decisions, and revisit tradeoffs deliberately as conditions change.

## Absorbing Risk Together

You can never remove risk entirely. But you can decide, together, how it will be absorbed.

That ticket app at Wrigley failed at the worst possible moment — and it didn't matter. The attendant knew what to do. The system recovered in seconds. Somewhere, an engineering team decided that an occasional slow load was acceptable, that preventing every failure wasn't worth the cost. They were right.

The over-engineering team? They eventually shipped. But by then the business had moved on, and a feature that should have been a win became a case study in misaligned effort.

Good enough software engineering isn't lowering your standards. It's raising your judgment: knowing which failures to prevent, which to absorb, and which to simply make visible. The next time you're tempted to handle every edge case, ask what it costs *not* to handle it. If the answer is "minor inconvenience," you might already be done.

This is one chapter's worth of ideas from *Don't Think When You Code*, where I dig into how engineers can turn judgment calls like these into trained instinct — so the right tier of response comes to mind before the debate even starts. If deciding faster with less second-guessing sounds useful, the book walks through the full system.

## FAQ

### Isn't "good enough" just an excuse for cutting corners?

No. Cutting corners is skipping decisions; good enough is making them deliberately. The difference is that you've explicitly evaluated frequency, impact, and cost — and agreed on the response with the business in advance.

### How do I convince my team to stop over-engineering?

Make the invisible costs visible. Estimate the business value of shipping earlier, then frame each proposed control as a purchase: what does it cost to build, test, and maintain, and what failure does it actually prevent? Loss aversion thrives in the dark.

### When should I use the highest tier of control?

When failure frequency and business impact justify it — payment flows, safety-critical paths, revenue-critical peak events. The point isn't that fallbacks are bad; it's that they should be a deliberate choice, not a professional reflex.
