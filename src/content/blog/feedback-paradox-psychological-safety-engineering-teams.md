---
title: "The Feedback Paradox: Why Psychological Safety Requires Higher Standards, Not Softer Feedback"
description: "Psychological safety in engineering teams isn't about being gentle. It's what makes direct, peer-driven feedback possible. Here's how to build it in 3 steps."
date: "2026-09-08"
author: "Joel Karr"
tags: ["engineering-leadership", "feedback", "communication"]
slug: "feedback-paradox-psychological-safety-engineering-teams"
readingTime: "9 min read"
image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200"
imageAlt: "Engineering team gathered around a table in an open discussion, representing peer-driven feedback and psychological safety"
---

A freshman wrestler was heading to the visiting locker room before a junior varsity meet. To get there, he had to walk through the practice gym where the varsity team was still drilling. He stopped and watched.

Two varsity wrestlers were running through moves. Then one of them picked up the pace. He stopped letting his partner catch his breath between reps. The moment one takedown finished, he was already pulling the other guy back to his feet. "Get up. Again. Let's go."

To someone who didn't know the room, it looked hostile. The strange part was that nobody else reacted. No coach stepped in. No teammate glanced over.

I was one of those two wrestlers. And what that freshman couldn't see is the whole point of this post: psychological safety in engineering teams doesn't mean feedback gets softer. It's the thing that makes hard, direct, peer-driven feedback possible in the first place.

## The Feedback Paradox on Engineering Teams

Here's what was actually happening in that gym. My partner had started conserving energy, taking it easy on a Monday night practice with nobody watching. His teammate wasn't letting him get away with it. My partner rose to the challenge, his pace jumped, and within a minute the two of them were wrestling at a level that would have impressed a crowd at the state finals.

No coach had to enforce it. Everyone on the team knew the expectation for effort, and everyone knew they were responsible for holding each other to it. To the freshman, it looked like criticism. To us, it felt like support.

That's the paradox. The teams with the highest standards often have the most direct feedback, and yet that feedback carries the least emotional weight. Meanwhile, the teams that treat feedback as dangerous, softening it, delaying it, routing it through managers, end up with the most anxiety about it.

Most engineering teams live on the wrong side of this paradox.

## Why Feedback Fails on Most Engineering Teams

Most teams believe feedback is risky, so they handle it carefully or avoid it entirely. They soften pull request comments until the actual point disappears. They save concerns for a one-on-one that keeps getting pushed. They wait and hope the issue fixes itself. It never does.

Teams convince themselves that avoiding conflict is what professionalism looks like. But the avoidance doesn't preserve trust. It erodes it. When nobody says anything directly, people stop knowing where they stand. Conversations move to whispers and side channels. The engineer whose code keeps getting quietly rewritten by a reviewer never learns why, and the reviewer never learns that the rewriting is the problem.

Underneath all of this is a structural cause, not a personality one. Feedback fails when it arrives without shared standards.

When expectations are implicit, critique feels personal, an attack instead of assistance. If nobody ever said what a good pull request looks like, then "this PR is too big" sounds like a judgment about the person rather than a comparison against an agreed bar. And when enforcement is inconsistent, correction feels political. If the senior engineer's 900-line PR sails through but the new hire's 400-line PR gets flagged, the feedback isn't about the work anymore. It's about status.

The wrestling room worked because none of that ambiguity existed. Nobody had to guess what was expected. Effort wasn't negotiable. Enforcement wasn't emotional. And feedback didn't depend on hierarchy.

## What Psychological Safety Actually Means

The term "psychological safety" has been badly misused, so it's worth going back to where it came from.

When Amy Edmondson started studying teams, she wasn't trying to make work feel nicer. She was trying to understand why intelligent, well-trained professionals failed in environments where failure was both visible and expensive. Her early work focused on hospital units, where nurses and physicians make judgment calls under pressure inside tightly coupled systems and depend on each other to surface problems fast.

The starting assumption was obvious: the best teams would make fewer mistakes and therefore report fewer errors. That assumption turned out to be wrong.

The highest-performing units consistently reported *more* errors than everyone else. At first glance they looked less capable. But Edmondson suspected the data was saying something different. Those teams weren't making more mistakes. They were catching them earlier and more often. People spoke up while issues were still small and recoverable, so corrections happened before errors could compound.

The lower-performing units looked cleaner on paper. But problems stayed hidden longer. People hesitated. Silence felt safer than intervention. By the time issues surfaced, they were bigger, costlier, and harder to fix.

If you've ever run a [production incident](/blog/how-to-stay-calm-during-production-incidents) where someone admitted afterward that they'd noticed the warning sign two days earlier and didn't want to bother anyone, you've seen the low-safety version of this firsthand.

Edmondson eventually coined the term psychological safety to describe what separated the two groups: the shared belief that speaking up will be met with fairness rather than punishment. Notice what that definition does not say. It doesn't say the absence of standards. It doesn't say comfort or politeness. It doesn't say everyone gets to feel good.

Psychological safety is what makes accountability possible. That's the whole paradox resolved in one sentence.

## How to Build a Feedback System Your Team Will Trust

I spend a lot of time in *Don't Think When You Code* on the idea that good engineers and good teams run on systems rather than heroics. Feedback is no different. You don't get a wrestling-room culture by hiring tougher people or telling everyone to be more candid. You get it by building the structure underneath, and that structure comes down to three fundamentals.

### 1. Make Expectations Explicit

You can't enforce a standard that has never been named.

When software engineers hear the word "standards," they usually think of syntax: tabs versus spaces, brace placement, the linting rules that have consumed countless hours of forum arguments. Those matter a little. But the standards that determine whether feedback works are about how you operate as a team.

How quickly should someone complete a pull request review? When should a reviewer update the code directly versus leave direction for the author? How long should someone search for a solution on their own before asking for help? What's the expected size of a PR, and what happens when one needs to be bigger?

Most teams have never answered these questions out loud, which means every engineer is running on their own private version of the rules. When two private versions collide in a code review, it feels like conflict. It's actually just undocumented disagreement.

People don't resist being held to a standard. They resist being surprised by one.

### 2. Enforce Standards Consistently

Nothing undermines trust faster than selective enforcement.

When some people are held to a bar and others are quietly exempted, feedback stops feeling fair and starts feeling political. And once feedback feels political, people stop listening to its content and start decoding its subtext. Why did I get flagged for this? Who else got away with it? Every comment becomes a data point about status instead of a data point about the work.

This is why peer-driven accountability is so much more powerful than manager-driven accountability. When teammates hold each other to the same expectations, it removes status from the equation. In that gym, the wrestler saying "again" wasn't a captain or a coach. He was a peer, applying a standard that applied equally to him. That's what let the correction land as support.

On an engineering team, this looks like reviewers of every level leaving the same kind of comment on everyone's code, including the tech lead's. It looks like the standard being the standard regardless of who wrote the pull request.

### 3. Keep Feedback Immediate and Specific

The closer a correction sits to the action itself, the less emotional weight it carries and the easier it is to receive.

"Again, let's go" works because it arrives one second after the rep, about that rep. Nobody has time to build a story around it. Compare that to feedback delivered three weeks later in a performance review: "You've been a bit slow on code reviews lately." By then it's abstract, it's accumulated, and it carries the extra weight of "how long have you been thinking this?"

Immediate and specific is also what makes feedback usable. "This function does three things" is something you can fix today. "Your code could be cleaner" is something you can worry about for a month. If you want feedback that engineers [actually act on](/blog/how-to-give-technical-feedback-engineers-act-on), tie it to a concrete moment and a concrete standard, and deliver it while both are still fresh.

## What the Freshman Couldn't See

The freshman who paused in that gym saw something that looked aggressive. What he couldn't see was everything underneath it.

He couldn't see the conversations we'd had at the start of the season about what we expected from each other. He couldn't see the moments when coaches had deliberately stepped back and let us hold each other accountable instead of doing it for us. He couldn't see the trust built through hundreds of small corrections, given and received without defensiveness, until "again" stopped being a criticism and became a shorthand for "I know you can do more."

That's what psychological safety in engineering teams looks like from the outside: direct, fast, sometimes blunt feedback that nobody seems bothered by. From the inside, it feels like a team that has agreed on what good looks like and refuses to let each other settle for less.

You don't build it by being nicer. You build it by making expectations explicit, enforcing them the same way for everyone, and keeping feedback close to the moment it's about. Do that consistently, and the hard conversations stop being hard. They just become practice.

If you want the full system for building teams that run on shared standards instead of heroics, from task templates to decision journals to feedback loops, that's what *Don't Think When You Code* is about. Start with one expectation your team has never written down, write it down this week, and see how much lighter the next code review feels.
