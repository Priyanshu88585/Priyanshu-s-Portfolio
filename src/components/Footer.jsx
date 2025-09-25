// src/components/Footer.jsx
import React from "react";
import { LINKS } from "../utils/data";

const Footer = () => {
  return (
    <footer className="container footer">
      <div style={{color:"var(--muted)"}}>© {new Date().getFullYear()} Priyanshu Kesharwani</div>
      <div style={{display:"flex", gap:10}}>
        <a href={LINKS.github} target="_blank" rel="noreferrer">GitHub</a>
        <a href={LINKS.leetcode} target="_blank" rel="noreferrer">LeetCode</a>
        <a href={LINKS.hackerrank} target="_blank" rel="noreferrer">HackerRank</a>
      </div>
    </footer>
  );
};

export default Footer;
