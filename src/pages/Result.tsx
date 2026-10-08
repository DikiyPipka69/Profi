import { motion } from 'framer-motion'
import Orb from '../components/Orb'
import { KIND_INFO } from '../data/quiz'
import { ranked } from '../lib/match'
import type { Ctx } from '../App'

export default function Result({ a }: { a: Ctx }) {
  const r = a.result
  if (!r) return (
    <section className="grid min-h-dvh place-items-center px-6 text-center">
      <div><p className="text-white/70">Тест ещё не пройден.</p>
        <button onClick={() => a.go('quiz')} className="mt-5 rounded-full bg-violet px-6 py-3">Пройти тест</button></div>
    </section>
  )
  const info = KIND_INFO[r.top]
  const top = ranked(r).slice(0, 3)
  return (
    <section className="mx-auto flex min-h-dvh max-w-xl flex-col items-center justify-center px-6 py-10 text-center">
      <Orb size={110} />
      <p className="mt-10 text-white/60">Твой профиль</p>
      <h1 className="mt-1 text-4xl font-semibold">{info.name}</h1>
      <p className="mt-3 max-w-md text-white/70">{info.text}</p>
      <p className="mt-8 text-sm text-white/45">Проценты показывают, насколько направление близко твоим ответам. Это ориентир, а не диагноз.</p>
      <div className="mt-4 w-full space-y-3">
        {top.map(({ p, pct }, i) => (
          <button key={p.id} onClick={() => a.go('profession', { prof: p.id })} className="glass glass-hover w-full rounded-3xl p-4 text-left">
            <div className="flex justify-between"><span>{p.emoji} {p.title}</span><span className="text-cyan">{pct}%</span></div>
            <div className="mt-3 h-1.5 rounded-full bg-white/10">
              <motion.div className="h-full rounded-full bg-gradient-to-r from-violet to-cyan" initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ delay: 0.2 + i * 0.15, duration: 0.8 }} />
            </div>
          </button>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button onClick={() => a.go('chat', { seed: `Мой профиль по тесту — ${info.name}. Давай разберёмся, что это значит и что мне попробовать.` })} className="rounded-full bg-violet px-6 py-3 shadow-[0_0_30px_rgba(108,92,231,.5)]">Обсудить с Профи</button>
        <button onClick={() => a.go('professions')} className="glass rounded-full px-6 py-3">Все профессии</button>
      </div>
    </section>
  )
}
