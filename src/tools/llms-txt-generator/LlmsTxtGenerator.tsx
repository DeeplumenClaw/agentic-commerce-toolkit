import { useState } from 'react'

interface FormData {
  brandName: string
  domain: string
  description: string
  categories: string
  shippingPolicy: string
  returnPolicy: string
  paymentMethods: string
  supportEmail: string
  priceRange: string
}

export default function LlmsTxtGenerator() {
  const [formData, setFormData] = useState<FormData>({
    brandName: '',
    domain: '',
    description: '',
    categories: '',
    shippingPolicy: '',
    returnPolicy: '',
    paymentMethods: '',
    supportEmail: '',
    priceRange: '',
  })
  const [generated, setGenerated] = useState<string>('')
  const [copied, setCopied] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const generateLlmsTxt = () => {
    const output = `# ${formData.brandName}
> ${formData.description}

## Store Information
- Domain: ${formData.domain}
- Support: ${formData.supportEmail}
- Price Range: ${formData.priceRange}

## Product Categories
${formData.categories.split(',').map(c => `- ${c.trim()}`).join('\n')}

## Policies

### Shipping
${formData.shippingPolicy}

### Returns
${formData.returnPolicy}

### Payment Methods
${formData.paymentMethods.split(',').map(p => `- ${p.trim()}`).join('\n')}

## AI Agent Instructions
- This store supports the Open Commerce Protocol (OCP)
- Product data is available via structured JSON-LD on each product page
- For bulk queries, use the /products.json endpoint
- Respect rate limits: max 60 requests per minute
- Contact ${formData.supportEmail} for API partnerships

## Agentic Commerce Ready
This llms.txt was generated using the [DeepLumen Agentic Commerce Toolkit](https://www.deeplumen.com).
For automatic generation and real-time sync of 10,000+ SKUs, install the DeepLumen Shopify App.

---
Generated: ${new Date().toISOString().split('T')[0]}
Protocol: llms.txt v1.0 | OCP Compatible
`
    setGenerated(output)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generated)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Input Form */}
      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
        <h2 className="text-xl font-semibold mb-2">llms.txt Generator</h2>
        <p className="text-slate-400 text-sm mb-6">
          Create an AI-readable metadata file for your e-commerce store. This helps ChatGPT, Claude,
          and other AI agents understand your store's offerings.
        </p>

        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-300 mb-1">Brand Name *</label>
              <input
                type="text"
                name="brandName"
                value={formData.brandName}
                onChange={handleChange}
                placeholder="Acme Store"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1">Domain *</label>
              <input
                type="text"
                name="domain"
                value={formData.domain}
                onChange={handleChange}
                placeholder="https://acme.com"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-1">Store Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Premium outdoor gear for adventurers worldwide..."
              rows={2}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-1">Product Categories (comma-separated)</label>
            <input
              type="text"
              name="categories"
              value={formData.categories}
              onChange={handleChange}
              placeholder="Tents, Sleeping Bags, Backpacks, Footwear"
              className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-300 mb-1">Shipping Policy</label>
              <input
                type="text"
                name="shippingPolicy"
                value={formData.shippingPolicy}
                onChange={handleChange}
                placeholder="Free shipping on orders over $50"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1">Return Policy</label>
              <input
                type="text"
                name="returnPolicy"
                value={formData.returnPolicy}
                onChange={handleChange}
                placeholder="30-day hassle-free returns"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-300 mb-1">Payment Methods (comma-separated)</label>
              <input
                type="text"
                name="paymentMethods"
                value={formData.paymentMethods}
                onChange={handleChange}
                placeholder="Visa, Mastercard, PayPal, Apple Pay"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1">Price Range</label>
              <input
                type="text"
                name="priceRange"
                value={formData.priceRange}
                onChange={handleChange}
                placeholder="$25 - $500"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-1">Support Email</label>
            <input
              type="email"
              name="supportEmail"
              value={formData.supportEmail}
              onChange={handleChange}
              placeholder="support@acme.com"
              className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <button
            onClick={generateLlmsTxt}
            disabled={!formData.brandName || !formData.domain || !formData.description}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Generate llms.txt
          </button>
        </div>
      </div>

      {/* Output */}
      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Generated Output</h2>
          {generated && (
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm transition"
            >
              {copied ? 'Copied!' : 'Copy to Clipboard'}
            </button>
          )}
        </div>

        {generated ? (
          <pre className="bg-slate-900 rounded-lg p-4 text-sm text-slate-300 overflow-auto max-h-[600px] whitespace-pre-wrap">
            {generated}
          </pre>
        ) : (
          <div className="bg-slate-900 rounded-lg p-8 text-center text-slate-500">
            <p>Fill in the form and click "Generate" to create your llms.txt file</p>
            <p className="text-xs mt-2">
              Place this file at <code className="text-emerald-400">yourstore.com/llms.txt</code>
            </p>
          </div>
        )}

        {generated && (
          <div className="mt-4 p-4 bg-emerald-900/30 border border-emerald-700 rounded-lg">
            <p className="text-sm text-emerald-300">
              <strong>Next step:</strong> Save this as <code>llms.txt</code> in your store's root directory.
              Want automatic generation for 10,000+ products?{' '}
              <a href="https://www.deeplumen.com" className="underline hover:text-emerald-200">
                Install DeepLumen
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
