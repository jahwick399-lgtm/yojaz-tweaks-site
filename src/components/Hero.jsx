import { useEffect } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import StarField from './StarField'

const STATS = [
  { label: 'Max FPS', value: '380+' },
  { label: 'Input Delay', value: '2ms' },
  { label: 'Frame Rate', value: '99%' },
  { label: 'Users', value: '50K+' },
]

/* Premium easing — ease-out expo feel */
const EASE = [0.16, 1, 0.3, 1]

export default function Hero() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  /* High damping = no wobble, just smooth settling */
  const smoothX = useSpring(mouseX, { stiffness: 28, damping: 28 })
  const smoothY = useSpring(mouseY, { stiffness: 28, damping: 28 })

  /* Gentle parallax — reduced intensity */
  const kbX = useTransform(smoothX, [-0.5, 0.5], [-10, 10])
  const kbY = useTransform(smoothY, [-0.5, 0.5], [-5, 5])
  const msX = useTransform(smoothX, [-0.5, 0.5], [8, -8])
  const msY = useTransform(smoothY, [-0.5, 0.5], [-4, 4])

  useEffect(() => {
    const onMove = e => {
      mouseX.set((e.clientX / window.innerWidth)  - 0.5)
      mouseY.set((e.clientY / window.innerHeight) - 0.5)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [mouseX, mouseY])

  const titleWords = ['YOJAZ', 'TWEAKER']

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      <StarField />

      {/* Subtle ambient glow */}
      <div className="absolute inset-0 hero-gradient pointer-events-none" style={{ zIndex: 1 }} />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          zIndex: 1,
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.025) 0%, transparent 60%)',
        }}
      />

      {/* Floating Keyboard */}
      <motion.div
        className="absolute left-[8%] top-[36%] animate-float"
        style={{ x: kbX, y: kbY, zIndex: 2 }}
      >
        <div className="w-44 h-28 glass rounded-xl p-2.5 opacity-25">
          <div className="grid grid-cols-12 gap-0.5 mb-0.5">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className={`h-2.5 bg-white/25 rounded-sm ${i === 0 ? 'col-span-2' : ''}`} />
            ))}
          </div>
          {[10, 10, 11].map((cols, row) => (
            <div key={row} className="grid gap-0.5 mb-0.5" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
              {Array.from({ length: cols }).map((_, i) => (
                <div key={i} className="h-2.5 bg-white/20 rounded-sm" />
              ))}
            </div>
          ))}
          <div className="flex gap-0.5">
            <div className="h-2.5 bg-white/15 rounded-sm w-8" />
            <div className="h-2.5 bg-white/15 rounded-sm flex-1" />
            <div className="h-2.5 bg-white/15 rounded-sm w-8" />
          </div>
        </div>
        <div className="mt-2 text-white/15 text-xs font-space text-center tracking-widest">KEYBOARD</div>
      </motion.div>

      {/* Floating Mouse */}
      <motion.div
        className="absolute right-[9%] top-[33%] animate-float-slow"
        style={{ x: msX, y: msY, zIndex: 2 }}
      >
        <div className="w-14 h-20 glass rounded-full relative flex flex-col items-center pt-2 opacity-25">
          <div className="w-px h-7 bg-white/35 rounded" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-10 flex">
            <div className="flex-1 border-r border-white/15 rounded-tl-full" />
            <div className="flex-1 rounded-tr-full" />
          </div>
          <div className="absolute bottom-3 w-2 h-4 bg-white/15 rounded-full" />
        </div>
        <div className="mt-2 text-white/15 text-xs font-space text-center tracking-widest">MOUSE</div>
      </motion.div>

      {/* Main content */}
      <div className="relative text-center px-4 max-w-5xl mx-auto" style={{ zIndex: 3 }}>

        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          className="mb-7 inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full
                     border border-white/10 text-white/40 text-xs font-space tracking-widest uppercase"
        >
          <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-ping-slow inline-block" />
          Trusted by 50,000+ Gamers
        </motion.div>

        {/* Title — words reveal upward, no blur */}
        <div className="overflow-hidden">
          {titleWords.map((word, wi) => (
            <div key={word} className="overflow-hidden">
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{
                  duration: 1.1,
                  delay: 0.35 + wi * 0.16,
                  ease: EASE,
                }}
                className={`block font-orbitron font-black leading-none tracking-tight ${
                  wi === 0
                    ? 'text-[clamp(4rem,11vw,8.5rem)]'
                    : 'text-[clamp(3rem,8.5vw,6.5rem)]'
                }`}
              >
                {wi === 0 ? (
                  <span
                    className="glitch text-white"
                    style={{ textShadow: '0 0 36px rgba(255,255,255,0.35), 0 0 100px rgba(255,255,255,0.08)' }}
                  >
                    {word}
                  </span>
                ) : (
                  <span className="text-white/28 animate-glow-pulse">{word}</span>
                )}
              </motion.div>
            </div>
          ))}
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.85, ease: EASE }}
          className="mt-7 text-lg md:text-xl text-white/35 font-space font-light tracking-widest max-w-md mx-auto uppercase"
        >
          Unlock Maximum Performance
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 1.05, ease: EASE }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          {/* Primary CTA */}
          <motion.a
            href="#products"
            className="relative group bg-white text-black font-bold font-space
                       px-10 py-4 rounded-full text-sm tracking-widest uppercase overflow-hidden
                       shadow-[0_0_32px_rgba(255,255,255,0.18)]"
            whileHover={{
              scale: 1.03,
              boxShadow: '0 0 50px rgba(255,255,255,0.32)',
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          >
            <span className="relative z-10">Get Tweaked</span>
            {/* Subtle shimmer on hover */}
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-black/8 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
            />
          </motion.a>

          {/* Secondary CTA */}
          <motion.a
            href="#performance"
            className="glass px-8 py-4 rounded-full text-white/45 hover:text-white/80 font-space
                       text-sm tracking-widest uppercase border border-white/10 hover:border-white/20
                       transition-all duration-500"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          >
            See Benchmarks
          </motion.a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 1.35, ease: EASE }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 max-w-xl mx-auto"
        >
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.5 + i * 0.1 }}
            >
              <div className="font-orbitron font-black text-2xl md:text-3xl text-white glow-text">
                {s.value}
              </div>
              <div className="text-white/28 font-space text-xs tracking-widest uppercase mt-1.5">
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        style={{ zIndex: 3 }}
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2.5"
        >
          <div className="text-white/20 font-space text-xs tracking-widest uppercase">Scroll</div>
          <div className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  )
}
