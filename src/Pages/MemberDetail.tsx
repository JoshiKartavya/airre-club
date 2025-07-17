import { Navbar, Footer } from "../Components/indexComponents"

const MemberDetail = () => {
  return (
    <div className='w-screen h-screen bg-[var(--primary)] text-[var(--secondary)] font-michroma flex flex-col items-center justify-start pt-28'>
        <Navbar textColor="var(--secondary)" bgColor="var(--primary)"/>
        <div>
            
        </div>
        <Footer textColor="var(--secondary)" bgColor="var(--primary)"/>
    </div>
  )
}

export default MemberDetail