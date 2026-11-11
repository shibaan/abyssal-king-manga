import { Radar, ShieldHalf, Wind, AudioWaveform, BicepsFlexed, Zap, Waves } from 'lucide-react'

// Explicit map keeps the bundle tree-shaken (no `import * as`).
const ICONS = { Radar, ShieldHalf, Wind, AudioWaveform, BicepsFlexed, Zap, Waves }

export default function Icon({ name, ...props }) {
  const C = ICONS[name] ?? Zap
  return <C aria-hidden="true" {...props} />
}
