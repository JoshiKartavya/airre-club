import React, { useEffect, useRef, useState } from "react";

const isMobile = () => /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);

export const CustomCursorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    if (isMobile()) return; // Don't show on mobile

    setShowCursor(true);

    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX - 8}px, ${e.clientY - 8}px, 0)`;
      }
    };

    document.addEventListener("mousemove", moveCursor);

    return () => {
      document.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <div className="relative select-none" style={{ cursor: isMobile() ? "auto" : "none" }}>
      {/* Custom Cursor */}
      {showCursor && (
        <div
          ref={cursorRef}
          className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-90 mix-blend-difference hidden md:block"
          style={{ backgroundColor: "white" }}
        />
      )}
      {children}
    </div>
  );
};
