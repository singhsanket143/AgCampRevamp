---
name: algocamp-course-revamp
description: >-
  Revamps the AlgoCamp landing page (index.html + script.js) from course inputs:
  syllabus, course name, price, coupon, enrollment URL, and optional cohort date.
  Use when the user wants to update the course page, revamp the site for a new cohort,
  or feeds syllabus + pricing + coupon to regenerate hero, portfolio, curriculum, and CTAs.
---

# AlgoCamp Course Revamp

Revamp `index.html` and `script.js` from structured course inputs. Preserve HTML structure, Tailwind classes, animations, and card layouts — replace content only.

## Required User Input

Collect these before editing. Ask if missing:

| Field | Example | Notes |
|-------|---------|-------|
| **course_name** | `Master AI Engineering` | Used in hero, title, CTAs, footer |
| **price** | `13999` | Display as `₹13,999` |
| **coupon** | `AIALGOCAMP` | Display: `Use coupon AIALGOCAMP for discount` |
| **enrollment_url** | `https://courses.algocamp.io/learn/AI-Course` | All primary join/syllabus links |
| **syllabus** | Full text | Modules, projects, parts, outcomes |
| **cohort_start** | `Jul 15` | Optional; hero + cohort badges |
| **course_tagline** | One-liner for hero subtitle | Optional; infer from syllabus if omitted |

### Input template (user can paste this)

```markdown
## Course Revamp

**Name:** Master AI Engineering
**Price:** 13999
**Coupon:** AIALGOCAMP
**Enrollment URL:** https://courses.algocamp.io/learn/AI-Course
**Cohort starts:** Jul 15

### Syllabus
[paste full syllabus here]
```

## Workflow Checklist

Copy and track progress:

```
Revamp Progress:
- [ ] 1. Parse inputs & plan content mapping
- [ ] 2. Global metadata & hero
- [ ] 3. Built for Production tiles (3 cards)
- [ ] 4. Cohort section header + CTAs + pricing
- [ ] 5. Reality check questions
- [ ] 6. Project portfolio (hero, secondary, compact cards)
- [ ] 7. Production curriculum (7 phases + Phase 7 projects)
- [ ] 8. script.js tooltips + typing phrases
- [ ] 9. Footer primary cohort link
- [ ] 10. Verify no stale course content remains
```

## Step-by-Step Instructions

### 1. Parse syllabus

From the syllabus, extract:

- **Hands-on projects** → project portfolio section
- **Module list / parts** → curriculum phases (group into ~7 phases)
- **Learning outcomes** → reality-check questions + "Built for Production" themes
- **Capstone / bonus projects** → Phase 7 + compact portfolio cards

Group modules logically:
- Phases 1–5: main syllabus (months 1–5 or Part 1)
- Phase 6: advanced / deep-dive (month 6 or Part 2)
- Phase 7: capstone projects only

Aim for **4–8 bullet items per phase**, each with a unique `data-code-key`.

### 2. Global metadata & hero

Edit `index.html`:

| Location | Update |
|----------|--------|
| `<title>` | `AlgoCamp v2.0 \| {course_name}` |
| `<meta name="description">` | One sentence about the course |
| `#typing-header` static text | `{course_name}` |
| Hero badge | `Cohort Starts {cohort_start}` if provided |
| Hero `<h1>` / `#typing-header` | `{course_name}` |
| Hero subtitle `<p>` | Course value prop (infer from syllabus) |
| Hero join `<a href>` | `{enrollment_url}`; label: `Join {course_name}` |
| Hero pricing | `₹{price formatted}` + coupon badge |
| Cohort section (`#spring-boot-detail`) | Same name, date, CTA, pricing |

**Join link rule:** Replace every primary course link pointing to `courses.algocamp.io/learn/{old-slug}` with `{enrollment_url}`. Do **not** change "Other Featured Cohorts" cards or Login unless asked.

### 3. Built for Production (3 tiles)

Section: `Built for Production` (~line 180).

Rewrite:
- Section subtitle (1 sentence, course-relevant)
- 3 cards: title, description, 3 monospace bullet tags each
- Icons: pick lucide icons matching themes (`brain-circuit`, `bot`, `shield-check`, etc.)

Derive themes from syllabus focus areas (e.g. LLM/RAG, Agents, Production Ops).

### 4. Reality check questions

Section: `Are you ready for Production?` scrolling marquee.

Replace **6 unique questions** (duplicated for loop) with syllabus-specific challenges the course teaches, e.g.:
- RAG evaluation, agent tracing, guardrails, deployment, fine-tuning

Update left-side hook paragraph to match course domain (not generic backend).

### 5. Project portfolio

Section: `Project Portfolio` header + 3 grids.

| Grid | Count | Card style |
|------|-------|------------|
| Hero | 2 | Large cards with challenge/solution |
| Secondary | 4 | Medium cards |
| Compact | 8–9 | Small cards with bullets + tags |

Pick **flagship projects** for hero (most impressive from syllabus). Fill secondary and compact with remaining projects. Mark bonus/HW projects in subtitle.

Update section header:
- Title: `{Domain} Project Portfolio` (e.g. "AI Engineering Project Portfolio")
- Subtitle: duration + project-driven pitch from syllabus

Keep visual headers/decorative SVGs; update tags, titles, icons, copy only.

See [section-map.md](section-map.md) for HTML anchors.

### 6. Production curriculum

Section: `Production Curriculum` / `#roadmap-container`.

Update:
- Header: "The Path to {Role}" + subtitle arc (e.g. "Prompt Tinkerer" → "Production AI Engineer")
- **7 phases** with: phase label, title, description, 4–8 `data-code-key` items
- **Phase 7**: capstone project list only (no module bullets)

Phase color classes (keep existing pattern):
- Phase 1: blue, Phase 2: green, Phase 3: purple, Phase 4: orange, Phase 5: cyan, Phase 6: indigo, Phase 7: red

Map syllabus modules → phases chronologically. Merge small modules; split large parts if a phase exceeds 8 items.

### 7. script.js updates

File: `script.js`

**A. Typing header phrases** (~line 9):

```javascript
const phrases = [
    '{course_name}',
    // 1–2 alternate phrases derived from course (optional)
];
```

First phrase must match hero `#typing-header` initial text.

**B. Curriculum tooltips** (~line 346, `const codeSnippets = {`):

For **every** `data-code-key` in `#roadmap-container`:
1. Add/update entry: `'key-name': 'Learning Outcomes:\n• ...\n• ...'`
2. 4–6 bullet outcomes per key, derived from syllabus module content
3. Remove orphaned keys from old course

**C. Hero code terminal** (`codeSnippets` array ~line 132): optional — update to Python/AI code if course is AI-focused. Not required every revamp.

### 8. Footer

Update primary cohort link in `~/cohorts`:
- URL → `{enrollment_url}`
- Label → `{course_name}` (wrap across lines if needed)

Leave Spring Boot / System Design links unless user asks to change "Other Featured Cohorts".

### 9. Verification

Run grep checks:

```bash
# No stale enrollment slug (replace OLD-SLUG with previous course slug)
rg "OLD-SLUG" index.html

# All data-code-key values have script.js entries
rg -o 'data-code-key="[^"]+"' index.html | sort -u
rg "'[^']+':" script.js
```

Manual checks:
- [ ] Price appears in hero + cohort section (consistent formatting)
- [ ] Coupon text identical in both pricing blocks
- [ ] All join buttons → `{enrollment_url}`
- [ ] Project portfolio matches syllabus project list
- [ ] Curriculum phases cover full syllabus with no orphan backend/legacy topics
- [ ] Reality-check questions are course-specific

## Content Derivation Rules

1. **Do not invent projects** not in the syllabus; prioritize listed hands-on projects.
2. **Infer taglines** from syllabus intro/outcomes when user omits them.
3. **Keep card count** — don't add/remove grid slots unless syllabus has far fewer/more projects (then adjust compact grid only).
4. **Preserve HTML** — never refactor layout, classes, or section IDs.
5. **Minimize scope** — don't edit `output.css`, other cohort cards, or marquee logos unless requested.

## Phase Grouping Heuristic

When syllabus has `PART 1` / `PART 2` or numbered modules:

| Phase | Typical content |
|-------|-----------------|
| 1 | Foundations (language, basics, first LLM/chatbot) |
| 2 | Structured apps, APIs, function calling, embeddings |
| 3 | RAG, vector DBs, open-source models |
| 4 | Agents, workflows, memory, MCP |
| 5 | Deploy, observe, evaluate, secure, LLMOps |
| 6 | Deep dive / Part 2 (DL, transformers, fine-tuning) |
| 7 | All capstone projects |

Adjust titles to match course domain (backend, AI, system design, etc.).

## data-code-key Naming

Use kebab-case, topic-descriptive:

- `python-refresher`, `rag-fundamentals`, `langgraph-workflows`
- One key per curriculum bullet; keys must be unique across the page

Tooltip format:

```
'key-name': 'Learning Outcomes:\n• Bullet one\n• Bullet two\n• Bullet three\n• Bullet four'
```

## Do Not Change (unless explicitly asked)

- `#courses` — Other Featured Cohorts cards
- Nav Login / All courses links
- Company marquee logos
- `output.css`, build config
- Footer social links

## Additional Reference

- Full section line anchors: [section-map.md](section-map.md)
- Example revamp (AI Engineering): current `index.html` state in this repo
