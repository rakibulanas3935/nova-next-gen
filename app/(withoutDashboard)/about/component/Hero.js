"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader } from "lucide-react";
import { useEventContext } from "@/app/context/eventContext";

export default function Hero() {
  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/nova_next_gen.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
   <div className="absolute inset-0 bg-black/65 z-0" />
      {/* Main content */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Explore the Cosmos
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto">
          Join our community of stargazers and embark on a journey through the
          wonders of the universe.
        </p>
      </div>
    </div>
  );
}
