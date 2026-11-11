import { useId, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Fingerprint, Brain, Swords, Skull, TriangleAlert, ScanLine, ShieldAlert, MapPin, Siren, Crosshair, Lock } from 'lucide-react'
import { SectionHeading, Reveal, ease } from '../components/Reveal.jsx'
import Icon from '../components/Icon.jsx'
import { ART, PROFILE, PERSONALITY, ABILITIES, ULTIMATES, WEAKNESSES, ANATOMY, THREAT } from '../data/character.js'

const TABS = [
  { id: 'profile', label: 'PROFILE', th: 'ประวัติ', icon: Fingerprint },
  { id: 'personality', label: 'PERSONALITY', th: 'บุคลิก', icon: Brain },
  { id: 'abilities', label: 'ABILITIES', th: 'ความสามารถ', icon: ScanLine, count: ABILITIES.length },
  { id: 'ultimates', label: 'ULTIMATE MOVES', th: 'ท่าไม้ตาย', icon: Swords, count: ULTIMATES.length },
  { id: 'weaknesses', label: 'WEAKNESSES', th: 'จุดอ่อน', icon: Skull, count: WEAKNESSES.length },
  { id: 'anatomy', label: 'ANATOMY', th: 'กายวิภาค', icon: Crosshair },
  { id: 'threat', label: 'THREAT REPORT', th: 'รายงานภัย', icon: TriangleAlert },
]

/** Black & white sheet art tinted into the site palette. */
function Tinted({ art, alt, className = '', position = 'center' }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
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
      <div aria-hidden="true" className="absolute inset-0 bg-[#1d4680] mix-blend-color" />
      <div aria-hidden="true" className="scanlines absolute inset-0" />
    </div>
  )
}

function Row({ k, children }) {
  return (
    <div className="grid gap-1 border-b border-glow/10 py-3 sm:grid-cols-[11rem_1fr] sm:gap-4">
      <dt className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-mist">{k}</dt>
      <dd className="m-0 text-ice">{children}</dd>
    </div>
  )
}

function ProfileTab() {
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,24rem)_1fr]">
      <div className="grid grid-cols-2 content-start gap-3 sm:gap-4">
        <figure className="m-0">
          <Tinted art={ART.humanPortrait} alt="ร่างมนุษย์: ชายหนุ่มผมดำยุ่ง ดวงตาเย็นชา สวมเสื้อสีดำ" className="aspect-[3/4] rounded-xl ring-1 ring-silver/20" position="50% 42%" />
          <figcaption className="mt-2 font-display text-sm tracking-widest text-mist">BEFORE · HUMAN</figcaption>
        </figure>
        <figure className="m-0">
          <Tinted art={ART.kingFace} alt="ร่างหลังกลายพันธุ์: ใบหน้าใต้หน้าผากโค้งมหึมา ดวงตาเรืองแสงสีฟ้า" className="aspect-[3/4] rounded-xl ring-1 ring-glow/40" position="50% 55%" />
          <figcaption className="mt-2 font-display text-sm tracking-widest text-glow">AFTER · ABYSSAL</figcaption>
        </figure>
        <p className="col-span-2 rounded-xl border border-glow/15 bg-abyss-950/60 p-3 text-sm text-silver">
          ภาพถ่ายจากกล้องวงจรปิดของฐานวิจัย ก่อนและหลังการทดลอง
        </p>
      </div>
      <dl className="m-0">
        <Row k="Name">
          <span className="font-title text-xl font-bold tracking-wider text-white">{PROFILE.name}</span>
        </Row>
        <Row k="Title">{PROFILE.thaiTitle}</Row>
        <Row k="Quirk">
          <span className="font-display font-semibold text-glow">{PROFILE.quirk}</span>
        </Row>
        <Row k="Former identity">{PROFILE.formerIdentity}</Row>
        <Row k="Real name">
          <span className="inline-block rounded bg-ice px-2 text-abyss-950" aria-label={`ชื่อจริง: ${PROFILE.realName}`}>
            ███████ <span className="text-sm font-semibold">[{PROFILE.realName}]</span>
          </span>
        </Row>
        <Row k="Origin">{PROFILE.origin}</Row>
        <Row k="Species">{PROFILE.species}</Row>
        <Row k="Status">
          <span className="inline-flex items-center gap-2 text-danger">
            <span className="h-2 w-2 animate-pulse rounded-full bg-danger" aria-hidden="true" /> {PROFILE.status}
          </span>
        </Row>
      </dl>
    </div>
  )
}

function PersonalityTab() {
  return (
    <div>
      <ul className="flex flex-wrap gap-2.5">
        {PERSONALITY.traits.map((t) => (
          <li key={t.en} className="rounded-full border border-glow/30 bg-glow/8 px-4 py-2">
            <span className="font-display font-semibold text-glow">{t.th}</span>
            <span lang="en" className="ml-2 text-sm tracking-widest text-mist">
              {t.en}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-lg text-ice">{PERSONALITY.summary}</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {PERSONALITY.quotes.map((q) => (
          <blockquote key={q} className="m-0 rounded-2xl border-l-4 border-glow bg-abyss-950/60 p-5 font-display text-xl font-semibold text-white">
            {q}
          </blockquote>
        ))}
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          ['เป้าหมาย', 'ครอบครองโลกจากใต้ทะเลลึก'],
          ['วิธีคิด', 'วางแผนเป็นขั้นตอน ไม่เคยรีบร้อน'],
          ['มองมนุษย์', '“การทดลองที่จบไปแล้ว”'],
        ].map(([k, v]) => (
          <div key={k} className="rounded-2xl border border-glow/15 p-4">
            <p className="text-sm text-mist">{k}</p>
            <p className="mt-1 font-semibold text-ice">{v}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function AbilitiesTab() {
  return (
    <ol className="grid gap-3 sm:grid-cols-2">
      {ABILITIES.map((a, i) => (
        <li key={a.id} className="flex gap-4 rounded-2xl border border-glow/15 bg-abyss-950/50 p-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-glow/12 text-glow">
            <Icon name={a.icon} size={22} />
          </span>
          <div>
            <p className="font-display text-sm tabular-nums text-mist">ABILITY 0{i + 1}</p>
            <h4 lang="en" className="font-title text-lg font-bold tracking-wide text-white">
              {a.name}
            </h4>
            <p className="text-sm font-semibold text-glow-soft">{a.th}</p>
            <p className="mt-1 text-base text-silver">{a.desc}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

function UltimatesTab() {
  return (
    <ol className="space-y-3">
      {ULTIMATES.map((u, i) => (
        <li key={u.name} className="relative overflow-hidden rounded-2xl border border-glow/20 bg-gradient-to-r from-abyss-700/50 to-abyss-950/60 p-5">
          <span aria-hidden="true" className="absolute -right-2 -top-6 font-title text-[6rem] font-black leading-none text-glow/[0.07]">
            {i + 1}
          </span>
          <p className="font-display text-sm font-semibold tracking-[0.2em] text-glow">ULTIMATE · 0{i + 1}</p>
          <h4 lang="en" className="mt-1 font-title text-xl font-black tracking-wide text-white md:text-2xl">
            {u.name}
          </h4>
          <p className="mt-2 text-ice">{u.desc}</p>
          <p className="mt-2 text-sm text-mist">แรงบันดาลใจ: {u.inspired}</p>
        </li>
      ))}
    </ol>
  )
}

function WeaknessesTab() {
  return (
    <ol className="space-y-3">
      {WEAKNESSES.map((w, i) => (
        <li key={w.name} className="flex gap-4 rounded-2xl border border-danger/30 bg-danger/[0.06] p-5">
          <span className="font-display text-2xl font-bold tabular-nums text-danger">0{i + 1}</span>
          <div>
            <h4 className="text-lg font-bold text-white">
              <span lang="en" className="font-title tracking-wide">
                {w.name}
              </span>
              <span className="ml-2 font-display text-base font-medium text-silver">{w.th}</span>
            </h4>
            <p className="mt-1 text-base text-silver">{w.desc}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

function AnatomyTab() {
  const [active, setActive] = useState(ANATOMY[0].id)
  const current = ANATOMY.find((a) => a.id === active)
  const specs = [
    ['ส่วนสูง', `${PROFILE.heightKing} ม. (ร่างมนุษย์ ${PROFILE.heightHuman} ม.)`],
    ['น้ำหนัก', 'ประมาณ 1.2 ตัน'],
    ['ผิวกาย', 'เกราะชีวภาพสีกรมท่า–ดำ'],
    ['ลายพลังงาน', 'เรืองแสงสีฟ้า (cyan)'],
  ]
  return (
    <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div className="relative mx-auto w-full max-w-sm">
        <div aria-hidden="true" className="absolute inset-x-[15%] top-[10%] h-[60%] rounded-full bg-tide/30 blur-3xl" />
        <img
          src={ART.kingCutout.src}
          width={ART.kingCutout.w}
          height={ART.kingCutout.h}
          alt="ABYSSAL KING เต็มตัว สำหรับระบุตำแหน่งกายวิภาค"
          loading="lazy"
          decoding="async"
          className="relative w-full [filter:drop-shadow(0_0_14px_#1d6fd688)]"
        />
        {ANATOMY.map((p, i) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setActive(p.id)}
            aria-pressed={active === p.id}
            aria-label={p.name}
            className={`absolute flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 font-display text-sm font-bold transition ${
              active === p.id
                ? 'scale-110 border-white bg-glow text-abyss-950 shadow-[0_0_20px_#3fe0ff]'
                : 'border-glow bg-abyss-950/85 text-glow hover:bg-glow/20'
            }`}
            style={{ left: `${p.x}%`, top: `${Math.max(p.y, 3)}%` }}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <div>
        <div className="min-h-[9rem] rounded-2xl border border-glow/30 bg-glow/5 p-5" aria-live="polite">
          <p className="font-display text-sm tracking-[0.2em] text-mist">SELECTED</p>
          <h4 lang="en" className="mt-1 font-title text-xl font-bold tracking-wide text-glow">
            {current.name}
          </h4>
          <p className="mt-2 text-ice">{current.desc}</p>
        </div>
        <ul className="mt-4 grid gap-2">
          {ANATOMY.map((p, i) => (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => setActive(p.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition ${
                  active === p.id ? 'bg-glow/12 text-white' : 'text-silver hover:bg-white/5'
                }`}
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-glow/60 font-display text-sm text-glow">
                  {i + 1}
                </span>
                <span lang="en" className="font-display text-base">
                  {p.name}
                </span>
              </button>
            </li>
          ))}
        </ul>
        <dl className="mt-5 grid grid-cols-2 gap-3">
          {specs.map(([k, v]) => (
            <div key={k} className="rounded-xl border border-glow/15 p-3">
              <dt className="text-sm text-mist">{k}</dt>
              <dd className="m-0 mt-0.5 text-base font-semibold text-ice">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}

function ThreatTab() {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-5 rounded-2xl border border-danger/40 bg-danger/[0.08] p-5">
        <ShieldAlert size={44} className="text-danger" aria-hidden="true" />
        <div>
          <p className="font-display text-sm tracking-[0.25em] text-mist">THREAT LEVEL</p>
          <p className="font-title text-3xl font-black tracking-wider text-danger md:text-4xl">{THREAT.level}</p>
          <p className="font-display text-lg text-ice">ระดับ: {THREAT.levelTh}</p>
        </div>
        <div className="ml-auto flex gap-1.5" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="h-8 w-3 rounded-sm bg-danger shadow-[0_0_10px_#ff5a6e88]" />
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <div>
          <h4 className="font-display text-lg font-semibold text-ice">ค่าประเมินความสามารถ</h4>
          <ul className="mt-3 space-y-3">
            {THREAT.stats.map((s, i) => (
              <li key={s.label}>
                <div className="flex items-baseline justify-between gap-3 text-base">
                  <span>
                    <span lang="en" className="font-display font-semibold text-ice">
                      {s.label}
                    </span>
                    <span className="ml-2 text-sm text-mist">{s.th}</span>
                  </span>
                  <span className="font-display font-bold tabular-nums text-glow">{s.value}</span>
                </div>
                <div className="mt-1 h-2.5 overflow-hidden rounded-full bg-white/10" role="presentation">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${s.value}%` }}
                    transition={{ duration: 1, delay: 0.1 + i * 0.08, ease }}
                    className="h-full rounded-full bg-gradient-to-r from-tide to-glow"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-5">
          <div>
            <h4 className="flex items-center gap-2 font-display text-lg font-semibold text-ice">
              <MapPin size={18} className="text-glow" aria-hidden="true" /> พบเห็นล่าสุด
            </h4>
            <p className="mt-1 text-silver">{THREAT.lastSeen}</p>
          </div>
          <div>
            <h4 className="flex items-center gap-2 font-display text-lg font-semibold text-ice">
              <Siren size={18} className="text-danger" aria-hidden="true" /> เหตุการณ์ที่เกี่ยวข้อง
            </h4>
            <ul className="mt-2 space-y-1.5 text-base text-silver">
              {THREAT.incidents.map((t) => (
                <li key={t} className="flex gap-2">
                  <span className="text-danger" aria-hidden="true">▸</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-glow/25 bg-glow/5 p-4">
            <h4 className="font-display text-lg font-semibold text-glow">แนวทางรับมือที่แนะนำ</h4>
            <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-base text-ice marker:text-glow">
              {THREAT.response.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}

const PANELS = {
  profile: ProfileTab,
  personality: PersonalityTab,
  abilities: AbilitiesTab,
  ultimates: UltimatesTab,
  weaknesses: WeaknessesTab,
  anatomy: AnatomyTab,
  threat: ThreatTab,
}

export default function Dossier() {
  const [tab, setTab] = useState('profile')
  const uid = useId()
  const tabRefs = useRef([])
  const Panel = PANELS[tab]
  const activeTab = TABS.find((t) => t.id === tab)

  const onKeyDown = (e, i) => {
    const keys = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }
    let next = null
    if (e.key in keys) next = (i + keys[e.key] + TABS.length) % TABS.length
    if (e.key === 'Home') next = 0
    if (e.key === 'End') next = TABS.length - 1
    if (next === null) return
    e.preventDefault()
    setTab(TABS[next].id)
    tabRefs.current[next]?.focus()
  }

  return (
    <section id="dossier" aria-labelledby="dossier-title" className="section-shell">
      <div className="container-wide">
        <SectionHeading
          index="04"
          eyebrow="Classified Dossier"
          id="dossier-title"
          title="แฟ้มข้อมูลลับ: ABYSSAL KING"
          lead="เอกสารลับจากหน่วยเฝ้าระวัง Project Leviathan — ข้อมูลทั้งหมดในแฟ้มนี้เป็นเรื่องแต่ง"
        />

        <Reveal className="relative overflow-hidden rounded-[1.75rem] border border-glow/25 bg-abyss-900/90 shadow-[0_40px_120px_-40px_#000]">
          {/* file header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-glow/15 bg-abyss-950/80 px-5 py-4 md:px-8">
            <div className="flex items-center gap-3">
              <Lock size={18} className="text-glow" aria-hidden="true" />
              <p className="font-display text-sm font-semibold tracking-[0.25em] text-silver">
                PROJECT LEVIATHAN · FILE AK-00 · {PROFILE.classification}
              </p>
            </div>
            <p
              aria-hidden="true"
              className="-rotate-3 rounded border-[3px] border-danger px-3 py-0.5 font-title text-lg font-black tracking-[0.3em] text-danger"
            >
              CLASSIFIED
            </p>
          </div>

          {/* tabs */}
          <div
            role="tablist"
            aria-label="หมวดข้อมูลในแฟ้ม"
            className="flex gap-2 overflow-x-auto border-b border-glow/10 px-4 py-3 [scrollbar-width:thin] md:px-6"
          >
            {TABS.map((t, i) => {
              const selected = t.id === tab
              const TabIcon = t.icon
              return (
                <button
                  key={t.id}
                  ref={(el) => (tabRefs.current[i] = el)}
                  role="tab"
                  type="button"
                  id={`${uid}-tab-${t.id}`}
                  aria-selected={selected}
                  aria-controls={`${uid}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setTab(t.id)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className={`relative flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-left transition ${
                    selected ? 'text-abyss-950' : 'text-silver hover:bg-white/5 hover:text-ice'
                  }`}
                >
                  {selected && (
                    <motion.span
                      layoutId="dossier-tab"
                      className="absolute inset-0 -z-0 rounded-xl bg-glow shadow-[0_0_20px_#3fe0ff66]"
                      transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                    />
                  )}
                  <TabIcon size={18} className="relative" aria-hidden="true" />
                  <span className="relative leading-tight">
                    <span lang="en" className="block font-display text-sm font-bold tracking-wider">
                      {t.label}
                      {t.count ? ` (${t.count})` : ''}
                    </span>
                    <span className="block text-sm">{t.th}</span>
                  </span>
                </button>
              )
            })}
          </div>

          {/* panel */}
          <div
            role="tabpanel"
            id={`${uid}-panel`}
            aria-labelledby={`${uid}-tab-${tab}`}
            tabIndex={0}
            className="min-h-[32rem] p-5 md:p-8"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease }}
              >
                <h3 className="sr-only">{activeTab.th}</h3>
                <Panel />
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
