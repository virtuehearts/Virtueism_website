"use client";

import { useEffect, useState } from "react";

interface VideoSlideshowProps {
  videos: string[];
}

export default function VideoSlideshow({ videos }: VideoSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (videos.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % videos.length);
    }, 6000); // 6 seconds per video

    return () => clearInterval(timer);
  }, [videos]);

  if (videos.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-violet-950/20 text-violet-300">
        No videos found in /public/clips
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl border border-violet-300/20 bg-black">
      {videos.map((src, index) => (
        <video
          key={src}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-[#0d0720] to-transparent p-5">
        <p className="text-sm text-violet-100/80">Experience the healing energy in motion.</p>
      </div>
    </div>
  );
}
