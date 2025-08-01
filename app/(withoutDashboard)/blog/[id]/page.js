'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Loader, Clock3 } from 'lucide-react';
import useAxiosGet from '@/app/utils/useAxiosGet';

export default function BlogDetailPage() {
  const { id } = useParams();
  const [singleBlog, getSingleBlog, loading] = useAxiosGet([]);

  useEffect(() => {
    if (id) {
      getSingleBlog(`http://localhost:3000/api/v1/blogs/${id}`);
    }
  }, [id]);

  const blog = singleBlog?.data?.blog;

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white bg-[#0A0F1C]">
        <Loader className="animate-spin w-6 h-6 mr-2" />
        Loading blog...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white bg-[#0A0F1C]">
        Blog not found.
      </div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="min-h-screen pt-[14vh] bg-[#0A0F1C] px-4 sm:px-8 lg:px-24 py-16 text-white"
    >
      <div className="max-w-5xl mx-auto glassmorphism rounded-2xl overflow-hidden shadow-xl border border-white/10 backdrop-blur-md bg-white/5">
        {/* Poster */}
        {blog?.blogImage && (
          <div className="relative w-full h-64 sm:h-96">
            <Image
              src={blog?.blogImage}
              alt={blog?.title}
              fill
              className="object-cover"
              placeholder="blur"
              blurDataURL="/blur.jpg" // fallback blur
              priority
            />
          </div>
        )}

        {/* Content */}
        <div className="p-6 sm:p-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 mb-4">
            {blog.title}
          </h1>

          {/* Time */}
          <div className="flex items-center text-sm text-purple-300 mb-4">
            <Clock3 className="w-4 h-4 mr-2" />
            {new Date(blog.createdAt).toLocaleString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
              year: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
            })}
          </div>

         

          {/* Rich Text */}
          <div
            className="prose prose-invert max-w-none text-gray-300 prose-a:text-blue-400 prose-a:underline mt-4"
            dangerouslySetInnerHTML={{ __html: blog.description }}
          />
        </div>
      </div>
    </motion.section>
  );
}
