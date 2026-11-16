---
title: "How to Debug with AI Without Getting Stuck in a Guessing Loop"
description: "Debug with AI using evidence, competing hypotheses, and small tests. A worked example and reusable debugging brief help you avoid speculative fixes."
date: "2026-11-16"
author: "Joel Karr"
tags: ["software-craft", "ai", "debugging"]
slug: "debug-with-ai-hypothesis-testing"
image: "/images/blog/debug-with-ai-hypothesis-testing.svg"
imageAlt: "Two search requests shown on a timeline, with the older response arriving after the current response."
---

Imagine a search box that occasionally shows the wrong results.

You type “cabinet.” The correct results appear. Then, a moment later, they change to results for “cab.”

You ask an AI assistant to fix it. It suggests a debounce. You try that, and the bug becomes harder to reproduce. Later, it happens again. The assistant suggests clearing the cache. Then changing the component’s state. Then rewriting the request handler.

You now have several changes and less confidence about what the original problem was.

This is a hypothetical example, but the debugging trap is familiar: each plausible explanation becomes another patch before anyone checks whether the explanation fits.

When I use AI to help investigate a bug, I want the next step to answer a question. What did we observe? What could explain it? What small test would help us choose between those explanations?

A useful debugging session should leave you knowing more about the system, even when the first proposed cause is wrong.

## Describe the failure before naming its cause

“The cache is broken” sounds like a bug report. It is already a diagnosis.

Start with something another engineer could observe:

> After entering “cabinet,” the page briefly displays results for “cabinet,” then replaces them with results for “cab.” The input still contains “cabinet.” We have reproduced this when typing quickly, but not on every attempt.

Now write the expected behavior:

> Once results for the current query are displayed, an older query must not replace them.

That gives the investigation a concrete target without deciding which layer is responsible.

Google’s [Effective Troubleshooting](https://sre.google/sre-book/effective-troubleshooting/) describes troubleshooting as an iterative process of forming hypotheses and testing them against observations. Its guidance also emphasizes problem reports that distinguish expected behavior, actual behavior, and reproduction steps.

AI can help organize that report. It can also accidentally blur it. Ask it to separate observed facts from assumptions, and check the distinction yourself.

“Only happens when typing quickly” may be an observation from your tests. “Therefore it is a race condition” is still a hypothesis.

## Ask for a test before asking for a patch

For the search example, several explanations deserve consideration:

- The browser sends an outdated query.
- The server receives the right query but returns the wrong results.
- The responses are correct, but an older response replaces a newer one in the interface.

Those possibilities point to different work. Changing all three areas would make the investigation harder to interpret.

A useful request to the assistant is:

> Identify the plausible causes supported by this report. For each, name the observation that would distinguish it from the others. Propose the smallest safe investigation before changing application behavior.

In this case, begin with a local reproduction using synthetic search terms. Capture the outgoing query, the returned result identifiers, and the order in which responses update the screen. There is no need to send customer data or production logs to a model to demonstrate this behavior.

The assistant can help locate the request code, suggest where to observe it, or build a test harness. You still need to inspect the actual results. A proposed logging statement is not an observation, and a generated explanation is not a test result.

## Follow one explanation all the way through

Suppose the local investigation produces this sequence:

1. The browser sends a request for “cab.”
2. It sends another request for “cabinet.”
3. The “cabinet” response arrives and updates the screen.
4. The “cab” response arrives later and replaces it.

Both requests contained the intended query. Both responses contained the correct results for their request. The interface applied them in arrival order.

That narrows the problem considerably.

In a React application that fetches directly in an Effect, the official documentation demonstrates using cleanup to ignore results from an obsolete Effect. It explicitly notes that network responses can arrive in a different order from the requests. The right implementation still depends on the application’s existing data-fetching approach. [React’s data-fetching guidance](https://react.dev/reference/react/useEffect#fetching-data-with-effects)

At this point, a debounce alone would not establish the behavior we need. It may reduce how often requests overlap, while leaving an older in-flight response able to overwrite the current result.

The next request to the assistant can be specific:

> The local trace shows that an older request updates the screen after the current request. Follow the application’s existing data-fetching pattern to prevent obsolete responses from updating the current results. Keep the change limited to this behavior.

That is a much better starting point than “try another fix.”

## Make the failure repeatable

An intermittent bug is difficult to verify by refreshing a page and hoping it happens again.

For this example, create a test in which you control when each request completes:

- Start request A for the earlier query.
- Start request B for the current query.
- Complete B and confirm that its results appear.
- Complete A.
- Confirm that the displayed results still belong to B.

Run that test against the original implementation. It should expose the incorrect behavior. Then run it against the proposed correction.

Also test the ordinary completion order. Otherwise, you might repair the unusual sequence while breaking the common one.

AI can help write these tests, but read the assertions. A test that only checks whether two requests completed misses the point. The requirement concerns which result the user sees after both have completed.

The same principle guides [reviewing AI-generated code](https://www.joelkarr.com/blog/how-to-review-ai-generated-code): decide what must remain true, then look for evidence that the implementation preserves it. Here, the investigation gives you the specific failure to test.

## Keep a short investigation record

You do not need a long document for every bug. A few lines can prevent the next prompt from reopening an explanation you already checked.

For our example:

> **Observed:** Older results can replace newer results while the input remains unchanged.  
> **Checked:** Outgoing queries and returned results match in the local reproduction.  
> **Supported cause:** Obsolete responses are still allowed to update the current screen.  
> **Evidence:** Controlled out-of-order completion reproduces the failure.  
> **Remaining checks:** Normal completion order, errors, and navigation away during a request.

Keep the scope of the conclusion visible. “The server returned correct results in this reproduction” is stronger and more accurate than “the server is fine.”

This is especially useful when you switch models, start a fresh session, or ask a teammate to help. The record preserves what was learned without requiring them to reconstruct a long conversation.

Your [AI coding context file](https://www.joelkarr.com/blog/ai-coding-context-file) can hold the stable rules: how the application fetches data, where tests belong, and which patterns to follow. The investigation record holds the temporary facts about this bug.

## A debugging brief you can reuse

Before the next AI-assisted investigation, fill in this brief:

> **Expected behavior:** What should happen?  
> **Observed behavior:** What actually happened, and what evidence supports it?  
> **Reproduction:** What steps, inputs, and environment produce the problem? What remains inconsistent?  
> **Relevant context:** Which code paths, versions, configurations, and existing patterns matter?  
> **Already checked:** Which explanations have been tested, and what did each test show?  
> **Next question:** What uncertainty should the next step resolve?  
> **Boundaries:** What may the assistant inspect or change? What data must stay out?  
> **Verification:** What test would demonstrate both the failure and the correction?

Then ask:

> Propose the smallest next investigation. Separate facts from hypotheses. State what each possible result would tell us. Do not change application behavior yet.

That last instruction is useful while the cause remains unclear. Once you have enough evidence, change the assignment explicitly and move into implementation.

During an active production incident, follow the team’s incident process and approved recovery actions. A careful investigation should not delay necessary mitigation. The brief can still help, but restoring service and establishing the full cause may happen on different timelines.

On the next bug, pause before accepting the first plausible patch. Ask which observation would make its explanation convincing. Then get that observation.
