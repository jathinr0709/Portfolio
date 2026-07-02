import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Global smooth-scroll. Lenis is the single scroll source of truth; GSAP ScrollTrigger
// reads from it so the (upcoming) pinned notebook-open stays perfectly in sync.
export default function SmoothScroll({ children }) {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, wheelMultiplier: 1, touchMultiplier: 1.5 })
    lenis.on('scroll', ScrollTrigger.update)
    window.__lenis = lenis // exposed for screenshot tooling / debugging

    const onRaf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(onRaf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(onRaf)
      lenis.destroy()
    }
  }, [])

  return children
}
