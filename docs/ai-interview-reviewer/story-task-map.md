# AI Interview Field Guide: story and task map

## Story 1: Learners can complete a worked-example review loop

Resolver statement: This resolves passive question browsing for AI interview candidates by letting them find, reveal, and complete a structured worked example on any device.

Acceptance criteria:

- Topic and level filters update the visible library.
- Every example contains a prompt, reasoning path, solution, trade-offs, trap, follow-up, and transfer principle.
- Completion persists after refresh and progress is visible.
- The page is keyboard-usable and responsive at 375px and desktop widths.

Child tasks:

- Task: Build the static reviewer shell and study-loop interactions.
  - Boundary: `ai-interview-reviewer/index.html`, `styles.css`, and `app.js`.
  - Done when: Filters, expandable walkthroughs, empty results, reset, and completion state work without dependencies.
  - Validation: Serve locally; exercise filters, expand/collapse, complete/reset, refresh persistence, keyboard focus, and mobile layout.
  - Depends on: None.
- Task: Author seven proof examples across the curriculum.
  - Boundary: `ai-interview-reviewer/examples.js`.
  - Done when: Easy, intermediate, advanced, system-design, and staff/FDE reasoning are represented at launch depth.
  - Validation: Content checklist and rendered inspection.
  - Depends on: Reviewer data shape.
- Task: Connect the portfolio to the reviewer.
  - Boundary: Surgical link in the existing portfolio project section.
  - Done when: The reviewer is discoverable without disrupting the legacy page.
  - Validation: Local link navigation and existing homepage smoke check.
  - Depends on: Reviewer route.

## Story 2: Learners can follow a role-relevant pathway

Resolver statement: This resolves curriculum ambiguity for candidates by giving basics, senior, lead/staff, and FDE/AI product users a sequenced route through the library.

Acceptance criteria:

- Four pathways state prerequisites, order, expected effort, and completion.
- A learner can start a pathway and see its next incomplete example.
- Pathways reuse examples rather than duplicating content.

Child tasks:

- Task: Define pathway metadata and the twelve-example launch corpus.
  - Boundary: Product content files only.
  - Done when: All examples pass the content quality gate and map to at least one pathway.
  - Validation: Curriculum coverage matrix review.
  - Depends on: Story 1 content schema.
- Task: Add pathway selection and next-up behavior.
  - Boundary: Reviewer interface and device-local state.
  - Done when: Starting and resuming a pathway is observable.
  - Validation: Manual pathway/resume scenarios.
  - Depends on: Pathway metadata.

## Story 3: Learners can rehearse rather than only reveal answers

Resolver statement: This resolves false fluency for candidates by providing timed attempts, a scratchpad, progressive hints, and a self-review rubric.

Acceptance criteria:

- Interview mode keeps the solution hidden until submitted or time expires.
- Notes remain local and are clearly described as such.
- Rubrics differ for coding, ML, system-design, and leadership scenarios.

Child tasks:

- Task: Design and implement interview-mode state transitions.
  - Boundary: Reviewer interaction layer.
  - Done when: Start, pause, finish, reveal, and retry states behave consistently.
  - Validation: State-transition scenario checklist.
  - Depends on: Story 1.
- Task: Author domain-specific scoring rubrics.
  - Boundary: Content schema and launch examples.
  - Done when: Rubrics reward reasoning, assumptions, validation, and communication.
  - Validation: Expert editorial review.
  - Depends on: Launch corpus.

## Story 4: The curriculum reflects current role expectations without pretending to know private loops

Resolver statement: This resolves generic preparation for AI Engineer, Forward Deployed Engineer, and AI Product candidates by translating public role evidence into dated, attributable preparation guidance.

Acceptance criteria:

- Each role pack distinguishes sourced facts, inference, and evergreen preparation advice.
- Sources are official and include access dates.
- Refresh ownership and cadence are explicit.

Child tasks:

- Task: Build the first role evidence matrix.
  - Boundary: Research packet and source log.
  - Done when: At least eight current primary sources cover the three target role families.
  - Validation: Source link and claim audit.
  - Depends on: None.
- Task: Convert evidence into role-pack curriculum deltas.
  - Boundary: Role-pack content, not core worked examples.
  - Done when: Each recommendation traces to evidence or is labeled inference.
  - Validation: Editorial provenance review.
  - Depends on: Evidence matrix.

## Story 5: The product can be launched and learned from safely

Resolver statement: This resolves launch uncertainty for the product team by making quality, privacy, accessibility, and user feedback observable before broader investment.

Acceptance criteria:

- Accessibility, responsive, link, and browser checks pass.
- Analytics are consent-aware and collect no answer text.
- Five target-user sessions produce prioritized findings.

Child tasks:

- Task: Add repeatable product-specific validation.
  - Boundary: Site checks and documented manual scenarios; reusable harness changes belong in CodexSkills.
  - Done when: Broken assets, invalid example records, and critical accessibility regressions are detected.
  - Validation: Documented validation command output.
  - Depends on: Story 1.
- Task: Run a five-user study and synthesize findings.
  - Boundary: Research plan, notes, and prioritized findings.
  - Done when: Findings distinguish comprehension, usability, and proposition risks.
  - Validation: Research debrief with decisions.
  - Depends on: Launch corpus.

## Recommended next mini-sprints

1. Complete Story 1 with the seven-example vertical slice.
2. Expand content and introduce the four pathways under Story 2.
3. Validate the core loop with users before building interview mode.
4. Ship the evidence-backed role pack as an independent content sprint.
