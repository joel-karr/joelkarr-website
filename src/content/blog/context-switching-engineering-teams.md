---
title: "The Real Cost of Context Switching on Engineering Teams (And the One Habit That Fixes It)"
description: "Context switching on engineering teams kills productivity exponentially, not linearly. Here's the default-task habit that broke the cycle and saved a deadline."
date: "2026-08-25"
author: "Joel Karr"
tags: ["engineering-leadership", "team-productivity", "software-craft"]
slug: "context-switching-engineering-teams"
readingTime: "8 min read"
image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200"
imageAlt: "An open-plan engineering office with empty desks, representing a team caught in constant interruptions and context switching"
---

I took the job while hopped up on artisanal coffee.

The founder had picked me up at my hotel in Charlotte and suggested we grab coffee before the interview. I've always avoided coffee, and I stared at a menu full of things I didn't recognize. Queen City Cortado. Uptown Afterburner. Midwestern politeness wouldn't let me say I didn't want anything, so I ordered a Smoked Maple Cold Brew because I like smoked maple old fashioneds. It turned out to have one of the highest caffeine counts on the board.

While we waited, he told me his company had spent two years building a logistics platform with an outside consulting firm. Game-changing customers were in final-stage sales. Then he found the clause buried in the contract: he didn't own the source code. The platform his entire business ran on belonged to someone else. He'd hired engineers to build a replacement, they were working hard, and they were going nowhere. The contract expired in months. Renewing would cost hundreds of thousands of dollars.

Then he said, "How about we decide on comp right here and you can start today?"

An hour later I was standing in front of forty people in a warehouse-style office being introduced as the new head of technology. What I found there was the most common failure mode I've seen in struggling engineering teams, and it had almost nothing to do with the code: **context switching on engineering teams, delivered as an endless stream of small, unrelated direction.**

## The Drowning Leader

I spent the first afternoon listening. Every department had issues the technology team had to resolve manually, and no one knew when new functionality would arrive, so nobody could plan their own work.

The engineering team was doing two jobs at once — supporting the current business and building the replacement platform. That's normal. Every team I've led has faced some version of it. What made this team struggle was how they resolved the conflict. Every single time they had to choose, the current business won. It didn't matter how trivial the support request was. Someone was standing at a desk asking for help, so it jumped the line.

They'd already missed several major milestones. They knew they were behind. They had no idea how far.

At the end of that first day, the team gathered around me, waiting for the secret. The one thing that would fix everything.

Here's what I actually found: the previous technical leader wasn't lazy or checked out. He was drowning. Everything was a top priority and everything was urgent, so without a clear focus, he did the only thing available — he kept people moving. Answer the next question. Respond to the next production issue. Assign the next task. Whenever someone finished, hand them something else as fast as possible, because idle engineers feel like a leadership failure. Whenever someone got stuck, jump in, unstick them, then bounce to the next person.

The team wasn't stuck because it lacked direction. It was stuck because it had *too much* direction, arriving in fragments that forced everyone to change course over and over.

## Why Context Switching Costs More Than You Think

Gerald Weinberg started his career building the operating system for NASA's Project Mercury — the program that put the first American in orbit. He spent the decades after that consulting inside struggling software organizations, and he kept finding the same pattern: teams with talented engineers and adequate budget would simply grind to a halt.

The teams that failed were the ones where everyone was busy all the time. Engineers juggled multiple projects. Managers bounced between people keeping them occupied. It looked exactly like productivity. Nothing got finished.

Weinberg started measuring what happened when people switched between projects. Working on one project, you have essentially all of your productive time available for it. Add a second, and you lose roughly twenty percent to switching overhead. By the time someone is juggling five or more, they may have around five percent of their time left to be productive on any one of them.

That loss isn't linear. It's exponential. A team juggling five things isn't making slower progress on five fronts — it's making almost no progress on anything.

### Why It Happens in Your Head

The cost comes from what switching does to your working memory. Complex software work requires holding a large mental model in your head at once: the data flow, the edge cases, the three files you're mid-refactor across. Every switch tears that model down. Rebuilding it takes real time and is genuinely exhausting.

None of this is a new idea. Context switching is a footnote in every management book. And yet it's everywhere. Why?

Because when someone walks up and asks what to do next, a manager feels obligated to answer. Busy people look like good leadership from the outside. The manager who says "I'm not sure yet, give me an hour" feels like they're failing, even when that's the correct answer.

To fix it, the manager has to break the cycle entirely. And to do that, **the team has to stop requiring constant direction.**

## Everyone Knows How to Sweep

My dad grew up on a farm in central Illinois, one of nineteen children. With nineteen kids and two parents, nobody had time to assign tasks or check progress or make sure people stayed busy. The farm worked because it had to.

I spent a lot of time there as a kid, and I noticed something about my aunts and uncles. When any of them showed up, they never asked how they could help. They just started helping. Each had their own expertise — my uncles collectively covered every trade you'd need to build a house from scratch. But even when the work in front of them was outside their specialty, they found something useful to do.

I once asked my grandma how everyone knew what to do without interrupting each other to ask. She smiled at me with the particular wisdom of someone who raised nineteen children and lived to ninety-six.

"Everyone knows how to sweep."

That reframed everything I'd watched on that farm. When someone arrived, they found something simple that needed doing — sweeping, picking up tools, hauling something. Then, as the people already working finished what they were on, *they* would come over and give direction. Nobody got interrupted mid-task. The people leading the work got to form a durable plan instead of scrambling to keep everyone occupied.

The engineers staring at me in Charlotte didn't need to know anything about farming. The principle was identical.

### What Sweeping Looks Like in Software

In technology, sweeping the floor means testing things and isolating bugs. Making sure code has proper unit test coverage. Documenting endpoints. Investigating items from a known technical debt list. Reviewing open pull requests.

I told them the story about my grandma. I told them that when they didn't know what to work on, they should post in chat that they were available — and then grab a broom and sweep. When someone had the bandwidth to give them direction, that person would come find them.

"Grab a broom and sweep" was the thing that broke the cycle.

When people have a default productive action, they stop asking what to do next. When they stop asking, the manager stops bouncing between people. When the manager stops bouncing, the whole team stops context switching.

## Building Your Team's Default Tasks

The next day we identified three tasks anyone could pick up without asking: writing unit tests for untested code, documenting endpoints, and working the known technical debt list.

Look at what those three have in common, because the criteria matter more than the specific tasks:

- **No approval required to start.** If you have to ask, it isn't a default task.
- **Creates value even if interrupted partway through.** Half a test suite is still useful. Half a feature is not.
- **Never fully "done."** There's always more coverage to add, more to document.
- **Doesn't block anyone else's work.** Sweeping should never create a dependency.

The interrupts slowed almost immediately. Engineers stopped hovering at the tech lead's desk waiting to be assigned. When they finished something, they grabbed a broom. The tech lead knew they were sweeping, which meant he could hand them real work when he got a chance instead of dropping whatever he was doing that second.

The effect on him was visible within days. For the first time in months he had room to think past the immediate moment. He looked at the roadmap. He worked with the operations team to pin down what actually had to ship before the deadline. He grouped the work into logical buckets and sequenced them to minimize — you guessed it — context switching.

With that breathing room we built a triage process for production issues. Each morning the tech lead met briefly with operations to review what had come in overnight and decide together what was genuinely critical. The engineers building the new platform stopped getting interrupted by problems that could wait until Thursday.

The deadline that looked impossible from that coffee shop? They hit it. The consulting contract expired and the company was running on its own platform.

## The Pattern Underneath

The secret that team had been waiting for wasn't a framework, an architecture, or a more detailed plan. It was a phrase borrowed from a ninety-six-year-old woman who never wrote a line of code.

Struggling teams I've worked with since Charlotte have had wildly different surface problems — different stacks, different deadlines, different flavors of organizational dysfunction. Underneath, a striking number share the same pattern: too much direction delivered too constantly, forcing everyone to context switch until nothing finishes.

The fix is almost always the same. Give people a default productive action. Break the cycle of constant interruption. Create breathing room for the person who needs to plan.

The specific tasks matter far less than having them. When people know what to do when they don't know what to do, the cycle breaks.

This is the same principle behind everything I write about in *Don't Think When You Code* — removing decisions from the moment so your team's energy goes into the work instead of into deciding what the work is. Deliberate practice, task templates, and mental models all do it at the individual level. Default tasks do it at the team level.

If your engineers are hovering at someone's desk waiting to be told what's next, you don't have a talent problem or a process problem. You have a context switching problem, and you can start fixing it this week. Pick three sweeping tasks. Tell your team to grab a broom. Then watch what your tech lead does with the first quiet hour they've had in months.

*Want the full system? [Don't Think When You Code](/#book) lays out how deliberate practice, task templates, and mental models turn conscious effort into engineering instinct — for you and for the team you lead.*

I never did develop a taste for coffee. But I'm grateful for that Smoked Maple Cold Brew.
