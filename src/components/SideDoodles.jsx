import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

const CANVAS_HEIGHT = 7200
const START_VH = {
  left: 0,
  right: -22,
}
const END_VH = {
  left: -620,
  right: -650,
}

const ink = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

const spring = { stiffness: 74, damping: 26, mass: 0.42 }

export default function SideDoodles() {
  return (
    <div className="ambient-doodles" aria-hidden="true">
      <DoodleRail side="left" />
      <DoodleRail side="right" />
    </div>
  )
}

function DoodleRail({ side }) {
  const { scrollYProgress } = useScroll()
  const rawY = useTransform(scrollYProgress, [0, 1], [START_VH[side], END_VH[side]])
  const smoothY = useSpring(rawY, spring)
  const y = useTransform(smoothY, (latest) => `${latest}vh`)
  const icons = side === 'left' ? leftIcons : rightIcons

  return (
    <motion.svg className={`doodle-rail doodle-rail--${side}`} viewBox={`0 0 160 ${CANVAS_HEIGHT}`} style={{ y }} {...ink}>
      <g className="doodle-canvas">
        {icons.map((item, index) => (
          <Icon key={`${item.name}-${index}`} {...item} />
        ))}
      </g>
    </motion.svg>
  )
}

function Icon({ name, x, y, s = 1, r = 0 }) {
  const Doodle = DOODLES[name]
  return (
    <g className={`ambient-mark ambient-mark--${name}`} transform={`translate(${x} ${y})`}>
      <g transform={`rotate(${r} 50 50) scale(${s})`}>
        <Doodle />
      </g>
    </g>
  )
}

const leftIcons = [
  { name: 'bicycle', x: 34, y: 18, s: 0.92, r: -5 },
  { name: 'alphabetLights', x: 18, y: 165, s: 1.02, r: 4 },
  { name: 'bowl', x: 18, y: 325, s: 0.86, r: -5 },
  { name: 'dino', x: 36, y: 560, s: 1.02, r: 6 },
  { name: 'flowerStem', x: 22, y: 825, s: 1.18, r: -4 },
  { name: 'codeWindow', x: 18, y: 1085, s: 1.05, r: 4 },
  { name: 'hornbill', x: 30, y: 1355, s: 1.12, r: -6 },
  { name: 'cat', x: 22, y: 1665, s: 1.04, r: 5 },
  { name: 'hut', x: 20, y: 1985, s: 1.02, r: -3 },
  { name: 'duckling', x: 36, y: 2295, s: 0.92, r: 7 },
  { name: 'butterfly', x: 20, y: 2605, s: 1.02, r: -5 },
  { name: 'gitBranch', x: 32, y: 2910, s: 0.9, r: 2 },
  { name: 'flowerBunch', x: 18, y: 3020, s: 1.02, r: 5 },
  { name: 'bird', x: 26, y: 3335, s: 1.1, r: -7 },
  { name: 'database', x: 24, y: 3655, s: 0.96, r: 4 },
  { name: 'leafySprig', x: 25, y: 3985, s: 1.12, r: -4 },
  { name: 'catBowl', x: 21, y: 4310, s: 0.98, r: 6 },
  { name: 'microchip', x: 30, y: 4625, s: 0.98, r: -5 },
  { name: 'scooter', x: 24, y: 4955, s: 1.02, r: 5 },
  { name: 'cassette', x: 18, y: 5300, s: 1.06, r: 3 },
  { name: 'paperPlane', x: 26, y: 5660, s: 1, r: -7 },
  { name: 'robotHead', x: 28, y: 5995, s: 1, r: 4 },
  { name: 'mountain', x: 16, y: 6330, s: 1.05, r: -6 },
  { name: 'rocket', x: 26, y: 6525, s: 1, r: 4 },
  { name: 'tram', x: 22, y: 6705, s: 1.02, r: 5 },
  { name: 'portal', x: 20, y: 6875, s: 1.05, r: -5 },
  { name: 'finalBird', x: 20, y: 7045, s: 1.18, r: -4 },
]

const rightIcons = [
  { name: 'van', x: 18, y: 20, s: 0.98, r: 5 },
  { name: 'arcade', x: 30, y: 180, s: 0.96, r: -5 },
  { name: 'waffles', x: 27, y: 360, s: 0.98, r: 4 },
  { name: 'walkie', x: 30, y: 545, s: 0.92, r: -4 },
  { name: 'ufo', x: 20, y: 790, s: 1.02, r: 5 },
  { name: 'camera', x: 26, y: 1060, s: 1.02, r: -5 },
  { name: 'headphones', x: 18, y: 1325, s: 1.03, r: 7 },
  { name: 'gamepad', x: 22, y: 1615, s: 1.02, r: -6 },
  { name: 'cloudCircuit', x: 18, y: 1925, s: 1.08, r: 4 },
  { name: 'radioTower', x: 26, y: 2235, s: 1.1, r: -7 },
  { name: 'terminal', x: 18, y: 2545, s: 1.06, r: 4 },
  { name: 'car', x: 24, y: 2845, s: 1.02, r: -5 },
  { name: 'truck', x: 20, y: 3135, s: 1.04, r: 6 },
  { name: 'bus', x: 20, y: 3380, s: 0.96, r: -5 },
  { name: 'skateboard', x: 24, y: 3700, s: 1.02, r: 5 },
  { name: 'starCluster', x: 26, y: 4040, s: 1.1, r: -4 },
  { name: 'moon', x: 24, y: 4375, s: 1.02, r: 4 },
  { name: 'walkman', x: 24, y: 4710, s: 0.96, r: -6 },
  { name: 'compass', x: 18, y: 5035, s: 1.06, r: 5 },
  { name: 'notebook', x: 20, y: 5335, s: 1, r: -3 },
  { name: 'lightBulb', x: 24, y: 5625, s: 1.05, r: 4 },
  { name: 'serverRack', x: 22, y: 5920, s: 1, r: -6 },
  { name: 'keyboard', x: 20, y: 6205, s: 1.02, r: 5 },
  { name: 'mouse', x: 30, y: 6465, s: 0.98, r: -4 },
  { name: 'magnifier', x: 30, y: 6625, s: 0.92, r: -4 },
  { name: 'mushroom', x: 24, y: 6785, s: 1.02, r: 6 },
  { name: 'ghostLight', x: 26, y: 6945, s: 0.98, r: 4 },
  { name: 'comet', x: 18, y: 7088, s: 1.08, r: -5 },
]

const DOODLES = {
  scooter: () => (
    <>
      <path d="M34 70h45c16 0 25-10 25-23V30H83v17c0 9-6 16-15 16H35" />
      <path d="M43 70l-9 18M82 70l8 18M26 88h19M79 88h20" />
      <circle cx="34" cy="88" r="8" />
      <circle cx="90" cy="88" r="8" />
      <path d="M101 30l10-18M98 15h23" />
    </>
  ),
  cassette: () => (
    <>
      <rect x="15" y="28" width="100" height="64" rx="8" />
      <rect x="32" y="40" width="66" height="16" rx="3" />
      <circle cx="43" cy="72" r="11" />
      <circle cx="88" cy="72" r="11" />
      <path d="M54 72h23M34 91l8-11h47l9 11" />
    </>
  ),
  paperPlane: () => (
    <>
      <path d="M13 55l104-38-37 96-22-40z" />
      <path d="M58 73l58-56M58 73l-14 29 36-18" />
      <path d="M17 83c13 9 25 9 38 0" />
    </>
  ),
  robotHead: () => (
    <>
      <rect x="26" y="35" width="72" height="54" rx="11" />
      <path d="M62 35V17M50 17h24" />
      <circle cx="46" cy="61" r="5" />
      <circle cx="78" cy="61" r="5" />
      <path d="M49 77c10 7 19 7 29 0M26 54l-15-9M98 54l15-9" />
    </>
  ),
  mountain: () => (
    <>
      <path d="M9 92h118L86 31 64 65 51 45z" />
      <path d="M51 45l8 18 10-9M86 31l-9 29 17-11" />
      <path d="M18 104h96M35 19h17M43 10v17" />
    </>
  ),
  rocket: () => (
    <>
      <path d="M63 13c25 17 24 51-2 76-25-25-27-59 2-76z" />
      <circle cx="63" cy="40" r="9" />
      <path d="M46 70l-22 12 15-31M78 70l22 12-15-31M53 91l-10 22M64 94l-1 25M75 91l10 22" />
    </>
  ),
  tram: () => (
    <>
      <rect x="21" y="27" width="86" height="65" rx="10" />
      <path d="M35 27l18-17h21l18 17M21 48h86M38 92l-13 17M91 92l13 17M39 108h51" />
      <circle cx="42" cy="75" r="6" />
      <circle cx="86" cy="75" r="6" />
    </>
  ),
  ufo: () => (
    <>
      <ellipse cx="64" cy="58" rx="54" ry="15" />
      <path d="M36 55c5-23 49-23 56 0M25 66c12 15 66 17 78 0" />
      <circle cx="41" cy="60" r="3" /><circle cx="64" cy="63" r="3" /><circle cx="87" cy="60" r="3" />
      <path d="M48 83l-12 21M64 85v24M80 83l12 21" />
    </>
  ),
  camera: () => (
    <>
      <rect x="18" y="37" width="94" height="62" rx="10" />
      <path d="M37 37l9-15h35l10 15M27 51h17" />
      <circle cx="67" cy="68" r="19" />
      <circle cx="67" cy="68" r="8" />
    </>
  ),
  headphones: () => (
    <>
      <path d="M25 68c0-33 18-53 43-53s43 20 43 53" />
      <rect x="16" y="62" width="22" height="36" rx="8" />
      <rect x="98" y="62" width="22" height="36" rx="8" />
      <path d="M38 92c9 13 21 19 36 18" />
    </>
  ),
  gamepad: () => (
    <>
      <path d="M25 57c5-19 20-27 39-15 18-12 34-4 40 15l8 29c3 11-11 18-19 9L82 82H47L36 95c-8 9-22 2-19-9z" />
      <path d="M41 60v21M31 70h21M80 64h1M95 76h1" />
    </>
  ),
  radioTower: () => (
    <>
      <path d="M64 26L35 105M64 26l29 79M48 69h32M42 86h44" />
      <circle cx="64" cy="26" r="7" />
      <path d="M44 29c8-18 31-18 40 0M32 31c14-33 50-33 65 0" />
    </>
  ),
  car: () => (
    <>
      <path d="M18 73h94l-9-25H83L70 29H43L31 48H18z" />
      <path d="M42 48h55M46 29l-8 19M70 29l8 19" />
      <circle cx="38" cy="75" r="9" />
      <circle cx="93" cy="75" r="9" />
    </>
  ),
  truck: () => (
    <>
      <rect x="13" y="42" width="62" height="36" rx="5" />
      <path d="M75 54h26l15 24H75zM101 54v24" />
      <circle cx="35" cy="82" r="8" />
      <circle cx="97" cy="82" r="8" />
      <path d="M24 52h32M24 63h24" />
    </>
  ),
  bus: () => (
    <>
      <rect x="22" y="23" width="88" height="72" rx="10" />
      <path d="M22 51h88M40 23v28M66 23v28M92 23v28" />
      <circle cx="42" cy="95" r="7" />
      <circle cx="91" cy="95" r="7" />
      <path d="M34 70h64" />
    </>
  ),
  skateboard: () => (
    <>
      <path d="M17 69c23 20 72 20 95 0" />
      <path d="M26 61c20 12 57 12 77 0" />
      <circle cx="39" cy="83" r="6" />
      <circle cx="91" cy="83" r="6" />
      <path d="M61 25c16-2 25 8 18 20-7 13-28 7-18-20z" />
    </>
  ),
  starCluster: () => (
    <>
      <path d="M63 18l8 24 25 1-20 15 7 25-20-15-21 15 8-25-20-15 25-1z" />
      <path d="M20 24v20M10 34h20M108 79v18M99 88h18M103 17v14M96 24h14" />
    </>
  ),
  moon: () => (
    <>
      <path d="M82 17c-31 9-46 48-25 74 14 17 38 21 57 7-38-2-58-46-32-81z" />
      <path d="M21 24v16M13 32h16M34 77v15M27 84h15" />
    </>
  ),
  walkman: () => (
    <>
      <rect x="20" y="31" width="90" height="66" rx="8" />
      <circle cx="47" cy="66" r="13" />
      <circle cx="82" cy="66" r="13" />
      <path d="M46 66h37M36 43h58M35 97v12M96 97v12" />
    </>
  ),
  compass: () => (
    <>
      <circle cx="64" cy="64" r="44" />
      <path d="M80 31L66 72 47 95 61 54z" />
      <path d="M64 15v14M64 99v14M15 64h14M99 64h14" />
    </>
  ),
  notebook: () => (
    <>
      <rect x="28" y="20" width="78" height="92" rx="7" />
      <path d="M42 20v92M22 37h14M22 55h14M22 73h14M22 91h14M55 43h34M55 60h28M55 77h34" />
    </>
  ),
  lightBulb: () => (
    <>
      <path d="M64 17c-22 0-35 18-32 36 2 13 12 20 17 30h30c5-10 15-17 17-30 3-18-10-36-32-36z" />
      <path d="M50 83h28M53 96h22M57 108h14M64 5v-9M30 20l-8-8M98 20l8-8" />
    </>
  ),
  serverRack: () => (
    <>
      <rect x="27" y="14" width="74" height="96" rx="8" />
      <path d="M27 42h74M27 70h74M42 28h25M42 56h25M42 84h25" />
      <circle cx="82" cy="28" r="3" /><circle cx="82" cy="56" r="3" /><circle cx="82" cy="84" r="3" />
    </>
  ),
  keyboard: () => (
    <>
      <rect x="15" y="41" width="104" height="48" rx="8" />
      <path d="M29 54h1M45 54h1M61 54h1M77 54h1M93 54h1M29 68h1M45 68h1M61 68h1M77 68h1M93 68h1M38 80h52" />
    </>
  ),
  mouse: () => (
    <>
      <rect x="40" y="18" width="48" height="88" rx="24" />
      <path d="M64 18v34M40 52h48M88 58c28-1 35 20 16 34" />
    </>
  ),
  magnifier: () => (
    <>
      <circle cx="54" cy="50" r="31" />
      <path d="M78 73l31 31M42 45c6-11 20-15 32-7" />
      <path d="M23 18v14M16 25h14" />
    </>
  ),
  mushroom: () => (
    <>
      <path d="M19 61c5-35 83-35 91 0-23 8-68 8-91 0z" />
      <path d="M50 67c-4 17-6 30-4 41h36c2-11 0-24-4-41" />
      <circle cx="45" cy="45" r="5" /><circle cx="68" cy="38" r="5" /><circle cx="87" cy="51" r="4" />
    </>
  ),
  ghostLight: () => (
    <>
      <path d="M33 95V48c0-23 16-36 33-36s33 13 33 36v47l-12-10-12 10-12-10-12 10-10-10z" />
      <path d="M52 54h1M79 54h1M52 72c10 7 19 7 29 0" />
      <path d="M20 18v17M12 26h17M107 30v14M100 37h14" />
    </>
  ),
  comet: () => (
    <>
      <path d="M84 30c16 6 23 23 15 38-8 15-28 18-40 6-12-12-9-32 6-40 6-3 13-4 19-4z" />
      <path d="M58 38C43 24 28 19 11 22M57 51C38 43 25 42 9 49M61 66C43 65 29 70 17 82" />
      <path d="M75 44l5 13 14 1-11 8 4 14-12-8-12 8 4-14-11-8 14-1z" />
    </>
  ),
  bicycle: () => (
    <>
      <circle cx="28" cy="73" r="17" />
      <circle cx="88" cy="73" r="17" />
      <path d="M28 73l22-34 17 34H28l30-34 30 34M58 39h18M49 39l-8-12M71 37l12-10M83 27h18" />
      <path d="M20 54c-7-8-6-17 1-22M96 54c6-9 5-17-2-22" />
    </>
  ),
  van: () => (
    <>
      <path d="M12 70V42c0-11 8-20 19-20h48c14 0 27 11 34 30l8 18z" />
      <path d="M31 28v31M31 42h71M65 28v31M87 41l11 18M18 70h102" />
      <circle cx="37" cy="75" r="9" />
      <circle cx="94" cy="75" r="9" />
      <path d="M19 53h13M108 59h11" />
    </>
  ),
  alphabetLights: () => (
    <>
      <path d="M12 25c18 18 38-16 57 0s36-14 53 1" />
      <path d="M25 38v22M52 37v22M79 38v22M106 38v22" />
      <path d="M20 70h12M46 70h12M73 70h12M100 70h12" />
      <path d="M22 82c8 8 20 8 28 0M76 82c9 8 20 8 29 0" />
      <circle cx="25" cy="61" r="4" /><circle cx="52" cy="61" r="4" /><circle cx="79" cy="61" r="4" /><circle cx="106" cy="61" r="4" />
    </>
  ),
  arcade: () => (
    <>
      <path d="M30 12h64l9 88H21z" />
      <rect x="39" y="24" width="46" height="32" rx="3" />
      <path d="M42 71h22M79 69h2M91 69h2M35 100h54" />
      <path d="M51 39l8-7 8 7M59 32v17" />
    </>
  ),
  portal: () => (
    <>
      <path d="M63 14c34 21 31 69-5 89M67 101c-33-13-42-55-15-82" />
      <path d="M44 24c-30 24-22 66 14 77M77 22c29 26 19 68-18 79" />
      <path d="M25 55h15M87 55h17M54 13v15M59 91v16" />
      <path d="M43 43c10-16 30-14 39 2M41 69c12 13 30 13 42-1" />
    </>
  ),
  walkie: () => (
    <>
      <rect x="38" y="27" width="43" height="76" rx="8" />
      <path d="M51 27L46 6M61 27l4-18M48 45h22M48 57h22M51 73h4M64 73h4M51 85h4M64 85h4" />
      <path d="M86 33c12 10 13 24 2 35M94 24c21 19 23 42 3 61" />
    </>
  ),
  waffles: () => (
    <>
      <rect x="24" y="24" width="76" height="76" rx="16" />
      <path d="M49 25v74M75 25v74M25 49h74M25 75h74" />
      <path d="M38 16c7 6 16 6 23 0M66 111c8-6 16-6 24 0" />
    </>
  ),
  bowl: () => (
    <>
      <ellipse cx="50" cy="43" rx="39" ry="12" />
      <path d="M14 43c5 32 67 32 72 0M22 65c15 10 41 10 56 0" />
      <path d="M30 39c6-10 13-11 21-1 8-13 19-9 23 1" />
    </>
  ),
  dino: () => (
    <>
      <path d="M22 76h33c20 0 34-16 34-36 0-14-9-24-23-24-9 0-17 5-22 13L23 48z" />
      <path d="M83 39l13-4M32 76l-8 15M54 76l5 15M35 44l-8-14M48 28l-5-15M62 25l4-14" />
      <circle cx="61" cy="33" r="2.5" fill="currentColor" />
      <path d="M67 45c-8 7-17 7-26 0" />
    </>
  ),
  flowerStem: () => (
    <>
      <path d="M52 158C48 114 51 76 60 24" />
      <path d="M52 122C31 105 17 106 8 117c18 15 33 17 44 5M55 96c23-22 42-20 53-7-17 18-35 23-53 7M57 68C37 53 24 54 16 64c16 14 29 16 41 4" />
      <circle cx="62" cy="17" r="8" />
      <path d="M62 9c-6-24-26-21-24-5 2 10 12 13 24 13M70 17c24-6 27 14 12 19-10 3-16-5-20-19M62 25c6 24-15 27-19 12-3-10 6-17 19-20M54 17c-24 6-27-14-12-19 10-3 16 5 20 19" />
    </>
  ),
  flowerBunch: () => (
    <>
      <circle cx="38" cy="38" r="9" />
      <circle cx="61" cy="43" r="9" />
      <circle cx="49" cy="63" r="9" />
      <path d="M50 72v34M38 47c-12 16-20 34-22 54M61 52c12 17 19 33 21 52" />
      <path d="M49 96c-16-9-29-8-37 2 14 11 27 10 37-2M53 91c17-14 31-13 40-2-14 13-28 15-40 2" />
    </>
  ),
  hornbill: () => (
    <>
      <path d="M27 62c6-31 43-46 72-23-11 37-51 51-72 23z" />
      <path d="M61 36c9-19 31-23 45-9-9 17-28 22-45 9z" />
      <path d="M96 48l28-10-21 25zM39 71l-6 24M58 75l3 24" />
      <circle cx="79" cy="48" r="2.6" fill="currentColor" />
      <path d="M36 61c-12-4-23 0-33 12 15 5 27 1 33-12z" />
    </>
  ),
  hut: () => (
    <>
      <path d="M14 72h90V42L59 12 14 42z" />
      <path d="M7 44l52-36 52 36M34 72V52h22v20M74 72V54h18v18" />
      <path d="M22 83h77M28 93h62" />
    </>
  ),
  duckling: () => (
    <>
      <path d="M22 64c11-25 43-26 58-3 13-1 22 6 26 18-19 18-66 19-84-15z" />
      <circle cx="74" cy="42" r="18" />
      <path d="M90 42l18 5-18 7M57 75c4 10 3 17-3 25M76 78c7 7 10 14 9 23" />
      <circle cx="80" cy="37" r="2.5" fill="currentColor" />
    </>
  ),
  finalBird: () => (
    <>
      <path d="M13 61c14-34 61-48 97-13-23 42-77 48-97 13z" />
      <path d="M45 47c-16-8-27-23-31-44 24 7 36 21 37 42M78 45c10-18 25-29 45-31-6 22-21 35-42 37" />
      <path d="M105 51l26-8-21 22M43 84l-8 22M66 87l3 23" />
      <circle cx="88" cy="50" r="2.6" fill="currentColor" />
    </>
  ),
  codeWindow: () => (
    <>
      <rect x="8" y="14" width="116" height="78" rx="8" />
      <path d="M8 32h116M20 23h1M30 23h1M40 23h1" />
      <path d="M31 51l-12 10 12 10M54 51l12 10-12 10M50 43L36 79M77 53h29M77 64h22M77 75h15" />
    </>
  ),
  microchip: () => (
    <>
      <rect x="21" y="21" width="60" height="60" rx="8" />
      <rect x="36" y="36" width="30" height="30" rx="4" />
      <path d="M10 33h11M10 51h11M10 69h11M81 33h11M81 51h11M81 69h11M33 10v11M51 10v11M69 10v11M33 81v11M51 81v11M69 81v11" />
      <path d="M45 47l-5 5 5 5M58 47l5 5-5 5" />
    </>
  ),
  database: () => (
    <>
      <ellipse cx="50" cy="24" rx="40" ry="13" />
      <path d="M10 24v66c0 7 18 13 40 13s40-6 40-13V24M10 56c0 7 18 13 40 13s40-6 40-13M10 84c0 7 18 13 40 13s40-6 40-13" />
      <path d="M102 45h25M115 32v26" />
    </>
  ),
  gitBranch: () => (
    <>
      <circle cx="32" cy="20" r="8" /><circle cx="32" cy="94" r="8" /><circle cx="96" cy="57" r="8" />
      <path d="M32 28v58M40 42c35 0 26 15 48 15" />
    </>
  ),
  cloudCircuit: () => (
    <>
      <path d="M21 66h79c18 0 21-24 5-31-4-22-37-27-48-8-17-6-31 8-28 23-17 3-17 16-8 16z" />
      <path d="M49 67v19h-18M70 67v31M92 67v19h23" />
      <circle cx="29" cy="87" r="4" /><circle cx="70" cy="100" r="4" /><circle cx="118" cy="87" r="4" />
    </>
  ),
  terminal: () => (
    <>
      <rect x="9" y="16" width="116" height="76" rx="9" />
      <path d="M9 34h116M21 25h1M30 25h1" />
      <path d="M31 54l12 10-12 10M55 76h31" />
    </>
  ),
  cat: () => (
    <>
      <path d="M35 52V31l15 12c10-5 22-5 32 0l15-12v21c9 15 3 42-14 51-19 10-49 2-56-18-5-12-2-25 8-33z" />
      <path d="M50 66h1M77 66h1M55 80c8 7 15 7 23 0M65 72l-5 5h10zM43 74l-21-5M44 83l-21 5M88 74l21-5M87 83l21 5" />
    </>
  ),
  catBowl: () => (
    <>
      <ellipse cx="58" cy="31" rx="44" ry="14" />
      <path d="M15 31l12 58h62l12-58M27 89c8 9 55 9 62 0" />
      <path d="M38 56c5-11 12-13 20 0 7-13 16-11 22 0" />
      <path d="M37 18l7-10 9 10M72 18l9-10 7 10" />
    </>
  ),
  butterfly: () => (
    <>
      <path d="M72 49c29-31 57-23 45 8-10 24-36 21-45-8zM72 49C43 18 15 26 28 57c10 24 36 21 44-8z" />
      <path d="M72 49c22 22 14 48-7 36-14-9-9-26 7-36zM72 49c-22 22-14 48 7 36 14-9 9-26-7-36z" />
      <path d="M72 38v50M67 40c-8-14-20-17-26-8M77 40c8-14 20-17 26-8" />
    </>
  ),
  bird: () => (
    <>
      <path d="M34 74c11-32 51-42 74-11-18 36-61 41-74 11z" />
      <path d="M72 50c5-20 25-29 40-18-5 18-22 28-40 18zM39 70c-12-2-23 4-30 16 15 1 25-5 30-16z" />
      <circle cx="94" cy="59" r="2" />
      <path d="M107 62l17-6-15 12M58 89l-7 15M74 91l2 16" />
    </>
  ),
  leafySprig: () => (
    <>
      <path d="M56 160c-3-43-1-79 5-112M58 120c19-18 36-18 47-7-16 17-33 20-47 7M60 95c-20-16-35-15-45-4 15 15 31 18 45 4M61 70c16-20 31-22 42-12-12 17-27 23-42 12" />
      <path d="M108 26v18M99 35h18M21 15v14M14 22h14" />
    </>
  ),
}
