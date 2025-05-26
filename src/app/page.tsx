"use client";

import React from "react";
import Link from "next/link";

// Simple glow button component
const GlowButton = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => {
  return (
    <Link href={href}>
      <div className="relative overflow-hidden px-8 py-4 rounded-xl bg-black/50 backdrop-blur-sm border border-[#00FF88] border-opacity-50 cursor-pointer">
        <span className="relative z-10 text-2xl font-bold bg-gradient-to-r from-[#00FF88] to-emerald-400 bg-clip-text text-transparent">
          {children}
        </span>

        {/* Glow effect */}
        <div
          className="absolute -inset-10"
          style={{
            background:
              "radial-gradient(circle at center, rgba(0,255,136,0.3) 0%, transparent 70%)",
          }}
        />
      </div>
    </Link>
  );
};

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="text-center p-8">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#00FF88] to-emerald-400 bg-clip-text text-transparent">
          Welcome to Franky Agents
        </h1>
        <p className="text-xl md:text-2xl mb-10 text-[#AAAAAA] max-w-3xl mx-auto">
          Click the button below to launch our product
        </p>
        
        <div className="flex justify-center">
          <GlowButton href="https://franky-sui.vercel.app">
            Launch Product
          </GlowButton>
        </div>
      </div>
    </div>
  );
}
