import { motion, useTransform } from 'framer-motion'
import { WHALE_PATH } from './WhaleAnatomy.jsx'

// Depth scale of the chart. The whale's travel range (TOP → BOTTOM, as a share
// of chart height) stays inside the frame so the whole illustration is visible.
const MAX = 2200
const pct = (m) => `${(m / MAX) * 100}%`
const TOP = 0.1
const BOTTOM = 0.87 // ≈ 1,914 m — past the 1,800 m "some dives" mark

const ZONES = [
  { from: 0, to: 200, name: 'Sunlight Zone', th: 'เขตแสงส่องถึง', bg: '#1d6fd6' },
  { from: 200, to: 1000, name: 'Twilight Zone', th: 'เขตแสงสลัว', bg: '#13315f' },
  { from: 1000, to: MAX, name: 'Midnight Zone', th: 'เขตมืดสนิท', bg: '#040b1a' },
]

const MARKS = [
  { m: 800, sub: '~800 m', label: 'ล่าเหยื่อโดยทั่วไป', main: true },
  { m: 1000, sub: '1,000 m', label: 'แรงดัน ≈ 100 เท่าของผิวน้ำ' },
  { m: 1800, sub: '1,800 m+', label: 'บางครั้งดำลึกกว่านี้', main: true },
]

/**
 * Ocean depth chart with a sperm whale that descends as the reader scrolls.
 * @param progress MotionValue 0→1 (scroll progress through the slides)
 */
export default function DiveChart({ progress, className = '' }) {
  const ratio = useTransform(progress, [0, 1], [TOP, BOTTOM])
  const trail = useTransform(ratio, (r) => `${r * 100}%`)
  // clamp keeps the rotated whale (half-height --wh) fully inside the frame
  const top = useTransform(ratio, (r) => `clamp(var(--wh), ${r * 100}%, calc(100% - var(--wh)))`)
  const depth = useTransform(ratio, (r) => Math.round((r * MAX) / 10) * 10)
  const depthText = useTransform(depth, (d) => `${d.toLocaleString('en-US')} m`)
  const pressureText = useTransform(depth, (d) => `≈ ${Math.round(d / 10 + 1).toLocaleString('en-US')} เท่า`)

  return (
    <figure className={`relative m-0 overflow-hidden rounded-2xl border border-glow/25 bg-abyss-950 ${className}`}>
      <div
        className="absolute inset-0"
        role="img"
        aria-label="แผนภูมิความลึก 0 ถึง 2,200 เมตร: วาฬหัวทุยมักดำลงไปล่าเหยื่อราว 800 เมตร และบางครั้งดำลึกกว่า 1,800 เมตร แรงดันน้ำเพิ่มประมาณ 1 บรรยากาศทุก 10 เมตร"
      >
        {ZONES.map((z) => (
          <div
            key={z.name}
            className="absolute inset-x-0 border-b border-white/10"
            style={{ top: pct(z.from), height: pct(z.to - z.from), background: z.bg }}
          >
            <span className="absolute right-2 top-1 z-20 whitespace-nowrap rounded bg-abyss-950/60 px-1.5 font-display text-xs font-semibold text-ice/80 sm:text-sm">
              {z.name} <span className="font-body font-normal text-silver">· {z.th}</span>
            </span>
          </div>
        ))}
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />

        {MARKS.map((mk) => (
          <div key={mk.m} className="absolute inset-x-0" style={{ top: pct(mk.m) }}>
            <div className={`h-px w-full ${mk.main ? 'bg-glow/80' : 'border-t border-dashed border-white/35'}`} />
            <p className="absolute left-3 top-1 m-0 max-w-[45%] text-xs leading-snug sm:text-sm">
              <span className={`block font-display font-bold ${mk.main ? 'text-glow' : 'text-ice'}`}>{mk.sub}</span>
              <span className="text-silver">{mk.label}</span>
            </p>
          </div>
        ))}

        {/* dive trail from the surface to the whale */}
        <motion.div
          aria-hidden="true"
          className="absolute left-[64%] top-0 w-[3px] -translate-x-1/2 rounded-full bg-gradient-to-b from-glow/10 to-glow shadow-[0_0_12px_#3fe0ff]"
          style={{ height: trail }}
        />

        {/* the whale — main visual, nose-down */}
        <motion.div
          aria-hidden="true"
          className="absolute left-[64%] w-24 -translate-x-1/2 -translate-y-1/2 [--wh:2.9rem] sm:w-32 sm:[--wh:3.8rem] lg:w-48 lg:[--wh:5.6rem]"
          style={{ top }}
        >
          <svg viewBox="30 75 960 150" className="block w-full -rotate-[62deg] drop-shadow-[0_0_14px_#3fe0ffaa]">
            <path d={WHALE_PATH} fill="#d6f6ff" />
          </svg>
        </motion.div>

        {/* live readout */}
        <div className="absolute left-3 top-[17%] z-20 rounded-xl sm:top-[11%] border border-glow/30 bg-abyss-950/85 px-3 py-2">
          <p className="m-0 hidden text-[0.7rem] uppercase tracking-[0.18em] text-mist sm:block">Depth · ความลึก</p>
          <motion.p className="m-0 font-display text-xl font-bold tabular-nums text-glow sm:text-2xl">{depthText}</motion.p>
          <p className="m-0 text-xs text-silver">
            แรงดัน <motion.span className="tabular-nums text-ice">{pressureText}</motion.span> ของผิวน้ำ
          </p>
        </div>
      </div>
    </figure>
  )
}
