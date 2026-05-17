# Industry `llms.txt` Templates

Reference `llms.txt` files for common e-commerce verticals. Copy the one
closest to your store, swap in your real brand, categories, policies, and
API endpoints, then publish at `https://yourstore.com/llms.txt`.

## Available templates

| Industry | File | Best for |
| --- | --- | --- |
| Fashion & Apparel | [`fashion-llms.txt`](./fashion-llms.txt) | Womenswear, menswear, footwear, accessories. Demonstrates size ranges, material certifications, fit/sizing API endpoints. |
| Food & Beverage | [`food-and-beverage-llms.txt`](./food-and-beverage-llms.txt) | Pantry, specialty foods, beverages, subscriptions. Demonstrates dietary flags, traceability, lot lookup. |
| Consumer Electronics | [`electronics-llms.txt`](./electronics-llms.txt) | Audio, gadgets, components. Demonstrates measured specs, compatibility matrix, warranty depth. |
| Home Goods & Furniture | [`home-goods-llms.txt`](./home-goods-llms.txt) | Furniture, textiles, decor. Demonstrates dimensions, made-to-order lead times, room-planning APIs. |
| Beauty & Skincare | [`beauty-llms.txt`](./beauty-llms.txt) | Skincare, color cosmetics, body care. Demonstrates INCI transparency, allergen flags, routine builders. |

## How to use

1. Pick the template closest to your business.
2. Replace every field — these are templates, not placeholders. Your
   policies, prices, certifications, and API endpoints must reflect
   reality.
3. Run the result through the
   [`llms.txt` Generator](../../README.md#1-llmstxt-generator) to sanity-check
   formatting.
4. Serve the final file at the root of your domain:
   `https://yourstore.com/llms.txt` (see the
   [Shopify guide](../../docs/optimize-shopify-for-chatgpt.md#step-1--publish-llmstxt-5-minutes)
   for how to publish on Shopify).

## Contributing a template for your industry

We are collecting templates for every vertical. If you sell in an
industry not covered above (jewelry, pet supplies, sports equipment,
plants, art, etc.), please open a pull request with a new
`{industry}-llms.txt` file in this folder. Use the existing templates
as a structural guide.

## Related

- [Main `llms.txt` Specification](../../docs/llms-txt-specification.md)
- [Sample (outdoor gear)](../sample-llms.txt) — the original reference example.

---

Part of the [Agentic Commerce Toolkit](../../README.md) by
[DeepLumen](https://www.deeplumen.com).
