import { Compass, Home, MessageCircle, User } from 'lucide-react'
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
      <nav className="glass fixed left-4 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-2 rounded-3xl p-2 md:flex" aria-label="Навигация">
        {ITEMS.map(({ page: p, label, Icon, group }) => (
          <button key={p} title={label} aria-label={label} onClick={() => go(p)}
            className={`grid h-12 w-12 place-items-center rounded-2xl transition ${group.includes(page) ? 'bg-violet/80 shadow-[0_0_24px_rgba(108,92,231,.6)]' : 'text-white/60 hover:bg-white/10 hover:text-white'}`}>
            <Icon size={20} />
          </button>
        ))}
      </nav>
      <nav className="glass fixed inset-x-0 bottom-0 z-30 flex justify-around px-2 pb-[env(safe-area-inset-bottom)] pt-2 md:hidden" aria-label="Навигация">
        {ITEMS.map(({ page: p, label, Icon, group }) => (
          <button key={p} onClick={() => go(p)} className={`flex w-20 flex-col items-center gap-1 rounded-xl py-1 text-[11px] ${group.includes(page) ? 'text-cyan' : 'text-white/55'}`}>
            <Icon size={20} />{label}
          </button>
        ))}
      </nav>
    </>
  )
}
