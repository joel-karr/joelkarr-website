---
title: "Experience vs Deliberate Practice: Why Years of Coding Don't Make You a Better Engineer"
description: "Experience vs deliberate practice: why years of shipping code leave engineers on a plateau, and the one-detail-a-day habit that turns daily work into training."
date: "2026-09-22"
author: "Joel Karr"
tags: ["software-craft", "deliberate-practice", "career-growth"]
slug: "experience-vs-deliberate-practice-software-engineers"
readingTime: "8 min read"
image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200"
imageAlt: "Open paper notebook with a pen resting on it, representing a software engineer's daily training journal"
---

Writing code got boring.

I'd left the company where I'd built my first real product and joined a digital marketing firm in downtown Chicago that built websites for some of the biggest consumer brands in the country. Instant-win sweepstakes, mostly. You'd pull a code off a case of beer, type it into the site, and find out if you'd won something. For the first few builds, it was fun. New domain, new problems, a team to learn from.

Then the builds started to blur together. The brands changed. The prizes changed. The code was the same architecture with a different configuration and front end. Engineers on my team would walk across the street to the convenience store two or three times a day to buy a drink we already had in the office fridge. Nobody said it out loud, but we were all looking for a way to reset our brains and grind through work that had become tedious.

Here's the part that took me years to understand. By every measure the company cared about, I was doing well. I shipped. I had more experience. But I wasn't a better engineer, and I couldn't figure out why. That gap is the whole story of experience vs deliberate practice, and it's the reason so many capable engineers stall out a few years into their careers without noticing.

## Doing Well and Getting Better Are Not the Same Thing

The advice you get early in a software career is some version of "put in the hours." Ship code, take on hard tickets, stick around long enough, and growth will follow. It sounds reasonable. It's also mostly wrong.

Experience is what happens to you while you do the work. It accumulates whether you pay attention or not. Deliberate practice is different. It's training aimed at a specific weakness, with feedback, repeated until the weakness goes away. You can do the same job for ten years and rack up ten years of experience while getting almost none of the second thing.

I've hired and managed a lot of engineers, and the ones with the most years on their resume are not reliably the strongest. Sometimes they're the ones most locked into the three or four patterns they learned in their first job. Experience made them fast at the work they already knew and did nothing for the work they didn't. If you're waiting for the hours to turn into skill on their own, you'll wait a long time. The hours have to be pointed at something.

### The Plateau Feels Like Competence

The tricky thing about the experience plateau is that it doesn't feel like a problem. It feels like being good at your job. Your estimates are accurate because you're building things you've built before. Your pull requests get approved quickly. Nobody is complaining.

But there's a tell. The work stops being interesting. If you've read my post on [flow state for software engineers](/blog/flow-state-for-software-engineers), you know that flow requires a challenge that slightly exceeds your current skill. When your skill stops growing and the challenges stay flat, flow disappears and boredom moves in. Those convenience-store trips weren't a caffeine problem. They were a training problem.

## What Two Weeks in the Cloud Room Taught Me

In the summer of 2011, I got a call about a company rebuilding their entire e-commerce platform from scratch. Their site had crashed under load on Cyber Monday two years running, costing hundreds of thousands of dollars each time. A decade of patched-together Classic ASP had reached the point where no amount of incremental improvement would save it.

A team of about fifteen of us was tasked with rewriting everything using tools none of us had used professionally: Domain-Driven Design, Test-Driven Development, Agile, Azure. We worked in a conference room with the walls literally painted to look like clouds, at folding tables buried in network cables and power strips.

I was the least experienced engineer in that room, and I knew it. I'd passed the technical interview by staying up all night studying concepts I'd never applied on a real project. So every night after work, I trained. I built side projects. I created my own exercises. Every time I got stuck during the day, I wrote it down and drilled it that night. I didn't have a name for it yet, but this was deliberate practice. I was building the cognitive tools I'd need before I needed them.

### Reading Before Writing

Two of our engineers had been assigned the search engine, the most complex part of the platform. Their spec was terrifying in its simplicity: keep everything exactly the same as it works now. Nobody knew exactly how it worked now. The five-month timeline collapsed as every business rule surfaced hidden dependencies. With two weeks left, there was no viable path forward, and I offered to help.

I started by reading.

For two full days, I didn't write a single line of new code. I read the legacy search engine over and over, reorganizing it in my head, looking for seams where I could break it into manageable components. Then, over a weekend, I sat down to see how far I could get. After an hour of coding, something clicked. The whole problem laid itself out in my mind like a blueprint. The patterns from two days of reading snapped together with the skills I'd drilled into muscle memory over months of nightly practice.

When I finally looked up, it was 3 AM. I wasn't tired. I was energized.

That flow state was not luck. It came from training that had happened long before the deadline. That's experience vs deliberate practice in one story. The engineers with more experience than me couldn't crack that problem, because experience had never asked them to. My practice had.

## Why Most Practice Advice Doesn't Stick

When engineers decide to get serious about improving, they usually reach for the wrong material. They study algorithms they'll never use at work. They memorize design patterns from a book. They pick up whatever framework is trending that month.

The problem with all of that is retention. If you aren't applying a concept in your daily work, you'll forget it within weeks. Knowledge without application evaporates.

So don't start there. Start with the code you're already writing.

Your real work is the best practice material you'll ever have. It's immediately relevant, and you'll reinforce it naturally because you need it to do your job. The only trick is learning to notice what you don't know while you're in the middle of discovering it.

### One Detail a Day

I learned this technique on a wooden bench in a college wrestling room, not from a computer science book. I was competing for the University of Illinois while studying computer engineering, surrounded by national champions, and barely scoring a point in practice. One of the assistant coaches, an NCAA champion who obsessed over the angle of his elbow instead of wins and losses, sat down next to me one day and told me to find one detail to improve each day and write it down.

I picked one takedown. Every day I wrote down a single correction: move my left foot two inches forward, keep my elbow tighter, raise my eyes a few inches. Months later, the move that had felt impossible was automatic. Not because I practiced more, but because every practice had a target.

Years later, I did the same thing with code. I kept a notepad next to my keyboard. Every time I hesitated, I wrote down why:

- Wasn't sure how to structure dependency injection for this service
- Confused about when to use async/await versus a synchronous call
- Couldn't explain to a teammate why I'd designed the interface that way

Each of those became a practice rep that night or that weekend. After a few weeks, the entries clustered into focus areas: dependency management, async programming, API design, database access. Those clusters became my curriculum, built from my actual gaps instead of someone else's syllabus.

Notice what this does. It takes the experience you're already accumulating and points it at something. Same hours. Same job. One version makes you faster at what you already know; the other makes you better at what you don't.

## Turning Daily Work Into Training

If you want to run this yourself, here's the shape of it. I go deeper on each step in *Don't Think When You Code*, but the basics are simple enough to start this week.

### Capture the Hesitation

Get a physical notebook. I know that sounds old-fashioned in an industry that lives on keyboards, but writing by hand forces you to slow down and articulate the gap, and that articulation is half the learning. As you work, notice the moments you pause: before writing an interface because you're not sure of the shape, when you search for something you feel you should already know, when you paste in AI-generated code and hope it works without understanding why. Write it down in one line and keep moving.

### Make It Uncomfortable

Once you've grouped a few entries into a focus area, build exercises that push slightly past what feels comfortable. When I was learning dependency injection, I refactored an old service to use it, built a console app from scratch with it, did the same with a web app, and then wrote out when to use each service lifetime without looking anything up. If an exercise feels easy, it isn't teaching you anything.

### Schedule It Like an Athlete

Wrestlers don't practice when they feel like it. They practice when it's on the calendar. Block thirty to sixty minutes a few times a week and treat it like a meeting you can't skip. Better yet, find one other engineer who wants to improve and set up a five-minute weekly check-in. Knowing someone will ask whether you practiced is enough accountability to keep most people consistent.

The notebook from the cloud room days is long gone, lost somewhere between job changes and apartment moves. The habit stayed. I still write it down when I notice the same hesitation twice. One detail. Written down. Every day.

## Experience vs Deliberate Practice: Pick the One That Compounds

If you're a few years into your career and doing well but not getting better, this is your diagnosis. It's not a motivation problem or a talent problem. It's that experience vs deliberate practice is a choice, and you've been letting the default win. Experience is what you get for showing up. Deliberate practice is what you get for showing up with a notebook.

That notebook is the foundation for everything else I write about, from task templates to mental models to performing under pressure, and *Don't Think When You Code* walks through how to build the whole system on top of it. Start with the hesitation you'll feel tomorrow morning. Write it down. Then go get the book and turn it into a rep.
