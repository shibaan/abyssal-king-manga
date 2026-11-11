// Original vector scene compositions for the manga sequence. They follow the
// reference design: dark navy/black body, giant rounded spermaceti dome,
// cyan rib-like chest markings, glowing cyan eyes, claws and a tattered mantle.

/** Front-view silhouette of ABYSSAL KING (viewBox 0 0 200 300). */
export function KingSilhouette({ className = '', glow = true, fill = '#02060f', ...rest }) {
  return (
    <svg viewBox="0 0 200 300" overflow="visible" className={className} aria-hidden="true" {...rest}>
      <g fill={fill}>
        {/* spermaceti dome */}
        <ellipse cx="106" cy="30" rx="38" ry="25" transform="rotate(-14 106 30)" />
        {/* face & jaw */}
        <path d="M84 36 L122 38 L117 68 L101 78 L88 69 Z" />
        {/* tattered mantle flaring behind the body */}
        <path d="M58 92 C40 150 26 220 6 292 L24 280 L34 297 L48 282 L60 298 L72 284 L86 298 L100 286 L114 298 L128 284 L140 298 L152 282 L166 297 L176 280 L194 292 C174 220 160 150 142 92 Z" opacity="0.92" />
        {/* massive shoulders with spikes, V-shaped torso */}
        <path d="M70 80 L50 66 L56 84 L30 86 L20 96 L24 110 L46 112 L62 168 L74 200 L126 200 L138 168 L154 112 L176 110 L180 96 L170 86 L144 84 L150 66 L130 80 Z" />
        {/* hanging left arm: bulky upper arm, forearm, claws */}
        <path d="M22 98 C12 120 10 140 16 160 L14 190 C14 200 22 206 30 204 L36 190 L38 160 C44 140 42 118 40 104 Z" />
        {/* legs */}
        <path d="M76 196 L70 262 L66 290 L90 290 L94 240 L100 214 L106 240 L110 290 L134 290 L130 262 L124 196 Z" />
        {/* raised right arm with open claw */}
        <path d="M160 98 L178 92 C186 80 186 66 182 54 L176 34 L181 33 L188 50 L188 26 L193 26 L194 48 L199 30 L203 32 L198 54 L204 46 L207 49 L198 66 C196 86 190 100 180 112 L164 116 Z" />
      </g>
      {/* lowered claws (left) */}
      <g stroke={fill} strokeWidth="3.4" strokeLinecap="round" fill="none">
        <path d="M18 200 L10 226 M24 204 L20 232 M31 202 L34 228" />
      </g>
      {glow && (
        <g>
          <ellipse cx="96" cy="52" rx="5" ry="2.2" fill="#9ff3ff" className="pulse-glow" />
          <ellipse cx="111" cy="53" rx="5" ry="2.2" fill="#9ff3ff" className="pulse-glow" />
          <g stroke="#3fe0ff" strokeWidth="2.4" strokeLinecap="round" fill="none" className="pulse-glow">
            <path d="M100 96 L100 176" />
            <path d="M100 108 L84 98 M100 108 L116 98" />
            <path d="M100 126 L80 114 M100 126 L120 114" />
            <path d="M100 144 L82 133 M100 144 L118 133" />
            <path d="M100 162 L87 153 M100 162 L113 153" />
          </g>
        </g>
      )}
    </svg>
  )
}

/** Panel: whale DNA rewriting a human body. */
export function DnaArt() {
  const rungs = Array.from({ length: 15 })
  return (
    <svg viewBox="0 0 400 520" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
      <defs>
        <radialGradient id="dna-bg" cx="50%" cy="45%" r="70%">
          <stop offset="0%" stopColor="#13315f" />
          <stop offset="100%" stopColor="#02060f" />
        </radialGradient>
        <linearGradient id="dna-a" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d6f6ff" />
          <stop offset="100%" stopColor="#3fe0ff" />
        </linearGradient>
        <pattern id="dots" width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="#3fe0ff" opacity="0.28" />
        </pattern>
      </defs>
      <rect width="400" height="520" fill="url(#dna-bg)" />
      <rect width="400" height="520" fill="url(#dots)" />
      {/* sperm whale silhouette dissolving into the helix */}
      <g opacity="0.22" transform="translate(-60 330) scale(0.62)">
        <path
          d="M40 132 C40 98 58 84 104 82 L340 84 C430 86 520 96 600 110 L628 100 L650 114 L676 110 L688 120 L706 116 L716 126 C780 138 840 150 884 158 L978 132 C968 150 958 160 944 166 C958 172 968 182 980 200 L884 176 C820 186 700 206 560 214 C430 220 330 214 250 200 L128 194 C104 193 92 190 92 184 L226 176 C150 174 60 170 40 132 Z"
          fill="#8beeff"
        />
      </g>
      <g transform="rotate(-18 200 260)">
        {rungs.map((_, i) => {
          const y = 40 + i * 30
          const phase = i * 0.55
          const x1 = 200 + Math.sin(phase) * 70
          const x2 = 200 - Math.sin(phase) * 70
          const front = Math.cos(phase) > 0
          return (
            <g key={i} opacity={front ? 1 : 0.45}>
              <line x1={x1} y1={y} x2={x2} y2={y} stroke="#3fe0ff" strokeWidth="3" opacity="0.65" />
              <circle cx={x1} cy={y} r={front ? 7 : 5} fill="url(#dna-a)" />
              <circle cx={x2} cy={y} r={front ? 5 : 7} fill={i > 7 ? '#3fe0ff' : '#d6f6ff'} />
            </g>
          )
        })}
      </g>
      {/* cracks of energy */}
      <g stroke="#3fe0ff" strokeWidth="2" fill="none" opacity="0.8" className="pulse-glow">
        <path d="M30 60 L70 90 L60 120 L100 150" />
        <path d="M370 420 L330 400 L340 370 L300 350" />
      </g>
    </svg>
  )
}

/** Panel: containment tank shatters, the King's silhouette steps out. */
export function ShatterArt() {
  const shards = [
    'M20 60 L70 40 L60 110 Z',
    'M330 30 L390 70 L350 110 Z',
    'M30 400 L80 360 L90 430 Z',
    'M320 380 L380 350 L370 430 Z',
    'M150 20 L190 10 L170 60 Z',
    'M250 470 L300 450 L280 500 Z',
    'M5 230 L40 210 L30 270 Z',
    'M365 220 L398 200 L390 260 Z',
  ]
  return (
    <svg viewBox="0 0 400 520" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
      <defs>
        <radialGradient id="sh-bg" cx="50%" cy="42%" r="60%">
          <stop offset="0%" stopColor="#bff6ff" />
          <stop offset="18%" stopColor="#3fe0ff" />
          <stop offset="55%" stopColor="#0c2246" />
          <stop offset="100%" stopColor="#02060f" />
        </radialGradient>
        <pattern id="alarm" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
          <rect width="20" height="40" fill="#ff5a6e" opacity="0.5" />
        </pattern>
      </defs>
      <rect width="400" height="520" fill="url(#sh-bg)" />
      {/* speed lines radiating from the center */}
      <g stroke="#e9fbff" strokeWidth="2" opacity="0.35">
        {Array.from({ length: 36 }).map((_, i) => {
          const a = (i / 36) * Math.PI * 2
          return (
            <line
              key={i}
              x1={200 + Math.cos(a) * 140}
              y1={220 + Math.sin(a) * 140}
              x2={200 + Math.cos(a) * 420}
              y2={220 + Math.sin(a) * 420}
            />
          )
        })}
      </g>
      {/* alarm stripes */}
      <rect x="0" y="488" width="400" height="32" fill="url(#alarm)" />
      <rect x="0" y="0" width="400" height="18" fill="url(#alarm)" />
      {/* tank ring remains */}
      <ellipse cx="200" cy="470" rx="160" ry="26" fill="none" stroke="#8beeff" strokeWidth="5" opacity="0.6" />
      {/* glass shards */}
      <g fill="#d6f6ff" fillOpacity="0.35" stroke="#e9fbff" strokeWidth="2">
        {shards.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <KingSilhouette x="80" y="110" width="240" height="360" />
    </svg>
  )
}
