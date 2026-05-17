# Optimize Your Shopify Store for ChatGPT, Claude, and AI Shoppers

A practical, do-it-this-week guide to making your Shopify store legible to
AI agents. Every step here is achievable with the free
[Agentic Commerce Toolkit](../README.md); when you outgrow it, the
[DeepLumen Shopify App](https://www.deeplumen.com) automates the whole
pipeline.

## Why your Shopify store is probably invisible to AI agents

The default Shopify theme stack — Dawn, Refresh, Sense, and most premium
themes — was designed for human shoppers and Google's 2020-era crawler. It
is **not** optimised for the way ChatGPT, Claude, and Perplexity actually
read product pages today. Three issues recur in almost every store we audit:

1. **40,000-token product pages.** Liquid-rendered themes inject hundreds
   of inline scripts, app-injected widgets (reviews, upsells, currency
   converters), and utility-class soup. AI crawlers truncate at context
   limits and your product description never gets read.
2. **Incomplete Product JSON-LD.** Shopify auto-generates JSON-LD, but it
   stops at the minimum: name, price, image. The fields that *matter* for
   agent filtering — `material`, `availability`, `priceCurrency`,
   `gtin`, `mpn`, `brand`, `aggregateRating` — are usually missing or
   placeholder.
3. **No `llms.txt`.** Shopify does not ship one. You have to publish it
   yourself, and most stores have not. This means agents have no high-level
   map of your store.

The good news: each is fixable in under an hour.

## Step 1 — Publish `llms.txt` (5 minutes)

Open the [`llms.txt` generator in the toolkit](../README.md#1-llmstxt-generator),
fill in your store's brand, categories, and policies, and copy the output.

Then publish it. Two options on Shopify:

**Option A — Shopify Files (fastest):**
1. Settings → Files → upload `llms.txt`.
2. Note the CDN URL Shopify gives back (it will be `cdn.shopify.com/...`).
3. In `theme.liquid` (Online Store → Themes → Edit code), add a redirect
   helper or — better — use:

**Option B — Shopify Pages with URL redirect (recommended):**
1. Online Store → Navigation → URL Redirects → create a redirect from
   `/llms.txt` to a page or asset URL containing the raw text.
2. Verify with `curl https://yourstore.com/llms.txt` — you should see the
   plain text, `200 OK`, `text/plain` content type.

**Option C — Use the DeepLumen Shopify App:**
The [DeepLumen Shopify App](https://www.deeplumen.com) installs the
`/llms.txt` route as a native app proxy and regenerates the file
automatically whenever your catalogue or policies change.

## Step 2 — Audit and complete Product JSON-LD (20 minutes)

Pick your top 5 best-selling products. For each:

1. Open the product page in incognito.
2. View source. Search for `application/ld+json`.
3. Copy the JSON-LD block.
4. Paste it into the
   [Schema.org checker](../README.md#3-schemaorg-e-commerce-checker).
5. Review the missing critical fields.

The toolkit checker reports against the 14 fields AI agents actually use
for filtering and recommendation:

`name`, `description`, `brand`, `sku`, `gtin`, `mpn`, `image`, `offers.price`,
`offers.priceCurrency`, `offers.availability`, `material`, `color`,
`aggregateRating`, `review`.

To fix gaps in a Shopify theme:

- **Easy fields (price, currency, availability):** Already in the theme's
  default JSON-LD output. If they are missing, your theme is broken — switch
  to a current version of Dawn or rebuild the JSON-LD block in
  `snippets/product-json-ld.liquid`.
- **Catalog fields (gtin, mpn, brand):** Use Shopify metafields. Create
  metafields under `Settings → Custom data → Products` (namespace
  `custom`, keys `gtin`, `mpn`, `brand`), then inject them in the JSON-LD
  block:
  ```liquid
  "gtin": "{{ product.metafields.custom.gtin }}",
  "mpn": "{{ product.metafields.custom.mpn }}",
  "brand": { "@type": "Brand", "name": "{{ product.metafields.custom.brand }}" }
  ```
- **Attribute fields (material, color):** Use product options or
  metafields, then read them in the JSON-LD block the same way.
- **Reviews:** If you use Judge.me, Yotpo, Loox, or Stamped, they each
  ship their own JSON-LD. Make sure exactly one source is emitting
  `aggregateRating` — duplicates confuse parsers.

## Step 3 — Cut token bloat from product pages (30 minutes)

Run your top 10 product pages through the
[Token Bloat Checker](../README.md#2-token-bloat-checker). Each will get a
token estimate and a list of bloat sources.

The four largest offenders in nearly every Shopify store:

1. **Inline review-widget JavaScript.** Configure your reviews app to load
   asynchronously or, better, render reviews server-side and let the widget
   only handle submission.
2. **Currency-converter scripts.** Convert prices server-side using the
   shopper's geo and emit a single `priceCurrency` value, instead of
   shipping a JS bundle that swaps every price on the page.
3. **Theme app extensions stacking widgets.** Audit your installed apps
   monthly. Anything dormant for 60+ days should be uninstalled. Each app
   typically adds 5-20 KB of inline assets.
4. **Utility-class soup.** Tailwind-built themes generate hundreds of
   one-off classes per page. Set up a production CSS purge step
   (`npm run build` with Tailwind's JIT mode) and ship a single small
   bundled stylesheet instead.

A clean Shopify product page should be under 8,000 tokens. The bloated
average is 30,000-50,000.

## Step 4 — Verify what an AI crawler actually sees (10 minutes)

Use the included [GPTBot probe](../examples/README.md):

```bash
python3 examples/gptbot_probe.py https://yourstore.com/products/best-seller
```

The probe fetches your page with the GPTBot User-Agent and reports token
count, structured-data status, and extracted product attributes.

If the probe extracts the right product data, an agent will too. If the
probe sees only "TM Premium Hiking Backpack" and nothing else, your theme
is rendering content in JavaScript that GPTBot never executes — fix it by
moving content from client-side JS into server-rendered Liquid.

## Step 5 — Submit yourself to AI agents

Three submissions, each takes minutes:

1. **OpenAI GPTBot allowlist** — ensure `robots.txt` does not block
   `GPTBot`. Default Shopify allows it; check yours with
   `curl https://yourstore.com/robots.txt | grep -i gpt`.
2. **Anthropic ClaudeBot** — same check: `grep -i claude` in robots.txt.
3. **Perplexity index** — submit your sitemap at
   <https://perplexity.ai>'s indexing endpoint (currently via
   [perplexity.ai/business](https://www.perplexity.ai/business)).

## What "done" looks like

After all five steps:

- `curl https://yourstore.com/llms.txt` returns 200 with valid content.
- Schema.org checker shows zero missing critical fields on top products.
- Token Bloat Checker shows green (< 8,000 tokens) on top products.
- GPTBot probe extracts correct name, price, availability, material.
- robots.txt explicitly allows GPTBot and ClaudeBot.

At that point, your store is meaningfully more discoverable in Agentic
Commerce than 95% of competitors.

## Beyond the basics

The toolkit handles the foundations. For production stores with thousands
of SKUs you will hit the limits quickly:

- `llms.txt` needs to stay in sync with a moving catalogue.
- Product JSON-LD needs metafield discipline that scales beyond manual
  entry.
- Token budgets must be enforced as a build-time check, not a quarterly
  audit.

The [DeepLumen Shopify App](https://www.deeplumen.com) automates all of
this: auto-generated `llms.txt` that updates in real time, Agentic Pages
that compress your product pages by ~80%, AI-extracted attributes
(material, color, pattern) for every product, and full Open Commerce
Protocol integration.

## Related reading

- [What is Agentic Commerce?](./what-is-agentic-commerce.md) — concept
  overview and why GEO matters.
- [The `llms.txt` Specification](./llms-txt-specification.md) — full
  format reference.

---

Maintained as part of the [Agentic Commerce Toolkit](../README.md) by
[DeepLumen](https://www.deeplumen.com).
