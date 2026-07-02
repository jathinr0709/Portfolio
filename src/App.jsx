import SmoothScroll from './providers/SmoothScroll.jsx'
import { Analytics } from '@vercel/analytics/react'
import Desk from './components/Desk.jsx'
import SideDoodles from './components/SideDoodles.jsx'
import Cursor from './components/Cursor.jsx'
import Nav from './components/Nav.jsx'
import Notebook from './components/Notebook.jsx'
import Showcase from './components/Showcase.jsx'

export default function App() {
  return (
    <SmoothScroll>
      <Desk />
      <SideDoodles />
      <Cursor />
      <Nav />
      <main>
        <Notebook />
        <Showcase />
      </main>
      <Analytics />
    </SmoothScroll>
  )
}
