// Scroll-aware screenshots of the dev server, driving the real Chrome via puppeteer-core.
// Usage: node tools/shot.mjs [url] [comma,separated,fractions]
//   node tools/shot.mjs http://localhost:5173/ 0,0.4,0.85
import puppeteer from 'puppeteer-core'

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const url = process.argv[2] || 'http://localhost:5173/'
const fractions = (process.argv[3] || '0,0.45,0.85').split(',').map(Number)
const OUT = '/Users/prabhas/dev/jackie-portfolio'

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--force-device-scale-factor=1'],
  defaultViewport: { width: 1440, height: 900 },
})
const page = await browser.newPage()
await page.goto(url, { waitUntil: 'networkidle0' })
await new Promise((r) => setTimeout(r, 1200)) // fonts + first paint settle

const maxScroll = await page.evaluate(
  () => document.documentElement.scrollHeight - window.innerHeight,
)

for (const f of fractions) {
  const y = Math.round(maxScroll * f)
  await page.evaluate((yy) => {
    if (window.__lenis) window.__lenis.scrollTo(yy, { immediate: true })
    else window.scrollTo(0, yy)
  }, y)
  await new Promise((r) => setTimeout(r, 600)) // let Framer transforms apply
  const out = `${OUT}/shot-${String(f).replace('.', '_')}.png`
  await page.screenshot({ path: out })
  console.log('saved', out, '(scrollY≈' + y + ')')
}

await browser.close()
