// src/components/About.jsx
import React from "react";
import { motion } from "framer-motion";
import { PROFILE } from "../utils/data";

const About = () => {
  return (
    <section id="about" className="container">
      <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
        <h2 className="h2">About Me</h2>
        <p style={{ marginTop: 12, maxWidth: 760 }}>
          {PROFILE.shortBio} I graduated from {PROFILE.college} with CGPA {PROFILE.cgpa}. I'm passionate about building UI, understanding system design (LLD & HLD) and solving algorithmic problems. fileciteturn0file0
        </p>
      </motion.div>
    </section>
  );
};

export default About;
