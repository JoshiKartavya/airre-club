import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Responsive Analysis:
 * 
 * Text Elements:
 * - "About us" label (top left): 
 *    - Font size: 
 *        - sm: 16px (default text-xl)
 *        - md: 20px (text-2xl)
 *        - lg: 24px (xl:text-[24px])
 * - Main h1 text:
 *    - Width:
 *        - sm: 80% (w-4/5)
 *        - md: 70% (md:w-3/4)
 *        - lg: 60% (xl:w-3/5)
 *    - Font size:
 *        - sm: 24px (text-[24px])
 *        - md: 32px (md:text-[32px])
 *        - lg: 48px (2xl:text-[48px])
 * - Highlighted spans:
 *    - Inherit font size from h1, color: var(--contrast)
 * 
 * Container:
 * - Padding top/bottom:
 *    - sm: py-28 (7rem)
 *    - md: py-20 (5rem)
 *    - lg: py-0 (xl:py-0)
 * - Min height:
 *    - sm: none
 *    - lg: min-h-screen (xl:min-h-screen)
 * 
 * Images: None in this section.
 * 
 * Responsive Tailwind classes are used for all breakpoints.
 */

const About = () => {
  const h1Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const h1 = h1Ref.current;
    if (!h1) return;

    const originalHTML = h1.innerHTML;

    function wrapWordsWithSpan(node: ChildNode): string {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent || '';
        const parts = text.split(/(\s+)/);
        return parts
          .map((part) =>
            part.trim() === ''
              ? part
              : `<span class="about-word" style="opacity:0.2; display:inline-block;">${part}</span>`
          )
          .join('');
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as Element;
        const tag = el.tagName.toLowerCase();
        const attrs = Array.from(el.attributes)
          .map((attr) => `${attr.name}="${attr.value}"`)
          .join(' ');
        const children = Array.from(el.childNodes)
          .map((child) => wrapWordsWithSpan(child))
          .join('');
        return `<${tag}${attrs ? ' ' + attrs : ''}>${children}</${tag}>`;
      }
      return '';
    }

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = originalHTML;
    const processedHTML = Array.from(tempDiv.childNodes)
      .map((child) => wrapWordsWithSpan(child))
      .join('');
    h1.innerHTML = processedHTML;

    const wordSpans = h1.querySelectorAll<HTMLSpanElement>('.about-word');

    // Setup ScrollTrigger animation
    gsap.to(wordSpans, {
      opacity: 1,
      stagger: 0.05,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: h1,
        start: 'top 80%',
        end: 'bottom 40%',
        scrub: true,
        markers: false,
      },
    });

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div
      id="about-section"
      className="
        h-full 
        py-28 md:py-20 xl:py-0 
        xl:min-h-screen 
        w-screen 
        relative 
        flex flex-col justify-center items-center 
        bg-[var(--secondary)]
      "
      style={{ fontFamily: 'michroma' }}
    >
      <div className="
        absolute left-6 top-6 
        text-xl md:text-2xl xl:text-[24px] 
        font-mono flex items-center gap-2
      ">
        <span className="text-xl">&#123;&#125;</span> About us
      </div>

      <h1
        ref={h1Ref}
        className="
          w-4/5 md:w-3/4 xl:w-3/5 
          text-[24px] md:text-[32px] 2xl:text-[48px]
        "
      >
        &#8203; &#8203; &#8203; &#8203; &#8203; &#8203; &#8203; &#8203; &#8203; &#8203; &#8203; &#8203; &#8203; &#8203; &#8203; &#8203; &#8203;
        Working with AIRRE is an absolute game changer. their approach bought
        <span className="text-[var(--contrast)]"> clarity & clean </span>
        to our brand. making every detail feel
        <span className="text-[var(--contrast)]"> intention and impactful</span>.
        the designs are not just beautiful - they tell a story
      </h1>
    </div>
  );
};

export default About;
