// src/components/Profile.jsx
import React from "react";
import { PROFILE, LINKS, SKILLS } from "../utils/data";
import { motion } from "framer-motion";

const Profile = () => {
  return (
    <section id="profile" className="container" style={{ marginTop: "2rem" }}>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="card"
        style={{
          overflow: "hidden",
          borderRadius: "16px",
          marginBottom: "2rem",
        }}
      >
        {/* Cover */}
        <div
          style={{
            height: 200,
            width: "100%",
            background:
              "url('https://media.licdn.com/dms/image/v2/D5616AQG2a1V7z7Aphg/profile-displaybackgroundimage-shrink_350_1400/profile-displaybackgroundimage-shrink_350_1400/0/1683671511339?e=1760572800&v=beta&t=2VFANj22kAB4Qu65J55I9akTSLXx-4aUCayndebxYSg') center/cover no-repeat",
          }}
        ></div>

        {/* Avatar */}
        <div style={{ position: "relative", padding: "0 1.5rem" }}>
          <img
            src="https://media.licdn.com/dms/image/v2/D5603AQHwEr2IAwFKjA/profile-displayphoto-scale_200_200/B56ZjLcG9WHUAY-/0/1755759802549?e=1760572800&v=beta&t=_FgUqvwiFQwEsUTaVOodx4Q0Ei9jrAvKR5sfXCDF4Ic"
            alt="Profile"
            className="rounded-full"
            style={{
              width: 140,
              height: 140,
              border: "5px solid var(--bg)",
              borderRadius: "50%",
              position: "absolute",
              top: -150,
              left: 20,
            }}
          />
          <div style={{ marginTop: 80 }}>
            <h2 className="h2">{PROFILE.name}</h2>
            <p style={{ color: "var(--muted)" }}>{PROFILE.title}</p>
            <p className="text-sm">{PROFILE.location}</p>
          </div>
        </div>
      </motion.div>

      {/* Grid Layout */}
      <div className="grid gap-4 lg:grid-cols-12">
        {/* About & Education */}
        <motion.div
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
          className="lg:col-span-8 card"
        >
          <h3 className="h3 mb-2">About</h3>
          <p style={{ color: "var(--muted)" }}>{PROFILE.shortBio}</p>

          <h3 className="h3 mt-6 mb-2">Education</h3>
          <p className="font-semibold" style={{ color: "var(--accent)" }}>
            B.Tech in Computer Science (AI & ML)
          </p>
          <p>{PROFILE.college}</p>
          <p style={{ color: "var(--muted)" }}>CGPA: {PROFILE.cgpa}</p>
        </motion.div>

        {/* Contact & Social */}
        <motion.div
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
          className="lg:col-span-4 card"
        >
          <h3 className="h3 mb-2">Contact</h3>
          <p>Email: {PROFILE.contactEmail}</p>
          <p>Phone: {PROFILE.phone}</p>
          <p>Website: www.priyanshukesharwani.com</p>

          <h3 className="h3 mt-4">Socials</h3>
          <div className="flex gap-3 mt-2">
            <a href={LINKS.linkedin} target="_blank" rel="noreferrer">
              <i className="fab fa-linkedin text-xl" style={{ color: "var(--accent)" }}></i>
            </a>
            <a href={LINKS.github} target="_blank" rel="noreferrer">
              <i className="fab fa-github text-xl" style={{ color: "var(--accent)" }}></i>
            </a>
            <a href={LINKS.leetcode} target="_blank" rel="noreferrer">
              <i className="fas fa-code text-xl" style={{ color: "var(--accent)" }}></i>
            </a>
          </div>
        </motion.div>

        {/* Experience */}
        <motion.div
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
          className="lg:col-span-8 card"
        >
          <h3 className="h3 mb-2">Experience</h3>
          <div className="mb-4">
            <h4 className="font-semibold" style={{ color: "var(--accent)" }}>
              Internship – Cognifiz
            </h4>
            <p style={{ color: "var(--muted)" }}>2024</p>
            <p className="text-sm">
              Machine Learning & Software Development Internship.
              Hands-on with practical projects and DSA problem solving.
            </p>
          </div>
          <div>
            <h4 className="font-semibold" style={{ color: "var(--accent)" }}>
              Freelance Projects
            </h4>
            <p style={{ color: "var(--muted)" }}>2022 – Present</p>
            <p className="text-sm">
              Built interactive web apps and personal projects like Tuggable Bulb, Snake Game, etc.
            </p>
          </div>
        </motion.div>

        {/* Skills */}
        <motion.div
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
          className="lg:col-span-4 card"
        >
          <h3 className="h3 mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {SKILLS.map((skill) => (
              <span
                key={skill.name}
                className="px-3 py-1 rounded text-sm"
                style={{
                  background: "rgba(45,224,211,0.1)",
                  border: "1px solid var(--accent)",
                  color: "var(--accent)",
                  fontWeight: 600,
                }}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Profile;