// Icon Imports
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { SiHuggingface } from "react-icons/si";

interface FooterProps {
  textColor: string;
  bgColor: string;
}

const Footer = ({ textColor, bgColor }: FooterProps) => {
  return (
    <footer
      className="w-screen min-h-screen flex flex-col justify-center items-end bg-transparent relative pt-12 pb-8 px-4 overflow-x-hidden"
      style={{ fontFamily: "michroma", color: textColor, backgroundColor: bgColor }}
    >
      {/* Contact us top left */}
      <div className="absolute left-4 top-4 xl:left-12 xl:top-12 xl:text-[24px] font-mono flex items-center gap-2">
        <span className="text-xl">&#123;&#125;</span> Contact us
      </div>

      {/* Main content */}
      <div className="flex flex-col items-start w-full max-w-3xl">
        <h2 className="text-[24px] xl:text-[32px] 2xl:text-[64px] font-michroma text-center mb-6 leading-tight">
          Let's Shape the<br />future together!
        </h2>

        <hr className="w-full border-t-2 my-4" />

        

        <div className="socials flex justify-start items-center gap-8 text-3xl">
          <FaGithub className="cursor-pointer" onClick={e => { e.stopPropagation(); window.open("https://github.com/airre-club", "_blank", "noopener,noreferrer");  }}/>
          <FaInstagram className="cursor-pointer" onClick={e => { e.stopPropagation(); window.open("https://www.instagram.com/airreclub/", "_blank", "noopener,noreferrer"); }} />
          <FaXTwitter className="cursor-pointer" onClick={e => { e.stopPropagation(); window.open("https://x.com/airr_club", "_blank", "noopener,noreferrer"); }} />
          <FaYoutube className="cursor-pointer" onClick={e => { e.stopPropagation(); window.open("https://www.youtube.com/@airre-club", "_blank", "noopener,noreferrer"); }} />
          <SiHuggingface className="cursor-pointer" onClick={e => { e.stopPropagation(); window.open("https://huggingface.co/airr-club-palanpur ", "_blank", "noopener,noreferrer"); }} />
        </div>

        <button
          onClick={() => {
            window.open("mailto:airr.club.palanpur@gmail.com");
          }}
          type="button"
          className="border-2 rounded-lg cursor-pointer mt-8 px-8 py-2 text-[16px] xl:text-[24px] font-michroma flex items-center gap-2 mb-8 hover:bg-[var(--primary)] hover:text-[var(--secondary)] transition-colors"
        >
          Connect with us <span className="text-[16px] xl:text-[24px]">&#8250;</span>
        </button>

        <hr className="w-full border-t-2 my-4" />

        {/* Copyright */}
        <div className="w-full flex justify-start mt-4">
          <span className="text-[24px] xl:text-[32px] 2xl:text-[32px] font-mono tracking-widest font-nunito">
            © {new Date().getFullYear()} airre club. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;