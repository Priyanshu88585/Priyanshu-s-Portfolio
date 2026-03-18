// src/components/Testimonials.jsx
import React from "react";
import { TESTIMONIALS } from "../utils/data";
import { motion } from "framer-motion";

const Testimonials = () => {
  return (
    <section id="testimonials" className="container">
      <motion.div initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} transition={{duration:0.6}}>
        <h2 className="h2">Testimonials & Offers</h2>
        <div style={{display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:12, marginTop:12}}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="testimonial card">
              <div style={{fontWeight:700}}>{t.name}</div>
              <p style={{color:"var(--muted)", marginTop:6}}>{t.quote}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Testimonials;
