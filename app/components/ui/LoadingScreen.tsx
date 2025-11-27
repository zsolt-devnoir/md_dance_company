"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [frame, setFrame] = useState(0);
  const FRAME_SIZE = 140;
  const FRAME_COUNT = 5; // 700px / 140px

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % FRAME_COUNT);
    }, 300); // 0.5s per frame

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
              className="relative flex items-center justify-center w-[140px] h-[140px]"
            >
              {/* Sprite sheet background (behind logo) */}
              <motion.div
                className="absolute w-[140px] h-[140px] bg-[url('/site_loader.png')] bg-no-repeat"
                style={{
                  backgroundSize: `${
                    FRAME_SIZE * FRAME_COUNT
                  }px ${FRAME_SIZE}px`,
                  backgroundPosition: `${-frame * FRAME_SIZE}px 0px`,
                }}
              />

              {/* Logo on top
              <div className="relative z-10">
                <Image
                  src="/logo.svg"
                  alt="MD Dance Company"
                  width={200}
                  height={159}
                  priority
                  className="w-[180px] md:w-[200px] lg:w-[220px] h-auto"
                />
              </div> */}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
