import { useState } from 'react'
import { Search } from 'lucide-react'
import { CATS, PROFESSIONS } from '../data/professions'
import { match } from '../lib/match'
import type { Ctx } from '../App'

export default function Professions({ a }: { a: Ctx }) {
  const [cat, setCat] = useState<string>('Все')
  const [q, setQ] = useState('')
  const list = PROFESSIONS.filter((p) => (cat === 'Все' || p.cat === cat) && (p.title + p.about).toLowerCase().includes(q.toLowerCase()))
  return (
    <section className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-3xl font-semibold">Профессии</h1>
      <div className="glass mt-6 flex items-center gap-3 rounded-full px-5 py-3">
        <Search size={18} className="text-white/50" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Найти профессию" className="flex-1 bg-transparent outline-none placeholder:text-white/35" />
      </div>
      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
        {['Все', ...CATS].map((c) => (
          <button key={c} onClick={() => setCat(c)} className={`shrink-0 rounded-full px-4 py-2 text-sm ${cat === c ? 'bg-violet' : 'glass text-white/70'}`}>{c}</button>
        ))}
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {list.map((p) => (
          <button key={p.id} onClick={() => a.go('profession', { prof: p.id })} className="glass glass-hover rounded-3xl p-5 text-left">
            <div className="flex items-start justify-between">
              <span className="text-2xl">{p.emoji}</span>
              {a.result && <span className="text-sm text-cyan">{match(a.result, p.w)}%</span>}
            </div>
            <div className="mt-3 font-medium">{p.title}</div>
            <p className="mt-1 line-clamp-2 text-sm text-white/55">{p.about}</p>
          </button>
        ))}
        {list.length === 0 && <p className="text-white/55">Ничего не нашлось. Попробуй другое слово или спроси Профи в чате.</p>}
      </div>
    </section>
  )
}
