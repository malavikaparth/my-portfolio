'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import portrait from '@/public/portrait.png'

const SLANT_NAME = `   __  ___        __           _ __        
  /  |/  /___ _  / /___ _   __(_) /______ _
 / /|_/ / __ \`/ / / __ \`/ | / / / //_/ __ \`/
/ /  / / /_/ / / / /_/ /| |/ / / ,<  / /_/ /
/_/  /_/__,_/_/_/__,_/ |___/_/_/|_| __,_/

    ____             __  __                                      __  __    _ 
   / __ \\____ ______/ /_/ /_  ____ __________ __________ ______/ /_/ /_  (_)
  / /_/ / __ \`/ ___/ __/ __ \\/ __ \`/ ___/ __ \`/ ___/ __ \`/ __/ __/ __ \\/ / 
 / ____/ /_/ / /  / /_/ / / / /_/ (__  ) /_/ / /  / /_/ / / / /_/ / / / /  
/_/    __,_/_/   __/_/ /_/__,_/____/__,_/_/   __,_/_/  __/_/ /_/_/`

const ABOUT_LINES = [
  { text: 'Malavika Parthasarathi is a Systems Engineer', cls: 'bright' },
  { text: 'at KBC, Leuven, Belgium', cls: 'bright' },
  { text: "She received her Master's in Computer Science", cls: '' },
  { text: 'from Vrije Universiteit Brussel (VUB), Belgium,', cls: '' },
  { text: "and her Bachelor's from CUST, India.", cls: '' },
  { text: '', cls: 'spacer' },
  { text: 'Driven by curiosity. Grounded in craft.', cls: 'muted' },
]

const PANELS = ['about', 'links'] as const
type Panel = typeof PANELS[number]

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

export default function Home() {
  const [activePanel, setActivePanel] = useState<Panel>('about')
  const [visible, setVisible] = useState(false)
  const typedRef = useRef<HTMLDivElement>(null)
  const typingDone = useRef(false)

  // Fade in + typing animation
  useEffect(() => {
    if (typingDone.current) return
    typingDone.current = true

    const run = async () => {
      await sleep(300)
      setVisible(true)
      await sleep(600)

      const container = typedRef.current
      if (!container) return

      for (const item of ABOUT_LINES) {
        const lineEl = document.createElement('div')
        lineEl.className = 'line' + (item.cls ? ` ${item.cls}` : '')
        container.appendChild(lineEl)

        if (item.cls === 'spacer' || item.text === '') {
          lineEl.innerHTML = '&nbsp;'
          await sleep(60)
          continue
        }

        const textNode = document.createTextNode('')
        const cur = document.createElement('span')
        cur.className = 'cursor'
        lineEl.appendChild(textNode)
        lineEl.appendChild(cur)

        for (const char of item.text) {
          textNode.textContent += char
          await sleep(20 + Math.random() * 15)
        }

        lineEl.removeChild(cur)
        await sleep(70)
      }

      const finalCur = document.createElement('span')
      finalCur.className = 'cursor'
      container.appendChild(finalCur)
    }

    run()
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const idx = PANELS.indexOf(activePanel)
      if (e.key === 'ArrowRight') setActivePanel(PANELS[(idx + 1) % PANELS.length])
      if (e.key === 'ArrowLeft') setActivePanel(PANELS[(idx - 1 + PANELS.length) % PANELS.length])
      if (e.key === 't' || e.key === 'T') document.body.classList.toggle('light')
      if (e.key === 'q' || e.key === 'Q') {
        document.body.style.transition = 'opacity .4s'
        document.body.style.opacity = '0'
        setTimeout(() => window.close(), 450)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [activePanel])

  return (
    <>
      <nav>
        <div className="nav-left">
          {PANELS.map((p) => (
            <button
              key={p}
              className={`nav-btn${activePanel === p ? ' active' : ''}`}
              onClick={() => setActivePanel(p)}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
        <div className="nav-right"><span>[</span>under construction<span>]</span></div>
      </nav>

      <main>
        <div className={`stage${visible ? ' visible' : ''}`}>
          <div className="portrait-wrap">
            <Image
              src={portrait}
              alt="malavika parthasarathi"
              className="portrait-img"
              width={180}
              height={180}
              priority
            />
            <pre className="name-slant">{SLANT_NAME}</pre>
          </div>

          <div className="content">
            <div className={`panel${activePanel === 'about' ? ' active' : ''}`}>
              <div className="typed-block" ref={typedRef} />
            </div>

            <div className={`panel${activePanel === 'links' ? ' active' : ''}`}>
              <div className="panel-title">links</div>
              <div className="link-list">
                <div className="link-row">
                  <span className="link-key">email</span>
                  <a className="link-val" href="mailto:parth.malavika@gmail.com">parth.malavika@gmail.com</a>
                </div>
                <div className="link-row">
                  <span className="link-key">linkedin</span>
                  <a className="link-val" href="https://www.linkedin.com/in/malavika-parthasarathi/" target="_blank" rel="noreferrer">
                    linkedin.com/in/malavika-parthasarathi
                  </a>
                </div>
                <div className="link-row">
                  <span className="link-key">github</span>
                  <a className="link-val" href="https://github.com/malavikaparth/profile" target="_blank" rel="noreferrer">
                    github.com/malavika
                  </a>
                </div>
                <div className="link-row">
                  <span className="link-key">location</span>
                  <span className="link-plain">Leuven, Belgium</span>
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
          <div className="fkey"><kbd>q</kbd><span>quit</span></div>
        </div>
        <div />
      </footer>
    </>
  )
}
