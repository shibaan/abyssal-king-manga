import { Ruler, AudioWaveform, Gauge, Fish, Users, Droplets, CheckCircle2, HelpCircle, Globe } from 'lucide-react'
import { Reveal, SectionHeading } from '../components/Reveal.jsx'
import WhaleAnatomy from '../diagrams/WhaleAnatomy.jsx'
import SonarDiagram from '../diagrams/SonarDiagram.jsx'
import DeepDive from './DeepDive.jsx'
import SizeCompare from '../diagrams/SizeCompare.jsx'

const STATS = [
  { value: '16 ม.', label: 'ความยาวตัวผู้โดยประมาณ' },
  { value: '40+ ตัน', label: 'น้ำหนักตัวผู้ขนาดใหญ่' },
  { value: '1,800 ม.+', label: 'บางครั้งดำลึก' },
  { value: '~230 dB', label: 'ความดังของเสียงคลิก (ในน้ำ)' },
]

function Block({ n, icon: Icon, title, en, children, className = '' }) {
  return (
    <article className={`glass rounded-3xl p-6 md:p-10 ${className}`}>
      <Reveal>
        <header className="mb-6 flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-glow/12 text-glow ring-1 ring-glow/30">
            <Icon size={24} aria-hidden="true" />
          </span>
          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-mist">
              {n} · <span lang="en">{en}</span>
            </p>
            <h3 className="mt-1 text-2xl font-bold text-white md:text-3xl">{title}</h3>
          </div>
        </header>
      </Reveal>
      {children}
    </article>
  )
}

function Bullets({ items }) {
  return (
    <ul className="space-y-3">
      {items.map((t, i) => (
        <Reveal as="li" key={i} delay={i * 0.05} y={14} className="flex gap-3">
          <span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-glow" aria-hidden="true" />
          <span className="text-silver">{t}</span>
        </Reveal>
      ))}
    </ul>
  )
}

function Label({ kind }) {
  return kind === 'fact' ? (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-glow/15 px-3 py-1 text-sm font-semibold text-glow">
      <CheckCircle2 size={16} aria-hidden="true" /> ข้อเท็จจริงที่ยอมรับกันกว้างขวาง
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/8 px-3 py-1 text-sm font-semibold text-silver ring-1 ring-white/20">
      <HelpCircle size={16} aria-hidden="true" /> สมมติฐานที่ยังถกเถียงกันอยู่
    </span>
  )
}

function HabitatDiagram() {
  return (
    <svg
      viewBox="0 0 400 230"
      className="block w-full"
      role="img"
      aria-label="แผนภาพการกระจายพันธุ์: ตัวเมียและลูกอยู่ในน่านน้ำอุ่นระหว่างละติจูดประมาณ 40 องศาเหนือถึง 40 องศาใต้ ส่วนตัวผู้โตเต็มวัยเดินทางไปถึงเขตขั้วโลก"
    >
      <rect width="400" height="230" rx="14" fill="#040b1a" />
      <rect x="0" y="60" width="400" height="110" fill="#3fe0ff" opacity="0.18" />
      <line x1="0" y1="115" x2="400" y2="115" stroke="#c3cedb" strokeDasharray="4 6" opacity="0.6" />
      <line x1="0" y1="60" x2="400" y2="60" stroke="#3fe0ff" opacity="0.6" />
      <line x1="0" y1="170" x2="400" y2="170" stroke="#3fe0ff" opacity="0.6" />
      <g fontFamily="Kanit, sans-serif" fontSize="15" fill="#d6f6ff">
        <text x="10" y="54">40°N</text>
        <text x="10" y="190">40°S</text>
        <text x="10" y="110" fill="#c3cedb">เส้นศูนย์สูตร</text>
        <text x="200" y="98" textAnchor="middle" fontSize="17" fontWeight="600">ตัวเมีย + ลูก</text>
        <text x="200" y="145" textAnchor="middle" fontSize="14" fill="#c3cedb">น่านน้ำอุ่น</text>
        <text x="320" y="24" textAnchor="middle" fill="#8beeff">ตัวผู้ → ขั้วโลกเหนือ</text>
        <text x="320" y="218" textAnchor="middle" fill="#8beeff">ตัวผู้ → ขั้วโลกใต้</text>
      </g>
      <g stroke="#8beeff" strokeWidth="3" fill="none" strokeLinecap="round">
        <path d="M320 66 L320 34 M312 44 L320 34 L328 44" />
        <path d="M320 164 L320 196 M312 186 L320 196 L328 186" />
      </g>
    </svg>
  )
}

function MargueriteDiagram() {
  const n = 7
  return (
    <svg viewBox="0 0 220 220" className="mx-auto block w-full max-w-[220px]" role="img" aria-label="วงป้องกันแบบ marguerite: วาฬหันหัวเข้าหากันตรงกลาง และหันหางออกด้านนอก โดยมีลูกวาฬอยู่ตรงกลาง">
      <circle cx="110" cy="110" r="104" fill="#040b1a" />
      {Array.from({ length: n }).map((_, i) => (
        <g key={i} transform={`rotate(${(360 / n) * i} 110 110)`}>
          {/* head toward the centre, flukes outward */}
          <path d="M103 80 C103 92 117 92 117 80 L113 32 L124 20 L110 26 L96 20 L107 32 Z" fill="#8beeff" />
        </g>
      ))}
      <ellipse cx="110" cy="110" rx="7" ry="12" fill="#3fe0ff" />
    </svg>
  )
}

export default function Biology() {
  return (
    <section id="biology" aria-labelledby="biology-title" className="section-shell">
      <div className="container-wide">
        <SectionHeading
          index="02"
          eyebrow="Real Biology"
          id="biology-title"
          title="วาฬหัวทุย: นักล่าตัวจริงแห่งห้วงลึก"
          lead={
            <>
              <em lang="la" className="not-italic font-semibold text-ice">Physeter macrocephalus</em> — วาฬมีฟันที่ใหญ่ที่สุดในโลก
              ข้อมูลทั้งหมดในส่วนนี้เป็น <strong className="whitespace-nowrap text-glow">ข้อเท็จจริงทางวิทยาศาสตร์</strong> ไม่ใช่เรื่องแต่ง
            </>
          }
        />

        <ul className="mb-10 grid grid-cols-2 gap-3 md:mb-14 md:grid-cols-4 md:gap-4">
          {STATS.map((s, i) => (
            <Reveal as="li" key={s.label} delay={i * 0.08} className="glass rounded-2xl p-5 text-center">
              <p className="font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-bold text-glow">{s.value}</p>
              <p className="mt-1 text-base leading-snug text-silver">{s.label}</p>
            </Reveal>
          ))}
        </ul>

        <div className="space-y-6 md:space-y-8">
          {/* 1 — body */}
          <Block n="01" icon={Ruler} en="Body Structure" title="ลักษณะร่างกาย">
            <div className="grid gap-10 lg:grid-cols-2">
              <Bullets
                items={[
                  'หัวยาวราว 1 ใน 3 ของลำตัว ทรงสี่เหลี่ยมทื่อ เป็นเอกลักษณ์ที่จำได้ทันที',
                  'มีฟันเฉพาะขากรรไกรล่าง ประมาณ 18–26 คู่ ขากรรไกรบนมีเพียงร่องรับฟัน',
                  'รูหายใจอยู่ค่อนไปทางซ้ายด้านหน้าของหัว จึงพ่นลมเฉียงไปข้างหน้า',
                  'มีสมองใหญ่ที่สุดในบรรดาสัตว์ทั้งหมด หนักราว 8 กิโลกรัม',
                  'ตัวผู้ใหญ่กว่าตัวเมียมาก: ตัวผู้ยาวราว 16 ม. ตัวเมียราว 11 ม.',
                ]}
              />
              <Reveal delay={0.1}>
                <SizeCompare />
              </Reveal>
            </div>
          </Block>

          {/* 2 — spermaceti */}
          <Block n="02" icon={Droplets} en="Spermaceti Organ" title="อวัยวะสเปอร์มาเซติ">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
              <Reveal>
                <p className="text-silver">
                  อวัยวะขนาดยักษ์ในหัว บรรจุ <strong className="text-ice">น้ำมันคล้ายขี้ผึ้ง</strong> ได้ราว 1,900 ลิตร
                  ชื่อ “spermaceti” มาจากนักล่าวาฬในอดีตที่ <strong className="text-ice">เข้าใจผิด</strong> ว่าเป็นน้ำเชื้อของวาฬ
                </p>
                <div className="mt-6 rounded-2xl border border-glow/25 bg-glow/5 p-5">
                  <Label kind="fact" />
                  <p className="mt-3 text-ice">
                    หน้าที่หลักคือ <strong>สร้างและรวมลำเสียงคลิก</strong> สำหรับ echolocation: เสียงเกิดที่ริมฝีปากเสียง (1)
                    วิ่งย้อนผ่านน้ำมัน (2) สะท้อนที่ถุงอากาศหน้ากะโหลก (3) แล้วพุ่งออกด้านหน้าผ่าน “จังก์” (4)
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.1} className="rounded-2xl border border-white/15 bg-white/[0.03] p-5">
                <Label kind="hypothesis" />
                <ul className="mt-4 space-y-3 text-silver">
                  <li>
                    <strong className="text-ice">ควบคุมการลอยตัว</strong> — เคยเสนอว่าวาฬปรับอุณหภูมิน้ำมันเพื่อจมหรือลอย
                    แต่หลักฐานยังไม่หนักแน่น
                  </li>
                  <li>
                    <strong className="text-ice">ใช้เป็นกันชนเวลาพุ่งชน</strong> — บางงานวิจัยเสนอว่าหัวที่ใหญ่ช่วยรับแรงกระแทกเมื่อตัวผู้ต่อสู้กัน
                    ยังถกเถียงกันอยู่
                  </li>
                </ul>
              </Reveal>
            </div>
            <Reveal delay={0.1} className="mt-10">
              <WhaleAnatomy />
            </Reveal>
          </Block>

          {/* 3 — echolocation */}
          <Block n="03" icon={AudioWaveform} en="Echolocation & Sound" title="การหาตำแหน่งด้วยเสียงสะท้อน">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <Reveal>
                  <p className="text-silver">
                    ทะเลลึกมืดสนิท วาฬหัวทุยจึง “มองด้วยเสียง” — ส่งเสียงคลิก แล้วฟังเสียงที่สะท้อนกลับจากเหยื่อ
                    เพื่อรู้ระยะ ทิศทาง และขนาด
                  </p>
                </Reveal>
                <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                  {[
                    ['Usual clicks', 'คลิกสม่ำเสมอ ใช้ค้นหาเหยื่อในระยะหลายร้อยเมตร'],
                    ['Creaks', 'คลิกถี่ขึ้นเรื่อย ๆ เมื่อเข้าใกล้เหยื่อ'],
                    ['Codas', 'รหัสจังหวะคลิกที่ใช้สื่อสาร แต่ละกลุ่มมี “สำเนียง” ของตัวเอง'],
                    ['Slow clicks', 'คลิกช้าและดังมาก มักพบในตัวผู้'],
                  ].map(([t, d], i) => (
                    <Reveal key={t} delay={i * 0.06} className="rounded-2xl border border-glow/15 bg-abyss-950/50 p-4">
                      <dt lang="en" className="font-display font-semibold text-glow">
                        {t}
                      </dt>
                      <dd className="m-0 mt-1 text-base text-silver">{d}</dd>
                    </Reveal>
                  ))}
                </dl>
              </div>
              <Reveal delay={0.1}>
                <SonarDiagram />
                <p className="mt-4 text-base text-silver">
                  เสียงคลิกดังได้ราว <strong className="text-ice">230 dB</strong> — ดังที่สุดในอาณาจักรสัตว์
                  <span className="mt-1 block text-sm text-mist">
                    * เดซิเบลในน้ำใช้ค่าอ้างอิงต่างจากในอากาศ จึงเทียบตรง ๆ กับเสียงบนบกไม่ได้
                  </span>
                </p>
              </Reveal>
            </div>
          </Block>

          {/* 4 — diving */}
          <Block n="04" icon={Gauge} en="Deep Diving & Pressure" title="การดำน้ำลึกและการทนแรงดัน">
            <DeepDive />
          </Block>

          {/* 5 — diet */}
          <Block n="05" icon={Fish} en="Diet & Hunting" title="อาหารและการล่า">
            <div className="grid gap-10 lg:grid-cols-2">
              <Bullets
                items={[
                  'อาหารหลักคือหมึก รวมถึงหมึกยักษ์ (Architeuthis) และหมึกมหึมา (colossal squid) และปลาทะเลลึกบางชนิด',
                  'กินอาหารราว 3% ของน้ำหนักตัวต่อวัน',
                  'ใช้ echolocation หาเหยื่อในความมืด และเชื่อว่าดูดกลืนเหยื่อทั้งตัว — เคยพบวาฬที่ขากรรไกรพิการแต่ยังสมบูรณ์ดี',
                  'อำพันทะเล (ambergris) ก่อตัวในลำไส้ของวาฬหัวทุยบางตัว รอบ ๆ จะงอยปากหมึกที่ย่อยไม่ได้',
                ]}
              />
              <Reveal delay={0.1} className="rounded-2xl border border-glow/25 bg-glow/5 p-6">
                <h4 className="text-xl font-semibold text-ice">วาฬสู้กับหมึกยักษ์จริงไหม?</h4>
                <p className="mt-3 text-silver">
                  เรารู้จาก <strong className="text-ice">หลักฐานทางอ้อม</strong>: รอยแผลจากปุ่มดูดของหมึกบนผิววาฬ
                  และจะงอยปากหมึกจำนวนมากในกระเพาะ
                </p>
                <p className="mt-3 text-silver">
                  แต่ฉากต่อสู้กลางทะเลลึก <strong className="text-ice">ยังไม่เคยมีใครบันทึกภาพได้</strong> — ภาพที่เห็นกันส่วนใหญ่จึงเป็นจินตนาการของศิลปิน
                </p>
              </Reveal>
            </div>
          </Block>

          {/* 6 — habitat & social */}
          <Block n="06" icon={Users} en="Habitat & Social Behavior" title="ถิ่นที่อยู่และพฤติกรรมทางสังคม">
            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                <Reveal>
                  <p className="flex items-start gap-3 text-silver">
                    <Globe size={22} className="mt-1 shrink-0 text-glow" aria-hidden="true" />
                    <span>
                      พบในมหาสมุทรทั่วโลก โดยเฉพาะน้ำลึกนอกไหล่ทวีป ตัวเมียและลูกอยู่ในน่านน้ำอุ่น
                      ส่วนตัวผู้โตเต็มวัยเดินทางไกลถึงเขตขั้วโลก แล้วกลับมาผสมพันธุ์
                    </span>
                  </p>
                </Reveal>
                <Reveal delay={0.1} className="mt-6">
                  <HabitatDiagram />
                </Reveal>
              </div>
              <div>
                <Bullets
                  items={[
                    'ตัวเมียและลูกอยู่รวมกันเป็นครอบครัวราว 10 ตัว ตัวผู้จะแยกออกไปเมื่อโตขึ้น',
                    'ช่วยกันเลี้ยงลูก: ขณะแม่ดำลงไปหากิน ตัวอื่นจะเฝ้าลูกที่ผิวน้ำ',
                    'นอนหลับในท่าตั้งตรงใกล้ผิวน้ำ เป็นช่วงสั้น ๆ',
                    'ตั้งท้องราว 14–16 เดือน และมีอายุยืนได้ 60–70 ปีขึ้นไป',
                  ]}
                />
                <Reveal delay={0.1} className="mt-6 grid items-center gap-5 rounded-2xl border border-glow/15 bg-abyss-950/50 p-5 sm:grid-cols-[180px_1fr]">
                  <MargueriteDiagram />
                  <div>
                    <h4 className="text-lg font-semibold text-ice" lang="en">
                      Marguerite formation
                    </h4>
                    <p className="mt-1 text-base text-silver">
                      เมื่อถูกวาฬเพชฌฆาตคุกคาม ฝูงจะหันหัวเข้าหากันเป็นวงคล้ายกลีบดอกไม้ ปกป้องลูกไว้ตรงกลาง
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
            <Reveal className="mt-8 rounded-2xl border border-white/15 bg-white/[0.03] p-5 text-base text-silver">
              <strong className="text-ice">สถานะการอนุรักษ์:</strong> IUCN จัดเป็น “มีแนวโน้มใกล้สูญพันธุ์” (Vulnerable)
              ภัยคุกคามสำคัญคือ การชนกับเรือ การติดเครื่องมือประมง ขยะพลาสติก และมลพิษทางเสียง
            </Reveal>
          </Block>
        </div>
      </div>
    </section>
  )
}
