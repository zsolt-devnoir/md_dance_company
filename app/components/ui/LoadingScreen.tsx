"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface LoadingScreenProps {
  isLoading: boolean;
}

const LOADER_IMAGES = [
  "/loading/loader-1.png",
  "/loading/loader-2.png",
  "/loading/loader-3.png",
  "/loading/loader-4.png",
  "/loading/loader-5.png",
  "/loading/loader-6.png",
  "/loading/loader-7.png",
  "/loading/loader-8.png",
  "/loading/loader-9.png",
];

export default function LoadingScreen({ isLoading }: LoadingScreenProps) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % LOADER_IMAGES.length);
    }, 250);

    return () => clearInterval(interval);
  }, []);

  if (!isLoading) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 3 }}
          className="fixed inset-0 z-50 bg-black overflow-hidden"
        >
          <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
            <motion.div
              initial={{ scale: 1, opacity: 0 }}
              animate={{ scale: 1.5, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-[200px] h-[200px] md:w-[280px] md:h-[280px]"
            >
              {LOADER_IMAGES.map((src, index) => (
                <Image
                  key={src}
                  src={src}
                  alt="MD Dance Company"
                  fill
                  priority={index === 0}
                  className={`object-contain transition-opacity duration-150 ${
                    index === frame ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
