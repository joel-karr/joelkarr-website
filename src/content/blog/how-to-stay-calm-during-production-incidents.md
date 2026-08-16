---
title: "Pressure Players: How to Stay Calm During Production Incidents"
description: "Why do some engineers freeze during production incidents while others act? Learn how pressure players bound unknowns, shrink problems, and trust the runbook."
date: "2026-08-16"
author: "Joel Karr"
tags: ["engineering-leadership", "incident-response", "software-craft"]
slug: "how-to-stay-calm-during-production-incidents"
readingTime: "8 min read"
image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200"
imageAlt: "Server racks glowing in a dark data center, representing the pressure of a production outage"
---

The call came two hours into the outage.

I was in a conference room with the engineering team at a logistics company, triaging an issue with impacts cascading downstream. The system had been designed for a much smaller brokerage; after multiple acquisitions consolidated all traffic onto it, it was operating far past the limits of its original design. Queues were backing up, and what started as seconds of delay grew into minutes, then into unknown. If you've ever wondered how to stay calm during production incidents — when stakeholders are calling and the unknowns are multiplying — this is the story that taught me the answer, and it became a full chapter in my book, *Don't Think When You Code*.

When I answered the phone, CT, the head of the brokerage, was on the other end. He was one of those leaders whose team would run through walls for him — fair, accountable, never pointed fingers. In months of working together, I had never heard panic in his voice. I heard it now. Behind him, the brokerage floor was working from stale reports pulled before the system went down, calling carriers for shipments that had already been booked and missing carriers for shipments picking up that day. Commissions were on the line.

"What's happening?" he asked. "Do we have a timeline yet?"

I didn't know the root cause yet. I couldn't give him a timeline. But I could tell him where we were in the process: "We're working through our incident runbook. We've ruled out recent releases and the database itself. Next, we'll remove pressure on the system by clearing queues. Can you help us understand which shipments are most important?"

It wasn't what he wanted. But there was a pause, and then his voice steadied. "Okay. I can work with that." He took the information back to his team and turned their energy toward identifying what was most critical.

Then I turned back to the conference room, and saw something that stuck with me longer than the outage did. Some engineers were actively working the runbook, investigating and ruling things out. Others had gone quiet. Not looking at code. Not proposing theories. Frozen. Same pressure, same information, completely different responses.

## Why Engineers Freeze During Production Incidents

The easy explanation is that some people just handle stress better. It's a comfortable idea because it lets us off the hook: you're either a clutch performer or you're not.

But the engineers who froze weren't inexperienced. Several had been with the company for years, knew the system deeply, and had been through outages before. Meanwhile, some of the engineers who moved fastest were new and learning the system in real time. The difference wasn't experience or toughness. It was how they reacted to new information.

When a system fails, unknowns multiply fast. You don't know the root cause. You don't know the blast radius. Your data is a mix of logs and user reports that may have been distorted by the telephone game it took to reach you. Each unknown takes up space in your head.

The cognitive limits George Miller identified apply directly here: most people can hold about five to seven independent things in working memory before reasoning slows and decision-making degrades. During an outage, unknowns pile up far faster than that. When too many accumulate at once, people stop completely. Their working memory is full, there's no room left to decide, and they wait — for someone to tell them what to do, or for information to reduce the unknowns to a manageable level.

The engineers who kept moving weren't immune to this. They had just learned to do something about it.

## Shrinking the Problem Instead of Solving It

During one outage, we needed to know how far behind the queues had gotten to choose a remediation. There was no dashboard for queue length, so engineers started hunting for proxies. Look at all shipments created that morning — but that misses ones already booked. Check outbound confirmation emails — but some are resends, so filter by subject line. The unknowns were multiplying as minutes slipped by, and the room was trying to solve every one of them.

Then a mid-level engineer spoke up: "Do we have enough confidence that the number is over ten thousand, which would take a couple hours to process at a minimum?"

The room paused. Then someone said, "Yeah. Actually. It does."

We stopped chasing the exact count because it didn't matter whether the queue held twelve thousand messages or eighty thousand. Either way, it would take far too long to catch up on its own. We moved everything to a temporary queue so new messages could process in real time, then worked the backlog and watched for whatever was stuck.

That question changed how I think about incident response. Pressure players don't eliminate unknowns. They bound them. They narrow the scope just enough to give their brains room to work, take the next action, then shrink the remaining unknowns enough to drive the action after that.

## The Runbook: Deciding Before the Pressure Hits

Teams that build their own runbook have already worked out how to isolate the information needed to act. It's simply a checklist: where to get specific information, and what action to take based on the result.

- Check for hardware usage alerts. If any, scale hardware.
- Check for recent releases. If any, roll back.
- If queue delays exceed fifteen minutes, move messages to a temporary queue so new messages process in real time.

When the system is down and stakeholders are calling, the last thing you want to spend brainpower on is deciding where to start. The runbook isn't about removing judgment — it's about preserving cognitive capacity for the judgments that actually matter. Every decision the runbook makes for you is one less thing consuming working memory in the moments you need it most. It's the process your team builds when they aren't under pressure, so it's there when they are.

## How to Become a Pressure Player

The engineers who excelled during those outages weren't born with a superpower. They had learned — through training or painful trial and error — how to respond quickly to changing information. It's a skill anyone can develop, and it comes down to four moves.

### Bound the Unknowns Rather Than Chase Them

You don't need exact answers. You need enough confidence that you're directionally correct to decide what to do next. "Do we have enough confidence that it's over ten thousand?" wasn't asking for precision. It was asking whether we knew enough to act. That's a different question, and during an incident it's the only one that matters.

### Constrain the Scope

Not every problem needs solving right now. We didn't hunt for the root cause while the system was down — we focused on getting new messages flowing again. Root cause analysis waited until we'd stopped the bleeding. Trying to solve everything at once is exactly how people freeze.

### Trust the Runbook

When pressure mounts, don't improvise if you don't have to. The runbook exists precisely for moments when your brain is already overloaded. If your team doesn't have one, that's the first thing to fix after the incident is over.

### Unfreeze Your Teammates

This is the move that's easiest to forget. When someone goes quiet during an incident, they're not checked out — their working memory is full and they don't have a clear next step. Ask them what unknowns they're trying to solve. Help them take some off the table with assumptions or acceptable ranges. Sometimes just saying "Let's assume it's over ten thousand and move on" is enough to get someone unstuck. The goal isn't to have all the answers. It's to keep the team moving when the natural response is to stop.

## What Changes After You Learn This

The outages didn't stop that day. They went on for weeks before the system fully stabilized. But the conversations about becoming pressure players shifted how the team operated. Engineers who had frozen in early incidents started asking how to take unknowns off the table. The team began stating assumptions out loud — and if no one could disprove an assumption, they moved forward on it. The conference room stopped feeling paralyzed. Not calm, exactly. The pressure was still real. But directed.

I never forgot that phone call. The panic in CT's voice wasn't about the system being down. It was about not knowing what was happening or when it would end. The moment I could tell him where we were in the process — even without a timeline — he had something to work with.

That's what staying calm during production incidents actually looks like. Not eliminating uncertainty, but shrinking it enough to act, and giving the people around you something to work with. The system eventually got rebuilt, the architecture caught up to the scale, and weekly outages became rare. The lessons outlasted the incidents: bound the unknowns, constrain the scope, trust the runbook, unfreeze your teammates.

This chapter is one part of the system I lay out in *Don't Think When You Code* — training your subconscious through deliberate practice, task templates, and mental models so the right response is there before you have to think about it, even at 2 AM with the system down. If your team's incidents feel more like chaos than process, grab a copy and start building your runbook this week.
