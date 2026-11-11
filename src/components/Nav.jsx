import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

export const SECTIONS = [
  { id: 'top', label: 'เปิดเรื่อง' },
  { id: 'story', label: 'ต้นกำเนิด' },
  { id: 'biology', label: 'ชีววิทยาวาฬ' },
  { id: 'powers', label: 'จริง vs แต่ง' },
  { id: 'dossier', label: 'แฟ้มลับ' },
  { id: 'reveal', label: 'ราชัน' },
]

function useActiveSection() {
  const [active, setActive] = useState('top')
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const line = window.innerHeight * 0.4
      let current = SECTIONS[0].id
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id)
        if (el && el.getBoundingClientRect().top <= line) current = s.id
      }
      setActive(current)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])
  return active
}

function DepthGauge() {
  const { scrollYProgress } = useScroll()
  const depth = useTransform(scrollYProgress, (v) => `${Math.round(v * 3000).toLocaleString('en-US')} m`)
  const top = useTransform(scrollYProgress, (v) => `${v * 100}%`)
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed right-5 top-1/2 z-40 hidden h-[42vh] -translate-y-1/2 xl:block"
    >
      <div className="relative h-full w-px bg-gradient-to-b from-glow/60 via-tide/40 to-abyss-600/40">
        {[0, 0.25, 0.5, 0.75, 1].map((t) => (
          <span key={t} className="absolute -left-1 h-px w-2.5 bg-glow/50" style={{ top: `${t * 100}%` }} />
        ))}
        <motion.div style={{ top }} className="absolute -left-[5px] -translate-y-1/2">
          <span className="block h-2.5 w-2.5 rounded-full bg-glow shadow-[0_0_12px_#3fe0ff]" />
          <motion.span className="absolute right-5 top-1/2 -translate-y-1/2 whitespace-nowrap font-display text-sm font-semibold tabular-nums text-glow-soft">
            {depth}
          </motion.span>
        </motion.div>
      </div>
    </div>
  )
}

export default function Nav() {
  const active = useActiveSection()
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 })

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-glow/10 bg-abyss-950/75 backdrop-blur-md">
        <nav aria-label="เมนูหลัก" className="container-wide flex h-16 items-center justify-between px-4">
          <a href="#top" className="group flex items-center gap-2.5" aria-label="ABYSSAL KING — กลับขึ้นด้านบน">
            <img src={`${import.meta.env.BASE_URL}favicon.svg`} alt="" width="34" height="34" className="h-[34px] w-[34px]" />
            <span className="font-title text-lg font-bold tracking-[0.18em] text-ice group-hover:text-glow">
              ABYSSAL KING
            </span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  aria-current={active === s.id ? 'true' : undefined}
                  className={`relative rounded-full px-3.5 py-1.5 font-display text-[0.98rem] font-medium transition-colors ${
                    active === s.id ? 'text-abyss-950' : 'text-silver hover:text-ice'
                  }`}
                >
                  {active === s.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-glow shadow-[0_0_18px_#3fe0ff88]"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  {s.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-glow/25 text-ice lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'ปิดเมนู' : 'เปิดเมนู'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
        <motion.div
          aria-hidden="true"
          style={{ scaleX: progress }}
          className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-tide via-glow to-ice"
        />

        <AnimatePresence>
          {open && (
            <motion.ul
              id="mobile-menu"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22 }}
              className="border-t border-glow/10 bg-abyss-950/95 px-4 pb-5 pt-2 lg:hidden"
            >
              {SECTIONS.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === s.id ? 'true' : undefined}
                    className={`flex items-center gap-4 rounded-xl px-3 py-3 font-display text-lg ${
                      active === s.id ? 'bg-glow/10 text-glow' : 'text-silver'
                    }`}
                  >
                    <span className="w-6 text-sm tabular-nums text-mist">0{i + 1}</span>
                    {s.label}
                  </a>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </header>
      <DepthGauge />
    </>
  )
}
