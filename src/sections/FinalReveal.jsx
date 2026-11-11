import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { ART, PROFILE, ANATOMY } from '../data/character.js'
import { Reveal, ease } from '../components/Reveal.jsx'

// [anatomy id, label side, extra classes] — the claws label sits near the
// right edge, so it only shows on wide screens where it has room.
const CALLOUTS = [
  ['crown', 'right', ''],
  ['markings', 'left', ''],
  ['claws', 'right', 'hidden xl:block'],
].map(([id, side, cls]) => ({ ...ANATOMY.find((a) => a.id === id), side, cls }))
const HUMAN_RATIO = PROFILE.heightHuman / PROFILE.heightKing

export default function FinalReveal() {
  const stage = useRef(null)
  const { scrollYProgress } = useScroll({ target: stage, offset: ['start end', 'center center'] })
  const brightness = useTransform(scrollYProgress, [0.15, 1], [0.08, 1])
  const filter = useTransform(
    brightness,
    (b) => `brightness(${b}) contrast(1.08) drop-shadow(0 0 2px #3fe0ffaa) drop-shadow(0 0 ${Math.round(40 * b)}px #1d6fd6aa)`,
  )
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1])
  const calloutOpacity = useTransform(scrollYProgress, [0.75, 1], [0, 1])

  return (
    <section id="reveal" aria-labelledby="reveal-title" className="section-shell relative overflow-hidden">
      <div className="light-rays opacity-80" aria-hidden="true" />
      <div className="container-wide relative">
        <Reveal className="text-center">
          <p className="eyebrow">05 · Final Reveal</p>
        </Reveal>

        {/* stage */}
        <div ref={stage} className="relative mx-auto mt-10 h-[min(78svh,52rem,calc((100vw_-_6rem)*1.1))] min-h-[22rem] max-w-5xl">
          <div aria-hidden="true" className="absolute bottom-0 left-1/2 h-24 w-[80%] -translate-x-1/2 rounded-[50%] bg-glow/15 blur-3xl" />
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-glow/60 to-transparent" />

          <div className="absolute inset-0 flex items-end justify-center gap-[2%]">
            {/* height ruler */}
            <div aria-hidden="true" className="relative hidden h-full w-16 sm:block">
              {[
                { h: 1, label: `${PROFILE.heightKing} ม.` },
                { h: HUMAN_RATIO, label: `${PROFILE.heightHuman} ม.` },
              ].map((m) => (
                <div key={m.label} className="absolute inset-x-0 border-t border-dashed border-glow/50" style={{ bottom: `${m.h * 96}%` }}>
                  <span className="absolute -top-7 left-0 font-display text-sm font-semibold text-glow-soft">{m.label}</span>
                </div>
              ))}
            </div>

            {/* human form, to scale */}
            <motion.figure
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease }}
              className="relative m-0 flex h-full flex-col justify-end"
            >
              <img
                src={ART.humanCutout.src}
                width={ART.humanCutout.w}
                height={ART.humanCutout.h}
                alt={`ร่างมนุษย์ก่อนการกลายร่าง สูง ${PROFILE.heightHuman} เมตร`}
                loading="lazy"
                decoding="async"
                className="w-auto object-contain [filter:brightness(0.95)_drop-shadow(0_0_10px_#000)]"
                style={{ height: `${HUMAN_RATIO * 96}%` }}
              />
              <figcaption className="absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap font-display text-sm tracking-widest text-mist">
                HUMAN
              </figcaption>
            </motion.figure>

            {/* the King */}
            <motion.figure style={{ scale }} className="relative m-0 h-[96%] origin-bottom">
              <motion.img
                src={ART.kingCutout.src}
                width={ART.kingCutout.w}
                height={ART.kingCutout.h}
                alt={`ABYSSAL KING เต็มตัว สูง ${PROFILE.heightKing} เมตร: หน้าผากโค้งมหึมาแบบวาฬหัวทุย เกราะชีวภาพสีกรมท่าและดำ ลายเรืองแสงสีฟ้ารูปซี่โครง กรงเล็บยาว และเยื่อคลุมขาดวิ่น`}
                loading="lazy"
                decoding="async"
                style={{ filter }}
                className="h-full w-auto max-w-none object-contain"
              />
              {/* callouts (desktop) */}
              <motion.ul style={{ opacity: calloutOpacity }} className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden="true">
                {CALLOUTS.map((c, i) => {
                  const right = c.side === 'right'
                  return (
                    <li key={c.id} className={`absolute ${c.cls}`} style={{ left: `${c.x}%`, top: `${c.y}%` }}>
                      <span className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-glow shadow-[0_0_14px_#3fe0ff]" />
                      <span
                        className={`absolute top-0 h-px w-20 bg-glow/70 ${right ? 'left-1.5' : 'right-1.5'}`}
                        style={{ transform: `rotate(${right ? -12 : 12}deg)`, transformOrigin: right ? 'left' : 'right' }}
                      />
                      <span
                        className={`absolute -top-9 whitespace-nowrap rounded-lg border border-glow/40 bg-abyss-950/85 px-3 py-1.5 font-display text-sm font-semibold tracking-wider text-ice ${
                          right ? 'left-24' : 'right-24'
                        }`}
                        style={{ transitionDelay: `${i * 0.1}s` }}
                      >
                        {c.name}
                      </span>
                    </li>
                  )
                })}
              </motion.ul>
            </motion.figure>
          </div>
        </div>

        {/* title & closing */}
        <div className="relative mx-auto mt-20 max-w-3xl text-center">
          <Reveal>
            <p className="font-display text-[clamp(1.4rem,3vw,2rem)] font-semibold text-glow-soft">“จงจมลงสู่ห้วงลึก… ตลอดกาล”</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 id="reveal-title" className="title-glow mt-6 text-[clamp(3rem,11vw,8rem)] leading-none">
              ABYSSAL KING
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 font-display text-[clamp(1.4rem,3vw,2.2rem)] font-semibold text-ice">ราชันแห่งห้วงลึก</p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mx-auto mt-10 h-px w-24 bg-glow/60" aria-hidden="true" />
            <p className="mt-10 text-[clamp(1.2rem,2.4vw,1.6rem)] leading-relaxed text-ice">
              ราชันแห่งห้วงลึกเป็นเพียงจินตนาการ…
              <br />
              แต่สัตว์ที่ดำดิ่งสู่ความมืดกว่า 2,000 เมตร และ <strong className="whitespace-nowrap text-glow">“มองเห็นด้วยเสียง”</strong>
              <br className="hidden sm:block" /> นั้น <strong className="text-white">มีอยู่จริง</strong>
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <a
              href="#top"
              className="mt-12 inline-flex items-center gap-2 rounded-full border border-glow/40 px-6 py-3 font-display text-lg text-glow transition hover:bg-glow/10"
            >
              <ArrowUp size={18} aria-hidden="true" /> กลับสู่ผิวน้ำ
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
