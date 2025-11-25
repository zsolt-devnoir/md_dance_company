"use client";

import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { fadeIn } from "@/app/lib/animations";
import { introContent } from "@/app/data/content";

export default function Intro() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 px-6 md:px-12 bg-white text-black flex justify-center"
    >
      <div className="max-w-4xl mx-auto">
        <motion.p
          initial="initial"
          animate={inView ? "animate" : "initial"}
          variants={fadeIn}
          className="text-lg md:text-xl lg:text-2xl leading-relaxed text-center text-gray-700 font-light"
        >
          {introContent.text}
        </motion.p>
      </div>
    </section>
  );
}
