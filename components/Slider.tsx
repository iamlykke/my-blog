"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";

const slides = [
  {
    title: "Hanabie.",
    subtitle: "Next concert",
    image: "/images/slides/slide_1.jpg",
  },
  {
    title: "Yakuza 0",
    subtitle: "Now playing",
    image: "/images/slides/slide_2.jpg",
  },
  {
    title: "The Three-Body Problem",
    subtitle: "Now reading",
    image: "/images/slides/slide_3.jpg",
  },
];

export default function Slider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const slide = slides[index];

  return (
    <div className="relative w-full h-[300px] rounded-xl overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={slide.image}
          className="absolute inset-0 rounded-xl overflow-hidden"
          initial={{ opacity: 0.2, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0.2, scale: 1.02 }}
          transition={{ duration: 0.5, ease: "easeIn" }}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />

          <div className="absolute z-20 right-4 bottom-6 text-white max-w-[80%] flex flex-col items-end">
            <span className="text-xs bg-white/20 text-white px-2 py-1 rounded-full uppercase tracking-wide inline-block">
              {slide.subtitle}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold leading-snug text-end">
              {slide.title}
            </h2>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-4 left-4 z-30 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`w-2 h-2 rounded-full transition-colors cursor-pointer ${
              i === index ? "bg-white" : "bg-white/40"
            }`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
