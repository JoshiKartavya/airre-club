import { Navbar, Footer } from "../Components/indexComponents"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import sanityClient from "../sanityClient";

// Types
interface MemberImage {
  asset?: { url?: string };
}

interface MemberSocial {
  platform?: string;
  url?: string;
}

interface Member {
  _id: string;
  name: string;
  role?: string;
  coverImage?: { asset?: { url?: string } };
  about?: string;
  social?: MemberSocial[];
}

interface Blog {
  _id: string;
  title: string;
  coverImage?: { asset?: { url?: string } };
  publishedAt?: string;
}

// Helper to highlight member name and numbers in about text
function highlightMemberNameAndNumbers(about: string, name: string) {
  if (!about) return about;

  // Escape RegExp special chars in name
  const escapedName = name ? name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') : '';
  // Build a regex that matches either the member name or any number
  // The number regex: \d+(\.\d+)? (matches integers and decimals)
  // If name is empty, just match numbers
  const regex = escapedName
    ? new RegExp(`(${escapedName}|\\d+(?:\\.\\d+)?)`, "gi")
    : new RegExp(`(\\d+(?:\\.\\d+)?)`, "g");

  const parts = about.split(regex);

  return parts.map((part, idx) => {
    // If part matches the name (case-insensitive) or is a number
    if (
      (escapedName && part && part.match(new RegExp(`^${escapedName}$`, "i"))) ||
      (part && part.match(/^\d+(\.\d+)?$/))
    ) {
      return (
        <span
          key={idx}
          className="text-[var(--secondary)] font-michroma"
          style={{
            color: "var(--contrast)",
            fontFamily: "michroma",
            fontWeight: "thin",
            fontStyle: "italic"
          }}
        >
          {part}
        </span>
      );
    }
    return part;
  });
}

const MemberDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [member, setMember] = useState<Member | null>(null);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<MemberImage[]>([]);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    // Fetch member by slug
    sanityClient
      .fetch(
        `*[_type == "member" && slug.current == $slug][0]{
          _id,
          name,
          role,
          coverImage{asset->{url}},
          about,
          social,
          images[]{asset->{url}}
        }`,
        { slug }
      )
      .then((data: any) => {
        // Ensure social is always an array of {platform, url} with url as string or undefined
        let socials: MemberSocial[] = [];
        if (data?.social && typeof data.social === "object" && !Array.isArray(data.social)) {
          // Convert object with keys (twitter, instagram, etc) to array of {platform, url}
          socials = Object.entries(data.social)
            .filter(([_, url]) => typeof url === "string" && url.length > 0)
            .map(([platform, url]) => ({
              platform,
              url
            } as MemberSocial));
        } else if (Array.isArray(data?.social)) {
          socials = data.social.map((soc: any) => {
            const platform = typeof soc.platform === "string" ? soc.platform : undefined;
            const url = typeof soc.url === "string" ? soc.url : undefined;
            return { platform, url } as MemberSocial;
          });
        }

        setMember({
          ...data,
          social: socials,
        });
        setImages(Array.isArray(data?.images) ? data.images : []);

        if (data?._id) {
          // Fetch blogs by this member
          sanityClient
            .fetch(
              `*[_type == "blog" && author._ref == $memberId]{
                _id,
                title,
                coverImage{asset->{url}},
                publishedAt
              }`,
              { memberId: data._id }
            )
            .then((blogs: Blog[]) => setBlogs(blogs));
        } else {
          setBlogs([]);
        }

        setLoading(false);
      })
      .catch(() => {
        setMember(null);
        setBlogs([]);
        setImages([]);
        setLoading(false);
      });
  }, [slug]);


  return (
    <div className='w-full min-h-screen bg-[var(--primary)] text-[var(--secondary)] font-michroma flex flex-col items-center justify-start pt-28 overflow-x-hidden' style={{ fontFamily: "michroma" }}>
      <Navbar textColor="var(--secondary)" bgColor="var(--primary)" />
      <div className="w-full mt-8">
        {loading ? (
          <div>Loading...</div>
        ) : member ? (
          <>
            <div className="w-full px-4 md:px-16 xl:px-32 flex flex-col xl:gap-8">
              <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-[48px] 2xl:text-[52px] mb-2">{member.name} {member.role ? `| ${member.role}` : ""}</h1>

              {/* Member content */}
              <div className="w-full flex flex-col xl:flex-row justify-start xl:gap-12">
                <div className="image w-full max-w-[456px]">
                  {member.coverImage?.asset?.url && (
                    <img
                      src={member.coverImage.asset.url}
                      alt={member.name}
                      className="w-full h-full object-cover mb-4"
                    />
                  )}
                </div>
                <div className="memberContent w-full xl:w-3/5 xl:gap-18">
                  <h2 className="xl:text-[32px]">
                    {member.about
                      ? highlightMemberNameAndNumbers(member.about, member.name)
                      : null}
                  </h2>
                  <div className="memberSocials xl:mt-12">
                    <h3 className="xl:text-[40px] font-thin">You can connect me on &darr;</h3>
                    {/* Social Media Section */}
                    {Array.isArray(member.social) && member.social.length > 0 && (
                      <div className="flex flex-row flex-wrap items-center gap-8 mt-2">
                        {member.social.map((soc, idx) =>
                          soc.url && soc.platform ? (
                            <h1
                              key={idx}
                              className="hover:underline xl:text-[28px] text-[var(--secondary)] cursor-pointer"
                              onClick={e => {
                                e.stopPropagation();
                                window.open(soc.url, "_blank", "noopener,noreferrer");
                              }}
                            >
                              {soc.platform.charAt(0).toUpperCase() + soc.platform.slice(1)}
                            </h1>
                          ) : null
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Images Section */}
              <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-[48px] 2xl:text-[52px] mb-6">
                Some of my images you can look at
              </h1>

              <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-3 xl:columns-4 2xl:columns-4 gap-4 space-y-4">
                {Array.isArray(images) && images.length > 0 ? (
                  images.map((img, idx) =>
                    img?.asset?.url ? (
                      <img
                        key={idx}
                        src={img.asset.url}
                        alt={`Member image ${idx + 1}`}
                        className="w-full mb-4 rounded-lg break-inside-avoid"
                      />
                    ) : null
                  )
                ) : (
                  <div className="text-lg text-gray-500">No images available.</div>
                )}
              </div>

              {/* Blog section */}
              <div>
                <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-[48px] 2xl:text-[52px] mb-2">Look 👀 at my blogs :</h1>
                {blogs.length === 0 ? (
                  <div>No blogs found for this member.</div>
                ) : (
                  <div
                    className="
                      grid 
                      grid-cols-1 
                      sm:grid-cols-2 
                      md:grid-cols-3 
                      xl:grid-cols-4 
                      gap-6
                    "
                  >
                    {blogs.map((blog) => (
                      <div
                        key={blog._id}
                        className="p-4 flex flex-col items-start"
                      >
                        {blog.coverImage?.asset?.url && (
                          <img
                            src={blog.coverImage.asset.url}
                            alt={blog.title}
                            className="w-full h-40 object-cover rounded mb-3"
                          />
                        )}
                        <h2 className="text-lg font-semibold text-center mb-2">{blog.title}</h2>
                        {blog.publishedAt && (
                          <p className="text-sm text-gray-500 mb-1">
                            {new Date(blog.publishedAt).toLocaleDateString()}
                          </p>
                        )}
                        {/* You can add a link to the blog detail page here if available */}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>


          </>
        ) : (
          <div>Member not found.</div>
        )}
      </div>
      <Footer textColor="var(--secondary)" bgColor="var(--primary)" />
    </div>
  );
}

export default MemberDetail;