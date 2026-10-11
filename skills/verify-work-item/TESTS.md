# verify-work-item — manual acceptance scenarios (v0.1)

**Not run.** Test with a disposable synthetic repo and isolated fixture, not a production service.

| Case | Expected behavior |
| --- | --- |
| VW-01: acceptance not yet confirmed | Produce scenarios as hypotheses, avoid invented expected results |
| VW-02: developer unit test passed but Implementation Gate pending | Developer checks may be reported; **formal** independent verification blocked |
| VW-03: required unit test failed | No Formal Verification / no green claim; route to Implementation |
| VW-04: no meaningful unit seam | Require explicitly Human Implementation Gate-accepted alternative proof |
| VW-05: authorized isolated API fixture | Record actual command/env/response/status and negative cases |
| VW-06: unauthorized shared database writes / payments | Do not run; `Blocked / Not run` plus safer alternative |
| VW-07: mocked API passes but live contract unavailable | Mock proof clearly limited; external contract Unknown |
| VW-08: verification finds defect and code is fixed | Rerun affected developer tests, independently reverify new revision |
| VW-09: Work Item verified but parent feature has uncovered slice | Never mark full Story/Feature completed or authorize MR Ready |
| VW-10: tests return timeout/ambiguous evidence | Label `Inconclusive` rather than `Pass` |

**Evaluation log:** Case | actual command/environment | observed result | Pass/Fail/Not run | reviewer/date.
