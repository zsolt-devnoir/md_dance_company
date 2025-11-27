"use client";

import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { servicesContent } from "@/app/data/content";
import { fadeInUp, staggerContainer, hoverScale } from "@/app/lib/animations";
import Image from "next/image";

export default function Services() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section
      id="services"
      ref={ref}
      className="py-24 md:py-32 px-6 md:px-12 bg-black text-white flex justify-center"
    >
      <div className="max-w-7xl mx-auto w-full">
        <motion.h2
          initial="initial"
          animate={inView ? "animate" : "initial"}
          variants={fadeInUp}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-20 md:mb-24 text-center"
        >
          Our Services
        </motion.h2>
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={inView ? "animate" : "initial"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {servicesContent.map((service, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              {...hoverScale}
              className="relative group overflow-hidden rounded-2xl min-h-[500px] md:min-h-[600px] flex flex-col"
            >
              {/* Image on top */}
              <div className="relative h-1/3 flex-shrink-0 bg-red-500">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Fade gradient from image to text */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
              </div>

              {/* Text content with fade */}
              <div className="relative z-10 flex-1 flex flex-col justify-end bg-gradient-to-t from-black via-black to-transparent p-6 md:p-8">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4 text-white">
                  {service.title}
                </h3>
                <p className="text-white/90 text-base md:text-lg leading-relaxed mb-3">
                  {service.description}
                </p>

                {/* Additional info on hover */}
                <p className="text-white/70 text-xs md:text-sm leading-relaxed md:max-h-0 overflow-hidden opacity-100 max-h-96 md:opacity-0 md:group-hover:max-h-96 md:group-hover:opacity-100 transition-all duration-300 ease-in-out">
                  {service.additionalInfo}
                </p>
              </div>

              {/* Hover Overlay */}
              <motion.div
                className="absolute inset-0 bg-[#00FF88]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                initial={false}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
