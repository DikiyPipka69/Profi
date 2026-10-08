import { PROFESSIONS } from '../data/professions'
import { KINDS } from '../data/quiz'
import type { QuizResult } from '../App'

// Визуальная оценка совпадения, а не научный диагноз
export function match(r: QuizResult, w: [number, number, number, number]) {
  const total = KINDS.reduce((s, k) => s + r.counts[k], 0) || 1
  const score = KINDS.reduce((s, k, i) => s + (r.counts[k] / total) * w[i], 0)
  return Math.min(98, Math.round(55 + score * 55))
}
export const ranked = (r: QuizResult) =>
  PROFESSIONS.map((p) => ({ p, pct: match(r, p.w) })).sort((x, y) => y.pct - x.pct)
