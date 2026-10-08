import { motion } from 'framer-motion'

export default function Orb({ size = 160, active = false }: { size?: number; active?: boolean }) {
  return (
    <div className="relative grid place-items-center shrink-0" style={{ width: size, height: size }} aria-hidden>
      <motion.div
        className="absolute rounded-full blur-3xl"
        style={{ inset: '-35%', background: 'radial-gradient(circle, rgba(108,92,231,.55), rgba(0,210,255,.18) 55%, transparent 70%)' }}
        animate={{ scale: active ? [1, 1.2, 1] : [1, 1.06, 1], opacity: active ? [0.85, 1, 0.85] : [0.55, 0.8, 0.55] }}
        transition={{ duration: active ? 1.2 : 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="relative h-full w-full rounded-full"
        style={{
          background: 'radial-gradient(circle at 32% 28%, #fff 0%, #a6ecff 12%, #00D2FF 30%, #6C5CE7 62%, #1a1560 100%)',
          boxShadow: '0 0 60px rgba(108,92,231,.6), inset 0 0 40px rgba(255,255,255,.22)',
        }}
        animate={{ scale: active ? [1, 1.07, 1] : [1, 1.03, 1] }}
        transition={{ duration: active ? 1 : 6, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}
