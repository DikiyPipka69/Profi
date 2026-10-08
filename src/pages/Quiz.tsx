import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { KINDS, QUIZ, type Kind } from '../data/quiz'
import type { Ctx } from '../App'

export default function Quiz({ a }: { a: Ctx }) {
  const [i, setI] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const q = QUIZ[i]

  function pick(k: number) {
    const next = [...answers, k]
    if (i + 1 < QUIZ.length) { setAnswers(next); setI(i + 1); return }
    const counts: Record<Kind, number> = { creator: 0, explorer: 0, connector: 0, builder: 0 }
    next.forEach((x) => counts[KINDS[x]]++)
    const top = KINDS.reduce((m, k2) => (counts[k2] > counts[m] ? k2 : m), KINDS[0])
    a.setResult({ counts, top })
    a.go('result')
  }

  return (
    <section className="mx-auto flex min-h-dvh max-w-xl flex-col justify-center px-6 py-10">
      <div className="mb-8 flex items-center gap-4">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
          <motion.div className="h-full rounded-full bg-gradient-to-r from-violet to-cyan" animate={{ width: `${((i + 1) / QUIZ.length) * 100}%` }} />
        </div>
        <span className="text-sm text-white/60">{i + 1} / {QUIZ.length}</span>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={i} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }}>
          <h2 className="text-2xl font-semibold sm:text-3xl">{q.q}</h2>
          <div className="mt-8 space-y-3">
            {q.o.map((t, k) => (
              <button key={t} onClick={() => pick(k)} className="glass glass-hover w-full rounded-3xl px-5 py-4 text-left">{t}</button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
      {i > 0 && (
        <button onClick={() => { setI(i - 1); setAnswers(answers.slice(0, -1)) }} className="mt-8 self-start text-sm text-white/50 hover:text-white">Назад</button>
      )}
    </section>
  )
}
