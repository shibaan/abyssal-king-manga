import { Microscope, Sparkles, ArrowRight, ArrowDown } from 'lucide-react'
import { Reveal, SectionHeading } from '../components/Reveal.jsx'
import Icon from '../components/Icon.jsx'
import { ABILITIES } from '../data/character.js'

const BASIS = {
  3: { label: 'อิงวิทยาศาสตร์สูง', note: 'แนวคิดหลักมีอยู่จริง แต่ถูกขยายให้เกินจริง' },
  2: { label: 'อิงบางส่วน', note: 'มีจุดเริ่มต้นจากของจริง แต่ส่วนใหญ่เป็นการแต่งเติม' },
  1: { label: 'แฟนตาซีเป็นหลัก', note: 'ได้แรงบันดาลใจเพียงเล็กน้อย ส่วนใหญ่เป็นจินตนาการ' },
}

function BasisMeter({ level }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-sm text-mist">ฐานทางวิทยาศาสตร์</span>
      <span className="flex gap-1" aria-hidden="true">
        {[1, 2, 3].map((i) => (
          <span key={i} className={`h-2.5 w-8 rounded-full ${i <= level ? 'bg-glow shadow-[0_0_8px_#3fe0ff99]' : 'bg-white/12'}`} />
        ))}
      </span>
      <span className="font-display text-base font-semibold text-ice">
        {BASIS[level].label}
        <span className="sr-only"> ({level} จาก 3)</span>
      </span>
    </div>
  )
}

export default function BioToFiction() {
  return (
    <section id="powers" aria-labelledby="powers-title" className="section-shell">
      <div className="container-wide">
        <SectionHeading
          index="03"
          eyebrow="Biology → Fiction"
          id="powers-title"
          title="จากชีววิทยาจริง สู่พลังในจินตนาการ"
          lead="พลังทั้ง 7 ของ ABYSSAL KING เริ่มต้นจากความสามารถจริงของวาฬหัวทุย — ดูให้ชัดว่าส่วนไหนจริง ส่วนไหนแต่ง"
        />

        {/* legend */}
        <Reveal className="mb-10 grid gap-4 sm:grid-cols-2">
          <div className="flex items-start gap-4 rounded-2xl border border-glow/30 bg-glow/5 p-5">
            <span className="tag-real">
              <Microscope size={16} aria-hidden="true" /> Real Biology
            </span>
            <p className="text-base text-silver">ข้อเท็จจริงทางวิทยาศาสตร์ที่ตรวจสอบได้</p>
          </div>
          <div className="flex items-start gap-4 rounded-2xl border border-dashed border-silver/40 bg-white/[0.03] p-5">
            <span className="tag-fiction">
              <Sparkles size={16} aria-hidden="true" /> Fictional Ability
            </span>
            <p className="text-base text-silver">พลังที่แต่งขึ้นสำหรับตัวละคร ไม่ใช่เรื่องจริง</p>
          </div>
        </Reveal>

        <ol className="space-y-5">
          {ABILITIES.map((a, i) => (
            <Reveal as="li" key={a.id} delay={0.04} className="glass overflow-hidden rounded-3xl">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-glow/10 px-5 py-4 md:px-8">
                <span className="font-display text-sm font-bold tabular-nums text-mist">0{i + 1}</span>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-glow/12 text-glow ring-1 ring-glow/30">
                  <Icon name={a.icon} size={22} />
                </span>
                <h3 className="text-xl font-bold text-white md:text-2xl">
                  <span lang="en" className="font-title tracking-wide">
                    {a.name}
                  </span>
                  <span className="block font-display text-base font-medium text-silver sm:ml-3 sm:inline md:text-lg">{a.th}</span>
                </h3>
              </div>

              <div className="grid md:grid-cols-[1fr_auto_1fr]">
                <div className="p-5 md:p-8">
                  <span className="tag-real">
                    <Microscope size={15} aria-hidden="true" /> Real Biology
                  </span>
                  <p className="mt-3 text-ice">{a.real}</p>
                </div>
                <div className="flex items-center justify-center text-glow" aria-hidden="true">
                  <ArrowRight size={28} className="hidden md:block" />
                  <ArrowDown size={24} className="md:hidden" />
                </div>
                <div className="border-t border-dashed border-silver/25 bg-white/[0.02] p-5 md:border-l md:border-t-0 md:p-8">
                  <span className="tag-fiction">
                    <Sparkles size={15} aria-hidden="true" /> Fictional Ability
                  </span>
                  <p className="mt-3 text-ice">{a.fiction}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-glow/10 px-5 py-4 md:px-8">
                <BasisMeter level={a.basis} />
                <p className="text-sm text-mist">{BASIS[a.basis].note}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-10 rounded-3xl border border-glow/25 bg-gradient-to-br from-abyss-700/60 to-abyss-900/60 p-6 text-center md:p-10">
          <p className="text-lg text-ice md:text-xl">
            <strong className="text-glow">สรุป:</strong> ความสามารถที่ “อิงวิทยาศาสตร์สูง” มาจากการปรับตัวจริงของวาฬ —
            แต่ไม่มีสิ่งมีชีวิตจริงใดยิงคลื่นเสียงทำลายเหล็ก หรือควบคุมแรงดันน้ำได้ด้วยใจ
          </p>
        </Reveal>
      </div>
    </section>
  )
}
