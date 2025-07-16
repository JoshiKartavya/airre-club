import { BlogsSection } from '../Sections/indexSections'
import { Navbar, Footer } from '../Components/indexComponents'

const Blogs = () => {
  return (
    <>
        <div className='w-full h-screen font-michroma flex flex-col items-center justify-center'>
            <Navbar/>
            <BlogsSection/>
            <div className='w-full h-screen bg-[var(--primary)] text-[var(--secondary)] font-michroma flex flex-col items-center justify-center'>
                <Footer/>
            </div>
        </div>
    </>
  )
}

export default Blogs