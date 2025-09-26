// src/components/LeetCode.jsx
import React, { useEffect, useMemo, useState } from "react";
import { BADGES } from "../utils/data";
import "../styles/leetcode.css";

const API_URL = "https://leetcode-stats-api.herokuapp.com/OutR5t3bfn";

/**
 * LeetCode component
 * - Fetches LeetCode stats from API
 * - Renders donut (total solved + Easy/Med/Hard numbers)
 * - Renders badges block
 * - Renders a 1-year heatmap with months aligned and weekday labels (Sun..Sat)
 */

const LeetCode = () => {
  const [stats, setStats] = useState(null);
  const [submissionMap, setSubmissionMap] = useState({});
  const [weeksByIndex, setWeeksByIndex] = useState([]);
  const [totalActiveDays, setTotalActiveDays] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true);
        const res = await fetch(API_URL);
        const data = await res.json();
        setStats(data || null);

        // Build submissionMap: yyyy-mm-dd -> count
        const cal = (data && data.submissionCalendar) || {};
        const map = {};
        Object.entries(cal).forEach(([ts, count]) => {
          const date = new Date(parseInt(ts, 10) * 1000);
          const key = date.toISOString().slice(0, 10);
          map[key] = count;
        });
        setSubmissionMap(map);

        // Build weeks aligned to Sunday..Saturday columns for past 365 days
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const oneYearAgo = new Date(today);
        oneYearAgo.setDate(today.getDate() - 364);

        // Start from the Sunday on or before oneYearAgo
        const start = new Date(oneYearAgo);
        while (start.getDay() !== 0) {
          start.setDate(start.getDate() - 1);
        }

        const weeks = [];
        let currentWeek = [];

        // iterate from start to today
        const iter = new Date(start);
        while (iter <= today) {
          currentWeek.push(new Date(iter)); // push copy
          if (iter.getDay() === 6) {
            weeks.push(currentWeek);
            currentWeek = [];
          }
          iter.setDate(iter.getDate() + 1);
        }
        
        if (currentWeek.length) weeks.push(currentWeek);

        setWeeksByIndex(weeks);

        // calculate active days and max streak within the one-year range
        let streak = 0;
        let maxSt = 0;
        let active = 0;
        const walker = new Date(oneYearAgo);
        while (walker <= today) {
          const key = walker.toISOString().slice(0, 10);
          const count = map[key] || 0;
          if (count > 0) {
            active++;
            streak++;
            if (streak > maxSt) maxSt = streak;
          } else {
            streak = 0;
          }
          walker.setDate(walker.getDate() + 1);
        }
        setTotalActiveDays(active);
        setMaxStreak(maxSt);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching LeetCode stats:", err);
        setLoading(false);
      }
    }

    fetchStats();
    const id = setInterval(fetchStats, 300000); // refresh every 5 mins
    return () => clearInterval(id);
  }, []);

  // Derived values for donut + difficulty
  const easy = stats?.easySolved ?? 0;
  const medium = stats?.mediumSolved ?? 0;
  const hard = stats?.hardSolved ?? 0;
  const total = stats?.totalSolved ?? easy + medium + hard;

  // Donut circle values (for SVG arcs)
  const donut = useMemo(() => {
    const r = 64;
    const circumference = 2 * Math.PI * r;
    const e = total ? (easy / total) * circumference : 0;
    const m = total ? (medium / total) * circumference : 0;
    const h = total ? (hard / total) * circumference : 0;
    return { r, circumference, e, m, h };
  }, [easy, medium, hard, total]);

  // Build month labels array aligned with weeksByIndex (same length)
  const monthLabels = useMemo(() => {
    const labels = new Array(weeksByIndex.length).fill("");
    let lastMonth = -1;
    weeksByIndex.forEach((week, idx) => {
      const first = week[0];
      if (!first) return;
      // only label when month changes
      const m = first.getMonth();
      if (m !== lastMonth) {
        labels[idx] = first.toLocaleString("default", { month: "short" });
        lastMonth = m;
      }
    });
    return labels;
  }, [weeksByIndex]);

  // colors for heatmap intensity 0..5
  const heatColors = ["#2f2f2f", "#9be9a8", "#40c463", "#30a14e", "#216e39", "#0f4c1c"];

  return (
    <section id="leetcode" className="container" style={{ paddingTop: 70, paddingBottom: 24 }}>
      <h2 className="h2">LeetCode</h2>
      <div className="leetcode-top-row">
        {/* Left card (donut + difficulty boxes) */}
        <div className="leetcode-card">
          <div className="donut-wrap">
            <svg width="220" height="180" viewBox="0 0 220 180" className="donut-svg" aria-hidden>
              <defs>
                <linearGradient id="gEasy" x1="0" x2="1">
                  <stop offset="0%" stopColor="#2DE0D3" />
                  <stop offset="100%" stopColor="#07A3A3" />
                </linearGradient>
                <linearGradient id="gMed" x1="0" x2="1">
                  <stop offset="0%" stopColor="#ffd166" />
                  <stop offset="100%" stopColor="#ff9a3c" />
                </linearGradient>
                <linearGradient id="gHard" x1="0" x2="1">
                  <stop offset="0%" stopColor="#ff6b6b" />
                  <stop offset="100%" stopColor="#ff3b3b" />
                </linearGradient>
              </defs>

              {/* base ring */}
              <circle cx="110" cy="85" r={donut.r} stroke="#1f1f1f" strokeWidth="16" fill="none" />

              {/* easy arc */}
              {donut.e > 0 && (
                <circle
                  cx="110"
                  cy="85"
                  r={donut.r}
                  stroke="url(#gEasy)"
                  strokeWidth="16"
                  fill="none"
                  strokeDasharray={`${donut.e} ${donut.circumference - donut.e}`}
                  strokeDashoffset={0}
                  strokeLinecap="round"
                  transform="rotate(-90 110 85)"
                />
              )}

              {/* med arc */}
              {donut.m > 0 && (
                <circle
                  cx="110"
                  cy="85"
                  r={donut.r}
                  stroke="url(#gMed)"
                  strokeWidth="16"
                  fill="none"
                  strokeDasharray={`${donut.m} ${donut.circumference - donut.m}`}
                  strokeDashoffset={-donut.e}
                  strokeLinecap="round"
                  transform="rotate(-90 110 85)"
                />
              )}

              {/* hard arc */}
              {donut.h > 0 && (
                <circle
                  cx="110"
                  cy="85"
                  r={donut.r}
                  stroke="url(#gHard)"
                  strokeWidth="16"
                  fill="none"
                  strokeDasharray={`${donut.h} ${donut.circumference - donut.h}`}
                  strokeDashoffset={-(donut.e + donut.m)}
                  strokeLinecap="round"
                  transform="rotate(-90 110 85)"
                />
              )}

              {/* center text */}
              <text x="110" y="76" textAnchor="middle" className="donut-number">
                {total}
              </text>
              <text x="110" y="96" textAnchor="middle" className="donut-subtext">
                Solved
              </text>
              <text x="110" y="116" textAnchor="middle" className="donut-small">
                {stats?.attempting ? `${stats.attempting} Attempting` : ""}
              </text>
            </svg>
          </div>

          <div className="difficulty-stack">
            <div className="diff-box easy">
              <div className="diff-title">Easy</div>
              <div className="diff-count">
                {easy}/{stats?.totalEasy ?? "?"}
              </div>
            </div>
            <div className="diff-box medium">
              <div className="diff-title">Med.</div>
              <div className="diff-count">
                {medium}/{stats?.totalMedium ?? "?"}
              </div>
            </div>
            <div className="diff-box hard">
              <div className="diff-title">Hard</div>
              <div className="diff-count">
                {hard}/{stats?.totalHard ?? "?"}
              </div>
            </div>
          </div>
        </div>

        {/* Right card: badges */}
        <div className="leetcode-card badges-card">
          <div className="badges-header">
            <div>
              <div className="badge-count">
                {(stats?.badges?.length ?? 0) + BADGES.length}
              </div>
              <div className="badge-label">Badges</div>
            </div>
            <div className="badge-icons">
              {/* API badges first */}
              {/* {stats?.badges?.slice?.(0, 2)?.map((b, i) => (
                <img
                  src={b.icon ?? b}
                  alt={`badge-${i}`}
                  key={`api-${i}`}
                  className="badge-icon"
                />
              ))} */}

              {/* Custom BADGES */}
              {BADGES.map((b, i) => (
                <a
                  href={b.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={`custom-${i}`}
                >
                  <img src={b.image} alt={b.name} className="badge-icon" style={{ width: '150px', height: '150px' }} />
                </a>
              ))}
            </div>
          </div>

          <div className="most-recent">
            <div className="mr-label">Most Recent Badge</div>
            <div className="mr-name">
              {stats?.badges?.[0]?.displayName ?? BADGES[0]?.name ?? "—"}
            </div>
          </div>

          <div className="card-arrow">→</div>
        </div>

      </div>

      {/* Heatmap card */}
      <div className="heatmap-card leetcode-card">
        <div className="heatmap-top">
          <div className="heatmap-title">
            <span className="big-count">
              {Object.values(submissionMap).reduce((a, b) => a + (b || 0), 0)}
            </span>{" "}
            <span className="title-text">submissions in the past one year</span>
          </div>

          <div className="heat-stats">
            <div>
              Total active days: <strong>{totalActiveDays}</strong>
            </div>
            <div>
              Max streak: <strong>{maxStreak}</strong>
            </div>
          </div>
        </div>

        <div className="heatmap-body">
          {/* Weekday labels - always 7 rows */}
          <div className="weekdays" aria-hidden>
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>

          {/* Scroll wrapper so grid + months scroll together */}
          <div className="heat-scroll-wrapper">
            <div className="heat-grid" role="grid" aria-hidden>
              {weeksByIndex.map((week, wIdx) => (
                <div className="heat-column" key={wIdx}>
                  {/* render exactly 7 rows Sun..Sat */}
                  {Array.from({ length: 7 }).map((_, dayIndex) => {
                    // find day in this week with matching weekday
                    const day = week.find((d) => d.getDay() === dayIndex);
                    // If day is outside the 1-year range, show blank
                    if (!day) {
                      return <div key={dayIndex} className="heat-cell" style={{ backgroundColor: heatColors[0] }} />;
                    }
                    // Only show color for dates within the last 365 days (we built weeks starting before oneYearAgo)
                    const key = day.toISOString().slice(0, 10);
                    const cnt = submissionMap[key] || 0;
                    const intensity = Math.min(cnt, heatColors.length - 1);
                    const color = intensity ? heatColors[intensity] : heatColors[0];
                    return (
                      <div
                        key={dayIndex}
                        className="heat-cell"
                        title={cnt ? `${cnt} submission${cnt > 1 ? "s" : ""} on ${key}` : ""}
                        style={{ backgroundColor: color }}
                      />
                    );
                  })}
                </div>
              ))}
            </div>

            {/* months row aligned under each week column (one label per week) */}
            <div className="heat-months" aria-hidden>
              {monthLabels.map((label, idx) => (
                <div key={idx} className="month-label">
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {loading && <div className="leetcode-loading">Loading LeetCode stats...</div>}
    </section>
  );
};

export default LeetCode;
