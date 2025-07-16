
import { Navbar } from "../Components/indexComponents"

const Hero = () => {
    return (
        <>
            <div className="hero-main-back w-screen h-screen flex flex-col items-center justify-center bg-[var(--primary)] text-[var(--primary)] font-michroma">
                <div className="hero-inner h-[94%] w-[98%] bg-[var(--secondary)] rounded-2xl flex flex-col items-start  justify-end relative">
                    <Navbar />
                    <div className="hero-content flex flex-col h-max mb-32 pl-10 gap-[-40px]">
                        <h1 className="text-[32px]">we are</h1>
                        <h1 className="text-[200px] uppercase font-bebas">airre</h1>
                        <h1 className="text-[32px]">ai - robotics - rocketry - energy</h1>
                    </div>
                    <div className="absolute z-10 right-10 top-30">
                        <div className="image relative w-[400px] h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] xl:w-[700px] xl:h-[700px]">
                            <img src="/images/hero-model.png" alt="image" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Hero