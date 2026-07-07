import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const RANK = [
  { y: -18, s: 1.06, r: -2, x: 0 },
  { y: 24, s: 0.95, r: 5, x: 28 },
  { y: 50, s: 0.86, r: -6, x: -24 },
]

const EXPERIENCES = [
  {
    id: 'revspot',
    cls: 'experience-note--lined',
    role: 'AI Creative Producer',
    company: 'Revspot · Bangalore',
    dates: 'Dec 2024 — Jun 2025',
    detail: 'Produced AI video ads and static creatives while building prompt-led, automated content workflows.',
    spread: { y: -40, s: 1, r: -5, x: -330 },
    ranks: [0, 2, 1],
  },
  {
    id: 'hypergo',
    cls: 'experience-note--grid',
    role: 'AI Creative Associate Intern',
    company: 'Hypergro · Bangalore',
    dates: 'Aug 2024 — Oct 2024',
    detail: 'Built AI-assisted systems with OpenAI APIs, n8n, webhooks, automation tools, and prompt engineering.',
    spread: { y: -155, s: 1, r: 5, x: 270 },
    ranks: [1, 0, 2],
  },
  {
    id: 'rinl',
    cls: 'experience-note--cream',
    role: 'Machine Learning Intern',
    company: 'RINL · Visakhapatnam',
    dates: 'Nov 2023 — Dec 2023',
    detail: 'Prepared industrial datasets, explored operational trends, and built reporting and data-processing pipelines.',
    spread: { y: 175, s: 1, r: -3, x: 65 },
    ranks: [2, 1, 0],
  },
]

const PROJECTS = [
  {
    title: 'AI Invoice Processing Platform',
    url: 'https://github.com/jathinr0709/AI-Invoice-Processing-Platform',
    image: '/projects/invoice-platform.png',
    tech: 'Python · FastAPI · OCR · OpenAI API · PostgreSQL',
    text: 'Extracts and validates invoice data, catches duplicates and mismatches, and produces auditable approval decisions.',
  },
  {
    title: 'Multi-Agent Research System',
    url: 'https://github.com/jathinr0709/Multi-agent-Research-System',
    image: '/projects/multi-agent-research.png',
    tech: 'Python · LangGraph · OpenAI API · FastAPI',
    text: 'Specialized agents collaborate on research, retrieval, analysis, summarization, and structured report generation.',
  },
  {
    title: 'Voice Agent',
    url: 'https://github.com/jathinr0709/Voice-agent-',
    image: '/projects/voice-agent.png',
    tech: 'Python · Speech Recognition · OpenAI API · TTS',
    text: 'An end-to-end conversational assistant with speech recognition, contextual LLM responses, and natural voice output.',
  },
  {
    title: 'AI News Aggregator',
    url: 'https://github.com/jathinr0709/NEWS-AGGREGATOR',
    image: '/projects/news-aggregator.png',
    tech: 'Python · FastAPI · PostgreSQL',
    text: 'Collects, categorizes, stores, and searches multi-source news with intelligent content classification.',
  },
]

const SKILLS = [
  { icon: '</>', title: 'Programming', text: 'Python · JavaScript · SQL · HTML · CSS' },
  { icon: 'AI', title: 'AI / GenAI', text: 'OpenAI · Gemini · RAG · Embeddings · LangChain · Agents' },
  { icon: '⚙', title: 'Frameworks', text: 'FastAPI · Flask · React · Node.js · Streamlit' },
  { icon: '▰', title: 'Databases', text: 'PostgreSQL · MySQL · MongoDB · ChromaDB · FAISS' },
  { icon: '↗', title: 'Machine Learning', text: 'Scikit-Learn · Pandas · NumPy · Feature Engineering' },
  { icon: '⌁', title: 'Automation', text: 'n8n · REST APIs · Webhooks · Git · GitHub' },
]

const SEG = [0, 0.14, 0.34, 0.48, 0.63, 0.77, 1]
const zfor = (rank) => 30 - rank * 10

export default function Showcase() {
  return (
    <>
      <ExperienceShowcase />
      <ProjectsSection />
      <SkillsSection />
      <WorkBoard />
      <ContactSection />
    </>
  )
}

function ExperienceShowcase() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  return (
    <section ref={ref} className="showcase experience-showcase">
      <div className="show-pin">
        <div className="show-fade">
          <div className="note-stack experience-stack">
            {EXPERIENCES.map((item) => <ExperienceNote key={item.id} p={scrollYProgress} {...item} />)}
          </div>
        </div>
      </div>
    </section>
  )
}

function ExperienceNote({ p, cls, role, company, dates, detail, spread, ranks }) {
  const seq = (key) => [
    spread[key], RANK[ranks[0]][key], RANK[ranks[0]][key],
    RANK[ranks[1]][key], RANK[ranks[1]][key],
    RANK[ranks[2]][key], RANK[ranks[2]][key],
  ]
  const x = useTransform(p, SEG, seq('x'))
  const y = useTransform(p, SEG, seq('y'))
  const scale = useTransform(p, SEG, seq('s'))
  const rotate = useTransform(p, SEG, seq('r'))
  const zIndex = useTransform(
    p,
    [0, 0.39, 0.4, 0.66, 0.67, 1],
    [zfor(ranks[0]), zfor(ranks[0]), zfor(ranks[1]), zfor(ranks[1]), zfor(ranks[2]), zfor(ranks[2])],
  )

  return (
    <motion.article className={`experience-note ${cls}`} style={{ x, y, scale, rotate, zIndex }}>
      <span className="experience-dates">{dates}</span>
      <h2>{role}</h2>
      <h3>{company}</h3>
      <p>{detail}</p>
      <span className="experience-arrow">↗</span>
    </motion.article>
  )
}

function SectionIntro({ eyebrow, title, copy }) {
  return (
    <motion.header
      className="portfolio-intro"
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.65 }}
    >
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      <p>{copy}</p>
    </motion.header>
  )
}

function ProjectsSection() {
  return (
    <section className="portfolio-section projects-section" id="work">
      <SectionIntro eyebrow="Software should empower." title="Selected AI projects" copy="Four systems built around useful automation, clear decisions, and real workflows." />
      <div className="project-grid">
        {PROJECTS.map((project, index) => (
          <motion.a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${project.title} on GitHub`}
            className="project-card"
            key={project.title}
            initial={{ opacity: 0, y: 55, rotate: index % 2 ? 1.5 : -1.5 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 0.6, delay: (index % 2) * 0.08 }}
          >
            <div className="project-image"><img src={project.image} alt="" /></div>
            <div className="project-copy">
              <span>0{index + 1}</span>
              <h3>{project.title}</h3>
              <p>{project.text}</p>
              <small>{project.tech}</small>
              <em>Open GitHub repo →</em>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  )
}

function SkillsSection() {
  return (
    <section className="portfolio-section skills-section">
      <SectionIntro eyebrow="Design for moments." title="Technical toolkit" copy="The languages, frameworks, AI systems, and infrastructure I use to move from idea to working product." />
      <div className="skills-grid">
        {SKILLS.map((skill, index) => (
          <motion.article
            className="skill-card"
            key={skill.title}
            initial={{ opacity: 0, scale: 0.88, y: 25 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.45, delay: index * 0.05 }}
          >
            <div className="skill-icon">{skill.icon}</div>
            <h3>{skill.title}</h3>
            <p>{skill.text}</p>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

function WorkBoard() {
  return (
    <section className="portfolio-section board-section">
      <SectionIntro eyebrow="Everything in one place." title="The project board" copy="A desk-view of the systems, interfaces, and experiments behind the résumé." />
      <motion.div className="work-board" initial={{ opacity: 0, rotate: -2, y: 70 }} whileInView={{ opacity: 1, rotate: 0, y: 0 }} viewport={{ once: true, amount: 0.22 }} transition={{ duration: 0.75 }}>
        <span className="board-sheet" />
        <div className="board-grid" />
        {PROJECTS.map((project, index) => (
          <a className={`board-shot board-shot--${index + 1}`} href={project.url} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} on GitHub`} key={project.title}>
            <img src={project.image} alt="" />
            <span>{project.title}</span>
          </a>
        ))}
        <p className="board-quote">Build carefully. Ship clearly. Keep learning.</p>
      </motion.div>
    </section>
  )
}

function ContactSection() {
  return (
    <section className="portfolio-section contact-section" id="connect">
      <motion.div className="contact-paper" initial={{ opacity: 0, y: 60, rotate: 1.5 }} whileInView={{ opacity: 1, y: 0, rotate: 0 }} viewport={{ once: true, amount: 0.28 }} transition={{ duration: 0.7 }}>
        <div className="contact-wants">
          <span>What I’m looking for</span>
          <h2>Work where AI becomes useful.</h2>
          <ul>
            <li>Impactful AI products</li>
            <li>Meaningful technical problems</li>
            <li>A collaborative, curious team</li>
          </ul>
        </div>
        <div className="contact-details">
          <span>Let’s build something thoughtful.</span>
          <h3>Jathin R</h3>
          <p>Computer Science graduate focused on AI applications, intelligent automation, and product-minded engineering.</p>
          <div className="contact-links">
            <a href="mailto:jathinr0709@gmail.com">jathinr0709@gmail.com</a>
            <a href="https://www.linkedin.com/in/rjathin/" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://github.com/jathinr0709" target="_blank" rel="noreferrer">GitHub</a>
          </div>
          <small>Bangalore, India</small>
        </div>
      </motion.div>
      <div className="contact-signature">Jathin R</div>
    </section>
  )
}
