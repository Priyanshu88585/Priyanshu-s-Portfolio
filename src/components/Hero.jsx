// src/components/Hero.jsx
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PROFILE } from "../utils/data";

/* ─────────────────────────────────────────────
   Typing Effect
───────────────────────────────────────────── */
const Typing = ({ texts }) => {
  const [index, setIndex] = useState(0);
  const [sub, setSub] = useState(0);
  const [blink, setBlink] = useState(true);
  const [rev, setRev] = useState(false);

  useEffect(() => {
    if (sub === texts[index].length + 1 && !rev) {
      setTimeout(() => setRev(true), 1400);
      return;
    }
    if (sub === 0 && rev) {
      setRev(false);
      setIndex((p) => (p + 1) % texts.length);
      return;
    }
    const t = setTimeout(
      () => setSub((s) => s + (rev ? -1 : 1)),
      rev ? 70 : 140,
    );
    return () => clearTimeout(t);
  }, [sub, index, rev, texts]);

  useEffect(() => {
    const id = setInterval(() => setBlink((b) => !b), 500);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="typing">
      {texts[index].substring(0, Math.max(0, sub))}
      <span style={{ opacity: blink ? 1 : 0 }}>|</span>
    </span>
  );
};

/* ─────────────────────────────────────────────
   TRAE-style Pixel Canvas
   Small grid squares → vortex ring pattern
───────────────────────────────────────────── */



const PixelCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const CELL = 15;
    const GAP = 3;

    let time = 0;
    let raf;

    let scrollY = 0;
    let targetScroll = 0;

    let mouse = { x: 0, y: 0 };
    let mouseLerp = { x: 0, y: 0 };

    /* ─────────────────────────────────────────────
       Scroll
    ───────────────────────────────────────────── */
    const handleScroll = () => {
      targetScroll = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);

    /* ─────────────────────────────────────────────
       Mouse
    ───────────────────────────────────────────── */
    const handleMouse = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouse);

    /* ─────────────────────────────────────────────
       Resize
    ───────────────────────────────────────────── */
    const resize = () => {
      const p = canvas.parentElement;
      canvas.width = p.clientWidth;
      canvas.height = p.clientHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const noise = (c, r) =>
      Math.abs((Math.sin(c * 127.1 + r * 311.7) * 43758.5453) % 1);

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;

      ctx.clearRect(0, 0, W, H);

      const COLS = Math.ceil(W / CELL) + 2;
      const ROWS = Math.ceil(H / CELL) + 2;

      const CX = W * 0.5;
      const CY = H * 0.43;
      const RMAX = Math.min(W, H) * 0.54;

      /* Smooth scroll */
      scrollY += (targetScroll - scrollY) * 0.08;

      /* Smooth mouse */
      mouseLerp.x += (mouse.x - mouseLerp.x) * 0.1;
      mouseLerp.y += (mouse.y - mouseLerp.y) * 0.1;

      const scrollFactor = scrollY * 0.002;
      const intensityBoost = Math.min(1 + scrollY * 0.0008, 2);

      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          let px = c * CELL;
          let py = r * CELL;

          const dx = px + CELL * 0.5 - CX;
          const dy = py + CELL * 0.5 - CY;

          const dist = Math.sqrt(dx * dx + dy * dy);
          const angle = Math.atan2(dy, dx);
          const norm = dist / RMAX;

          /* ─────────────────────────────────────────────
             🔥 Mouse Magnetic Distortion
          ───────────────────────────────────────────── */
          const mdx = px - mouseLerp.x;
          const mdy = py - mouseLerp.y;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);

          const magneticRadius = 180;
          let force = 0;

          if (mDist < magneticRadius) {
            force = (1 - mDist / magneticRadius) * 12;
            px += (mdx / mDist) * force;
            py += (mdy / mDist) * force;
          }

          /* ─────────────────────────────────────────────
             Rings
          ───────────────────────────────────────────── */
          const ring1 = Math.exp(-Math.pow((norm - 0.52) / 0.21, 2));
          const ring2 =
            Math.exp(-Math.pow((norm - 0.72) / 0.18, 2)) * 0.6;
          const ring = ring1 + ring2;

          /* Waves */
          const ripple =
            Math.sin(
              dist * 0.058 -
                (time + scrollFactor) * 2.5 +
                angle * 0.45
            ) *
              0.5 +
            0.5;

          const ripple2 =
            Math.cos(
              dist * 0.032 -
                (time + scrollFactor) * 1.2 +
                angle * 0.25
            ) *
              0.3 +
            0.7;

          /* Swirl */
          const swirl =
            Math.sin(
              angle * 4 +
                norm * 8 -
                (time + scrollFactor) * 2.1
            ) *
              0.35 +
            0.65;

          const swirl2 =
            Math.cos(
              angle * 2.5 +
                norm * 4 +
                (time + scrollFactor) * 1.8
            ) *
              0.25 +
            0.75;

          /* Pulse */
          const pulse =
            Math.sin(
              (time + scrollFactor) * 3.2 + dist * 0.05
            ) *
              0.4 +
            0.6;

          const n = noise(c, r);

          let opacity =
            ring *
              ripple *
              ripple2 *
              swirl *
              swirl2 *
              pulse *
              0.95 *
              intensityBoost -
            n * 0.15;

          opacity = Math.max(0, opacity);

          if (opacity < 0.02) continue;

          /* ─────────────────────────────────────────────
             🎯 Depth / Parallax illusion
          ───────────────────────────────────────────── */
          const depthShift =
            ((mouseLerp.x - CX) / W) * norm * 20;

          px += depthShift;

          /* Colors */
          const isAccent =
            ring > 0.65 &&
            ripple > 0.58 &&
            Math.sin(c * 3.1 + r * 2.7 + time * 4.2) > 0.4;

          const isBright =
            ring > 0.55 &&
            ripple2 > 0.6 &&
            Math.cos(c + r + time * 2) > 0.3;

          if (isAccent) {
            ctx.fillStyle = `rgba(255,100,80,${opacity * 0.92})`;
          } else if (isBright) {
            ctx.fillStyle = `rgba(100,200,255,${opacity * 0.35})`;
          } else if (opacity > 0.65) {
            ctx.fillStyle = `rgba(255,150,120,${opacity * 0.28})`;
          } else if (opacity > 0.4) {
            ctx.fillStyle = `rgba(180,200,220,${opacity * 0.18})`;
          } else if (opacity > 0.2) {
            ctx.fillStyle = `rgba(150,140,160,${opacity * 0.11})`;
          } else {
            ctx.fillStyle = `rgba(100,110,130,${opacity * 0.06})`;
          }

          ctx.fillRect(px, py, CELL - GAP, CELL - GAP);
        }
      }

      time += 0.016 + scrollFactor * 0.3;

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
};



/* ─────────────────────────────────────────────
   Stats Bar
───────────────────────────────────────────── */
const STATS = [
  { n: "7+", label: "Projects Shipped" },
  { n: "500+", label: "LeetCode Solved" },
  { n: "7.9", label: "CGPA" },
  { n: "2+", label: "Years Coding" },
];

/* ─────────────────────────────────────────────
   Hero
───────────────────────────────────────────── */
const Hero = () => (
  <section
    id="hero"
    style={{
      position: "relative",
      minHeight: "1000px",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
    }}
  >
    {/* ── pixel canvas background ── */}
    <PixelCanvas />

    {/* ── main content row ── */}
    <div
      className="container"
      style={{
        position: "relative",
        zIndex: 10,
        paddingBottom: "4rem",
        paddingTop: "2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "3rem",
        flexWrap: "wrap",
      }}
    >
      {/* LEFT: text */}
      <div style={{ flex: "1 1 460px", minWidth: 0 }}>
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="hero-badge"
        >
          <span className="hero-badge-dot" />
          Open to Opportunities
        </motion.div>

        <motion.h1
          className="h1"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12 }}
          style={{
            fontSize: "clamp(2rem,5vw,3.8rem)",
            lineHeight: 1.08,
            marginTop: "0.9rem",
            marginBottom: "0.85rem",
          }}
        >
          {PROFILE.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.24 }}
          style={{
            color: "var(--muted)",
            maxWidth: 530,
            fontSize: "1.05rem",
            lineHeight: 1.65,
          }}
        >
          Understand. Execute. Deliver. — Building scalable web apps with clean
          code, sharp algorithms, and a bias for shipping.
        </motion.p>

        {/* Typing */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{ marginTop: "0.9rem", fontSize: "1.05rem", fontWeight: 600 }}
        >
          <Typing
            texts={[
              "Full Stack Developer",
              "7+ Industry Level Projects Shipped",
              "DSA Enthusiast — 500+ Problems",
              "React Developer",
              "N8N Automation Builder",
              "System Design",
            ]}
          />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.58 }}
          style={{
            marginTop: "1.6rem",
            display: "flex",
            gap: "0.85rem",
            flexWrap: "wrap",
          }}
        >
          <a
            href="/Priyanshu's Resume 2022-26.pdf"
            download="Priyanshu_Kesharwani_Resume.pdf"
            className="hero-cta-primary"
          >
            📄 Download Resume
          </a>
          <a href="#projects" className="hero-cta-outline">
            Explore Projects →
          </a>
        </motion.div>
      </div>

      {/* RIGHT: avatar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.86 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.85, delay: 0.18 }}
        style={{ flexShrink: 0 }}
      >
        <div className="hero-avatar-ring">
          <div className="hero-avatar-glow" />
          <img
            src="https://avatars.githubusercontent.com/u/134344291?v=4"
            alt="Priyanshu Kesharwani"
            className="hero-avatar-img"
          />
        </div>
      </motion.div>
    </div>

    {/* ── Stats bar ── */}
    <div
      className="container"
      style={{ position: "relative", zIndex: 10, paddingBottom: "2.5rem" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85, duration: 0.55 }}
        className="hero-stats-bar"
      >
        {STATS.map((s, i) => (
          <div key={i} className="hero-stat">
            <div className="hero-stat-n">{s.n}</div>
            <div className="hero-stat-l">{s.label}</div>
          </div>
        ))}
      </motion.div>
    </div>

    {/* ── Scroll mouse hint ── */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.3 }}
      style={{
        position: "absolute",
        bottom: "1.4rem",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 5,
        zIndex: 10,
        pointerEvents: "none",
      }}
    >
      <span
        style={{
          fontSize: "0.68rem",
          color: "rgba(255,255,255,0.22)",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}
      >
        scroll
      </span>
      <div className="scroll-mouse">
        <div className="scroll-wheel" />
      </div>
    </motion.div>
  </section>
);

export default Hero;
