"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import CommonLoader from "@/app/components/common/CommonLoader";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fetch images
  const fetchImages = async (pageNumber = 1) => {
    try {
      setLoading(true);
      const res = await fetch(`https://deep-sky-server.onrender.com/api/v1/gallery/approved?page=${pageNumber}&limit=12`);
      const data = await res.json();

      if (pageNumber === 1) {
        setImages(data.data.images);
      } else {
        setImages((prev) => [...prev, ...data.data.images]);
      }

      setTotalPages(data.pagination.totalPages);
    } catch (err) {
      console.error("Error fetching gallery:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages(page);
  }, [page]);

  return (
    <div className="min-h-screen !overflow-hidden">
      {/* Stars background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{ opacity: 0.1 }}
            animate={{
              opacity: [0.1, 1, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-40 pt-20 pb-10 sm:pt-24 sm:pb-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500"
          >
            Portraits of the Cosmos
          </motion.h2>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-center text-lg text-gray-300 max-w-2xl mx-auto"
          >
            Explore moments we've captured.
          </motion.p>

          {/* Loader */}
          {loading && page === 1 ? (
            <CommonLoader />
          ) : (
            <>
              <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {images.map((src, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * index }}
                    className="relative cursor-pointer overflow-hidden rounded-xl shadow-md border border-white/10 bg-white/5 backdrop-blur-sm"
                  >
                    <Image
                      src={src}
                      alt={`Gallery image ${index + 1}`}
                      width={400}
                      height={240}
                      className="w-full h-60 object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                    />
                  </motion.div>
                ))}
              </div>

              {/* See More button */}
              {page < totalPages && (
                <div className="mt-10 text-center">
                  <button
                    onClick={() => setPage((prev) => prev + 1)}
                    disabled={loading}
                    className="px-6 py-3 cursor-pointer bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg shadow-md hover:opacity-90 disabled:opacity-50 transition"
                  >
                    {loading ? "Loading..." : "See More"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </motion.section>
    </div>
  );
};

export default Gallery;
