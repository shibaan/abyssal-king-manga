import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, ArrowDown, BookOpen, Microscope, Lock } from 'lucide-react'
import { ART } from '../data/character.js'
import { ease } from '../components/Reveal.jsx'

const pillars = [
  { icon: BookOpen, label: 'มังงะต้นกำเนิด' },
  { icon: Microscope, label: 'ชีววิทยาจริง' },
  { icon: Lock, label: 'แฟ้มลับตัวละคร' },
]

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const artY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const artScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '35%'])
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  return (
    <section
      id="top"
      ref={ref}
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-16"
    >
      <div className="light-rays" aria-hidden="true" />

      {/* A silhouette rising from the deep — the full reveal comes at the end */}
      <motion.div
        aria-hidden="true"
        style={{ y: artY, scale: artScale }}
        className="absolute bottom-0 right-[-30%] top-28 w-[120%] origin-bottom sm:right-[-8%] sm:w-[75%] lg:right-[2%] lg:w-[52%]"
      >
        <div className="absolute left-1/2 top-[18%] h-[60%] w-[70%] -translate-x-1/2 rounded-full bg-tide/25 blur-[90px]" />
        <motion.img
          src={ART.kingCutout.src}
          width={ART.kingCutout.w}
          height={ART.kingCutout.h}
          alt=""
          fetchPriority="high"
          decoding="async"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2.4, ease }}
          className="relative h-full w-full object-contain object-bottom [filter:brightness(0.42)_contrast(1.15)_drop-shadow(0_0_2px_#3fe0ff99)_drop-shadow(0_0_28px_#1d6fd6aa)] [mask-image:linear-gradient(to_bottom,#000_60%,transparent_98%)]"
        />
      </motion.div>
      {/* readability gradients */}
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-abyss-950 via-abyss-950/80 to-transparent sm:via-abyss-950/60" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-abyss-950 to-transparent" />

      <motion.div style={{ y: textY, opacity: fade }} className="container-wide relative z-10 px-4 py-16">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease }}
          className="eyebrow flex items-center gap-3"
        >
          <span className="h-px w-10 bg-glow/70" aria-hidden="true" />
          Project Leviathan · File 01
        </motion.p>

        <motion.h1
          id="hero-title"
          initial={{ opacity: 0, letterSpacing: '0.4em' }}
          animate={{ opacity: 1, letterSpacing: '0.06em' }}
          transition={{ duration: 1.6, delay: 0.45, ease }}
          className="title-glow mt-6 text-[clamp(2.9rem,10.5vw,8rem)] leading-[0.95]"
        >
          ABYSSAL
          <br />
          KING
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1, ease }}
          className="mt-6 font-display text-[clamp(1.6rem,4vw,2.6rem)] font-semibold text-glow-soft"
        >
          ราชันแห่งห้วงลึก
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.3, ease }}
          className="mt-5 max-w-xl text-lg text-silver md:text-xl"
        >
          นักวิทยาศาสตร์ผู้ถูกห้วงลึกกลืนกิน — และวิทยาศาสตร์จริงของ
           <strong className="whitespace-nowrap font-semibold text-ice">วาฬหัวทุย</strong> 
          ที่อยู่เบื้องหลังพลังของเขา
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.5, ease }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <a
            href="#story"
            className="group inline-flex items-center gap-3 rounded-full bg-glow px-7 py-3.5 font-display text-lg font-semibold text-abyss-950 shadow-[0_0_30px_#3fe0ff66] transition hover:bg-ice hover:shadow-[0_0_44px_#3fe0ffaa]"
          >
            เริ่มดำดิ่ง
            <ArrowDown size={20} className="transition group-hover:translate-y-0.5" aria-hidden="true" />
          </a>
          <a
            href="#biology"
            className="inline-flex items-center gap-2 rounded-full border border-glow/35 px-6 py-3.5 font-display text-lg font-medium text-ice transition hover:border-glow hover:bg-glow/10"
          >
            ไปที่ชีววิทยาวาฬ
          </a>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.9 }}
          className="mt-12 flex flex-wrap gap-x-6 gap-y-3 text-base text-silver"
        >
          {pillars.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-2">
              <Icon size={18} className="text-glow" aria-hidden="true" />
              {label}
            </li>
          ))}
        </motion.ul>
      </motion.div>

      <motion.a
        href="#story"
        aria-label="เลื่อนลงไปยังเรื่องราวต้นกำเนิด"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 2.4 }, y: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' } }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-glow-soft"
      >
        <ChevronDown size={32} />
      </motion.a>
    </section>
  )
}
