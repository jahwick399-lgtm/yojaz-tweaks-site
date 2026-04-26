import { motion } from 'framer-motion'
import { PAYHIP_URLS, CTA_LABELS } from '../config/payhip'

const EASE = [0.16, 1, 0.3, 1]

const PRODUCTS = [
  {
    key: 'pingOptimizer',
    icon: '🎮',
    name: 'Ping Optimizer',
    tagline: 'Sub-20ms connection',
    desc: 'Eliminate packet jitter and network spikes. Built for ranked play where every millisecond counts.',
    badge: null,
    cta: CTA_LABELS.primary,
  },
  {
    key: 'zeroDelayEngine',
    icon: '⚡',
    name: 'Zero Delay Engine',
    tagline: '1ms input latency',
    desc: 'Surgically removes every layer of Windows input delay. Feel the difference on the very first click.',
    badge: 'NEW',
    cta: CTA_LABELS.primary,
  },
  {
    key: 'fpsBooster',
    icon: '🚀',
    name: 'FPS Booster',
    tagline: 'Up to +160% FPS',
    desc: 'Unlocks raw frame power by targeting CPU scheduling, HAGS, MPO, and background CPU drain.',
    badge: 'POPULAR',
    cta: CTA_LABELS.primary,
  },
  {
    key: 'aimTweaker',
    icon: '🎯',
    name: 'Aim Tweaker',
    tagline: 'Bloom-free precision',
    desc: 'Removes mouse acceleration, tunes raw input sensitivity, and eliminates in-game bloom mechanics.',
    badge: null,
    cta: CTA_LABELS.primary,
  },
  {
    key: 'shotgunTweaker',
    icon: '🔫',
    name: 'Shotgun Tweaker',
    tagline: 'Pellet spread control',
    desc: 'Precision spread optimization for shotgun mechanics across all major game engines. Hit more pellets.',
    badge: null,
    cta: CTA_LABELS.primary,
  },
  {
    key: 'utilityBundle',
    icon: '🧠',
    name: 'Utility Tools Bundle',
    tagline: '6 tools — 1 price',
    desc: 'The complete toolkit. Cleaner, DNS switcher, monitor, startup optimizer, and more, all in one.',
    badge: 'BUNDLE',
    cta: CTA_LABELS.bundle,
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
}

function BadgePill({ label }) {
  const styles = {
    NEW:     'bg-white/10 text-white/70 border-white/15',
    POPULAR: 'bg-white text-black border-transparent',
    BUNDLE:  'bg-white/10 text-white/60 border-white/12',
  }
  return (
    <span className={`text-[10px] font-orbitron font-bold px-2.5 py-1 rounded-full border tracking-widest ${styles[label] ?? styles.NEW}`}>
      {label}
    </span>
  )
}

function ProductCard({ product }) {
  const url = PAYHIP_URLS[product.key] || '#'
  const isFeatured = product.badge === 'POPULAR'

  return (
    <motion.div
      variants={cardVariant}
      whileHover={{
        y: -6,
        boxShadow: isFeatured
          ? '0 24px 60px rgba(255,255,255,0.08), 0 0 0 1px rgba(255,255,255,0.22)'
          : '0 20px 50px rgba(255,255,255,0.04), 0 0 0 1px rgba(255,255,255,0.13)',
      }}
      transition={{ type: 'spring', stiffness: 220, damping: 32 }}
      className="relative flex flex-col rounded-2xl overflow-hidden"
      style={{
        background: isFeatured
          ? 'linear-gradient(155deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)'
          : 'rgba(255,255,255,0.025)',
        border: isFeatured ? '1px solid rgba(255,255,255,0.18)' : '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(20px)',
      }}
    >
      {/* Top glow line for featured */}
      {isFeatured && (
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
      )}

      <div className="flex flex-col h-full p-6">
        {/* Header row */}
        <div className="flex items-start justify-between mb-5">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0
                       border border-white/8 transition-all duration-400"
            style={{ background: 'rgba(255,255,255,0.04)' }}
          >
            {product.icon}
          </div>
          {product.badge && <BadgePill label={product.badge} />}
        </div>

        {/* Name */}
        <h3 className="font-orbitron font-bold text-base text-white/90 mb-1 tracking-wide">
          {product.name}
        </h3>

        {/* Tagline */}
        <p className="font-space text-xs text-white/35 tracking-widest uppercase mb-4">
          {product.tagline}
        </p>

        {/* Description */}
        <p className="font-space text-sm text-white/45 leading-relaxed flex-1 mb-7">
          {product.desc}
        </p>

        {/* CTA */}
        <motion.a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block text-center py-3 rounded-xl overflow-hidden
                     font-space font-bold text-xs tracking-widest uppercase
                     border border-white/12 text-white/60
                     transition-colors duration-300 hover:text-black"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 280, damping: 30 }}
        >
          {/* Fill animation */}
          <motion.span
            className="absolute inset-0 bg-white rounded-xl"
            initial={{ scaleX: 0, originX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
          <span className="relative z-10 flex items-center justify-center gap-1.5">
            {product.cta}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="opacity-60 group-hover:opacity-100 transition-opacity">
              <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </motion.a>
      </div>
    </motion.div>
  )
}

export default function ProductCategories() {
  return (
    <section id="products" className="relative py-32 px-4">
      {/* Top separator */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24
                      bg-gradient-to-b from-transparent to-white/15 pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <p className="text-white/25 font-space text-xs tracking-widest uppercase mb-3">
            Performance Arsenal
          </p>
          <h2 className="font-orbitron font-black text-4xl md:text-5xl text-white glow-text">
            Choose Your Edge
          </h2>
          <p className="mt-4 text-white/35 font-space max-w-lg mx-auto">
            Surgical tools built for competitive gamers. Each one targets a specific layer of performance loss.
          </p>
        </motion.div>

        {/* Product grid */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
        >
          {PRODUCTS.map(p => <ProductCard key={p.key} product={p} />)}
        </motion.div>

        {/* Config note — visible only in dev, guides the user */}
        <motion.p
          className="text-center text-white/18 font-space text-xs mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          ✓ Instant delivery · ✓ Fully reversible · ✓ No ban risk · ✓ Links in <code className="text-white/30">src/config/payhip.js</code>
        </motion.p>
      </div>
    </section>
  )
}
