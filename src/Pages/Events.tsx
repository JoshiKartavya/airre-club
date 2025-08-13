import { useEffect } from "react"
import Footer from "../Components/Footer"
import Navbar from "../Components/Navbar"
import EventSection from "../Sections/EventSection"

const Events = () => {
  useEffect(()=>{
    window.scrollTo(0, 0);
}, [])
  return (
    <>
        <div className='w-full min-h-screen flex flex-col items-center justify-start overflow-x-hidden' style={{fontFamily: "michroma"}}>
            <Navbar textColor="var(--secondary)" bgColor="var(--primary)" />
            <EventSection />
            <Footer textColor="var(--secondary)" bgColor="var(--primary)" />
        </div>
    </>
  )
}

export default Events
