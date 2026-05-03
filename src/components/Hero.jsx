import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import heroVideo from '../assets/hero-video.mp4';
import './Hero.css';

const Hero = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Transform values based on scroll
  const leftX = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const rightX = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const nameY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const taglineLeftX = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const taglineRightX = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const taglineY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const taglineOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const scrollToNext = () => {
    document.querySelector('#expertise').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero" ref={heroRef}>
      {/* Video Background */}
      <div className="hero-video-container">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="hero-video"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="hero-video-overlay"></div>
      </div>

      {/* Content */}
      <div className="hero-content-wrapper">
        <div className="hero-name-split">
          <motion.div
            className="hero-name-left"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ x: leftX, y: nameY }}
          >
            Aman
          </motion.div>
          <motion.div
            className="hero-name-right"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ x: rightX, y: nameY }}
          >
            Bhatia
          </motion.div>
        </div>

        <div className="hero-tagline-wrapper">
          <motion.span
            className="hero-tagline-left"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            style={{ x: taglineLeftX, y: taglineY, opacity: taglineOpacity }}
          >
            Backend
          </motion.span>
          <motion.span
            className="hero-tagline-divider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            style={{ opacity: taglineOpacity }}
          >
            |
          </motion.span>
          <motion.span
            className="hero-tagline-right"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            style={{ x: taglineRightX, y: taglineY, opacity: taglineOpacity }}
          >
            Cloud Engineer
          </motion.span>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        className="scroll-indicator"
        onClick={scrollToNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        whileHover={{ y: 8 }}
        style={{ opacity: taglineOpacity }}
      >
        <ArrowDown size={24} />
      </motion.button>
    </section>
  );
};

export default Hero;
