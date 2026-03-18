# BIZ IL Shell

**Business Intelligence Layer** — React portal for Biltmore Management Advisors.

Built on: React 18 + Vite + Tailwind CSS + Supabase + React Router

## Stack
- **Frontend:** React 18, Vite, Tailwind CSS, React Router v6
- **Data:** Supabase (PostgreSQL + Edge Functions)
- **Brand:** BMA orange `#E05C2A`, navy `#1A1A2E`, Bebas Neue / DM Sans
- **Icons:** Lucide React

## Setup

```bash
npm install
cp .env.example .env.local
# Fill in VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
npm run dev
```

## Pages

| Route | Page | Status |
|---|---|---|
| `/dashboard` | Command Center | ✅ Built |
| `/pipeline` | Pipeline Kanban | ✅ Built |
| `/briefing` | Daily Briefing | ✅ Built |
| `/clients` | Client Health | ✅ Built |
| `/deals` | Deal Table | ✅ Built |
| `/proposals` | Proposal Tracker | ✅ Built |
| `/meetings` | Meeting Calendar | ✅ Built |
| `/katana` | Katana MRP | ✅ Built |
| `/agents` | Agent Registry | ✅ Built |
| `/knowledge` | Knowledge Base | ✅ Built |
| `/settings` | Platform Settings | ✅ Built |

## Environment Variables

```
VITE_SUPABASE_URL=https://gjfwpwjbwgamtwtjqlbx.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_CLAUDE_API_PROXY_URL=https://gjfwpwjbwgamtwtjqlbx.supabase.co/functions/v1/claude-proxy
```
