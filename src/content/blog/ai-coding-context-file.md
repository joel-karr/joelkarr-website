---
title: "What to Put in an AI Coding Context File"
description: "Build an AI coding context file that captures your system's rules, reference paths, and boundaries. A worked example shows what belongs in the file."
date: "2026-11-02"
author: "Joel Karr"
tags: ["software-craft", "ai"]
slug: "ai-coding-context-file"
image: "/images/blog/ai-coding-context-file.webp"
imageAlt: "A hand arranges connected reference cards beside a laptop on a sunlit wooden desk."
---

Suppose you ask an AI coding assistant to hide archived projects from a project picker.

It finds the shared project query, adds a filter, and updates the picker. The screen looks right. Then someone opens an old invoice and the project name is missing.

This is a hypothetical example, but the missing information is familiar. In this system, archived means unavailable for new work. It does not mean invisible everywhere. Historical invoices still need to display the project they belong to.

That distinction might be obvious to everyone on the team. It still needs to reach the assistant before it chooses where to make the change.

A useful AI coding context file captures the facts that change implementation decisions: what the system does, what its terms mean, where established behavior lives, and which boundaries a change must preserve. Start with those facts. Add specific repository paths so someone can verify them. Keep the immediate feature request separate.

Here's how to build that file without turning it into another documentation project nobody maintains.

## Start with the correction you keep making

“Follow our conventions” is hard to act on. “Archived projects remain readable from historical invoices” gives an engineer a decision they can use.

Before writing anything, look at a recent task that needed a correction. Ask what the author would have needed to know earlier. Perhaps a familiar domain term means something unusual in your business. Perhaps the obvious helper is shared by several workflows. Perhaps a strange-looking branch protects an integration you cannot change.

Write down the missing fact and where you confirmed it. Distinguish three kinds of information:

- **Established behavior:** The current system does this, and you can point to the implementation or a test.
- **Agreed requirement:** The team has decided the system should do this, even if the implementation has not caught up.
- **Open question:** Nobody has resolved this yet.

That distinction matters. A context file can make an assumption look official just by putting it under a heading. If two engineers disagree about whether archived projects should appear on invoices, you have a product or design decision to resolve. Do not ask the assistant to quietly choose a rule for the team.

This is the same reason [shaping the problem before planning](https://www.joelkarr.com/blog/why-software-estimates-go-wrong) matters. Writing down an unclear requirement does not make it clear. You have to settle the ambiguity that changes the work.

## Separate lasting context from today's request

For our project-picker example, assume the team has confirmed these rules:

- A project groups work for a customer.
- Archiving prevents new work from being assigned to that project.
- Archiving preserves existing work and historical invoice references.
- Access remains limited to the user's organization, whether a project is active or archived.

Those rules belong in shared context because they affect more than one feature.

“Hide archived projects from the new-work picker” belongs in the task brief. So do that task's acceptance criteria and exclusions. Next week's task might be an archive-history screen that intentionally shows the same projects.

Reusable procedures belong in a third place: the team's task templates or skills. How to add an endpoint or extend a component can be reused across features. The distinction builds on [task templates for predictable engineering teams](https://www.joelkarr.com/blog/task-templates-predictable-engineering-teams): preserve a proven approach without pretending that every task has the same business meaning.

Keeping these pieces separate makes changes easier to reason about. You can update a system rule without rewriting every prompt, or change a feature's scope without accidentally declaring a new rule for the entire repository.

## A worked context file

Here is an illustrative service-level file for our fictional application. The paths are invented for the example; replace them with files you have actually inspected in your repository.

```text
# Project service context

Purpose
This service manages projects used to group customer work.
The work-entry screen selects a project for new work.
Invoices also read projects to display historical references.

Domain rules
- Active projects can receive new work.
- Archived projects cannot receive new work.
- Archiving does not delete a project or its existing work.
- Historical invoices retain access to their project references.
- Organization access rules apply to both active and archived projects.

Where to look
- src/projects/ProjectQueries.ts: project lookup and list behavior.
- src/work/ProjectPicker.tsx: selection for new work.
- src/invoices/InvoiceProjectLabel.tsx: historical display.
- tests/projects/ProjectVisibility.test.ts: existing visibility cases.
- docs/decisions/project-archive.md: rationale for archive behavior.

Change boundaries
- Do not change a shared query's default visibility as a shortcut
  for a screen-specific requirement. Inspect its callers first.
- Preserve organization access checks when changing visibility.
- Stop and flag contradictions between this file, the decision
  record, and the implementation. Identify the conflicting sources.

Verification
Use the setup and test commands documented in CONTRIBUTING.md.
Check that the referenced commands and paths still exist before use.
Report checks that could not run and why.
```

Notice what this leaves out. It does not describe every component. It does not repeat the whole architecture document. It gives the reader enough orientation to find the right evidence and avoid a plausible mistake.

The paths do important work. “Keep historical behavior working” leaves room for interpretation. A named historical caller and a relevant test give the assistant somewhere concrete to investigate.

The file also preserves a distinction that matters to people: archived, deleted, and unauthorized are different conditions. Shared vocabulary is one of the practical foundations of [engineering team alignment](https://www.joelkarr.com/blog/why-engineering-teams-think-they-are-aligned). Putting it in a context file gives that vocabulary another place to be used consistently.

## Give the assistant a bounded task

Now the immediate request can be short and precise:

```text
Read the project service context and the files it references.

Task: Hide archived projects from the picker used to assign new work.

Keep unchanged:
- Historical invoice project labels.
- Existing work assigned to archived projects.
- Organization access rules.

Before editing, identify the query used by the picker and its other
callers. Propose where the visibility restriction should live.
List any unresolved product decisions instead of choosing for us.

Done means active projects remain selectable for authorized users,
archived projects are absent from this picker, and the preserved
behaviors above still work. Include evidence for those conditions.

Do not add deletion, restoration, or archive-management features.
```

The context file explains the system. The brief explains this change. Asking for the affected callers before editing creates a useful checkpoint: you can catch the wrong interpretation before it becomes an implementation.

You still need normal code review and testing. Instructions provide guidance; they do not enforce authorization or prove that behavior is correct. If a rule matters, preserve it in the implementation and appropriate automated checks as well.

## Make sure the tool actually receives the file

Saving a file in the repository is only part of the work. Check how your coding assistant discovers instructions and which files apply to the task.

For example, GitHub documents repository-wide Copilot instructions in `.github/copilot-instructions.md` and path-specific instructions in `.github/instructions/NAME.instructions.md`. Support varies across Copilot features, so follow the documentation for the surface you use rather than assuming every file applies everywhere. [GitHub's repository instruction documentation](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions).

If you maintain a separate context document, explicitly provide it through your tool's supported workflow. Do not assume a filename such as `CONTEXT.md` guarantees automatic loading. Check available references or session details, and inspect whether the assistant's plan reflects the important constraints. A correct summary is a useful checkpoint, not proof that the eventual code will obey them.

Keep credentials and customer records out of these files. Use synthetic examples and approved documentation, and follow your organization's rules about what may be shared with its AI tools.

## Keep the file small by giving every line a job

After the first task, ask which statements changed a decision. Keep those. Remove generic advice that does not help someone navigate this codebase. Move feature-specific details back into the task brief.

When a rule changes, update the context in the same pull request as the code. If a reference implementation moves, fix the path. If an old constraint no longer applies, remove it rather than letting it become permanent folklore.

For your first file, use this short check:

1. Can a new engineer explain who uses this part of the system and why?
2. Are potentially confusing business terms defined?
3. Can each important rule be traced to code, tests, or an agreed decision?
4. Are the reference paths real and relevant to this area?
5. Is today's request separated from reusable system guidance?
6. Are unresolved questions clearly marked, with an owner to resolve them?

Start with one part of the codebase and one correction you are tired of repeating. Make the missing knowledge explicit, try it on a bounded task, and improve the file from what you learn.

In our example, the most valuable sentence was the one explaining what archived means. Finding and verifying that sentence was engineering work. The file makes it available the next time someone needs it.

These practices are part of my forthcoming book, *Don't Think When You Code: Training Your Engineering Instincts for AI*. [Join the launch list](https://www.joelkarr.com/) for a sample chapter and news when the book is available.
