---
name: requirement-discovery
description: Use when an idea, product request, story or bug needs clarification of user problem, observable outcome, critical assumptions and acceptance examples before technical design. Risk-scaled optional specialist, not a mandatory ceremony.
---
# Requirement discovery (v0.1 draft)
Canonical policy: https://github.com/puennaja/puen-engineer/blob/master/workflows/requirement-discovery.md
Artifact: https://github.com/puennaja/puen-engineer/blob/master/artifacts/workflows/requirement-discovery.md

## Trigger and inputs
Run on an ambiguous idea, contradictory story, missing user behavior, or important acceptance uncertainty. Inputs: original user words, authorized tracker/issue source, requester or decision owner (Unknown if absent), observed evidence and project scope. For a clear low-risk edit, a short issue note may be sufficient; do not force invocation.

## Grilling-style interview (default for ambiguous discovery)
Inspired by Matt Pocock's grilling / grill-with-docs decision interviewing. This is a **self-contained**, vendor-neutral approach; no extra skills or CLAUDE.md needed.

1. **Inspect before asking:** Read original request, existing decisions, authorized issue, available glossary/docs and relevant code/contract evidence. Do not ask a human what existing sources can settle.
2. **Build a dependency-aware decision tree** of product behavior, terminology, scope, acceptance, risks and open assumptions. Internally distinguish prerequisites from downstream choices.
3. **Ask a focused batch by default:** select **3–5 high-impact questions per round** (fewer if only 1–2 matter), all independently answerable from current evidence. Group questions by topic, show numbering and priority, then WAIT for answers. Do not batch downstream decisions whose premises depend on another answer in the same batch. Only ask one question when a critical blocking decision must be resolved first or the user explicitly prefers single-question mode.
4. **Make questions actionable:** Briefly explain ambiguity and impact; offer 2–3 realistic options where useful; recommend an option *with an evidence-based reason*, without treating it as approved. Accept an alternative or "I don't know." For user research, ask for concrete past behavior before suggesting solutions, to avoid leading witnesses.
5. **Challenge and adapt between rounds:** After responses, summarize decisions, reconcile contradictions and update prerequisites before choosing the next batch. Ask follow-ups only for material implications, edge cases or unresolved high-risk ambiguity; do not re-ask already answered questions. Partial answers are valid: preserve Unknown and prioritize only what blocks progress.
6. **Handle genuinely unknowns:** Propose research, a bounded experiment or disposable prototype, a named follow-up, or Blocked when high risk. Stop repetitive questioning about experiential UI/UX choices best tested with a prototype.
7. **Track a compact decision ledger** in the existing authorized Work Item/Discovery Summary: question, options, AI recommendation, actual human answer, evidence, status, vocabulary and downstream effects. Differentiate `Recommended`, `Pending`, and `Human decided`. Resume from existing answers.
8. **Use lightweight documentation:** Reuse the current project's glossary if domain vocabulary becomes stable; don't automatically create GLOSSARY.md / CONTEXT.md. Suggest an ADR only for exceptional difficult-to-reverse decisions (normally in Solution Design), with human consent and a consumer. Never write tracker or repo without authorized scope.
9. **Confirm before exiting:** Playback a concise synthesis and remaining unknowns; explicitly ask the responsible human to validate or correct it before routing to technical exploration/prototype. Exhausting questions is not the same as receiving approval. Do not jump straight into coding.

### Synthetic example — first batch (independent questions)
1. **Meaning:** Does 'money left' mean (A) account balance or (B) balance after obligations? Recommend B *if* the goal is safe-to-spend; why: A may overstate available funds.
2. **Audience:** Is this for (A) one individual or (B) multiple household members? Recommend A for an initial single-user pilot only if that matches the actual intended user.
3. **Update rhythm:** Is (A) an end-of-day view or (B) a near-real-time estimate useful? Recommend A when daily manual entry is expected; otherwise mark Unknown.

Answer as `1:B, 2:A, 3:unknown` or in your own words. Wait. A dependent question such as 'how to model scheduled obligations' comes in the **next round** after question 1 is answered.

## Procedure
1. Keep **problem, desired outcome and proposed solution** separate. Identify actor, last concrete incident, workarounds, frequency, consequence of doing nothing and success signal. Never invent a numeric success target.
2. Extract **Confirmed (with source), Assumed, Unknown, Decision**; challenge the highest-impact assumptions. Ask a focused batch of independent decision-changing questions, non-leading and anchored to actual behavior; use a single question only for a blocking dependency. Do not ask questions already answered by evidence.
3. Probe only relevant alternative paths: missing/invalid inputs, permission, data/privacy, duplicate actions, failure/empty state, recovery and boundaries. Propose examples in Given–When–Then form only when grounded; label proposals unconfirmed.
4. Suggest a **smallest testable candidate scope**, non-goals and plausible observation or experiment. Do not choose architecture, promise features or split implementation tasks here.
5. Play back the concise **single Discovery Summary** to the designated human: problem/users, evidence, outcome, candidate scope, assumptions, priority unknowns, owner and next action.
6. Route to **technical explore / prototype / discover more / defer** using human decision evidence. Discovery validated for exploration does NOT imply design, implementation or gate approval.
7. Return the summary and decision ledger to the caller. If authorized tracker write is directly available, update only the existing parent within approved scope; otherwise provide a proposed update. Do not require or invoke another skill.

## Batch format and limits
- Default **3–5 questions per round**; never pad to five if fewer are useful. Prefer fewer for a tiny low-risk change, more only at explicit user request and when independent.
- Each question includes: short context/impact, options where useful, a clearly labeled evidence-based recommendation, and `Other / Unknown`.
- Offer a compact response syntax (`1:A, 2:C, 3:unknown`) but allow natural-language and partial answers.
- After each batch, maintain the decision ledger (Confirmed/Assumed/Unknown/Pending), resolve contradictions, and generate only newly unblocked follow-ups. **Never treat a recommendation as approval.**
- Do not mix architectural or implementation choices into product-discovery questions without a confirmed need.
- This skill remains stateless and standalone: reconstruct the decision ledger from supplied sources on each invocation; do not require any other skill to have run first.

## Output and verification
One summary or small existing-issue note; explicit source for every confirmation; prioritized open questions and named decision owner. Check that the summary doesn't turn guesses into acceptance. Record owner decision as Pending until genuine human confirmation; mark inaccessible evidence Blocked/Unknown.

## Synthetic example
Idea: "Show how much I can spend." Ask whether this means account balance or money after scheduled obligations; propose an example excluding transfers, labeled **Unconfirmed**. Route to a prototype rather than promising a bank integration.

## Limits
Read-only discovery unless separately authorized tracker write; no invented stakeholder validation, confidential exports, automatic approval or unrelated repo edits. Not live-validated with Codex/Claude.
