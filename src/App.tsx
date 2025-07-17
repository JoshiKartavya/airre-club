import './index.css'
import { Hero, Technologies } from './Sections/indexSections'
import { Footer } from './Components/indexComponents'

const App = () => {
  return (
    <>
     <Hero/>
     <Technologies/>
     <Footer textColor="var(--primary)" bgColor="var(--secondary)"/>
    </>
  )
}

export default App