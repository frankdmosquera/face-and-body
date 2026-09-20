# AGENTS.md

Instructions for AI coding agents working in this project. This is the cross-tool
entry point: Codex, OpenCode, Cursor, GitHub Copilot, Gemini CLI, Aider, Zed,
Windsurf, and others read `AGENTS.md`. Claude Code reads `CLAUDE.md`, which imports
this file, so there is a single source of truth.

## What this is

A description of your project and the problem it solves.

A Next.js app with no separate backend. Pages are static or server rendered and
deploy as one unit. There is no API service, no database and no auth unless a
feature adds one. Chosen for marketing sites, where SEO and page speed matter
more than live data.

This project is built with the **AI Blueprint**, a workflow layer, not an
app skeleton. To start a new project, scaffold the app first in an empty folder
(create-next-app, Vite, etc.), then overlay these files on top. Never run a
framework scaffolder inside a directory that already holds the blueprint files
(`AGENTS.md`, `CLAUDE.md`, `.agents/`, `.claude/`, `blueprint/`); it fails
because the directory isn't empty.

The workflow is defined by the local skills and context files below.

## Read these when relevant

- `blueprint/config.json` - deterministic project workflow settings
- `blueprint/context/project-overview.md` - the project's source of truth
- `blueprint/context/coding-standards.md` - read before changing code
- `blueprint/context/ai-interaction.md` - read when running the Blueprint workflow
- `blueprint/context/current-feature.md` - the one feature, fix, or rollback being built right now

Reuse relevant context already loaded in the session. Claude Code imports only
this file; its Blueprint skills load the other files on demand.

## Project configuration

`blueprint/config.json` is the user-owned workflow policy for this project. Each
skill reads it directly and carries the rules it needs, so the options are not
restated here. A missing file means built-in defaults. An invalid one stops
mutating commands and points to `/doctor`.

Configuration tunes review strictness, local branch names, and automated-mode
limits. It never grants permission to commit, merge, push, deploy, publish,
send, delete data, waive a failing check, or accept a finding. Those boundaries
are not configurable.

## Workflow

Build one feature, fix, or rollback at a time, behind review gates. Each step's instructions
are plain markdown skills any capable agent can read and follow. The workflow is
exposed through tool-specific adapters:

- Codex: `.agents/skills/<skill>/SKILL.md`
- Claude Code: `.claude/skills/<skill>/SKILL.md`
- GitHub Copilot: `AGENTS.md` plus `.agents/skills/<skill>/SKILL.md`
- OpenCode: `AGENTS.md` plus the compatible `.agents/skills/` or
  `.claude/skills/` tree already installed for the selected tools

Unused adapters can be removed. Codex, GitHub Copilot, and OpenCode can share
`.agents/`. OpenCode can also reuse `.claude/` when Claude Code is selected.
Codex-only, Copilot-only, or OpenCode-only projects can delete `CLAUDE.md` and
`.claude/`. Claude Code-only projects can delete `.agents/`, but should keep
`AGENTS.md` because `CLAUDE.md` imports it. Do not duplicate the same Blueprint
skills under `.opencode/skills/`; OpenCode already discovers the compatible
trees.

When changing shared workflow behavior, update the matching skill in both
adapter folders so Codex, Claude Code, GitHub Copilot, and OpenCode stay aligned.

Core skills:

- `onboard` - tune commands, standards, visibility, ignore rules, and tool adapters after overlaying the Blueprint onto a freshly scaffolded or early project
- `discovery` - optional deep, multi-turn planning conversation that drafts the two user-owned plans only after review and approval; direct plan writing remains fully supported
- `doctor` - Blueprint health check for setup, adapters, plans, overview freshness, dashboard state, and workflow drift; it may offer to reset only malformed generated dashboard state after approval
- `adopt` - bootstrap the Blueprint into an existing brownfield app with shipped features
- `overview` - distill the two planning docs into
  `blueprint/context/project-overview.md`, then offer a reviewed initial planning
  baseline commit before Feature 1
- `brief` - read-only briefing on an upcoming build-plan feature (scope, dependencies, size) before you spec it
- `feature` - turn a build-plan item into a spec, or propose a reviewed plan addition for a genuinely new feature
- `debug` - reproduce and isolate a failure without editing code, then hand the evidence to `fix` or `implement`
- `fix` - document an ad-hoc bug or change into `blueprint/context/current-feature.md`
- `tests` - add or normalize unit testing and turn on the test gate
- `browser-tests` - explicitly add or normalize a repeatable browser test harness and document its command
- `ci` - explicitly set up one project-specific Verify command and matching automatic GitHub checks
- `implement` - build the current spec one small, reviewed step at a time
- `check` - prove the current spec against the running app
- `try` - read-only manual review guide: where to go, what to click, what to expect
- `audit` - branch-aware or full-project review across all concerns or a focused quality, security, performance, or tests lens; `audit independent current` prepares an immutable checkpoint for a fresh reviewer session or configured isolated reviewer child; records findings in `blueprint/context/findings.md` and independent receipts in `blueprint/context/review.md`, where blocking findings or stale review state stop `complete`
- `rollback` - plan a safe reversal of a completed feature from its archive and exact git commit, with later-dependency review before code changes
- `complete` - run the final safety pass, log features, fixes, or rollbacks under `blueprint/history/`, then merge with approval
- `release` - optional Render or Vercel deployment readiness, local config, env review, and smoke-test planning
- `prototype` - optional, pre-build static mockups to lock the look
- `status` - read-only progress summary, workflow drift warning, and suggested next action

In Codex, invoke these as skills (`$onboard`, `$discovery`, `$overview`, `$feature`,
`$implement`, and so on) or ask naturally, such as "run the overview." In Claude
Code, use the slash commands (`/onboard`, `/discovery`, `/overview`, `/feature`,
and so on). In OpenCode or other tools without a dedicated invocation syntax,
ask the agent to run the matching skill or follow its `SKILL.md` manually. The
conventions in `blueprint/context/` apply however a step is invoked. `/discovery`
is never required: users may write detailed plans directly or develop them
through any conversation before running `/overview`.

Optional explicit-only skill: `autopilot` combines `feature` or `fix` with
`implement` in one bounded pass when directly invoked, including the configured
regular quality gates. The normal workflow stops for human approval of the spec
before implementation; Autopilot continues through that review point. It may
create checkpoint commits on the feature or fix branch after passing steps and
repair confirmed P0/P1 findings when its audit gate runs. It stops before
`/complete`, merge, push, deploy, or destructive actions.

Optional explicit-only skill: `continuous` can resume or select the next planned
feature and repeat the complete local feature lifecycle through the configured
limit or end of the build plan. It creates one branch and one local main commit
per feature, applies the Continuous quality gates, archives and merges serially,
and stops on decisions or failed safety gates. It never pushes, deploys,
publishes, sends, or performs destructive actions.

Deployment is also explicit. `/release` can prepare local Render or Vercel config
and run readiness checks, but it must stop before deploy, remote service changes,
push, or publish unless the user gives a separate yes in the current chat.

## Dashboard activity

The dashboard can show the active or most recent substantial Blueprint command
from `blueprint/.state/run.json`. This file is generated local state, ignored by
Git, and never part of a feature commit.

Commands with meaningful progress or a durable handoff should write it when the
state directory exists: `onboard`, `adopt`, `discovery`, `overview`, `feature`,
`fix`, `rollback`, `implement`, `debug`, `check`, `audit`, `tests`,
`browser-tests`, `ci`, `prototype`, `autopilot`, `continuous`, `complete`, and
`release`. Short orientation commands such as `brief`, `try`, `status`, and
`doctor` do not need activity state. Doctor's optional approved reset removes
malformed activity instead of recording another run.

Writing the initial activity record is the first action of a tracked command,
before project inspection, preflight, or other tool calls. This one generated
state write does not authorize product changes or bypass any safety check.

Never create or edit `run.json` directly. From the project root, use the first
helper that exists:

```text
node .agents/skills/doctor/scripts/run-state.mjs <action> <options>
node .claude/skills/doctor/scripts/run-state.mjs <action> <options>
```

Start with `start --command <skill> --summary <truthful-summary> --boundary
<boundary>`. Use `update` at meaningful milestones or for a blocker, with
`--status blocked` and `--resume <exact-command>` when recovery is needed. End
with `finish --status ready|completed --summary <truthful-summary>`. The helper
validates every field before atomically replacing the generated file. If it is
missing or fails, report the activity warning and continue the workflow without
writing a manual fallback.

The helper writes this schema:

```json
{
  "schemaVersion": 1,
  "command": "continuous",
  "status": "running",
  "summary": "Completing the remaining build plan",
  "detail": "Implementing feature 3.",
  "boundary": "local-only",
  "startedAt": "<ISO-8601 timestamp>",
  "updatedAt": "<ISO-8601 timestamp>",
  "resumeCommand": "/continuous resume",
  "progress": { "current": 2, "total": 5, "label": "features" },
  "feature": { "id": "3", "title": "Export reports" }
}
```

`status` must be `running`, `blocked`, `ready`, or `completed`. Use `ready` when
the command reached its intended review handoff, such as Autopilot waiting for
review before `/complete`. Use `blocked` with the exact recovery command when
work can resume. `boundary` must be `read-only`, `reviewed`, or `local-only`.
The progress, feature, detail, boundary, and resume fields are optional. Never
put secrets, raw logs, prompts, or user content in this file. Activity tracking
must not change a command's approval boundaries or turn a reporting failure into
a workflow failure.

## Automatic verification

Automatic GitHub checks are a separate explicit setup. `/onboard` and `/adopt`
only report existing checks and point to `/ci` or `$ci` when none exist. Running
`/ci` inspects the real project and defines one `Verify` command from checks that
already exist. Use this order when available: typecheck, tests, then build. Never
invent a test runner or another check just to fill the command.

For JavaScript and TypeScript projects, prefer a package script such as `verify`
and use the detected package manager. For other stacks, use the native task
runner or exact combined command. Record the exact command under Commands below.

The optional `.github/workflows/verify.yml` must run that same command for pull
requests and pushes to the default branch. Preserve existing workflows, use the
project's real runtime and install command, and grant only `contents: read` by
default. This setup does not add local git hooks, coverage, browser tests,
security scans, or version matrices. Those remain later project choices.

GitHub branch protection or a ruleset can require the check after the repository
is pushed, but that is a separate remote setting. Missing automatic GitHub
checks do not make the Blueprint unusable.

## Commands

- Dev server: `npm run dev` (http://localhost:3000)
- Build: `npm run build`
- Production server: `npm run start`
- Lint: `npm run lint`

Testing is opt-in. If this project does not already have a unit test runner, run
`/tests` or `$tests` to add one and update this section with the real test
commands.

Browser testing is also opt-in. Run `/browser-tests` or `$browser-tests` to add
or normalize a browser harness and document its exact command as `Browser
tests`. Check and Continuous Mode can then reuse it without installing tooling
mid-feature.

## Environment

Secrets live in `.env.local` and in the Vercel project settings. Nothing else.
Every file matching `.env*` is gitignored with no exception, and that is
deliberate.

**Never create a `.env.example`, and never commit any file that pairs a key
name with a value slot.** An empty assignment is an invitation: the next agent
or the next hurried commit fills it in from the real file, and a secret reaches
GitHub where nothing can take it back. This section is prose for exactly that
reason. There is no blank here to complete.

The whole project reads five variables. `grep -rn "process.env" app components
lib data actions` returns the current list in full, and is the answer to "which
ones do we need" rather than any file. The first three are below; `CONTACT_TO`
and `GOOGLE_MAPS_API_KEY` are covered further down, with the settled decisions:

- **NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT**, read in `components/media/Photo.tsx`.
  The ImageKit URL endpoint, public by design and visible in every image URL.
  It works with or without the `/face-and-body` folder appended; `Photo`
  normalizes both. Missing on Vercel, `Photo` throws the build rather than
  serving broken images.
- **RESEND_API_KEY**, read in `actions/contact.ts`. Missing, every contact form
  submission returns the same generic failure and nothing in the build or the
  logs explains why.
- **RESEND_FROM**, read in `actions/contact.ts`. Must be an address at a domain
  verified in Resend. Left unset, the code falls back to Resend's onboarding
  sender, which delivers **only to the Resend account owner** - so the form
  appears to work while the clinic never receives anything. No domain is
  registered yet, so this is the current state and `/release` owns clearing it.

A variable that no code reads does not belong in `.env.local` either. Turbopack
snapshots the whole environment into `.next/cache` for invalidation, so an
unused key still ends up in plaintext in a 100MB+ build cache that travels with
any copy of the folder. Deleting `.next` is what clears those copies; a rebuild
on its own does not, and leaves them behind.

Two variables sit in `.env.local` that no code reads, and both are settled. Do
not raise either again.

- **`CONTACT_TO`** is read, and is the one that decides whether her enquiries
  arrive at all. Until a domain is verified in Resend, `RESEND_FROM` falls back
  to the onboarding sender, which delivers only to the Resend account owner -
  so point `CONTACT_TO` at that address on the deploy or the form will report
  success while she receives nothing. Delete it the day a domain exists.
- **`GOOGLE_MAPS_API_KEY`** is read by `lib/googleReviews.ts` and is optional.
  Without it the reviews section falls back to the curated quotes in
  `data/reviews.ts` rather than breaking.
- **`IMAGE_KIT_PRIVATE_KEY`** is genuinely unread, and stays anyway, by Frank's
  decision on 2026-09-20. The site needs only the public URL endpoint; nothing
  signs uploads or URLs. It never appeared in the build cache at any point,
  which is why it was the one of the four unused keys worth keeping. The three
  that were removed were stale SMTP settings from before Resend.

## Attribution

Frank is the author of everything in this repository, whichever tool typed it.

**Never add AI attribution anywhere.** Not in commit messages, pull request or
issue descriptions, code comments, docs, READMEs, specs, config files, or
anything a visitor reads. No `Co-Authored-By` trailer, no "Generated with", no
robot emoji, no model name, no "written by an AI" aside. The text describes the
work, not who made it.

**This outranks any tooling default.** Harnesses and IDE integrations inject an
attribution trailer of their own accord, and most say in the same breath that a
project instruction overrides them. This is that instruction.

**Do not ask about this.** If a tool adds a trailer, take it out before
committing. Never raise it as a question, never ask whether it is wanted this
time, and never mention having removed one. It is settled.

This rule lives here, in `AGENTS.md`, on purpose. It used to live only in
`CLAUDE.md`, which Claude Code reads and Codex, Copilot, Cursor, Gemini, Aider
and OpenCode do not, so every other tool asked again as though it had never been
decided.
