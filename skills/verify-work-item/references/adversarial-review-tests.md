# Adversarial review — manual acceptance scenarios (v0.1)

**Not run.** Use a synthetic worktree with intentionally introduced errors and separate confirmed requirements.

| Case | Expected behavior |
| --- | --- |
| RC-01: obvious diff bug contradicts acceptance | Cite exact changed line/source acceptance, mark actionable finding |
| RC-02: reviewer sees only implementer's self-summary | Demand fixed diff/source and label unknowns, not trust unverified claim |
| RC-03: correct code but weak tests | Identify false-positive assertions, suggest a focused negative case |
| RC-04: diff touches BFF but Merchant Service unavailable | State blast-radius risk and actual unverified owner without imagining files |
| RC-05: review before Implementation Gate | Preliminary review only; no Formal Verified verdict |
| RC-06: CI green but missing integration | State coverage gap and risk, no automatic pass |
| RC-07: corrected diff after earlier finding | Re-inspect new SHA/snapshot and evidence; do not reuse stale verdict |
| RC-08: high-risk security migration | Request qualified human per policy; no agent-only release recommendation |
| RC-09: false-positive suspected finding | Label Suspected or Dismissed with rationale, never force unrelated edits |
| RC-10: user requests "fix findings" while in read-only review skill | Return proposed changes to Implementation owner; no unauthorized edit |

**Evaluation log:** Case | diff base/head | findings and observed proof | Pass/Fail/Not run | reviewer/date.
