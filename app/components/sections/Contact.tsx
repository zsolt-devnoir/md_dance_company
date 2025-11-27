"use client";

import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { contactContent } from "@/app/data/content";
import { fadeInUp } from "@/app/lib/animations";
import ContactModal from "@/app/components/ui/ContactModal";

export default function Contact() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section
      id="contact"
      ref={ref}
      className="py-24 md:py-32 px-6 md:px-12 bg-white text-black flex justify-center"
    >
      <div className="max-w-4xl mx-auto w-full text-center">
        <motion.h2
          initial="initial"
          animate={inView ? "animate" : "initial"}
          variants={fadeInUp}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 text-black"
        >
          {contactContent.title}
        </motion.h2>
        <motion.p
          initial="initial"
          animate={inView ? "animate" : "initial"}
          variants={fadeInUp}
          className="text-lg md:text-xl lg:text-2xl text-black/90 mb-8 md:mb-12 font-light"
        >
          Ready to bring your vision to life? Get in touch with us.
        </motion.p>
        <motion.div
          initial="initial"
          animate={inView ? "animate" : "initial"}
          variants={fadeInUp}
          className="space-y-4 md:space-y-6"
        >
          <div>
            <a
              href={`mailto:${contactContent.email}`}
              className="text-lg md:text-xl lg:text-2xl text-black hover:text-[#00FF88] transition-colors inline-block"
            >
              {contactContent.email}
            </a>
          </div>
          <div>
            <a
              href={`tel:${contactContent.phone}`}
              className="text-lg md:text-xl lg:text-2xl text-black hover:text-[#00FF88] transition-colors inline-block"
            >
              {contactContent.phone}
            </a>
          </div>
          <motion.div
            initial="initial"
            animate={inView ? "animate" : "initial"}
            variants={fadeInUp}
            className="pt-4 md:pt-6"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsContactOpen(true)}
              className="px-6 py-3 md:px-10 md:py-3 rounded-full font-medium transition-all duration-300 bg-black text-white hover:bg-gray-800"
            >
              Contact us
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </section>
  );
}
