// src/components/JourneyTimeline.jsx
// Inspired by trae.ai/solo — vertical scroll timeline with left labels,
// centre line, and right content cards (code snippets + skill badges)
import React from "react";
import { motion } from "framer-motion";

/* ─────────────────────────────────────────────
   Timeline Data
───────────────────────────────────────────── */
const MILESTONES = [
  {
    id: "education",
    label: "Education",
    icon: "🎓",
    heading: "B.Tech in CS (AI & ML)",
    desc: "Graduated from Technocrats Institute of Technology, Bhopal with CGPA 7.9. Mastered Data Structures, Algorithms, System Design, OOP, and AI/ML fundamentals — the base for everything built after.",
    code: `// Starting with the fundamentals
class Developer {
  name   = "Priyanshu Kesharwani";
  degree = "B.Tech CS (AI & ML)";
  cgpa   = 7.9;

  skills = ["Java", "DSA", "OOPS",
            "System Design", "Web Dev"];
}`,
  },
  {
    id: "first-code",
    label: "First Code",
    icon: "💡",
    heading: "AI enters the workflow along with the first line of code",
    desc: "Started with HTML, CSS and Vanilla JavaScript. Built interactive mini-apps like a Strip Clock, Tuggable Bulb, Snake Game — learning how the web actually works from the ground up.",
    skills: ["HTML5", "CSS3", "JavaScript", "DOM API", "Vanilla JS"],
  },
  {
    id: "projects",
    label: "Projects",
    icon: "💻",
    heading: "No longer confined to tutorials — shipping real products",
    desc: "Built 7+ full-stack projects including a restaurant website, e-commerce platform (Med Store), and an open-source UI elements library (UISEN). Deployed everything on Vercel.",
    code: `// Real-world projects
const projects = [
  { name: "Med Store"},
  { name: "Royal Saffron"},
  { name: "UISEN Library"},
  { name: "Bill Splitter"},
];

// All shipped → vercel.app ✓`,
  },
  {
    id: "internship",
    label: "Internship",
    icon: "🏢",
    heading: "Professional experience at Coding Thinker",
    desc: "Applied full-stack technologies in a real engineering team. Shipped frontend features, built REST APIs, practised DSA daily, and cracked 500+ LeetCode problems while on the job.",
    code: `// Internship snapshot
const experience = {
  company:  "Coding Thinker",
  role:     "Full Stack Developer Intern",
  year:     2024,
  outcomes: [
    "Shipped production features",
    "REST API design",
    "LeetCode 500+ problems solved",
    "Code reviews & collaboration",
  ],
};`,
  },
  {
    id: "now",
    label: "Now",
    icon: "🚀",
    heading: "Shipping at full speed — full stack & automation",
    desc: "Currently building scalable MERN applications, exploring AI integrations with N8N automation, and preparing for top engineering roles. Every day is a new commit.",
    skills: [
      "MERN Stack",
      "Java",
      "LeetCode 500+",
      "System Design",
      "N8N Automation",
      "Firebase",
    ],
  },
];

/* ─────────────────────────────────────────────
   Code Block UI
───────────────────────────────────────────── */
const CodeBlock = ({ code }) => (
  <div
    style={{
      marginTop: 14,
      background: "rgba(0,0,0,0.45)",
      borderRadius: 10,
      border: "1px solid rgba(255,255,255,0.04)",
      overflow: "hidden",
    }}
  >
    {/* "IDE" top bar */}
    <div
      style={{
        padding: "7px 12px",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        display: "flex",
        alignItems: "center",
        gap: 6,
      }}
    >
      {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
        <div
          key={c}
          style={{ width: 9, height: 9, borderRadius: "50%", background: c }}
        />
      ))}
      <span
        style={{
          marginLeft: 8,
          fontSize: "0.72rem",
          color: "rgba(255,255,255,0.2)",
          fontFamily: "monospace",
        }}
      >
        index.js
      </span>
    </div>
    <pre
      style={{
        margin: 0,
        padding: "1rem",
        fontFamily: "'Fira Code', 'Cascadia Code', monospace",
        fontSize: "0.8rem",
        lineHeight: 1.65,
        color: "#61bc61",
        overflowX: "auto",
        whiteSpace: "pre",
      }}
    >
      {code}
    </pre>
  </div>
);

/* ─────────────────────────────────────────────
   Skills Hub  (SOLO-section inspired)
───────────────────────────────────────────── */
const SkillsHub = () => {
  const left = ["</> React.js", "</> Node.js", " </> Express.js", "Next.js", "</> MongoDB"];
  const right = ["</> Java", "</> LeetCode 500+", "</> System Design","</> N8N Automation","</> github"];
  const flow = [
    "Requirement",
    "Prototyping",
    "Frontend",
    "Backend",
    "Debugging",
    "Deploy",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      style={{
        marginTop: "3rem",
        padding: "2.5rem",
        borderRadius: 20,
        border: "1px solid rgba(255,111,97,0.16)",
        background: "rgba(255,111,97,0.025)",
        backdropFilter: "blur(6px)",
        textAlign: "center",
      }}
    >
      <h3 style={{ fontSize: "1.55rem", fontWeight: 700, marginBottom: 8 }}>
        All your context and skills, in one stack
      </h3>
      <p
        style={{
          color: "var(--muted)",
          marginBottom: "2.2rem",
          maxWidth: 500,
          margin: "0 auto 2.2rem",
        }}
      >
        Full-stack capabilities spanning frontend, backend, algorithms and
        deployment — I own the entire pipeline.
      </p>

      {/* Tool grid */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "2.5rem",
          flexWrap: "wrap",
        }}
      >
        {/* Left tools */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {left.map((t) => (
            <div
              key={t}
              style={{
                padding: "8px 16px",
                borderRadius: 8,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                fontSize: "0.87rem",
                color: "var(--muted)",
                textAlign: "left",
              }}
            >
              {t}
            </div>
          ))}
        </div>

        {/* Centre badge */}
        <div style={{ position: "relative" }}>
          {/* connecting lines */}
          <div
            style={{
              position: "absolute",
              left: "-2.5rem",
              top: "50%",
              width: "2.5rem",
              height: 1,
              background:
                "linear-gradient(to right,transparent,rgba(255,111,97,0.4))",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: "-2.5rem",
              top: "50%",
              width: "2.5rem",
              height: 1,
              background:
                "linear-gradient(to left,transparent,rgba(255,111,97,0.4))",
            }}
          />
          <div
            style={{
              padding: "1.4rem 2.2rem",
              borderRadius: 14,
              background: "var(--bg)",
              border: "2px solid var(--accent)",
              fontWeight: 800,
              fontSize: "1.55rem",
              letterSpacing: "0.07em",
              color: "var(--text)",
              boxShadow: "0 0 40px rgba(255,111,97,0.22)",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                top: -1,
                height: 2,
                width: "55%",
                background:
                  "linear-gradient(90deg,transparent,var(--accent),transparent)",
              }}
            />
            P
            <div
              style={{
                fontSize: "0.72rem",
                color: "var(--muted)",
                fontWeight: 400,
                letterSpacing: 0,
              }}
            >
              Full Stack Dev
            </div>
          </div>
        </div>

        {/* Right tools */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {right.map((t) => (
            <div
              key={t}
              style={{
                padding: "8px 16px",
                borderRadius: 8,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                fontSize: "0.87rem",
                color: "var(--muted)",
                textAlign: "left",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>

      {/* Dev flow */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.4rem",
          marginTop: "2.2rem",
          flexWrap: "wrap",
        }}
      >
        {flow.map((s, i) => (
          <React.Fragment key={s}>
            <div
              style={{
                padding: "7px 13px",
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.07)",
                fontSize: "0.82rem",
                color: "var(--muted)",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              {s}
            </div>
            {i < flow.length - 1 && (
              <span
                style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.75rem" }}
              >
                →
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   Single Milestone row
───────────────────────────────────────────── */
const MilestoneRow = ({ m, index }) => {
  const isEven = index % 2 === 0;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "stretch",
        gap: 0,
        marginBottom: "2.5rem",
        position: "relative",
      }}
    >
      {/* ── LEFT LABEL col ── */}
      <div
        style={{
          width: 110,
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          paddingRight: 20,
          paddingTop: 14,
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div
            style={{
              fontSize: "0.72rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.22)",
              marginBottom: 4,
              textAlign: "right",
            }}
          >
            • {m.label}
          </div>
          {/* dashed horizontal line */}
          <div
            style={{
              height: 1,
              width: 40,
              marginLeft: "auto",
              background:
                "repeating-linear-gradient(to right,rgba(255,111,97,0.35) 0,rgba(255,111,97,0.35) 4px,transparent 4px,transparent 8px)",
            }}
          />
        </motion.div>
      </div>

      {/* ── CENTRE icon node ── */}
      <div
        style={{
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 2,
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.1,
          }}
          viewport={{ once: true }}
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: "var(--bg)",
            border: "2px solid var(--accent)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.1rem",
            boxShadow: "0 0 22px rgba(255,111,97,0.28)",
          }}
        >
          {m.icon}
        </motion.div>
        {/* connector down to next */}
        <div
          style={{
            flex: 1,
            width: 1,
            background: "rgba(255,111,97,0.2)",
            minHeight: 40,
          }}
        />
      </div>

      {/* ── RIGHT content card ── */}
      <div style={{ flex: 1, paddingLeft: 20 }}>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          viewport={{ once: true }}
          style={{
            background: "var(--card)",
            borderRadius: 14,
            padding: "1.4rem",
            border: "1px solid rgba(255,255,255,0.05)",
            boxShadow: "0 12px 40px rgba(0,0,0,0.38)",
          }}
        >
          {/* label pill */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              padding: "4px 10px",
              borderRadius: 20,
              background: "rgba(255,111,97,0.1)",
              border: "1px solid rgba(255,111,97,0.22)",
              fontSize: "0.75rem",
              color: "var(--accent)",
              fontWeight: 700,
              marginBottom: 10,
              letterSpacing: "0.04em",
            }}
          >
            {m.icon} {m.label}
          </div>

          <h3
            style={{
              fontSize: "1.15rem",
              fontWeight: 700,
              lineHeight: 1.3,
              marginBottom: 8,
            }}
          >
            {m.heading}
          </h3>
          <p
            style={{
              color: "var(--muted)",
              fontSize: "0.93rem",
              lineHeight: 1.68,
            }}
          >
            {m.desc}
          </p>

          {m.code && <CodeBlock code={m.code} />}
          {m.skills && (
            <div
              style={{
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
                marginTop: 12,
              }}
            >
              {m.skills.map((s) => (
                <span
                  key={s}
                  style={{
                    padding: "5px 12px",
                    borderRadius: 20,
                    fontSize: "0.8rem",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "var(--muted)",
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   JourneyTimeline  (main export)
───────────────────────────────────────────── */
const JourneyTimeline = () => (
  <section
    id="journey"
    className="container"
    style={{ paddingTop: "5.5rem", paddingBottom: "2rem" }}
  >
    {/* ── Header ── */}
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65 }}
      viewport={{ once: true }}
      style={{ marginBottom: "4rem" }}
    >
      <div
        style={{
          fontSize: "0.75rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--accent)",
          marginBottom: 10,
          fontWeight: 600,
        }}
      >
        • My Journey
      </div>
      <h2
        style={{
          fontSize: "clamp(1.7rem,4vw,2.6rem)",
          fontWeight: 700,
          lineHeight: 1.15,
          maxWidth: 600,
        }}
      >
        From a student to an engineer
      </h2>
      <p
        style={{
          color: "var(--muted)",
          marginTop: 12,
          maxWidth: 560,
          lineHeight: 1.65,
        }}
      >
        Code used to be an assignment. Now it's how I build the future. Scroll
        through the journey that brought me here.
      </p>
    </motion.div>

    {/* ── Timeline ── */}
    <div style={{ position: "relative", maxWidth: 860, marginLeft: 0 }}>
      {MILESTONES.map((m, i) => (
        <MilestoneRow key={m.id} m={m} index={i} />
      ))}
    </div>

    {/* ── Skills Hub ── */}
    <SkillsHub />
  </section>
);

export default JourneyTimeline;
