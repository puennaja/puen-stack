# Optional My Engineer AGENTS.md permission policy

This is an instruction, not a technical security control; append to an existing AGENTS.md only after review.

- Read-only Git inspection and safe tests may run in authorized workspaces; test side effects must be checked first.
- Implement only approved Work Item scope; do not edit sibling repositories implicitly.
- Inspect staged diffs, hooks and secrets before commit. Default: `[<confirmed-work-item-id>] <type>: <short summary>` unless repository policy differs.
- Local commit does NOT authorize Push.
- Request separate human approval for exact repo/branch/revision before every Push; disclose CI/CD/deploy consequences.
- Request separate human approval for each Draft PR/MR (repo, source, target, title/body, dependencies and reviewers).
- **Ready / Merge / Deploy OFF by default.** Enabling shell allow rules removes a tool prompt, NOT the Workflow Human Gate. Merge can trigger production deployment.
- No force-push, reset of user changes, bypassing hooks, unapproved production tests, or leaking secrets.
- Plane writes require named workspace/project/record and verified role; never impersonate human approval.
- Report Not run/Blocked/Inconclusive honestly and record pilot evidence.
