import { useState } from 'react'
import LlmsTxtGenerator from './tools/llms-txt-generator/LlmsTxtGenerator'
import TokenBloatChecker from './tools/token-bloat-checker/TokenBloatChecker'
import SchemaChecker from './tools/schema-checker/SchemaChecker'

type Tool = 'llms-txt' | 'token-bloat' | 'schema'

export default function App() {
  const [activeTool, setActiveTool] = useState<Tool>('llms-txt')

  const tools = [
    { id: 'llms-txt' as Tool, name: 'llms.txt Generator', desc: 'Generate AI-ready metadata' },
    { id: 'token-bloat' as Tool, name: 'Token Bloat Checker', desc: 'Analyze page efficiency' },
    { id: 'schema' as Tool, name: 'Schema.org Checker', desc: 'Validate structured data' },
  ]

  return (
    <div className="min-h-screen text-white">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                Agentic Commerce Toolkit
              </h1>
              <p className="text-slate-400 text-sm mt-1">
                Open-source tools for the AI-first e-commerce era
              </p>
            </div>
            <a
              href="https://www.deeplumen.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-lg text-sm font-medium hover:opacity-90 transition"
            >
              Get DeepLumen App
            </a>
          </div>
        </div>
      </header>

      {/* Tool Tabs */}
      <nav className="border-b border-slate-700 bg-slate-800/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-1">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.id)}
                className={`px-4 py-3 text-sm font-medium transition border-b-2 -mb-px ${
                  activeTool === tool.id
                    ? 'border-emerald-400 text-emerald-400'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                {tool.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Tool Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {activeTool === 'llms-txt' && <LlmsTxtGenerator />}
        {activeTool === 'token-bloat' && <TokenBloatChecker />}
        {activeTool === 'schema' && <SchemaChecker />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-900/50 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-slate-400 text-sm">
              Built by{' '}
              <a href="https://www.deeplumen.com" className="text-emerald-400 hover:underline">
                DeepLumen
              </a>{' '}
              | Pioneering Agentic Commerce & OCP Protocol
            </div>
            <div className="flex gap-6 text-sm">
              <a href="https://www.deeplumen.com" className="text-slate-400 hover:text-white">
                Website
              </a>
              <a
                href="https://github.com/DeepLumenClaw/agentic-commerce-toolkit"
                className="text-slate-400 hover:text-white"
              >
                GitHub
              </a>
              <a href="https://www.deeplumen.com/docs" className="text-slate-400 hover:text-white">
                Documentation
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
