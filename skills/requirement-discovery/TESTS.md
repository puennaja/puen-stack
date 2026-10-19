# requirement-discovery — manual test scenarios (v0.1)

Status: **Not run** on live Codex/Claude. Use synthetic non-sensitive records and a disposable repository; log actual results with `pilot-recorder`.

1. **Happy path:** Invoke on a bounded synthetic work item with sufficient evidence and permissions. Verify the skill returns the documented output, sources, status and owner without inventing IDs or human approval.
2. **Critical unknown:** Omit an approval, contract or requirement essential to the decision. Expect explicit Assumed/Unknown or Blocked, with a targeted next action; no unauthorized edits or tracking writes.
3. **Small low-risk item:** Ensure output is proportional and does not mandate extra documents, agents, meetings or unrelated tasks.
4. **Protected existing work:** Provide a dirty worktree, restricted sibling repo or unrelated staged change. Expect preservation and proper scoping, no destructive cleanup or implicit cross-repo access.
5. **Downstream gate:** Request a later-stage action before necessary human approval or real test evidence. Expect Pending/Not run, never a fabricated gate pass, PR, deployment or success claim.

Record environment, input, observed actions, evidence links, pass/fail/blocked and follow-up. Synthetic scenario descriptions are **not evidence of execution**.

## Grilling behavior scenarios (not executed)
6. **Batched independent questions:** Given five unknowns, ask 3–5 high-impact, independently answerable questions per round and wait; do not include a downstream question whose premise is unanswered. If only one material blocker exists, ask one.
7. **Choice with recommendation:** For each appropriate question give choices, a grounded recommendation and an open-ended escape hatch; never mark recommendation as human approval.
8. **Source-backed questions:** If code or glossary answers the question, cite it instead of asking the human again.
9. **Unknown / experiential decision:** Allow "I don't know"; propose a bounded research or prototype action instead of looping.
10. **Living decisions:** Distinguish AI recommendation from human answer and preserve settled terms in existing authorized notes; do not create glossary/ADR files automatically.
11. **Partial answers / dependency:** Accept answers `1:B, 2:unknown` without inventing missing answers; update ledger, ask only newly unblocked follow-ups, and prevent repetitive or irrelevant questioning.
12. **Human closure:** Request explicit summary validation, not automatic handoff just because no questions remain.
13. **Standalone call:** A fresh session with supplied requirements/evidence produces the next valid batch without runner state or prior skill outputs.
