// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/components.css";
import DarkModeToggle from "./DarkModeToggle"; // ⬅️ import toggle
import logo from "../assets/logo/logo_portfolio.jpg"; // <-- put your 1:1 logo here

const Navbar = () => {
  return (
    <div className="navbar card">
      {/* Left side: Name & Tag */}
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <img
          src={logo}
          alt="logo"
          style={{
            width: 40,               // 1:1 square size (adjust as needed)
            height: 40,
            objectFit: "cover",
            border: "1px solid var(--border)", // border color from theme
            borderRadius: 25,
            padding: 4,              // inner padding
            marginRight: 1,          // spacing to the name
          }}
        />
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
