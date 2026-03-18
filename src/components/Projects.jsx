// src/components/Projects.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { PROJECTS } from "../utils/data";

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;
  return (
    <div className="modal" onClick={onClose}>
      <div className="body" onClick={(e)=>e.stopPropagation()}>
        <h3 style={{marginBottom:8}}>{project.title}</h3>
        <p style={{color:"var(--muted)"}}>{project.summary}</p>
        <div className="tech-badges">
          {project.tech.map(t => <div key={t} className="tech">{t}</div>)}
        </div>
        <div style={{marginTop:14}}>
          <a href={project.link} target="_blank" rel="noreferrer">Open Project</a>
        </div>
        <div style={{marginTop:12}}>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const [selected, setSelected] = useState(null);
  return (
    <section id="projects" className="container">
      <motion.div initial={{opacity:0, y:30}} whileInView={{opacity:1, y:0}} transition={{duration:0.6}}>
        <h2 className="h2">Projects</h2>
        <div className="projects-grid" style={{marginTop:12}}>
          {PROJECTS.map((p) => (
            <motion.div key={p.id} layout className="project-card card" onClick={() => setSelected(p)} whileHover={{scale:1.02}}>
              <h3 style={{marginBottom:6}}>{p.title}</h3>
              <p style={{color:"var(--muted)", fontSize:14}}>{p.summary}</p>
              <div className="tech-badges">
                {p.tech.map(t=> <div key={t} className="tech">{t}</div>)}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
};

export default Projects;
