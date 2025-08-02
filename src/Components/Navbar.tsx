
import { useState } from "react";

interface NavbarProps {
  textColor: string;
  bgColor: string;
}

const Navbar = ({ textColor, bgColor }: NavbarProps) => {
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
        className="w-full flex flex-row items-center justify-end p-4 absolute top-0 left-0 z-20"
        style={{
          color: textColor,
          backgroundColor: bgColor,
          fontFamily: "michroma"
        }}
      >
        {/* <h1 className="font-michroma uppercase xl:text-5xl cursor-pointer">
          <a href="/">airre</a>
        </h1> */}
        <div
          className="menu-icon relative cursor-pointer"
          className="menu-icon relative cursor-pointer"
          onClick={() => setMenuOpen(true)}
        >
          <img className="w-[72px] h-[72px]" src="/icons/menu.svg" alt="Menu Icon" style={{filter: `invert(${textColor === "var(--primary)" ? "0" : "1"})`}}/>
          <img className="w-[72px] h-[72px]" src="/icons/menu.svg" alt="Menu Icon" style={{filter: `invert(${textColor === "var(--primary)" ? "0" : "1"})`}}/>
        </div>
      </div>

      {/* Overlay Nav Menu */}
      {menuOpen && (
        <div className="fixed top-0 right-0 h-screen w-screen min-w-[320px] bg-black text-white z-50 flex flex-col justify-start p-8 font-michroma animate-fade-in">
          {/* Close Icon */}
          <div className="flex justify-end relative cursor-pointer">
            <button className="absolute top-8 right-0 cursor-pointer" onClick={() => setMenuOpen(false)} aria-label="Close menu">
          <div className="flex justify-end relative cursor-pointer">
            <button className="absolute top-8 right-0 cursor-pointer" onClick={() => setMenuOpen(false)} aria-label="Close menu">
              <img src="/icons/cross.svg" alt="Close Icon" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col justify-start items-start mt-28">
            <h2 className="text-3xl md:text-4xl mb-8">Navigation links</h2>
            <ul className="space-y-6 text-2xl md:text-3xl">
              <li><a href="/" className="hover:underline">Home</a></li>
              <li><a href="/blog" className="hover:underline">Blogs</a></li>
              <li><a href="/events" className="hover:underline">Events</a></li>
              <li><a href="/members" className="hover:underline">Members</a></li>
            </ul>
            <h2 className="text-3xl md:text-4xl mt-12 mb-8">Social Media links</h2>
            <ul className="space-y-6 text-2xl md:text-3xl">
              <li><a href="#" className="hover:underline">Twitter</a></li>
              <li><a href="#" className="hover:underline">Github</a></li>
              <li><a href="#" className="hover:underline">Hugging face</a></li>
              <li><a href="#" className="hover:underline">Youtube</a></li>
            </ul>
          </div>

          {/* Decorative corners */}
          <div className="flex justify-between w-full absolute bottom-12 left-0 px-8">
            <img src="/images/star.png" alt="Star" />
            <img src="/images/star.png" alt="Star" />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;