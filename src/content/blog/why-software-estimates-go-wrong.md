---
title: "Why Software Estimates Go Wrong: Shape the Problem Before You Plan"
description: "Software estimates go wrong when hidden assumptions surface too late. Here's how reframing the problem before planning saves teams from costly rework."
date: "2026-07-09"
author: "Joel Karr"
tags: ["software-craft", "engineering-leadership", "communication"]
slug: "why-software-estimates-go-wrong"
readingTime: "7 min read"
image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200"
imageAlt: "Engineering team gathered around a whiteboard debating a problem before committing to a plan"
---

"But every game you play costs thirty cents."

Silence followed.

We were gathered in a conference room, the product team and the software team debating a new checkout feature as if it were a basketball game. Everyone had been engaged and excited — until the engineer responsible for credit card processing dropped that line. The room froze. That moment taught me more about why software estimates go wrong than any postmortem I've ever attended. The problem is almost never the math. It's the assumptions nobody says out loud until it's too late to change course cheaply.

## The Analogy Game: Describing the Problem in a Different Language

That team had a habit during planning sessions: we would describe new features using the most obscure analogy we could find. The weirder, the better. It sounds like a distraction, but the exercise forced us to describe the problem in a language that didn't come preloaded with all the assumptions baked into standard software terms. It pushed us into different perspectives and regularly exposed holes in our understanding.

The discussion that day started with a feature request called EZ Checkout. The idea was simple: let users click a button on the listing page, confirm, and automatically charge the credit card on file — skipping the full shopping cart flow entirely.

The software team jumped straight into solutioning and quickly concluded it was easy. A couple of weeks of work, tops. We already had a cart processing function. All we needed to do was create a cart object with a single item and send it through the existing processor. Add some validation to confirm a saved card was on file, and we were done.

Then Richie translated it into our shared language.

"If our standard shopping cart is a full basketball game," he said, "then EZ Checkout is pop-a-shot."

We even had one of those arcade pop-a-shot machines in our break room. Sixty seconds to sink as many baskets as possible. Fewer rules, fewer players, no running clock. Faster. Cleaner. A perfect analogy.

That's when the credit card engineer spoke up.

"Every credit card payment we process costs a minimum of thirty cents. If every pop-a-shot game cost us thirty cents, our margins would collapse compared to selling the same amount of playing time as a standard game."

He was right. If a customer bought five gift certificates in one standard checkout, we paid the thirty-cent processing fee once. If they bought those same five certificates through EZ Checkout five separate times, it cost us a dollar fifty. The feature that had seemed simple ten minutes earlier had a fundamental flaw we hadn't seen.

Here's the part that still fascinates me: the thirty-cent fee was not new information. Plenty of people in that room already knew it existed. But it never surfaced in the conversation until an engineer reframed the checkout flow as a basketball game. The analogy didn't add knowledge to the room — it unlocked knowledge that was already there.

### Staying Inside the Analogy Until the Design Holds

Instead of abandoning the feature, we stayed inside the analogy. What if we didn't charge for each pop-a-shot game individually? What if we sold a membership — access to play up to ten times within an hour — and didn't charge until the player stopped playing for a while?

That solved the immediate problem: batch the orders into a single combined payment. But the analogy immediately exposed the next flaw. What happens if someone wins tickets playing pop-a-shot and tries to redeem them for a prize before we've charged them?

A simple answer followed just as quickly. When someone walks up to the prize counter to redeem tickets, charge them for whatever games they've already played. That translated cleanly back to the real system: customers had to visit their account page to see past purchases or use a gift card, and when they navigated there, we could settle any outstanding EZ Checkout orders.

Two design flaws found and fixed in a single meeting — before a line of code was written.

## Why Software Estimates Go Wrong: The Cost-of-Change Curve

Barry Boehm spent decades studying this exact dynamic. He began his career on some of the largest software systems of the mid-twentieth century, for the Department of Defense and the aerospace industry — places where the smallest mistake could be catastrophic.

This was long before agile development. Boehm and his colleagues ran long planning sessions, and requirements rarely changed once set. The engineers were capable and the projects well funded, yet Boehm watched the same frustrating pattern repeat. Costs escalated. Timelines slipped. Large portions of systems were reworked.

Managers responded the way managers still do: pad the estimates, hire more senior people. It didn't move the results. The failures were rarely caused by incompetence or lack of effort. So Boehm changed the question. Instead of studying productivity or execution speed, he studied *when* teams discovered they had misunderstood what they were building.

When misunderstandings were discovered early, the cost to correct them was small — a design change, a shift in approach. When the same misunderstanding surfaced later, after code had been written and tested, the cost increased dramatically. The later the discovery, the more expensive the correction. Boehm captured this relationship in what became known as the cost-of-change curve.

Estimation meetings sit at the very beginning of that curve. When management asks for a timeline, the team feels pressure to answer before anyone has walked through the assumptions. And the moment a date gets offered, it hardens into a commitment. Other teams start planning around it. Only later do the edge cases and constraints that were never discussed come due — and by then, the momentum of building makes every assumption expensive.

With EZ Checkout, the basketball analogy surfaced the unspoken constraints before we started writing code, placing us firmly on the cheap side of the curve. We still hit surprises along the way. Every project does. But the fundamental flaws were caught when fixing them cost a conversation, not a quarter.

## The Weight of "How Long Will This Take?"

Every software engineer knows the weight of that question. You're in a conference room, the product manager across the table. The team has been discussing a new feature, and the coding challenge makes sense even though the execution details aren't fully clear. Then comes the question everyone knows is coming.

"How long will this take to build?"

The product manager doesn't enjoy asking it. They know it will make everyone uncomfortable, and that someone will start listing caveats about why they can't possibly know. But it's not that the product manager is unwilling to be flexible — it's that businesses need timelines to plan. Roadmaps get shared. Marketing campaigns get scheduled. Sales commitments get made. Once those plans are in motion, changing the timeline has real consequences.

Here's what I've learned watching this moment play out for two decades: engineers are actually strong at estimating tasks. Ask how long a basic API will take and you'll get a solid answer. It's not the math that makes the room tense up. The stress comes from the unspoken expectations engineers can feel coming down the line but don't know how to expose or unpack in the moment.

Even though everyone in the room wants the same thing, these moments feel adversarial instead of collaborative. And that's the real tragedy — because the fix isn't better estimating. It's a better conversation before the estimate.

## Shaping the Problem Before the Plan

Great engineers learn to reframe the discussion before answering. The estimate isn't the deliverable; the shared understanding is. A few practices that make this repeatable:

**Translate the problem out of software terms.** Pick an analogy — the weirder, the better — and force the whole room to describe the feature inside it. Unfamiliar language strips away the preconceptions that standard terms carry, and knowledge people didn't think to mention starts surfacing.

**Treat the first "simple" solution as a hypothesis.** When the team concludes something is a couple of weeks of work in the first ten minutes, that's exactly when to slow down. Speed to a conclusion usually means the constraints haven't entered the conversation yet.

**Stay inside the frame until the design holds.** Don't drop the analogy the moment it exposes a flaw. Work the fix inside the same frame, then translate it back. Each round trip catches the next hidden assumption while it's still cheap.

**Name the cost-of-change curve out loud.** When someone pushes for a date before the assumptions are walked, make the trade explicit: an hour of problem-shaping now, or weeks of rework later. Boehm's research is on your side.

This is one of the ideas I explore in my book, *Don't Think When You Code* — how the practices that make engineering feel effortless are built deliberately, long before the pressure arrives. Shaping the problem before the plan is one of those practices. It turns the most adversarial moment in software planning into the most collaborative one.

The next time someone asks "how long will this take?", don't reach for a number. Reach for a better description of the problem — the answer gets easier, and a lot more accurate, once everyone is playing the same game. If that resonates, *Don't Think When You Code* goes deeper on this and the other systems that turn conscious effort into engineering instinct.
