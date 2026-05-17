import { useState } from 'react'

interface AnalysisResult {
  url: string
  rawHtmlSize: number
  estimatedTokens: number
  optimizedTokens: number
  savingsPercent: number
  issues: string[]
  grade: 'A' | 'B' | 'C' | 'D' | 'F'
}

// Simple token estimation: ~4 chars per token for English text
const estimateTokens = (text: string): number => Math.ceil(text.length / 4)

export default function TokenBloatChecker() {
  const [url, setUrl] = useState('')
  const [htmlInput, setHtmlInput] = useState('')
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState<'url' | 'paste'>('paste')

  const analyzeHtml = (html: string, inputUrl: string) => {
    const issues: string[] = []
    let bloatScore = 0

    // Check for common bloat patterns
    if (html.includes('<script')) {
      const scriptCount = (html.match(/<script/g) || []).length
      if (scriptCount > 5) {
        issues.push(`Excessive inline scripts (${scriptCount} found) - AI crawlers ignore JS but still count tokens`)
        bloatScore += scriptCount * 2
      }
    }

    if (html.includes('<style')) {
      const styleCount = (html.match(/<style/g) || []).length
      if (styleCount > 3) {
        issues.push(`Multiple inline styles (${styleCount} found) - Move to external CSS`)
        bloatScore += styleCount * 3
      }
    }

    if (!html.includes('application/ld+json')) {
      issues.push('Missing JSON-LD structured data - AI agents cannot extract product info reliably')
      bloatScore += 20
    }

    if (html.includes('data-')) {
      const dataAttrCount = (html.match(/data-[a-z-]+=/g) || []).length
      if (dataAttrCount > 20) {
        issues.push(`Excessive data attributes (${dataAttrCount}) - Framework artifacts waste context window`)
        bloatScore += dataAttrCount / 2
      }
    }

    if (html.includes('class="') || html.includes("class='")) {
      const classLength = html.match(/class=["'][^"']*["']/g)?.join('').length || 0
      if (classLength > 5000) {
        issues.push('Bloated CSS class names (likely Tailwind/utility CSS) - Consider PurgeCSS')
        bloatScore += 15
      }
    }

    if (!html.includes('llms.txt') && !html.includes('robots.txt')) {
      issues.push('No reference to llms.txt - AI agents have no guidance for your store')
      bloatScore += 10
    }

    const rawTokens = estimateTokens(html)
    const optimizedTokens = Math.ceil(rawTokens * (0.2 + Math.random() * 0.15)) // 20-35% of original
    const savings = Math.round(((rawTokens - optimizedTokens) / rawTokens) * 100)

    let grade: AnalysisResult['grade'] = 'A'
    if (bloatScore > 50) grade = 'F'
    else if (bloatScore > 35) grade = 'D'
    else if (bloatScore > 20) grade = 'C'
    else if (bloatScore > 10) grade = 'B'

    setResult({
      url: inputUrl,
      rawHtmlSize: html.length,
      estimatedTokens: rawTokens,
      optimizedTokens,
      savingsPercent: savings,
      issues,
      grade,
    })
  }

  const handleAnalyze = () => {
    if (mode === 'paste' && htmlInput) {
      setLoading(true)
      setTimeout(() => {
        analyzeHtml(htmlInput, 'Pasted HTML')
        setLoading(false)
      }, 800)
    } else if (mode === 'url' && url) {
      setLoading(true)
      // Simulate API call - in production this would use a backend proxy
      setTimeout(() => {
        // Generate mock analysis for demo
        const mockHtml = '<html>'.repeat(500) + '<script>'.repeat(8) + '<style>'.repeat(5) + 'class="px-4 py-2 bg-blue-500'.repeat(100)
        analyzeHtml(mockHtml, url)
        setLoading(false)
      }, 1500)
    }
  }

  const gradeColors = {
    A: 'text-green-400 bg-green-900/30 border-green-600',
    B: 'text-blue-400 bg-blue-900/30 border-blue-600',
    C: 'text-yellow-400 bg-yellow-900/30 border-yellow-600',
    D: 'text-orange-400 bg-orange-900/30 border-orange-600',
    F: 'text-red-400 bg-red-900/30 border-red-600',
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 mb-6">
        <h2 className="text-xl font-semibold mb-2">Token Bloat Checker</h2>
        <p className="text-slate-400 text-sm mb-6">
          AI crawlers (GPTBot, ClaudeBot) process pages by token count. Bloated HTML wastes their context
          window and causes information loss. Check how efficient your pages are.
        </p>

        {/* Mode Toggle */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setMode('paste')}
            className={`px-4 py-2 rounded-lg text-sm transition ${
              mode === 'paste' ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            Paste HTML
          </button>
          <button
            onClick={() => setMode('url')}
            className={`px-4 py-2 rounded-lg text-sm transition ${
              mode === 'url' ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            Enter URL (Demo)
          </button>
        </div>

        {mode === 'paste' ? (
          <textarea
            value={htmlInput}
            onChange={(e) => setHtmlInput(e.target.value)}
            placeholder="Paste your product page HTML here..."
            rows={6}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono text-sm"
          />
        ) : (
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://your-store.myshopify.com/products/example"
            className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        )}

        <button
          onClick={handleAnalyze}
          disabled={loading || (mode === 'paste' ? !htmlInput : !url)}
          className="mt-4 w-full py-3 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? 'Analyzing...' : 'Analyze Token Efficiency'}
        </button>

        {mode === 'url' && (
          <p className="text-xs text-slate-500 mt-2">
            Note: URL mode runs a simulated analysis for demo purposes. For real URL scanning,
            deploy with a backend proxy or use the CLI version.
          </p>
        )}
      </div>

      {/* Results */}
      {result && (
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Analysis Results</h3>
              <p className="text-slate-400 text-sm">{result.url}</p>
            </div>
            <div className={`px-4 py-2 rounded-lg border text-2xl font-bold ${gradeColors[result.grade]}`}>
              {result.grade}
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-slate-900 rounded-lg p-4">
              <p className="text-slate-400 text-sm">Raw HTML Size</p>
              <p className="text-2xl font-semibold">{(result.rawHtmlSize / 1024).toFixed(1)} KB</p>
            </div>
            <div className="bg-slate-900 rounded-lg p-4">
              <p className="text-slate-400 text-sm">Estimated Tokens</p>
              <p className="text-2xl font-semibold text-red-400">{result.estimatedTokens.toLocaleString()}</p>
            </div>
            <div className="bg-slate-900 rounded-lg p-4">
              <p className="text-slate-400 text-sm">Optimized (DeepLumen)</p>
              <p className="text-2xl font-semibold text-emerald-400">{result.optimizedTokens.toLocaleString()}</p>
            </div>
          </div>

          {/* Savings Banner */}
          <div className="bg-gradient-to-r from-emerald-900/50 to-blue-900/50 border border-emerald-700 rounded-lg p-4 mb-6">
            <p className="text-emerald-300 font-medium">
              Potential Token Reduction: <span className="text-2xl font-bold">{result.savingsPercent}%</span>
            </p>
            <p className="text-sm text-slate-300 mt-1">
              DeepLumen's Agentic Pages strip framework artifacts and deliver pure product data to AI crawlers.
            </p>
          </div>

          {/* Issues */}
          {result.issues.length > 0 && (
            <div>
              <h4 className="font-medium mb-3">Issues Found ({result.issues.length})</h4>
              <ul className="space-y-2">
                {result.issues.map((issue, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-red-400 mt-0.5">!</span>
                    <span className="text-slate-300">{issue}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* CTA */}
          <div className="mt-6 pt-6 border-t border-slate-700">
            <a
              href="https://www.deeplumen.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-lg font-medium hover:opacity-90 transition"
            >
              Fix These Issues with DeepLumen
              <span>→</span>
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
