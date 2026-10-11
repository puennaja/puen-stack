# git-draft-pr — synthetic scenarios (not live-tested)

| Case | Input | Expected behavior |
| --- | --- | --- |
| GitHub ready, already pushed | Verified remote, implementation approval, approved exact Draft PR | Create one draft, read back real URL/state |
| No Push authorization | Local branch only | Request specific push approval; no push |
| No PR authorization | Remote branch pushed, no approval for exact PR | Proposal only; no PR |
| GitLab remote | GitLab host detected | Stop; route to gitlab-draft-mr |
| Duplicate PR | Open PR already exists for head | Return existing PR; do not duplicate |
| Missing target | Could be main/master | Investigate; no guess or PR |
| Secrets / failing mandatory checks | Risk found | Block, report evidence, do not publish |
| Unauthorized Ready/Merge | Request implicitly says finish | Never auto-ready/merge; ask separately |
| Work item evidence missing | Unverified issue ID | Don't invent ID; ask or mark unknown |
| No gh auth | CLI can't access GitHub | Blocked, no invented URL |
| Read-back mismatch | Created PR not Draft or wrong branches | Report incident, do not claim success; request human correction |

Status: design scenarios only; execute a controlled GitHub live smoke test and record results under pilot docs before declaring ready.
