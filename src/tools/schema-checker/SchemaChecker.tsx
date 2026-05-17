import { useState } from 'react'

interface SchemaField {
  name: string
  path: string
  required: boolean
  found: boolean
  value?: string
  recommendation?: string
}

interface CheckResult {
  schemaType: string
  fieldsChecked: SchemaField[]
  score: number
  missingCritical: number
  missingOptional: number
}

const ECOMMERCE_FIELDS: Omit<SchemaField, 'found' | 'value'>[] = [
  { name: 'Product Name', path: 'name', required: true, recommendation: 'Required for AI to identify the product' },
  { name: 'Description', path: 'description', required: true, recommendation: 'AI needs this to match user queries' },
  { name: 'Price', path: 'offers.price', required: true, recommendation: 'Essential for purchase decisions' },
  { name: 'Currency', path: 'offers.priceCurrency', required: true, recommendation: 'Needed for international shoppers' },
  { name: 'Availability', path: 'offers.availability', required: true, recommendation: 'Prevents recommending out-of-stock items' },
  { name: 'Brand', path: 'brand.name', required: false, recommendation: 'Helps with brand-specific searches' },
  { name: 'SKU', path: 'sku', required: false, recommendation: 'Useful for inventory tracking' },
  { name: 'GTIN/UPC', path: 'gtin', required: false, recommendation: 'Enables universal product matching' },
  { name: 'Image', path: 'image', required: true, recommendation: 'Visual context for AI recommendations' },
  { name: 'Material', path: 'material', required: false, recommendation: 'Critical for "cotton shirts" type queries' },
  { name: 'Color', path: 'color', required: false, recommendation: 'Enables color-based filtering' },
  { name: 'Size', path: 'size', required: false, recommendation: 'Required for apparel/footwear' },
  { name: 'Reviews', path: 'aggregateRating', required: false, recommendation: 'Social proof for AI recommendations' },
  { name: 'Category', path: 'category', required: false, recommendation: 'Helps with browse-intent queries' },
]

export default function SchemaChecker() {
  const [jsonLdInput, setJsonLdInput] = useState('')
  const [result, setResult] = useState<CheckResult | null>(null)
  const [error, setError] = useState('')

  const getNestedValue = (obj: Record<string, unknown>, path: string): unknown => {
    return path.split('.').reduce((current: unknown, key) => {
      if (current && typeof current === 'object' && key in (current as Record<string, unknown>)) {
        return (current as Record<string, unknown>)[key]
      }
      return undefined
    }, obj)
  }

  const analyzeSchema = () => {
    setError('')
    setResult(null)

    try {
      const parsed = JSON.parse(jsonLdInput)
      const schemaType = parsed['@type'] || 'Unknown'

      if (schemaType !== 'Product' && !schemaType.includes('Product')) {
        setError(`Schema type is "${schemaType}". This tool is optimized for Product schema.`)
      }

      const fieldsChecked: SchemaField[] = ECOMMERCE_FIELDS.map((field) => {
        const value = getNestedValue(parsed, field.path)
        return {
          ...field,
          found: value !== undefined && value !== null && value !== '',
          value: value ? String(value).substring(0, 50) : undefined,
        }
      })

      const foundCount = fieldsChecked.filter((f) => f.found).length
      const missingCritical = fieldsChecked.filter((f) => f.required && !f.found).length
      const missingOptional = fieldsChecked.filter((f) => !f.required && !f.found).length
      const score = Math.round((foundCount / fieldsChecked.length) * 100)

      setResult({
        schemaType,
        fieldsChecked,
        score,
        missingCritical,
        missingOptional,
      })
    } catch {
      setError('Invalid JSON. Please paste valid JSON-LD structured data.')
    }
  }

  const sampleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Premium Hiking Backpack',
    description: 'Durable 45L backpack for multi-day hikes',
    image: 'https://example.com/backpack.jpg',
    offers: {
      '@type': 'Offer',
      price: '149.99',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 mb-6">
        <h2 className="text-xl font-semibold mb-2">Schema.org E-commerce Checker</h2>
        <p className="text-slate-400 text-sm mb-6">
          Validate your product JSON-LD against fields that AI agents need to recommend and sell your products.
          Missing fields = missed sales opportunities.
        </p>

        <div className="flex justify-between items-center mb-2">
          <label className="text-sm text-slate-300">Paste your JSON-LD</label>
          <button
            onClick={() => setJsonLdInput(JSON.stringify(sampleSchema, null, 2))}
            className="text-xs text-emerald-400 hover:underline"
          >
            Load sample
          </button>
        </div>

        <textarea
          value={jsonLdInput}
          onChange={(e) => setJsonLdInput(e.target.value)}
          placeholder='{"@context": "https://schema.org", "@type": "Product", ...}'
          rows={10}
          className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono text-sm"
        />

        {error && (
          <p className="mt-2 text-sm text-red-400">{error}</p>
        )}

        <button
          onClick={analyzeSchema}
          disabled={!jsonLdInput}
          className="mt-4 w-full py-3 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50"
        >
          Check Schema Fields
        </button>

        <p className="text-xs text-slate-500 mt-3">
          Tip: Find your JSON-LD by viewing page source and searching for{' '}
          <code className="text-emerald-400">application/ld+json</code>
        </p>
      </div>

      {/* Results */}
      {result && (
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Schema Analysis</h3>
              <p className="text-slate-400 text-sm">Type: {result.schemaType}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-emerald-400">{result.score}%</div>
              <div className="text-xs text-slate-400">AI Readiness Score</div>
            </div>
          </div>

          {/* Summary */}
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-slate-900 rounded-lg p-4 text-center">
              <p className="text-3xl font-semibold text-emerald-400">
                {result.fieldsChecked.filter((f) => f.found).length}
              </p>
              <p className="text-slate-400 text-sm">Fields Found</p>
            </div>
            <div className="bg-slate-900 rounded-lg p-4 text-center">
              <p className="text-3xl font-semibold text-red-400">{result.missingCritical}</p>
              <p className="text-slate-400 text-sm">Critical Missing</p>
            </div>
            <div className="bg-slate-900 rounded-lg p-4 text-center">
              <p className="text-3xl font-semibold text-yellow-400">{result.missingOptional}</p>
              <p className="text-slate-400 text-sm">Optional Missing</p>
            </div>
          </div>

          {/* Fields Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-2 text-slate-400 font-medium">Field</th>
                  <th className="text-left py-2 text-slate-400 font-medium">Path</th>
                  <th className="text-center py-2 text-slate-400 font-medium">Status</th>
                  <th className="text-left py-2 text-slate-400 font-medium">Value / Recommendation</th>
                </tr>
              </thead>
              <tbody>
                {result.fieldsChecked.map((field, i) => (
                  <tr key={i} className="border-b border-slate-800">
                    <td className="py-2">
                      {field.name}
                      {field.required && <span className="text-red-400 ml-1">*</span>}
                    </td>
                    <td className="py-2 text-slate-500 font-mono text-xs">{field.path}</td>
                    <td className="py-2 text-center">
                      {field.found ? (
                        <span className="text-emerald-400">Found</span>
                      ) : (
                        <span className="text-red-400">Missing</span>
                      )}
                    </td>
                    <td className="py-2 text-slate-400">
                      {field.found ? (
                        <code className="text-xs bg-slate-900 px-1 py-0.5 rounded">
                          {field.value}...
                        </code>
                      ) : (
                        <span className="text-xs">{field.recommendation}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* CTA */}
          {result.missingCritical > 0 && (
            <div className="mt-6 p-4 bg-red-900/30 border border-red-700 rounded-lg">
              <p className="text-red-300 font-medium mb-2">
                You have {result.missingCritical} critical fields missing!
              </p>
              <p className="text-sm text-slate-300">
                AI agents like ChatGPT cannot reliably recommend products with incomplete schemas.{' '}
                <a href="https://www.deeplumen.com" className="text-emerald-400 underline">
                  DeepLumen automatically enriches
                </a>{' '}
                your product data with AI-extracted attributes.
              </p>
            </div>
          )}

          {result.missingCritical === 0 && (
            <div className="mt-6 p-4 bg-emerald-900/30 border border-emerald-700 rounded-lg">
              <p className="text-emerald-300 font-medium">Great job!</p>
              <p className="text-sm text-slate-300">
                Your schema covers the critical fields. Consider adding optional fields like{' '}
                {result.fieldsChecked
                  .filter((f) => !f.required && !f.found)
                  .slice(0, 3)
                  .map((f) => f.name)
                  .join(', ')}{' '}
                to maximize AI visibility.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
