import { useEffect, useState } from 'react'

export function useLS<T>(key: string, init: T) {
  const [v, setV] = useState<T>(() => {
    try { const s = localStorage.getItem(key); return s ? (JSON.parse(s) as T) : init } catch { return init }
  })
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(v)) } catch { /* storage unavailable */ } }, [key, v])
  return [v, setV] as const
}

export async function askAI(messages: { role: string; text: string }[], context: { profile?: string; profession?: string }) {
  const r = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ messages, context }),
  })
  if (!r.ok) throw new Error('api')
  const d = await r.json()
  if (!d.text) throw new Error('empty')
  return d.text as string
}
