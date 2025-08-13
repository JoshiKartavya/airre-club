
import { useState } from "react";

interface NavbarProps {
  textColor: string;
  bgColor: string;
}

const Navbar = ({ textColor, bgColor }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <div
        className="w-full flex flex-row items-center justify-end xl:justify-between p-4 absolute top-0 left-0 z-20"
        style={{
          color: textColor,
          backgroundColor: bgColor,
          fontFamily: "michroma"
        }}
      >
        <h1 className="font-michroma uppercase xl:block hidden text-[24px] md:text-[24px] lg:text-[24px] xl:text-[32px] 2xl:text-[34px] cursor-pointer">
          <a href="/">airre</a>
        </h1>
        <div
          className="menu-icon relative cursor-pointer"
          onClick={() => setMenuOpen(true)}
        >
          <img
            className="w-[48px] h-[48px] xl:w-[72px] xl:h-[72px]"
            src="/icons/menu.svg"
            alt="Menu Icon"
            style={{
              filter: `invert(${textColor === "var(--primary)" ? "0" : "1"})`
            }}
          />
        </div>
      </div>

      {/* Overlay Nav Menu */}
      {menuOpen && (
        <div className="fixed top-0 right-0 h-screen w-full xl:w-1/2 min-w-[320px] bg-white/60 backdrop-blur-xl text-black z-50 flex flex-col justify-start items-start p-8 font-michroma animate-fade-in pl-12" style={{ backgroundColor: "rgba(255,255,255,0.4)", backdropFilter: "blur(24px)" }}>
          {/* Close Icon */}
          <div className="  cursor-pointer absolute top-3 right-3 z-[60]">
            <button
              className="cursor-pointer"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <img className="w-[48px] h-[48px] xl:w-[72px] xl:h-[72px]" src="/icons/cross.svg" alt="Close Icon" />
            </button>
          </div>

          <div className="flex flex-row justify-between items-start w-full">
            <div className="flex flex-col justify-start items-start mt-12 xl:mt-28 xl:gap-4 gap-4">
              {/* Navigation Links */}
              <div className="flex flex-col justify-start items-start">
                <h2 className="text-[24px] md:text-[24px] lg:text-[24px] xl:text-[32px] 2xl:text-[34px] mb-8">Navigation links</h2>
                <div className="text-[16px] md:text-[16px] lg:text-[16px] xl:text-[24px] 2xl:text-[24px] grid grid-cols-1 xl:grid-cols-1 gap-4">
                  <p><a href="/" className="hover:underline">Home</a></p>
                  <p><a href="/blog" className="hover:underline">Blogs</a></p>
                  <p><a href="/events" className="hover:underline">Events</a></p>
                  <p><a href="/members" className="hover:underline">Members</a></p>
                </div>
              </div>

              {/* Social Media Links */}
              <div>
                <h2 className="text-[24px] md:text-[24px] lg:text-[24px] xl:text-[32px] 2xl:text-[34px] mt-12 mb-8">Social Media links</h2>
                <div className="text-[16px] md:text-[16px] lg:text-[16px] xl:text-[24px] 2xl:text-[24px] grid grid-cols-1 xl:grid-cols-1 gap-4">
                  <p><a href="#" className="hover:underline">Twitter</a></p>
                  <p><a href="#" className="hover:underline">Github</a></p>
                  <p><a href="#" className="hover:underline">Hugging face</a></p>
                  <p><a href="#" className="hover:underline">Youtube</a></p>
                </div>
              </div>
            </div>

            {/* Image
            <div className="h-full flex justify-center items-center hidden xl:block">
              <img src="/images/Nav-Model.png" alt="Image" />
            </div> */}
          </div>

          {/* Decorative corners */}
          {/* <div className="flex justify-between w-full absolute bottom-12 left-0 px-8">
            <img src="/images/star.png" alt="Star" />
            <img src="/images/star.png" alt="Star" />
          </div> */}
        </div>
      )}
    </>
  );
};

export default Navbar;