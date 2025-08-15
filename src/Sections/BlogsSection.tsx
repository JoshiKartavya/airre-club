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

interface BlogCategory {
  _id: string;
  title: string;
}

const BlogsSection = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    // Fetch blogs
    client.fetch(
      `*[_type == "blog"]{_id, title, "category": category->title, coverImage{asset->{url}}, blogLink, date}`
    ).then((data) => {
      setBlogs(data);
    });

    // Fetch categories
    client.fetch(
      `*[_type == "blogCategory"]{_id, title}`
    ).then((data) => {
      setCategories(data);
      setLoading(false);
    });
  }, []);

  // Filter blogs based on selected category
  const filteredBlogs = selectedCategory === 'All' 
    ? blogs 
    : blogs.filter(blog => blog.category === selectedCategory);

  return (
    <div className='w-screen h-max bg-[var(--primary)] text-[var(--secondary)] font-michroma flex flex-col items-center justify-start pt-28 overflow-x-hidden'>
      <div className='w-4/5 flex flex-col items-start justify-start '>
        <h1 className='text-[32px] md:text-[32px] lg:text-[32px] xl:text-[64px] 2xl:text-[64px] font-michroma mb-8'>Blogs</h1>
        <div className='flex flex-row items-center justify-start gap-4 xl:gap-12 w-full'>
          <div 
            className={`text-[10px] md:text-[16px] lg:text-[16px] xl:text-[24px] 2xl:text-[24px] font-michroma hover:underline cursor-pointer ${
              selectedCategory === 'All' ? 'underline' : ''
            }`}
            onClick={() => setSelectedCategory('All')}
          >
            All
          </div>
          {categories.map((category) => (
            <div 
              key={category._id} 
              className={`text-[10px] md:text-[16px] lg:text-[16px] xl:text-[24px] 2xl:text-[24px] font-michroma hover:underline cursor-pointer ${
                selectedCategory === category.title ? 'underline' : ''
              }`}
              onClick={() => setSelectedCategory(category.title)}
            > 
              {category.title}
            </div>
          ))}
        </div>
        
        {loading ? (
          <div>Loading...</div>
        ) : filteredBlogs.length === 0 ? (
          <div>No blogs found for this category.</div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-12 items-center justify-center'>
            {filteredBlogs.map((blog) => (
              <div key={blog._id} className='text-[var(--secondary)] w-full flex flex-col items-start justify-start'>
                <div className='flex flex-row items-center justify-between gap-4 w-full'>
                  <h2 className='text-[16px] md:text-[16px] lg:text-[16px] xl:text-[24px] 2xl:text-[24px] font-bold mb-2'>{blog.title}</h2>
                  <p className='text-[12px] md:text-[12px] lg:text-[12px] xl:text-[16px] 2xl:text-[16px] mb-2'>{blog.date}</p>
                </div>
                {blog.coverImage?.asset?.url && (
                  <img 
                    src={blog.coverImage.asset.url} 
                    alt={blog.title} 
                    className='w-full h-full object-cover mb-4 cursor-pointer'
                    onClick={() => window.open(blog.blogLink, '_blank')}
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

export default BlogsSection;