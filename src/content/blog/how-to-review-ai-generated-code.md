---
title: "How to Review AI-Generated Code Without Outsourcing Your Judgment"
description: "Learn how to review AI-generated code with a practical checklist, a retry failure example, and a simple exercise that builds your engineering judgment."
date: "2026-10-26"
author: "Joel Karr"
tags: ["software-craft", "ai", "code-review", "deliberate-practice"]
slug: "how-to-review-ai-generated-code"
readingTime: "7 min read"
image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200"
imageAlt: "Open paper notebook with a pen resting on it, representing a software engineer's daily training journal"
---

An AI-generated pull request can be easy to read and hard to trust. The names are sensible. The functions are small. There are tests. You understand each line, but you still can't explain whether the change will behave correctly in your system.

That gap deserves your attention.

To review AI-generated code, start with the behavior the system must preserve, compare the implementation against that expectation, and test the failure that would matter most. Use automated checks to support the review. Keep the decision about whether the evidence is sufficient with an engineer who understands the consequences.

There is also a training opportunity here. Before reading the model's answer, write down what you expect. The differences will show you where the generated code needs work and where your own understanding needs work.

## Start with an expectation before you read the diff

Suppose the task says, “Add retries when the payment service times out.”

Before you look at the implementation, write a few sentences:

- A retry must not charge the customer twice for the same payment operation.
- We need to distinguish a rejected payment from a request whose outcome we don't yet know.
- The existing client may already retry, so we need to inspect that behavior before adding another loop.
- Tests should cover a successful remote operation whose response never reaches us.

Those sentences give you something to review against. Without them, it's easy to follow the implementation's logic and forget to question its starting assumptions.

This is an application of the practice I describe in [experience vs deliberate practice](https://www.joelkarr.com/blog/experience-vs-deliberate-practice-software-engineers): notice the specific thing you can't confidently explain, then turn it into an exercise. AI can produce an answer before you feel stuck. Writing your expectation first makes that missing understanding visible again.

You don't need to predict the exact classes or method names. Predict the important behavior.

## A hypothetical review where the tests pass

Consider this deliberately simplified example, not a production incident.

An AI assistant generates a payment wrapper. It sends a request, catches a timeout, waits, and tries again. It includes an idempotency key, which the payment provider uses to recognize repeated requests. But the wrapper generates a fresh key inside each attempt.

The accompanying test makes the first call throw a timeout and the second return success. The test passes.

Pause before reading further. What would you ask the author to prove?

The important question is whether the first payment happened. A timeout tells us that the caller didn't receive a response in time. It doesn't establish that the remote operation failed. AWS describes this ambiguity in its explanation of [making retries safe with idempotent APIs](https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/).

In our example, assume the provider processed the first payment, but its response was lost. The retry arrives with a new key. A provider that treats each new key as a distinct operation could process another payment.

The code contains an idempotency key. It still violates the requirement.

For a concrete API contract, Stripe documents using the same key to recognize retries of the same request. Its API v1 documentation also describes key retention and parameter matching, which matter when designing recovery beyond a short retry loop. Check the contract for the API version you actually use. [Stripe's idempotent request documentation](https://docs.stripe.com/api/idempotent_requests).

The review comment should be specific:

“The key changes on every attempt. If the provider processes the payment but we lose the response, the retry can look like a new operation. Preserve the identity of the same payment operation across retries, and add a test where the first attempt succeeds remotely but times out locally.”

That comment identifies the behavior, the failure condition, and the evidence needed to close the review. “Improve error handling” would leave all three unclear.

## Ask for evidence that could prove the implementation wrong

The original test only proved that the wrapper could recover from the failure its author imagined. It didn't model the dangerous case.

For this hypothetical wrapper, I would ask for a test double that records the first successful payment before throwing a timeout back to the caller. Then retry and assert that the simulated provider has recorded one payment, even though it received more than one request.

I would also inspect what happens when the process restarts. If a retry can occur in a later worker execution, keeping a key in a local variable won't preserve the operation's identity. That raises a design question about durable state, not just where to move a line of code.

A test double is only as good as the provider behavior it models. Use documentation and appropriate sandbox or integration tests to check those assumptions. Don't test recovery by issuing real customer payments.

The broader review habit is useful well beyond payments: find a condition under which the code could look successful while violating the requirement, then ask for evidence about that condition.

## A practical checklist for reviewing AI-generated code

For the next pull request, work through these questions:

1. **What behavior must remain true?** State the business rule in plain language. Include who is allowed to perform the operation and which data they may affect.
2. **What context does the diff leave out?** Read the caller, configuration, and relevant integration contract. Check existing retry, validation, and authorization behavior rather than assuming the new function owns all of it.
3. **Which assumptions came from the model?** Verify unfamiliar APIs, dependency versions, and claimed framework behavior against the repository and official documentation.
4. **What failure would hurt most?** Trace that path explicitly. A lost response, a partially completed write, or a request for another customer's data may matter more than another happy-path test.
5. **What evidence supports approval?** Inspect assertions, run the relevant checks, and confirm that tests exercise the requirement rather than merely repeat the implementation's assumptions.
6. **Can the team operate this change?** Check how failures become visible and how recovery works. For higher-risk changes, review rollout and rollback before approval.

Scale the depth to the consequence of being wrong. A display-label change and a payment retry do not need identical review effort.

An AI reviewer can help identify questions and propose test cases. Its silence isn't evidence that a change is correct. GitHub explicitly documents missed problems, false positives, and potentially incorrect suggestions as limitations of Copilot code review, and calls for human review and testing. [GitHub's responsible-use guidance](https://docs.github.com/en/copilot/responsible-use/agents).

## Turn one review finding into a practice rep

After the review, capture one detail you didn't understand well enough to predict.

For our example, a useful journal entry is: “I checked that an idempotency key existed, but didn't check which operation it identified or how long that identity survived.”

Then build a small exercise outside production. Model a remote success followed by a lost response. Predict what a retry will do, run it, and compare. Change one condition, such as a worker restart, and repeat.

If your expectation was wrong, investigate it before turning it into a rule. Ask a teammate to challenge your reasoning. This is how [mental models for software engineers](https://www.joelkarr.com/blog/mental-models-for-software-engineers) become useful: you learn the conditions under which a pattern applies, including where it stops working.

If the same mistake keeps appearing in generated code, update the shared instructions or reference implementation too. The next engineer should not have to rediscover a constraint you've already established.

On your next AI-generated pull request, write the most important requirement before opening the diff. Then choose one test that could expose a violation. You'll have a clearer basis for approval and a concrete way to train the judgment that approval depends on.

These practices are part of my forthcoming book, *Don't Think When You Code: Training Your Engineering Instincts for AI*. [Join the launch list](https://www.joelkarr.com/) for a sample chapter and news when the book is available.
