import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { ART } from '../data/character.js'
import { SectionHeading, ease } from '../components/Reveal.jsx'
import { DnaArt, ShatterArt } from '../components/MangaArt.jsx'

const panelVariants = {
  hidden: { clipPath: 'inset(0 0 100% 0)', opacity: 0.2 },
  show: (i = 0) => ({
    clipPath: 'inset(0 0 0% 0)',
    opacity: 1,
    transition: { duration: 0.9, delay: i * 0.12, ease },
  }),
}
const innerVariants = {
  hidden: { scale: 1.14 },
  show: (i = 0) => ({ scale: 1, transition: { duration: 1.4, delay: i * 0.12, ease } }),
}
const popVariants = {
  hidden: { opacity: 0, scale: 0.7, y: 10 },
  show: (d = 0.5) => ({ opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 18, delay: d } }),
}

/** One manga panel: white border frame, wipes in when it scrolls into view. */
function Panel({ i = 0, className = '', art, alt, position = 'center', children, svg, tone }) {
  return (
    <motion.figure
      variants={panelVariants}
      custom={i}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -15% 0px' }}
      className={`relative m-0 overflow-hidden border-[3px] border-[#e8f4ff] bg-abyss-900 shadow-[0_0_0_3px_#02060f,0_18px_50px_-20px_#000] ${className}`}
    >
      <div aria-hidden="true" className="halftone absolute inset-0 opacity-[0.12]" />
      <motion.div variants={innerVariants} custom={i} className="absolute inset-0">
        {svg ??
          (art && (
            <img
              src={art.src}
              width={art.w}
              height={art.h}
              alt={alt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
              style={{ objectPosition: position }}
            />
          ))}
      </motion.div>
      {tone && <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${tone}`} />}
      {svg && alt && <span className="sr-only">{alt}</span>}
      {children}
    </motion.figure>
  )
}

function Caption({ className = '', delay = 0.6, children }) {
  return (
    <motion.figcaption variants={popVariants} custom={delay} className={`manga-caption absolute z-10 ${className}`}>
      {children}
    </motion.figcaption>
  )
}

function Bubble({ className = '', dark = false, delay = 0.8, children }) {
  return (
    <motion.p
      variants={popVariants}
      custom={delay}
      className={`manga-bubble absolute z-10 m-0 text-[clamp(0.98rem,1.5vw,1.2rem)] ${dark ? 'manga-bubble--dark' : ''} ${className}`}
    >
      {children}
    </motion.p>
  )
}

function Sfx({ className = '', delay = 0.4, children }) {
  return (
    <motion.span
      aria-hidden="true"
      variants={{
        hidden: { opacity: 0, scale: 2.2, rotate: -14 },
        show: { opacity: 1, scale: 1, rotate: -8, transition: { duration: 0.45, delay, ease: [0.3, 1.6, 0.5, 1] } },
      }}
      className={`sfx absolute z-10 font-display ${className}`}
    >
      {children}
    </motion.span>
  )
}

const speedLines =
  'bg-[repeating-conic-gradient(from_0deg_at_50%_55%,#fff0_0deg_5deg,#e9fbff26_5deg_6deg)] [mask-image:radial-gradient(circle_at_50%_55%,transparent_28%,#000_75%)]'

export default function MangaStory() {
  return (
    <section id="story" aria-labelledby="story-title" className="section-shell">
      <div className="container-wide">
        <SectionHeading
          index="01"
          eyebrow="Manga Origin"
          id="story-title"
          title="ต้นกำเนิดแห่งราชัน"
          lead="ก่อนจะเป็นราชันแห่งห้วงลึก… เขาเคยเป็นมนุษย์ธรรมดาคนหนึ่ง"
        />

        {/* ───────── PAGE 1 — the human & Project Leviathan ───────── */}
        <div className="grid grid-cols-12 gap-3 md:gap-4">
          <Panel
            i={0}
            art={ART.humanScientist}
            alt="ชายหนุ่มผมดำ ดวงตาสีฟ้า สวมเสื้อสีดำและเสื้อกาวน์ เงยหน้ามองท้องฟ้า"
            position="50% 25%"
            className="col-span-12 aspect-[4/5] sm:aspect-[16/11] md:col-span-5 md:aspect-auto md:h-[36rem]"
          >
            <Caption className="left-3 top-3 max-w-[78%] text-[clamp(1rem,1.6vw,1.2rem)] md:max-w-[85%]">
              <strong className="block text-[1.15em]">ก่อนหน้านี้…</strong>
              เขาเป็นเพียงนักวิทยาศาสตร์หนุ่ม ผู้เฉลียวฉลาดและใฝ่หาความจริงของมหาสมุทร
            </Caption>
            <Bubble className="bottom-4 right-3 max-w-[62%]" delay={1}>
              “คำตอบทั้งหมด… ซ่อนอยู่ในห้วงลึก”
            </Bubble>
          </Panel>

          <Panel
            i={1}
            art={ART.labTank}
            alt="ห้องทดลองลับใต้ทะเล นักวิทยาศาสตร์ในชุดป้องกันยืนมองร่างมนุษย์ในถังของเหลวเรืองแสงสีฟ้า"
            position="35% 40%"
            className="col-span-12 aspect-[4/5] sm:aspect-[16/11] md:col-span-7 md:aspect-auto md:h-[36rem]"
            tone="bg-gradient-to-l from-abyss-950/90 via-abyss-950/20 to-transparent"
          >
            <Caption className="right-3 top-3 max-w-[80%] text-[clamp(1rem,1.6vw,1.2rem)] sm:max-w-[60%]">
              <strong className="block font-title text-[1.1em] tracking-wider">PROJECT LEVIATHAN</strong>
              การทดลองลับใต้ทะเลลึก ผสาน DNA ของวาฬหัวทุยเข้ากับร่างมนุษย์ เพื่อสร้างสิ่งมีชีวิตที่แข็งแกร่งที่สุด
            </Caption>
          </Panel>

          <Panel
            i={0}
            className="col-span-12 bg-abyss-950"
            svg={<div className="halftone h-full w-full opacity-[0.15]" />}
          >
            <div className="relative z-10 px-6 py-10 text-center md:py-14">
              <motion.p variants={popVariants} custom={0.4} className="font-display text-[clamp(1.25rem,2.6vw,1.9rem)] text-silver">
                อาสาสมัครทุกคนล้มเหลว…
              </motion.p>
              <motion.p variants={popVariants} custom={0.9} className="mt-3 font-display text-[clamp(1.45rem,3.2vw,2.4rem)] font-bold text-white">
                จนกระทั่งเขาตัดสินใจใช้ <span className="text-glow">ร่างของตัวเอง</span> เป็นผู้ทดลองคนสุดท้าย
              </motion.p>
            </div>
          </Panel>
        </div>

        {/* ───────── PAGE 2 — transformation ───────── */}
        <div className="mt-3 grid grid-cols-12 gap-3 md:mt-4 md:gap-4">
          <Panel
            i={0}
            art={ART.transformScream}
            alt="ชายหนุ่มกรีดร้องด้วยความเจ็บปวด ดวงตาเรืองแสงสีฟ้า เส้นพลังงานสีฟ้าแผ่ขึ้นตามลำคอและใบหน้า"
            position="50% 70%"
            className="col-span-12 aspect-[16/11] md:col-span-8 md:aspect-auto md:h-[28rem]"
            tone={speedLines}
          >
            <Bubble className="left-3 top-3 max-w-[58%] md:left-5 md:top-5 md:max-w-[46%]" delay={0.7}>
              “นี่มัน… เกิดอะไรขึ้นกับร่างกายของผมกัน?!”
            </Bubble>
            <Sfx className="bottom-3 right-4 text-[clamp(2.4rem,6vw,4.8rem)]">ครืนนน!!</Sfx>
          </Panel>

          <Panel
            i={1}
            svg={<DnaArt />}
            alt="ภาพเกลียว DNA เรืองแสงสีฟ้า ซ้อนกับเงาของวาฬหัวทุย"
            className="col-span-12 aspect-[16/11] md:col-span-4 md:aspect-auto md:h-[28rem]"
          >
            <Caption className="bottom-3 left-3 right-3 text-[clamp(1rem,1.5vw,1.15rem)]" delay={0.8}>
              DNA ของวาฬเริ่ม <strong>เขียนร่างกายของเขาใหม่</strong> — กระดูก กล้ามเนื้อ และกะโหลก
            </Caption>
          </Panel>

          <Panel
            i={0}
            art={ART.awakenedEye}
            alt="ภาพระยะใกล้ของดวงตาเรืองแสงสีฟ้า ใต้หมวกเกราะสีดำรูปหน้าผากวาฬ"
            position="40% 50%"
            className="col-span-12 aspect-[16/9] md:aspect-auto md:h-[24rem]"
            tone="bg-gradient-to-r from-transparent via-transparent to-abyss-950/85"
          >
            <Bubble dark className="bottom-4 right-3 max-w-[64%] md:right-8 md:top-1/2 md:bottom-auto md:max-w-[34%] md:-translate-y-1/2" delay={0.9}>
              “มนุษย์… ไม่ใช่สิ่งมีชีวิตที่ฉันต้องการอีกต่อไป”
            </Bubble>
          </Panel>
        </div>

        {/* ───────── PAGE 3 — breakout ───────── */}
        <div className="mt-3 grid grid-cols-12 gap-3 md:mt-4 md:gap-4">
          <Panel
            i={0}
            svg={<ShatterArt />}
            alt="ถังทดลองแตกกระจาย เงาร่างยักษ์ที่มีหน้าผากโค้งมหึมาก้าวออกมาท่ามกลางแสงสีฟ้าและไฟเตือนสีแดง"
            className="col-span-12 aspect-[4/5] sm:aspect-[16/11] md:col-span-5 md:aspect-auto md:h-[32rem]"
          >
            <Sfx className="right-3 top-6 text-[clamp(2.4rem,6vw,4.2rem)]" delay={0.3}>
              เพล้ง!!
            </Sfx>
            <Caption className="bottom-12 left-3 max-w-[85%] text-[clamp(1rem,1.5vw,1.15rem)]" delay={0.9}>
              การทดลองที่ผิดพลาด ได้เปลี่ยนเขา… <strong>ตลอดไป</strong>
            </Caption>
          </Panel>

          <Panel
            i={1}
            art={ART.kingRoar}
            alt="ABYSSAL KING ในหมวกเกราะหน้าผากวาฬ คำรามด้วยดวงตาเรืองแสงสีฟ้า"
            position="50% 40%"
            className="col-span-12 aspect-[16/10] md:col-span-7 md:aspect-auto md:h-[32rem]"
            tone="bg-[linear-gradient(160deg,#1d6fd655,#02060f88)] mix-blend-multiply"
          >
            <Caption className="bottom-3 left-3 max-w-[85%] text-[clamp(1rem,1.5vw,1.15rem)] md:max-w-[60%]" delay={0.7}>
              คืนนั้น ฐานวิจัยทั้งหมด <strong>จมหายลงสู่ก้นทะเล</strong>
            </Caption>
          </Panel>
        </div>

        {/* ───────── SPLASH — the reveal ───────── */}
        <Panel
          i={0}
          art={ART.kingReveal}
          alt="ABYSSAL KING ร่างยักษ์กล้ามเป็นมัด สวมเกราะชีวภาพสีกรมท่าและดำ ลายเรืองแสงสีฟ้ารูปซี่โครงบนอก หน้าผากโค้งมหึมาแบบวาฬหัวทุย ยื่นกรงเล็บออกมาใต้ทะเล"
          position="62% 18%"
          className="mt-3 aspect-[3/4] w-full sm:aspect-[4/3] md:mt-4 md:aspect-auto md:h-[min(100vh,58rem)]"
          tone="bg-gradient-to-t from-abyss-950 via-abyss-950/10 to-transparent"
        >
          <Bubble className="right-3 top-4 max-w-[52%] md:left-10 md:right-auto md:top-14 md:max-w-[22%]" delay={0.6}>
            “นี่คือจุดจบของมนุษยชาติ…”
          </Bubble>
          <motion.div
            variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 1.1, delay: 1.1, ease } } }}
            className="absolute inset-x-0 bottom-0 z-10 p-5 md:p-10"
          >
            <p className="eyebrow">Subject 00 · Awakened</p>
            <p className="title-glow mt-2 text-[clamp(2.6rem,8vw,6.5rem)] leading-none">ABYSSAL KING</p>
            <p className="mt-3 font-display text-[clamp(1.3rem,2.6vw,2rem)] font-semibold text-glow-soft">ราชันแห่งห้วงลึก</p>
          </motion.div>
        </Panel>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="mx-auto mt-16 max-w-2xl text-center"
        >
          <p className="font-title text-sm tracking-[0.4em] text-mist">END OF CHAPTER 01</p>
          <p className="mt-4 text-xl text-ice md:text-2xl">
            ตัวละครนี้เป็นเรื่องแต่ง… แต่พลังของเขาได้แรงบันดาลใจจาก
             <strong className="whitespace-nowrap text-glow">สิ่งมีชีวิตที่มีอยู่จริง</strong>
          </p>
          <a
            href="#biology"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-glow/40 px-6 py-3 font-display text-lg text-glow transition hover:bg-glow/10"
          >
            รู้จักวาฬหัวทุยตัวจริง <ArrowDown size={18} aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
