## The following are the assumptions

1. Scan data can be manually inserted, including repository name, status, findings, queuedAt, scanningAt, and finishedAt.
2. If the status is "Queued", the fields "findings", "scanningAt", and "finishedAt" should be null.
3. If the status is "In Progress", the fields "findings" and "finishedAt" should be null.
4. Findings should only be inserted when the status is "Success" or "Failure".
5. Fetch results should be sorted by the createdAt date.
