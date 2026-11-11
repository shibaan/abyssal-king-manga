import { lazy, Suspense } from 'react'
import { MotionConfig } from 'framer-motion'
import Nav from './components/Nav.jsx'
import OceanBackdrop from './components/OceanBackdrop.jsx'
import Hero from './sections/Hero.jsx'
import MangaStory from './sections/MangaStory.jsx'
import Footer from './sections/Footer.jsx'

// Below-the-fold sections are code-split and loaded on demand
const Biology = lazy(() => import('./sections/Biology.jsx'))
const BioToFiction = lazy(() => import('./sections/BioToFiction.jsx'))
const Dossier = lazy(() => import('./sections/Dossier.jsx'))
const FinalReveal = lazy(() => import('./sections/FinalReveal.jsx'))

function SectionFallback({ id }) {
  return <section id={id} aria-busy="true" className="min-h-screen" />
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#story"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-glow focus:px-4 focus:py-2 focus:text-abyss-950"
      >
        ข้ามไปยังเนื้อหา
      </a>
      <OceanBackdrop />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <MangaStory />
        <Suspense fallback={<SectionFallback id="biology" />}>
          <Biology />
        </Suspense>
        <Suspense fallback={<SectionFallback id="powers" />}>
          <BioToFiction />
        </Suspense>
        <Suspense fallback={<SectionFallback id="dossier" />}>
          <Dossier />
        </Suspense>
        <Suspense fallback={<SectionFallback id="reveal" />}>
          <FinalReveal />
        </Suspense>
      </main>
      <Footer />
    </MotionConfig>
  )
}
