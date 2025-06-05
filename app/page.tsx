"use client";
import { Suspense } from "react";
import Hero from "@/components/Hero";
import FloatingObjects from "@/components/FloatingObjects";
import Globe from "@/components/Globe";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black overflow-hidden select-none">
      {/* Static space background with Franky colors */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-b from-[#12275c] via-black to-[#ec4618]/20">
          {/* Static stars - will be controlled by Globe component */}
          <div id="background-stars">
            {Array.from({ length: 300 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${1 + Math.random() * 2}px`,
                  height: `${1 + Math.random() * 2}px`,
                  backgroundColor: Math.random() > 0.7 ? "#ec4618" : "#ffffff",
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 3}s`,
                }}
              />
            ))}
          </div>

          {/* Nebula clouds */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`nebula-${i}`}
              className="absolute rounded-full opacity-10 blur-3xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${200 + Math.random() * 300}px`,
                height: `${200 + Math.random() * 300}px`,
                background: `radial-gradient(circle, ${
                  Math.random() > 0.5 ? "#ec4618" : "#12275c"
                } 0%, transparent 70%)`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Rest stays the same */}
      <FloatingObjects />
      <div className="relative z-10 w-full lg:w-1/2 px-6">
        <Hero />
      </div>
      <div className="absolute right-0 top-0 w-1/2 h-full z-5">
        <Suspense fallback={<div>Loading...</div>}>
          <Globe />
        </Suspense>
      </div>
    </main>
  );
}
