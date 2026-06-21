---
title: "How to Give Technical Feedback Engineers Actually Act On"
description: "Most technical feedback gets ignored because it's vague, late, or framed as a verdict. Here's how to give feedback that changes behavior, drawn from 20+ years of engineering leadership."
date: "2026-06-18"
author: "Joel Karr"
tags: ["engineering-leadership", "feedback", "communication", "software-craft"]
slug: "how-to-give-technical-feedback-engineers-act-on"
readingTime: "9 min read"
image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200"
imageAlt: "Two engineers reviewing code together at a shared screen"
---

Most technical feedback gets ignored — not because engineers are stubborn, but because the feedback is vague, arrives too late, or lands as a verdict instead of an invitation to improve. After two decades of leading engineering teams and reviewing more pull requests than I can count, I've learned that the way you deliver feedback matters as much as the feedback itself. Good feedback changes behavior. Bad feedback just creates resentment.

## Why Does So Much Technical Feedback Fail?

The feedback most teams give fails for predictable reasons. Understanding them is the first step to fixing them.

- **It's too abstract.** "This could be cleaner" tells the engineer nothing they can act on. Cleaner how? Compared to what?
- **It arrives too late.** Feedback on a design three weeks after it shipped is a history lesson, not a course correction. The window to change anything has already closed.
- **It's framed as a judgment.** "This is wrong" puts the recipient on the defensive. Once someone is defending their work, they've stopped listening.
- **It overwhelms.** Twenty-seven comments on a single pull request, all weighted equally, force the author to guess which ones actually matter.

The common thread is that the feedback optimizes for the giver — getting things off their chest — rather than the receiver, who has to absorb it and act.

## What Makes Feedback Actionable?

Actionable feedback shares three properties: it is **specific**, **timely**, and **separable into what matters and what doesn't**.

Specific means tied to a concrete observation and a concrete suggestion. Instead of "this function is doing too much," try: "This function handles parsing, validation, and persistence. Splitting validation into its own step would make the error cases easier to test." Now the engineer knows exactly what you saw and exactly what to try.

Timely means delivered while the work is still malleable. The best moment to question an architectural choice is when it's a paragraph in a design doc, not after it's load-bearing in production. Front-load your most expensive feedback to the cheapest moment to act on it.

Separable means you signal weight. Not every comment deserves equal attention, and pretending otherwise buries the important points in noise.

## How Do You Separate Blocking Feedback From Preferences?

This single habit improves code-review culture more than any other: **label the weight of every comment.**

A simple convention works well:

1. **Blocking** — "This must change before merge." Reserve this for correctness bugs, security issues, and decisions that are genuinely hard to reverse later.
2. **Recommendation** — "I'd do this differently, and here's why, but it's your call." Strong opinion, weakly held.
3. **Nit** — "Minor preference, take it or leave it." Naming, formatting, small stylistic choices.

When every comment carries a label, the author instantly knows what to prioritize. The blocking comment about an unhandled null doesn't get lost beside a nit about variable naming. And you, the reviewer, are forced to ask yourself the most useful question of all before you hit submit: *does this actually need to change, or do I just prefer it differently?*

A surprising amount of friction in code review comes from reviewers stating preferences with the force of requirements. Naming the weight defuses that automatically.

## How Should You Frame Feedback So People Stay Open to It?

The framing determines whether feedback gets absorbed or deflected. A few principles I rely on:

- **Critique the work, not the person.** "This approach has a race condition" is about the code. "You always forget concurrency" is about the person — and it guarantees defensiveness.
- **Ask questions when you're genuinely uncertain.** "What happens here if the upstream call times out?" invites the author to think. It also leaves room for the very real possibility that they've already considered it and you're missing context.
- **Lead with the reasoning, not just the conclusion.** "Use a queue here" is an order. "We're going to get bursty traffic on this endpoint, so a queue would smooth the load" is an explanation the engineer can generalize to the next problem.
- **Acknowledge the constraints.** Engineers make tradeoffs under deadlines and incomplete information. Feedback that ignores the constraints they were working under reads as naive, and it gets discounted accordingly.

The goal is not to soften feedback into meaninglessness. It's to remove the parts that trigger defensiveness so the substance can actually get through.

## Does the Same Approach Work for Verbal and Written Feedback?

Mostly, but the medium changes the risk. Written feedback — pull request comments, design doc notes — strips out tone, so anything that could read as terse or dismissive *will* read that way to someone having a bad day. Err toward warmth and explicitness in writing.

Verbal feedback, especially in a group, carries social weight. Correcting someone in front of their peers raises the stakes whether you intend it or not. My rule: **praise in public, redirect in private, and debate ideas anywhere.** A technical disagreement about an approach is fair game in a design review. A pointed critique of how someone handled a specific task belongs in a one-on-one.

## How Do You Know If Your Feedback Is Working?

The signal isn't whether people thank you — people thank you for feedback they're about to ignore all the time. The real signals are:

- **Behavior changes on the next piece of work**, not just the current one. The point of feedback is to shift the pattern, not to fix one instance.
- **People start coming to you earlier.** When engineers loop you in at the design stage instead of waiting for review, it means your feedback feels like help rather than judgment.
- **The same issues stop recurring.** If you're leaving the identical comment on every pull request, the feedback isn't landing — and the fix is probably a conversation, a shared standard, or some automation, not a thirtieth comment.

That last point matters: if a piece of feedback is worth giving more than twice, it's worth turning into something systemic. A linter rule, a checklist item, a documented convention. Feedback that has to be repeated by a human forever is a process failure wearing the costume of a personality flaw.

## Putting It Together

Effective technical feedback isn't about being nicer or harsher. It's about respecting the receiver's time and autonomy enough to make your feedback easy to act on. Be specific so they know what you saw. Be timely so they can still change it. Label the weight so they know what matters. Frame it so they stay open. And when you find yourself giving the same feedback over and over, fix the system instead of the symptom.

Do this consistently and something shifts on the team: feedback stops being the thing people brace for and becomes the thing they seek out. That's when you know the culture is working — and it's one of the highest-leverage habits an engineering leader can build.
