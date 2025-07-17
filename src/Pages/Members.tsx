import { useEffect, useState } from "react";
import sanityClient from "../sanityClient";
import { useNavigate } from "react-router-dom";

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
    <div className='w-screen min-h-screen bg-[var(--secondary)] text-[var(--primary)] font-michroma flex flex-col items-center justify-start pt-28'>
      <div className='w-[96%] rounded-2xl min-h-[70vh] flex flex-col items-start justify-start p-8 bg-[var(--primary)] text-[var(--secondary)] relative'>
        <div className="absolute left-12 top-12 xl:text-[24px] font-mono flex items-center gap-2">
          <span className="text-xl">&#123;&#125;</span> Our Members
        </div>
        <div className='member-main w-full flex flex-col items-center justify-start gap-4 mt-12'>
          <div className='member-cards w-full flex flex-row flex-wrap items-center justify-start gap-4'>
            {loading ? (
              <div>Loading...</div>
            ) : (
              members.map((member) => (
                <div
                  key={member._id}
                  className="p-4 flex flex-col items-start w-[320px] bg-[var(--secondary)] text-[var(--primary)] rounded-xl shadow cursor-pointer hover:scale-105 transition"
                  onClick={() => member.slug?.current && navigate(`/members/${member.slug.current}`)}
                >
                  {member.coverImage?.asset?.url && (
                    <img
                      src={member.coverImage.asset.url}
                      alt={member.name}
                      className="w-full h-48 object-cover mb-2 rounded"
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
    </div>
  );
};

export default Members;