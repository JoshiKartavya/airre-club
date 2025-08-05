import { Navbar, Spotlight } from "../Components/indexComponents"
import { motion } from "framer-motion";
// import { cn } from "../lib/utils"

const Hero = () => {
    return (
        <>
            <motion.div
                className="hero-main-back w-screen h-screen flex flex-col items-center justify-center bg-[var(--primary)] text-[var(--secondary)] relative overflow-hidden"
                style={{ fontFamily: "michroma" }}
                initial={{ opacity: 0, y: 60, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
                <Spotlight
                    className="top-0 left-0 absolute"
                    fill="white"
                />
                <Spotlight
                    className="top-0 left-[80%] flip-y absolute"
                    fill="white"
                />
                <Navbar textColor="var(--secondary)" bgColor="transparent" />
                <div className=" w-full h-full flex flex-col items-start justify-between px-4 xl:px-20 pt-20 xl:pt-0 xl:pb-32">
                    {/* Hero Text */}
                    <motion.h1
                        className="text-[60px] md:text-[120px] lg:text-[120px] 2xl:text-[320px] uppercase w-full text-center tracking-[0.25em]"
                        style={{ fontFamily: "michroma" }}
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    >
                        AIRRE
                    </motion.h1>

                    {/* Hero Description */}
                    <motion.div
                        className="flex flex-col items-start justify-center gap-8 hidden xl:block"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <p className="text-[16px] md:text-[16px] lg:text-[16px] 2xl:text-[24px] w-4/5">
                            Reimagining the future with AIRRE
                        </p>
                        <div className="flex flex-row items-center justify-center ">
                            <button className="bg-[var(--secondary)] text-[var(--primary)] px-4 py-2 rounded-md cursor-pointer" onClick={() => {
                                window.open("https://airre.ai/join", "_blank")
                            }}>
                                <p className="text-[16px] md:text-[16px] lg:text-[16px] 2xl:text-[24px]">
                                    Join the team
                                </p>
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Hero Image */}
                <motion.img
                    className="absolute bottom-0 aspect-[746/968] xl:w-[35%] w-[80%] left-1/2 -translate-x-1/2"
                    src="/images/hero-model.png"
                    alt="image"
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                />
            </motion.div>
        </>
    )
}

export default Hero