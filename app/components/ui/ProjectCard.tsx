"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Project } from "@/app/data/projects";
import { hoverScale } from "@/app/lib/animations";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      {...hoverScale}
      className="group relative overflow-hidden rounded-2xl bg-black cursor-pointer"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Project Image with reveal animation */}
      <motion.div
        className="relative aspect-[4/5] min-h-[300px]"
        initial={{ scale: 1.2, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </motion.div>

      {/* Content Overlay - Always visible but subtle */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-4 md:p-6"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
            {project.title}
          </h3>
          <p className="text-white/90 text-sm md:text-base">
            {project.description}
          </p>
        </motion.div>
      </motion.div>

      {/* Hover Color Overlay */}
      <motion.div
        className="absolute inset-0 bg-[#3E1E68]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={false}
      />
    </motion.div>
  );
}
