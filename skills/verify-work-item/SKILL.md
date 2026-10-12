---
name: verify-work-item
description: Use to define source-backed acceptance before coding, run honest developer-owned checks, and perform formal independent behavior verification only after applicable green checks and an approved per-Work-Item Human Implementation Gate.
---

# Verify work item — tests and observable behavior (v0.1 pilot draft)

**Purpose:** Keep early verification planning distinct from executed developer tests and **Formal Independent Verification**. Follow [Accepted Verification v1.0](https://github.com/puennaja/puen-engineer/blob/master/workflows/verification.md), [Implementation v1.0](https://github.com/puennaja/puen-engineer/blob/master/workflows/implementation.md) and the [Verification artifact](https://github.com/puennaja/puen-engineer/blob/master/artifacts/workflows/verification.md).

- [Manual test scenarios](./TESTS.md)
- This skill never declares a Work Item done, approves a Human Gate, or deploys.

## Delivery ordering — canonical policy (2026-10-11)

The accepted My Engineer default is **Developer Checks green → Human Implementation Gate → locally feasible Formal Independent Verification → Human Verification Gate → separately authorized scoped Push → separately confirmed Draft PR/MR**. Early/provisional feedback and acceptance-first test planning remain allowed. **Remote-evidence exception:** when required CI/preview/integration evidence cannot be obtained locally, a human may explicitly approve a narrowly scoped earlier Push and, if necessary, separately approve a Draft PR/MR; unexecuted checks remain Not run/Blocked, and the Verification Gate cannot be claimed passed until necessary remote evidence is observed and a human makes the decision. CI/PR review findings trigger appropriate scoped fixes, retesting, independent re-verification and refreshed human decision. Never auto-merge/deploy. Canonical upstream: https://github.com/puennaja/puen-engineer/blob/master/workflows/verification.md .


## Test-selection discipline

Choose proof from the **change's observable surface** and risk instead of always requiring an E2E suite: fast unit/regression tests for local behavior, contract/integration checks for boundaries, UI checks for user-visible behavior and negative cases for meaningful failure modes. Explicitly name what each test would prove, its source-backed oracle, its environment and whether it actually ran. Distinguish developer-owned tests during `implementation` from the independent Formal Verification mode after human approval; do not manufacture a second author merely to claim independence. Verify tests can fail for the intended defect, not merely start the harness. If no unit-test seam exists, document justified alternate checks for Human Implementation Gate review.

## Modes — name one before taking action

1. **Acceptance-first preparation (pre-code):** read **confirmed** user stories, requirements, product decisions, contracts and boundaries. Produce an **independent expected-behavior oracle** with normal, negative, edge and authorization cases; identify safe proof surfaces. No code necessary. If requirements are uncertain, mark `Unknown` and ask the decision owner; do not generate expected behavior by reading the implementation and calling it correct.
2. **Developer checks (Implementation-owned):** for the assigned Work Item, identify existing test harness/build/lint/typecheck and cheapest relevant tests. After authorized implementation, run only safe commands on approved targets, capture actual results, never weaken assertions to force green or skip tests without recording a justified exception. These results prepare the **Human Implementation Gate**; they are not formal independent acceptance.
3. **Formal independent verification:** enter **only when** (a) applicable unit/regression tests and required developer checks actually passed **or** a no-meaningful-unit-test-seam alternative was explicitly accepted in the Human Implementation Gate, **and** (b) that Work Item's Human Implementation Gate was explicitly approved. If either condition is missing, stay in preliminary mode, mark `Blocked / Not run`, and ask for evidence/decision.

## Mandatory execution-safety preflight

Before any live or side-effecting command, identify the **actual test target**, repo/branch/build SHA, user/account/project permissions, dataset/fixture and isolation, network endpoints, writes/events/charges/external notifications, rollback/cleanup ownership and expected side effects. Read-only inspection can proceed with ordinary permission. Do **not** drive real Production, real customer accounts, uncontrolled shared databases, payments, messages, migrations, destructive cleanup or external integrations based on a general "test it" request.

- Prefer existing isolated local/synthetic fixtures and tests. Do not start services on disputed ports or kill processes you did not start.
- If authorization, test fixture safety or required environment access is uncertain, **do not execute** the side-effecting check. Record `Not run / Blocked` and propose a non-mutating alternative. Safety preflight is not an extra Human Quality Gate; it is required permission hygiene.
- Never claim a sandbox/mock proves an external live contract. Distinguish mocked behavior, actual integration and real user-facing API/UI/CLI observation.

## Procedure

1. Link the **assigned Work Item and parent Feature** from Plane/Jira/other source, exact acceptance version and approved in/out scope; verify relevant code revision, source and target repos.
2. Build a requirement-to-check map with observable expected results **before reading current behavior as an oracle**. Name risky negative/boundary/data/permission cases. Scope shared integration scenarios to the responsible owner.
3. Choose and execute checks for the selected mode under the preflight. Record exact command, environment/fixture, time, expected outcome, **actual stdout/exit code/test output evidence**, and `Pass | Fail | Not run | Blocked | Inconclusive`.
4. For **formal verification**, use four independent nets proportionally: **requirement correctness; fixed diff/test quality review (via `review-change`); real behavior/integration proof; evidence quality and residual-risk judgment**. Green unit tests are entry evidence, never sufficient proof alone.
5. If a finding changes code, return it to Implementation. After scoped fix, rerun the **affected developer checks** and repeat independent verification of the changed behavior. New material requirements or designs reopen only invalidated upstream decisions.
6. Recommend `Verified for release review | Fix and reverify | Blocked | Stop/defer` with evidence and owners. **Only the authorized human makes the Work Item Verification Gate decision**; do not mark a parent Feature integrated or a Plane item Complete merely from passing tests.

## Handoff table (to existing tracker/MR, not a new mandatory file)

| Acceptance / risk | Required? Why | Test command or real-surface check | Actual environment / revision | Expected → observed | Status | Evidence URL/path |
| --- | --- | --- | --- | --- | --- | --- |
| <source-linked criterion> | <reason> | <command or Not run> | <env / SHA> | <actual outcome> | <Pass/Fail/Not run/Blocked/Inconclusive> | <link> |

Also report:
- **Mode and eligibility** for formal Verification, including real developer checks and Human Implementation Gate evidence.
- Confirmed / inferred / unknown cross-repo contracts and external integration owners.
- Blocking findings, check coverage, still-open risks, next owner and human Verification decision `Pending` or actual cited record.

**Plane write behavior:** `work-item-runner` may publish this report as an AI-authored comment/description **after bounded Plane write authorization**; never post a human approval or mark a Work Item done as a substitute. No duplicate status reports on retries.

**Status:** Pilot draft. Verify tool safety and proof separation in a synthetic repository before live adoption.
