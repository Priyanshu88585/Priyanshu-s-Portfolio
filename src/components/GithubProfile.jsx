// src/components/GithubProfile.jsx
import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import "../styles/github.css"; // styles for this component

// default username can be overridden via prop
const GithubProfile = ({ username = "Priyanshu88585", repoCount = 30 }) => {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingRepos, setLoadingRepos] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchProfile() {
      setLoadingProfile(true);
      setError(null);
      try {
        const res = await fetch(`https://api.github.com/users/${username}`);
        if (!res.ok) throw new Error(`Profile fetch failed: ${res.status}`);
        const data = await res.json();
        if (isMounted) setProfile(data);
      } catch (err) {
        console.error(err);
        if (isMounted) setError(err);
      } finally {
        if (isMounted) setLoadingProfile(false);
      }
    }

    async function fetchRepos() {
      setLoadingRepos(true);
      setError(null);
      try {
        // fetch repos sorted by updated desc (latest active first)
        const res = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=${repoCount}&sort=updated`
        );
        if (!res.ok) throw new Error(`Repos fetch failed: ${res.status}`);
        const data = await res.json();
        if (isMounted) {
          // filter out forks optionally, or keep forks — here we keep them
          setRepos(data);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) setError(err);
      } finally {
        if (isMounted) setLoadingRepos(false);
      }
    }

    fetchProfile();
    fetchRepos();

    return () => {
      isMounted = false;
    };
  }, [username, repoCount]);

  // derived language summary
  const languageSummary = useMemo(() => {
    const map = {};
    for (const r of repos || []) {
      if (!r || !r.language) continue;
      map[r.language] = (map[r.language] || 0) + 1;
    }
    // sort descending
    const arr = Object.entries(map).sort((a, b) => b[1] - a[1]);
    return arr;
  }, [repos]);

  // UI helpers
  const loading = loadingProfile || loadingRepos;

  return (
    <section id="github" className="container" style={{ paddingTop: 24, paddingBottom: 24 }}>
      <h2 className="h2">GitHub</h2>

      <div className="github-top-row">
        <motion.div
          className="github-card profile-card"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          {loadingProfile ? (
            <div className="github-loading">Loading profile…</div>
          ) : error ? (
            <div className="github-error">Unable to load GitHub profile.</div>
          ) : (
            <>
              <div className="profile-left">
                <img src={profile.avatar_url} alt={profile.login} className="gh-avatar" />
              </div>

              <div className="profile-mid">
                <div className="gh-name">{profile.name || profile.login}</div>
                <div className="gh-username">@{profile.login}</div>
                {profile.bio && <div className="gh-bio">{profile.bio}</div>}
                <div className="gh-stats">
                  <div><strong>{profile.public_repos}</strong><div className="muted">Repos</div></div>
                  <div><strong>{profile.followers}</strong><div className="muted">Followers</div></div>
                  <div><strong>{profile.following}</strong><div className="muted">Following</div></div>
                </div>
                <div style={{ marginTop: 8 }}>
                  {profile.location && <span className="muted mr-8">📍 {profile.location}</span>}
                  {profile.blog && (
                    <a href={profile.blog.startsWith("http") ? profile.blog : `https://${profile.blog}`} target="_blank" rel="noreferrer" className="muted">
                      🔗 Website
                    </a>
                  )}
                </div>
              </div>

              <div className="profile-right">
                <a href={profile.html_url} target="_blank" rel="noreferrer" className="btn-outline">
                  View on GitHub →
                </a>
              </div>
            </>
          )}
        </motion.div>

        {/* small stats / languages summary */}
        <motion.div
          className="github-card stats-card"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="stats-grid">
            <div className="stat">
              <div className="stat-num">{repos.length}</div>
              <div className="stat-label">Live repos shown</div>
            </div>
            <div className="stat">
              <div className="stat-num">{languageSummary.length}</div>
              <div className="stat-label">Languages</div>
            </div>
            <div className="stat">
              <div className="stat-num">{profile ? profile.public_gists : "—"}</div>
              <div className="stat-label">Gists</div>
            </div>
          </div>

          <div style={{ marginTop: 10 }}>
            <div className="muted">Top languages</div>
            <div className="lang-list">
              {languageSummary.slice(0, 5).map(([lang, cnt]) => (
                <div key={lang} className="lang-pill">{lang} <span className="muted">· {cnt}</span></div>
              ))}
              {!languageSummary.length && <div className="muted">No languages detected</div>}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Repos grid */}
      <div className="repos-section">
        <div className="repos-header">
          <h3 className="h3">Repositories</h3>
          <div className="muted">Live list from GitHub (sorted by recent activity)</div>
        </div>

        {loadingRepos ? (
          <div className="github-loading">Loading repositories…</div>
        ) : error ? (
          <div className="github-error">Unable to load repositories.</div>
        ) : (
          <div className="repos-grid">
            {repos.map((r) => (
              <motion.a
                key={r.id}
                href={r.html_url}
                target="_blank"
                rel="noreferrer"
                className="repo-card card"
                whileHover={{ translateY: -6 }}
                transition={{ duration: 0.18 }}
              >
                <div className="repo-top">
                  <div className="repo-name">{r.name}</div>
                  <div className="repo-meta">
                    {r.private ? <span className="repo-badge">private</span> : null}
                    {r.fork && <span className="repo-badge muted">fork</span>}
                  </div>
                </div>

                <div className="repo-desc">{r.description || <span className="muted">No description</span>}</div>

                <div className="repo-bottom">
                  <div className="repo-left">
                    {r.language && <span className="lang-pill small">{r.language}</span>}
                    <span className="muted">★ {r.stargazers_count}</span>
                    <span className="muted">⎇ {r.forks_count}</span>
                  </div>
                  <div className="muted repo-updated">Updated: {new Date(r.updated_at).toLocaleDateString()}</div>
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </div>

      {loading && <div style={{ marginTop: 12 }} className="muted">Refreshing data periodically…</div>}
    </section>
  );
};

export default GithubProfile;
