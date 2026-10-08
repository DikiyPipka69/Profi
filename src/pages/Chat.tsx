import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Mic, SendHorizontal } from 'lucide-react'
import Orb from '../components/Orb'
import { askAI } from '../lib/store'
import { PROFESSIONS } from '../data/professions'
import { KIND_INFO } from '../data/quiz'
import type { Ctx, Msg } from '../App'

const parse = (t: string) => {
  const m = t.match(/\[\[([\s\S]+?)\]\]\s*$/)
  return { text: t.replace(/\[\[[\s\S]+?\]\]\s*$/, '').trim(), quick: m ? m[1].split('|').map((s) => s.trim()).filter(Boolean).slice(0, 4) : [] }
}
const START = ['Люблю рисовать и придумывать', 'Нравится техника и программы', 'Люблю общаться с людьми', 'Пока не знаю, что мне нравится']

export default function Chat({ a }: { a: Ctx }) {
  const [text, setText] = useState('')
  const [busy, setBusy] = useState(false)
  const [listening, setListening] = useState(false)
  const end = useRef<HTMLDivElement>(null)
  const seeded = useRef(false)
  const prof = PROFESSIONS.find((p) => p.id === a.prof)

  useEffect(() => { end.current?.scrollIntoView({ behavior: 'smooth' }) }, [a.history, busy])
  useEffect(() => {
    if (a.seed && !seeded.current) { seeded.current = true; send(a.seed) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function send(t: string) {
    t = t.trim()
    if (!t || busy) return
    const next: Msg[] = [...a.history, { role: 'user', text: t }]
    a.setHistory(next); setText(''); setBusy(true)
    try {
      const reply = await askAI(next, {
        profile: a.result ? KIND_INFO[a.result.top].name : undefined,
        profession: prof ? `${prof.title}. ${prof.about}` : undefined,
      })
      a.setHistory([...next, { role: 'model', text: reply }])
    } catch {
      a.setHistory([...next, { role: 'model', text: 'Не получилось связаться с ИИ. Проверь интернет и попробуй отправить сообщение ещё раз.' }])
    } finally { setBusy(false) }
  }

  function listen() {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SR) return alert('Голосовой ввод не поддерживается в этом браузере. Попробуй Chrome или Safari.')
    const r = new SR(); r.lang = 'ru-RU'
    r.onresult = (e: any) => setText(e.results[0][0].transcript)
    r.onend = () => setListening(false)
    setListening(true); r.start()
  }

  const last = a.history[a.history.length - 1]
  const quick = !busy && last?.role === 'model' ? parse(last.text).quick : a.history.length === 0 ? START : []

  return (
    <section className="mx-auto flex h-[calc(100dvh-4.5rem)] max-w-2xl flex-col px-4 md:h-dvh">
      <header className="flex items-center gap-4 py-4">
        <Orb size={44} active={busy} />
        <div>
          <div className="font-medium">Профи</div>
          <div className="text-sm text-white/50">{prof ? `Говорим про: ${prof.title}` : busy ? 'Думаю…' : 'Расскажи, что тебе интересно'}</div>
        </div>
      </header>

      <div className="flex-1 space-y-3 overflow-y-auto py-2">
        {a.history.length === 0 && (
          <div className="mt-10 flex flex-col items-center text-center">
            <Orb size={110} />
            <p className="mt-10 max-w-sm text-white/70">Привет! Расскажи, чем ты любишь заниматься в свободное время. Это поможет мне понять, что тебе близко.</p>
          </div>
        )}
        {a.history.map((m, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`flex ${m.role === 'user' ? 'justify-end' : ''}`}>
            <div className={`max-w-[85%] whitespace-pre-wrap rounded-3xl px-4 py-3 leading-relaxed ${m.role === 'user' ? 'bg-violet/85' : 'glass'}`}>
              {m.role === 'model' ? parse(m.text).text : m.text}
            </div>
          </motion.div>
        ))}
        {busy && (
          <div className="glass flex w-16 gap-1.5 rounded-3xl px-4 py-4">
            {[0, 1, 2].map((i) => (
              <motion.span key={i} className="h-2 w-2 rounded-full bg-cyan" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }} />
            ))}
          </div>
        )}
        <div ref={end} />
      </div>

      <div className="pb-4 pt-2">
        {quick.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {quick.map((q) => (
              <button key={q} onClick={() => send(q)} className="glass glass-hover rounded-full px-4 py-2 text-sm">{q}</button>
            ))}
          </div>
        )}
        <div className="glass flex items-center gap-2 rounded-full py-2 pl-5 pr-2 shadow-[0_8px_40px_rgba(108,92,231,.25)]">
          <input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send(text)}
            placeholder="Напиши сообщение..." className="min-w-0 flex-1 bg-transparent py-2 outline-none placeholder:text-white/35" />
          <button onClick={listen} aria-label="Голосовой ввод" className={`grid h-10 w-10 place-items-center rounded-full ${listening ? 'bg-cyan text-space' : 'text-white/60 hover:bg-white/10'}`}><Mic size={18} /></button>
          <button onClick={() => send(text)} disabled={!text.trim() || busy} aria-label="Отправить" className="grid h-10 w-10 place-items-center rounded-full bg-violet disabled:opacity-40"><SendHorizontal size={18} /></button>
        </div>
      </div>
    </section>
  )
}
