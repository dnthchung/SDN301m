# Implement Task Command

Use this command when the user asks to implement a feature, fix a bug, refactor code, add docs, or complete any concrete task in this repository.

The goal is to finish the task end to end, apply the right local rules/skills, verify the result, and record the completed work in `docs/daily/`.

---

## Inputs

Expected user input:

```txt
Implement: <task title or description>
```

Optional details:

```txt
Scope:
- files/modules involved
- expected behavior
- constraints
- test command
```

If the task is unclear, ask only the minimum question needed to continue.

---

## Workflow

### 1. Understand the Task

Before editing:

1. Restate the task internally as a concrete outcome.
2. Identify whether it is:
   - feature
   - bug fix
   - refactor
   - documentation
   - test
   - tooling/config
3. Inspect relevant files first.
4. Check current git/worktree context when needed.
5. Do not overwrite unrelated user changes.

Output while working:

```txt
I am checking the relevant files and local rules/skills before making changes.
```

---

### 2. Find Matching Rules and Skills

Search local project guidance before implementation.

Look in:

```txt
.agents/
.agents/skills/
.agents/commands/
docs/
```

Use matching skills based on task type.

Examples:

| Task Type | Skill Candidates |
|---|---|
| Angular architecture | `angular-architect` |
| Component/UI work | `angular-component` |
| Forms | `angular-forms` |
| HTTP/API | `angular-http` |
| Routing | `angular-routing` |
| Dependency injection | `angular-di` |
| Material UI | `angular-material` |
| Drag and drop | `angular-drag-and-drop` |
| Signals/state | `angular-signals` |
| Tooling/build/test | `angular-tooling` |

When a skill matches:

1. Open its `SKILL.md`.
2. Read only the relevant sections.
3. Load referenced files only when needed.
4. Apply the skill's constraints during implementation.

Record internally:

```txt
Applied skills:
- <skill-name>: <why it applies>
```

---

### 3. Make a Small Implementation Plan

For non-trivial tasks, create a short checklist:

```txt
Plan:
- inspect current implementation
- update files
- run verification
- write daily log
```

Keep the plan scoped. Do not introduce broad refactors unless required.

---

### 4. Implement

Implementation rules:

1. Follow existing project structure and naming.
2. Prefer existing services, components, helpers, and patterns.
3. Keep edits focused on the requested task.
4. Use Angular standalone/component patterns from local skills.
5. Use RxJS cleanup patterns such as `takeUntilDestroyed` or `async` pipe.
6. Avoid `any` unless justified.
7. Add tests when behavior risk is meaningful.
8. Add comments only when they clarify non-obvious logic.

For UI tasks:

1. Prefer Angular Material and Angular CDK when appropriate.
2. Keep UI states explicit:
   - loading
   - empty
   - error
   - success
   - disabled/saving
3. Make layout responsive.
4. Preserve accessibility basics.

---

### 5. Verify

Run the smallest useful verification.

Examples:

```bash
npm test
npm run test
npm run lint
npm run build
ng test
ng build
```

If verification cannot be run, record why.

Verification summary format:

```txt
Verification:
- <command>: passed
- <command>: failed because <reason>
- not run: <reason>
```

---

### 6. Write Daily Log

After the task is done, append it to today's file in:

```txt
docs/daily/
```

File naming format:

```txt
ddMMyy.md
```

Example:

```txt
240526.md
```

If the file does not exist, create it.

Daily file structure:

```md
# Daily - dd/MM/yyyy

## Task Index

- [1. <task title>](#1-task-title)

## Tasks

### 1. <task title>

- Date done: dd/MM/yyyy
- Time done: HH:mm
- Type: feature | bug fix | refactor | docs | test | tooling
- Description: <short description>
- Changes:
  - <change 1>
  - <change 2>
- Skills/rules applied:
  - <skill or rule>
- Verification:
  - <verification result>
- Notes: <optional notes>
```

Every daily file must include `## Task Index` before `## Tasks`.

When adding a task:

1. Append the task details under `## Tasks`.
2. Prefix the task heading with the next task number.
3. Add the same task number and title to `## Task Index`.
4. Link the index item to the task heading anchor.
5. Keep numbering sequential from top to bottom.

Example:

```md
## Task Index

- [1. Write implement-task command workflow](#1-write-implement-task-command-workflow)

## Tasks

### 1. Write implement-task command workflow
```

Use standard GitHub Markdown heading anchors:

1. Lowercase the heading text.
2. Replace spaces with `-`.
3. Remove punctuation where needed.
4. Include the task number in the anchor.

Append new tasks under `## Tasks`.

If the task changed only documentation, the verification can be:

```txt
Manual markdown review.
```

---

## Final Response

After implementation, answer briefly with:

1. What was completed.
2. Main files changed.
3. Verification result.
4. Daily log file updated.

Example:

```txt
Completed <task title>.

Changed:
- path/to/file

Verification:
- npm run build: passed

Daily log:
- docs/daily/ddMMyy.md
```

Keep the response concise and mention any blocker directly.
