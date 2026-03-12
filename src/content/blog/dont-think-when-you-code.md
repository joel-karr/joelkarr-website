---
title: "Don't Think When You Code: How Deliberate Practice Builds Engineering Intuition"
description: "The best software engineers don't think their way through every decision — they've trained their subconscious to recognize patterns. Here's how deliberate practice, task templates, and mental models turn conscious effort into engineering intuition."
date: "2026-03-11"
author: "Joel Karr"
tags: ["software-craft", "deliberate-practice", "engineering-leadership"]
slug: "dont-think-when-you-code"
readingTime: "10 min read"
image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200"
imageAlt: "Engineer in deep focus at a workstation, representing the flow state in software development"
---

The title sounds counterintuitive. Engineers are paid to think. But after twenty years of building software and leading engineering teams, I've learned that the best engineers don't consciously think through every decision — they've trained their subconscious to recognize patterns so well that the right answer arrives before they realize they were thinking.

This is the core idea behind my book, *Don't Think When You Code*. It's not about being reckless. It's about building the cognitive foundation that makes flow states accessible and decision-making instinctive.

## The Origin of Flow in Software Engineering

Every software engineer has an origin story — the first time code made everything else disappear. For me, it was a basement in central Illinois in 1995. I was ten years old, sneaking downstairs after bedtime to an IBM 486 running Windows 3.1 and a book called *QuickBASIC Made Easy*.

The first lessons were frustrating. I wanted to build something I cared about, not what the book told me to build. But curiosity kept me going. When I finally created a framework for drawing large block letters on screen using variable offsets inside a 10-by-10 grid, something clicked. What felt like thirty minutes was really four or five hours. I had built something that worked, and I felt amazing.

Psychologists had been studying this state for decades. They called it **flow**. Mihaly Csikszentmihalyi discovered that people across wildly different activities — chess, rock climbing, surgery — entered the same state of deep engagement when the challenge matched their skill level. His research revealed a surprising paradox: people were most likely to experience flow at work, yet they said they preferred leisure. They were having their best experiences during challenging work and didn't even recognize it.

Flow has the same key elements every time: complete concentration, clear goals, a balance between challenge and skill. Self-consciousness disappears. Hours feel like minutes. The activity becomes rewarding in itself.

For engineers, this explains why the same coding work sometimes feels effortless and energizing, and other times feels like a grind. The question is: how do you systematically build the competence that makes flow accessible?

## Why Experience Alone Isn't Enough

Most engineers confuse experience with practice. Ten years of writing code is not ten years of deliberate practice — it's often one year of learning repeated ten times. The difference is intentionality.

I learned this the hard way at a digital marketing firm in Chicago. After building a few instant-win sweepstakes websites, each new site became harder to care about. The brands changed, the prizes changed, but the code was the same. By every measure that mattered to the company, I was doing well. But doing well and getting better aren't the same thing.

The hours weren't working because there's a difference between doing the work and training to get better at it. The answer came not from a software engineering book, but from a wrestling practice room.

## The Training Journal Technique

At the University of Illinois, I competed on the wrestling team while studying computer engineering. In a sport as brutally honest as wrestling, effort alone wasn't enough. I wasn't improving fast enough.

An assistant coach named Adam Tirapelle, who'd placed third, then second, then won an NCAA championship, gave me advice that changed everything: **find one detail to improve each day and write it down**.

I picked one skill — an outside single-leg takedown — and wrote down one small adjustment every day:

- Move my left foot two inches farther forward
- Push my elbow slightly more inside
- Keep my eyes focused a few inches higher

After months of drilling tiny corrections, the takedown that had once felt impossible became automatic. Years later, I applied the same process to software engineering. Every time I got stuck, I wrote it down:

- When to use public vs. private variables
- How to set up dependency injection
- How to name variables cleanly

Each item became a deliberate practice rep. Over time, the journal turned information into subconscious understanding.

## When Deliberate Practice Saved a Project

The real test came during one of the most difficult projects in my career. I'd joined a company rebuilding its entire e-commerce platform. Cyber Monday had crashed the site two years running, costing hundreds of thousands in lost revenue. Our team of fifteen was rewriting everything from scratch using tools none of us had professionally used before: Domain-Driven Design, Test-Driven Development, and Azure cloud.

Every night after work, I trained. I built side projects, created exercises, and wrote down every concept I had to search for. I was building a personal library of patterns in my subconscious.

When the search engine rewrite fell behind with two weeks until launch, I volunteered to help. I spent two full days just reading the legacy code — thousands of lines of Classic ASP — without writing anything new. By the weekend, I started coding.

After an hour, something clicked. The entire problem laid out in my mind like a blueprint. The patterns I had seen aligned with the skills I had drilled into muscle memory. When I finally looked up, it was 3 AM. I should have been exhausted. Instead, I felt completely energized.

That flow state wasn't accidental. It was the direct result of months of deliberate practice that had built the cognitive tools I needed to handle that level of complexity.

## Task Templates: Stop Reinventing What Already Works

Deliberate practice builds skills. The next layer is eliminating unnecessary decisions. Most teams treat every feature like it's never been done before. SQL vs. Postgres gets debated until someone suggests MongoDB. The same architectural decisions get relitigated, the same technology trade-offs get researched, and solutions to previously solved problems get reinvented from scratch.

I started calling the solution **task templates** — pre-built approaches for common problems that eliminate repeated decision-making. A task template groups smaller well-known tasks together. The team discusses what API endpoints they need or how to structure objects without getting overwhelmed by every small detail.

This approach saved a project with SEC regulatory deadlines. Consultants had estimated ten months of work. My co-lead Richie and I broke the solution into known approaches and delivered in six months — not by working longer hours, but by separating learning from building. We learned during planning, then executed during building.

A junior engineer knows one way to solve a problem. A mid-level engineer knows many ways. An expert knows which one to use. Task templates don't make you less creative. They free you to be creative when it actually matters.

## Mental Models: Don't Use Your Eyes to See Code

Task templates reduce decisions. Mental models train your decision-making itself.

One of the most impressive engineers I've worked with was ready to give up on a fifteen-year-old codebase — thousands of lines of patched-together code. His team was in "violent agreement" that the only option was a rewrite, but there wasn't enough time.

I told them: **don't use your eyes to see code**. Instead of reading every line, let your subconscious scan for patterns. The code started to tell a story. Different patterns made it clear which parts had been written in different time periods. Some had been partially refactored, while others remained intact like mini time capsules.

This is what Annie Duke, the poker champion turned decision scientist, calls the "menu strategy." When you've narrowed to two viable options, stop deliberating and pick one. Your trained subconscious has already done the hard work. The deliberation is the illusion.

But trusting your subconscious only works if you keep training it. The industry changes, your tools change, and instincts built three years ago start producing outdated answers.

## How to Start Building Your System

The practical framework from the book comes down to four habits:

### 1. Capture Your Hesitations

Notice when you pause — when you search for something you feel like you should know, when you copy code without understanding it, when a teammate asks why you made a choice and you struggle to explain. Write it down.

### 2. Group What You Find

After a few days, patterns emerge. Group them into focus areas: dependency management, async programming, API design. These become your personal curriculum built from your actual gaps.

### 3. Create Your Own Exercises

Pick one focus area and create exercises that push you slightly past what's comfortable. If the exercise feels easy, it's not teaching you anything.

### 4. Keep a Decision Journal

When you make a technical choice, write down the context and your reasoning. Review it later — not whether the outcome was good, but whether the decision was good given what you knew. Over time, patterns emerge that become your decision shortcuts.

## The Path Forward

The title *Don't Think When You Code* isn't about being thoughtless. It's about doing the hard work of deliberate practice so that when pressure is high and the stakes matter most, your brain already knows the answer.

Flow isn't something you find by accident. It's something you build access to through systematic training. The engineers who thrive aren't the ones who think the hardest in the moment. They're the ones who trained the hardest before the moment arrived.

## FAQ

### How much time should I spend on deliberate practice?

Even 30 minutes a few times a week produces measurable growth over a year. The key is consistency and intentionality. Start with one habit — capturing hesitations or keeping a decision journal — and build from there.

### Can AI tools replace the need for deliberate practice?

No. AI tools amplify existing judgment but cannot create it. When an AI generates 500 lines of code in seconds, your value lies in knowing whether those lines solve the right problem and recognizing architectural patterns that will cause pain later. These are judgment skills built through deliberate practice.

### Is this only relevant for junior engineers?

Deliberate practice is especially important for senior engineers and leaders. The skills that matter most at senior levels — architectural judgment, organizational awareness, technical communication — require the most intentional development.

### What's the difference between task templates and design patterns?

Design patterns describe solutions to recurring software design problems. Task templates are broader — they capture the full set of decisions, technology choices, and implementation steps for delivering a type of feature. They're your team's playbook for execution, not just architecture.
