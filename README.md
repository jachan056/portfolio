# Ja-Chan Lu — Portfolio

A clean, fast, no-framework personal portfolio built with HTML, CSS, and vanilla JS.

## File structure

```
portfolio/
├── index.html          ← Main page (all sections)
├── css/
│   └── style.css       ← All styles
├── js/
│   └── main.js         ← Canvas animation, filters, scroll effects
├── assets/
│   └── resume.pdf      ← Drop your resume PDF here
└── README.md
```

## Setup

### 1. Add your resume

Drop your resume PDF into `assets/resume.pdf`. The "Resume" sidebar link will automatically point to it.

### 2. Run locally

No build step required. Just open `index.html` in a browser, or use a local server:

```bash
# Python (recommended)
cd portfolio
python3 -m http.server 8000
# then open http://localhost:8000

# Node (if you have it)
npx serve .
```

### 3. Deploy for free

**GitHub Pages (recommended)**

1. Push this entire folder to a GitHub repo
2. Go to repo Settings → Pages
3. Set source to "Deploy from a branch" → main → / (root)
4. Your site will be live at `https://jachan056.github.io/<repo-name>`

**Custom domain (optional)**

If you want `jachanlu.com` or similar:
1. Buy a domain from Namecheap (~$10/yr)
2. In GitHub Pages settings, add it as a custom domain
3. Point your domain's DNS to GitHub's IPs (instructions in GitHub docs)

**Netlify (alternative)**

Drag and drop the `portfolio/` folder to netlify.com/drop — live in 30 seconds.

## Customizing

### Add a new project card

Copy this block into `index.html` inside `.projects-grid`:

```html
<article class="project-card" data-tags="ml">
  <div class="card-body">
    <div class="card-top">
      <span class="card-badge badge-ml">ML · Analytics</span>
    </div>
    <h2 class="card-title">Your project title</h2>
    <p class="card-desc">Description of what you built and why.</p>
    <div class="card-finding">
      <span class="finding-label">Key finding</span>
      What did you actually discover? Put a real result here.
    </div>
    <div class="card-footer">
      <div class="card-skills">
        <span class="skill">Python</span>
        <span class="skill">Pandas</span>
      </div>
      <a href="https://github.com/..." target="_blank" class="card-link">View project ↗</a>
    </div>
  </div>
</article>
```

Available `data-tags` values: `ml`, `sql`, `viz`, `finance` (can be space-separated, e.g. `"ml finance"`)

Available badge classes: `badge-ml`, `badge-sql`, `badge-viz`, `badge-finance`, `badge-wip`, `badge-featured`

### Update the key finding text

Every card with a `.card-finding` block shows a result. When you finish the equity crash study,
update the card's finding with your actual crash-beta numbers or max drawdown comparisons.

### Change the accent color

In `css/style.css`, find `:root` and change `--accent: #2952CC` to any hex color.
Everything (nav active states, badge colors, hero text, skill bars, CTAs) will update automatically.

## What each JS feature does

- **Stream canvas**: Animated matrix-style data stream behind the hero. Respects `prefers-reduced-motion`.
- **Project filters**: Filter buttons show/hide cards by tag. Adds no dependencies.
- **Skill bars**: Animate from 0 to their actual width when scrolled into view.
- **Active nav**: Highlights the correct sidebar link as you scroll through sections.
- **Card entrances**: Cards fade in slightly from below when they enter the viewport.

## Fonts used

- **Space Grotesk** — headings and card titles (geometric, technical feel)
- **Inter** — body text (neutral, highly legible)
- **Space Mono** — eyebrows, labels, monospace accents

All loaded from Google Fonts, no install needed.
