import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { Blogs, Members, MemberDetail } from './Pages/indexPages'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Create Lenis instance
    const lenis = new Lenis({
      lerp: 0.1,
      smooth: true,
    })

    // Animation frame loop for Lenis
    let animationFrameId: number
    function raf(time: number) {
      lenis.raf(time)
      animationFrameId = requestAnimationFrame(raf)
    }
    animationFrameId = requestAnimationFrame(raf)

    // Sync GSAP ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update)

    // Set up scrollerProxy for ScrollTrigger
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value?: number) {
        if (arguments.length && typeof value === 'number') {
          lenis.scrollTo(value)
        }
        return window.scrollY
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        }
      },
      pinType: document.body.style.transform ? "transform" : "fixed"
    })

    // Ensure ScrollTrigger refreshes on Lenis update
    const handleRefresh = () => {
      lenis.raf(performance.now())
    }
    ScrollTrigger.addEventListener('refresh', handleRefresh)
    ScrollTrigger.refresh()

    // Clean up
    return () => {
      lenis.destroy()
      cancelAnimationFrame(animationFrameId)
      ScrollTrigger.removeEventListener('refresh', handleRefresh)
      // Remove scrollerProxy to avoid memory leaks
      // (no direct API, but safe to leave as is for single-page app)
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
