# Architecture decision: local-first static reviewer

## Status

Accepted for MVP.

## Context

The host repository is a dependency-free GitHub Pages portfolio. The first release must be fast to preview locally, safe to deploy, mobile-friendly, and easy for a tech lead or sub-agent to extend.

## Decision

Create a self-contained `ai-interview-reviewer/` microsite using semantic HTML, CSS, and small vanilla JavaScript modules. Store example records separately from rendering logic. Persist only example completion IDs in `localStorage`.

## Consequences

- No build step or framework migration is required.
- The reviewer cannot execute arbitrary code or sync between devices.
- Content can later move to JSON, Markdown, or a CMS without changing the product model.
- The portfolio remains isolated from the new interface except for one link.

## Data contract

Every example requires: `id`, `title`, `eyebrow`, `topic`, `level`, `minutes`, `roles`, `summary`, `prompt`, `questions`, `hints`, `solution`, `code`, `analysis`, `trap`, `followUp`, and `transfer`.

## Accessibility and privacy

- Native buttons and form controls are preferred.
- Expandable regions expose `aria-expanded` and stable labels.
- Motion respects `prefers-reduced-motion`.
- Completion data stays on the device and can be reset.
- No learner answer text or analytics are collected in MVP.
