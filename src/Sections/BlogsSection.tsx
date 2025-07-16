import { useEffect, useState } from 'react';
import client from '../sanityClient';

interface Blog {
  _id: string;
  title: string;
  category: string;
  coverImage?: { asset: { url: string } };
  blogLink?: string;
}

const BlogsSection = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.fetch(
      `*[_type == "blog"]{_id, title, category, coverImage{asset->{url}}, blogLink}`
    ).then((data) => {
      setBlogs(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className='w-full min-h-screen bg-[var(--secondary)] text-[var(--primary)] font-michroma flex flex-col items-center justify-center relative mt-32'>
      <div className='absolute left-12 top-12 xl:text-[24px] font-mono flex items-center gap-2'>
        <span className="text-xl">&#123;&#125;</span> Blogs
      </div>
      <div className='w-full flex flex-col items-center justify-center'>
        <h1 className='text-[32px] md:text-[32px] lg:text-[32px] xl:text-[64px] 2xl:text-[64px] font-michroma mb-8'>Blogs</h1>
        {loading ? (
          <div>Loading...</div>
        ) : blogs.length === 0 ? (
          <div>No blogs found.</div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {blogs.map((blog) => (
              <div key={blog._id} className='bg-white text-black rounded-lg shadow-md p-6 max-w-xs flex flex-col items-center'>
                {blog.coverImage?.asset?.url && (
                  <img src={blog.coverImage.asset.url} alt={blog.title} className='w-full h-48 object-cover rounded mb-4' />
                )}
                <h2 className='text-2xl font-bold mb-2'>{blog.title}</h2>
                <p className='text-sm mb-2'>Category: {blog.category}</p>
                {blog.blogLink && (
                  <a href={blog.blogLink} target='_blank' rel='noopener noreferrer' className='text-blue-600 underline'>Read Blog</a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogsSection;