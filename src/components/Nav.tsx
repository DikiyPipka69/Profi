import { Compass, Home, MessageCircle, User } from 'lucide-react'
import { motion } from 'framer-motion'
import Orb from './Orb'
import type { Page } from '../App'

const ITEMS: { page: Page; label: string; Icon: typeof Home; group: Page[] }[] = [
  { page: 'home', label: 'Главная', Icon: Home, group: ['home', 'quiz', 'result'] },
  { page: 'chat', label: 'Чат', Icon: MessageCircle, group: ['chat'] },
  { page: 'professions', label: 'Профессии', Icon: Compass, group: ['professions', 'profession'] },
  { page: 'profile', label: 'Профиль', Icon: User, group: ['profile'] },
]

export default function Nav({ page, go }: { page: Page; go: (p: Page) => void }) {
  return (
    <>
      {/* десктоп: компактная вертикальная панель */}
      <nav className="glass fixed left-4 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-3 rounded-[2rem] px-2.5 py-4 md:flex" aria-label="Навигация">
        <button onClick={() => go('home')} aria-label="Профи" className="mb-1"><Orb size={34} /></button>
        <div className="h-px w-6 bg-white/10" />
        {ITEMS.map(({ page: p, label, Icon, group }) => {
          const on = group.includes(page)
          return (
            <button key={p} title={label} aria-label={label} onClick={() => go(p)}
              className={`grid h-12 w-12 place-items-center rounded-full ring-1 transition duration-200 ${on
                ? 'bg-gradient-to-br from-violet to-[#3b2fb5] text-white shadow-[0_0_28px_rgba(108,92,231,.7)] ring-white/25'
                : 'bg-white/5 text-white/60 ring-white/10 hover:bg-white/10 hover:text-cyan hover:ring-cyan/40'}`}>
              <Icon size={20} />
            </button>
          )
        })}
      </nav>

      {/* мобильные: плавающая нижняя панель */}
      <nav className="glass fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-30 flex justify-around rounded-[1.75rem] p-1.5 md:hidden" aria-label="Навигация">
        {ITEMS.map(({ page: p, label, Icon, group }) => {
          const on = group.includes(page)
          return (
            <button key={p} onClick={() => go(p)} className={`relative flex flex-1 flex-col items-center gap-1 rounded-2xl py-2 text-[11px] transition-colors ${on ? 'text-white' : 'text-white/55'}`}>
              {on && <motion.span layoutId="mnav" className="absolute inset-0 rounded-2xl bg-violet/70 shadow-[0_0_24px_rgba(108,92,231,.6)]" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
              <Icon size={20} className="relative" /><span className="relative">{label}</span>
            </button>
          )
        })}
      </nav>
    </>
  )
}
