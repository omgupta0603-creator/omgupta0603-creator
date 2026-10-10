---
name: design-md-library
description: Library of 74 DESIGN.md design-system analyses inspired by well-known brands (Stripe, Linear, Vercel, Apple, Notion, Airbnb, Spotify, Tesla and more) — colors, typography, spacing, radii, components. Use when the user wants a site or UI "in the style of" a known product, asks for a design system or DESIGN.md, or needs a concrete visual reference to build from.
---

# DESIGN.md Library

Brand-inspired design-system specs from [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md) (MIT). Each file in `references/` is a DESIGN.md: YAML front matter with tokens (colors, type, spacing, radii) followed by prose on layout, components and motion.

## How to use

1. Pick the reference that best matches the request. If the user names a brand, read `references/<brand>.md`. If they describe a vibe, skim the `description` lines (`grep -h '^description:' references/*.md`) and pick one to three candidates.
2. Read only the files you need — they are long.
3. Translate the tokens into the project's system (CSS variables, Tailwind theme, etc.) and follow the layout and component guidance.
4. These are *inspired* interpretations. Do not copy logos, trademarks or proprietary fonts; substitute available fonts with similar character, and keep the user's own brand and content.
5. To give the project its own spec, write a `DESIGN.md` at the project root adapted from the chosen reference.

## Available references

airbnb, airtable, apple, binance, bmw-m, bmw, bugatti, cal, claude, clay, clickhouse, cohere, coinbase, composio, cursor, dell-1996, elevenlabs, expo, ferrari, figma, framer, hashicorp, hp, ibm, intercom, kraken, lamborghini, linear.app, lovable, mastercard, meta, minimax, mintlify, miro, mistral.ai, mongodb, nike, nintendo-2001, notion, nvidia, ollama, opencode.ai, pinterest, playstation, posthog, raycast, renault, replicate, resend, revolut, runwayml, sanity, sentry, shopify, slack, spacex, spotify, starbucks, stripe, supabase, superhuman, tesla, theverge, together.ai, uber, vercel, vodafone, voltagent, warp, webflow, wired, wise, x.ai, zapier
