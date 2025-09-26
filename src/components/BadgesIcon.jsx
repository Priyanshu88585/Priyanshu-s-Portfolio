// src/components/BadgesIcon.jsx
import React from "react";
import { BADGES } from "../utils/data";
import "../styles/leetcode.css";

const BadgesIcon = () => {
  return (
    <div className="leetcode-card badges-card">
      <div className="badges-header">
        <div className="badge-icons">
          {/* Custom BADGES from data.js */}
          {BADGES.map((b, i) => (
            <a
              href={b.link}
              target="_blank"
              rel="noopener noreferrer"
              key={`custom-${i}`}
            >
              <img
                src={b.image}
                alt={b.name}
                className="badge-icon"
                style={{ width: "20px", height: "20px" }}
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BadgesIcon;
