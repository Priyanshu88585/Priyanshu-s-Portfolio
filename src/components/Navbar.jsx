// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/components.css";
import DarkModeToggle from "./DarkModeToggle"; // ⬅️ import toggle

const Navbar = () => {
  return (
    <div className="navbar card">
      {/* Left side: Name & Tag */}
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <Link
          to="/profile"
          style={{ fontWeight: 700, textDecoration: "none", color: "var(--text)" }}
        >
          Priyanshu
        </Link>
        <div style={{ color: "var(--muted)", fontSize: 13 }}>Portfolio</div>
      </div>

      {/* Right side: Nav links + Dark Mode Switch */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#testimonials">Testimonials</a>
          <a href="#leetcode">LeetCode</a>
          <a href="#contact">Contact</a>
        </div>

        {/* Dark Mode Toggle */}
<div className="nav-toggle">
  <DarkModeToggle />
</div>

      </div>
    </div>
  );
};

export default Navbar;
