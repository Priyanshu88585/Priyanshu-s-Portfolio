// src/components/Certifications.jsx
import React from "react";
import { motion } from "framer-motion";
import { CERTIFICATIONS } from "../utils/data";

const Certifications = () => {
  return (
    <section id="certifications" className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="h2">Certifications</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 16,
            marginTop: 16,
          }}
        >
          {CERTIFICATIONS.map((cert, i) => (
            <div key={i} className="certificate card">
              <div style={{ fontWeight: 700 }}>{cert.title}</div>
              <p style={{ color: "var(--muted)", marginTop: 6 }}>
                {cert.issuer} • {cert.year}
              </p>
              {cert.link && (
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    marginTop: 8,
                    color: "var(--accent)",
                    fontWeight: 500,
                  }}
                >
                  View Certificate →
                </a>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Certifications;
