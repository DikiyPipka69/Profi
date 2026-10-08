import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Compass, MessageCircle, Puzzle, SendHorizontal } from 'lucide-react'
import Orb from '../components/Orb'
import type { Ctx } from '../App'

const ACTIONS = [
  { Icon: Puzzle, label: 'Пройти тест', hint: '10 вопросов · 3 минуты', to: 'quiz' as const },
  { Icon: MessageCircle, label: 'Поговорить со мной', hint: 'Обсудим, что тебе интересно', to: 'chat' as const },
  { Icon: Compass, label: 'Посмотреть профессии', hint: '16 направлений', to: 'professions' as const },
]
const rise = (i: number) => ({ initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.2 + i * 0.08, duration: 0.5, ease: 'easeOut' as const } })

export default function Home({ a }: { a: Ctx }) {
  const [w, setW] = useState(window.innerWidth)
  const [text, setText] = useState('')
  useEffect(() => { const f = () => setW(window.innerWidth); window.addEventListener('resize', f); return () => window.removeEventListener('resize', f) }, [])
  const submit = () => { const t = text.trim(); t ? a.go('chat', { seed: t }) : a.go('chat') }

  return (
    <section className="mx-auto flex min-h-dvh max-w-5xl items-center px-4 py-8 sm:px-8">
      <div className="relative w-full overflow-hidden rounded-[2rem] border border-white/10 px-5 py-10 text-center sm:rounded-[2.5rem] sm:px-12 sm:py-14"
        style={{
          background: 'radial-gradient(80% 55% at 50% 0%, rgba(108,92,231,.24), transparent 70%), radial-gradient(60% 40% at 50% 100%, rgba(0,210,255,.10), transparent 70%), linear-gradient(180deg, rgba(255,255,255,.045), rgba(255,255,255,.01))',
          boxShadow: 'inset 0 0 120px rgba(0,210,255,.05), 0 30px 80px rgba(0,0,0,.35)',
        }}>
        <motion.div className="flex justify-center" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: 'easeOut' }}>
          <Orb size={w < 640 ? 150 : 210} />
        </motion.div>

        <motion.h1 {...rise(0)} className="mt-12 text-3xl font-semibold tracking-tight sm:mt-16 sm:text-5xl">
          <span className="bg-gradient-to-r from-[#8fa2ff] via-white to-cyan bg-clip-text text-transparent">
            Привет{a.name ? `, ${a.name}` : ''}! Я Профи
          </span>{' '}<span>👋</span>
        </motion.h1>
        <motion.p {...rise(1)} className="mx-auto mt-3 max-w-md text-base text-white/65 sm:text-lg">
          Помогу тебе разобраться, какие профессии могут тебе подойти.
        </motion.p>

        <motion.div {...rise(2)} className="glass mx-auto mt-8 flex max-w-xl items-center gap-2 rounded-full py-2 pl-5 pr-2 shadow-[0_8px_40px_rgba(108,92,231,.25)]">
          <input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && submit()}
            placeholder="Расскажи, что тебе нравится…" className="min-w-0 flex-1 bg-transparent py-2 outline-none placeholder:text-white/35" />
          <button onClick={submit} aria-label="Начать разговор" className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-violet to-cyan text-space"><SendHorizontal size={18} /></button>
        </motion.div>

        <div className="mt-8 grid gap-3 text-left sm:grid-cols-3 sm:gap-4">
          {ACTIONS.map(({ Icon, label, hint, to }, i) => (
            <motion.button key={to} {...rise(3 + i)} onClick={() => a.go(to)}
              className="glass glass-hover group relative flex items-center gap-4 rounded-3xl p-4 sm:flex-col sm:items-start sm:gap-5 sm:p-6">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-violet/80 to-cyan/60 shadow-[0_0_24px_rgba(108,92,231,.5)] ring-1 ring-white/20"><Icon size={22} /></span>
              <span className="min-w-0 flex-1">
                <span className="block font-medium">{label}</span>
                <span className="mt-1 block text-sm text-white/50">{hint}</span>
              </span>
              <ArrowRight size={18} className="shrink-0 text-white/30 transition group-hover:translate-x-1 group-hover:text-cyan sm:absolute sm:right-5 sm:top-6" />
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}
