import './index.css'
import { Hero, Technologies, Members, Projects, About } from './Sections/indexSections'
import { Footer } from './Components/indexComponents'

const App = () => {
  return (
    <>
     <div className='overflow-x-hidden'>
      <Hero/>
      <Technologies/>
      <Projects />
      <About />
      <Members/>
      <Footer textColor="var(--primary)" bgColor="var(--secondary)"/>
     </div>
    </>
  )
}

export default App