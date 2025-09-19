"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useProjectContext } from "@/app/context/projectContext";
import Image from "next/image";
import CommonLoader from "@/app/components/common/CommonLoader";
import { useUserContext } from "@/app/context/userContext";
import { useRouter } from "next/navigation";
import ConfirmModal from "@/app/components/common/ConfirmModal";

const ProjectsPage = () => {
  const { approvedProjects, ApprovedProjectsLoading } = useProjectContext();
  const { user } = useUserContext()
  if (ApprovedProjectsLoading) return <CommonLoader />;
    const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const handleClick = (project) => {
    if (!user) {
      setShowModal(true);
    } else {
      window.open(project?.liveLink, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <main className="relative min-h-screen  text-white overflow-hidden">
      {/* Background Layers */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.08)_0%,rgba(0,0,0,1)_80%)]" />
      <div className="absolute inset-0 bg-[url('/space-stars.svg')] bg-cover opacity-10" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl sm:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
            Projects
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover innovative creations launched by our space explorers.
          </p>
        </motion.div>

        {/* Projects */}
        {approvedProjects?.data?.projects?.length === 0 ? (
          <p className="text-center text-gray-500 mt-20">No approved projects found.</p>
        ) : (
          <div className="mt-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {approvedProjects?.data?.projects?.map((project, idx) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="group relative flex flex-col rounded-2xl overflow-hidden
                           bg-white/5 border border-white/10 backdrop-blur-lg
                           shadow-[0_0_25px_rgba(168,85,247,0.1)]
                           hover:shadow-[0_0_40px_rgba(168,85,247,0.25)]
                           transition-transform duration-500 hover:-translate-y-2"
              >
                {/* Image */}
                {project.projectImage && (
                  <div className="relative w-full h-48 overflow-hidden">
                    <Image
                      src={project.projectImage}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                )}

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-300 transition">
                    {project.title}
                  </h3>
                  {project.description && (

                    <div
                      className="text-gray-400 text-sm mb-4"
                      dangerouslySetInnerHTML={{
                        __html:
                          project.description?.length > 150
                            ? project.description.slice(0, 150) + "..."
                            : project.description,
                      }}
                    />


                  )}
                  <div className="mt-auto flex gap-3">
                    <Link
                      href={`/projects/${project._id}`}
                      className="flex-1 text-center px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 transition"
                    >
                      Details
                    </Link>
                    <button
                      onClick={()=>handleClick(project)}
                      className="flex-1 text-center px-4 py-2 rounded-lg 
                   bg-gradient-to-r from-purple-600 to-cyan-600 
                   hover:from-cyan-500 hover:to-purple-500 
                   transition-colors duration-300 text-white"
                    >
                      Live
                    </button>

                   

                  </div>
                </div>
              </motion.div>
            ))}

             <ConfirmModal
                      open={showModal}
                      onClose={() => setShowModal(false)}
                      onConfirm={() => router.push("/join")}
                    />
          </div>
        )}
      </div>
    </main>
  );
};

export default ProjectsPage;
