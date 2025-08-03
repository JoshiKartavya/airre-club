import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Loader = ({ onFinish }: { onFinish: () => void }) => {
  const [count, setCount] = useState(1);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev === 100) {
          clearInterval(interval);
          setFadeOut(true);
          setTimeout(onFinish, 1000); // fade duration
          return prev; // Stay at 100
        }
        return prev + 1;
      });
    }, 25);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: fadeOut ? 0 : 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="fixed top-0 left-0 w-full h-screen bg-black z-50 flex items-end justify-end p-6"
    >
      <p className="text-white font-mono text-[100px]" style={{ fontFamily: "michroma" }}>
        {String(count).padStart(3, "0")}
      </p>
    </motion.div>
  );
};

export default Loader;
