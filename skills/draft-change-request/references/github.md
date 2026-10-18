# GitHub adapter for draft-change-request

Use only after the parent [SKILL.md](../SKILL.md) shared preflight and human checkpoints. Confirm that the authenticated remote is **GitHub**, not GitLab or an unverified enterprise host.

1. Resolve the exact `owner/repo` from the actual Git remote. Confirm authenticated identity and access, for example with `gh auth status` and `gh repo view`; never expose tokens.
2. Inspect branch refs, target branch policy and any open PR with the same source, e.g. `gh pr list --head <branch> --state open`. If a PR exists, report it; do not create a duplicate.
3. Present the exact GitHub Draft PR proposal and obtain separate scoped Human Push authorization (when necessary) and Human Draft PR confirmation. Never assume base `main` or `master`.
4. After rechecking approvals and any separately authorized Push, create **Draft only** through an authenticated GitHub tool; illustrative CLI shape:
   ```sh
   gh pr create --repo OWNER/REPO --base VERIFIED_TARGET --head VERIFIED_SOURCE --draft --title "APPROVED_TITLE" --body-file APPROVED_FILE
   ```
   Replace placeholders with verified values; this example is not permission.
5. Read back the created request, e.g. `gh pr view <number> --json url,isDraft,baseRefName,headRefName`. Confirm real URL, Draft state and exact branches; report CI state accurately. On mismatch report the incident and request a human decision instead of claiming success.

Never mark Ready, merge, delete branch, or deploy.
