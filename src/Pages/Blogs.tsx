import { BlogsSection } from '../Sections/indexSections'
import { Navbar, Footer } from '../Components/indexComponents'
import { useEffect } from 'react';

const Blogs = () => {
  useEffect(()=>{
    window.scrollTo(0, 0);
}, [])
  return (
    <>
        <div className='w-full min-h-screen flex flex-col items-center justify-start overflow-x-hidden' style={{fontFamily: "michroma"}}>
            <Navbar textColor="var(--secondary)" bgColor="var(--primary)" />
            <BlogsSection/>
            <Footer textColor="var(--secondary)" bgColor="var(--primary)"/>
        </div>
    </>
  )
}

export default Blogs