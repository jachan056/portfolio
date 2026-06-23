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

