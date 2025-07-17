import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

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
          .map((part) => {
            if (part.trim() === '') return part;
            return `<span class="about-word" style="opacity:0.2; display:inline-block;">${part}</span>`;
          })
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

    // Parse and wrap words
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = originalHTML;
    const processedHTML = Array.from(tempDiv.childNodes)
      .map((child) => wrapWordsWithSpan(child))
      .join('');
    h1.innerHTML = processedHTML;

    const wordSpans = h1.querySelectorAll<HTMLSpanElement>('.about-word');

    // Use a unique id for this ScrollTrigger
    const triggerId = 'about-word-trigger';

    gsap.to(wordSpans, {
      opacity: 1,
      stagger: 0.05,
      ease: 'power2.out',
      scrollTrigger: {
        id: triggerId,
        trigger: h1,
        start: 'top 70%',
        end: 'bottom 30%',
        scrub: true,
        markers: true, // You can turn this off after debugging
      },
    });

    return () => {
      ScrollTrigger.getById(triggerId)?.kill();
      h1.innerHTML = originalHTML;
    };
  }, []);

  return (
    <div className="min-h-screen w-screen relative flex flex-col justify-center items-center bg-[var(--secondary)]" style={{ fontFamily: "michroma" }}>
      {/* Contact us top left */}
      <div className="absolute left-12 top-12 xl:text-[24px] font-mono flex items-center gap-2">
        <span className="text-xl">&#123;&#125;</span> Selected works
      </div>
      <h1
        id="about-hook"
        ref={h1Ref}
        className="w-3/5 text-[32px] md:text-[32px] lg:text-[32px] xl:text-[48px] 2xl:text-[48px]"
      >
        &#8203; &#8203; &#8203; &#8203; &#8203; &#8203; &#8203; &#8203; &#8203; &#8203; &#8203; &#8203; &#8203; &#8203; &#8203; &#8203; &#8203; Working with AIRRE is an absolute game changer. their approach bought <span className="text-[var(--contrast)]">clarity & clean</span> too our brand. making every detail feel <span className="text-[var(--contrast)]">intention and impactful</span>. the designs are not just beautiful - they tell a story
      </h1>
    </div>
  );
};

export default About;
