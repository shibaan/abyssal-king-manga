const SOURCES = [
  'NOAA Fisheries — Sperm Whale (Physeter macrocephalus)',
  'IUCN Red List — Physeter macrocephalus',
  'Smithsonian Ocean — Sperm Whale',
  'Whitehead, H. (2003). Sperm Whales: Social Evolution in the Ocean. University of Chicago Press.',
]

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-glow/10 bg-abyss-950/90 px-4 py-12">
      <div className="container-wide grid gap-10 md:grid-cols-2">
        <div>
          <p className="font-title text-xl font-bold tracking-[0.18em] text-ice">ABYSSAL KING</p>
          <p className="mt-3 max-w-md text-base text-silver">
            ABYSSAL KING และ Project Leviathan เป็น <strong className="text-ice">ตัวละครและเรื่องราวสมมติ</strong>{' '}
            ข้อมูลในส่วน “ชีววิทยาวาฬ” เป็นข้อเท็จจริงทางวิทยาศาสตร์ และส่วน “จริง vs แต่ง” แยกให้เห็นว่าอะไรคือเรื่องแต่ง
          </p>
        </div>
        <div>
          <h2 className="font-display text-base font-semibold uppercase tracking-[0.2em] text-mist">แหล่งข้อมูลแนะนำสำหรับตรวจสอบ</h2>
          <ul className="mt-3 space-y-1.5 text-base text-silver">
            {SOURCES.map((s) => (
              <li key={s} lang="en">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
