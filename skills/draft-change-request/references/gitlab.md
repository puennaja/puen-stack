# GitLab adapter for draft-change-request

Use only after the parent [SKILL.md](../SKILL.md) shared preflight and human checkpoints. Verify **GitLab host and project namespace from the actual remote**; do not assume GitLab.com for a self-managed host.

1. Inspect `AGENTS.md`, branch/MR policies, actual source/target refs, exact host/project and `glab` or approved integration authentication. Account host must match remote host; do not infer access to sibling repositories.
2. Read existing open Draft/MRs for the source and required CI/review rules. Never create a duplicate or silently choose a target branch.
3. Show exact host/project/source → target, Work Item, dependencies, checks, reviewer and body. Require separate per-branch Push approval when necessary and **fresh, per-MR human confirmation** of the exact MR, even for stacked/multi-repo work.
4. Recheck branch revision, host, permissions and approvals. Only perform any separately authorized source-branch Push. Create Draft via authenticated GitLab tool; illustrative CLI shape:
   ```sh
   glab mr create --repo <group/project> --source-branch <approved-source> --target-branch <approved-target> --title "<approved-title>" --description-file <approved-file> --draft --yes
   ```
   Replace placeholders with verified values; the example is not authorization.
5. Read back actual MR URL, Draft state, source/target and CI/status. If host, state or branches mismatch, report the incident and stop rather than inventing a successful MR.

Never mark Ready, merge, rewrite protected history or deploy. Request a separate human confirmation for every further MR.
