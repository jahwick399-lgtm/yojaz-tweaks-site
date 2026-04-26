import { motion } from 'framer-motion'

const links = {
  Products:  ['Basic Tweaker', 'Pro Tweaker', 'Premium Tweaker'],
  Support:   ['Documentation', 'Discord', 'Contact Us'],
  Legal:     ['Privacy Policy', 'Terms of Service', 'Refund Policy'],
}

export default function Footer() {
  return (
    <footer className="relative border-t border-white/6 pt-20 pb-10 px-4 overflow-hidden">
      {/* Glow top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px
                      bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-20 pointer-events-none"
           style={{ background: 'radial-gradient(ellipse at top, rgba(255,255,255,0.04) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center
                              shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                <span className="text-black font-black text-sm font-orbitron">Y</span>
              </div>
              <span className="font-orbitron font-bold text-lg">YoJaz</span>
            </div>
            <p className="text-white/35 font-space text-sm leading-relaxed">
              Maximum gaming performance, unlocked. Trusted by 50,000+ competitive players worldwide.
            </p>
            {/* Social */}
            <div className="flex gap-3 mt-6">
              {['𝕏', 'DC', 'YT'].map(s => (
                <motion.button
                  key={s}
                  className="w-9 h-9 glass rounded-xl border border-white/8 text-white/40
                             hover:text-white hover:border-white/25 text-xs font-bold font-space
                             transition-all duration-200"
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {s}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Link columns */}
          {Object.entries(links).map(([group, items], gi) => (
            <motion.div
              key={group}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * (gi + 1) }}
            >
              <h4 className="font-orbitron text-xs font-bold tracking-widest text-white/30 uppercase mb-5">
                {group}
              </h4>
              <ul className="space-y-3">
                {items.map(item => (
                  <li key={item}>
                    <motion.a
                      href="#"
                      className="text-white/45 hover:text-white font-space text-sm transition-colors duration-200"
                      whileHover={{ x: 4 }}
                    >
                      {item}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4
                        pt-8 border-t border-white/6">
          <p className="text-white/25 font-space text-xs">
            © 2025 YoJaz. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-white/25 font-space text-xs">
            <span className="w-1.5 h-1.5 bg-white/30 rounded-full inline-block animate-pulse" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  )
}
