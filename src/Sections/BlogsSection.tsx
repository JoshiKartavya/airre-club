import { useEffect, useState } from 'react';
import client from '../sanityClient';

interface Blog {
  _id: string;
  title: string;
  category: string;
  coverImage?: { asset: { url: string } };
  blogLink?: string;
  date?: string;
}

const BlogsSection = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.fetch(
      `*[_type == "blog"]{_id, title, category, coverImage{asset->{url}}, blogLink, date}`
    ).then((data) => {
      setBlogs(data);
      setLoading(false);
    });
  }, []);

  const catogaries = [
    {
      id: 1,
      name: "All",
    },
    {
      id: 2,
      name: "AI",
    },
    {
      id: 3,
      name: "Robotics",
    },
    {
      id: 4,
      name: "Rocketry",
    },
    {
      id: 5,
      name: "Energy",
    },
  ]

  return (
    <div className='w-screen h-max bg-[var(--primary)] text-[var(--secondary)] font-michroma flex flex-col items-center justify-start pt-28 overflow-x-hidden'>
      <div className='w-4/5 flex flex-col items-start justify-start '>
        <h1 className='text-[32px] md:text-[32px] lg:text-[32px] xl:text-[64px] 2xl:text-[64px] font-michroma mb-8'>Blogs</h1>
        <div className='flex flex-row items-center justify-start gap-12 w-full'>
          {catogaries.map((category) => (
            <div key={category.id} className='text-[16px] md:text-[16px] lg:text-[16px] xl:text-[24px] 2xl:text-[24px] font-michroma hover:underline cursor-pointer'>
              {category.name}
            </div>
          ))}
        </div>
        
        {loading ? (
          <div>Loading...</div>
        ) : blogs.length === 0 ? (
          <div>No blogs found.</div>
        ) : (
          <div className='flex flex-col items-center justify-start gap-4 w-full mt-12'>
            {blogs.map((blog) => (
              <div key={blog._id} className='text-[var(--secondary)] w-full flex flex-col items-start justify-start'>
                <div className='flex flex-row items-center justify-between gap-4 w-full'>
                  <h2 className='text-2xl font-bold mb-2'>{blog.title}</h2>
                  <p className='text-sm mb-2'>{blog.date}</p>
                </div>
                {blog.coverImage?.asset?.url && (
                  <img 
                    src={blog.coverImage.asset.url} 
                    alt={blog.title} 
                    className='w-full h-full object-cover rounded mb-4 cursor-pointer'
                    onClick={() => window.open(blog.blogLink, '_blank')}
                  />
                )}
                {/* {blog.blogLink && (
                  <a href={blog.blogLink} target='_blank' rel='noopener noreferrer' className='text-blue-600 underline'>Read Blog</a>
                )} */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogsSection;