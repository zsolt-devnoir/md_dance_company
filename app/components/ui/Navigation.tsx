"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import ContactModal from "./ContactModal";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [logoVariant, setLogoVariant] = useState<"light" | "dark">("light");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine logo variant based on scroll position (simplified - can be enhanced)
  useEffect(() => {
    // For now, use light logo on dark background, dark logo on light background
    // This can be enhanced to detect section backgrounds
    setLogoVariant(isScrolled ? "dark" : "light");
  }, [isScrolled]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-40 px-6 md:px-12 lg:px-16 py-6 md:py-8 transition-all duration-300 ${
          isScrolled ? "bg-white/95 backdrop-blur-sm" : "bg-transparent"
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
              src={logoVariant === "light" ? "/logo.svg" : "/logo_dark.svg"}
              alt="MD Dance Company"
              width={150}
              height={119}
              className="h-12 md:h-16 w-auto"
              priority
            />
          </motion.div>

          {/* Contact Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsContactOpen(true)}
            className={`px-8 py-4 md:px-10 md:py-4 rounded-full font-medium transition-all duration-300 flex items-center justify-center ${
              isScrolled
                ? "bg-black text-white hover:bg-gray-800"
                : "bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20"
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
