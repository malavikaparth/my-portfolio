'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const PANELS = ['about', 'experience', 'interests'] as const
type Panel = typeof PANELS[number]

export default function About() {
  const [activePanel, setActivePanel] = useState<Panel>('about')
  const [visible, setVisible] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => setVisible(true), 100)
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const idx = PANELS.indexOf(activePanel)
      if (e.key === 'ArrowRight') setActivePanel(PANELS[(idx + 1) % PANELS.length])
      if (e.key === 'ArrowLeft') setActivePanel(PANELS[(idx - 1 + PANELS.length) % PANELS.length])
      if (e.key === 't' || e.key === 'T') document.body.classList.toggle('light')
      if (e.key === 'q' || e.key === 'Q') router.push('/')
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [activePanel, router])

  return (
    <>
      <nav>
        <div className="nav-left">
          <button className="nav-btn" onClick={() => router.push('/')}>Home</button>
          <button className="nav-btn active">About</button>
        </div>
        <div className="nav-right"><span>[</span>under construction<span>]</span></div>
      </nav>

      <main>
        <div className={`stage${visible ? ' visible' : ''}`} style={{ flexDirection: 'column', gap: '32px' }}>

          {/* Page title */}
          <div style={{ borderBottom: '1px solid var(--dimmer)', paddingBottom: '16px' }}>
            <span style={{ color: 'var(--accent)', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase' }}>
              $ whoami
            </span>
            <h1 style={{ color: 'var(--white)', fontSize: '22px', marginTop: '8px', fontFamily: 'var(--font-mono)', fontWeight: 400 }}>
              Malavika Parthasarathi
            </h1>
            <p style={{ color: 'var(--dim)', fontSize: '13px', marginTop: '4px' }}>
              Systems Engineer · Leuven, Belgium
            </p>
          </div>

          {/* Sub-nav */}
          <div className="nav-left" style={{ borderBottom: '1px solid var(--dimmer)', paddingBottom: '12px' }}>
            {PANELS.map((p) => (
              <button
                key={p}
                className={`nav-btn${activePanel === p ? ' active' : ''}`}
                onClick={() => setActivePanel(p)}
              >
                {p}
              </button>
            ))}
          </div>

          {/* About panel */}
          <div className={`panel${activePanel === 'about' ? ' active' : ''}`}>
            <div className="panel-title">about me</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '640px' }}>
              <p style={{ color: 'var(--fg)', fontSize: '14px', lineHeight: '1.9' }}>
                I&apos;m a Systems Engineer at <span style={{ color: 'var(--accent)' }}>KBC, Leuven</span> where I work mainly
                in automation — currently building a front door for our application in Python. My day-to-day tools
                include <span style={{ color: 'var(--white)' }}>UAC, BladeLogic, Stone Branch</span> and Linux.
              </p>
              <p style={{ color: 'var(--fg)', fontSize: '14px', lineHeight: '1.9' }}>
                I have a strong foundation in software engineering — from writing <span style={{ color: 'var(--white)' }}>COBOL
                in banking</span> to training <span style={{ color: 'var(--white)' }}>deep learning models</span> in a robotics lab.
                I pick up new technologies fast and genuinely enjoy it. My main ambition right now is to transition deeper
                into the world of <span style={{ color: 'var(--accent)' }}>AI and machine learning</span>.
              </p>
              <p style={{ color: 'var(--fg)', fontSize: '14px', lineHeight: '1.9' }}>
                I&apos;m also building personal AI projects on the side to keep growing in that direction.
              </p>
            </div>
          </div>

          {/* Experience panel */}
          <div className={`panel${activePanel === 'experience' ? ' active' : ''}`}>
            <div className="panel-title">experience &amp; education</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '640px' }}>

              <div className="timeline-entry">
                <div className="timeline-date">Mar 2024 → present</div>
                <div className="timeline-role">Systems Engineer</div>
                <div className="timeline-place">KBC · Leuven, Belgium</div>
                <div className="timeline-desc">
                  Automation engineering — building a Python-based front door for internal applications.
                  Working with UAC, BladeLogic, Stone Branch and Linux environments.
                </div>
              </div>

              <div className="timeline-entry">
                <div className="timeline-date">2021 → 2023</div>
                <div className="timeline-role">MSc Applied Computer Science</div>
                <div className="timeline-place">Vrije Universiteit Brussel (VUB) · Brussels, Belgium</div>
                <div className="timeline-desc">
                  Specialised in AI and deep learning. Master&apos;s thesis: automatic detection of motion capture
                  markers using deep learning, developed in collaboration with the VUB Robotics Lab.
                  Coursework included data structures &amp; algorithms, with hands-on projects.
                </div>
              </div>

              <div className="timeline-entry">
                <div className="timeline-date">2018 → 2021</div>
                <div className="timeline-role">Software Engineer</div>
                <div className="timeline-place">Tata Consultancy Services · Mumbai, India</div>
                <div className="timeline-desc">
                  Banking sector — customer and account creation systems coded in COBOL.
                  Worked extensively with Linux throughout.
                </div>
              </div>

              <div className="timeline-entry">
                <div className="timeline-date">2014 → 2018</div>
                <div className="timeline-role">BSc Computer Science</div>
                <div className="timeline-place">CUSAT · Kerala, India</div>
                <div className="timeline-desc">
                  Bachelor&apos;s degree in Computer Science, building the foundation for a career in software and systems.
                </div>
              </div>

            </div>
          </div>

          {/* Interests panel */}
          <div className={`panel${activePanel === 'interests' ? ' active' : ''}`}>
            <div className="panel-title">interests</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '640px' }}>
              <div className="link-list">
                <div className="link-row">
                  <span className="link-key">currently</span>
                  <span className="link-plain">building AI projects, training for a 10k run</span>
                </div>
                <div className="link-row">
                  <span className="link-key">reading</span>
                  <span className="link-plain">always have a book on the go</span>
                </div>
                <div className="link-row">
                  <span className="link-key">painting</span>
                  <span className="link-plain">a creative outlet alongside the tech</span>
                </div>
                <div className="link-row">
                  <span className="link-key">ai</span>
                  <span className="link-plain">deeply interested, actively learning &amp; building</span>
                </div>
                <div className="link-row">
                  <span className="link-key">superpower</span>
                  <span className="link-plain">learning fast and adapting to new tech</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <footer>
        <div>v1.0.0</div>
        <div className="footer-keys">
          <div className="fkey"><kbd>←→</kbd><span>navigate</span></div>
          <div className="fkey"><kbd>t</kbd><span>theme</span></div>
          <div className="fkey"><kbd>q</kbd><span>home</span></div>
        </div>
        <div />
      </footer>
    </>
  )
}
