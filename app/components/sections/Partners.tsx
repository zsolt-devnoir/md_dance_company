'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { partnerLogos } from '@/app/lib/constants';

export default function Partners() {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scrollPosition = 0;
    const scrollSpeed = 0.5;

    const animate = () => {
      scrollPosition += scrollSpeed;
      const containerWidth = container.scrollWidth / 2;
      if (scrollPosition >= containerWidth) {
        scrollPosition = 0;
      }
      container.style.transform = `translateX(-${scrollPosition}px)`;
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Duplicate logos for seamless loop
  const duplicatedLogos = [...partnerLogos, ...partnerLogos];

  return (
    <section className="py-12 md:py-16 bg-light-bg overflow-hidden">
      <div className="relative">
        <div
          ref={containerRef}
          className="flex gap-8 md:gap-12 lg:gap-16 items-center"
          style={{ willChange: 'transform' }}
        >
          {duplicatedLogos.map((logo, index) => (
            <div
              key={`${logo}-${index}`}
              className="flex-shrink-0 h-12 md:h-16 lg:h-20 w-auto px-4"
            >
              <Image
                src={logo}
                alt={`Partner logo ${index + 1}`}
                width={200}
                height={80}
                className="h-full w-auto object-contain transition-all duration-300 hover:grayscale-0 opacity-70 hover:opacity-100"
                style={{ filter: 'grayscale(100%)' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

