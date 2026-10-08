import { useId, type CSSProperties } from 'react'
import { motion } from 'framer-motion'

// Стеклянная сфера: аура → корпус → цветные потоки → ленты → блик → вращающийся обод
export default function Orb({ size = 160, active = false }: { size?: number; active?: boolean }) {
  const id = useId().replace(/:/g, '')
  const k = active ? 0.5 : 1 // во время работы ИИ всё движется быстрее
  const mirror = { repeat: Infinity, repeatType: 'mirror' as const, ease: 'easeInOut' as const }
  const th = Math.max(2, size * 0.014)

  const blob = (style: CSSProperties, x: string[], y: string[], d: number) => (
    <motion.div className="absolute rounded-full" style={{ ...style, filter: `blur(${size * 0.08}px)`, mixBlendMode: 'screen' }}
      animate={{ x, y }} transition={{ duration: d * k, ...mirror }} />
  )

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }} aria-hidden>
      {/* внешняя аура */}
      <motion.div className="absolute rounded-full"
        style={{ inset: '-55%', background: 'radial-gradient(circle, rgba(108,92,231,.5) 0%, rgba(0,210,255,.16) 36%, transparent 64%)', filter: `blur(${size * 0.1}px)` }}
        animate={{ scale: active ? [1, 1.14, 1] : [1, 1.06, 1], opacity: active ? [0.85, 1, 0.85] : [0.6, 0.85, 0.6] }}
        transition={{ duration: active ? 1.4 : 6, repeat: Infinity, ease: 'easeInOut' }} />
      {/* внутреннее кольцо свечения */}
      <motion.div className="absolute rounded-full"
        style={{ inset: '-10%', background: 'radial-gradient(circle, transparent 58%, rgba(0,210,255,.4) 70%, transparent 80%)', filter: `blur(${size * 0.035}px)` }}
        animate={{ scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 5 * k, repeat: Infinity, ease: 'easeInOut' }} />

      {/* корпус сферы */}
      <motion.div className="absolute inset-0 overflow-hidden rounded-full"
        style={{
          background: 'radial-gradient(circle at 50% 38%, #2447c9 0%, #16288a 48%, #0a1152 100%)',
          boxShadow: `0 0 ${size * 0.3}px rgba(0,210,255,.3), inset 0 0 ${size * 0.14}px rgba(0,210,255,.55), inset 0 ${-size * 0.1}px ${size * 0.2}px rgba(108,92,231,.55)`,
        }}
        animate={{ scale: active ? [1, 1.06, 1] : [1, 1.02, 1] }} transition={{ duration: active ? 1.1 : 6, repeat: Infinity, ease: 'easeInOut' }}>
        {blob({ left: '-15%', top: '40%', width: '75%', height: '70%', background: 'radial-gradient(circle, rgba(108,92,231,.95), transparent 68%)' }, ['0%', '28%'], ['0%', '-22%'], 7)}
        {blob({ right: '-20%', top: '-10%', width: '70%', height: '65%', background: 'radial-gradient(circle, rgba(0,210,255,.75), transparent 68%)' }, ['0%', '-25%'], ['0%', '30%'], 9)}
        {blob({ left: '30%', top: '55%', width: '45%', height: '45%', background: 'radial-gradient(circle, rgba(255,150,130,.55), transparent 68%)' }, ['-20%', '25%'], ['0%', '-15%'], 8)}
        <motion.svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full"
          style={{ filter: `blur(${Math.max(0.4, size * 0.004)}px)` }}
          animate={{ rotate: 360 }} transition={{ duration: 60 * k, repeat: Infinity, ease: 'linear' }}>
          <defs>
            <linearGradient id={`r${id}`} x1="0" x2="1">
              <stop offset="0" stopColor="#6C5CE7" stopOpacity="0" />
              <stop offset=".5" stopColor="#c4b8ff" />
              <stop offset="1" stopColor="#00D2FF" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M8 68 C28 38 52 84 92 34" fill="none" stroke={`url(#r${id})`} strokeWidth="1.6" strokeLinecap="round" />
          <path d="M18 24 C40 58 62 18 88 62" fill="none" stroke={`url(#r${id})`} strokeWidth="1.1" strokeLinecap="round" opacity=".7" />
        </motion.svg>
        {/* блик */}
        <div className="absolute rounded-full" style={{ left: '14%', top: '6%', width: '55%', height: '30%', background: 'radial-gradient(ellipse, rgba(255,255,255,.38), transparent 70%)', filter: `blur(${size * 0.03}px)`, transform: 'rotate(-18deg)' }} />
      </motion.div>

      {/* светящийся обод, медленно вращается */}
      <motion.div className="absolute inset-0 rounded-full"
        style={{
          background: 'conic-gradient(from 0deg, rgba(0,210,255,0), rgba(0,210,255,.95), rgba(255,255,255,.95), rgba(108,92,231,.85), rgba(0,210,255,0) 75%)',
          WebkitMask: `radial-gradient(farthest-side, transparent calc(100% - ${th}px), #000 calc(100% - ${th - 1}px))`,
          mask: `radial-gradient(farthest-side, transparent calc(100% - ${th}px), #000 calc(100% - ${th - 1}px))`,
        }}
        animate={{ rotate: 360 }} transition={{ duration: 20 * k, repeat: Infinity, ease: 'linear' }} />
    </div>
  )
}
