# What is Agentic Commerce? A Practical Guide for Merchants

**Agentic Commerce** is the emerging model where AI agents — ChatGPT, Claude,
Perplexity, Gemini, and the next wave of autonomous shopping assistants —
discover, compare, and transact products on behalf of human shoppers.

In agentic commerce, the AI is the customer-facing intermediary. The shopper
never sees your storefront unless the AI decides your product is worth
recommending. That changes what "being discoverable online" actually means.

## The shift from SEO to GEO

Traditional SEO assumes a human types a query, scans ten blue links, and
clicks. Agentic Commerce assumes an AI agent reads a hundred candidate pages,
extracts structured product attributes, and surfaces one or two recommendations
inline in a chat reply.

That gives rise to **Generative Engine Optimization (GEO)** — a discipline
focused on:

- **Crawler efficiency.** AI agents have finite context windows. A bloated
  product page costing 40,000 tokens will be summarised or skipped; a clean
  one costing 4,000 tokens will be quoted in full.
- **Machine-readable attribution.** Structured data (Schema.org Product
  JSON-LD, `llms.txt`, OpenGraph) is no longer a "nice-to-have". It is the
  contract by which AI agents extract `material`, `availability`,
  `priceCurrency`, and other fields they need to filter and rank.
- **Identity and trust signals.** Agents weigh policy clarity (returns,
  shipping), payment-method coverage, and brand consistency when deciding
  whether to surface a merchant.

## Who is the shopper?

In Agentic Commerce there are three actors, not two:

1. **The human** — states a need ("waterproof hiking backpack under $200").
2. **The AI agent** — interprets the need, browses, filters, recommends.
3. **The merchant (you)** — must be legible to the agent.

The agent is your new top-of-funnel. If your pages are illegible to it, you
do not exist in the consideration set.

## What changes for merchants

Most of what merchants did for Google SEO over the last 15 years was about
*signalling relevance to humans through HTML*. Agentic Commerce is about
*signalling relevance to machines through structured data*. Specifically:

| Old (Human SEO) | New (Agentic / GEO) |
| --- | --- |
| Keyword density in copy | Attribute completeness in JSON-LD |
| Backlinks and domain authority | Crawler-friendly token efficiency |
| Title tags and meta descriptions | `llms.txt` and OpenAPI/MCP endpoints |
| Site speed for Core Web Vitals | Site speed for crawler budget |
| Long-form blog content | Clean product data + answerable policies |
| `rel="canonical"` for duplicates | `rel="canonical"` + entity association |

You still need fast pages and good content. You also need a second layer:
**machine-first metadata** that lets an agent answer "is this product in stock,
in cotton, in size M, ships to Spain, and returnable within 30 days?" without
ever rendering your HTML.

## Three things every store should do this quarter

1. **Publish an `llms.txt`** at the root of your domain. It is a five-minute
   change that tells AI agents who you are, what you sell, and how to
   transact. Use the [generator in this toolkit](../README.md#1-llmstxt-generator).
2. **Audit your Product JSON-LD** against the 14 fields agents actually use.
   The [Schema.org checker](../README.md#3-schemaorg-e-commerce-checker)
   reports which critical fields you are missing.
3. **Reduce token bloat** on your top 10 best-selling product pages. The
   [token bloat checker](../README.md#2-token-bloat-checker) estimates the
   token cost of any URL and highlights the biggest contributors.

## Where this is going: OCP

The Open Commerce Protocol (OCP) is an emerging open standard for how AI
agents transact with merchants directly — including authenticated checkout,
inventory queries, and personalised recommendations — without payment hijacks
by AI platforms. We are building toward it in the open. See the
[OCP overview in our main README](../README.md#the-bigger-picture-ocp-open-commerce-protocol).

## Further reading

- [llms.txt Specification](./llms-txt-specification.md) — format, fields,
  examples.
- [Optimize Shopify for ChatGPT](./optimize-shopify-for-chatgpt.md) — a
  walkthrough for Shopify merchants.
- [DeepLumen — Agentic Commerce infrastructure for Shopify](https://www.deeplumen.com)
  — automated `llms.txt`, Agentic Pages, and full OCP integration for stores
  with thousands of SKUs.

---

Built and maintained by [DeepLumen](https://www.deeplumen.com).
