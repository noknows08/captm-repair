# CAPTM Repair 🔧

Business website for **CAPTM Repair** — PC & laptop repair services in Davao City, Philippines.

**Live site:** https://captm-repair.vercel.app

## About

A static website (`index.html` + `assets/` photos) — no build step, no dependencies:

- "The Service Bench" design: clean professional light theme with real workbench photography (laptop repair, screen replacement, deep cleaning) and a single steel-teal accent
- Fonts embedded as base64 (Bricolage Grotesque, Archivo, IBM Plex Mono)
- All 10 services with custom-drawn SVG icons
- Fully responsive, keyboard accessible, honors `prefers-reduced-motion`

## Editing

Everything lives in `index.html`. Common edits:

- **Contact details** — search for `0926 376 4160` or `bibisheila08@gmail.com` to change the phone/email (each appears in the contact buttons and the contact card list).
- **Service descriptions** — search for the service name (e.g. `PC Reformatting`).

## Deploying

Pushes to `main` auto-deploy via Vercel. Manual deploy:

```
vercel deploy --prod --yes --scope hobby-e0c7049c
```
