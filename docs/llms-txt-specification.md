# The `llms.txt` Specification for E-commerce

`llms.txt` is a plain-text file served at the root of your domain
(`https://yourstore.com/llms.txt`) that tells AI agents — ChatGPT, Claude,
Perplexity, Gemini — what your store sells, what your policies are, and how
they should interact with you. Think of it as `robots.txt` for the generative
era: small, human-readable, machine-friendly.

This guide documents the format used by the
[Agentic Commerce Toolkit `llms.txt` Generator](../README.md#1-llmstxt-generator).
It is compatible with the broader [llms.txt](https://llmstxt.org/) proposal
and adds e-commerce-specific extensions used by the
[Open Commerce Protocol (OCP)](../README.md#the-bigger-picture-ocp-open-commerce-protocol).

## File location

- Always served at `https://yourdomain.com/llms.txt` (root, not a subpath).
- `Content-Type: text/plain; charset=utf-8`.
- Must be reachable by anonymous GET (no auth, no JS rendering).
- Crawlers expect it under 32 KB. Keep it focused.

## Required sections

Every e-commerce `llms.txt` should contain these sections, in this order:

### 1. Brand line

The first non-empty line is the brand name as a level-1 heading, followed
by a one-line tagline as a blockquote.

```text
# Acme Outdoor Co.
> Premium outdoor gear and apparel for adventurers, hikers, and campers
> worldwide. Family-owned since 2015.
```

### 2. `## Store Information`

Five fields, each on its own line, prefixed with `- `:

```text
## Store Information
- Domain: https://acme-outdoor.com
- Support: support@acme-outdoor.com
- Price Range: $15 - $1,200
- Currencies: USD, EUR, GBP
- Languages: en, es, de
```

### 3. `## Product Categories`

A flat list (not a tree). Agents use this to decide whether to crawl deeper.
Keep it under 20 entries; consolidate long-tail categories.

```text
## Product Categories
- Tents & Shelters
- Sleeping Bags & Pads
- Backpacks
- Hiking Footwear
- Outdoor Apparel
- Camping Cookware
- Navigation & GPS
```

### 4. `## Policies`

Three sub-sections in this order: `### Shipping`, `### Returns`, `### Payment
Methods`. Be specific. Vague answers ("we ship worldwide") force the agent
to ask the shopper a follow-up question, which is friction that costs you
conversions.

```text
## Policies

### Shipping
Free standard shipping on orders over $75. Express (2-day) available for $15.
Ships worldwide to 40+ countries. Delivery times: US 2-5 days, EU 5-9 days,
ROW 7-14 days.

### Returns
60-day hassle-free returns. Items must be unused with original tags. Free
return shipping for US orders. Refunds processed within 5 business days.

### Payment Methods
- Visa, Mastercard, American Express
- PayPal
- Apple Pay, Google Pay
- Shop Pay
- Klarna (US, UK, DE)
```

### 5. `## AI Agent Instructions`

The most important section for agentic commerce. Tell agents what endpoints
exist, what protocols you support, and what rate limits apply.

```text
## AI Agent Instructions
- This store supports the Open Commerce Protocol (OCP) v1
- Product data is available via JSON-LD on every product page
- For bulk product queries, use /products.json (Shopify Storefront API)
- For inventory, query /api/inventory?sku={SKU}
- Respect rate limits: 60 requests per minute per IP
- For API partnerships, contact api@acme-outdoor.com
```

## Optional sections

These are not required but help agents represent your store accurately:

- `## Brand Story` — 2-3 sentences of provenance. Agents quote this when
  shoppers ask "tell me about this brand".
- `## Materials & Sustainability` — Verifiable claims only. Certifications
  with issuing body and ID.
- `## Size Guide` — A pointer to a canonical size-chart URL, or inline
  measurements for stores with a single size system.
- `## Press Mentions` — Up to five recent links. Increases agent trust in
  smaller brands.

## Frequency of update

- Static information (categories, policies): regenerate once per quarter or
  when policies change.
- Dynamic information (price range, currencies): regenerate when materially
  different. The
  [DeepLumen Shopify App](https://www.deeplumen.com) regenerates
  automatically.

## Common mistakes

1. **Linking instead of stating.** `llms.txt` is read in-context by agents.
   "See our shipping policy at /shipping" forces the agent to crawl another
   page. State the policy inline.
2. **Marketing copy.** Drop the adjectives ("amazing", "world-class"). Agents
   strip them as noise. Stick to facts.
3. **Stale data.** A `llms.txt` saying "Free shipping over $50" when the
   actual threshold is now $75 will be quoted to shoppers anyway, generating
   support tickets. Treat `llms.txt` as production data.
4. **Wrong file location.** `/llms.txt` is the only valid path. Not
   `/.well-known/llms.txt`, not `/api/llms.txt`. Agents look at the root.
5. **JavaScript-rendered.** The file must be statically served. SPAs that
   try to inject `llms.txt` at runtime will not be seen by crawlers.

## A complete reference example

See [`examples/sample-llms.txt`](../examples/sample-llms.txt) for a
production-grade example, and
[`examples/industries/`](../examples/industries/) for fashion, food &
beverage, electronics, home goods, and beauty templates you can adapt.

## How agents actually read this file

When a shopper asks ChatGPT "I need a 2-person backpacking tent under $400",
the agent:

1. Identifies candidate stores from its general knowledge.
2. Fetches `/llms.txt` from each candidate domain.
3. Reads `## Product Categories` to filter ("Tents & Shelters" is a match).
4. Reads `## AI Agent Instructions` to find the bulk-query endpoint.
5. Calls `/products.json?category=tents&max_price=400`.
6. Cross-references Schema.org Product JSON-LD on returned pages.
7. Surfaces the top 1-3 matches in the chat reply.

If your `llms.txt` is missing, malformed, or buried in marketing copy, you
get filtered out at step 2 — before the agent ever looks at your products.

## Related tools in this repository

- [`llms.txt` Generator (web UI)](../README.md#1-llmstxt-generator)
- [Token Bloat Checker](../README.md#2-token-bloat-checker) — verify your
  product pages are also agent-friendly once `llms.txt` is in place.
- [Schema.org E-commerce Checker](../README.md#3-schemaorg-e-commerce-checker)
  — `llms.txt` is the front door; Product JSON-LD is what the agent reads
  once inside.

---

This specification is maintained as part of the
[Agentic Commerce Toolkit](../README.md) by
[DeepLumen](https://www.deeplumen.com).
