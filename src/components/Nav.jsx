import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const LINKS = [
  { id: 'about', label: 'about', Doodle: AboutDoodle, doodleX: '-50%' },
  { id: 'work', label: 'Work', Doodle: WorkDoodle, doodleX: '-50%' },
  // connect's cluster is offset up-and-left, floating between work & connect
  { id: 'connect', label: 'Connect', Doodle: ConnectDoodle, doodleX: '-104%' },
]

// Hand-drawn nav. Hovering a link draws a jittery oval + pops a stop-motion
// computer-science doodle above it (boiling lines, ~10fps).
export default function Nav() {
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 170], [1, 0])
  const y = useTransform(scrollY, [0, 170], [0, -30])

  const [hovered, setHovered] = useState(null)
  const [morphed, setMorphed] = useState(false)
  const timer = useRef(null)

  const enter = (id) => {
    setHovered(id)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setMorphed(true), 1000) // sustained-hover morph
  }
  const leave = () => {
    setHovered(null)
    clearTimeout(timer.current)
    setMorphed(false)
  }

  return (
    <motion.nav className="nav" style={{ opacity, y }}>
      {/* global corner avatar */}
      <div className="nav-mascot" aria-hidden="true">
        {/* dangling spider-mask mascot — hides while a link is hovered */}
        <motion.div
          className="mascot-spider"
          animate={{ opacity: hovered ? 0 : 1, scale: hovered ? 0.7 : 1 }}
          transition={{ duration: 0.16, ease: 'easeInOut' }}
        >
          <span className="mascot-bubble">Hi</span>
          <svg className="mascot-puppet" width="62" height="124" viewBox="0 0 72 144" fill="none"
            strokeLinecap="round" strokeLinejoin="round">
            <line x1="36" y1="0" x2="36" y2="12" stroke="#f3e6d2" strokeWidth="1.6" />
            <path d="M36 11 l-7 -4 M36 11 l7 -4" stroke="#2348c4" strokeWidth="5" />
            <path d="M34 12 C30 26 28 38 27 52" stroke="#2348c4" strokeWidth="8.5" />
            <path d="M38 12 C42 26 44 38 45 52" stroke="#2348c4" strokeWidth="8.5" />
            <path d="M27 50 Q36 46 45 50 L43 92 Q36 97 29 92 Z" fill="#cf2233" />
            <path d="M28 51 Q36 48 44 51 L43 64 Q36 67 29 64 Z" fill="#2348c4" />
            <path d="M30 76 C24 88 20 98 18 104" stroke="#cf2233" strokeWidth="7" />
            <path d="M40 76 C48 88 52 98 54 104" stroke="#cf2233" strokeWidth="7" />
            <circle cx="17" cy="106" r="3.6" fill="#cf2233" />
            <circle cx="53" cy="106" r="3.6" fill="#cf2233" />
            <g stroke="#141414" strokeWidth="0.9" fill="none">
              <circle cx="36" cy="74" r="1.7" fill="#141414" />
              <path d="M36 76 l-3 -3 M36 76 l3 -3 M36 80 l-3.5 3 M36 80 l3.5 3 M32.5 77.5 h-4 M39.5 77.5 h4" />
            </g>
            <circle cx="36" cy="100" r="13.5" fill="#cf2233" />
            <path d="M29 99 q-6 5 -1 10 q7.5 -1.4 5.5 -9.4 z" fill="#fff" stroke="#141414" strokeWidth="1.1" />
            <path d="M43 99 q6 5 1 10 q-7.5 -1.4 -5.5 -9.4 z" fill="#fff" stroke="#141414" strokeWidth="1.1" />
            <g stroke="#7a121f" strokeWidth="0.8" fill="none">
              <path d="M36 91 V118" />
              <path d="M23.5 104 H48.5" />
              <path d="M26 96 Q36 101 46 96" />
              <path d="M26 114 Q36 109 46 114" />
            </g>
          </svg>
        </motion.div>

        {/* sketched spider-mask glyph — appears only after a 1s sustained hover */}
        <motion.div
          className="mascot-sketch"
          animate={{ opacity: morphed ? 1 : 0, scale: morphed ? 1 : 0.6 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18 }}
        >
          <SketchFace />
        </motion.div>
      </div>

      <ul className="nav-links">
        {LINKS.map((l) => (
          <NavLink key={l.id} {...l} onEnter={() => enter(l.id)} onLeave={leave} />
        ))}
      </ul>
    </motion.nav>
  )
}

function NavLink({ id, label, Doodle, doodleX, onEnter, onLeave }) {
  const hideHoverRing = id === 'about'

  return (
    <motion.li
      className="nav-link"
      initial="rest"
      animate="rest"
      whileHover="hover"
      onHoverStart={onEnter}
      onHoverEnd={onLeave}
    >
      <a href={`#${id}`} className="nav-anchor">
        <motion.div
          className="nav-doodle"
          variants={{
            rest: { x: doodleX, scale: 0, y: 16, opacity: 0 },
            hover: { x: doodleX, scale: 1, y: 0, opacity: 1 },
          }}
          transition={{ type: 'spring', stiffness: 360, damping: 19 }}
        >
          <Doodle />
        </motion.div>

        <span className="nav-label">{label}</span>

        {!hideHoverRing && (
          <svg className="nav-ring" viewBox="0 0 100 46" preserveAspectRatio="none" fill="none" aria-hidden="true">
            <motion.path
              d="M7 24 C6 11 28 5 51 6 C77 7 95 11 94 25 C93 39 67 43 45 42 C20 41 8 38 7 24"
              stroke="#FDFBF7"
              strokeWidth="2"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              variants={{ rest: { pathLength: 0, opacity: 0 }, hover: { pathLength: 1, opacity: 1 } }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
            />
          </svg>
        )}
      </a>
    </motion.li>
  )
}

/* ---------- hand-drawn doodles (#FDFBF7) ---------- */
const S = { stroke: '#FDFBF7', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', fill: 'none' }

function SketchFace() {
  return (
    <svg width="46" height="46" viewBox="0 0 46 46" {...S}>
      <path d="M23 5 C14 5 7 12 7 23 C7 34 16 40 23 43 C30 40 39 34 39 23 C39 12 32 5 23 5Z" />
      <path d="M23 6 v35 M10 18 C18 20 28 20 36 18 M10 27 C18 25 28 25 36 27" />
      <path d="M14 24 C18 18 22 18 23 23 C24 18 29 18 33 24" />
      <path d="M14 24 C19 28 22 27 23 23 C24 27 28 28 33 24" />
    </svg>
  )
}

function AboutDoodle() {
  return (
    <svg className="doodle-svg about-doodle-svg" width="124" height="94" viewBox="0 0 124 94" {...S}>
      {/* sparkle */}
      <path d="M16 28c8-2 12-7 14-16 2 9 6 14 15 16-9 2-13 7-15 16-2-9-6-14-14-16z" />
      <path d="M11 48c5-1 8-4 9-10 1 6 4 9 10 10-6 1-9 4-10 10-1-6-4-9-9-10z" />

      {/* little curl */}
      <path d="M103 32c7-12 15-7 9 3-4 7-11 8-17 3" />
      <path d="M98 42c9-1 14-5 18-13" />

      {/* friendly face */}
      <path d="M52 8c-13 2-22 11-21 25 1 17 16 27 33 24 16-3 25-16 22-31C83 12 68 5 52 8z" />
      <path d="M45 10l7-8 7 8 9-6 3 11" />
      <path d="M32 30c-8-3-11 8-3 13M86 29c8-3 11 8 3 13" />
      <path d="M48 33h1M70 33h1" />
      <path d="M52 45c8 6 16 6 24 0" />
      <path d="M42 25c5-5 12-5 17 0M64 24c5-5 12-5 17 0" />

      {/* little sketch marks below the face */}
      <path d="M23 69l-13 9M38 73l-2 12M54 74l4 11" />
    </svg>
  )
}

function WorkDoodle() {
  return (
    <svg className="doodle-svg" width="98" height="84" viewBox="0 0 98 84" {...S}>
      <path d="M20 16 h58 v42 H20 z M20 24 h58 M27 20 h1 M33 20 h1" />
      <path d="M31 34 h15 M31 41 h28 M31 48 h21" />
      <path d="M65 31 v22 M65 36 h9 M65 47 h9" />
      <circle cx="74" cy="36" r="3" fill="#FDFBF7" />
      <circle cx="74" cy="47" r="3" fill="#FDFBF7" />
      <path d="M42 63 v7 M56 63 v7 M34 70 h30" />
    </svg>
  )
}

function ConnectDoodle() {
  return (
    <svg className="doodle-svg" width="96" height="98" viewBox="0 0 96 98" {...S}>
      <rect x="18" y="39" width="48" height="34" rx="5" />
      <path d="M19 43 l23 17 23 -17" />
      <circle cx="22" cy="18" r="6" />
      <circle cx="71" cy="14" r="6" />
      <circle cx="78" cy="74" r="6" />
      <path d="M28 20 l37 -5 M26 23 l10 16 M70 20 l-10 19 M66 63 l7 7" />
      <path d="M42 8 v11 M37 13 h10" />
    </svg>
  )
}
