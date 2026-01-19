"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import ContactModal from "./ContactModal";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-40 px-4 md:px-4 lg:px-4 py-4 md:py-4 transition-all duration-300 ${
          isScrolled ? "bg-light-bg/60 backdrop-blur-sm" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex items-center justify-between w-full">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="relative flex items-center"
          >
            <Image
              src="/logo.png"
              alt="MD Dance Company"
              width={150}
              height={119}
              className={`h-10 md:h-14 w-auto transition-all duration-300 ${
                isScrolled ? "invert" : ""
              }`}
              priority
            />
          </motion.div>

          {/* Contact Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsContactOpen(true)}
            className={`px-4 py-2 md:px-10 md:py-3 rounded-full font-medium transition-all duration-300 flex items-center justify-center ${
              isScrolled
                ? "bg-highlight text-foreground hover:bg-accent-light"
                : "bg-light-bg/10 backdrop-blur-sm text-foreground border border-foreground/20 hover:bg-foreground/20"
            }`}
          >
            Contact us
          </motion.button>
        </div>
      </motion.nav>

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </>
  );
}
