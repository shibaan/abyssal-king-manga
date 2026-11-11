// Side-view sperm whale diagram (head left). Labels are real HTML so they
// stay readable at any size; the SVG only draws shapes and leader lines.

export const WHALE_PATH =
  'M40 132 C40 98 58 84 104 82 L340 84 C430 86 520 96 600 110 L628 100 L650 114 L676 110 L688 120 L706 116 L716 126 C780 138 840 150 884 158 L978 132 C968 150 958 160 944 166 C958 172 968 182 980 200 L884 176 C820 186 700 206 560 214 C430 220 330 214 250 200 L128 194 C104 193 92 190 92 184 L226 176 C150 174 60 170 40 132 Z'

const VB = { x: 0, y: 20, w: 1110, h: 270 }
const OX = 110 // whale offset so sound waves fit in front of the head

const MARKERS = [
  { n: 1, ax: 66, ay: 100, lx: 40, ly: 44, name: 'Phonic lips', th: 'ริมฝีปากเสียง — จุดกำเนิดเสียงคลิก' },
  { n: 2, ax: 190, ay: 108, lx: 200, ly: 44, name: 'Spermaceti organ', th: 'อวัยวะสเปอร์มาเซติ — ถุงน้ำมันขนาดยักษ์' },
  { n: 3, ax: 322, ay: 116, lx: 360, ly: 44, name: 'Frontal sac', th: 'ถุงอากาศหน้ากะโหลก — สะท้อนเสียงกลับไปด้านหน้า' },
  { n: 4, ax: 190, ay: 156, lx: 190, ly: 262, name: 'Junk', th: '“จังก์” — ชั้นไขมันรูปเลนส์ ช่วยรวมลำเสียง' },
  { n: 5, ax: 150, ay: 188, lx: 40, ly: 262, name: 'Lower jaw', th: 'ขากรรไกรล่างแคบ มีฟันเฉพาะด้านล่าง' },
  { n: 6, ax: 352, ay: 150, lx: 360, ly: 262, name: 'Skull', th: 'กะโหลกรูปแอ่ง รองรับอวัยวะในหัว' },
]

const pct = (v, o, s) => `${((v - o) / s) * 100}%`

export default function WhaleAnatomy() {
  return (
    <figure className="m-0">
      <div className="-mx-4 overflow-x-auto px-4 pb-2 [scrollbar-width:thin] md:mx-0 md:px-0">
        <div className="relative min-w-[680px]">
          <svg
            viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`}
            className="block w-full"
            role="img"
            aria-label="แผนภาพด้านข้างของหัววาฬหัวทุย แสดงเส้นทางของเสียงจากริมฝีปากเสียง ผ่านอวัยวะสเปอร์มาเซติ สะท้อนที่ถุงอากาศหน้ากะโหลก แล้วออกไปทางด้านหน้าผ่านจังก์"
          >
            <defs>
              <linearGradient id="wa-body" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1d4680" />
                <stop offset="100%" stopColor="#0a1d3c" />
              </linearGradient>
              <marker id="wa-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                <path d="M0 0 L10 5 L0 10 z" fill="#3fe0ff" />
              </marker>
            </defs>

            <g transform={`translate(${OX} 0)`}>
              <path d={WHALE_PATH} fill="url(#wa-body)" stroke="#8beeff" strokeOpacity="0.5" strokeWidth="2" />
              {/* wrinkled skin */}
              <g stroke="#8beeff" strokeOpacity="0.16" strokeWidth="2" fill="none">
                <path d="M430 104 C440 150 436 190 426 214" />
                <path d="M480 108 C492 150 488 192 476 216" />
                <path d="M530 112 C540 150 538 190 528 214" />
                <path d="M580 116 C590 150 588 186 580 208" />
              </g>
              {/* flipper, eye, blowhole */}
              <path d="M300 204 C312 228 332 240 356 243 C342 228 334 214 332 204 Z" fill="#0a1d3c" stroke="#8beeff" strokeOpacity="0.4" />
              <circle cx="232" cy="166" r="4" fill="#d6f6ff" />
              <path d="M58 86 l10 -6" stroke="#d6f6ff" strokeWidth="3" strokeLinecap="round" />

              {/* skull */}
              <path d="M336 90 C366 110 368 162 340 192" fill="none" stroke="#c3cedb" strokeWidth="7" strokeLinecap="round" opacity="0.8" />
              {/* spermaceti case */}
              <ellipse cx="192" cy="110" rx="132" ry="22" fill="#d9c27a" fillOpacity="0.28" stroke="#f0dc96" strokeOpacity="0.8" strokeWidth="2" />
              {/* junk: stacked lens compartments */}
              <rect x="70" y="140" width="236" height="30" rx="14" fill="#c3cedb" fillOpacity="0.14" stroke="#c3cedb" strokeOpacity="0.6" strokeWidth="2" />
              <g stroke="#c3cedb" strokeOpacity="0.5" strokeWidth="1.6">
                {[100, 130, 160, 190, 220, 250, 280].map((x) => (
                  <path key={x} d={`M${x} 142 C${x - 8} 150 ${x - 8} 160 ${x} 168`} fill="none" />
                ))}
              </g>
              {/* frontal sac */}
              <path d="M322 92 C334 108 334 130 322 146" fill="none" stroke="#3fe0ff" strokeWidth="4" strokeLinecap="round" />
              {/* phonic lips */}
              <circle cx="66" cy="100" r="7" fill="#3fe0ff" className="pulse-glow" />

              {/* sound path: back through the case, reflect, forward through the junk */}
              <g fill="none" stroke="#3fe0ff" strokeWidth="3" strokeLinecap="round">
                <path d="M74 100 L300 106" className="dash-flow" markerEnd="url(#wa-arrow)" />
                <path d="M314 116 C326 126 326 140 312 152" className="dash-flow" markerEnd="url(#wa-arrow)" />
                <path d="M296 156 L64 156" className="dash-flow" markerEnd="url(#wa-arrow)" />
              </g>
              {/* beam leaving the head */}
              <g fill="none" stroke="#3fe0ff" strokeWidth="3" strokeLinecap="round">
                {[0, 1, 2].map((k) => (
                  <path key={k} d={`M${18 - k * 26} ${128 - k * 10} Q${6 - k * 26} 156 ${18 - k * 26} ${184 + k * 10}`} opacity={0.85 - k * 0.25} />
                ))}
              </g>

              {/* leader lines */}
              <g stroke="#d6f6ff" strokeOpacity="0.55" strokeWidth="1.5">
                {MARKERS.map((m) => (
                  <line key={m.n} x1={m.ax} y1={m.ay} x2={m.lx} y2={m.ly} />
                ))}
              </g>
              <g fill="#d6f6ff">
                {MARKERS.map((m) => (
                  <circle key={m.n} cx={m.ax} cy={m.ay} r="3.5" />
                ))}
              </g>
            </g>
          </svg>

          {/* numbered markers in HTML so they never get too small */}
          {MARKERS.map((m) => (
            <span
              key={m.n}
              aria-hidden="true"
              className="absolute flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-glow bg-abyss-950 font-display text-base font-bold text-glow shadow-[0_0_14px_#3fe0ff66]"
              style={{ left: pct(m.lx + OX, VB.x, VB.w), top: pct(m.ly, VB.y, VB.h) }}
            >
              {m.n}
            </span>
          ))}
        </div>
      </div>
      <p className="mt-1 text-center text-sm text-mist md:hidden">← เลื่อนแผนภาพไปด้านข้าง →</p>

      <figcaption>
        <ol className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
          {MARKERS.map((m) => (
            <li key={m.n} className="flex gap-3">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-glow font-display text-sm font-bold text-abyss-950">
                {m.n}
              </span>
              <span>
                <span className="block font-display font-semibold text-ice">{m.name}</span>
                <span className="text-base text-silver">{m.th}</span>
              </span>
            </li>
          ))}
        </ol>
        <p className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-base text-silver">
          <span className="inline-flex items-center gap-2">
            <span className="h-1 w-8 rounded bg-glow" aria-hidden="true" /> เส้นทางเสียงคลิก
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-3 w-8 rounded-full border border-[#f0dc96] bg-[#d9c27a55]" aria-hidden="true" /> น้ำมันสเปอร์มาเซติ
          </span>
        </p>
      </figcaption>
    </figure>
  )
}
