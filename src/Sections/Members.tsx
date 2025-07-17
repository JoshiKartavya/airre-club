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
    }, []);

    return (
        <div className='w-screen h-screen bg-[var(--secondary)] text-[var(--primary)] font-michroma flex flex-col items-center justify-start pt-28' style={{fontFamily: "michroma"}}>
            <div className='w-[96%] rounded-2xl h-full flex flex-col items-start justify-start p-8 bg-[var(--primary)] text-[var(--secondary)] relative'>
                <div className="absolute left-12 top-12 xl:text-[24px] font-mono flex items-center gap-2">
                    <span className="text-xl">&#123;&#125;</span> Our Members
                </div>

                <div className='member-main w-full h-full flex flex-col items-center justify-start gap-4 mt-12'>
                    <div className='member-cards w-full h-full flex flex-row items-center justify-start gap-4'>
                        {loading ? (
                            <div>Loading...</div>
                        ) : (
                            members.map((member) => (
                                <div
                                    key={member._id}
                                    className="p-4 flex flex-col items-start w-[456px] cursor-pointer"
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
                    <div className='w-max h-12 bg-[var(--primary)] text-[var(--secondary)] border-1 border-[var(--secondary)] px-12 py-6 rounded-2xl flex flex-col justify-center items-center cursor-pointer' onClick={() => navigate(`/members`)}>
                        View All Members
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Members;