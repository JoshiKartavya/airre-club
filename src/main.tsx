import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { Blogs, Members, MemberDetail } from './Pages/indexPages'
import Lenis from '@studio-freight/lenis'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'

gsap.registerPlugin(ScrollTrigger)

function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // Sync GSAP ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update)
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        return arguments.length ? lenis.scrollTo(value) : lenis.scroll
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
      },
      // pinType is needed for smooth scroll libraries
      pinType: document.body.style.transform ? "transform" : "fixed"
    })

    // Instead of lenis.update (which does not exist), use lenis.raf with current time to force update
    const handleRefresh = () => {
      // Use performance.now() to simulate a frame update
      lenis.raf(performance.now())
    }
    ScrollTrigger.addEventListener('refresh', handleRefresh)
    ScrollTrigger.refresh()

    return () => {
      lenis.destroy()
      ScrollTrigger.removeEventListener('refresh', handleRefresh)
    }
  }, [])

  return <>{children}</>
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LenisProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="blog" element={<Blogs />} />
          <Route path="members" element={<Members />} />
          <Route path="members/:slug" element={<MemberDetail />} />
        </Routes>
      </BrowserRouter>
    </LenisProvider>
  </StrictMode>,
)
