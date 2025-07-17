import { BlogsSection } from '../Sections/indexSections'
import { Navbar, Footer } from '../Components/indexComponents'

const Blogs = () => {
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