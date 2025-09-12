"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useProjectContext } from "@/app/context/projectContext";
import Image from "next/image";
import CommonLoader from "@/app/components/common/CommonLoader";

const ProjectsPage = () => {
  const { approvedProjects, ApprovedProjectsLoading } = useProjectContext();
  if (ApprovedProjectsLoading) {
    return <CommonLoader />
  }

  return (
    <main className="min-h-screen bg-[#0A0F1C] text-white px-6 py-20 relative overflow-hidden">
      {/* Space & Nebula Background */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-[#05010e] via-[#120851] to-[#05010e]" />
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-purple-700/30 rounded-full blur-[200px]" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[180px]" />
      <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-pink-500/20 rounded-full blur-[150px]" /> */}
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


      {/* Existing animated purple glow */}
      {/* <motion.div
        className="absolute w-[500px] h-[500px] bg-purple-700 rounded-full blur-3xl opacity-20"
        style={{ top: "-100px", left: "-100px", zIndex: 1 }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.2, 0.15] }}
        transition={{ duration: 8, repeat: Infinity }}
      /> */}

      <div className="max-w-6xl mx-auto relative z-10 space-y-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl font-bold text-center bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text"
        >
          Projects
        </motion.h1>

        {approvedProjects?.data?.projects?.length === 0 ? (
          <p className="text-center text-gray-400">No approved projects found.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {approvedProjects?.data?.projects?.map((project, idx) => (
              <Link href={`/projects/${project?._id}`} key={idx + 1}>
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  className="rounded-sm bg-white/5 border border-white/10 p-4 backdrop-blur-md shadow-lg hover:shadow-xl transition"
                >
                  {project.projectImage && (
                    <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4">
                      <Image
                        src={project.projectImage}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-4 text-sm bg-purple-600/80 hover:bg-purple-700 transition px-4 py-2 rounded-xl backdrop-blur-sm"
                    >
                      View Live
                    </a>
                  )}
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default ProjectsPage;
