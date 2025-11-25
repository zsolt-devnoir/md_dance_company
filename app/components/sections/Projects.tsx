'use client';

import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { projects } from '@/app/data/projects';
import { fadeInUp, staggerContainer } from '@/app/lib/animations';
import ProjectCard from '../ui/ProjectCard';

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="projects"
      ref={ref}
      className="py-24 md:py-32 px-6 md:px-12 bg-white flex justify-center"
    >
      <div className="max-w-7xl mx-auto w-full">
        <motion.h2
          initial="initial"
          animate={inView ? 'animate' : 'initial'}
          variants={fadeInUp}
          className="text-5xl md:text-6xl font-bold text-black mb-20 md:mb-24 text-center"
        >
          Featured Projects
        </motion.h2>

        {/* Masonry Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={inView ? 'animate' : 'initial'}
          className="columns-1 md:columns-2 lg:columns-3 gap-4 md:gap-6"
          style={{ columnGap: '1.5rem' }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={fadeInUp}
              className="break-inside-avoid mb-4 md:mb-6 w-full"
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

