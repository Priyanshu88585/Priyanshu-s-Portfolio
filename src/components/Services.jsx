// src/components/Services.jsx
import React from "react";
import { motion } from "framer-motion";
import { SERVICES } from "../utils/data";

const Services = () => {
  return (
    <section id="services" className="container" style={{ marginTop: "2rem" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="h2">Services</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 16,
            marginTop: 16,
          }}
        >
          {SERVICES.map((s) => (
            <motion.article
              key={s.id}
              className="card service-card"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.25 }}
              style={{
                padding: "1rem",
                borderRadius: 12,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: 140,
              }}
              aria-labelledby={`svc-${s.id}-title`}
            >
              <div>
                <h3
                  id={`svc-${s.id}-title`}
                  style={{ margin: 0, fontSize: "1.05rem", fontWeight: 700 }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    marginTop: 8,
                    color: "var(--muted)",
                    lineHeight: 1.4,
                    fontSize: "0.95rem",
                  }}
                >
                  {s.desc}
                </p>
              </div>

              <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
                <a
                  href={`#contact`}
                  className="btn"
                  style={{
                    textDecoration: "none",
                    padding: "0.45rem 0.75rem",
                    borderRadius: 8,
                    fontWeight: 600,
                    alignSelf: "flex-start",
                  }}
                >
                  Hire Me
                </a>
                <button
                  type="button"
                  className="btn-outline"
                  style={{
                    padding: "0.45rem 0.75rem",
                    borderRadius: 8,
                    background: "transparent",
                    border: "1px solid rgba(255,255,255,0.06)",
                    color: "var(--muted)",
                    cursor: "default",
                  }}
                  aria-hidden
                >
                  {s.id}
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Services;
