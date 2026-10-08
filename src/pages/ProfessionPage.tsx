import type { ReactNode } from 'react'
import { ArrowLeft, Heart } from 'lucide-react'
import { PROFESSIONS } from '../data/professions'
import type { Ctx } from '../App'

const Block = ({ title, children }: { title: string; children: ReactNode }) => (
  <div className="glass rounded-3xl p-5"><h3 className="mb-2 font-medium">{title}</h3>{children}</div>
)

export default function ProfessionPage({ a }: { a: Ctx }) {
  const p = PROFESSIONS.find((x) => x.id === a.prof)
  if (!p) return (
    <section className="grid min-h-dvh place-items-center px-6 text-center">
      <button onClick={() => a.go('professions')} className="rounded-full bg-violet px-6 py-3">К списку профессий</button>
    </section>
  )
  const fav = a.favs.includes(p.id)
  return (
    <section className="mx-auto max-w-2xl px-6 py-8">
      <button onClick={() => a.go('professions')} className="mb-6 flex items-center gap-2 text-sm text-white/55 hover:text-white"><ArrowLeft size={16} /> Все профессии</button>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-4xl">{p.emoji}</div>
          <h1 className="mt-3 text-3xl font-semibold">{p.title}</h1>
          <p className="mt-2 text-white/65">{p.cat}</p>
        </div>
        <button onClick={() => a.toggleFav(p.id)} aria-label={fav ? 'Убрать из избранного' : 'В избранное'} className="glass grid h-12 w-12 place-items-center rounded-full">
          <Heart size={20} className={fav ? 'fill-cyan text-cyan' : 'text-white/60'} />
        </button>
      </div>
      <div className="mt-6 space-y-3">
        <Block title="Чем занимается"><p className="text-white/70">{p.about}</p></Block>
        <Block title="Какие навыки нужны"><ul className="space-y-1 text-white/70">{p.skills.map((s) => <li key={s}>• {s}</li>)}</ul></Block>
        <Block title="Почему может подойти"><p className="text-white/70">{p.why}</p></Block>
        <Block title="Что попробовать уже сейчас"><ul className="space-y-1 text-white/70">{p.tryNow.map((s) => <li key={s}>• {s}</li>)}</ul></Block>
      </div>
      <button onClick={() => a.go('chat', { prof: p.id, seed: `Расскажи мне про профессию «${p.title}» и помоги понять, подойдёт ли она мне.` })}
        className="mt-6 w-full rounded-full bg-violet py-4 font-medium shadow-[0_0_30px_rgba(108,92,231,.5)]">Спросить AI об этой профессии</button>
    </section>
  )
}
