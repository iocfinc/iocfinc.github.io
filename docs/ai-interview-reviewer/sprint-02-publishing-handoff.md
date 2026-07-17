# Sprint 02: Worked-library scale-up and publishing handoff

## Released scope

- 100 original worked examples in `ai-interview-reviewer/examples.js`.
- 50 AI-context coding cases: 30 easy, 15 medium, and 5 hard.
- 50 agentic systems-design cases covering grounded Q&A, support, finance research, conversational robots, typed tools, evaluation, triage, multi-agent coordination, voice, and governed platforms.
- Search plus library, difficulty, and role filters.
- Case-level progressive disclosure, local completion state, accessible filter state, and an explicit reset action.

## Content contract

Every record includes a prompt, three thinking questions, two hints, narrated solution, pseudocode or architecture sketch, trade-off, plausible trap, follow-up, and transferable principle. Scenarios are original practice material, not leaked interview questions.

## Publication checklist

1. Run `node --check ai-interview-reviewer/examples.js` and `node --check ai-interview-reviewer/app.js`.
2. Run the content-count/schema check in the release validation notes or equivalent CI command.
3. Serve the repository locally and complete browser QA for search, all filters, expand/collapse, completion persistence, reset confirmation, portfolio navigation, and the epic link at desktop and 375px widths.
4. Confirm `git diff --check` and a clean committed worktree.
5. Push `master` to publish through the repository's existing GitHub Pages configuration; verify the public URL after Pages finishes building.

## Next bounded slice

Add a timed interview mode with a scratchpad and a self-assessment rubric. Keep evaluation or authoring harnesses in CodexSkills if they are intended for reuse across products; this static site should only contain product data and UI behavior.
