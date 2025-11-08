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

        {/* Resume Button */}
        <motion.a
          href="/Priyanshu's Resume 2022-26.pdf"
          download="Priyanshu_Kesharwani_Resume.pdf"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="resume-btn"
          style={{
            display: "inline-block",
            marginTop: "1.5rem",
            padding: "10px 20px",
            borderRadius: "8px",
            background: "var(--accent)",
            color: "#fff",
            fontWeight: "600",
            textDecoration: "none",
            transition: "background 0.3s",
          }}
        >
          📄 Resume
        </motion.a>
      </div>

      {/* Right Side (Profile Image) */}
      <div className="hero-right">
        <div className="profile-photo-wrap card">
          <img
            src= "https://media.licdn.com/dms/image/v2/D4D03AQEFOmUsQYUVCw/profile-displayphoto-scale_400_400/B4DZpiMoIcHwAg-/0/1762584074631?e=1764201600&v=beta&t=OXy1UFrMMED0TtUqchlujK2XD4ersIgAS1LkwDW3rNk"            alt="Profile"
            className="profile-photo"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
