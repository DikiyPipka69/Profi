# Профи — AI-помощник по выбору профессии

React + Vite + TS + Tailwind + Framer Motion → Cloudflare Worker → Gemini API.

## Локально
```bash
npm install
cp .dev.vars.example .dev.vars     # впиши GEMINI_API_KEY (Google AI Studio)
npm run dev:worker                 # терминал 1 (порт 8787)
npm run dev                        # терминал 2 (Vite проксирует /api на 8787)
```
Для `dev:worker` нужна собранная папка dist (`npm run build`) или временно создай пустую `dist`.

## Деплой на Cloudflare (бесплатно)
```bash
npx wrangler login
npx wrangler secret put GEMINI_API_KEY
npm run deploy
```
Ключ хранится только в секретах Worker, во frontend его нет.
