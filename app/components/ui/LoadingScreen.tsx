"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { loadingWords } from "@/app/lib/constants";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  // Create more rows to fill the entire screen evenly
  // Distribute all words across multiple rows with different speeds and directions
  const createWordRows = () => {
    const rows = [];
    const wordsPerRow = 5;
    const totalRows = Math.ceil(loadingWords.length / wordsPerRow);

    for (let i = 0; i < totalRows; i++) {
      const startIdx = i * wordsPerRow;
      const endIdx = Math.min(startIdx + wordsPerRow, loadingWords.length);
      const rowWords = loadingWords.slice(startIdx, endIdx);

      // Cycle through words if we run out
      if (rowWords.length < wordsPerRow) {
        rowWords.push(...loadingWords.slice(0, wordsPerRow - rowWords.length));
      }

      rows.push({
        words: rowWords,
        speed: 15 + (i % 4) * 3, // Vary speeds between 15-24
        direction: i % 2 === 0 ? "left" : "right",
      });
    }

    // Add more rows to ensure full coverage (duplicate and vary)
    const additionalRows = rows.map((row, idx) => ({
      ...row,
      speed: row.speed + 2,
      direction: row.direction === "left" ? "right" : "left",
    }));

    return [...rows, ...additionalRows];
  };

  const wordRows = createWordRows();

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 bg-black overflow-hidden"
        >
          {/* Word rows filling entire screen */}
          <div className="absolute inset-0 pointer-events-none">
            {wordRows.map((row, idx) => {
              // Calculate vertical position to evenly distribute rows
              const totalRows = wordRows.length;
              const position = (idx / totalRows) * 100;

              return (
                <motion.div
                  key={`row-${idx}`}
                  className="absolute left-0 right-0 flex gap-2 md:gap-3 lg:gap-4 whitespace-nowrap"
                  style={{
                    top: `${position}%`,
                    transform: "translateY(-50%)",
                  }}
                  animate={{
                    x: row.direction === "left" ? [0, "-50%"] : ["-50%", 0],
                  }}
                  transition={{
                    duration: row.speed,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  {/* Duplicate words multiple times for seamless loop */}
                  {[...row.words, ...row.words, ...row.words, ...row.words].map(
                    (word, wordIdx) => (
                      <span
                        key={`row-${idx}-word-${wordIdx}`}
                        className="text-white/40 text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold uppercase px-1 md:px-2"
                        style={{
                          fontFamily: "var(--font-anton), sans-serif",
                          fontWeight: 400,
                          letterSpacing: "0.02em",
                          textShadow: "0 0 20px rgba(255, 255, 255, 0.1)",
                        }}
                      >
                        {word}
                      </span>
                    )
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Dark logo with white circle - absolutely positioned in center on top */}
          <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative flex items-center justify-center"
            >
              {/* White circle */}
              <motion.div
                className="absolute rounded-full border-2 border-white/30"
                initial={{ width: 0, height: 0 }}
                animate={{
                  width: "280px",
                  height: "280px",
                }}
                transition={{
                  duration: 1,
                  ease: "easeOut",
                  delay: 0.2,
                }}
              />
              <motion.div
                className="absolute rounded-full border border-white/50"
                initial={{ width: 0, height: 0 }}
                animate={{
                  width: "240px",
                  height: "240px",
                }}
                transition={{
                  duration: 1,
                  ease: "easeOut",
                  delay: 0.3,
                }}
              />

              {/* Logo */}
              <div className="relative z-10">
                <Image
                  src="/logo.svg"
                  alt="MD Dance Company"
                  width={200}
                  height={159}
                  priority
                  className="w-[180px] md:w-[200px] lg:w-[220px] h-auto"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
