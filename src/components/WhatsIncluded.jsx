import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

const features = [
  {
    icon: '⚡',
    title: 'FPS Maximizer',
    desc: 'Unlocks raw frame output by optimizing CPU scheduler, GPU priority, and timer resolution.',
  },
  {
    icon: '🎯',
    title: 'Input Precision Engine',
    desc: 'Sub-1ms response tuning. Raw input mode, USB polling boost, and mouse acceleration removal.',
  },
  {
    icon: '🔧',
    title: 'System Deep Cleaner',
    desc: 'Kill background drain instantly. Removes junk, bloatware, and unnecessary startup processes.',
  },
  {
    icon: '🌐',
    title: 'Network Latency Boost',
    desc: 'TCP/IP stack optimization and DNS switching for steadier, lower-ping connections.',
  },
  {
    icon: '🖥️',
    title: 'GPU Accelerator',
    desc: 'Enables Hardware GPU Scheduling, disables MPO stuttering, and maximizes shader cache.',
  },
  {
    icon: '🔒',
    title: '100% Safe & Reversible',
    desc: 'Every tweak is documented and instantly undoable. No bans, no permanent changes.',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
}

const item = {
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
}

export default function WhatsIncluded() {
  return (
    <section id="features" className="relative py-32 px-4">
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
            Everything You Get
          </p>
          <h2 className="font-orbitron font-black text-4xl md:text-5xl text-white glow-text">
            What's Included
          </h2>
          <p className="mt-4 text-white/35 font-space max-w-lg mx-auto">
            Six optimization engines working together for the complete competitive edge.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
        >
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              variants={item}
              whileHover={{
                y: -4,
                borderColor: 'rgba(255,255,255,0.15)',
                boxShadow: '0 20px 50px rgba(255,255,255,0.04)',
              }}
              transition={{ type: 'spring', stiffness: 220, damping: 32 }}
              className="glass rounded-2xl p-6 border border-white/7 cursor-default group
                         transition-colors duration-300"
            >
              {/* Icon wrapper */}
              <div
                className="text-2xl mb-5 w-12 h-12 rounded-xl bg-white/4 border border-white/8
                           flex items-center justify-center
                           group-hover:bg-white/7 group-hover:border-white/15
                           transition-all duration-400"
              >
                {f.icon}
              </div>

              {/* Title */}
              <h3 className="font-orbitron font-bold text-sm tracking-wider text-white/90 mb-2.5">
                {f.title}
              </h3>

              {/* Desc */}
              <p className="text-white/38 font-space text-sm leading-relaxed">
                {f.desc}
              </p>

              {/* Bottom line draw-in */}
              <motion.div
                className="mt-5 h-px bg-gradient-to-r from-white/12 to-transparent"
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.0, delay: 0.08 * i, ease: EASE }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
