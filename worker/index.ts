interface Env { GEMINI_API_KEY: string; GEMINI_MODEL?: string; ASSETS: Fetcher }

const SYSTEM = `Ты — «Профи», дружелюбный и спокойный AI-компаньон, который помогает подростку (12–18 лет) разобраться в интересах и профессиях.
Правила:
- Говори по-русски, просто и тепло, на «ты», без канцелярита. Коротко: 2–5 предложений.
- Не говори «тебе нужно стать X». Предлагай варианты, объясняй простыми словами, помогай самому разобраться.
- Задавай ОДИН уточняющий вопрос за раз: что именно нравится в занятии, что нет, что хочется попробовать.
- Не давай категоричных прогнозов о будущем, зарплатах и поступлении. Если не уверен — так и скажи.
- Не пиши markdown (без **, #, списков со звёздочками). Простой текст.
- Если тема не про интересы, учёбу и профессии — мягко вернись к ней. При тяжёлых переживаниях посоветуй поговорить с близким взрослым или школьным психологом.
- В самом конце ответа можешь добавить варианты быстрых ответов в формате: [[вариант 1 | вариант 2 | вариант 3]] (до 4 коротких вариантов).`

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json' } })

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url)
    if (url.pathname !== '/api/chat') return env.ASSETS.fetch(req)
    if (req.method !== 'POST') return json({ error: 'method_not_allowed' }, 405)
    try {
      const { messages, context } = (await req.json()) as any
      if (!Array.isArray(messages) || !messages.length) return json({ error: 'bad_request' }, 400)

      let system = SYSTEM
      if (context?.profile) system += `\n\nПрофиль пользователя по тесту: «${context.profile}». Это ориентир, а не диагноз.`
      if (context?.profession) system += `\n\nСейчас обсуждается профессия: ${context.profession}. Объясни, что в ней интересного и сложного, и помоги понять, подходит ли она.`

      const contents = messages.slice(-20).map((m: any) => ({
        role: m.role === 'model' ? 'model' : 'user',
        parts: [{ text: String(m.text).slice(0, 2000) }],
      }))

      const r = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${env.GEMINI_MODEL || 'gemini-3.8-flash'}:generateContent`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json', 'x-goog-api-key': env.GEMINI_API_KEY },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: system }] },
            contents,
            generationConfig: { temperature: 0.8, maxOutputTokens: 1500 },
          }),
        },
      )
      if (!r.ok) {
        console.error('Gemini error', r.status, await r.text())
        return json({ error: 'upstream' }, 502)
      }
      const d: any = await r.json()
      const text = d.candidates?.[0]?.content?.parts?.map((p: any) => p.text ?? '').join('') ?? ''
      return json({ text })
    } catch {
      return json({ error: 'server' }, 500)
    }
  },
}
