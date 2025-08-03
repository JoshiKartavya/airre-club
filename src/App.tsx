import './index.css'
import { Hero, Technologies, Members, Projects, About } from './Sections/indexSections'
import { Footer, Loader } from './Components/indexComponents'
import { useEffect, useRef, useState } from 'react'

const App = () => {

  const [loading, setLoading] = useState(true);

  // Store references to ticker callback and Lenis instance for cleanup
  const lenisRef = useRef<any>(null)
  const gsapRef = useRef<any>(null)
  const ScrollTriggerRef = useRef<any>(null)
  const tickerCallbackRef = useRef<((time: number) => void) | null>(null)

  useEffect(() => {

    window.scrollTo(0, 0);

    let isMounted = true

      // Dynamically import Lenis, gsap, and ScrollTrigger to avoid SSR issues and ensure DOM is ready
      ; (async () => {
        const Lenis = (await import('@studio-freight/lenis')).default
        const gsap = (await import('gsap')).default
        const { ScrollTrigger } = await import('gsap/ScrollTrigger')

        gsap.registerPlugin(ScrollTrigger)

        const lenis = new Lenis()
        lenisRef.current = lenis
        gsapRef.current = gsap
        ScrollTriggerRef.current = ScrollTrigger

        // Store the ticker callback so we can remove it later
        const tickerCallback = (time: number) => {
          // Only call if still mounted and lenis exists
          if (isMounted && lenisRef.current) {
            lenisRef.current.raf(time * 1000)
          }
        }
        tickerCallbackRef.current = tickerCallback

        lenis.on('scroll', ScrollTrigger.update)

        // Use GSAP's ticker to drive Lenis
        gsap.ticker.add(tickerCallback)
        gsap.ticker.lagSmoothing(0)

        // Fix: Only pass value to scrollTo if defined, else return scroll position
        ScrollTrigger.scrollerProxy(document.body, {
          scrollTop(value?: number) {
            if (typeof value === 'number') {
              lenis.scrollTo(value)
            } else {
              // fallback for Lenis v1/v2 API
              return (lenis.scroll?.instance?.scroll?.y ?? window.scrollY)
            }
          },
          getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
          },
          pinType: document.body.style.transform ? 'transform' : 'fixed'
        })

        ScrollTrigger.refresh()
      })()

    // Cleanup
    return () => {
      isMounted = false
      const gsap = gsapRef.current
      const lenis = lenisRef.current
      const ScrollTrigger = ScrollTriggerRef.current
      const tickerCallback = tickerCallbackRef.current

      if (gsap && tickerCallback) {
        gsap.ticker.remove(tickerCallback)
      }
      if (lenis) {
        lenis.destroy()
      }
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill())
      }
    }
  }, [])

  return (
    <>
      {/* {loading && <Loader onFinish={() => setLoading(false)} />} */}
      {/* {!loading && ( */}
        <div className='overflow-x-hidden'>
          <Hero />
          <Technologies />
          <Projects />
          <About />
          <Members />
          <Footer textColor="var(--primary)" bgColor="var(--secondary)" />
        </div>
      {/* )} */}
    </>
  )
}

export default App