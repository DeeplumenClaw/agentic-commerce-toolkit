# Examples

Real-world examples and CLI probes from the Agentic Commerce Toolkit.

## Files

- **`sample-llms.txt`** — A reference `llms.txt` file for an outdoor gear store. Use this as a starting point for your own store.
- **`sample-product-schema.json`** — A complete Schema.org Product JSON-LD example with all recommended fields.
- **`gptbot_probe.py`** — A Python CLI that fetches any URL as GPTBot and reports token efficiency + structured data status.
- **[`industries/`](./industries/README.md)** — Industry-specific `llms.txt` templates for fashion, food & beverage, electronics, home goods, and beauty. Each demonstrates the fields and API endpoints that matter for that vertical.

## Running the GPTBot Probe

```bash
python3 gptbot_probe.py https://your-shopify-store.com/products/example
```

Sample output:

```
======================================================================
  GPTBot Crawler Probe - Analysis Report
  by DeepLumen (https://www.deeplumen.com)
======================================================================

URL: https://your-store.com/products/example

Page Size:           87.3 KB
Estimated Tokens:    22,400
DeepLumen Optimized: 5,600 (-75%)

JSON-LD Present:     Yes
Product Schema:      Yes

Extracted Product Data:
  [OK] name: Premium Hiking Backpack
  [OK] price: 189.99
  [MISSING] material: (not set)
  [OK] availability: https://schema.org/InStock

Issues Found (2):
  ! Excessive scripts: 12 found
  ! No JSON-LD structured data found
```

## Why This Matters

These probes are **deliberately simple** — they're meant to demonstrate the core concepts of Agentic Commerce optimization. The full [DeepLumen platform](https://www.deeplumen.com) handles automation, real-time sync, and protocol compliance at scale.

## Contributing Examples

Have a great `llms.txt` for your industry (fashion, food, electronics)? Open a PR! We're collecting templates for every vertical.

[Back to main README](../README.md)
