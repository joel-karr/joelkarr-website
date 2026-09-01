---
title: "Why Good Ideas Don't Spread on Engineering Teams (And the System That Makes Adoption Stick)"
description: "Good ideas don't spread on engineering teams because awareness isn't adoption. Here's the four-part system that turned one convinced engineer into a whole team."
date: "2026-09-01"
author: "Joel Karr"
tags: ["engineering-leadership", "team-productivity", "ai-code-generation"]
slug: "why-good-ideas-dont-spread-engineering-teams"
readingTime: "9 min read"
image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200"
imageAlt: "Two engineers working side by side at a laptop, representing paired coaching that spreads new practices across a team"
---

Thirty engineers sat through the same video call. They heard the same demonstration, asked good questions, and nodded along. Two days later, exactly one of them had changed how he worked.

That ratio is why I've stopped believing that good ideas spread on their own. Engineering teams don't reject better approaches because the approaches are wrong or badly explained. They reject them because agreeing with an idea and adopting it are completely different activities, and almost nothing in a normal workday makes the second one easy.

I learned this the hard way in early 2025, trying to change how a team used AI to write code. The lesson generalizes far beyond AI, and it's one of the ideas I unpack in my book, *Don't Think When You Code*.

## The Demo That Convinced Everyone and Changed Nothing

The insight I shared was simple. Most engineers were using AI the obvious way: describe a feature, ask for code, hope the output works, then fix whatever comes back. The results were maddeningly inconsistent — deprecated library versions, misread requirements, solutions that almost worked but needed so much repair that starting from scratch would have been faster.

The problem wasn't the model. It was how we were talking to it.

"Large language models are a different form of communication," I told the team. "We can talk in natural language and eventually get code syntax back. But the conversation doesn't need to *start* with asking for code."

I walked through the alternative: use AI to break a feature into discrete tasks first. Review that breakdown. Confirm it's directionally correct. Only then generate code, one task at a time, reviewing each piece before moving to the next. Treat the tool as a thinking partner instead of a code vending machine.

The call ended with a handful of clarifying questions. It felt like it landed.

It hadn't.

## Why One Engineer Changed and Twenty-Nine Didn't

Two days later, Kyle messaged me.

Kyle was a team lead who had spent months fighting with AI on a genuinely hard problem — a Twilio-based phone system where users could define journeys that automatically routed incoming calls and queued tasks for agents. Telephony, workflow orchestration, and task management all tangled together in one feature.

He'd been asking AI to generate large chunks of it at once. The output kept breaking in subtle ways. Follow-up prompts sent it in circles, regenerating variations of the same flaw or fixing one issue while creating another. Most engineers would have concluded AI wasn't ready for real work and gone back to typing.

Kyle didn't. He stayed curious and kept experimenting, month after month, without a breakthrough.

Then he heard one sentence — *the conversation doesn't need to start with asking for code* — and rebuilt his approach within hours. He asked AI to decompose the feature into tasks, corrected the list, then generated code task by task. Within days he reported a drastic improvement. The complexity he'd been holding in his head all at once dropped. Smaller diffs meant better reviews. He caught problems earlier. The tool that had failed him for months became a force multiplier.

I was thrilled. Surely the rest would follow.

I checked in with the other engineers from the call. Nothing had changed. A few said the demo was interesting but they hadn't tried it. Others said they were too heads-down on current work to experiment.

### Readiness Is Not the Same as Agreement

Here's what I missed: Kyle wasn't representative. He was *primed*. He had months of accumulated failed experiments behind him — the kind of productive struggle most engineers abandon long before it pays off. He didn't need convincing. He needed someone to articulate the thing he'd been circling for weeks.

Everyone else was in a different position entirely. They heard a good idea, recognized it as good, agreed with it, and then went back to their existing workflow because the effort to change felt higher than the benefit they could picture.

The engineers who said they were too busy weren't making excuses. They were describing a real constraint. The ones who asked for formal training weren't being difficult. They were asking for something that would lower the activation energy enough to actually start.

A demo creates awareness. Awareness doesn't change behavior. Habits form through repetition — doing the thing enough times that it stops requiring conscious effort. If adoption depends on repetition rather than understanding, then spreading good ideas across engineering teams isn't a communication problem at all. It's a practice-design problem.

## From Watching to Doing: The Working Session

So I stopped explaining and scheduled a working session instead.

The format was deliberately different. Rather than watching me click through screens, every engineer would use AI themselves — to break down their own work into tasks they'd then use to organize commits for a real pull request. Their machines. Their code. Support available in real time.

The difference showed up within minutes.

Friction surfaced that I never would have predicted. Several engineers had permissions issues; their accounts weren't correctly configured for the AI tools we were using. They'd assumed everything was set up. So had I. Others didn't know which button started a conversation. The interface that felt obvious to people who'd been using it for months was genuinely confusing on first contact.

These were trivial obstacles — thirty seconds to fix once someone named them out loud. But they're exactly what kills adoption when people try alone. You sit down to experiment, you hit a wall immediately, and you assume something is broken or that you're doing it wrong. You tell yourself you'll figure it out later. Later never comes.

Going through it together, we diagnosed those problems on the spot. Everyone finished their first successful attempt with help within arm's reach. The activation energy collapsed because nobody was starting from zero by themselves.

### Paired Continuation Beats Formal Training

One working session doesn't build a habit. People need ongoing support while applying a new approach to their actual deliverables — not practice problems invented for a demo, but the features they're on the hook for.

This is where Kyle became the most valuable person in the process. As a team lead, he was already talking with his engineers about their work regularly. Now he did it deliberately: when someone sat down to plan a new feature, Kyle was there — not doing the work, but guiding them through breaking it into tasks with AI.

When they hit friction, he unblocked them. When they weren't sure how to phrase a prompt or whether a task breakdown made sense, he showed them what he'd do. When the AI produced something strange, he helped them decide whether to refine the prompt or just fix it by hand.

No slide decks. No scheduled curriculum. Embedded coaching — the early adopter working next to the person still learning, on real problems, where the stakes were real and the wins felt like wins.

## Creating Space for the Slowdown

One obstacle remained, and it's the one most leaders never address explicitly.

New habits feel slower at first. Engineers know this instinctively. Learning any new approach means temporarily giving up the fluency you had with the old one. Under delivery pressure, defaulting to the familiar feels safer — even when you're certain a better method exists.

If the environment punishes that temporary slowdown, adoption dies. People revert the moment a deadline tightens, and the new approach never accumulates enough repetitions to stick.

So I said it out loud, more than once: using AI for task breakdown may feel slower initially, and we're confident it makes the whole process faster within a short window. People needed explicit permission to be temporarily less efficient. Without it, the implicit pressure to hold velocity would have quietly overridden every bit of enthusiasm from the demo and the working session.

We also kept lightweight visibility on how adoption was going — not surveillance, just enough signal to spot who was struggling before they gave up. We asked during standups. We looked at aggregate AI usage data from GitHub Copilot as a rough indicator of who was engaging.

When someone wasn't adopting, the response was never another pitch about why they should. It was pairing them with someone who'd walk through the steps on their next real task. Course correction through action, not persuasion.

Then the dynamic shifted on its own. The engineers who had adopted started moving faster — better-organized pull requests, less cognitive load, more confidence taking on complex features. Others noticed. Social proof took over. Adoption that had stalled after the demo began accelerating, and not because I'd found better arguments. Because people could see their peers winning.

## The Path, Not the Idea

Spreading good ideas on engineering teams requires more than communicating them well. It requires engineering the conditions for adoption. Four pieces do the work:

**Guided practice.** Run a working session where everyone performs the action themselves rather than watching someone else. This surfaces hidden friction — permissions, UI confusion, missing context — that would silently end adoption if people tried alone, and it produces a first successful attempt with support right there.

**Paired continuation.** Early adopters partner with others on real work. Coaching lands in context, on problems that matter, where questions get answered in the moment. Intuition builds faster because nobody is learning in the abstract.

**A supported environment.** Say explicitly that the new approach may feel slower at first. Grant permission to be temporarily less efficient. Check in lightly enough to notice who's struggling, and respond by pairing them with help, not by repeating the pitch.

**Visible wins.** Make early successes observable to the broader group. Social proof is a faster persuader than any argument you'll construct.

Kyle started as the one engineer who changed after a video call. He had the curiosity, the accumulated struggle, and the readiness to act on a single reframe. Within months he'd become a multiplier — not just using the approach himself, but carrying it through his team by working alongside people on real features.

The gap between the demo that changed one person and the system that changed a team was never about finding better words. It was structure.

Thirty engineers heard the same idea. One changed immediately. The rest needed a path.

Good ideas don't spread because they're good. They spread because someone builds the path that makes adoption possible.

*This chapter is one part of the larger system in [Don't Think When You Code](/#book) — how deliberate practice, task templates, and mental models turn conscious effort into engineering instinct, for you and for the team you lead. If you've ever given a great demo that changed nothing, the book will show you what to build instead.*
