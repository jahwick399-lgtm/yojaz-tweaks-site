import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const names     = ['Jordan', 'Tyler', 'Marcus', 'Kai', 'Jayden', 'Alex', 'Ryan', 'Noah', 'Ethan', 'Liam', 'Zoe', 'Maya', 'Emma', 'Sofia']
const locations = ['California', 'Texas', 'New York', 'Florida', 'Washington', 'Colorado', 'Georgia', 'Arizona', 'Oregon', 'Nevada']
const products  = ['Basic Tweaker', 'Pro Tweaker', 'Pro Tweaker', 'Premium Tweaker']

const rand = arr => arr[Math.floor(Math.random() * arr.length)]

const getTimeAgo = () => {
  const mins = Math.floor(Math.random() * 7) + 1
  return mins === 1 ? 'just now' : `${mins}m ago`
}

export default function PurchasePopup() {
  const [popup, setPopup] = useState(null)

  const showPopup = () =>
    setPopup({ name: rand(names), location: rand(locations), product: rand(products), time: getTimeAgo(), id: Date.now() })

  useEffect(() => {
    const first = setTimeout(showPopup, 5000)
    let timer
    const schedule = () => {
      const delay = Math.random() * 20000 + 18000
      timer = setTimeout(() => { showPopup(); schedule() }, delay)
    }
    const second = setTimeout(schedule, 5000)
    return () => { clearTimeout(first); clearTimeout(second); clearTimeout(timer) }
  }, [])

  useEffect(() => {
    if (!popup) return
    const t = setTimeout(() => setPopup(null), 5500)
    return () => clearTimeout(t)
  }, [popup])

  return (
    <AnimatePresence>
      {popup && (
        <motion.div
          key={popup.id}
          initial={{ x: -36, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -36, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 180, damping: 28 }}
          className="fixed bottom-6 left-6 z-50 max-w-xs"
        >
          <div
            className="relative flex items-start gap-3 p-4 rounded-2xl border border-white/10 overflow-hidden"
            style={{
              background: 'rgba(8,8,12,0.90)',
              backdropFilter: 'blur(24px)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)',
            }}
          >
            {/* Top glow line */}
            <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

            {/* Avatar */}
            <div className="shrink-0 w-9 h-9 rounded-full bg-white/8 border border-white/12
                            flex items-center justify-center font-orbitron font-bold text-sm text-white/80">
              {popup.name[0]}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-0.5">
                <p className="text-white/80 font-space text-sm font-medium leading-snug truncate">
                  {popup.name} from {popup.location}
                </p>
                <button
                  onClick={() => setPopup(null)}
                  className="shrink-0 text-white/20 hover:text-white/50 text-base leading-none mt-0.5 transition-colors duration-200"
                  aria-label="Dismiss"
                >
                  ×
                </button>
              </div>
              <p className="text-white/42 font-space text-xs">
                purchased{' '}
                <span className="text-white/70 font-semibold">{popup.product}</span>
              </p>
              <p className="text-white/22 font-space text-xs mt-1">{popup.time}</p>
            </div>

            {/* Timer bar — drains smoothly */}
            <motion.div
              className="absolute bottom-0 left-0 h-px bg-white/25"
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: 5.5, ease: 'linear' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
