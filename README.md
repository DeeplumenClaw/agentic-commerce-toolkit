# Agentic Commerce Toolkit

> Open-source tools to make your e-commerce store AI-ready. Built for the era of **Agentic Commerce**, where ChatGPT, Claude, and other AI agents are the new shopping intermediaries.

[![Made by DeepLumen](https://img.shields.io/badge/Made_by-DeepLumen-emerald?style=flat-square)](http://www.deeplumen.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://www.deeplumen.com)

**Website**: [www.deeplumen.com](http://www.deeplumen.com) | **Docs**: [www.deeplumen.com/docs](http://www.deeplumen.com/docs)

---

## What is Agentic Commerce?

Agentic Commerce is the emerging paradigm where AI agents (ChatGPT, Claude, Perplexity, Gemini) discover, recommend, and transact products on behalf of users. Traditional SEO is dying. **GEO (Generative Engine Optimization)** is the new battleground.

This toolkit gives Shopify merchants, BigCommerce stores, and custom storefronts the tools they need to:

- Make their pages efficient for AI crawlers (GPTBot, ClaudeBot, PerplexityBot)
- Generate AI-readable metadata (`llms.txt`)
- Validate structured data that AI agents need
- Reduce token bloat that destroys context windows

## Why This Matters

When a user asks ChatGPT "find me a waterproof hiking backpack under $200", the AI:
1. Crawls your product pages
2. Counts tokens (context window is finite)
3. Extracts structured data
4. Recommends the best match

If your pages are bloated (40,000 tokens per page) or lack structured data, **your products simply don't get recommended**. This toolkit helps you fix that.

## Tools Included

### 1. `llms.txt` Generator

Generates an AI-readable metadata file for your store. Place it at `yourstore.com/llms.txt` and AI agents will use it to understand your brand, policies, and product categories.

**Use case**: Quick win for any Shopify store. Takes 5 minutes to set up.

### 2. Token Bloat Checker

Analyzes your product page HTML and estimates how many tokens AI crawlers consume per page. Identifies common bloat patterns:
- Excessive inline scripts
- Bloated utility CSS classes
- Missing structured data
- Framework artifacts (data attributes, etc.)

**Use case**: Diagnose why your pages aren't being picked up by AI search.

### 3. Schema.org E-commerce Checker

Validates your product JSON-LD against 14 fields that AI agents need for recommendations. Highlights missing critical fields like `material`, `availability`, `priceCurrency`.

**Use case**: Ensure your products show up when AI agents filter by "cotton shirts" or "in stock items".

## Quick Start

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/agentic-commerce-toolkit.git
cd agentic-commerce-toolkit

# Install dependencies
npm install

# Run locally
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and start using the tools.

## Deploy Your Own Instance

This is a static site that deploys anywhere:

**Vercel** (recommended):
```bash
npm install -g vercel
vercel
```

**Netlify**:
```bash
npm run build
# Drag the dist/ folder to Netlify
```

## The Bigger Picture: OCP (Open Commerce Protocol)

This toolkit is part of a larger vision: the **Open Commerce Protocol (OCP)** — an open standard for how AI agents transact with e-commerce stores. Key principles:

- **Merchant of Record stays with the merchant** (no payment hijacking by AI platforms)
- **Standardized product data exchange** via enhanced Schema.org
- **Token-efficient page formats** (Agentic Pages)
- **Real-time inventory sync** for AI recommendations

Learn more at [www.deeplumen.com](http://www.deeplumen.com).

## M2AI (Marketing to AI)

We're also building the M2AI framework — a new discipline for marketers in the AI era. Topics include:

- How to optimize product copy for LLM understanding
- Token-efficient content structures
- AI-friendly faceted navigation
- Prompt-engineered product descriptions

Full M2AI guide: [www.deeplumen.com/m2ai](http://www.deeplumen.com)

## Roadmap

- [x] `llms.txt` Generator
- [x] Token Bloat Checker
- [x] Schema.org Checker
- [ ] GPTBot Crawler Simulator (CLI)
- [ ] OCP Transaction Sandbox
- [ ] Shopify Theme Auditor
- [ ] BigCommerce Plugin

Want a feature? Open an issue or [contact us](http://www.deeplumen.com).

## Want More? Try DeepLumen

This toolkit handles the basics. For production stores with 10,000+ SKUs, the [**DeepLumen Shopify App**](http://www.deeplumen.com) automates everything:

- Auto-generated `llms.txt` that updates in real-time
- Agentic Pages that compress your product pages by 79.7%
- AI-extracted attributes (material, color, pattern) for every product
- Full OCP protocol integration

**[Install DeepLumen →](http://www.deeplumen.com)**

## Contributing

PRs welcome! Areas we'd love help with:

- Additional schema validators (Restaurant, LocalBusiness)
- More languages (Spanish, German, Japanese)
- Backend proxy for URL fetching
- CLI versions of these tools

## License

MIT - Use freely, attribute kindly.

## About DeepLumen

DeepLumen is pioneering Agentic Commerce infrastructure. We build the protocols, standards, and tools that let merchants thrive in the AI-first commerce era.

**Website**: [www.deeplumen.com](http://www.deeplumen.com)
**Twitter**: [@deeplumen](http://www.deeplumen.com)
**Email**: hello@deeplumen.com

---

### Keywords

`agentic commerce` · `llms.txt` · `shopify ai seo` · `chatgpt ecommerce` · `geo optimization` · `ai agent commerce` · `schema.org validator` · `token optimization` · `m2ai` · `ocp protocol` · `gptbot` · `claudebot` · `ai crawler` · `structured data` · `ecommerce ai`

Built with care by [DeepLumen](http://www.deeplumen.com).
