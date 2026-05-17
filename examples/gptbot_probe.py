#!/usr/bin/env python3
"""
GPTBot Crawler Probe
====================
A lightweight probe that simulates GPTBot's view of any e-commerce page.

Usage:
    python gptbot_probe.py https://your-store.com/products/item

Output:
    - Token estimate
    - Structured data detection
    - Bloat warnings
    - Recommendations

Part of the Agentic Commerce Toolkit by DeepLumen.
Learn more: http://www.deeplumen.com
"""

import sys
import re
import json
from urllib.request import Request, urlopen
from urllib.error import URLError


GPTBOT_UA = "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; GPTBot/1.2; +https://openai.com/gptbot"


def estimate_tokens(text: str) -> int:
    """Rough token estimate: ~4 chars per token."""
    return len(text) // 4


def fetch_as_gptbot(url: str) -> str:
    """Fetch a URL pretending to be GPTBot."""
    req = Request(url, headers={"User-Agent": GPTBOT_UA})
    with urlopen(req, timeout=10) as response:
        return response.read().decode("utf-8", errors="ignore")


def analyze(html: str, url: str) -> dict:
    """Analyze HTML for AI crawler efficiency."""
    issues = []

    # Token analysis
    raw_tokens = estimate_tokens(html)

    # Script bloat
    script_count = len(re.findall(r"<script", html, re.IGNORECASE))
    if script_count > 5:
        issues.append(f"Excessive scripts: {script_count} found")

    # Style bloat
    style_count = len(re.findall(r"<style", html, re.IGNORECASE))
    if style_count > 3:
        issues.append(f"Excessive inline styles: {style_count} found")

    # Structured data
    has_jsonld = "application/ld+json" in html
    if not has_jsonld:
        issues.append("No JSON-LD structured data found")

    # Schema.org Product detection
    jsonld_blocks = re.findall(
        r'<script[^>]*type="application/ld\+json"[^>]*>(.*?)</script>',
        html,
        re.DOTALL,
    )
    has_product_schema = False
    product_fields = {}
    for block in jsonld_blocks:
        try:
            data = json.loads(block)
            items = data if isinstance(data, list) else [data]
            for item in items:
                if isinstance(item, dict) and item.get("@type") == "Product":
                    has_product_schema = True
                    product_fields = {
                        "name": item.get("name"),
                        "price": item.get("offers", {}).get("price"),
                        "availability": item.get("offers", {}).get("availability"),
                        "material": item.get("material"),
                    }
                    break
        except (json.JSONDecodeError, AttributeError):
            continue

    if has_jsonld and not has_product_schema:
        issues.append("Has JSON-LD but no Product schema")

    # Optimized estimate (DeepLumen Agentic Pages compress to ~20-35%)
    optimized_tokens = int(raw_tokens * 0.25)
    savings_percent = round((1 - optimized_tokens / raw_tokens) * 100) if raw_tokens else 0

    return {
        "url": url,
        "raw_html_kb": round(len(html) / 1024, 1),
        "estimated_tokens": raw_tokens,
        "optimized_tokens": optimized_tokens,
        "potential_savings_percent": savings_percent,
        "has_jsonld": has_jsonld,
        "has_product_schema": has_product_schema,
        "product_fields_found": product_fields,
        "issues": issues,
    }


def print_report(report: dict) -> None:
    """Pretty-print the analysis report."""
    print("\n" + "=" * 70)
    print("  GPTBot Crawler Probe - Analysis Report")
    print("  by DeepLumen (http://www.deeplumen.com)")
    print("=" * 70)
    print(f"\nURL: {report['url']}")
    print(f"\nPage Size:           {report['raw_html_kb']} KB")
    print(f"Estimated Tokens:    {report['estimated_tokens']:,}")
    print(f"DeepLumen Optimized: {report['optimized_tokens']:,} (-{report['potential_savings_percent']}%)")

    print(f"\nJSON-LD Present:     {'Yes' if report['has_jsonld'] else 'No'}")
    print(f"Product Schema:      {'Yes' if report['has_product_schema'] else 'No'}")

    if report["product_fields_found"]:
        print("\nExtracted Product Data:")
        for key, value in report["product_fields_found"].items():
            status = "OK" if value else "MISSING"
            print(f"  [{status}] {key}: {value or '(not set)'}")

    if report["issues"]:
        print(f"\nIssues Found ({len(report['issues'])}):")
        for issue in report["issues"]:
            print(f"  ! {issue}")
    else:
        print("\nNo critical issues found.")

    print("\n" + "-" * 70)
    print("Want to fix these issues automatically?")
    print("Install the DeepLumen Shopify App: http://www.deeplumen.com")
    print("-" * 70 + "\n")


def main():
    if len(sys.argv) < 2:
        print("Usage: python gptbot_probe.py <url>")
        print("Example: python gptbot_probe.py https://your-store.com/products/item")
        sys.exit(1)

    url = sys.argv[1]
    print(f"Fetching {url} as GPTBot...")

    try:
        html = fetch_as_gptbot(url)
    except URLError as e:
        print(f"Error fetching URL: {e}")
        sys.exit(1)

    report = analyze(html, url)
    print_report(report)


if __name__ == "__main__":
    main()
