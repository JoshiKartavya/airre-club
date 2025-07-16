import './index.css'
import { Hero, Technologies } from './Sections/indexSections'
import { Footer } from './Components/indexComponents'

const App = () => {
  return (
    <>
     <Hero/>
     <Technologies/>
     <div className='w-full h-screen bg-[var(--secondary)] text-[var(--primary)] font-michroma flex flex-col items-center justify-center'>
        <Footer/>
     </div>
    </>
  )
}

export default App