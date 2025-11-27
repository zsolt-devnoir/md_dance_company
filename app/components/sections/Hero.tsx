"use client";

import { motion } from "framer-motion";
import { heroContent } from "@/app/data/content";
import { fadeInUp, staggerContainer } from "@/app/lib/animations";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-center">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="space-y-6 md:space-y-8 flex items-center flex-col"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-foreground leading-[1.1] tracking-tight"
          >
            {heroContent.headline}
          </motion.h1>
        </motion.div>
      </div>

      {/* <ScrollIndicator /> */}
    </section>
  );
}
