import { useEffect, useState } from "react";
import sanityClient from "../sanityClient";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

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
    <div className='w-screen min-h-screen bg-[var(--primary)] text-[var(--secondary)] font-michroma flex flex-col items-start justify-start py-28 px-32' style={{ fontFamily: "michroma" }}>
      <Navbar textColor="var(--secondary)" bgColor="var(--primary)" />
      <h1 className="text-[32px] md:text-[32px] lg:text-[32px] xl:text-[64px] 2xl:text-[64px]">
        Supportive pillers of AIRRE
      </h1>
      <div className='member-main w-full flex flex-col items-center justify-start gap-4 mt-12'>
        <div className='member-cards w-full flex flex-row flex-wrap items-center justify-start gap-4'>
          {loading ? (
            <div>Loading...</div>
          ) : (
            members.map((member) => (
              <div
                key={member._id}
                className="flex flex-col items-start w-[380px] cursor-pointer"
                onClick={() => member.slug?.current && navigate(`/members/${member.slug.current}`)}
              >
                {member.coverImage?.asset?.url && (
                  <img
                    src={member.coverImage.asset.url}
                    alt={member.name}
                    className="w-full h-full object-cover mb-2"
                  />
                )}
                <div className="font-bold text-lg">{member.name}</div>
                {member.role && <div className="text-sm text-gray-500">{member.role}</div>}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Members;