## Folder structure

- src/ <br>
  --- config/<br>
  --- controllers/<br>
  --- middlewares/<br>
  --- models/<br>
  --- routes/<br>
  --- types/<br>

## Branch & Version Control Guide

| Type    | Example               | Prefix | Description                                      |
| ------- | --------------------- | ------ | ------------------------------------------------ |
| Main    | main                  | N/A    | The main branch                                  |
| Feature | feat/add-login-button | feat/  | A branch which is for one feature in development |
| Bug Fix | fix/email-validation  | fix/   | Branches for bug fixes                           |

## Workflow

---

### New feature/Bug fix

1. Create a new branch from the development branch
2. Coding
3. Create a Pull Request for review
4. Squash and Merge into Development
5. Delete feature/bug fix branch

### Pull Request (PR)

- Create a Pull Request (PR) and let your peers review the code. Please limit size to around 500 lines of code change at maximum) for code review
- Add reviewers and notify them to review. Please don't hesitate to grab your peer and review together.
- Reviewers SHOULD checkout the branch and check if the code work as expected
- Reviewers click Approve when pass the review.
- The PR creator should fix the codes based on suggestions, and let others review again.
- Code coverage should retain between PRs

### feat/fix/chore/… branch → main branch

1. After a PR is approved, the PR creator SHOULD merge the pull request using **Create a merge commit**

## Commit Guide

| Type     | Definition                                                                                             | Example                                              |
| -------- | ------------------------------------------------------------------------------------------------------ | ---------------------------------------------------- |
| build    | Changes which affect the build system                                                                  | build: update pm2 config                             |
| chore    | Housekeeping, no production code change                                                                | chore: update license                                |
| ci       | Changes to CI configuration files                                                                      | ci: update node version in travis                    |
| docs     | Documentation changes                                                                                  | docs: update setup procedure in readme               |
| feat     | New feature                                                                                            | feat: implement wallet payment screen                |
| fix      | Bug fixing                                                                                             | fix: missing user's avatar                           |
| perf     | Changes to improve performance                                                                         | perf: use PureComponent to reduce unnecessary render |
| refactor | A code change that neither fixes a bug nor adds a feature                                              | refactor: adopt atomic design for components         |
| revert   | Revert previous changes                                                                                | revert: wrongly changed filename                     |
| style    | Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc) | style: remove unnecessary white-space                |
| test     | Tests addition or correction                                                                           | test: add test for article redux                     |
