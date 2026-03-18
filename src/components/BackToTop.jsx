// src/components/BackToTop.jsx
import React, { useState, useEffect } from "react";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  useEffect(()=> {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  },[]);
  if (!visible) return null;
  return (
    <button className="back-to-top card" onClick={()=> window.scrollTo({top:0, behavior:"smooth"})}>
      ↑
    </button>
  
  );
};

export default BackToTop;
