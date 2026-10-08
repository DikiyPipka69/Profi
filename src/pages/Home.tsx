import { motion } from 'framer-motion'
import Orb from '../components/Orb'
import type { Ctx } from '../App'

const ACTIONS = [
  { emoji: '🧩', label: 'Пройти тест', hint: '10 вопросов, 3 минуты', to: 'quiz' as const },
  { emoji: '💬', label: 'Поговорить со мной', hint: 'Обсудим, что тебе интересно', to: 'chat' as const },
  { emoji: '🧭', label: 'Посмотреть профессии', hint: '16 направлений', to: 'professions' as const },
]

export default function Home({ a }: { a: Ctx }) {
  return (
    <section className="mx-auto flex min-h-dvh max-w-3xl flex-col items-center justify-center px-6 py-12 text-center">
      <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: 'easeOut' }}>
        <Orb size={190} />
      </motion.div>
      <h1 className="mt-14 text-3xl font-semibold tracking-tight sm:text-4xl">
        Привет{a.name ? `, ${a.name}` : ''}! Я Профи 👋
      </h1>
      <p className="mt-3 max-w-md text-lg text-white/65">Помогу тебе разобраться, какие профессии могут тебе подойти.</p>
      <div className="mt-10 grid w-full gap-3 sm:grid-cols-3">
        {ACTIONS.map((x) => (
          <button key={x.to} onClick={() => a.go(x.to)} className="glass glass-hover rounded-3xl p-5 text-left">
            <div className="text-2xl">{x.emoji}</div>
            <div className="mt-3 font-medium">{x.label}</div>
            <div className="mt-1 text-sm text-white/50">{x.hint}</div>
          </button>
        ))}
      </div>
    </section>
  )
}
