import { Navbar, Spotlight } from "../Components/indexComponents"
// import { cn } from "../lib/utils"

const Hero = () => {
    return (
        <>
            <div className="hero-main-back w-screen h-screen flex flex-col items-center justify-center bg-[var(--primary)] text-[var(--secondary)] relative overflow-hidden" style={{ fontFamily: "michroma" }}>
                <Spotlight
                    className="top-0 left-0 absolute"
                    fill="white"
                />
                <Spotlight
                    className="top-0 left-[80%] flip-y absolute"
                    fill="white"
                />
                <Navbar textColor="var(--secondary)" bgColor="transparent" />
                {/* <div className="hero-content flex flex-col h-max mb-32 pl-10">
                        <h1 className="text-[32px]">we are</h1>
                        <h1 className="text-[220px] uppercase" style={{fontFamily: "bebas neue"}}>airre</h1>
                        <h1 className="text-[32px]">ai - robotics - rocketry - energy</h1>
                    </div>
                    <div className="absolute z-10 right-10 top-40">
                        <div className="image relative w-[400px] h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] xl:w-[800px] xl:h-[800px]">
                            <img src="/images/hero-model.png" alt="image" />
                        </div>
                    </div> */}

                <div className=" w-full h-full flex flex-col items-start justify-between px-20 pb-32">
                    <h1 className=" text-[320px] uppercase w-full text-center tracking-[0.25em]" style={{ fontFamily: "michroma" }}>AIRRE</h1>
                    <div className="flex flex-col items-start justify-center gap-8">
                        <p className="text-[24px] w-4/5">
                            Reimagining the future with AIRRE
                        </p>
                        <div className="flex flex-row items-center justify-center ">
                            <button className="bg-[var(--secondary)] text-[var(--primary)] px-4 py-2 rounded-md cursor-pointer" onClick={() => {
                                window.open("https://airre.ai/join", "_blank")
                            }}>
                                <p className="text-[24px]">
                                    Join the team
                                </p>
                            </button>
                        </div>
                    </div>
                </div>
                <img className="absolute bottom-0 aspect-[746/968] w-[35%] left-1/2 -translate-x-1/2" src="/images/Hero-Model.png" alt="image" />
            </div>
        </>
    )
}

export default Hero