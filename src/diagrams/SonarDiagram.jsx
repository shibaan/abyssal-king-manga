// Echolocation: outgoing clicks (solid) travel to a squid, echoes (dashed) return.
export default function SonarDiagram() {
  return (
    <svg
      viewBox="0 0 600 240"
      className="block w-full"
      role="img"
      aria-label="แผนภาพการหาตำแหน่งด้วยเสียงสะท้อน: วาฬส่งเสียงคลิกไปกระทบหมึก แล้วเสียงสะท้อนกลับมาที่ขากรรไกรล่างของวาฬ"
    >
      <defs>
        <clipPath id="sonar-cone">
          <path d="M172 100 L600 0 L600 240 Z" />
        </clipPath>
        <clipPath id="echo-cone">
          <path d="M470 120 L150 60 L150 200 Z" />
        </clipPath>
      </defs>
      <rect width="600" height="240" rx="16" fill="#040b1a" />
      {/* outgoing click rings */}
      <g clipPath="url(#sonar-cone)" fill="none" stroke="#3fe0ff" strokeWidth="3">
        {[0, 1, 2, 3].map((i) => (
          <circle
            key={i}
            cx="172"
            cy="100"
            r="380"
            data-anim
            style={{
              transformOrigin: '172px 100px',
              animation: `sonar-ring 3.2s ${i * 0.8}s linear infinite`,
            }}
          />
        ))}
      </g>
      {/* echoes */}
      <g clipPath="url(#echo-cone)" fill="none" stroke="#d6f6ff" strokeWidth="2.5" strokeDasharray="6 8">
        {[0, 1].map((i) => (
          <circle
            key={i}
            cx="470"
            cy="120"
            r="360"
            data-anim
            style={{
              transformOrigin: '470px 120px',
              animation: `sonar-ring 3.2s ${1.6 + i * 1.6}s linear infinite`,
            }}
          />
        ))}
      </g>
      {/* whale head (facing right) */}
      <path
        d="M0 46 L138 46 C162 46 174 60 174 84 L174 116 C174 130 166 136 150 136 L66 138 L146 146 C146 152 138 156 122 156 L0 164 Z"
        fill="#1d4680"
        stroke="#8beeff"
        strokeOpacity="0.6"
        strokeWidth="2"
      />
      <circle cx="48" cy="128" r="4" fill="#d6f6ff" />
      <circle cx="164" cy="60" r="5" fill="#3fe0ff" className="pulse-glow" />
      {/* squid */}
      <g transform="translate(470 120)">
        <path d="M0 0 C10 -16 44 -18 70 -6 L84 -16 L82 0 L84 16 L70 6 C44 18 10 16 0 0 Z" fill="#c3cedb" />
        <g stroke="#c3cedb" strokeWidth="3" strokeLinecap="round" fill="none">
          <path d="M2 -4 C-20 -14 -34 -10 -48 -20" />
          <path d="M2 0 C-24 -2 -38 4 -56 0" />
          <path d="M2 4 C-20 14 -34 10 -48 22" />
        </g>
      </g>
    </svg>
  )
}
