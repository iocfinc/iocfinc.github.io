/* Original interview-practice scenarios. No company-specific or leaked questions. */
(function () {
  "use strict";

  function codingCase(family, index, difficulty, title, prompt, variation, trap) {
    var ordinal = String(index + 1).padStart(2, "0");
    return {
      id: "code-" + family.slug + "-" + ordinal,
      title: title,
      eyebrow: "LeetCode pattern " + ordinal,
      topic: "coding",
      level: difficulty,
      minutes: difficulty === "easy" ? 10 : difficulty === "medium" ? 16 : 24,
      roles: difficulty === "easy" ? ["AI engineer"] : difficulty === "medium" ? ["AI engineer", "Senior AI engineer"] : ["Senior AI engineer", "Lead / staff"],
      summary: "Python-first: " + family.summary + " " + variation,
      prompt: prompt,
      questions: family.questions,
      hints: family.hints,
      solution: "Use Python 3 and name the invariant before writing the function. " + family.solution + " For this variation, " + variation.toLowerCase(),
      code: family.code,
      artifactLabel: "Python 3 solution pattern",
      analysis: family.analysis,
      trap: trap || family.trap,
      followUp: family.followUp,
      transfer: family.transfer
    };
  }

  function systemCase(family, index, difficulty, title, scenario, risk) {
    var ordinal = String(index + 1).padStart(2, "0");
    return {
      id: "system-" + family.slug + "-" + ordinal,
      title: title,
      eyebrow: "Agentic design case " + ordinal,
      topic: "systems",
      level: difficulty,
      minutes: difficulty === "easy" ? 14 : difficulty === "medium" ? 20 : 28,
      roles: difficulty === "easy" ? ["AI engineer", "FDE / AI product"] : difficulty === "medium" ? ["Senior AI engineer", "FDE / AI product"] : ["Lead / staff", "Senior AI engineer"],
      summary: family.summary + " Scenario: " + scenario + ".",
      prompt: "Design " + scenario + ". Explain the smallest safe first release, what the model may and may not decide, and how you would know it is helping.",
      questions: family.questions,
      hints: family.hints,
      solution: family.solution + " For this case, make " + scenario + " the narrow workflow boundary and explicitly test " + risk + ".",
      code: family.architecture,
      artifactLabel: "Architecture sketch",
      analysis: family.analysis,
      trap: "Treating " + risk + " as a prompt-writing problem instead of a product, data, and control-plane requirement.",
      followUp: family.followUp,
      transfer: family.transfer
    };
  }

  var codeFamilies = [
    {
      slug: "hash-lookup",
      summary: "Use a hash map to turn a repeated lookup into one linear scan.",
      questions: ["What fact from earlier elements must be remembered?", "Should you look up before or after storing the current item?", "What does the duplicate-value edge case require?"],
      hints: ["Calculate the missing complement or required prior state.", "Store only information from items already visited."],
      solution: "State the lookup invariant first: the map contains only prior values and their earliest useful index. Scan once, test the required prior value, then record the current value. This makes the duplicate case explicit and avoids reusing one item.",
      code: "def two_sum(items: list[int], target: int) -> list[int]:\n    seen: dict[int, int] = {}\n    for index, value in enumerate(items):\n        need = target - value\n        if need in seen:\n            return [seen[need], index]\n        seen[value] = index\n    raise ValueError(\"no pair\")",
      analysis: "Time O(n), space O(n). The trade is memory for removal of the nested scan.",
      trap: "Adding the current item before checking can accidentally reuse its index.",
      followUp: "What changes if values arrive as a stream and you only retain a bounded window?",
      transfer: "When a question asks whether a matching prior value exists, define the lookup key and scan once."
    },
    {
      slug: "stack-state",
      summary: "Use a stack when the newest unresolved state is the only state that can be closed next.",
      questions: ["What is the unresolved state?", "Which item must be checked first?", "What proves the final state is valid?"],
      hints: ["Push an opening or increasing state.", "A closing event must match the most recent unresolved item."],
      solution: "Make the stack invariant verbal: it contains exactly the unresolved items in their required close order. Push new unresolved state, validate every closing event against the top, and finish only if the stack is empty.",
      code: "def is_balanced(stream: str) -> bool:\n    pairs = {\")\": \"(\", \"]\": \"[\", \"}\": \"{\"}\n    stack: list[str] = []\n    for token in stream:\n        if token in pairs.values():\n            stack.append(token)\n        elif token in pairs and (not stack or stack.pop() != pairs[token]):\n            return False\n    return not stack",
      analysis: "Time O(n), space O(n) in the worst case. Each item is pushed and popped at most once.",
      trap: "Checking that counts match without preserving nesting order accepts invalid sequences.",
      followUp: "How would you return the earliest failing offset for debugging?",
      transfer: "Last-opened, first-resolved work is a stack problem."
    },
    {
      slug: "binary-search",
      summary: "Binary search requires a monotonic predicate, not merely sorted-looking data.",
      questions: ["What predicate changes only once?", "Which boundary is inclusive?", "How does each branch preserve the answer?"],
      hints: ["Write true/false across a small ordered example.", "Keep an answer candidate rather than guessing at the midpoint."],
      solution: "Define a monotonic predicate such as ‘this version is failing.’ Maintain a closed candidate interval. When the predicate is true, retain mid as a possible first answer and search left; otherwise search right. Stop when the interval collapses.",
      code: "from collections.abc import Callable\n\ndef first_true(size: int, predicate: Callable[[int], bool]) -> int:\n    left, right = 0, size - 1\n    while left < right:\n        mid = left + (right - left) // 2\n        if predicate(mid):\n            right = mid\n        else:\n            left = mid + 1\n    return left",
      analysis: "Time O(log n), space O(1). Correctness comes from the boundary invariant, not from midpoint arithmetic alone.",
      trap: "Using `left = mid` on a false predicate can stall when two candidates remain.",
      followUp: "How would you search an answer space such as minimum GPU capacity rather than an array?",
      transfer: "Find the first or last true value whenever feasibility is monotonic."
    },
    {
      slug: "two-pointer",
      summary: "Two pointers eliminate impossible candidates by exploiting order or a shrinking boundary.",
      questions: ["What does moving each pointer rule out?", "Is the data ordered, or can it be made ordered?", "What invariant remains between the pointers?"],
      hints: ["Compare the pair at both boundaries.", "Move only the pointer that can improve the objective."],
      solution: "Sort if needed, then hold one candidate at each boundary. Use the comparison to discard a whole class of pairs: if the result is too small, advance the lower side; if too large, reduce the upper side. Explain why discarded pairs cannot win.",
      code: "def two_sum_sorted(values: list[int], target: int) -> list[int]:\n    left, right = 0, len(values) - 1\n    while left < right:\n        score = values[left] + values[right]\n        if score == target:\n            return [left, right]\n        if score < target:\n            left += 1\n        else:\n            right -= 1\n    return []",
      analysis: "Usually O(n) after any O(n log n) sort. Space depends on whether sorting is in place.",
      trap: "Moving both pointers after a non-match can skip a valid answer.",
      followUp: "Which requirement would prevent sorting, and how would that change the design?",
      transfer: "Use boundaries to discard many candidates with one justified move."
    },
    {
      slug: "tree-traversal",
      summary: "Tree questions become manageable when traversal order matches the information dependency.",
      questions: ["Is the answer computed before, between, or after children?", "What must each recursive call return?", "What is the base case?"],
      hints: ["Name the value returned for one subtree.", "Do not use global state when a return value carries the needed fact."],
      solution: "Choose the traversal from the dependency. Ask each subtree for one well-defined result, combine its returned values at the parent, and state the null-node base case. This makes the recursion a contract rather than a memorized template.",
      code: "def max_depth(node) -> int:\n    if node is None:\n        return 0\n    return 1 + max(max_depth(node.left), max_depth(node.right))",
      analysis: "Time O(n); recursion uses O(h) call-stack space where h is tree height.",
      trap: "Returning a value with an unclear meaning makes parent logic look plausible but fail on unbalanced trees.",
      followUp: "When would you replace recursion with an explicit stack?",
      transfer: "Give every recursive call a sentence-length contract before writing it."
    },
    {
      slug: "sliding-window",
      summary: "A sliding window keeps exactly the currently valid contiguous candidate range.",
      questions: ["What makes the current window valid?", "When must the left boundary move?", "Which aggregate can update incrementally?"],
      hints: ["Add the right item first.", "Shrink only until the invariant is restored."],
      solution: "State the window invariant and maintain counts or a running total. Expand right to include new data; while the invariant fails, advance left and undo its contribution. Update the answer only when the window is valid.",
      code: "def longest_unique(values: list[str]) -> int:\n    last_seen: dict[str, int] = {}\n    left = answer = 0\n    for right, value in enumerate(values):\n        if value in last_seen:\n            left = max(left, last_seen[value] + 1)\n        last_seen[value] = right\n        answer = max(answer, right - left + 1)\n    return answer",
      analysis: "Time O(n): each endpoint only moves forward. Space is O(k) for tracked state.",
      trap: "Resetting the whole window after a violation loses the linear-time guarantee.",
      followUp: "Which condition turns this from a variable window into a fixed-size window?",
      transfer: "For contiguous ranges, make ‘valid’ executable as a window invariant."
    },
    {
      slug: "intervals",
      summary: "Sort intervals, then compare only with the active boundary.",
      questions: ["Are endpoints inclusive or exclusive?", "Does touching count as overlap?", "What should the active interval represent?"],
      hints: ["Sort by start, then end.", "Only the last merged interval can overlap the next sorted interval."],
      solution: "Declare the endpoint convention. Sort by start time, initialize one active interval, then either extend it on overlap or emit a new interval. The proof is that sorting makes earlier intervals unable to overlap later ones once the active boundary is passed.",
      code: "def merge_intervals(intervals: list[list[int]]) -> list[list[int]]:\n    if not intervals:\n        return []\n    merged = [sorted(intervals)[0][:]]\n    for start, end in sorted(intervals)[1:]:\n        active = merged[-1]\n        if start <= active[1]:\n            active[1] = max(active[1], end)\n        else:\n            merged.append([start, end])\n    return merged",
      analysis: "Time O(n log n) for sorting, then O(n) scanning. Output may use O(n) space.",
      trap: "Changing inclusive versus exclusive semantics mid-solution creates silent gaps or double work.",
      followUp: "How would you process already-sorted intervals from an unbounded stream?",
      transfer: "Sort to turn many overlap checks into one active-boundary comparison."
    },
    {
      slug: "graph-search",
      summary: "Graph search starts by defining nodes, edges, and what one step means.",
      questions: ["What is a node and an edge in this problem?", "Is every edge equal cost?", "When should a node be marked visited?"],
      hints: ["Use BFS for fewest equal-cost hops.", "Mark on enqueue so a node is not scheduled repeatedly."],
      solution: "Model the state space explicitly. For equal-cost transformations, use BFS with a queue, mark states visited when queued, and record the information needed to reconstruct or score the path. Upgrade to Dijkstra only when edge costs differ.",
      code: "from collections import deque\n\ndef shortest_path(graph: dict[str, list[str]], start: str, goal: str) -> int:\n    queue = deque([(start, 0)])\n    visited = {start}\n    while queue:\n        node, distance = queue.popleft()\n        if node == goal:\n            return distance\n        for next_node in graph[node]:\n            if next_node not in visited:\n                visited.add(next_node)\n                queue.append((next_node, distance + 1))\n    return -1",
      analysis: "BFS is O(V + E) with adjacency lists. Space is O(V) for the queue and visited set.",
      trap: "Marking visited on dequeue can enqueue the same state many times.",
      followUp: "What state compression would you use if the graph is implicit and enormous?",
      transfer: "Name the state and the transition before reaching for BFS or DFS."
    },
    {
      slug: "advanced-search",
      summary: "Hard search problems need a precise subproblem, frontier, or ordering invariant before optimization.",
      questions: ["What structure makes brute force repeat work?", "What is the invariant at each frontier or partition?", "Which edge cases break the shortcut?"],
      hints: ["Write the small-state recurrence or ordering rule first.", "Test empty, one-element, and extreme-skew examples before coding."],
      solution: "Do not start from a memorized trick. Define the subproblem or invariant that makes repeated work reusable, then choose the data structure that maintains it. Prove the one move that discards candidates, and test adversarial boundaries before optimizing constants.",
      code: "import heapq\n\ndef merge_k_sorted(streams: list[list[int]]) -> list[int]:\n    heap = [(stream[0], stream_index, 0)\n            for stream_index, stream in enumerate(streams) if stream]\n    heapq.heapify(heap)\n    merged: list[int] = []\n    while heap:\n        value, stream_index, item_index = heapq.heappop(heap)\n        merged.append(value)\n        next_index = item_index + 1\n        if next_index < len(streams[stream_index]):\n            heapq.heappush(heap, (streams[stream_index][next_index], stream_index, next_index))\n    return merged",
      analysis: "The target complexity depends on the chosen structure; explain both the naive baseline and why the invariant improves it.",
      trap: "Naming an advanced algorithm without a correctness argument is not a working solution.",
      followUp: "Which production constraint—memory, streaming, or tail latency—would change the preferred algorithm?",
      transfer: "At hard difficulty, interviewers are grading your invariant and proof, not your recall of a pattern name."
    },
    {
      slug: "dynamic-programming",
      summary: "Dynamic programming stores answers to overlapping subproblems with a clear state definition.",
      questions: ["What does one table cell or state mean?", "What is the smallest base case?", "Which prior states can produce this state?"],
      hints: ["Write the recurrence in words before choosing table dimensions.", "Start with a brute-force recurrence, then identify repeated inputs."],
      solution: "Define each state in one sentence, set its base cases, and derive the transition from smaller states. Fill states in dependency order and, if needed, retain a parent choice for reconstruction. State why every referenced subproblem has already been computed.",
      code: "def min_coins(coins: list[int], target: int) -> int:\n    dp = [float(\"inf\")] * (target + 1)\n    dp[0] = 0\n    for total in range(1, target + 1):\n        for coin in coins:\n            if coin <= total:\n                dp[total] = min(dp[total], dp[total - coin] + 1)\n    return -1 if dp[target] == float(\"inf\") else dp[target]",
      analysis: "Complexity depends on state count times transitions per state. Explain how state compression changes space without breaking dependencies.",
      trap: "A table with no defined state meaning may pass simple examples but cannot be reasoned about or debugged.",
      followUp: "Which dimension can be removed if the next state only depends on the previous row or step?",
      transfer: "DP is a contract over subproblems: name the state, base cases, transition, and order."
    }
  ];

  var codeSeeds = [
    [0, "easy", "Pair embedding IDs to a target score", "Given embedding IDs and a target, return two distinct indices whose values sum to the target.", "Explain the duplicate-value case before coding."],
    [0, "easy", "Find a duplicate document fingerprint", "Return true if an ingestion batch contains the same document fingerprint twice.", "Say why a set, not sorting, is the single-pass answer."],
    [0, "easy", "Match a feature flag complement", "Find two rollout percentages that add to the requested capacity target.", "Use prior values, not the current value twice."],
    [0, "easy", "Index a prompt-template pair", "Return the two prompt template IDs whose token budgets equal a given budget.", "Preserve original indices after lookup."],
    [0, "easy", "Detect repeated tool request IDs", "Find the first repeated idempotency key in a stream of tool calls.", "Return the earliest repeat without a second scan."],
    [1, "easy", "Validate nested tool-call syntax", "Given opening and closing tool-call tokens, decide whether the trace is properly nested.", "Reject a closer that has no matching latest opener."],
    [1, "easy", "Simplify a model-routing path", "Normalize a slash-delimited model route containing '.' and '..' segments.", "The stack represents the current canonical route."],
    [1, "easy", "Check JSON-like generation brackets", "Decide whether a generated structured response has balanced (), [], and {} tokens.", "Counts alone are insufficient."],
    [1, "easy", "Undo a sequence of agent actions", "Given an action log with undo markers, return the remaining actions.", "An undo can only remove the latest remaining action."],
    [1, "easy", "Compare versioned prompt edits", "Remove adjacent reversible prompt edits until no pair remains.", "Show what stays on the stack after each token."],
    [2, "easy", "Find the first failing model version", "Versions are ordered and a regression predicate becomes true at the first bad version. Return that version.", "Keep the first true candidate."],
    [2, "easy", "Locate the earliest stale index shard", "A freshness predicate is true for stale shards from one point onward. Find the first stale shard.", "Define the monotonic predicate aloud."],
    [2, "easy", "Minimum context budget that passes", "Find the smallest token budget for which a feasibility test passes.", "Binary-search the answer space, not a stored array."],
    [2, "easy", "Find a model in a sorted registry", "Return a target model version from sorted semantic versions represented as comparable integers.", "Avoid overflow-prone midpoint arithmetic."],
    [2, "easy", "First latency tier over SLO", "Given sorted p95 latency tiers, return the first tier that exceeds the SLO.", "Be explicit about > versus >=."],
    [3, "easy", "Choose two transcript chunks under a cap", "In sorted chunk lengths, find two distinct lengths totaling a context cap.", "Justify every pointer move."],
    [3, "easy", "Maximize contrast between two attention scores", "Find the largest difference where the lower score occurs before the higher score.", "Track the best prefix, not every pair."],
    [3, "easy", "Reverse an in-place token span", "Reverse a mutable token array without allocating another array.", "State the boundary crossing condition."],
    [3, "easy", "Filter duplicate timestamps from a sorted feed", "Compress a sorted event list in place so each timestamp appears once.", "Use a write pointer with a clear invariant."],
    [3, "easy", "Check a symmetric prompt palindrome", "Ignore punctuation and case while deciding whether a prompt reads the same both ways.", "Advance a pointer only after skipping irrelevant characters."],
    [4, "easy", "Compute a tree of model dependencies", "Return the maximum depth of a binary model dependency tree.", "Define what depth an empty child returns."],
    [4, "easy", "Validate a binary routing tree", "Decide whether every node respects a min/max routing key range.", "A local parent-child comparison is not enough."],
    [4, "easy", "Find a shared prompt-template ancestor", "Return the lowest common ancestor of two nodes in a binary template tree.", "Explain the information returned from each subtree."],
    [4, "easy", "Invert an experiment decision tree", "Mirror a binary experiment tree in place.", "Describe the base case before swapping."],
    [4, "easy", "Sum leaf evaluation costs", "Return the sum of leaf-node costs in a binary evaluation tree.", "A leaf has no recursive children to combine."],
    [5, "easy", "Longest unique token window", "Return the longest contiguous token sequence with no repeated token IDs.", "Move left only until the duplicate disappears."],
    [5, "easy", "Minimum evidence window", "Find the smallest transcript window containing every required evidence tag.", "Only record an answer after the window is valid."],
    [5, "easy", "Fixed-size inference throughput", "Find the maximum sum across every k-request inference window.", "Update the running total instead of recomputing it."],
    [5, "easy", "At most K distinct tenant requests", "Return the longest contiguous request range with at most k tenants.", "The count map defines validity."],
    [5, "easy", "Detect a permutation in a prompt stream", "Decide whether a stream contains a window that is a permutation of a required token multiset.", "Use fixed-window counts, not repeated sorting."],
    [6, "medium", "Merge overlapping inference windows", "Merge overlapping or touching inclusive [start, end] inference windows.", "Agree on touching-boundary semantics."],
    [6, "medium", "Schedule non-overlapping fine-tune jobs", "Return the maximum number of non-overlapping GPU jobs from start/end intervals.", "Explain the greedy sorting key."],
    [6, "medium", "Insert an evaluation blackout window", "Insert a new interval into sorted non-overlapping blackout windows and merge as needed.", "Separate before, overlap, and after phases."],
    [6, "medium", "Find the minimum meeting rooms for reviewers", "Return the minimum number of simultaneous reviewer rooms needed for intervals.", "Compare next start with the earliest active end."],
    [6, "medium", "Erase conflicting rollout intervals", "Return the fewest rollout intervals to remove so the rest do not overlap.", "Explain why preserving the earlier end leaves more future room."],
    [7, "medium", "Order an ML pipeline and detect a cycle", "Return a valid prerequisite order for pipeline steps or an empty list when a cycle exists.", "Make edge direction match prerequisite semantics."],
    [7, "medium", "Shortest prompt transformation sequence", "Change one allowed token at a time to transform one prompt code into another with the fewest edits.", "This is shortest path in an implicit unweighted graph."],
    [7, "medium", "Count isolated data-quality clusters", "Given a grid of data-quality alerts, count connected alert clusters.", "Mark when discovered, not after recursion returns."],
    [7, "medium", "Can all agents complete their dependencies?", "Decide whether directed agent handoffs can all complete without circular waiting.", "Use visited and visiting states or indegrees."],
    [7, "medium", "Propagate model rollback impact", "Given dependency edges, return every service affected by a model rollback.", "Treat reachability as a traversal, not repeated scans."],
    [9, "medium", "Choose a minimum tokenization cost", "Return the fewest dictionary tokens needed to segment an input string, or report that it cannot be segmented.", "Define dp[i] as the best result for a prefix."],
    [9, "medium", "Plan a GPU job sequence", "Given compatible jobs with rewards, return the highest total reward without selecting adjacent conflicting jobs.", "Contrast the take and skip transitions."],
    [9, "medium", "Count decoding paths for a model code", "Count valid ways to decode a digit string under a fixed one- and two-digit mapping.", "Guard zero and invalid two-digit cases."],
    [9, "medium", "Find the longest common prompt subsequence", "Return the length of the longest common subsequence between two token sequences.", "State what a two-dimensional prefix state means."],
    [9, "medium", "Reach an evaluation target with fewest steps", "Return the fewest allowed score increments needed to reach a target score.", "Choose between a DP table and BFS based on transition cost."],
    [8, "hard", "Find median latency across two sorted regions", "Return the median of two sorted latency arrays in logarithmic time.", "Partition the smaller array and validate both partition edges."],
    [8, "hard", "Compute trapped token-buffer capacity", "Given token-buffer heights, return total capacity trapped between peaks.", "Use a boundary invariant instead of checking every pair."],
    [8, "hard", "Minimum cost to edit an evaluation rubric", "Return the minimum insert, delete, and replace operations to transform one rubric into another.", "Define the prefix subproblem and its base row/column."],
    [8, "hard", "Merge K ranked retrieval streams", "Merge k sorted passage-score streams into one sorted stream.", "Keep only the current best head from each stream in a heap."],
    [8, "hard", "Find the smallest covering context range", "Given k sorted token-position lists, find the shortest range containing one position from every list.", "The minimum head and maximum head define the current covering range."]
  ];

  var systemFamilies = [
    {
      slug: "grounded-qa", summary: "Build a cited retrieval flow with authorization and an abstention path.",
      questions: ["What makes an answer trustworthy?", "Where is access control enforced?", "Which signal blocks an answer?"], hints: ["Separate ingestion from query serving.", "Filter by ACL before the model sees evidence."],
      solution: "Start with users, sources, freshness, permissions, latency, and abstention. Version, chunk, and index documents with ACL metadata. Authenticate first, retrieve only authorized candidates, rerank, generate from supplied evidence, validate citations, and abstain when support is insufficient.",
      architecture: "ingest → parse/version → chunk + ACL → index\nquery → authenticate → ACL-filtered retrieve → rerank\n      → grounded generation → citation check → answer | abstain",
      analysis: "Quality is the joint behavior of retrieval, context construction, grounding, and the refusal policy—not a single model metric.", followUp: "Retrieval recall rose but trust fell. Which paired traces and human labels do you inspect before changing the model?", transfer: "For knowledge assistants, authorization and evidence are data-plane controls, not instructions in a prompt."
    },
    {
      slug: "support-agent", summary: "Constrain an agent to resolve a support workflow with clear handoff and auditability.",
      questions: ["What may the agent resolve versus recommend?", "Which tools are read-only or approval-gated?", "When does it hand off?"], hints: ["Map the actual ticket workflow before choosing tools.", "Start with a reversible action and a named owner."],
      solution: "Choose one measurable workflow stage, such as evidence gathering or draft response generation. Give the agent narrow, typed tools; place policy checks outside the model; require confirmation for side effects; log decisions and tool results; and route uncertainty or policy exceptions to a human queue.",
      architecture: "ticket → classify → retrieve account context → propose\n       → policy/permission gate → human confirm or execute\n       → audit log + outcome label → evaluation set",
      analysis: "The launch metric is resolved work after rework, with escalation and severe-error rates as guardrails.", followUp: "How would you prove that lower handle time is not merely shifting work to the escalation queue?", transfer: "Agents earn autonomy one bounded action at a time."
    },
    {
      slug: "finance-agent", summary: "Design a finance-facing research assistant that distinguishes sourced analysis from advice and execution.",
      questions: ["What sources and timestamps are required?", "What can be summarized versus recommended?", "Which statements need citations or review?"], hints: ["Keep market-data retrieval deterministic and timestamped.", "Separate research, recommendation, and order execution."],
      solution: "Use licensed, timestamped data feeds and preserve source provenance. Let the model summarize, compare, and flag uncertainty over retrieved facts; apply deterministic calculations outside the model; present citations and stale-data warnings; require qualified review for recommendations; and never let a research chat silently become an execution path.",
      architecture: "request → entitlement check → timestamped data retrieval\n        → deterministic metrics → cited synthesis → review gate\n        → research output (no implicit order execution)",
      analysis: "The critical trade-off is usefulness versus traceability: every material claim must be reproducible from its as-of data.", followUp: "A user asks the assistant to place a trade from the chat. What new compliance, identity, and approval boundaries are needed?", transfer: "In regulated domains, provenance and permissions are first-class product requirements."
    },
    {
      slug: "conversational-robot", summary: "Build a conversational robot that uses perception and action with explicit safety envelopes.",
      questions: ["Which decisions occur on-device?", "What commands require confirmation?", "How does the robot fail safely?"], hints: ["Separate speech understanding, planning, and motion control.", "A language model should not bypass a deterministic safety controller."],
      solution: "Decompose the system into perception, dialogue state, planner, tool interface, and deterministic motion/safety control. Ground language in the known environment, validate every planned action against capability and safety constraints, require confirmation for ambiguous or consequential actions, and provide an immediate stop and human-takeover path.",
      architecture: "speech/vision → dialogue state → constrained planner\n             → capability + safety validator → motion controller\n             → telemetry, stop control, human takeover",
      analysis: "Latency, grounding, and physical safety dominate model cleverness. Offline simulation and shadow observation precede real actuation.", followUp: "How would you evaluate the same dialogue policy before letting it control physical movement?", transfer: "In embodied systems, language plans are proposals; deterministic controllers enforce the world boundary."
    },
    {
      slug: "tool-agent", summary: "Turn an open-ended request into a typed, observable, and reversible tool-using workflow.",
      questions: ["What is the smallest tool contract?", "How are arguments validated?", "How do retries remain safe?"], hints: ["Use schemas and idempotency keys.", "Put auth and side-effect checks in the tool layer."],
      solution: "Define a small tool vocabulary with typed schemas, permission scopes, timeouts, idempotency keys, and structured results. Plan and execute in separate steps, validate arguments deterministically, classify failures, limit retries, and expose a human approval checkpoint before irreversible actions.",
      architecture: "request → plan → typed tool call → schema/auth validation\n        → execute or require approval → structured result\n        → trace + retry policy + user-visible status",
      analysis: "Tool reliability is a product of contracts, permissions, idempotency, and observability; prompting cannot replace those controls.", followUp: "A tool succeeds but the response is lost. How do you prevent a duplicate side effect on retry?", transfer: "Make every model-to-world boundary typed, authenticated, and observable."
    },
    {
      slug: "evaluation", summary: "Create an evaluation loop that catches regressions across the complete AI workflow.",
      questions: ["Which user harm matters most?", "What does each pipeline stage own?", "What is the release gate?"], hints: ["Pair component diagnostics with end-to-end tasks.", "Use production traces only with appropriate privacy controls."],
      solution: "Define the user task, severity taxonomy, and non-negotiable failures. Build a versioned evaluation set with representative and adversarial slices. Score retrieval, tool success, groundedness, task completion, latency, and cost; calibrate automated judges against human labels; and gate releases on guardrails rather than a single average score.",
      architecture: "trace/sample → redact + label → versioned eval set\n             → component metrics + end-to-end rubric\n             → human calibration → release gate → monitoring",
      analysis: "Averages hide important failures. Slice by task, customer, permissions, language, and error severity before declaring an improvement.", followUp: "Human review is expensive. How do you allocate a limited review budget to catch the next likely regression?", transfer: "Evaluation is a decision system: define what blocks release before measuring model quality."
    },
    {
      slug: "workflow-triage", summary: "Use AI to prioritize a human workflow while keeping accountability and reversibility.",
      questions: ["Who owns the final decision?", "Which features are allowed at decision time?", "What happens when confidence is low?"], hints: ["Start with ranking or summarization before automated disposition.", "Measure error severity, not accuracy alone."],
      solution: "Observe the current queue and choose a narrow intervention such as routing, summarization, or evidence extraction. Train or prompt against approved inputs, show the reason and source evidence to the operator, expose a correction path, log overrides, and retrain or adjust only after reviewing error slices and operational impact.",
      architecture: "incoming work → deterministic eligibility → AI rank/summarize\n              → human queue + evidence → override log\n              → quality review → policy/model update",
      analysis: "The value metric is time saved after rework and error correction, not automation rate in isolation.", followUp: "The system speeds up easy work but delays rare urgent cases. What slice and guardrail change the rollout?", transfer: "For operational AI, improve the human queue before attempting autonomous decisions."
    },
    {
      slug: "multi-agent", summary: "Coordinate specialized agents through a shared state model and a durable control plane.",
      questions: ["Why are multiple agents needed?", "What shared state is authoritative?", "How are conflicts and loops stopped?"], hints: ["Use specialization only when it improves a measurable boundary.", "The orchestrator, not an agent prompt, owns budgets and termination."],
      solution: "Start with a single-agent baseline and split roles only where tool permissions, expertise, or latency justify it. Persist a task state with ownership, inputs, outputs, and evidence. Use an orchestrator to assign bounded work, validate handoffs, enforce budgets and retries, resolve conflicts, and send unresolved work to a human.",
      architecture: "request → orchestrator + durable task state\n        → specialist agents/tools → validation + evidence\n        → merge/conflict policy → human escalation | final output",
      analysis: "Multi-agent systems add coordination cost and failure modes. Their success criterion is better task completion or control, not more agent messages.", followUp: "Two specialists return incompatible conclusions. Which artifacts let a reviewer resolve the conflict without replaying everything?", transfer: "Shared state, ownership, and termination are systems concerns—not emergent prompt behavior."
    },
    {
      slug: "voice-agent", summary: "Design a real-time voice agent with turn-taking, disclosure, latency budgets, and escalation.",
      questions: ["What is the end-to-end latency budget?", "How is barge-in handled?", "Which calls need a human handoff?"], hints: ["Stream ASR, reasoning, and TTS where possible.", "Never hide an uncertainty or identity failure behind fluent speech."],
      solution: "Treat the conversation as a streaming state machine: detect speech, transcribe incrementally, manage turn state, retrieve or use typed tools, synthesize a response, and allow interruption at every stage. Authenticate when required, disclose automation, constrain actions by policy, monitor latency segments, and hand off with transcript and context.",
      architecture: "audio → VAD/streaming ASR → turn state + retrieval/tools\n      → policy gate → streaming TTS → barge-in / handoff\n      → latency traces + quality review",
      analysis: "Voice quality is interaction quality: interruption handling, latency tails, and safe recovery matter as much as transcription accuracy.", followUp: "A caller speaks over the assistant while a tool call is pending. What should be cancelled, preserved, or confirmed?", transfer: "Real-time AI products need explicit state transitions, not a sequence of isolated model calls."
    },
    {
      slug: "agent-platform", summary: "Set platform standards for teams shipping agents without centralizing every product decision.",
      questions: ["Which controls must be standardized?", "What can teams configure?", "How is a risky release stopped?"], hints: ["Separate paved roads from policy enforcement.", "Make audit, evaluation, and rollback cheap by default."],
      solution: "Provide a paved road for identity, secrets, tool schemas, tracing, evaluation, approvals, and release gates. Let product teams own their workflow and prompt decisions within those boundaries. Version policies and tools, publish reliability/error budgets, support rapid rollback, and review exceptions as learning inputs rather than permanent forks.",
      architecture: "team agent → platform SDK (identity, tools, tracing)\n           → policy/eval gate → staged release → monitoring\n           → rollback + incident review + standards update",
      analysis: "The platform should reduce duplicated risk and time-to-safe-change, while avoiding a central team bottleneck for every product experiment.", followUp: "A high-value team requests an exception to the approval standard. What evidence and expiry conditions make that exception governable?", transfer: "At staff level, create guardrails that increase local speed while preserving global control."
    }
  ];

  var systemSeeds = [
    [0, "easy", "Design a cited employee-policy assistant", "an internal assistant that answers travel and leave-policy questions", "stale policy versions"],
    [0, "easy", "Design a product-document Q&A assistant", "a product-help assistant that cites current documentation", "tenant-specific access control"],
    [0, "easy", "Design a sales-enablement Q&A tool", "a sales copilot that answers approved product and pricing questions", "unapproved commercial claims"],
    [0, "easy", "Design a clinical-literature navigator", "a research navigator that summarizes approved clinical literature without diagnosis", "unsupported medical inference"],
    [0, "easy", "Design an engineering runbook assistant", "an on-call assistant that retrieves runbooks and incident history", "outdated or permission-restricted runbooks"],
    [1, "easy", "Design a refund-resolution assistant", "a customer-support agent that gathers evidence and drafts refund resolutions", "refund authority limits"],
    [1, "easy", "Design an account-onboarding assistant", "an onboarding agent that guides new customers through setup", "incorrect account configuration"],
    [1, "easy", "Design a shipment-exception agent", "a logistics support agent that explains shipment exceptions and proposes next actions", "incorrect delivery commitments"],
    [1, "easy", "Design a subscription-retention copilot", "a retention assistant that prepares save offers for a human agent", "unauthorized discounting"],
    [1, "easy", "Design a multilingual support-draft agent", "a multilingual agent that drafts replies from approved knowledge", "meaning-changing translation errors"],
    [2, "easy", "Design a cited earnings-research assistant", "a finance research assistant that compares filings and earnings transcripts", "as-of-date ambiguity"],
    [2, "easy", "Design a portfolio-monitoring briefing agent", "a portfolio briefing agent that summarizes approved market data and alerts", "stale or unlicensed market data"],
    [2, "easy", "Design a procurement-analysis copilot", "a procurement copilot that compares vendor proposals and extracted terms", "misread contractual terms"],
    [2, "easy", "Design a fraud-investigation research helper", "a fraud analyst helper that organizes case evidence without final disposition", "sensitive-data exposure"],
    [2, "easy", "Design a risk-policy explainer", "a risk assistant that explains internal policy rules with source citations", "presenting policy interpretation as legal advice"],
    [3, "easy", "Design a warehouse conversational robot", "a warehouse robot that answers worker questions and proposes safe navigation actions", "physical safety boundaries"],
    [3, "easy", "Design a hotel concierge robot", "a hotel concierge robot that helps guests and requests staff services", "identity and room-access mistakes"],
    [3, "easy", "Design a retail inventory robot", "a retail robot that helps locate inventory and flags shelf anomalies", "unsafe movement around customers"],
    [3, "easy", "Design a lab-assistant robot", "a laboratory assistant robot that guides approved routine procedures", "hazardous-step execution"],
    [3, "easy", "Design a campus-guide robot", "a campus guide robot that gives directions and requests accessible assistance", "incorrect emergency guidance"],
    [4, "easy", "Design an invoice-data extraction agent", "an agent that extracts invoice fields and requests approval before posting", "duplicate payment side effects"],
    [4, "easy", "Design an incident-summary agent", "an incident agent that reads alerts and drafts a timeline for the responder", "unverified causal claims"],
    [4, "easy", "Design a calendar-coordination agent", "a scheduling agent that proposes meeting slots using authorized calendars", "privacy and double-booking errors"],
    [4, "easy", "Design a data-access request agent", "an agent that prepares a data-access request for owner approval", "over-broad permission grants"],
    [4, "easy", "Design a release-note publishing agent", "an agent that drafts and stages release notes for human publication", "publishing incomplete or confidential information"],
    [5, "easy", "Design a RAG regression gate", "an evaluation system that blocks a retrieval release when answer support regresses", "high-severity unsupported answers"],
    [5, "easy", "Design a tool-call reliability scorecard", "an evaluation pipeline for an agent that uses internal APIs", "silent tool failures"],
    [5, "easy", "Design a prompt-change release gate", "a release gate for prompt edits to a customer-facing assistant", "regression on rare but harmful inputs"],
    [5, "easy", "Design an agent cost-quality monitor", "a monitor that detects when an agent becomes more expensive while less helpful", "averages hiding costly failure slices"],
    [5, "easy", "Design a citation-quality audit loop", "a human-calibrated audit loop for citations in generated answers", "citation presence without citation support"],
    [6, "medium", "Design an insurance-claim triage copilot", "a claims copilot that prioritizes evidence review for human adjusters", "bias or urgency errors in routing"],
    [6, "medium", "Design a security-alert investigation queue", "a security triage system that summarizes and ranks alerts for analysts", "missing a high-impact incident"],
    [6, "medium", "Design a recruiting-operations assistant", "a recruiting assistant that summarizes candidate packets for recruiters", "using prohibited or sensitive attributes"],
    [6, "medium", "Design a trust-and-safety review queue", "a moderation copilot that clusters and prioritizes reports for reviewers", "overconfident automated enforcement"],
    [6, "medium", "Design a hospital-bed coordination helper", "a coordination helper that summarizes bed availability for staff", "turning an operational suggestion into a clinical decision"],
    [7, "medium", "Design a research-and-writing agent team", "a small agent system that prepares a sourced product brief", "incompatible or ungrounded specialist conclusions"],
    [7, "medium", "Design an incident-response agent team", "a coordinated agent system that gathers evidence during an incident", "unbounded retries and conflicting actions"],
    [7, "medium", "Design a software-migration agent team", "a specialist agent system that plans and validates a safe service migration", "agents modifying the same resource inconsistently"],
    [7, "medium", "Design a diligence-research agent team", "a due-diligence system that assigns document review to specialized agents", "unclear source ownership and evidence provenance"],
    [7, "medium", "Design a customer-implementation agent team", "an implementation assistant team that maps a customer's workflow to product configuration", "hallucinated product capabilities"],
    [8, "medium", "Design a voice banking-support agent", "a voice assistant that handles authenticated banking-support questions", "identity failure and unsafe disclosure"],
    [8, "medium", "Design a voice travel-assistance agent", "a streaming voice agent that changes travel arrangements with confirmation", "duplicate changes during interruption"],
    [8, "medium", "Design a voice healthcare-intake helper", "a voice intake assistant that captures symptoms and routes to staff", "unsafe urgency classification"],
    [8, "medium", "Design a voice IT-helpdesk agent", "a voice agent that helps employees troubleshoot approved IT issues", "social-engineering and credential exposure"],
    [8, "medium", "Design a voice restaurant-reservation agent", "a voice agent that books reservations and handles caller interruptions", "incorrect booking commitments"],
    [9, "hard", "Design a multi-tenant agent platform", "a platform that lets product teams ship governed customer-facing agents", "cross-tenant data leakage"],
    [9, "hard", "Design an enterprise tool-governance platform", "a platform that standardizes agent tool access and human approvals across teams", "inconsistent policy enforcement"],
    [9, "hard", "Design an agent evaluation platform", "a platform that runs versioned offline and online evaluations for many agent products", "teams gaming a single benchmark"],
    [9, "hard", "Design a global incident-assistance platform", "a platform that supports governed AI assistance during critical production incidents", "unsafe action under incomplete evidence"],
    [9, "hard", "Design a regulated-workflow agent platform", "a platform for financial and health-adjacent workflow agents with audit-ready controls", "non-reproducible decisions and missing approvals"]
  ];

  var coding = codeSeeds.map(function (seed, index) {
    return codingCase(codeFamilies[seed[0]], index, seed[1], seed[2], seed[3], seed[4], seed[5]);
  });
  var systems = systemSeeds.map(function (seed, index) {
    return systemCase(systemFamilies[seed[0]], index, seed[1], seed[2], seed[3], seed[4]);
  });

  window.INTERVIEW_EXAMPLES = coding.concat(systems);
}());
