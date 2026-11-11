import { useRef, useState } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { Bone, Wind, Droplet, Dumbbell, HeartPulse } from 'lucide-react'
import DiveChart from '../diagrams/DiveChart.jsx'

/*
 * "การดำน้ำลึกและการทนแรงดัน" — three scroll-driven slides.
 * The depth chart is sticky inside this component's grid only, so it can never
 * pin past the end of the section. Scroll progress through the slides drives
 * the whale from the surface to the bottom of the chart.
 */

function Slide({ n, en, title, active, children }) {
  return (
    <article
      aria-current={active ? 'step' : undefined}
      className={`flex min-h-[62svh] flex-col justify-center py-10 transition-opacity duration-500 lg:min-h-[72vh] ${
        active ? 'opacity-100' : 'opacity-30'
      }`}
    >
      <p className="flex items-center gap-3 font-display text-sm font-semibold uppercase tracking-[0.22em] text-mist">
        <span className="tabular-nums text-glow">{n}</span>
        <span className="h-px w-8 bg-glow/50" aria-hidden="true" />
        <span lang="en">{en}</span>
      </p>
      <h4 className="mt-3 text-[clamp(1.8rem,4vw,2.6rem)] font-bold leading-tight text-white">{title}</h4>
      <div className="mt-6">{children}</div>
    </article>
  )
}

function Fact({ icon: Icon, th, en, children }) {
  return (
    <li className="flex gap-4">
      <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-glow/12 text-glow ring-1 ring-glow/30">
        <Icon size={22} aria-hidden="true" />
      </span>
      <div>
        <p className="m-0 text-xl font-semibold text-ice md:text-2xl">
          {th} <span lang="en" className="ml-1 align-middle text-sm font-normal tracking-wide text-mist">{en}</span>
        </p>
        <p className="m-0 mt-1 text-lg text-silver">{children}</p>
      </div>
    </li>
  )
}

/** Small surface-vs-depth illustration: lungs collapse, ribs flex inward. */
function LungDiagram() {
  const Body = ({ x, label, squeeze }) => (
    <g transform={`translate(${x} 0)`}>
      <ellipse cx="80" cy="74" rx={62 - squeeze * 14} ry="52" fill="none" stroke="#c3cedb" strokeWidth="3" strokeDasharray="10 7" />
      <ellipse cx="80" cy="74" rx={34 - squeeze * 26} ry={30 - squeeze * 20} fill="#3fe0ff" fillOpacity="0.55" stroke="#3fe0ff" strokeWidth="2" />
      <text x="80" y="150" textAnchor="middle" fontFamily="Kanit, sans-serif" fontSize="17" fill="#d6f6ff">{label}</text>
    </g>
  )
  return (
    <svg viewBox="0 0 360 160" className="block w-full max-w-md" role="img" aria-label="เปรียบเทียบที่ผิวน้ำและที่ความลึก: ซี่โครงยุบเข้าตามแรงดัน และปอดยุบตัวเล็กลงมาก">
      <Body x={0} label="ที่ผิวน้ำ" squeeze={0} />
      <path d="M170 74 L196 74 M188 66 L198 74 L188 82" stroke="#3fe0ff" strokeWidth="3" fill="none" strokeLinecap="round" />
      <Body x={200} label="ที่ความลึก" squeeze={1} />
    </svg>
  )
}

export default function DeepDive() {
  const slidesRef = useRef(null)
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({ target: slidesRef, offset: ['start 0.8', 'end 0.95'] })
  useMotionValueEvent(scrollYProgress, 'change', (v) => setActive(Math.min(2, Math.floor(v * 3))))

  return (
    <div className="grid gap-x-10 lg:grid-cols-[1fr_1fr]">
      {/* Sticky depth chart: top of the section on mobile/tablet, right column on desktop.
          Sticky is scoped to this grid, so it releases exactly at the section's end. */}
      <div className="sticky top-16 z-10 -mx-2 bg-abyss-800/95 px-2 pb-3 pt-2 lg:order-2 lg:top-24 lg:mx-0 lg:self-start lg:bg-transparent lg:p-0">
        <DiveChart progress={scrollYProgress} className="h-[44svh] lg:h-[min(42rem,calc(100vh-8rem))]" />
      </div>

      <div ref={slidesRef} className="lg:order-1">
        <Slide n="01" en="Deep Dive" title="ดำดิ่งลงไปล่าเหยื่อ" active={active === 0}>
          <dl className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-glow/25 bg-glow/5 p-5">
              <dt className="text-base text-silver">ความลึกโดยทั่วไป</dt>
              <dd className="m-0 font-display text-[clamp(2.2rem,5vw,3.2rem)] font-bold leading-tight text-glow">~800 ม.</dd>
            </div>
            <div className="rounded-2xl border border-glow/25 bg-glow/5 p-5">
              <dt className="text-base text-silver">เวลาดำโดยทั่วไป</dt>
              <dd className="m-0 font-display text-[clamp(2.2rem,5vw,3.2rem)] font-bold leading-tight text-glow">~50 นาที</dd>
            </div>
          </dl>
          {/* duration bar: 0–70 min */}
          <div className="mt-6" role="img" aria-label="ระยะเวลาดำน้ำ: โดยทั่วไปราว 50 นาที บางครั้งนานกว่า 1 ชั่วโมง">
            <div className="relative h-3 rounded-full bg-white/10">
              <div className="absolute inset-y-0 left-0 w-[71%] rounded-full bg-gradient-to-r from-tide to-glow" />
              <div className="absolute inset-y-0 left-[71%] w-[22%] rounded-r-full border-2 border-dashed border-glow/60 border-l-0" />
            </div>
            <div className="relative mt-2 h-6 text-sm text-mist">
              <span className="absolute left-0">0</span>
              <span className="absolute left-[71%] -translate-x-1/2 font-semibold text-glow">50 นาที</span>
              <span className="absolute right-0">60+ นาที</span>
            </div>
          </div>
          <p className="mt-6 text-lg text-ice">
            บางครั้งดำลึกกว่า <strong className="whitespace-nowrap text-glow">1,800 ม.</strong> และนานกว่า{' '}
            <strong className="whitespace-nowrap text-glow">1 ชั่วโมง</strong>
          </p>
        </Slide>

        <Slide n="02" en="Pressure Adaptation" title="ยอมให้ถูกบีบ แต่ไม่บาดเจ็บ" active={active === 1}>
          <ul className="m-0 list-none space-y-5 p-0">
            <Fact icon={Bone} th="ซี่โครงยืดหยุ่น" en="Flexible rib cage">
              ยุบเข้าตามแรงดันน้ำได้ โดยไม่หัก
            </Fact>
            <Fact icon={Wind} th="ปอดยุบตัวได้อย่างปลอดภัย" en="Lung collapse">
              อากาศถูกบีบออกจากถุงลม ไนโตรเจนจึงซึมเข้าเลือดน้อยลง
            </Fact>
          </ul>
          <div className="mt-6">
            <LungDiagram />
          </div>
        </Slide>

        <Slide n="03" en="Oxygen Reserve" title="คลังออกซิเจนในร่างกาย" active={active === 2}>
          <p className="mb-5 text-lg text-silver">ออกซิเจนส่วนใหญ่ไม่ได้เก็บในปอด แต่เก็บใน <strong className="text-ice">เลือดและกล้ามเนื้อ</strong></p>
          <ul className="m-0 list-none space-y-5 p-0">
            <Fact icon={Droplet} th="ฮีโมโกลบิน" en="Hemoglobin">
              ลำเลียงออกซิเจนไปในเลือด
            </Fact>
            <Fact icon={Dumbbell} th="ไมโอโกลบิน" en="Myoglobin">
              เก็บออกซิเจนไว้ในกล้ามเนื้อ
            </Fact>
            <Fact icon={HeartPulse} th="หัวใจเต้นช้าลง" en="Bradycardia">
              ระหว่างดำน้ำ ช่วยประหยัดออกซิเจน
            </Fact>
          </ul>
        </Slide>
      </div>
    </div>
  )
}
