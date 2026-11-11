import { motion } from 'framer-motion'
import { ease } from '../components/Reveal.jsx'
import { WHALE_PATH } from './WhaleAnatomy.jsx'
import { PROFILE } from '../data/character.js'

const MAX = 21 // metres represented by the full width (leaves room for the value label)

const ROWS = [
  { label: 'วาฬหัวทุยตัวผู้', value: 16, kind: 'whale', color: '#3fe0ff' },
  { label: 'วาฬหัวทุยตัวเมีย', value: 11, kind: 'whale', color: '#8beeff' },
  { label: 'รถโดยสารประจำทาง', value: 12, kind: 'bus', color: '#c3cedb' },
  { label: 'มนุษย์ผู้ใหญ่', value: 1.7, kind: 'human', color: '#c3cedb' },
  { label: 'ABYSSAL KING', value: PROFILE.heightKing, kind: 'human', color: '#3fe0ff', fiction: true },
]

function Shape({ kind, color }) {
  if (kind === 'whale')
    return (
      <svg viewBox="30 75 960 150" preserveAspectRatio="none" className="h-full w-full" aria-hidden="true">
        <path d={WHALE_PATH} fill={color} />
      </svg>
    )
  if (kind === 'bus')
    return (
      <svg viewBox="0 0 120 40" preserveAspectRatio="none" className="h-full w-full" aria-hidden="true">
        <rect x="0" y="4" width="120" height="28" rx="5" fill={color} />
        <circle cx="22" cy="34" r="5" fill="#040b1a" stroke={color} strokeWidth="2" />
        <circle cx="98" cy="34" r="5" fill="#040b1a" stroke={color} strokeWidth="2" />
      </svg>
    )
  return <span className="block h-full w-full rounded-sm" style={{ background: color }} />
}

export default function SizeCompare() {
  return (
    <figure className="m-0">
      <ul className="space-y-4">
        {ROWS.map((r, i) => (
          <li key={r.label} className="grid grid-cols-[minmax(0,7.5rem)_1fr] items-center gap-3 sm:grid-cols-[10rem_1fr]">
            <span className="text-base leading-tight text-silver">
              {r.label}
              {r.fiction && <span className="mt-1 block text-xs tracking-widest text-mist">(ตัวละครสมมติ)</span>}
            </span>
            <span className="flex items-center gap-3">
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: `${(r.value / MAX) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: i * 0.1, ease }}
                className={`block shrink-0 overflow-hidden ${r.kind === 'whale' ? 'h-9' : r.kind === 'bus' ? 'h-7' : 'h-7 min-w-[4px]'}`}
              >
                <Shape kind={r.kind} color={r.color} />
              </motion.span>
              <span className="whitespace-nowrap font-display font-semibold tabular-nums text-ice">
                {r.value.toLocaleString('th-TH')} ม.
              </span>
            </span>
          </li>
        ))}
      </ul>
      <figcaption className="mt-4 text-sm text-mist">ความยาวลำตัว (วาฬ, รถ) และส่วนสูง (มนุษย์) โดยประมาณ วาดตามสัดส่วนเดียวกัน</figcaption>
    </figure>
  )
}
