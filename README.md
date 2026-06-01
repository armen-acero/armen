# Armen Andonian — AI Opportunity Audit landing page

Astro + Tailwind CSS v4 static site. Auto-deploys to **https://armenandonian.com** via Vercel on every push to `main`.

## Edit from any computer

1. Install **Node.js**, **git**, and **Claude Code**.
2. Log into GitHub as `armen-acero`:
   ```bash
   gh auth login          # GitHub.com → HTTPS → web browser → armen-acero
   gh auth setup-git
   ```
3. Clone and install:
   ```bash
   git clone https://github.com/armen-acero/armen.git ai-automation-consulting
   cd ai-automation-consulting
   npm install
   ```

## Make a change

```bash
git pull                       # always pull first
npm run dev                    # preview locally at localhost:4321
# ...edit with Claude Code...
git add -A && git commit -m "describe your change"
git push                       # -> Vercel auto-deploys to armenandonian.com
```

## If an auto-deploy ever hangs

Fall back to a prebuilt deploy:

```bash
npx vercel build --prod --yes && npx vercel deploy --prebuilt --prod --yes
```

## Key files

- `src/pages/index.astro` — the entire landing page (copy, sections, layout)
- `src/layouts/Layout.astro` — `<head>`, SEO meta, FAQ JSON-LD
- `src/styles/global.css` — Tailwind theme tokens and custom styles
- `src/config.ts` — site brand, URL, email, booking link
- `public/logo.png` — signature logo
