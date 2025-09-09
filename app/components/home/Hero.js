"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useEventContext } from "@/app/context/eventContext";
import Link from "next/link";
import { Loader } from "lucide-react";

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const { upcomingEvent, upComingEventEventLoading } = useEventContext();

  useEffect(() => {
    const eventTime = upcomingEvent?.data?.events[0]?.eventTime;
    if (!eventTime) return;

    const targetDate = new Date(eventTime).getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [upcomingEvent?.data?.events[0]?.eventTime]);

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

      {/* Overlay (darken for readability) */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Optional: keep stars/moon/rocket animations ON TOP of video */}
      <div className="absolute inset-0 z-10">
        {/* Stars */}
        {/* {[...Array(50)].map((_, i) => (
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
        ))} */}

        {/* Moon */}
        {/* <motion.div
          className="absolute right-[10%] top-[15%] hidden sm:block sm:w-[270px] sm:h-[270px] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 70% 70%, #ffffff, #d9d9d9)",
            boxShadow:
              "inset -25px -25px 40px rgba(0,0,0,0.3), 0 0 80px rgba(200,200,255,0.4)",
          }}
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        /> */}

        {/* Rocket */}
        {/* <motion.div
          initial={{ x: -200, y: 0, rotate: 0 }}
          animate={{
            x: [-200, 1400],
            y: [50, 20, -30, 0, -10],
            rotate: [0, 5, -5, 10],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatDelay: 2,
          }}
          className="absolute top-1/2 left-0 flex flex-col items-center"
        >
          <Image
            src="/rocket.png"
            alt="Spaceship"
            width={120}
            height={120}
            className="drop-shadow-[0_0_20px_rgba(255,150,50,0.6)]"
          />
        </motion.div> */}
      </div>

      {/* Main content */}
      <div className="relative z-20 flex flex-col items-center text-center pt-32">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Explore the Cosmos
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-xl">
          Join our community of stargazers and embark on a journey through the
          wonders of the universe.
        </p>

        {/* Countdown box */}
        <Link href={`/events/${upcomingEvent?.data?.events[0]?._id}`}>
          <div className="bg-[#0b1230]/80 border border-purple-500 rounded-xl p-6 w-[350px] h-[180px] shadow-lg shadow-purple-500/30 backdrop-blur-md flex items-center justify-center">
            {upComingEventEventLoading ? (
              <div className="flex flex-col items-center gap-3 text-slate-300">
                <Loader className="w-6 h-6 animate-spin text-blue-400" />
                <span className="text-lg font-medium">Loading ...</span>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center w-full">
                <h2 className="text-xl font-semibold mb-4 text-center">
                  {upcomingEvent?.data?.events[0]?.title}
                </h2>
                <div className="flex justify-center gap-4 text-center">
                  {Object.entries(timeLeft).map(([label, value]) => (
                    <div key={label}>
                      <p className="text-3xl font-bold text-blue-300">{value}</p>
                      <p className="uppercase text-xs text-gray-400">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Link>

        {/* Button */}
        <motion.a
          href="/join"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 px-8 py-4 text-lg font-semibold text-white rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-pink-600 transition-all shadow-[0_0_30px_rgba(140,100,255,0.4)]"
        >
          Start Your Journey
        </motion.a>
      </div>
    </div>
  );
}
