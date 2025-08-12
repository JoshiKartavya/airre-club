import { useEffect, useState, useRef } from 'react';
import sanityClient from '../sanityClient';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

interface Project {
  _id: string;
  title: string;
  category: string;
  coverPhoto?: { asset: { url: string } };
  link?: string;
}

/**
 * Responsive Analysis:
 * 
 * 1. Main container: w-screen, h-max, padding-bottom-32, font-michroma, etc.
 *    - Responsive: width is always 100vw, padding is fixed, but content width is controlled below.
 * 
 * 2. "Selected works" label (top left):
 *    - left-12 top-12: 3rem from left/top (fixed for all screens)
 *    - xl:text-[24px]: 24px font size on xl and up, default is inherited (likely 16px)
 *    - text-xl on the icon: 1.25rem (20px)
 *    - Responsive: Only the text size increases at xl (1280px+)
 *      - sm: ~16px, md: ~16px, lg: ~16px, xl: 24px
 * 
 * 3. Main content wrapper: w-4/5 (80% width), flex-col, items-start
 *    - Responsive: 80% width for all screens, but can be improved for mobile
 *      - sm: 90% (suggested), md: 80%, lg: 70%
 * 
 * 4. Animated h1:
 *    - className='text-[32px] md:text-[32px] lg:text-[32px] xl:text-[64px] 2xl:text-[64px] ... w-4/5 my-28 xl:my-60'
 *    - Responsive font size:
 *      - sm: 32px
 *      - md: 32px
 *      - lg: 32px
 *      - xl: 64px
 *      - 2xl: 64px
 *    - Responsive margin-y:
 *      - sm: my-28 (7rem)
 *      - xl: my-60 (15rem)
 * 
 * 5. Project card:
 *    - h2: text-2xl (1.5rem/24px), font-bold, mb-2
 *      - Responsive: always 24px
 *    - p: text-sm (0.875rem/14px), mb-2
 *      - Responsive: always 14px
 *    - img: w-full, max-h-[900px], object-cover, rounded, mb-4
 *      - Responsive: width always 100%, max-height 900px (could be large for mobile)
 *      - Suggest: max-h-[300px] for sm, [500px] for md, [900px] for lg+
 * 
 * 6. Project list wrapper:
 *    - gap-4, w-full, mt-12 xl:mt-24
 *      - Responsive: gap-4 (1rem), margin-top 3rem (sm), 6rem (xl)
 * 
 * 
 * Responsive values summary:
 * 
 * | Element         | sm                | md                | lg                |
 * |-----------------|-------------------|-------------------|-------------------|
 * | Main wrapper    | w-[90%]           | w-4/5 (80%)       | w-[70%]           |
 * | h1 font size    | text-[24px]       | text-[32px]       | text-[48px]       |
 * | h1 margin-y     | my-16             | my-28             | my-40             |
 * | h2 font size    | text-xl (20px)    | text-2xl (24px)   | text-3xl (30px)   |
 * | p font size     | text-sm (14px)    | text-base (16px)  | text-lg (18px)    |
 * | img max-h       | max-h-[200px]     | max-h-[400px]     | max-h-[700px]     |
 * | gap             | gap-2             | gap-4             | gap-6             |
 * 
 * 
 * Below is the code with responsive classes for sm, md, and lg breakpoints.
 */

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const h1Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "project"]{_id, title, category, coverPhoto{asset->{url}}, link}`
      )
      .then((data: Project[]) => {
        setProjects(data);
        setLoading(false);
      })
      .catch(() => {
        setProjects([]);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const h1 = h1Ref.current;
    if (!h1) return;

    // Get the original HTML (including spans for colored words)
    const originalHTML = h1.innerHTML;

    // Helper to wrap each word in a span, preserving HTML tags
    function wrapWordsWithSpan(node: ChildNode): string {
      if (node.nodeType === Node.TEXT_NODE) {
        // Split text node by spaces, preserving spaces
        const text = node.textContent || '';
        // Split by space, but keep the spaces
        const parts = text.split(/(\s+)/);
        return parts
          .map((part) => {
            if (part.trim() === '') {
              // It's a space, return as is
              return part;
            }
            // It's a word, wrap in span
            return `<span class="project-word" style="opacity:0.2; display:inline-block;">${part}</span>`;
          })
          .join('');
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // If it's an element, recursively process its children
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

    // Parse the original HTML into a document fragment
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = originalHTML;
    const processedHTML = Array.from(tempDiv.childNodes)
      .map((child) => wrapWordsWithSpan(child))
      .join('');
    h1.innerHTML = processedHTML;

    const wordSpans = h1.querySelectorAll<HTMLSpanElement>('.project-word');

    gsap.to(wordSpans, {
      opacity: 1,
      stagger: 0.05,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: h1,
        start: 'top 70%',
        end: 'bottom 30%',
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div
      className='w-screen h-max bg-[var(--primary)] text-[var(--secondary)] font-michroma flex flex-col items-center justify-start pb-16 md:pb-24 lg:pb-32 overflow-x-hidden relative'
      style={{ fontFamily: "michroma" }}
    >

      {/* Contact us top left */}
      <div className="absolute left-4 top-4 md:left-8 md:top-8 xl:left-12 xl:top-12 text-base md:text-lg xl:text-[24px] font-mono flex items-center gap-1 md:gap-2">
        <span className="text-lg md:text-xl">&#123;&#125;</span> Selected works
      </div>

      {/* Projects text animation */}
      <div className='w-[90%] md:w-4/5 lg:w-[70%] flex flex-col items-start justify-start'>
        <h1
          id='project-hook'
          ref={h1Ref}
          className='
            text-[24px] md:text-[32px] lg:text-[48px] xl:text-[64px] 2xl:text-[64px]
            font-michroma
            w-full
            my-16 md:my-28 lg:my-40 xl:my-60
          '
        >
          Presenting some of our <span className='text-[var(--contrast)]'>contribution</span> to new era of modern civilization
        </h1>

        {/* Projects */}
        {loading ? (
          <div>Loading...</div>
        ) : projects.length === 0 ? (
          <div>No projects found.</div>
        ) : (
          <div className='flex flex-col items-center justify-start gap-2 md:gap-4 lg:gap-6 w-full mt-8 md:mt-12 xl:mt-24'>
            {projects.map((project) => (
              <div
                key={project._id}
                className='text-[var(--secondary)] w-[80%] flex flex-col items-start justify-start cursor-pointer'
                onClick={() => { window.open(project.link, '_blank'); }}
              >
                <div className='flex flex-row items-center justify-between gap-2 md:gap-4 w-full'>
                  <h2 className='text-[12px] md:text-2xl lg:text-3xl font-bold mb-1 md:mb-2'>{project.title}</h2>
                  <p className='text-[8px] md:text-base lg:text-lg mb-1 md:mb-2'>{project.category}</p>
                </div>
                {project.coverPhoto?.asset?.url && (
                  <img
                    src={project.coverPhoto.asset.url}
                    alt={project.title}
                    className='w-full max-h-[200px] md:max-h-[400px] lg:max-h-[700px] xl:max-h-[900px] object-cover mb-2 md:mb-4'
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;