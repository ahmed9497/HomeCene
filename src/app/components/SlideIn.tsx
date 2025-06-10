// components/SlideIn.tsx
"use client";

import { useEffect, useRef, useState } from "react";

type SlideInProps = {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
  delay?: number; // in ms
};

export default function SlideIn({
    children,
    direction = "up",
    className = "",
    delay = 0,
  }: SlideInProps) {
    const ref = useRef<HTMLDivElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setTimeout(() => setIsVisible(true), delay);
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);
  const directionMap: Record<string, string> = {
    up: "translate-y-16",
    down: "-translate-y-16",
    left: "translate-x-16",
    right: "-translate-x-16",
  };

  const initialTransform = directionMap[direction];
  return (
    <div
    ref={ref}
    className={`transition-all duration-1000 ease-out transform ${
      isVisible ? "opacity-100 translate-x-0 translate-y-0" : `opacity-0 ${initialTransform}`
    } ${className}`}
  >
    {children}
  </div>
  );
}
