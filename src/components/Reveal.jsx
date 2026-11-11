import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

/** Fades/slides children in once they enter the viewport. */
export function Reveal({ as = 'div', delay = 0, y = 28, x = 0, scale = 1, className = '', children, ...rest }) {
  const Tag = motion[as]
  return (
    <Tag
      initial={{ opacity: 0, y, x, scale }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/** Section heading block with eyebrow, title and lead paragraph. */
export function SectionHeading({ index, eyebrow, title, lead, align = 'left', id }) {
  const center = align === 'center'
  return (
    <header className={`mb-12 max-w-3xl md:mb-16 ${center ? 'mx-auto text-center' : ''}`}>
      <Reveal>
        <p className={`eyebrow flex items-center gap-3 ${center ? 'justify-center' : ''}`}>
          <span className="tabular-nums text-mist">{index}</span>
          <span className="h-px w-10 bg-glow/60" aria-hidden="true" />
          <span>{eyebrow}</span>
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 id={id} className="mt-4 text-[clamp(2rem,5vw,3.6rem)] font-bold text-white">
          {title}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={0.16}>
          <p className="mt-5 text-lg text-silver md:text-xl">{lead}</p>
        </Reveal>
      )}
    </header>
  )
}

export const ease = EASE
