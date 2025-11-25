'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Project } from '@/app/data/projects';
import { hoverScale } from '@/app/lib/animations';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      {...hoverScale}
      className="group relative overflow-hidden rounded-lg bg-black cursor-pointer"
    >
      {/* Project Image */}
      <div className="relative aspect-[4/5] min-h-[300px]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Content Overlay - Always visible but subtle */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent">
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{project.title}</h3>
          <p className="text-white/90 text-sm md:text-base">{project.description}</p>
        </div>
      </div>

      {/* Hover Color Overlay */}
      <motion.div
        className="absolute inset-0 bg-[#00FF88]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={false}
      />
    </motion.div>
  );
}

