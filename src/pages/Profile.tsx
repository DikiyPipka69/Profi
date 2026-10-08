import { KIND_INFO, KINDS } from '../data/quiz'
import { PROFESSIONS } from '../data/professions'
import type { Ctx } from '../App'

export default function Profile({ a }: { a: Ctx }) {
  const favs = PROFESSIONS.filter((p) => a.favs.includes(p.id))
  const asked = a.history.filter((m) => m.role === 'user').slice(-5).reverse()
  return (
    <section className="mx-auto max-w-2xl space-y-4 px-6 py-10">
      <h1 className="text-3xl font-semibold">Профиль</h1>
      <div className="glass rounded-3xl p-5">
        <label className="text-sm text-white/55" htmlFor="name">Как тебя зовут?</label>
        <input id="name" value={a.name} onChange={(e) => a.setName(e.target.value)} placeholder="Имя"
          className="mt-2 w-full rounded-2xl bg-white/5 px-4 py-3 outline-none placeholder:text-white/30" />
      </div>
      <div className="glass rounded-3xl p-5">
        <h2 className="font-medium">Результат теста</h2>
        {a.result ? (
          <>
            <p className="mt-2 text-cyan">{KIND_INFO[a.result.top].name}</p>
            <div className="mt-3 space-y-2">
              {KINDS.map((k) => (
                <div key={k} className="flex items-center gap-3 text-sm">
                  <span className="w-28 text-white/60">{KIND_INFO[k].name}</span>
                  <div className="h-1.5 flex-1 rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-violet to-cyan" style={{ width: `${a.result!.counts[k] * 10}%` }} /></div>
                </div>
              ))}
            </div>
            <button onClick={() => a.go('result')} className="mt-4 text-sm text-cyan">Открыть результат</button>
          </>
        ) : (
          <button onClick={() => a.go('quiz')} className="mt-3 rounded-full bg-violet px-5 py-2 text-sm">Пройти тест</button>
        )}
      </div>
      <div className="glass rounded-3xl p-5">
        <h2 className="font-medium">Избранные профессии</h2>
        {favs.length ? (
          <div className="mt-3 flex flex-wrap gap-2">{favs.map((p) => (
            <button key={p.id} onClick={() => a.go('profession', { prof: p.id })} className="rounded-full bg-white/10 px-4 py-2 text-sm">{p.emoji} {p.title}</button>
          ))}</div>
        ) : <p className="mt-2 text-sm text-white/50">Нажми сердечко на странице профессии, и она появится здесь.</p>}
      </div>
      <div className="glass rounded-3xl p-5">
        <h2 className="font-medium">История вопросов</h2>
        {asked.length ? <ul className="mt-2 space-y-1 text-sm text-white/65">{asked.map((m, i) => <li key={i} className="truncate">• {m.text}</li>)}</ul>
          : <p className="mt-2 text-sm text-white/50">Пока пусто. Начни разговор в чате.</p>}
        {asked.length > 0 && <button onClick={() => a.setHistory([])} className="mt-4 text-sm text-white/50 hover:text-white">Очистить историю</button>}
      </div>
    </section>
  )
}
