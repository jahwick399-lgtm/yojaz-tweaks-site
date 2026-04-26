import { useEffect, useRef } from 'react'

export default function StarField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let W = window.innerWidth
    let H = window.innerHeight
    canvas.width  = W
    canvas.height = H

    // Stars
    const NUM_STARS = 220
    const stars = Array.from({ length: NUM_STARS }, () => ({
      x:        Math.random() * W,
      y:        Math.random() * H,
      r:        Math.random() * 1.4 + 0.2,
      speed:    Math.random() * 0.06 + 0.01,
      opacity:  Math.random() * 0.7 + 0.2,
      twinkle:  Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 0.015 + 0.005,
    }))

    // Shooting stars
    const shootingStars = []
    const spawnShooter = () => ({
      x:     Math.random() * W * 0.6,
      y:     Math.random() * H * 0.4,
      len:   Math.random() * 120 + 60,
      speed: Math.random() * 6 + 4,
      opacity: 1,
      angle: Math.PI / 5,
    })

    let shootingTimer = 0
    let frame = 0
    let animId

    const draw = () => {
      ctx.clearRect(0, 0, W, H)

      // Stars
      stars.forEach(s => {
        s.twinkle += s.twinkleSpeed
        const opacity = s.opacity * (0.6 + 0.4 * Math.sin(s.twinkle))
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(210,225,255,${opacity})`
        ctx.fill()

        // Slow drift down
        s.y += s.speed
        if (s.y > H) { s.y = -2; s.x = Math.random() * W }
      })

      // Nebula blobs
      if (frame % 2 === 0) {
        ;[
          { x: W * 0.15, y: H * 0.25, r: 250, color: 'rgba(200,210,255,0.018)' },
          { x: W * 0.82, y: H * 0.6,  r: 300, color: 'rgba(200,200,255,0.014)' },
          { x: W * 0.5,  y: H * 0.8,  r: 220, color: 'rgba(210,215,255,0.012)' },
        ].forEach(b => {
          const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r)
          grad.addColorStop(0, b.color)
          grad.addColorStop(1, 'transparent')
          ctx.fillStyle = grad
          ctx.fillRect(0, 0, W, H)
        })
      }

      // Shooting stars
      shootingTimer++
      if (shootingTimer > 220 + Math.random() * 180) {
        shootingStars.push(spawnShooter())
        shootingTimer = 0
      }

      shootingStars.forEach((ss, i) => {
        ctx.beginPath()
        ctx.moveTo(ss.x, ss.y)
        ctx.lineTo(ss.x - Math.cos(ss.angle) * ss.len, ss.y - Math.sin(ss.angle) * ss.len)
        const grad = ctx.createLinearGradient(
          ss.x, ss.y,
          ss.x - Math.cos(ss.angle) * ss.len, ss.y - Math.sin(ss.angle) * ss.len
        )
        grad.addColorStop(0, `rgba(255,255,255,${ss.opacity})`)
        grad.addColorStop(1, 'transparent')
        ctx.strokeStyle = grad
        ctx.lineWidth = 1.5
        ctx.stroke()

        ss.x += Math.cos(ss.angle) * ss.speed
        ss.y += Math.sin(ss.angle) * ss.speed
        ss.opacity -= 0.02
        if (ss.opacity <= 0) shootingStars.splice(i, 1)
      })

      frame++
      animId = requestAnimationFrame(draw)
    }

    draw()

    const onResize = () => {
      W = window.innerWidth; H = window.innerHeight
      canvas.width = W; canvas.height = H
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}
