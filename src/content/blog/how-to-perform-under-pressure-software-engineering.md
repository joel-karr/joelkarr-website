---
title: "How to Perform Under Pressure as a Software Engineer: Why Some Engineers Freeze and Others Act"
description: "Learning to perform under pressure as a software engineer isn't about temperament. Here's how to bound unknowns, shrink the problem, and act during outages."
date: "2026-08-14"
author: "Joel Karr"
tags: ["engineering-leadership", "incident-response", "decision-making"]
slug: "how-to-perform-under-pressure-software-engineering"
readingTime: "8 min read"
image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200"
imageAlt: "Engineer monitoring dashboards during a production incident, representing performing under pressure during an outage"
---

The call came two hours into the outage.

I was in a conference room with a software engineering team, triaging a failure that was rippling into every downstream system we owned. The platform had been designed for a much smaller logistics brokerage. After a string of acquisitions consolidated all traffic onto it, a private equity firm had unknowingly pushed the system far past its original design. Queues backed up. Seconds of delay turned into minutes, then into an unknown. The system that normally routed carrier representatives to available shipments while they were live on the phone had gone dark, and the floor was flying blind.

What I remember most isn't the outage. It's what happened in that conference room. Half the engineers were working the problem. The other half had gone completely still — not typing, not theorizing, not doing anything at all. Same pressure. Same information. Opposite responses.

That contrast is the reason I care so much about how to perform under pressure as a software engineer. It is not a personality trait. It's a skill with mechanics you can learn, and it's one of the chapters I spend the most time on in my book, *Don't Think When You Code*.

## Why Engineers Freeze During an Outage

The comfortable explanation is that some people are just built for stress. You're clutch or you're not, and the rest of us should hope to never be on call during the bad one.

That explanation didn't survive contact with what I actually watched. The engineers who froze weren't inexperienced. Several had been at the company for years and knew the system better than anyone in the room. They'd been through outages before. If you'd handed them a whiteboard on a calm Tuesday, they could have listed every plausible root cause from memory.

Meanwhile, some of the engineers moving fastest were new. They were learning the system in real time.

The difference wasn't experience or toughness. It was how each person handled new information as it arrived. Some found ways to shrink the problem. Others took every incoming fragment and expanded it into a branching tree of possible implications.

### Working Memory Is the Real Constraint

When a system fails, unknowns multiply faster than anything else in the incident. You don't know the root cause. You often don't know the blast radius. You have log data, plus user reports that may have been distorted by the telephone game it took to reach you. Every unknown occupies space in your head.

George Miller's research on working memory is the useful frame here: most people can hold roughly five to seven independent items in mind before reasoning slows and decision quality degrades. During an outage, unknowns blow past that limit in the first ten minutes. Each ambiguous new detail doesn't add weight linearly — it compounds, because every unknown interacts with every other one.

When too many pile up at once, people don't slow down. They stop. Working memory is full, and there is no room left to make a decision. So they wait — for someone to tell them what to do, or for enough information to arrive that the problem finally fits back inside their head.

The engineers who kept moving weren't immune to any of this. They had simply learned to do something about it.

## Shrinking the Problem: The Core Skill of Pressure Players

During one of those outages, we needed to know how far behind the queues had fallen so we could pick a remediation. There was no dashboard for queue depth, so we started hunting for a proxy.

The conversation was genuinely good engineering. Someone proposed counting shipments created that morning — but that missed shipments already booked to carriers. To catch those, we could count outbound confirmation emails, since every carrier gets one. But some of those were resends, so we'd need to filter by subject line. And then...

The unknowns were multiplying, and minutes were evaporating. We desperately needed a decision, and the room was busy trying to resolve every unknown before making one.

Then a mid-level engineer spoke up.

"Do we have enough confidence that the number is over ten thousand, which would take a couple hours to process at a minimum?"

The room stopped. Someone said, "Yeah. Actually. It does."

That question ended the debate. It didn't matter whether the queue held twelve thousand messages or eighty thousand. Either way, it was never catching up on its own. We moved the backlog to a temporary queue so new messages could process in real time, and the brokerage floor got its live data back.

### Bound the Unknowns, Don't Eliminate Them

That's the move. We didn't solve the unknown — we bounded it. We narrowed the question until the answer pointed to a single action, and then we took it.

The pattern repeats at every step of an incident. Once new messages were flowing again, we could turn to the remaining unknowns. The total message volume wasn't unusual, so something had caused the buildup: a corrupt message stuck in the pipeline, or an upstream API degraded just enough to slow every message down. We didn't need to know which. The next action was the same either way — start replaying the temporary queue and watch what happened. When we found a single message that appeared stuck, we shrank that problem until it, too, produced an action.

Pressure players don't eliminate unknowns. They bound them. They narrow scope until their brains have room to work again.

The practical test you can run in any incident: **What's the smallest question whose answer changes what we do next?** Anything more precise than that is research, and research is what you do after the bleeding stops.

## The Runbook: Pre-Made Decisions Under Pressure

There's a second lever, and it's the one most teams underuse.

A runbook is a checklist: where to find specific information, and what action to take based on what you find. Nothing exotic.

Check for hardware usage alerts. If any fired, scale the hardware.

Check for recent releases. If there are any, roll them back.

If queue delay exceeds fifteen minutes, move the backlog to a temporary queue so new messages process in real time.

When the system is down and stakeholders are calling, the last thing you want to spend brainpower on is deciding where to start. The runbook has already made those decisions, on a calm afternoon, by people with full working memory available.

That's the actual value — and it's easy to miss. A runbook isn't about removing judgment from incident response. It's about **preserving cognitive capacity for the judgments that actually matter**. Every decision the runbook makes for you is one less item consuming working memory at the exact moment you can least afford it. It's the same logic behind task templates for planned work, applied to the worst hour of your quarter.

## What Stakeholders Actually Want During an Incident

When I answered the phone that day, the head of the brokerage asked the question every leader asks: "What's happening? Do we have a timeline yet?"

I didn't have one. The root cause was still buried somewhere in a tangle of in-memory queues across a dozen servers. What I could give him was our position in the process.

"We're working through our incident runbook. We've ruled out recent releases and the database itself. Next step is removing pressure on the system by clearing queues. Can you help us understand which shipments are most important?"

That wasn't what he asked for. But the tone of the call changed immediately, because I'd handed him two things: a sense of where we were, and a job. He took that back to his floor and started ranking shipments by criticality — which turned out to be exactly the input we needed next.

His panic was never really about the system being down. It was about not knowing what was happening or when it would end. Uncertainty is the thing that hurts, and you can reduce uncertainty long before you can fix the system.

## How to Become a Pressure Player

The engineers who excelled in those incidents weren't born with a superpower. They had learned — through training, or through painful trial and error — how to respond to changing information without letting it flood them. Four habits carry most of the weight:

- **Ask what action the answer unlocks.** If a fact wouldn't change your next move, stop chasing it until later.
- **State assumptions out loud.** On our team, if nobody could disprove an assumption in the moment, we moved forward on it. Silent assumptions are the ones that stall a room.
- **Write the runbook before you need it.** Every branch you pre-decide is working memory you get back mid-incident.
- **Notice who's gone quiet, and hand them a bounded task.** A frozen teammate isn't disengaged — they're saturated. Shrinking their scope to one concrete question usually unfreezes them.

### What Changed After the Outage

The outages didn't stop that day. They ran for weeks before the system fully stabilized. But the conversations we had about bounding unknowns changed how the team operated. Engineers who had frozen in the early incidents started asking others how to take unknowns off the table. The team began stating assumptions aloud by default.

The conference room stopped feeling paralyzed. Not calm, exactly — the pressure was still real. But directed. People knew what to do with the pressure instead of being crushed by it.

The system eventually got rebuilt and the architecture caught up to the scale. Weekly outages became monthly, then rare, then almost unheard of. The skills outlasted the incidents.

## Uncertainty Is the Enemy, Not Pressure

If you want to perform under pressure as a software engineer, stop trying to build tolerance for stress and start building the mechanics that reduce what stress does to your working memory. Bound the unknowns. Ask the smallest question that produces an action. Pre-decide everything you reasonably can. Give the people waiting on you a status and a task, even when you can't give them a timeline.

Pressure players don't eliminate uncertainty. They shrink it enough to act — and they give everyone around them something to work with.

This is one chapter of a larger system I lay out in *Don't Think When You Code*: how deliberate practice, task templates, mental models, and pre-made decisions free your conscious mind for the problems that genuinely require it. If your team goes quiet when the pages start firing, the book will show you how to change that. Grab a copy — then go write the first three steps of your runbook before you need them.
