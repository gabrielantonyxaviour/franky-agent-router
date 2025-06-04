"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  const handleJoinWaitlist = () => {
    window.open("https://form.typeform.com/to/aDtqkTJ9", "_blank");
  };

  return (
    <div className="min-h-screen flex items-center justify-start px-4 lg:px-6 py-20">
      <div className="max-w-xl w-full">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 lg:mb-4 relative"
        >
          {/* Logo placeholder */}
          <Image
            src="/logo.png"
            alt="Franky"
            width={120}
            height={120}
            className="mb-6 lg:mb-8 ml-1 rounded-xl w-[100px] h-[100px] lg:w-[150px] lg:h-[150px]"
          />

          {/* Clean logo text - gradient color */}
          <div className="relative">
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-[#ec4618] bg-clip-text text-transparent"
              style={{
                fontFamily: "LogoFont, sans-serif",
                letterSpacing: "0.02em",
              }}
            >
              FRANKY <span className="text-[#038fa8] opacity-100">AGENTS</span>
            </h1>
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-8 lg:mb-10 font-light"
          style={{
            fontFamily: "DescriptionFont, sans-serif",
            letterSpacing: "0.05em",
            lineHeight: "1.4",
          }}
        >
          Monetize your old devices by powering efficient AI agents
        </motion.p>

        {/* CTA Button - Mobile responsive */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mb-8 inline-block"
        >
          <div className="relative group">
            {/* Button glow effect */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-franky-cyan via-franky-orange to-franky-yellow opacity-30 blur-md rounded-md group-hover:opacity-60 transition-opacity duration-500 animate-pulse"
              style={{ animationDuration: "4s" }}
            ></div>

            {/* Cyberpunk button */}
            <button
              onClick={handleJoinWaitlist}
              className="relative bg-black border border-franky-orange/50 text-white font-bold text-base lg:text-lg px-8 lg:px-12 py-3 lg:py-4 rounded-md transform transition-all duration-300 hover:scale-105 group overflow-hidden"
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
                  size={20}
                />
              </div>

              {/* Highlights */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-franky-yellow to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-franky-orange to-transparent"></div>
            </button>
          </div>
        </motion.div>

        {/* Built With Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="space-y-2 pt-6"
        >
          <p
            className="text-stone-500 text-xl font-medium pl-2"
            style={{
              fontFamily: "DescriptionFont, sans-serif",
              letterSpacing: "0.05em",
              lineHeight: "1.4",
            }}
          >
            Built with
          </p>

          {/* Partner Logos */}
          <div className="flex items-center space-x-6 opacity-80">
            {/* Hedera Logo */}
            <div className="flex items-center space-x-2">
              <Image
                src="/hedera.png"
                alt="Hedera"
                width={140}
                height={24}
                className="rounded-xl border-[1.5px] border-stone-600"
              />
            </div>

            {/* Yellow Logo */}
            <div className="flex items-center space-x-2">
              <Image
                src="/yellow.png"
                alt="Yellow"
                width={140}
                height={24}
                className="rounded-xl border border-[1.5px] border-black"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
