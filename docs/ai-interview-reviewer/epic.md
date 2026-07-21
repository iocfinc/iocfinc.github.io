# Epic: AI Interview Field Guide

## Product thesis

Build a commute-friendly reviewer where candidates learn AI engineering interview judgment through worked examples, not disconnected question lists. The product should help an early-career engineer learn foundations and let senior, lead, or staff candidates rehearse system trade-offs, technical leadership, and customer-facing decisions.

## First user and job to be done

The first user is an AI engineer preparing around a full-time job. In five to thirty minutes, they need to select a relevant scenario, attempt it, reveal a narrated solution, and retain one transferable pattern they can explain in an interview.

## Why this wedge

- General coding banks teach algorithms but rarely connect them to retrieval, inference, evaluation, or production AI.
- AI curricula often explain concepts without showing how interviewers probe assumptions and trade-offs.
- Senior candidates need architecture and leadership scenarios, not only more difficult algorithms.
- A static, local-first reviewer is fast to launch, works well on a commute, and avoids accounts or backend infrastructure before retention is proven.

## Product promise

One worked example should leave the learner able to explain the approach, reject a plausible wrong answer, handle a follow-up, and reuse the underlying pattern elsewhere.

## Outcomes and measures

### Release outcomes

- A learner can find an example by topic and level in under 20 seconds.
- Every example supports a 5-minute scan and a 15-minute guided review.
- Completion persists locally without requiring an account.
- The public library contains 100 original worked cases: 50 AI-context coding cases and 50 agentic systems-design cases.
- The coding library maintains a visible 60/30/10 easy/medium/hard mix (30 / 15 / 5 cases).
- Every systems case includes a workflow boundary, human-control decision, architecture sketch, evaluation lens, common failure, and follow-up.

### Product signals

- Example open rate and completion rate (instrument after consent and analytics work).
- Return rate within seven days.
- Self-reported confidence before and after a pathway.
- Transfer-exercise success during user interviews.

## Scope

### Current release

- Static, mobile-first reviewer.
- Role/level and topic filters.
- Worked examples with prompt, thinking questions, hints, narrated solution, complexity or trade-offs, common traps, follow-up, and transfer principle.
- Local completion state and visible progress.
- Four pathways: AI engineering basics, senior AI engineer, lead/staff, and FDE/AI product.
- Search plus library, difficulty, and role filters for a 100-case corpus.
- Original agentic scenarios spanning cited Q&A, support, finance research, conversational robots, tool use, evaluation, workflow triage, multi-agent coordination, voice, and platform governance.

### Later

- Timed interview mode and answer scratchpad.
- Search, spaced repetition, bookmarks, and personalized queues.
- Runnable code exercises and evaluator-backed feedback.
- Content authoring workflow, analytics, accounts, and cross-device sync.
- Company/role packs refreshed from attributable hiring evidence.

### Non-goals for MVP

- Reproducing proprietary interview questions.
- Competing with a full coding execution platform.
- Claiming that one curriculum exactly predicts any company's loop.
- Backend accounts, payments, social features, or generated scoring.

## Curriculum architecture

1. Coding foundations: easy-to-challenging algorithm patterns in authentic AI contexts.
2. ML and data reasoning: metrics, leakage, experiments, calibration, and drift.
3. Transformer internals: attention, masking, KV cache, adaptation, and serving trade-offs.
4. AI systems design: RAG, evaluation, gateways, agents, inference, and safety.
5. Senior/lead/staff/FDE scenarios: incidents, roadmaps, build-versus-buy, platform standards, pilots, and executive decisions.

Each example has three consumption modes: a 5-minute key-pattern review, a 15-minute walkthrough, and a later 30-minute interview simulation.

## Curriculum targets

The first scale-up release contains two deliberately bounded libraries:

1. **AI-context coding (50):** 30 easy, 15 medium, and 5 hard original algorithmic prompts. Each uses a familiar pattern in an AI product or infrastructure setting, without claiming to be a real company question.
2. **Agentic systems design (50):** original prompts across grounded Q&A, support, finance research, conversational robots, typed tool use, evaluation, triage, multi-agent coordination, voice, and platforms.

Every coding case must pass the content gate: attempt-first prompt, three thinking questions, two hints, a Python 3 narrated approach and solution pattern, trade-off, plausible trap, interview follow-up, and transfer principle. Systems cases use an architecture sketch with the same reasoning structure.

## Delivery sequence

- Sprint 1: prove the study loop with seven worked examples and local progress. Complete.
- Sprint 2: ship the 50/50 worked-case library, coding difficulty mix, search, and system-design depth. Complete pending browser QA and publication.
- Sprint 3: add interview mode, bookmarks, and transfer exercises.
- Sprint 4: conduct usability tests and make the experience accessible and launch-ready.
- Sprint 5: add evidence-backed role/company packs and a sustainable editorial refresh process.

## Risks and mitigations

- Shallow answer-bank content: require narrated reasoning, wrong approaches, follow-ups, and transfer exercises.
- Curriculum sprawl: ship twelve excellent examples before expanding breadth.
- Stale hiring claims: separate evergreen skills from dated source-backed role notes.
- False confidence: include rubrics, caveats, and prompts to explain answers aloud.
- Mobile fatigue: progressive disclosure, short sections, strong focus states, and no mandatory sign-in.
- Copyright or interview-integrity concerns: use original scenarios and public role signals, never leaked question banks.

## Decisions

- The first release is a static microsite inside the existing GitHub Pages repository.
- Content is product data, kept separate from rendering logic.
- Progress is device-local until retention justifies accounts.
- The public scale-up bar is both depth per example and a coherent 100-case corpus; content remains data-separated from rendering.
- Notion remains the intended operational tracker; this packet is the local fallback until a live Notion write surface is available.

## Definition of epic done

- One hundred examples meet the content quality gate, with the coding mix verified at 30 easy / 15 medium / 5 hard.
- Four pathways are usable end to end on mobile and desktop.
- A candidate can attempt, review, mark complete, and resume.
- Accessibility and browser checks pass.
- At least five target users complete a moderated or unmoderated study session.
- Launch messaging states the audience, promise, limits, and next action clearly.
