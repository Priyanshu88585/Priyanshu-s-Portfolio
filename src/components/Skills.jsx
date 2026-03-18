// src/components/Skills.jsx
import React from "react";
import { motion } from "framer-motion";
import { SKILLS } from "../utils/data";

const Skills = () => {
  return (
    <section id="skills" className="container">
      <motion.div initial={{opacity:0, y:40}} whileInView={{opacity:1, y:0}} transition={{duration:0.6}}>
        <h2 className="h2">Skills</h2>
        <div className="skills-grid" style={{marginTop:12}}>
          {SKILLS.map((s) => (
            <div key={s.name} className="skill card" style={{display:"flex", gap:8, alignItems:"center", justifyContent:"space-between"}}>
              <div>
                <div style={{fontWeight:600}}>{s.name}</div>
                <div style={{fontSize:12, color:"var(--muted)"}}>{s.level}%</div>
              </div>
              <div style={{flex:1, marginLeft:12}}>
                <div className="bar">
                  <motion.i initial={{width:0}} whileInView={{width: `${s.level}%`}} transition={{duration:1.2}} style={{display:"block", height:"100%", borderRadius:8}}/>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;
