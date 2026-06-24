# AlgoCamp index.html Section Map

Quick reference for agents revamping the course page.

## File Targets

| File | Purpose |
|------|---------|
| `index.html` | All visible content |
| `script.js` | Typing phrases, curriculum hover tooltips (`codeSnippets` object) |

## Section Order (top → bottom)

| Section | Search anchor | What to update |
|---------|---------------|----------------|
| Head | `<title>`, `<meta name="description">` | Course name + description |
| Hero | `min-h-screen`, `#typing-header` | Name, subtitle, CTA, price, coupon, cohort date |
| Built for Production | `Built for Production` | Subtitle + 3 tilt-cards |
| Cohort detail | `#spring-boot-detail` | Badge, h2, subtitle, join CTA, pricing |
| Reality check | `Are you ready for Production?` | Hook text + 6 scrolling questions |
| Project portfolio | `Project Portfolio` | Header + 2 hero + 4 secondary + ~9 compact cards |
| Curriculum | `#roadmap-container`, `Production Curriculum` | Header + 7 `.roadmap-phase` blocks |
| View Syllabus CTA | `View Syllabus` | `{enrollment_url}` |
| Other cohorts | `#courses` | **Skip** unless asked |
| Footer cohorts | `~/cohorts` | Primary course link only |

## Enrollment URL Occurrences

Primary course links (update all to new slug):

- Hero join button
- Cohort section join button
- View Syllabus button
- Footer `~/cohorts` first item

Pattern: `https://courses.algocamp.io/learn/{slug}`

## Pricing Blocks (2 locations)

1. Hero — `<!-- Pricing Info -->` after join buttons
2. Cohort header — inline flex next to join button

Both must show:
- `₹{price}` with Indian comma formatting (e.g. 13999 → ₹13,999)
- Coupon badge: `Use coupon {COUPON} for discount`

## Project Portfolio Structure

```
<!-- 2. Project Highlights -->
  Header (span + h3 + p)
  <!-- Hero Projects Grid -->     → 2 × lg cards
  <!-- Secondary Projects Grid --> → 4 × md cards (2-col)
  <!-- Additional Projects Grid --> → 9 × compact cards (3-col)
```

Each large/medium card contains:
- Visual header with tech tags
- Icon + title + subtitle
- Challenge box + Solution bullet list

Compact cards: icon, title, 3 bullets, tag pills.

## Curriculum Phase Structure

Each phase block:

```html
<div class="roadmap-phase ..." data-index="N">
  <!-- Left or right column with: -->
  <div class="... Phase N: Label">Phase N: Label</div>
  <h4>Phase Title</h4>
  <p>Phase description</p>
  <ul>
    <li><span data-code-key="kebab-key">Display text</span></li>
  </ul>
</div>
```

Phase 7 uses project names as `data-code-key` items (e.g. `claude-code-agent`).

## script.js Touch Points

| Location | Variable | Action |
|----------|----------|--------|
| ~line 9 | `phrases[]` | Set first entry to `course_name` |
| ~line 346 | `codeSnippets{}` | Sync all `data-code-key` values |
| ~line 132 | `codeSnippets[]` (array) | Optional hero terminal code |

Tooltip handler reads `codeSnippets[key]` on hover of `[data-code-key]` elements.

## Grep Verification Commands

```bash
# Find leftover old course name
rg -i "backend engineering|nodejs|lambda5" index.html

# List all curriculum keys
rg -o 'data-code-key="[^"]+"' index.html | sort -u

# Find keys missing from script.js (manual compare)
rg "'[a-z0-9-]+':" script.js
```

## Cohort Badge Text

- Hero: `Cohort Starts {date}` inside pulsing badge
- Cohort section: uppercase badge `Cohort Starts {date}`
