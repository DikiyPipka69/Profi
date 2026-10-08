import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Nav from './components/Nav'
import Home from './pages/Home'
import Chat from './pages/Chat'
import Quiz from './pages/Quiz'
import Result from './pages/Result'
import Professions from './pages/Professions'
import ProfessionPage from './pages/ProfessionPage'
import Profile from './pages/Profile'
import { useLS } from './lib/store'
import type { Kind } from './data/quiz'

export type Page = 'home' | 'chat' | 'quiz' | 'result' | 'professions' | 'profession' | 'profile'
export interface Msg { role: 'user' | 'model'; text: string }
export interface QuizResult { counts: Record<Kind, number>; top: Kind }
export interface Ctx {
  go: (p: Page, o?: { prof?: string; seed?: string }) => void
  prof?: string; seed?: string
  name: string; setName: (s: string) => void
  result: QuizResult | null; setResult: (r: QuizResult | null) => void
  favs: string[]; toggleFav: (id: string) => void
  history: Msg[]; setHistory: (m: Msg[]) => void
}

export default function App() {
  const [page, setPage] = useState<Page>('home')
  const [prof, setProf] = useState<string>()
  const [seed, setSeed] = useState<string>()
  const [name, setName] = useLS('profi.name', '')
  const [result, setResult] = useLS<QuizResult | null>('profi.result', null)
  const [favs, setFavs] = useLS<string[]>('profi.favs', [])
  const [history, setHistory] = useLS<Msg[]>('profi.history', [])

  const a: Ctx = {
    go: (p, o) => { setPage(p); setProf(o?.prof); setSeed(o?.seed); window.scrollTo(0, 0) },
    prof, seed, name, setName, result, setResult, favs, history, setHistory,
    toggleFav: (id) => setFavs(favs.includes(id) ? favs.filter((x) => x !== id) : [...favs, id]),
  }

  const view = { home: <Home a={a} />, chat: <Chat a={a} />, quiz: <Quiz a={a} />, result: <Result a={a} />,
    professions: <Professions a={a} />, profession: <ProfessionPage a={a} />, profile: <Profile a={a} /> }[page]

  return (
    <div className="bg-space min-h-dvh">
      <Nav page={page} go={(p) => a.go(p)} />
      <main className="pb-20 md:pb-0 md:pl-24">
        <AnimatePresence mode="wait">
          <motion.div key={page} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            {view}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
