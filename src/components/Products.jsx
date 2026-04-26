import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

const products = [
  {
    name: 'Basic',
    price: '$9.99',
    desc: 'Perfect starting point. Boost FPS and clean your system in minutes.',
    features: [
      'FPS Maximizer',
      'Basic TCP Tweaks',
      'System Junk Cleaner',
      'Startup Optimizer',
      'Email Support',
    ],
    cta: 'Get Basic',
    featured: false,
    badge: null,
  },
  {
    name: 'Pro',
    price: '$19.99',
    desc: 'The ultimate gaming edge. Advanced tuning for serious competitors.',
    features: [
      'Everything in Basic',
      'Advanced CPU Scheduling',
      'GPU Priority Boost',
      'Network Latency Engine',
      'Input Precision Mode',
      'USB Polling Optimizer',
      'Priority Support',
    ],
    cta: 'Get Pro',
    featured: true,
    badge: 'MOST POPULAR',
  },
  {
    name: 'Premium',
    price: '$39.99',
    desc: 'Maximum performance. Custom kernel tuning + lifetime access.',
    features: [
      'Everything in Pro',
      'Custom Registry Deep Dive',
      'Real-Time Monitoring',
      'Per-Game Profiles',
      'Boot Speed Optimizer',
      'Lifetime Updates',
      'VIP 1-on-1 Support',
    ],
    cta: 'Get Premium',
    featured: false,
    badge: 'BEST VALUE',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13 } },
}

const card = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
}

function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="shrink-0 mt-0.5">
      <circle cx="6.5" cy="6.5" r="6.5" fill="rgba(255,255,255,0.08)" />
      <path d="M3.5 6.5l2 2 4-4" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Products() {
  return (
    <section id="products" className="relative py-32 px-4">
      {/* Subtle section separator */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24
                      bg-gradient-to-b from-transparent to-white/15 pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <p className="text-white/25 font-space text-xs tracking-widest uppercase mb-3">
            Choose Your Weapon
          </p>
          <h2 className="font-orbitron font-black text-4xl md:text-5xl text-white glow-text">
            Tweak Packages
          </h2>
          <p className="mt-4 text-white/35 font-space max-w-lg mx-auto">
            One-time payment. Instant delivery. No subscriptions.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-5 items-stretch"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {products.map(p => (
            <motion.div
              key={p.name}
              variants={card}
              whileHover={p.featured
                ? { y: -6, boxShadow: '0 24px 60px rgba(255,255,255,0.08), 0 0 0 1px rgba(255,255,255,0.2)' }
                : { y: -4, boxShadow: '0 20px 50px rgba(255,255,255,0.04), 0 0 0 1px rgba(255,255,255,0.12)' }
              }
              transition={{ type: 'spring', stiffness: 220, damping: 32 }}
              className="relative flex flex-col rounded-2xl overflow-hidden cursor-pointer"
              style={{
                background: p.featured
                  ? 'linear-gradient(160deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)'
                  : 'rgba(255,255,255,0.025)',
                border: p.featured
                  ? '1px solid rgba(255,255,255,0.20)'
                  : '1px solid rgba(255,255,255,0.07)',
                backdropFilter: 'blur(20px)',
              }}
            >
              {/* Featured top line */}
              {p.featured && (
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
              )}

              {/* Badge */}
              {p.badge && (
                <div className={`absolute top-5 right-5 text-xs font-orbitron font-bold px-3 py-1 rounded-full ${
                  p.featured
                    ? 'bg-white text-black'
                    : 'bg-white/8 text-white/45 border border-white/12'
                }`}>
                  {p.badge}
                </div>
              )}

              <div className="flex flex-col h-full p-7">
                {/* Plan name */}
                <div className="font-orbitron text-xs tracking-widest text-white/30 uppercase mb-3">
                  {p.name} Tweaker
                </div>

                {/* Price */}
                <div className={`font-orbitron font-black text-5xl mb-5 ${p.featured ? 'glow-text' : ''}`}>
                  {p.price}
                </div>

                {/* Description */}
                <p className="text-white/38 font-space text-sm leading-relaxed mb-6">
                  {p.desc}
                </p>

                <div className="h-px bg-white/7 mb-6" />

                {/* Features */}
                <ul className="space-y-3 flex-1">
                  {p.features.map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-white/55 font-space text-sm">
                      <CheckIcon />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA button */}
                <motion.button
                  className={`mt-8 w-full py-3.5 rounded-xl font-bold font-space tracking-widest
                    text-xs uppercase relative overflow-hidden transition-all duration-400 ${
                    p.featured
                      ? 'bg-white text-black shadow-[0_0_24px_rgba(255,255,255,0.2)]'
                      : 'glass border border-white/12 text-white/70 hover:text-white hover:border-white/25'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  <span className="relative z-10">{p.cta}</span>
                  {/* Subtle shine on featured */}
                  {p.featured && (
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-black/6 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.8, ease: 'easeInOut' }}
                    />
                  )}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust line */}
        <motion.p
          className="text-center text-white/20 font-space text-xs mt-10 tracking-wide"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          ✓ Instant download &nbsp;·&nbsp; ✓ Fully reversible &nbsp;·&nbsp; ✓ No ban risk &nbsp;·&nbsp; ✓ 30-day guarantee
        </motion.p>
      </div>
    </section>
  )
}
