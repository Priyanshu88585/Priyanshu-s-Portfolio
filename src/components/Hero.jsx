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
            src= "https://instagram.fjlr3-1.fna.fbcdn.net/v/t51.2885-19/566109011_18290561581281912_6637570721334868658_n.jpg?stp=dst-jpg_s320x320_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDgwLmMyIn0&_nc_ht=instagram.fjlr3-1.fna.fbcdn.net&_nc_cat=100&_nc_oc=Q6cZ2QG35ZuOZsms96a-WqTFOzErbAhRZhCLrBLk6okxyHHNBFb39IqcBFNndbbc-DIdAGtnxfLt4-FNx5E65QhnAat7&_nc_ohc=qrA2Jni_ABIQ7kNvwExS0AE&_nc_gid=A3WqRrj1TzkClbn4m1axnA&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfeJxH5R8o3_pCJzLlKtu_UuRfrR0_VW_dlc069Gbbl7Ig&oe=68FF8512&_nc_sid=8b3546"
            alt="Profile"
            className="profile-photo"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
