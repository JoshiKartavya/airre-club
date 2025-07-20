import { Navbar, Footer } from "../Components/indexComponents"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import sanityClient from "../sanityClient";

// Types
interface Member {
  _id: string;
  name: string;
  role?: string;
  coverImage?: { asset: { url: string } };
  about?: string;
  social?: {
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
  };
}

interface Blog {
  _id: string;
  title: string;
  coverImage?: { asset: { url: string } };
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
      .then((data: Member) => {
        setMember(data);
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
            <div className="w-full px-32 flex flex-col xl:gap-8">
              <h1 className="text-[] md:text-[] lg:text-[] xl:text-[48px] 2xl:text-[52px] mb-2">{member.name} | {member.role}</h1>

              {/* Member content */}
              <div className="w-full flex xl:flex-row justify-start xl:gap-12">
                <div className="image w-[456px]">
                  {member.coverImage?.asset?.url && (
                    <img
                      src={member.coverImage.asset.url}
                      alt={member.name}
                      className="w-full h-full object-cover mb-4"
                    />
                  )}
                </div>
                <div className="memberContent w-3/5 xl:gap-18">
                  <h2 className="xl:text-[32px]">
                    {member.about
                      ? highlightMemberNameAndNumbers(member.about, member.name)
                      : null}
                  </h2>
                  <div className="memberSocials xl:mt-12">
                    <h3 className="xl:text-[40px] font-thin">You can connect me on &darr;</h3>
                    {/* Social Media Section */}
                    {Array.isArray(member.social) && member.social.length > 0 && (
                      <div className="flex flex-row items-center gap-8 mt-2">
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
                              {soc.platform}
                            </h1>
                          ) : null
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Images section */}
              <h1 className="text-[] md:text-[] lg:text-[] xl:text-[48px] 2xl:text-[52px] mb-2">Some of my images you can look at</h1>
              <div className="flex flex-wrap gap-4 mb-8">
                {Array.isArray(member.images) && member.images.length > 0 ? (
                  member.images.map((img: any, idx: number) =>
                    img?.asset?.url ? (
                      <img
                        key={idx}
                        src={img.asset.url}
                        alt={`Member image ${idx + 1}`}
                        className="w-48 h-48 object-cover rounded-lg"
                      />
                    ) : null
                  )
                ) : (
                  <div className="text-lg text-gray-500">No images available.</div>
                )}
              </div>

            </div>
            {blogs.length === 0 ? (
              <div>No blogs found for this member.</div>
            ) : (
              <ul className="w-full flex flex-col gap-4">
                {blogs.map((blog) => (
                  <li key={blog._id} className="p-4 border rounded-lg flex items-center gap-4 bg-[var(--secondary)] text-[var(--primary)]">
                    {blog.coverImage?.asset?.url && (
                      <img src={blog.coverImage.asset.url} alt={blog.title} className="w-20 h-20 object-cover rounded" />
                    )}
                    <div>
                      <div className="font-bold text-lg">{blog.title}</div>
                      {blog.publishedAt && <div className="text-xs text-gray-500">{new Date(blog.publishedAt).toLocaleDateString()}</div>}
                    </div>
                  </li>
                ))}
              </ul>
            )}
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