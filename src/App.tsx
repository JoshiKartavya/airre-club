import './index.css'
import { Hero, Technologies, Members } from './Sections/indexSections'
import { Footer } from './Components/indexComponents'

const App = () => {
  return (
    <>
     <Hero/>
     <Technologies/>
     <Members/>
     <Footer textColor="var(--primary)" bgColor="var(--secondary)"/>
    </>
  )
}

export default App