import { useState, useEffect } from 'react'
import Beliefs from './Beliefs.jsx'

const WORDS = ['reliable', 'natural', 'empowering', 'easy']

// ONE tall open book. Both pages are already laid out — hero on top, beliefs
// right below it (off-screen). You just scroll down and the lower page comes
// into view. No flip, no lift, no zoom — it's already there.
export default function Notebook() {
  const [w, setW] = useState(0)
  const [time, setTime] = useState('')

  useEffect(() => {
    const id = setInterval(() => setW((p) => (p + 1) % WORDS.length), 2300)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const formatTime = () => {
      setTime(new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }).format(new Date()))
    }
    formatTime()
    const id = setInterval(formatTime, 10000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="notebook-section">
      <div className="book-case">
        <div className="spread">
          {/* TOP PAGE — hero */}
          <div className="leaf leaf--hero">
            <div className="hero-content">
              <div className="sig">Jathin R</div>
              <div className="role">AI Engineer</div>
              <h1 className="headline">
                Software should<br />
                <span className="feel">feel</span>{' '}
                <span className="word">{WORDS[w]}</span>
              </h1>
              <div className="loc">Bengaluru • IST {time}</div>
            </div>
            <HeroDoodle />
          </div>

          {/* fold seam between the two pages */}
          <div className="seam" />

          {/* BOTTOM PAGE — beliefs (already there, revealed as you scroll down) */}
          <div className="leaf leaf--beliefs">
            <Beliefs />
          </div>
        </div>

        {/* red elastic strap across the fold, hooked over the edges */}
        <span className="ribbon-strap" />
      </div>
    </section>
  )
}

function HeroDoodle() {
  return <img className="hero-doodle" src="/hero-portrait.png" alt="" aria-hidden="true" />
}
