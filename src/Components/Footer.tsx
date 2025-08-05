interface FooterProps {
  textColor: string;
  bgColor: string;
}

const Footer = ({ textColor, bgColor }: FooterProps) => {
  return (
    <footer
      className="w-screen h-full py-28 xl:py-0 xl:min-h-screen flex flex-col justify-center items-end bg-transparent relative pt-12 pb-8 px-4 overflow-x-hidden"
      style={{ fontFamily: "michroma", color: textColor, backgroundColor: bgColor }}
    >
      {/* Contact us top left */}
      <div className="absolute left-12 top-12 xl:text-[24px] font-mono flex items-center gap-2">
        <span className="text-xl">&#123;&#125;</span> Contact us
      </div>

      {/* Main content */}
      <div className="flex flex-col items-start w-full max-w-3xl">
        <h2 className="text-[24px] xl:text-[32px] 2xl:text-[64px] font-michroma text-center mb-6 leading-tight">
          Let's Shape the<br />future together!
        </h2>
        <a
          href="mailto:hello@airre.club"
          className="border-2 rounded-lg px-8 py-2 text-[16px] xl:text-[24px] font-michroma flex items-center gap-2 mb-8 hover:bg-[var(--secondary)] hover:text-[var(--primary)] transition-colors"
        >
          Connect with us <span className="text-[16px] xl:text-[24px]">&#8250;</span>
        </a>
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