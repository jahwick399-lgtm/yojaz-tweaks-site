import { motion } from 'framer-motion'
import { PAYHIP_URLS } from '../config/payhip'

const EASE = [0.16, 1, 0.3, 1]

/* ── All products ──────────────────────────────────────────── */
const PC_PRODUCTS = [
  {
    key: 'proTweaker',
    name: 'YoJaz Pro Tweaker',
    price: '$9.99',
    badge: 'MOST POPULAR',
    desc: 'Advanced CPU, GPU, and network tuning for competitive dominance. Boosts FPS up to +150%.',
    features: ['Advanced CPU scheduler priority', 'GPU HAGS + MPO optimization', '1ms timer resolution'],
    cta: 'Get Pro Tweaker',
  },
  {
    key: 'premiumTweaker',
    name: 'YoJaz Premium Tweaker',
    price: '$14.99',
    badge: 'BEST VALUE',
    desc: 'Full system deep-dive with custom kernel tweaks, real-time monitoring, and lifetime updates.',
    features: ['Custom kernel registry tuning', 'Real-time performance monitor', 'Lifetime updates + VIP support'],
    cta: 'Get Premium Tweaker',
  },
  {
    key: 'pingOptimizer',
    name: 'YoJaz Ping Optimizer',
    price: '$6.99',
    badge: null,
    desc: 'Eliminates packet jitter and stabilizes your connection for consistent sub-20ms ping.',
    features: ['TCP/IP stack deep optimization', 'DNS latency reduction', 'Packet jitter elimination'],
    cta: 'Get Ping Optimizer',
  },
  {
    key: 'zeroDelayEngine',
    name: 'Zero Delay Engine',
    price: '$6.99',
    badge: 'NEW',
    desc: 'Surgically removes every layer of Windows input delay. Feel the difference first click.',
    features: ['Raw input pipeline boost', 'USB polling rate maximizer', 'Windows HID delay removal'],
    cta: 'Get Zero Delay',
  },
]

const AIM_PRODUCTS = [
  {
    key: 'bloomReducer',
    name: 'Bloom Reducer',
    price: '$6.99',
    badge: null,
    desc: 'Removes in-game bloom mechanics for precise, predictable shot placement every time.',
    features: ['In-game bloom elimination', 'Precise shot consistency', 'Works on all major FPS titles'],
    cta: 'Get Bloom Reducer',
  },
  {
    key: 'shotgunTweaker',
    name: 'Shotgun Tweaker',
    price: '$6.99',
    badge: 'POPULAR',
    desc: 'Maximum pellet spread optimization for shotgun mechanics. Hit more, win more.',
    features: ['Pellet spread pattern control', 'Hit registration improvement', 'Cross-engine compatibility'],
    cta: 'Get Shotgun Tweaker',
  },
]

const CONSOLE_PRODUCTS = [
  {
    key: 'ps4Tweaks',
    name: 'PS4 Tweaks',
    platform: 'PlayStation 4',
    price: '$4.99',
    badge: null,
    desc: 'Stability and performance optimization for PS4. Faster loads, smoother gameplay.',
    features: ['Load time acceleration', 'Frame stability boost', 'Network latency optimization'],
    cta: 'Download Pack',
  },
  {
    key: 'ps5Tweaks',
    name: 'PS5 Tweaks',
    platform: 'PlayStation 5',
    price: '$4.99',
    badge: 'MOST POPULAR',
    desc: 'Extract hidden PS5 performance. Lower input lag, stable frame delivery, faster SSD.',
    features: ['Input lag reduction mode', 'SSD response optimization', 'VRR + 120Hz tuning'],
    cta: 'Download Pack',
  },
  {
    key: 'xboxOldGen',
    name: 'Xbox Old Gen Tweaks',
    platform: 'Xbox One / One X',
    price: '$4.99',
    badge: null,
    desc: 'Squeeze every frame out of Xbox One hardware. Background killer, network optimizer.',
    features: ['Background process terminator', 'Network stack optimization', 'Frame rate stabilizer'],
    cta: 'Download Pack',
  },
  {
    key: 'xboxNewGen',
    name: 'Xbox New Gen Tweaks',
    platform: 'Xbox Series X/S',
    price: '$4.99',
    badge: 'NEW',
    desc: 'Series X/S precision tuning. Game Mode settings, VRR optimization, latency reduction.',
    features: ['Game Mode deep configuration', 'VRR + FPS boost', 'Low-latency network profile'],
    cta: 'Download Pack',
  },
]

const KBM_PRODUCT = {
  key: 'kbmSens',
  name: 'YoJaz KBM Sens + Binds',
  price: '$4.99',
  badge: 'EXCLUSIVE',
  desc: 'Professionally calibrated keyboard and mouse sensitivity settings with optimized key bindings. Built by YoJaz — refined over thousands of hours of competitive gameplay.',
  features: [
    'Precision sensitivity calibration',
    'Optimized competitive key binds',
    'Mouse acceleration removal guide',
    'Cross-game sensitivity converter',
    'Works with all major FPS titles',
    'Instant digital download',
  ],
  highlights: [
    { label: 'Sensitivity Profiles', value: '12+' },
    { label: 'Games Covered',        value: '8+'  },
    { label: 'Bind Configs',         value: '6+'  },
  ],
  cta: 'Get KBM Sens + Binds',
}

/* ── Micro-components ──────────────────────────────────────── */
function Badge({ label, isConsole = false }) {
  const styles = {
    'MOST POPULAR': isConsole
      ? 'bg-sky-400/14 text-sky-200/80 border-sky-300/20'
      : 'bg-white text-black border-transparent shadow-[0_0_14px_rgba(255,255,255,0.35)]',
    'BEST VALUE': 'bg-white/10 text-white/70 border-white/15',
    'NEW':        'bg-white/8  text-white/55 border-white/12',
    'POPULAR':    'bg-white/8  text-white/55 border-white/12',
    'EXCLUSIVE':  'bg-white text-black border-transparent shadow-[0_0_18px_rgba(255,255,255,0.40)]',
  }
  return (
    <span className={`shrink-0 text-[9px] font-orbitron font-bold px-2.5 py-1 rounded-full border tracking-widest ${styles[label] ?? styles.NEW}`}>
      {label}
    </span>
  )
}

function CheckItem({ text, isConsole = false }) {
  return (
    <li className="flex items-start gap-2.5 font-space text-xs text-white/50">
      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" className="shrink-0 mt-0.5">
        <circle cx="5.5" cy="5.5" r="5.5" fill={isConsole ? 'rgba(130,185,255,0.1)' : 'rgba(255,255,255,0.08)'} />
        <path d="M3 5.5l2 2 3-3"
          stroke={isConsole ? 'rgba(160,210,255,0.65)' : 'rgba(255,255,255,0.55)'}
          strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {text}
    </li>
  )
}

function ArrowSm() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor"
            strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ── Product card ──────────────────────────────────────────── */
function ProductCard({ product, isConsole = false, delay = 0 }) {
  const url        = PAYHIP_URLS[product.key] || '#'
  const isFeatured = ['MOST POPULAR', 'BEST VALUE'].includes(product.badge)

  const t = isConsole ? {
    border:    isFeatured ? 'rgba(130,185,255,0.22)' : 'rgba(130,185,255,0.09)',
    bg:        isFeatured
      ? 'linear-gradient(155deg,rgba(90,140,255,0.07) 0%,rgba(255,255,255,0.02) 100%)'
      : 'rgba(90,140,255,0.025)',
    topLine:   'via-sky-300/40',
    divider:   'rgba(130,185,255,0.08)',
    hover:     isFeatured
      ? '0 28px 70px rgba(90,140,255,0.13),0 0 0 1px rgba(130,185,255,0.28)'
      : '0 22px 55px rgba(90,140,255,0.08),0 0 0 1px rgba(130,185,255,0.17)',
    btnBorder: 'rgba(130,185,255,0.15)',
    btnFill:   'bg-sky-100',
  } : {
    border:    isFeatured ? 'rgba(255,255,255,0.20)' : 'rgba(255,255,255,0.08)',
    bg:        isFeatured
      ? 'linear-gradient(155deg,rgba(255,255,255,0.07) 0%,rgba(255,255,255,0.02) 100%)'
      : 'rgba(255,255,255,0.025)',
    topLine:   'via-white/50',
    divider:   'rgba(255,255,255,0.07)',
    hover:     isFeatured
      ? '0 28px 70px rgba(255,255,255,0.10),0 0 0 1px rgba(255,255,255,0.26)'
      : '0 22px 55px rgba(255,255,255,0.05),0 0 0 1px rgba(255,255,255,0.15)',
    btnBorder: 'rgba(255,255,255,0.13)',
    btnFill:   'bg-white',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      whileHover={{ y: -6, boxShadow: t.hover, transition: { type: 'spring', stiffness: 220, damping: 28 } }}
      className="relative flex flex-col rounded-2xl overflow-hidden h-full"
      style={{ background: t.bg, border: `1px solid ${t.border}`, backdropFilter: 'blur(20px)' }}
    >
      {isFeatured && (
        <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${t.topLine} to-transparent`} />
      )}
      <div className="flex flex-col h-full p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            {product.platform && (
              <span className="block text-[10px] font-space tracking-widest uppercase mb-1"
                    style={{ color: isConsole ? 'rgba(160,210,255,0.4)' : 'rgba(255,255,255,0.28)' }}>
                {product.platform}
              </span>
            )}
            <h3 className="font-orbitron font-bold text-sm text-white/90 leading-snug">{product.name}</h3>
          </div>
          {product.badge && <Badge label={product.badge} isConsole={isConsole} />}
        </div>

        <div className={`font-orbitron font-black text-3xl mb-3 ${isFeatured ? 'glow-text' : 'text-white/80'}`}>
          {product.price}
        </div>

        <p className="font-space text-xs text-white/42 leading-relaxed mb-4">{product.desc}</p>
        <div className="h-px mb-4" style={{ background: t.divider }} />

        <ul className="space-y-2 flex-1 mb-5">
          {product.features.map(f => <CheckItem key={f} text={f} isConsole={isConsole} />)}
        </ul>

        <motion.a
          href={url} target="_blank" rel="noopener noreferrer"
          className="group relative block text-center py-3 rounded-xl overflow-hidden
                     font-space font-bold text-xs tracking-widest uppercase
                     border text-white/60 hover:text-black transition-colors duration-300"
          style={{ borderColor: t.btnBorder }}
          whileHover={{ scale: 1.02, transition: { type: 'spring', stiffness: 300, damping: 30 } }}
          whileTap={{ scale: 0.97 }}
        >
          <motion.span className={`absolute inset-0 rounded-xl ${t.btnFill}`}
            initial={{ scaleX: 0, originX: 0 }} whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }} />
          <span className="relative z-10 flex items-center justify-center gap-2">{product.cta} <ArrowSm /></span>
        </motion.a>
      </div>
    </motion.div>
  )
}

/* ── KBM hero card ─────────────────────────────────────────── */
function KbmHeroCard() {
  const p   = KBM_PRODUCT
  const url = PAYHIP_URLS[p.key] || '#'
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease: EASE }}
      whileHover={{ y: -5, boxShadow: '0 32px 80px rgba(255,255,255,0.10),0 0 0 1px rgba(255,255,255,0.28)',
        transition: { type: 'spring', stiffness: 180, damping: 28 } }}
      className="relative rounded-2xl overflow-hidden"
      style={{
        background: 'linear-gradient(145deg,rgba(255,255,255,0.07) 0%,rgba(255,255,255,0.02) 100%)',
        border: '1px solid rgba(255,255,255,0.18)', backdropFilter: 'blur(24px)',
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/55 to-transparent" />
      <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/7">
        <div className="p-6 flex flex-col">
          <div className="flex items-start justify-between gap-3 mb-4">
            <span className="text-3xl">🖱️</span><Badge label={p.badge} />
          </div>
          <h3 className="font-orbitron font-black text-xl text-white glow-text mb-2 leading-tight">{p.name}</h3>
          <p className="font-space text-sm text-white/42 leading-relaxed mb-5">{p.desc}</p>
          <div className="grid grid-cols-3 gap-2 mb-5">
            {p.highlights.map(h => (
              <div key={h.label} className="text-center p-2.5 rounded-xl border border-white/8"
                   style={{ background: 'rgba(255,255,255,0.03)' }}>
                <div className="font-orbitron font-black text-lg glow-text">{h.value}</div>
                <div className="font-space text-[9px] text-white/28 tracking-wide mt-0.5">{h.label}</div>
              </div>
            ))}
          </div>
          <div className="font-orbitron font-black text-4xl glow-text">{p.price}</div>
        </div>
        <div className="p-6 flex flex-col justify-between">
          <div>
            <p className="font-space text-[10px] text-white/28 tracking-widest uppercase mb-3">What's inside</p>
            <ul className="space-y-2.5 mb-6">{p.features.map(f => <CheckItem key={f} text={f} />)}</ul>
          </div>
          <div>
            <motion.a href={url} target="_blank" rel="noopener noreferrer"
              className="group relative block text-center py-4 rounded-xl overflow-hidden
                         font-space font-bold text-sm tracking-widest uppercase
                         bg-white text-black shadow-[0_0_32px_rgba(255,255,255,0.22)]"
              whileHover={{ scale: 1.03, boxShadow: '0 0 52px rgba(255,255,255,0.42)',
                transition: { type: 'spring', stiffness: 260, damping: 26 } }}
              whileTap={{ scale: 0.97 }}
            >
              <motion.span className="absolute inset-0 bg-gradient-to-r from-transparent via-black/6 to-transparent"
                initial={{ x: '-100%' }} whileHover={{ x: '100%' }}
                transition={{ duration: 0.7, ease: 'easeInOut' }} />
              <span className="relative z-10 flex items-center justify-center gap-2">{p.cta} <ArrowSm /></span>
            </motion.a>
            <p className="text-center text-white/20 font-space text-xs mt-3">Instant digital download · No subscription</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Section header ────────────────────────────────────────── */
function SectionHeading({ icon, label, tag }) {
  return (
    <motion.div
      className="flex items-center gap-3 mb-6"
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <div className="text-2xl">{icon}</div>
      <div>
        <h3 className="font-orbitron font-black text-lg text-white">{label}</h3>
        {tag && <span className="text-white/30 font-space text-xs tracking-widest">{tag}</span>}
      </div>
      <div className="flex-1 h-px bg-gradient-to-r from-white/15 to-transparent ml-4"/>
    </motion.div>
  )
}

/* ── Main export ────────────────────────────────────────────── */
export default function ProductCategories() {
  return (
    <section id="products" className="relative py-28 px-4">
      <div className="absolute inset-0 pointer-events-none"
           style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 40%,rgba(255,255,255,0.02) 0%,transparent 65%)' }} />

      <div className="max-w-6xl mx-auto">

        {/* Page header */}
        <motion.div className="text-center mb-16"
          initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.9, ease: EASE }}>
          <p className="text-white/25 font-space text-xs tracking-widest uppercase mb-3">Performance Arsenal</p>
          <h2 className="font-orbitron font-black text-4xl md:text-5xl text-white glow-text">Choose Your Edge</h2>
          <p className="mt-4 text-white/35 font-space max-w-lg mx-auto">
            Every product targets one layer of performance loss — and eliminates it.
          </p>
        </motion.div>

        {/* ── 1. PC Optimizations ── */}
        <div className="mb-14">
          <SectionHeading icon="💻" label="PC Optimizations" tag="4 products · CPU, GPU, Network & Input" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PC_PRODUCTS.map((p, i) => <ProductCard key={p.key} product={p} delay={i * 0.07} />)}
          </div>
        </div>

        {/* ── 2. Aim Optimization ── */}
        <div className="mb-14">
          <SectionHeading icon="🎯" label="Aim Optimization" tag="2 products · Precision FPS advantage" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
            {AIM_PRODUCTS.map((p, i) => <ProductCard key={p.key} product={p} delay={i * 0.09} />)}
          </div>
        </div>

        {/* ── 3. Console ── */}
        <div className="mb-14">
          <SectionHeading icon="🎮" label="Console Optimizations" tag="4 products · PlayStation & Xbox · All $4.99" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CONSOLE_PRODUCTS.map((p, i) => <ProductCard key={p.key} product={p} isConsole delay={i * 0.07} />)}
          </div>
        </div>

        {/* ── 4. KBM Sens ── */}
        <div className="mb-10">
          <SectionHeading icon="🖱️" label="KBM+ Sens" tag="1 product · Sensitivity & key bindings" />
          <KbmHeroCard />
        </div>

        {/* Trust line */}
        <motion.p className="text-center text-white/18 font-space text-xs mt-10"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ delay: 0.4 }}>
          ✓ Instant delivery &nbsp;·&nbsp; ✓ Fully reversible &nbsp;·&nbsp;
          ✓ No ban risk &nbsp;·&nbsp; ✓ Secured Payhip checkout
        </motion.p>
      </div>
    </section>
  )
}
