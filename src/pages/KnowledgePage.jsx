import PageShell from '@/components/ui/PageShell'
import { BookOpen, ArrowUpRight } from 'lucide-react'

const ARTICLES = [
  { title: 'BIZ IL Architecture Overview',    category: 'Platform',      updated: '2 days ago' },
  { title: 'BIZ IL Pricing & Tiers',          category: 'Platform',      updated: '1 week ago' },
  { title: 'HubSpot Pipeline Stage Map',      category: 'Sales',         updated: '3 days ago' },
  { title: 'Acumatica ERP Evaluation',        category: 'ERP',           updated: '1 week ago' },
  { title: 'J L Smith Engagement Log',        category: 'Client',        updated: 'Today' },
  { title: 'Fishbowl + QuickBooks Rec',       category: 'ERP',           updated: '5 days ago' },
  { title: 'ArcFlow Partner Playbook',        category: 'Partners',      updated: '2 weeks ago' },
  { title: 'Campfire.ai Integration Guide',   category: 'Partners',      updated: '1 week ago' },
  { title: 'NetSuite Replacement Stack',      category: 'ERP',           updated: '2 weeks ago' },
  { title: 'Morning Briefing Skill Spec',     category: 'Skills',        updated: '3 days ago' },
]

const CAT_COLOR = {
  Platform: 'bg-orange/10 text-orange',
  Sales:    'bg-blue-50 text-blue-700',
  ERP:      'bg-violet-50 text-violet-700',
  Client:   'bg-emerald-50 text-emerald-700',
  Partners: 'bg-amber-50 text-amber-700',
  Skills:   'bg-ink-4/15 text-ink-3',
}

export default function KnowledgePage() {
  return (
    <PageShell
      title="Knowledge Base"
      description="BMA methodology, ERP evaluations, and skill documentation"
      icon={BookOpen}
      color="blue"
    >
      <div className="max-w-3xl">
        {/* Search stub */}
        <div className="relative mb-5">
          <input
            placeholder="Search knowledge base..."
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface text-sm focus:outline-none focus:border-orange/50 focus:ring-2 focus:ring-orange/10 transition-all"
          />
        </div>

        {/* Article list */}
        <div className="space-y-2">
          {ARTICLES.map(({ title, category, updated }) => (
            <div key={title} className="card flex items-center gap-3 cursor-pointer hover:shadow-card-lg transition-shadow py-3">
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm text-ink">{title}</div>
                <div className="text-xs text-ink-4 mt-0.5">Updated {updated}</div>
              </div>
              <span className={`stat-pill flex-shrink-0 ${CAT_COLOR[category] ?? 'bg-surface-3 text-ink-3'}`}>{category}</span>
              <ArrowUpRight size={14} className="text-ink-4 flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  )
}
