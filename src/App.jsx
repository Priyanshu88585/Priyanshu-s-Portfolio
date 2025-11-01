// src/App.jsx
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import { motion, AnimatePresence } from "framer-motion";
import LeetCode from "./components/LeetCode";
import Profile from "./components/Profile";
import Links from "./components/Links";
import Services from "./components/Services";
import Certifications from "./components/Certifications";
import GithubProfile from "./components/GithubProfile";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const cursor = document.createElement("div");
    cursor.className = "cursor";
    document.body.appendChild(cursor);
    const move = (e) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    };
    const enter = () =>
      (cursor.style.transform = "translate(-50%,-50%) scale(1.6)");
    const leave = () =>
      (cursor.style.transform = "translate(-50%,-50%) scale(1)");
    document.addEventListener("mousemove", move);
    document.querySelectorAll("a, button, .project-card").forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });
    return () => {
      document.removeEventListener("mousemove", move);
      document.body.removeChild(cursor);
    };
  }, []);

  return (
    <Router>
      <AnimatePresence>
        {loading && (
          <motion.div
            className="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="spinner" />
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar />

      <main style={{ marginTop: 80 }}>
        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <About />
                <Links />
                <Services/>
                <Skills />
                <Projects />
                <Testimonials />
                <Certifications />
                <LeetCode />
                <GithubProfile username="Priyanshu88585" repoCount={30} />
                <Contact />
              </>
            }
          />

          {/* Profile Page */}
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>

      <Footer />
      <BackToTop />
    </Router>
  );
}

export default App;
