import { useEffect, useState } from "react";
import sanityClient from "../sanityClient";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

type Member = {
  _id: string;
  name: string;
  role?: string;
  coverImage?: {
    asset: {
      url: string;
    };
  };
  about?: string;
  social?: {
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
  };
  slug?: { current: string };
};

const Members = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "member"]{
          _id,
          name,
          role,
          slug,
          coverImage{
            asset->{url}
          },
          about,
          social
        }`
      )
      .then((data: Member[]) => {
        setMembers(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setMembers([]);
      });
  }, []);

  return (
    <>
    <div className="w-full min-h-screen overflow-x-hidden" style={{ fontFamily: "michroma" }}>
        <Navbar textColor="var(--secondary)" bgColor="var(--primary)" />
        <div className='w-full min-h-screen overflow-x-hidden bg-[var(--primary)] text-[var(--secondary)] font-michroma flex flex-col items-start justify-start px-4 py-20 xl:py-28 xl:px-32' style={{ fontFamily: "michroma" }}>
          <h1 className="text-[32px] md:text-[32px] lg:text-[32px] xl:text-[64px] 2xl:text-[64px]">
            Supportive pillers of AIRRE
          </h1>
          <div className='member-main w-full flex flex-col items-center justify-start gap-4 mt-12'>
            <div className='member-cards w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6'>
              {loading ? (
                <div>Loading...</div>
              ) : (
                members.map((member) => (
                  <div
                    key={member._id}
                    className="flex flex-col items-start justify-start cursor-pointer group"
                    onClick={() => member.slug?.current && navigate(`/members/${member.slug.current}`)}
                  >
                    <div className="w-full aspect-[3/4] overflow-hidden mb-3 flex items-center justify-center">
                      {member.coverImage?.asset?.url ? (
                        <img
                          src={member.coverImage.asset.url}
                          alt={member.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          style={{ minHeight: 0, minWidth: 0 }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm bg-gray-100 rounded-lg">
                          No Image
                        </div>
                      )}
                    </div>
                    <div className="font-bold text-lg text-start">{member.name}</div>
                    {member.role && <div className="text-sm text-gray-500 text-start">{member.role}</div>}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        <Footer textColor="var(--secondary)" bgColor="var(--primary)" />
      </div>
    </>
  );
};

export default Members;