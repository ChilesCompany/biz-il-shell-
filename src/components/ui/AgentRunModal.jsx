import { useState, useRef, useEffect } from 'react'
import { X, Bot, Loader2, CheckCircle, AlertCircle } from 'lucide-react'

const SKILL_PROMPTS = {
  'morning-briefing':     'Run the morning briefing skill. Summarize my calendar, emails, pipeline health, and agent status for today.',
  'pipeline-dashboard':   'Run the pipeline dashboard skill. Give me a full summary of all open deals, pipeline value, stage distribution, and top 3 actions.',
  'email-summary':        'Run the email summary skill. Summarize my most recent emails across both accounts and flag anything urgent.',
  'hubspot-notion-sync':  'Run the hubspot-notion-sync skill. Sync all open deals from HubSpot to Notion and report what was updated.',
  'pre-meeting-intel':    'Run the pre-meeting-intel skill. What meetings do I have coming up and what do I need to know?',
  'katana-mrp':           'Run the katana-mrp skill. Give me a summary of open manufacturing orders, inventory status, and any alerts.',
  'enrich':               'Run the enrich skill. Tell me what prospect enrichment capabilities are available and how to use them.',
  'sow-drafter':          'Run the sow-drafter skill. What information do you need to draft a Statement of Work?',
  'meeting-debrief':      'Run the meeting-debrief skill. Walk me through how to log a meeting debrief.',
  'weekly-review':        'Run the weekly-review skill. Give me the full weekly pipeline review with deal velocity and top recommendations.',
}

export default function AgentRunModal({ agent, onClose }) {
  const [status, setStatus]   = useState('idle') // idle | running | done | error
  const [output, setOutput]   = useState('')
  const outputRef             = useRef(null)

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [output])

  async function runAgent() {
    setStatus('running')
    setOutput('')

    const prompt = SKILL_PROMPTS[agent.name] ?? `Run the ${agent.name} skill and report results.`

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: 'You are Commander BIZ, the AI operations layer for Biltmore Management Advisors. You are running a requested skill. Be concise, structured, and actionable. Use markdown formatting.',
          messages: [{ role: 'user', content: prompt }],
        }),
      })

      const data = await res.json()

      if (data.error) throw new Error(data.error.message)

      const text = data.content?.find(b => b.type === 'text')?.text ?? 'No output returned.'
      setOutput(text)
      setStatus('done')
    } catch (err) {
      setOutput('Error: ' + err.message)
      setStatus('error')
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-2xl shadow-card-lg border border-border w-full max-w-lg">

        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
          <div className="w-8 h-8 rounded-lg bg-orange/10 flex items-center justify-center">
            <Bot size={16} className="text-orange" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-ink text-sm">{agent.name}</div>
            <div className="text-xs text-ink-3">{agent.category}</div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-surface-3 text-ink-3 transition-colors">
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5">
          {status === 'idle' && (
            <div className="text-center py-6">
              <div className="text-sm text-ink-2 mb-4">
                Run <code className="font-mono text-xs bg-surface-3 px-1.5 py-0.5 rounded">{agent.name}</code> via Commander BIZ?
              </div>
              <button
                onClick={runAgent}
                className="px-6 py-2.5 bg-orange text-white text-sm font-semibold rounded-lg hover:bg-orange-dark transition-colors shadow-orange"
              >
                Run Agent
              </button>
            </div>
          )}

          {status === 'running' && (
            <div className="flex flex-col items-center py-6 gap-3">
              <Loader2 size={24} className="text-orange animate-spin" />
              <div className="text-sm text-ink-3">Running {agent.name}...</div>
            </div>
          )}

          {(status === 'done' || status === 'error') && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                {status === 'done'
                  ? <CheckCircle size={14} className="text-emerald-500" />
                  : <AlertCircle size={14} className="text-red-500" />
                }
                <span className={`text-xs font-semibold ${status === 'done' ? 'text-emerald-600' : 'text-red-600'}`}>
                  {status === 'done' ? 'Completed' : 'Failed'}
                </span>
              </div>
              <div
                ref={outputRef}
                className="bg-surface-2 border border-border rounded-xl p-4 text-xs text-ink-2 leading-relaxed whitespace-pre-wrap max-h-64 overflow-y-auto font-mono"
              >
                {output}
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={runAgent}
                  className="flex-1 py-2 border border-border text-xs font-medium text-ink-2 hover:border-orange/40 hover:text-orange rounded-lg transition-all"
                >
                  Run Again
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-2 bg-navy text-white text-xs font-semibold rounded-lg hover:bg-navy-mid transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
