// src/components/PhotoHeart.jsx
import React from 'react';
import { motion } from 'framer-motion';

export default function PhotoHeart({
  photoUrl = "/pari-photo.jpg",
  isPulsing = false,
  isZoomed = false,
  size = 220
}) {
  return (
    <div className="relative flex items-center justify-center select-none py-2">
      
      {/* SVG Clip Path & Frame */}
      <svg width={size} height={size} viewBox="0 0 200 200" className="overflow-visible drop-shadow-[0_0_25px_rgba(255,46,99,0.7)]">
        <defs>
          <clipPath id="heart-clip-shape">
            <path d="M100,175 C100,175 18,115 18,62 C18,34 40,12 68,12 C85,12 95,21 100,32 C105,21 115,12 132,12 C160,12 182,34 182,62 C182,115 100,175 100,175 Z" />
          </clipPath>
          
          <linearGradient id="heart-border-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff2e63" />
            <stop offset="50%" stopColor="#ff758c" />
            <stop offset="100%" stopColor="#9c27b0" />
          </linearGradient>
        </defs>

        {/* Ambient Outer Glow Layer */}
        <motion.path
          d="M100,175 C100,175 18,115 18,62 C18,34 40,12 68,12 C85,12 95,21 100,32 C105,21 115,12 132,12 C160,12 182,34 182,62 C182,115 100,175 100,175 Z"
          fill="none"
          stroke="url(#heart-border-grad)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{
            strokeWidth: isPulsing ? [8, 14, 8] : [6, 9, 6],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{
            repeat: Infinity,
            duration: isPulsing ? 0.8 : 2.2,
            ease: "easeInOut"
          }}
        />

        {/* Clipped Photo */}
        <g clipPath="url(#heart-clip-shape)">
          <motion.image
            href={photoUrl}
            x="0"
            y="-5"
            width="200"
            height="210"
            preserveAspectRatio="xMidYMin slice"
            animate={{
              scale: isZoomed ? 1.15 : isPulsing ? [1, 1.08, 1] : 1
            }}
            transition={{
              duration: isPulsing ? 0.6 : 0.4,
              ease: "easeOut"
            }}
          />
        </g>

        {/* Shiny Highlight overlay on top */}
        <path
          d="M100,175 C100,175 18,115 18,62 C18,34 40,12 68,12 C85,12 95,21 100,32 C105,21 115,12 132,12 C160,12 182,34 182,62 C182,115 100,175 100,175 Z"
          fill="none"
          stroke="rgba(255, 255, 255, 0.4)"
          strokeWidth="2"
        />
      </svg>

      {/* Floating Mini Hearts Decor around the frame */}
      <motion.span
        animate={{ y: [-4, 4, -4] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
        className="absolute -top-1 -right-1 text-2xl drop-shadow-md select-none pointer-events-none"
      >
        ✨
      </motion.span>

      <motion.span
        animate={{ y: [4, -4, 4] }}
        transition={{ repeat: Infinity, duration: 3 }}
        className="absolute -bottom-2 -left-1 text-2xl drop-shadow-md select-none pointer-events-none"
      >
        💖
      </motion.span>
    </div>
  );
}
