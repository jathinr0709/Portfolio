import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

// 5 evenly-spaced radial dashes for the click burst (first points up).
const DASHES = Array.from({ length: 5 }, (_, i) => {
  const deg = -90 + i * 72
  const a = (deg * Math.PI) / 180
  return { dx: Math.cos(a), dy: Math.sin(a), rot: deg + 90 }
})

// Native cursor stays visible. On click: 5 red dashes burst outward from the point,
// scale to 0 and fade (600ms).
export default function Cursor() {
  const [bursts, setBursts] = useState([])
  const idRef = useRef(0)

  useEffect(() => {
    const down = (e) => {
      const id = ++idRef.current
      setBursts((b) => [...b, { id, x: e.clientX, y: e.clientY }])
      setTimeout(() => setBursts((b) => b.filter((z) => z.id !== id)), 650)
    }
    window.addEventListener('pointerdown', down)
    return () => window.removeEventListener('pointerdown', down)
  }, [])

  return (
    <>
      {bursts.map((b) => (
        <div key={b.id} className="burst" style={{ left: b.x, top: b.y }}>
          {DASHES.map(({ dx, dy, rot }, i) => (
            <motion.span
              key={i}
              className="dash"
              initial={{ x: dx * 5, y: dy * 5, scale: 1, opacity: 1, rotate: rot }}
              animate={{ x: dx * 30, y: dy * 30, scale: 0, opacity: 0, rotate: rot }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          ))}
        </div>
      ))}
    </>
  )
}
