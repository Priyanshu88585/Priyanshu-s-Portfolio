// src/components/Footer.jsx
import React from "react";
import { LINKS } from "../utils/data";

const Footer = () => {
  return (
    <footer className="container footer">
      <div style={{color:"var(--muted)"}}>© {new Date().getFullYear()} Priyanshu Kesharwani</div>
    </footer>
  );
};

export default Footer;
