import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * Fixed ocean backdrop: a gradient that gets darker as the reader "descends"
 * (scroll), plus a light canvas of drifting marine snow.
 * The canvas is capped in particle count and DPR, pauses when the tab is
 * hidden and is disabled entirely for prefers-reduced-motion.
 */
function MarineSnow() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0
    let h = 0
    let raf = 0
    let particles = []

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.round(Math.min(90, (w * h) / 16000))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.6 + 0.4,
        vy: Math.random() * 0.25 + 0.06,
        vx: (Math.random() - 0.5) * 0.12,
        a: Math.random() * 0.5 + 0.15,
        phase: Math.random() * Math.PI * 2,
      }))
    }

    const draw = (t = 0) => {
      ctx.clearRect(0, 0, w, h)
      for (const p of particles) {
        if (!reduce) {
          p.y += p.vy
          p.x += p.vx + Math.sin(t / 2400 + p.phase) * 0.08
          if (p.y > h + 4) {
            p.y = -4
            p.x = Math.random() * w
          }
          if (p.x < -4) p.x = w + 4
          if (p.x > w + 4) p.x = -4
        }
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(190, 240, 255, ${p.a})`
        ctx.fill()
      }
      if (!reduce) raf = requestAnimationFrame(draw)
    }

    const onVisibility = () => {
      cancelAnimationFrame(raf)
      if (!document.hidden && !reduce) raf = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0" />
}

export default function OceanBackdrop() {
  const { scrollYProgress } = useScroll()
  const darkness = useTransform(scrollYProgress, [0, 0.6, 1], [0, 0.55, 0.75])
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,#13315f_0%,#081833_35%,#040b1a_70%,#02060f_100%)]" />
      <motion.div style={{ opacity: darkness }} className="absolute inset-0 bg-abyss-950" />
      <MarineSnow />
    </div>
  )
}
