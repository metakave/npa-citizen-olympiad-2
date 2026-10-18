# সুনাগরিক অলিম্পিয়াড ২০২৭ — Good Citizen Olympiad Website

Official static web platform for the **Good Citizen Olympiad (সুনাগরিক অলিম্পিয়াড)**, organized by **Network for People's Action (NPA)** ([ournpa.org](https://ournpa.org)).

Deployable directly to **Cloudflare Pages** (or GitHub Pages, Vercel, Netlify) with zero build steps or external dependencies.

---

## ✨ Features

- **NPA Brand Design System**: Extracted directly from `ournpa.org` (Deep Teal `#006E70`, clean off-white `#fdfdfc`, soft amber accents, and elegant typography).
- **Bilingual (বাংলা ও English)**: Instant client-side switching between Bengali and English with custom typographic balancing (`Hind Siliguri`, `Noto Serif Bengali`, and `Plus Jakarta Sans`).
- **Dark & Light Mode**: Default is sleek Light mode; full dark theme (`[data-theme="dark"]`) with persistence via `localStorage`.
- **7 Complete Pages**:
  1. `index.html` — Positioning, 5 modules mapped to NPA principles, 3 rounds, stats ribbon, and timeline.
  2. `program.html` — Round-by-round format, 7-day civic project rubric, symmetric city quota (10+10), and exam integrity mechanics.
  3. `syllabus.html` — Detailed 5 modules, constitutional articles, sample questions, and reading list.
  4. `schedule.html` — Saturday date rationale, Dhaka & Chattogram venues, admit card download dates, and exam-day checklist.
  5. `quiz.html` — Working 12-question interactive model test with 10-minute timer, instant scoring, and constitutional explanations.
  6. `register.html` — Validated registration form with separate ethical political consent checkboxes, source tracking codes, and instant printable admit card (`GCO27-DHK-XXXX` / `GCO27-CTG-XXXX`).
  7. `faq.html` — 14 comprehensive FAQs and the ethical Data Minimisation Privacy Policy.
- **Cloudflare Pages Ready**: Includes `_headers` for optimized caching and security headers.

---

## 🚀 Cloudflare Pages Deployment (Step-by-Step)

### Option A: Via Cloudflare Dashboard & Git (Recommended)
1. Push this repository to GitHub or GitLab.
2. Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com/) and go to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select this repository.
4. Set build settings:
   - **Framework preset**: None
   - **Build command**: *(leave blank)*
   - **Build output directory**: `/` (root directory)
5. Click **Save and Deploy**. Your site will be live on `*.pages.dev` in ~15 seconds!

### Option B: Direct Deploy via Wrangler CLI
```bash
# In this directory:
npx wrangler pages deploy . --project-name=good-citizen-olympiad
```

### Option C: Custom Subdomain Setup
In your Cloudflare DNS, add a CNAME record:
- Name: `olympiad` (or `sunagorik`)
- Target: `<your-project-name>.pages.dev`
- Proxy status: Proxied (Orange Cloud)

---

## ⚙️ Configuration & Backend Connection

Open `assets/js/config.js` to change event details or connect a live backend endpoint:

```javascript
window.GCO_CONFIG = {
  // Switch to 'production' when you connect your Cloudflare Worker or Google Sheet webhook
  mode: 'pilot',

  // Insert your Form endpoint (Cloudflare Worker, Google Sheet Script, Formspree, Make.com)
  apiEndpoint: 'https://api.ournpa.org/olympiad/register',
  
  // Event metadata
  event: {
    titleEn: 'Good Citizen Olympiad 2027',
    titleBn: 'সুনাগরিক অলিম্পিয়াড ২০২৭',
    supportEmail: 'olympiad@ournpa.org'
  }
};
```

---

## 🧪 Local Preview

You can preview the website locally using any standard static server:

```bash
# Using Python
python3 -m http.server 8080

# Or using Node / npx
npx serve .
```
Then visit `http://localhost:8080` in your browser.
