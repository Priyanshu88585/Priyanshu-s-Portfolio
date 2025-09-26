// src/components/Hero.jsx
import React from "react";
import { motion } from "framer-motion";
import { PROFILE } from "../utils/data";

const Typing = ({ texts = ["Fullstack Developer", "3D Enthusiast", "Problem Solver"] }) => {
  const [index, setIndex] = React.useState(0);
  const [subIndex, setSubIndex] = React.useState(0);
  const [blink, setBlink] = React.useState(true);
  const [reverse, setReverse] = React.useState(false);

  React.useEffect(() => {
    if (subIndex === texts[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 1200);
      return;
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % texts.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((s) => s + (reverse ? -1 : 1));
    }, Math.max(reverse ? 75 : 150, 50));
    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, texts]);

  React.useEffect(() => {
    const blinker = setInterval(() => setBlink((b) => !b), 500);
    return () => clearInterval(blinker);
  }, []);

  return (
    <span className="typing">
      {texts[index].substring(0, Math.max(0, subIndex))}
      <span style={{ opacity: blink ? 1 : 0 }}>|</span>
    </span>
  );
};

const Hero = () => {
  return (
    <section id="hero" className="container hero">
      {/* Left Side */}
      <div className="hero-left">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="h1"
        >
          Hi, I'm {PROFILE.name}.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {PROFILE.shortBio}
        </motion.p>
        <div style={{ marginTop: 16 }}>
          <Typing texts={["Fullstack Developer", "Data Structure & Algorithm", "React Developer", "N8N Automation"]} />
        </div>
      </div>

      {/* Right Side (Profile Image instead of Canvas) */}
      <div className="hero-right">
        <div className="profile-photo-wrap card">
          <img
            src= "https://media.licdn.com/dms/image/v2/D5603AQHwEr2IAwFKjA/profile-displayphoto-scale_200_200/B56ZjLcG9WHUAY-/0/1755759802549?e=1760572800&v=beta&t=_FgUqvwiFQwEsUTaVOodx4Q0Ei9jrAvKR5sfXCDF4Ic"
            alt="Profile"
            className="profile-photo"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
