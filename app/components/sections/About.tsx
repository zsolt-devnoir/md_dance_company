"use client";

import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { aboutContent } from "@/app/data/content";
import { fadeInUp, staggerContainer } from "@/app/lib/animations";
import Image from "next/image";

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section
      id="about"
      ref={ref}
      className="py-24 md:py-32 px-6 md:px-12 bg-black text-white flex justify-center"
    >
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={inView ? "animate" : "initial"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Text Content */}
          <div className="space-y-6 md:space-y-8">
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 md:mb-8"
            >
              {aboutContent.title}
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl lg:text-2xl leading-relaxed text-white/90 font-light"
            >
              {aboutContent.mission}
            </motion.p>
          </div>

          {/* Team Image */}
          <motion.div
            variants={fadeInUp}
            className="relative aspect-[4/5] rounded-2xl overflow-hidden"
          >
            <Image
              src="/we.jpg"
              alt="MD Dance Company Team"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
