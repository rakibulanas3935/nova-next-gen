"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const merchandiseItems = [
  {
    name: "Galaxy Hoodie",
    description: "Stay warm and stylish with our nebula-themed hoodie.",
    price: "$49.99",
    image: "/merch/hoodie.jpg",
  },
  {
    name: "Astronomy T-Shirt",
    description: "100% cotton tee featuring planets and constellations.",
    price: "$29.99",
    image: "/merch/tshirt.jpg",
  },
  {
    name: "Stargazer Cap",
    description: "A sleek cap with a shooting star design.",
    price: "$19.99",
    image: "/merch/cap.jpg",
  },
  {
    name: "Space Poster Set",
    description: "High-res prints of iconic astronomical sights.",
    price: "$39.99",
    image: "/merch/posters.jpg",
  },
];

const MerchandisePage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mouse tracking for background animation
  React.useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0A0F1C] text-white overflow-x-hidden">
      {/* Radial background animation */}
      <motion.div
        className="absolute w-60 h-60 rounded-full opacity-20 pointer-events-none"
        animate={{
          x: mousePosition.x * -0.03,
          y: mousePosition.y * -0.03,
        }}
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,1) 0%, rgba(79,70,229,0) 70%)",
          bottom: "10%",
          left: "10%",
        }}
      />

      {/* Star background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
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

      {/* Main content */}
      <section className="relative z-10 pt-20 pb-24 px-6 sm:px-10 max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-bold text-center bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent mb-12"
        >
          Shop Astronomy Merch
        </motion.h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {merchandiseItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white/5 border border-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-52 object-cover"
              />
              <div className="p-4 space-y-2">
                <h3 className="text-xl font-semibold text-purple-300">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-300">{item.description}</p>
                <p className="text-lg font-bold text-white">{item.price}</p>
                <button className="mt-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-sm font-semibold cursor-pointer hover:shadow-xl transition-all">
                  Buy Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MerchandisePage;
