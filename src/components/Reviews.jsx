import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

const reviews = [
  { name: 'xKira99',      game: 'Warzone',   stars: 5, text: 'My FPS doubled overnight. Went from 144 to 290 stable. Unreal.',              avatar: 'K' },
  { name: 'Apex_Shadow',  game: 'Apex',      stars: 5, text: 'Input feels like a completely new PC. Every shot connects now.',               avatar: 'A' },
  { name: 'FragKing_',    game: 'Valorant',  stars: 5, text: 'Best $20 I\'ve spent in years. My headshot rate went up instantly.',           avatar: 'F' },
  { name: 'SniperElite7', game: 'CS2',       stars: 5, text: 'No more input lag stutters. My flicks feel perfectly responsive.',             avatar: 'S' },
  { name: 'TurboVoid',    game: 'Fortnite',  stars: 5, text: 'Feels way smoother. Building and editing is completely night and day.',        avatar: 'T' },
  { name: 'QuickBuild_',  game: 'Fortnite',  stars: 5, text: 'My edits are instant now. Zero missed inputs during box fights.',              avatar: 'Q' },
  { name: 'NovaPulse',    game: 'Warzone',   stars: 5, text: 'The Pro tweak is insane. Net code feels so much more consistent.',            avatar: 'N' },
  { name: 'GhostFrame',   game: 'Apex',      stars: 5, text: 'Can\'t go back to stock. My 60fps was actually 60. Now I\'m at 200+.',        avatar: 'G' },
  { name: 'LunarAce',     game: 'CS2',       stars: 5, text: 'Silver 2 to MG1 in two weeks. This actually makes a difference.',            avatar: 'L' },
  { name: 'RiftRunner',   game: 'Valorant',  stars: 5, text: 'Ping dropped from 60 to 28. Game feels completely different now.',            avatar: 'R' },
  { name: 'Hex_Delta',    game: 'Fortnite',  stars: 5, text: 'Shotgun Tweaker alone is worth every penny. Pellets actually register.',      avatar: 'H' },
  { name: 'ColdBreeze',   game: 'Warzone',   stars: 5, text: 'Zero Delay Engine is no joke. I can feel the difference immediately.',        avatar: 'C' },
]

/* Seamless loop: duplicate so the track is exactly 2× wide,
   then animate translateX(0) → translateX(-50%)            */
const row1 = [...reviews, ...reviews]
const row2 = [...reviews].reverse()
const row2Full = [...row2, ...row2]

function Stars({ n }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} width="11" height="11" viewBox="0 0 11 11">
          <polygon
            points="5.5,0.9 6.9,4.1 10.3,4.1 7.7,6.3 8.7,9.5 5.5,7.5 2.3,9.5 3.3,6.3 0.7,4.1 4.1,4.1"
            fill="rgba(255,255,255,0.6)"
          />
        </svg>
      ))}
    </div>
  )
}

function ReviewCard({ r }) {
  return (
    /* Fixed width so the seamless loop math is exact */
    <div
      className="flex-shrink-0 w-[280px] glass rounded-2xl p-5 border border-white/6 mx-2.5 select-none"
    >
      <Stars n={r.stars} />
      <p className="mt-3.5 text-white/58 font-space text-sm leading-relaxed">
        "{r.text}"
      </p>
      <div className="mt-5 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-white/8 border border-white/10 flex items-center justify-center
                        text-white/65 font-bold text-xs font-orbitron shrink-0">
          {r.avatar}
        </div>
        <div>
          <div className="text-white/68 font-space text-sm font-medium">{r.name}</div>
          <div className="text-white/26 font-space text-xs">{r.game}</div>
        </div>
      </div>
    </div>
  )
}

export default function Reviews() {
  return (
    <section id="reviews" className="relative py-32 overflow-hidden">

      {/* Header */}
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <p className="text-white/25 font-space text-xs tracking-widest uppercase mb-3">Community</p>
          <h2 className="font-orbitron font-black text-4xl md:text-5xl text-white glow-text">
            Gamers Don't Lie
          </h2>
          <p className="mt-4 text-white/35 font-space">
            50,000+ players have felt the difference. Join them.
          </p>
        </motion.div>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="relative overflow-hidden mb-4 review-row">
        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none marquee-fade-left" />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none marquee-fade-right" />

        {/* The track — duplicated for seamless loop */}
        <div className="review-track-fwd flex" style={{ width: 'max-content' }}>
          {row1.map((r, i) => <ReviewCard key={`r1-${i}`} r={r} />)}
        </div>
      </div>

      {/* Row 2 — scrolls right (reverse) */}
      <div className="relative overflow-hidden review-row">
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none marquee-fade-left" />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none marquee-fade-right" />

        <div className="review-track-rev flex" style={{ width: 'max-content' }}>
          {row2Full.map((r, i) => <ReviewCard key={`r2-${i}`} r={r} />)}
        </div>
      </div>

    </section>
  )
}
