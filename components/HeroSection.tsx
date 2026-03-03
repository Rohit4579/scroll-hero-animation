"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const carRef = useRef<HTMLImageElement>(null);
  const statsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {

      // Headline Animation
      if (headlineRef.current) {
        gsap.from(headlineRef.current.children, {
          opacity: 0,
          y: 50,
          duration: 1,
          stagger: 0.06,
          ease: "power3.out",
        });
      }

      // Stats Animation
      gsap.from(statsRef.current, {
        opacity: 0,
        y: 30,
        delay: 0.6,
        duration: 0.8,
        stagger: 0.25,
        ease: "power3.out",
      });

      // Scroll Controlled Car Movement
      if (carRef.current) {
        gsap.to(carRef.current, {
          x: 600,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const headline = "WELCOME ITZFIZZ".split("");

  return (
    <section
      ref={heroRef}
      className="relative h-screen flex flex-col items-center justify-center hero-bg overflow-hidden"
    >
      {/* Headline */}
      <h1
        ref={headlineRef}
        className="text-5xl md:text-7xl font-bold tracking-[0.6em] text-center"
      >
        {headline.map((char, index) => (
          <span key={index} className="inline-block">
            {char}
          </span>
        ))}
      </h1>

      {/* Stats */}
      <div className="flex gap-16 mt-16">
        {[
          { value: "58%", label: "Increase in pickup point use" },
          { value: "23%", label: "Decrease in customer calls" },
          { value: "27%", label: "Increase in pickup use" },
        ].map((stat, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) statsRef.current[index] = el;
            }}
            className="text-center"
          >
            <h2 className="text-3xl font-semibold">
              {stat.value}
            </h2>
            <p className="text-gray-400 text-sm mt-2">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Car */}
      <img
  ref={carRef}
  src="/car.png"
  alt="Car"
  className="absolute bottom-10 left-[-300px] w-[500px] will-change-transform"
/>
    </section>
  );
}