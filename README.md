# CAPTM Repair 🔧

Business website for **CAPTM Repair** — PC & laptop repair services in Davao City, Philippines.

**Live site:** https://captm-repair.vercel.app

## About

A single-file static website (`index.html`) — no build step, no dependencies. Everything is inlined:

- "Copper & Current" design: a motherboard-at-midnight theme with animated SVG illustrations (open PC tower, diagnostic bench), a BIOS-style boot intro, and copper circuit-trace accents
- Fonts embedded as base64 (Bricolage Grotesque, Archivo, IBM Plex Mono)
- All 10 services with custom-drawn SVG icons
- Fully responsive, keyboard accessible, honors `prefers-reduced-motion`

## Editing

Everything lives in `index.html`. Common edits:

- **Contact details** — search for `0917 000 0000` and `captm.repair@example.com` (placeholders) and replace with the real phone/email.
- **Service descriptions** — search for the service name (e.g. `PC Reformatting`).

## Deploying

Pushes to `main` auto-deploy via Vercel. Manual deploy:

```
vercel deploy --prod --yes --scope hobby-e0c7049c
```
