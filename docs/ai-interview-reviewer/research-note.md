# Research note: what current AI roles imply for interview preparation

Snapshot date: 15 July 2026. This note uses public, official role listings and candidate guidance. It does not claim access to private interview loops.

## Reader and decision

- Primary reader: the product manager, curriculum editor, and tech lead for the AI Interview Field Guide.
- Decision: which competencies deserve worked examples in the launch roadmap.
- Governing answer: retain coding fundamentals, but make production ownership, evaluation, retrieval, ambiguity, and communication first-class practice lanes.

## Situation, complication, question, answer

- Situation: candidates still need algorithms, ML fundamentals, and clear technical communication.
- Complication: current AI Engineer, FDE, and AI PM roles span model behavior, production systems, customer workflows, evaluation, and organizational decisions.
- Question: how should one reviewer serve multiple roles and seniority levels without becoming a generic content dump?
- Answer: use one deep worked-case format, then vary the scenario, rubric, and follow-up by competency and level.

## Evidence matrix

| Public signal | Source | Fact | Product implication (inference) |
| --- | --- | --- | --- |
| FDE ownership | [OpenAI FDE](https://openai.com/careers/forward-deployed-engineer-%28fde%29-seattle-seattle/) | Discovery, scoping, system design, full-stack delivery, rollout, adoption, evals, and customer communication appear in one role. | FDE cases must cover the whole customer-to-production arc. |
| Ambiguous customer delivery | [Palantir FDSE](https://jobs.lever.co/palantir/dab396d4-2f14-4796-aac0-0d82883dccf0) | The role combines customer proximity, data work, application building, executive engagement, and deployment ownership. | Include discovery, data modeling, prototype, and stakeholder-readout exercises. |
| Applied model depth | [OpenAI Applied AI Engineering](https://openai.com/careers/research-engineer-applied-ai-engineering-san-francisco/) | The role includes transformers, frameworks, fine-tuning, data pipelines, monitoring, and performance/accuracy optimization. | API usage alone is insufficient; teach internals, adaptation, and production debugging. |
| Retrieval as a production domain | [OpenAI Retrieval and Search](https://openai.com/careers/research-engineer-retrieval-and-search-applied-engineering-san-francisco/) | Search indices, vector systems, production ML, and research-to-product work are explicit. | Give RAG, ranking, freshness, access control, and retrieval evaluation a dedicated track. |
| Staff infrastructure scope | [OpenAI ChatGPT Infrastructure](https://openai.com/careers/software-engineer-chatgpt-infrastructure-san-francisco/) | Distributed systems, concurrency, caching, backpressure, latency tails, fallbacks, and shared abstractions are emphasized. | Seniority should expand system and organizational scope, not only algorithm difficulty. |
| Technical AI product management | [OpenAI PM, API Agents](https://openai.com/careers/product-manager-api-agents-san-francisco/) | Strategy and roadmap sit beside model trade-offs, SDK/API products, reliability, safety, and quality. | AI PM cases need architecture and evaluation fluency alongside product judgment. |
| Eval-led product work | [Anthropic PM, Claude Code Model Performance](https://job-boards.greenhouse.io/anthropic/jobs/5247640008) | Agentic eval creation, transcript analysis, launch criteria, model behavior, and research influence are explicit. | Teach candidates to construct evals, inspect traces, and make launch decisions. |
| Enterprise and commercial breadth | [Anthropic PM, Multi-Cloud Growth](https://job-boards.greenhouse.io/anthropic/jobs/5153924008) | Enterprise discovery, API/security/compliance, integrations, reliability, partnerships, and economics share the role. | Senior AI PM scenarios should include enterprise constraints and business trade-offs. |
| Evidence of ability | [OpenAI interview guide](https://openai.com/interview-guide/) | The guide emphasizes expertise or ramp speed, communication, collaboration, feedback, motivation, and prior work. | Add project walkthroughs, learning stories, feedback examples, and inspectable artifacts. |
| Research-engineering crossover | [Anthropic careers](https://www.anthropic.com/careers) | Hiring guidance values direct evidence such as research, writing, and open-source work and describes porous research/engineering boundaries. | Encourage portfolio artifacts and exercises that cross experiments with production. |
| Structured PM evaluation | [Amazon PM interview prep](https://amazon.jobs/content/en/how-we-hire/product-manager-interview-prep) | The public process describes phone screen, writing assessment, loop interviews, metrics, stakeholder work, and behavioral evidence. | Include written decisions, quantified STAR stories, metrics, and timed practice. |

## Findings

1. Production ownership is the shared spine. Prototype-to-production, monitoring, reliability, rollout, and measurable impact recur across role families.
2. Modern AI work is eval-led. Evaluation design, failure analysis, and launch criteria deserve the same treatment as model selection.
3. FDE is a compound role: engineer, product discoverer, solution architect, and adoption owner.
4. Frontier AI product roles require technical depth, particularly around agents, APIs, safety, reliability, and evaluation.
5. Seniority changes scope. Senior and staff candidates need platform boundaries, migrations, organizational leverage, risk, and economics.
6. Fundamentals still matter. Algorithms, data systems, retrieval, statistics, and concise communication remain part of the base.

## Product decisions

- LeetCode-style practice is one track, not the whole product.
- The canonical content unit is prompt → clarification → plausible wrong path → reasoning → answer → evaluation/failure modes → follow-up → transfer exercise.
- “MAG7,” “AI7,” and “AIR7” are treated as informal, changing market labels; the durable taxonomy is role competency.
- Role/company notes are dated and sourced; evergreen curriculum remains separate.

## What to do next

- Launch the seven-example proof set and validate the study loop.
- Expand to twelve examples with explicit retrieval, evaluation, FDE, and staff-level coverage.
- Recruit five target users across basics, senior engineering, and FDE/product paths.
- Refresh the evidence matrix quarterly or when role-pack content changes.
