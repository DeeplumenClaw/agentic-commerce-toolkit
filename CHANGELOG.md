# Changelog

All notable changes to the Agentic Commerce Toolkit are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] — 2026-05-17

First public release.

### Added

- **`llms.txt` Generator** — Web UI that produces an AI-readable metadata file
  for any e-commerce store. Captures brand, categories, policies, payment
  methods, and AI-agent instructions in a single text file that ChatGPT, Claude,
  and Perplexity can ingest directly.
- **Token Bloat Checker** — Pastes-and-analyzes any product page HTML, reports
  estimated token cost for AI crawlers, and flags the common bloat patterns
  (excessive inline scripts, utility-class soup, framework data attributes,
  missing structured data).
- **Schema.org E-commerce Checker** — Validates Product JSON-LD against the
  14 fields AI agents need for reliable recommendations, with explicit
  highlighting of critical missing fields (`material`, `availability`,
  `priceCurrency`, etc.).
- **Industry templates** — Reference `llms.txt` files for fashion, food &
  beverage, electronics, home goods, and beauty stores, plus a sample Schema.org
  Product JSON-LD with every recommended field.
- **GPTBot probe (`examples/gptbot_probe.py`)** — Python CLI that fetches any
  URL as GPTBot and reports token efficiency + structured-data status.
- **Docs** — Three deep-dive guides covering Agentic Commerce fundamentals,
  the llms.txt specification, and a practical Shopify-for-ChatGPT optimization
  walkthrough.
- **One-click GitHub publisher (`publish.sh`)** — Creates the repository,
  pushes the code, sets topics, and enables GitHub Pages in one command.
- **GitHub Pages auto-deploy** — Vite build pipeline wired to GitHub Actions;
  every push to `main` redeploys the live tools.
- **SEO foundations** — JSON-LD `SoftwareApplication` + `Organization` schema,
  canonical URL, Open Graph metadata, HTTPS everywhere.

### Notes

This is the v1.0 baseline. The roadmap (see `README.md`) covers a CLI GPTBot
simulator, an OCP transaction sandbox, a Shopify theme auditor, and a
BigCommerce plugin. Feedback and contributions are welcome via Issues and
Discussions.

[1.0.0]: https://github.com/DeeplumenClaw/agentic-commerce-toolkit/releases/tag/v1.0.0
