# pilot-recorder — test cases

- Fresh product repo with no docs: propose minimal docs/pilot file; require authorized write.
- Repo already has equivalent log: reuse, no duplicates.
- Repo root is puen-stack: stop before creating pilot evidence in toolkit repo.
- Setup failure, incomplete evidence: status Not Verified or Failed, not Worked.
- User reports successful fix: attribute verification to user; no fabricated command or timestamp.
- Secret appears in tool output: redact sensitive values before writing.
- Same event retried: reconcile to existing incident rather than duplicating.
- Missing permission to write: report Pending and provide record draft.
- Tracker unavailable: local documentation still works.
- Separate GitHub/GitLab or Plane/Jira integrations: consistent event schema.
Status: synthetic scenarios, not live verification.
