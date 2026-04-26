import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]
const links = ['Products', 'Performance', 'Reviews', 'Features']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.0, ease: EASE }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? 'bg-black/60 backdrop-blur-2xl border-b border-white/6'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div
            className="w-8 h-8 bg-white rounded-lg flex items-center justify-center
                       shadow-[0_0_16px_rgba(255,255,255,0.35)]
                       group-hover:shadow-[0_0_24px_rgba(255,255,255,0.55)]
                       transition-shadow duration-500"
          >
            <span className="text-black font-black text-sm font-orbitron">Y</span>
          </div>
          <span className="font-orbitron font-bold text-lg tracking-wider">
            Yo<span className="text-white/50">Jaz</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="text-white/40 hover:text-white/80 font-space text-sm tracking-wider
                         transition-colors duration-300"
            >
              {l}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <motion.a
          href="#products"
          className="hidden md:block px-5 py-2 rounded-full bg-white text-black
                     text-xs font-bold font-space tracking-widest uppercase
                     shadow-[0_0_20px_rgba(255,255,255,0.15)]"
          whileHover={{
            scale: 1.03,
            boxShadow: '0 0 32px rgba(255,255,255,0.32)',
          }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 260, damping: 28 }}
        >
          Get Tweaked
        </motion.a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map(i => (
            <motion.span
              key={i}
              className="block w-5 h-px bg-white/60 rounded"
              animate={{
                rotate:  menuOpen && i === 0 ? 45  : menuOpen && i === 2 ? -45 : 0,
                y:       menuOpen && i === 0 ? 6   : menuOpen && i === 2 ? -6  : 0,
                opacity: menuOpen && i === 1 ? 0   : 1,
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            />
          ))}
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="md:hidden overflow-hidden bg-black/85 backdrop-blur-2xl border-b border-white/8"
          >
            <div className="px-6 py-5 flex flex-col gap-4">
              {links.map(l => (
                <a
                  key={l}
                  href={`#${l.toLowerCase()}`}
                  className="text-white/50 hover:text-white font-space text-base py-0.5 transition-colors duration-200"
                  onClick={() => setMenuOpen(false)}
                >
                  {l}
                </a>
              ))}
              <a
                href="#products"
                className="mt-1 text-center py-3 bg-white text-black font-bold rounded-full font-space text-sm tracking-widest uppercase"
                onClick={() => setMenuOpen(false)}
              >
                Get Tweaked
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
