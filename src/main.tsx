import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { Blogs, Members, MemberDetail } from './Pages/indexPages'
import Lenis from '@studio-freight/lenis'
import { CustomCursorProvider } from './CustomCursorProvider.tsx'

function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Remove the invalid 'smooth' property, use only valid LenisOptions
    const lenis = new Lenis({
      lerp: 0.1,
    })
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    return () => {
      lenis.destroy()
    }
  }, [])
  return <>{children}</>
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LenisProvider>
      <CustomCursorProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="blog" element={<Blogs />} />
            <Route path="members" element={<Members />} />
            <Route path="members/:slug" element={<MemberDetail />} />
          </Routes>
        </BrowserRouter>
      </CustomCursorProvider>
    </LenisProvider>
  </StrictMode>,
)
