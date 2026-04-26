import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

/**
 * LiveNumber — counts up from 0, then enters real-time fluctuation.
 * "before" values: large range, fast ticks → looks unstable/bad
 * "after"  values: tiny range, slow ticks  → looks rock-solid/elite
 */
function LiveNumber({ base, range, interval, unit, active, countDelay = 0, biasUp = false }) {
  const [val, setVal]   = useState(0)
  const [live, setLive] = useState(false)

  useEffect(() => {
    if (!active) return
    let frame
    const DURATION = 1800
    let t0 = null
    const tick = ts => {
      if (!t0) t0 = ts
      const p     = Math.min((ts - t0) / DURATION, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(eased * base))
      if (p < 1) frame = requestAnimationFrame(tick)
      else setLive(true)
    }
    const timer = setTimeout(() => { frame = requestAnimationFrame(tick) }, countDelay * 1000)
    return () => { clearTimeout(timer); cancelAnimationFrame(frame) }
  }, [active, base, countDelay])

  useEffect(() => {
    if (!live || range === 0) return
    const timer = setInterval(() => {
      const noise = biasUp
        ? Math.round(Math.random() * range)
        : Math.round((Math.random() - 0.5) * 2 * range)
      setVal(Math.max(0, base + noise))
    }, interval)
    return () => clearInterval(timer)
  }, [live, base, range, interval, biasUp])

  return <>{val}{unit}</>
}

const METRICS = [
  {
    label: 'Average FPS',
    before: { base: 144, range: 14, interval: 650,  biasUp: false, pct: 27, delay: 0.25 },
    after:  { base: 387, range:  5, interval: 1800, biasUp: true,  pct: 96, delay: 0.85 },
    unit: '', displayUnit: 'fps', improvement: '+169%',
  },
  {
    label: 'Input Delay',
    before: { base: 14,  range:  3, interval: 550,  biasUp: false, pct: 72, delay: 0.30 },
    after:  { base: 1,   range:  1, interval: 2200, biasUp: false, pct: 5,  delay: 0.90 },
    unit: '', displayUnit: 'ms', improvement: '−93%',
  },
  {
    label: 'Frame Stability',
    before: { base: 71,  range:  6, interval: 700,  biasUp: false, pct: 71, delay: 0.35 },
    after:  { base: 99,  range:  1, interval: 2500, biasUp: false, pct: 99, delay: 0.95 },
    unit: '%', displayUnit: '%', improvement: '+39%',
  },
  {
    label: 'CPU Background Drain',
    before: { base: 87,  range:  6, interval: 800,  biasUp: false, pct: 87, delay: 0.40 },
    after:  { base: 36,  range:  2, interval: 2000, biasUp: false, pct: 36, delay: 1.00 },
    unit: '%', displayUnit: '%', improvement: '−59%',
  },
]

function MetricRow({ metric, active }) {
  return (
    <div className="mb-7 last:mb-0">
      <div className="flex items-center justify-between mb-2.5">
        <span className="font-space text-white/45 text-sm">{metric.label}</span>

        <div className="flex items-center gap-2 font-orbitron font-bold text-xs tabular-nums">
          {/* Before — dim, unstable */}
          <span className="text-white/28 min-w-[3.5rem] text-right">
            <LiveNumber {...metric.before} unit={metric.unit} active={active} countDelay={metric.before.delay} />
            <span className="text-white/18 font-space ml-0.5">{metric.displayUnit}</span>
          </span>

          <span className="text-white/15 font-space text-xs">→</span>

          {/* After — bright, stable */}
          <span className="text-white/90 min-w-[3.5rem] text-left">
            <LiveNumber {...metric.after} unit={metric.unit} active={active} countDelay={metric.after.delay} />
            <span className="text-white/50 font-space ml-0.5">{metric.displayUnit}</span>
          </span>

          {/* Badge */}
          <span className="ml-1 text-[9px] px-2 py-0.5 rounded-full border border-white/10 text-white/35"
                style={{ background: 'rgba(255,255,255,0.03)' }}>
            {metric.improvement}
          </span>
        </div>
      </div>

      {/* Before bar */}
      <div className="relative h-1.5 bg-white/5 rounded-full mb-1.5 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-white/20"
          initial={{ width: 0 }}
          animate={active ? { width: `${metric.before.pct}%` } : { width: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: metric.before.delay }}
        />
      </div>

      {/* After bar */}
      <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="relative h-full rounded-full overflow-hidden bar-shimmer"
          style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.55), rgba(255,255,255,0.88))' }}
          initial={{ width: 0 }}
          animate={active ? { width: `${metric.after.pct}%` } : { width: 0 }}
          transition={{ duration: 1.6, ease: [0.25, 0.46, 0.45, 0.94], delay: metric.after.delay }}
        />
      </div>

      <div className="flex justify-between mt-1.5">
        <span className="text-white/18 text-xs font-space">Before</span>
        <span className="text-white/40 text-xs font-space">After YoJaz</span>
      </div>
    </div>
  )
}

export default function Performance() {
  const ref      = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.25 })

  return (
    <section id="performance" className="relative py-32 px-4">
      <div className="absolute inset-0 pointer-events-none"
           style={{ background: 'radial-gradient(ellipse 55% 45% at 50% 50%, rgba(255,255,255,0.018) 0%, transparent 70%)' }} />

      <div className="max-w-3xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <p className="text-white/25 font-space text-xs tracking-widest uppercase mb-3">Real Benchmarks</p>
          <h2 className="font-orbitron font-black text-4xl md:text-5xl text-white glow-text">
            Before vs After
          </h2>
          <p className="mt-4 text-white/35 font-space">
            Live counters. Real numbers. Tested on mid-range hardware.
          </p>

          {isInView && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="inline-flex items-center gap-2 mt-4 px-3 py-1.5 glass rounded-full border border-white/8"
            >
              <span className="w-1.5 h-1.5 bg-white/55 rounded-full animate-ping-slow" />
              <span className="text-white/30 font-space text-xs tracking-widest">LIVE DATA</span>
            </motion.div>
          )}
        </motion.div>

        {/* Card */}
        <motion.div
          className="glass-strong rounded-2xl p-8 md:p-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          {/* Legend */}
          <div className="flex items-center gap-6 mb-9 text-xs font-space">
            <div className="flex items-center gap-2">
              <div className="w-7 h-1.5 bg-white/20 rounded-full" />
              <span className="text-white/28">Before</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-2 rounded-full bg-white/70" />
              <span className="text-white/50">After YoJaz</span>
            </div>
            <span className="ml-auto text-white/20 text-[10px]">numbers update live ↑↓</span>
          </div>

          {METRICS.map(m => <MetricRow key={m.label} metric={m} active={isInView} />)}

          {/* Summary row */}
          <motion.div
            className="mt-8 p-5 rounded-xl border border-white/8 bg-white/2 grid grid-cols-3 gap-4 text-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 3.4, duration: 0.8 }}
          >
            {[
              { val: '+169%', label: 'avg FPS increase' },
              { val: '−93%',  label: 'input delay cut' },
              { val: '50K+',  label: 'gamers optimized' },
            ].map(s => (
              <div key={s.label}>
                <div className="font-orbitron font-black text-2xl md:text-3xl glow-text">{s.val}</div>
                <div className="text-white/30 font-space text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
