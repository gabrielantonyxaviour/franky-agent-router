"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  const handleJoinWaitlist = () => {
    window.open("https://typeform.com/to/your-form-id", "_blank");
  };

  return (
    <div className="min-h-screen flex items-center justify-start px-6 py-20">
      <div className="max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4 relative"
        >
          {/* Logo placeholder */}
          <Image
            src="/logo.png"
            alt="Franky"
            width={150}
            height={150}
            className="mb-4 ml-1 rounded-xl "
          />

          {/* Clean logo text - no background */}
          <div className="relative">
            <h1
              className="text-3xl md:text-5xl font-bold text-white"
              style={{ fontFamily: "LogoFont, sans-serif" }}
            >
              FRANKY AGENTS
            </h1>
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg md:text-xl text-white mb-10 font-light leading-relaxed "
          style={{ fontFamily: "DescriptionFont, sans-serif" }}
        >
          Monetize your old devices by powering efficient <br /> AI agents
        </motion.p>

        {/* CTA Button - Cyberpunk style with fixed blur */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mb-8 inline-block"
        >
          <div className="relative group">
            {/* Button glow effect - properly contained */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-franky-cyan via-franky-orange to-franky-yellow opacity-30 blur-md rounded-md group-hover:opacity-60 transition-opacity duration-500 animate-pulse"
              style={{ animationDuration: "4s" }}
            ></div>

            {/* Cyberpunk button */}
            <button
              onClick={handleJoinWaitlist}
              className="relative bg-black border border-franky-orange/50 text-white font-bold text-lg px-12 py-4 rounded-md transform transition-all duration-300 hover:scale-105 group overflow-hidden"
            >
              {/* Diagonal stripes */}
              <div
                className="absolute inset-0 w-full h-full opacity-20"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(208,38,14,0.5) 10px, rgba(208,38,14,0.5) 20px)",
                }}
              ></div>

              {/* Button content */}
              <div className="relative flex items-center justify-center">
                <span>JOIN WAITLIST</span>
                <ArrowRight
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                  size={24}
                />
              </div>

              {/* Top highlight */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-franky-yellow to-transparent"></div>

              {/* Bottom highlight */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-franky-orange to-transparent"></div>
            </button>
          </div>
        </motion.div>

        {/* Secondary Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="space-y-4"
        ></motion.div>
      </div>
    </div>
  );
}
