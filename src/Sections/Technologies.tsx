/**
 * Responsive analysis for Technologies section:
 * 
 * TEXT SIZES:
 * - "Our Experties" (top left):
 *   - base: text-xl (20px)
 *   - xl: text-[24px]
 * - Main heading (h1.ser-title):
 *   - base: text-2xl (24px)
 *   - sm: text-3xl (30px)
 *   - md: text-4xl (36px)
 *   - lg: text-6xl (60px)
 *   - xl: text-6xl (60px)
 *   - 2xl: text-7xl (72px)
 * - Service title (h3):
 *   - base/sm/md: text-[16px]
 *   - lg/xl: text-[24px]
 * 
 * IMAGE SIZES:
 * - Arrow image:
 *   - base: w-16 (64px)
 *   - sm: w-18 (72px)
 *   - md: w-18 (72px)
 *   - lg: w-20 (80px)
 *   - xl/2xl: w-28 (112px)
 * - Service card:
 *   - base: w-[160px]
 *   - xl: w-[400px]
 *   - aspect-[232/337] (fixed aspect ratio)
 * 
 * PADDING/MARGINS:
 * - Top section: pt-20 (base), xl:pt-60
 * - Arrow: px-8/py-12 (base), xl:px-36/py-24
 * - Services grid: px-4/py-12 (base), xl:px-0/py-0/pr-20/pb-20
 * - Grid gap: gap-x-4/gap-y-8 (base), xl:gap-x-8
 * - Service title position: bottom-2/left-2 (base), xl:bottom-4/left-4
 * 
 * GRID:
 * - Services: grid-cols-2 (all), xl:grid-cols-2
 */

const Technologies = () => {
  const services = [
    { id: 1, title: "Humanoid", image: "/images/frame1.svg" },
    { id: 2, title: "Artificial General Intelligence", image: "/images/frame2.svg" },
    { id: 3, title: "Semi Conductor", image: "/images/frame3.svg" },
    { id: 4, title: "Brain Computer Interface", image: "/images/frame4.svg" },
  ];

  const formatTitle = (title: string) => {
    return title.split("").map((char, index) =>
      char.toLowerCase() === "e" ? (
        <span key={index} className="font-thin italic">
          {char}
        </span>
      ) : (
        <span key={index}>{char}</span>
      )
    );
  };

  return (
    <div
      id="Experties"
      className="services-main h-max w-full bg-[var(--primary)] text-[var(--secondary)] relative"
      style={{ fontFamily: "michroma" }}
    >
      {/* Contact us top left */}
      <div className="absolute left-12 top-12 text-xl xl:text-[24px] font-mono flex items-center gap-2">
        <span className="text-xl">&#123;&#125;</span> Our Experties
      </div>

      <div className="top w-full h-max md:h-max xl:h-max relative z-20 xl:pb-40">
        <div className="top-data w-full xl:w-[70%] h-full relative flex flex-col justify-start pt-20 xl:pt-60 items-center">
          <h1 className="ser-title text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-6xl 2xl:text-7xl font-bold w-4/5 xl:w-4/5 font-mono">
            Our team not only make simple projects, we{" "}
            <span className="text-[var(--contrast)] font-thin text-[var(--contrast)]">
              contribute
            </span>{" "}
            building new{" "}
            <span className="text-[var(--contrast)] font-thin text-[var(--contrast)]">
              human civilization.
            </span>{" "}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="content flex flex-row w-full h-max">
        {/* Arrow image - only visible on xl and up */}
        <div className="arrow hidden xl:block w-1/3 h-max px-8 xl:px-36 py-12 xl:py-24">
          <div className="arrow-img relative w-16 sm:w-18 md:w-18 lg:w-20 xl:w-28 2xl:w-28 aspect-square">
            <img
              src="/icons/arrow.svg"
              alt="arrow"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        <div className="services w-full flex justify-center xl:justify-end xl:pr-20 xl:pb-20 px-4 xl:px-0 py-12 xl:py-0">
          <div className="grid grid-cols-2 xl:grid-cols-2 gap-x-4 xl:gap-x-8 gap-y-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="service w-[160px] xl:w-[400px] aspect-[232/337] relative group bg-transparent shadow-none"
              >
                <div className="service-image w-full h-full relative overflow-hidden rounded-none">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    loading="eager"
                    style={{ position: "absolute", inset: 0 }}
                  />
                  <div className="absolute xl:bottom-4 bottom-2 xl:left-4 left-2 px-0 py-0 w-[90%]">
                    <h3 className="text-[16px] sm:text-[16px] md:text-[16px] lg:text-[24px] xl:text-[24px] font-michroma text-left">
                      {formatTitle(service.title)}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Technologies;