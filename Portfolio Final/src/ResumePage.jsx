import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGamepad } from "./useGamepad";
import { useAudio } from "./useAudio";
import BackToMenu from "./BackToMenu";

const ITEMS = [
  { id: "i", badge: "I", title: "FORMATION", subtitle: "Baccalauréat · BTS SIO SLAM", rank: 1 },
  { id: "ii", badge: "II", title: "COMPÉTENCES", subtitle: "Web · Bases de données", rank: 2 },
  { id: "iii", badge: "III", title: "PROJETS", subtitle: "Sites · Gestion de données", rank: 3 },
  { id: "iv", badge: "IV", title: "EXPÉRIENCE", subtitle: "Stage développeur web", rank: 4 },
];

const EDUCATION_ROWS = [
  { index: "01", title: "Baccalauréat général", status: "2025" },
  { index: "02", title: "BTS SIO · option SLAM", status: "En cours" },
];

const SKILLS_ROWS = [
  { index: "01", title: "Développement web", status: "PHP · HTML · CSS" },
  { index: "02", title: "Frameworks", status: "Symfony · React" },
  { index: "03", title: "Bases de données", status: "SQL · PL/SQL" },
];

const EXPERIENCE_ROWS = [
  { index: "01", title: "Stage Vitinfo25", status: "2026" },
  { index: "02", title: "Site Immersen", status: "Web vitrine" },
  { index: "03", title: "Refonte Vitinfo25", status: "Webnode" },
];

export default function ResumePage({ src }) {
  const navigate = useNavigate();
  const [active, setActive] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const { playHover, playConfirm, playCancel } = useAudio();

  const handleKey = useCallback((e) => {
    // FIX: Cegah backspace trigger pas Ctrl+A atau modifier keys lain aktif
    if (e.ctrlKey || e.altKey || e.metaKey) return;

    if (e.key === "ArrowUp" || e.key === "LB") { playHover(); setActive((i) => Math.max(0, i - 1)); }
    if (e.key === "ArrowDown" || e.key === "RB") { playHover(); setActive((i) => Math.min(ITEMS.length - 1, i + 1)); }
    if (e.key === "Enter") playConfirm();
    if (e.key === "ArrowLeft" || e.key === "Escape" || e.key === "Backspace") {
      playCancel();
      navigate("/menu");
    }
  }, [navigate, playCancel, playConfirm, playHover]);

  useGamepad(handleKey);

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  return (
    <div id="menu-screen">
      <video src={src} autoPlay loop muted playsInline />
      <BackToMenu />
      <div className="resume-entry-mask" aria-hidden="true">
        <video className="resume-entry-video" src={src} autoPlay loop muted playsInline />
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&display=swap');

        .resume-entry-mask {
          position: absolute;
          inset: 0;
          z-index: 9;
          overflow: hidden;
          background: #0047FF;
          clip-path: circle(0 at 50% 50%);
          animation: resume-entry-reveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          pointer-events: none;
        }

        .resume-entry-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        @keyframes resume-entry-reveal {
          from { clip-path: circle(0 at 50% 50%); }
          to { clip-path: circle(150vmax at 50% 50%); }
        }

        .resume-overlay {
          position: absolute;
          inset: 0;
          z-index: 10;
          pointer-events: none;
        }

        .resume-stack {
          position: absolute;
          top: 9vh;
          left: 2.8vw;
          width: min(47vw, 720px);
          display: flex;
          flex-direction: column;
          gap: 10px;
          pointer-events: none;
          transform: scale(0.9);
          transform-origin: top left;
        }

        .resume-list-tag {
          font-family: 'Anton', sans-serif;
          font-size: 92px;
          line-height: 0.9;
          color: #f6fbff;
          letter-spacing: 2px;
          margin: 0 0 6px 12px;
          text-shadow: 0 2px 0 rgba(0,0,0,0.18);
          opacity: 0;
          transform: translateX(-24px);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .resume-list-tag.mounted {
          opacity: 1;
          transform: translateX(0);
        }

        .resume-card-wrap {
          position: relative;
          opacity: 0;
          transform: translateX(-48px);
          transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: all;
          cursor: pointer;
        }
        .resume-card-wrap.mounted {
          opacity: 1;
          transform: translateX(0);
        }

        .resume-card {
          position: relative;
          height: 112px;
          background: #10185f;
          clip-path: polygon(0 0, 97% 0, 100% 100%, 3% 100%);
          box-shadow: 0 8px 0 rgba(5, 13, 59, 0.85);
          transition: transform 0.22s ease, background 0.22s ease, box-shadow 0.22s ease;
          overflow: visible;
        }
        .resume-card-wrap.active .resume-card {
          background: #ffffff;
          box-shadow: 10px 8px 0 #d63232;
          transform: translateX(6px);
        }

        .resume-card-inner {
          position: absolute;
          inset: 0;
          padding: 14px 22px 14px 62px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }

        .resume-badge {
          position: absolute;
          top: 10px;
          left: -10px;
          width: 56px;
          height: 70px;
          background: #0b113d;
          border: 3px solid #9cf7ff;
          clip-path: polygon(14% 0, 100% 0, 84% 100%, 0 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          transform: rotate(-8deg);
          box-shadow: 0 4px 0 rgba(0,0,0,0.28);
          transition: background 0.22s ease, border-color 0.22s ease;
        }
        .resume-badge-text {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 36px;
          color: #d2fdff;
          letter-spacing: 1px;
          transform: rotate(8deg);
        }
        .resume-card-wrap.active .resume-badge {
          background: #000;
          border-color: #000;
        }
        .resume-card-wrap.active .resume-badge-text {
          color: #fff;
        }

        .resume-title {
          font-family: 'Anton', sans-serif;
          font-size: 56px;
          line-height: 0.9;
          letter-spacing: 1px;
          color: #a5f6ff;
          transition: color 0.22s ease;
        }
        .resume-card-wrap.active .resume-title {
          color: #000;
        }

        .resume-rank {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 2px;
          flex-shrink: 0;
        }
        .resume-rank-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          letter-spacing: 2px;
          color: #9ffbff;
          transition: color 0.22s ease;
        }
        .resume-rank-number {
          font-family: 'Anton', sans-serif;
          font-size: 70px;
          line-height: 0.82;
          color: #9ffbff;
          transition: color 0.22s ease;
        }
        .resume-card-wrap.active .resume-rank-label,
        .resume-card-wrap.active .resume-rank-number {
          color: #000;
        }

        .resume-subtitle-bar {
          position: absolute;
          left: 64px;
          right: 14px;
          bottom: 12px;
          height: 34px;
          background: #85f4ff;
          clip-path: polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
          display: flex;
          align-items: center;
          padding: 0 18px;
          transition: background 0.22s ease;
        }
        .resume-card-wrap.active .resume-subtitle-bar {
          background: #000;
        }

        .resume-subtitle {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          line-height: 1;
          letter-spacing: 1px;
          color: #041238;
          transition: color 0.22s ease;
        }
        .resume-card-wrap.active .resume-subtitle {
          color: #fff;
        }

        .resume-detail-panel {
          position: absolute;
          top: 9.5vh;
          right: 4.5vw;
          width: min(39vw, 620px);
          min-height: 74vh;
          z-index: 12;
          padding: 22px 24px 24px 24px;
          background: linear-gradient(180deg, rgba(15, 28, 105, 0.96) 0%, rgba(8, 16, 68, 0.97) 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%);
          box-shadow:
            inset 0 0 0 1px rgba(133, 244, 255, 0.16),
            16px 16px 0 rgba(0, 6, 30, 0.55);
          overflow: hidden;
        }
        .resume-detail-panel::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(135deg, rgba(133, 244, 255, 0.08) 0 15%, transparent 15% 100%),
            linear-gradient(180deg, rgba(255,255,255,0.05), transparent 24%);
          pointer-events: none;
        }
        .resume-detail-top {
          position: relative;
          display: grid;
          grid-template-columns: 70px 1fr auto;
          align-items: center;
          gap: 14px;
          min-height: 92px;
          padding: 0 18px;
          background: linear-gradient(90deg, #8ef5ff 0%, #d3fdff 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          color: #08153f;
          box-shadow: 10px 0 0 rgba(255, 94, 136, 0.88);
        }
        .resume-detail-top-index {
          font-family: 'Anton', sans-serif;
          font-size: 46px;
          line-height: 1;
        }
        .resume-detail-top-title {
          font-family: 'Anton', sans-serif;
          font-size: 42px;
          line-height: 0.92;
          letter-spacing: 1px;
        }
        .resume-detail-top-progress {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 42px;
          letter-spacing: 2px;
          line-height: 1;
        }
        .resume-detail-list {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 18px;
        }
        .resume-detail-row {
          display: grid;
          grid-template-columns: 50px 1fr auto;
          align-items: center;
          gap: 14px;
          min-height: 56px;
          padding: 0 14px;
          background: rgba(8, 18, 72, 0.96);
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(140, 239, 255, 0.12);
          transition: transform 0.16s ease, background 0.16s ease;
        }
        .resume-detail-row:hover {
          transform: translateX(4px);
          background: rgba(12, 26, 94, 1);
        }
        .resume-detail-row-index {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 26px;
          letter-spacing: 1px;
          color: #94f4ff;
        }
        .resume-detail-row-title {
          font-family: 'Anton', sans-serif;
          font-size: 28px;
          line-height: 1;
          color: #f2fcff;
        }
        .resume-detail-status {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          line-height: 1;
          letter-spacing: 1.1px;
          color: #06133b;
          background: #8df6ff;
          padding: 7px 12px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
        }
        .resume-detail-bottom {
          position: relative;
          margin-top: 22px;
          padding: 18px;
          background: rgba(5, 13, 57, 0.97);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(145, 239, 255, 0.12);
        }
        .resume-detail-bottom-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 30px;
          letter-spacing: 2px;
          color: #91f5ff;
          margin-bottom: 14px;
        }
        .resume-detail-bullets {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .resume-detail-bullet {
          font-family: 'Anton', sans-serif;
          font-size: 21px;
          line-height: 1.15;
          color: #edfaff;
        }

        @media (max-width: 760px) {
          .resume-stack { top: 64px; left: 4vw; width: 92vw; gap: 4px; transform: none; }
          .resume-list-tag { margin: 0 0 2px 6px; font-size: 32px; }
          .resume-card { height: 47px; }
          .resume-card-inner { padding: 5px 10px 5px 42px; align-items: center; }
          .resume-title { font-size: 24px; }
          .resume-rank { gap: 4px; margin: 0; }
          .resume-rank-label { font-size: 16px; }
          .resume-rank-number { font-size: 36px; }
          .resume-badge { top: 4px; left: -4px; width: 38px; height: 39px; }
          .resume-badge-text { font-size: 22px; }
          .resume-subtitle-bar { left: 42px; right: 8px; bottom: 4px; height: 18px; padding: 0 8px; }
          .resume-subtitle { font-size: 16px; }
          .resume-detail-panel { top: calc(64px + 235px + 12px); right: 3vw; bottom: 64px; width: 94vw; min-height: 0; height: auto; padding: 12px; overflow-y: auto; }
          .resume-detail-top { grid-template-columns: 30px 1fr auto; gap: 8px; min-height: 56px; padding: 0 8px; }
          .resume-detail-top-index { font-size: 26px; }
          .resume-detail-top-title { font-size: 21px; }
          .resume-detail-top-progress { font-size: 26px; }
          .resume-detail-list { gap: 6px; margin-top: 12px; }
          .resume-detail-row { grid-template-columns: 26px 1fr auto; gap: 8px; min-height: 44px; padding: 0 8px; }
          .resume-detail-row-index { font-size: 20px; }
          .resume-detail-row-title { font-size: 17px; }
          .resume-detail-status { padding: 4px 6px; font-size: 14px; }
          .resume-detail-bottom { margin-top: 12px; padding: 12px; }
          .resume-detail-bottom-title { margin-bottom: 8px; font-size: 22px; }
          .resume-detail-bullets { gap: 7px; }
          .resume-detail-bullet { font-size: 15px; }
        }

        @media (max-height: 620px) and (max-width: 760px) {
          .resume-stack { top: 60px; gap: 2px; }
          .resume-list-tag { font-size: 24px; }
          .resume-card { height: 40px; }
          .resume-card-inner { padding-block: 3px; }
          .resume-title { font-size: 20px; }
          .resume-badge { width: 32px; height: 34px; }
          .resume-badge-text { font-size: 19px; }
          .resume-subtitle-bar { left: 36px; height: 16px; }
          .resume-subtitle { font-size: 14px; }
          .resume-detail-panel { top: calc(60px + 194px + 10px); bottom: 64px; height: auto; }
        }

      `}</style>

      <div className="resume-overlay">
        <div className="resume-stack">
          <div className={`resume-list-tag${mounted ? " mounted" : ""}`}>PARCOURS</div>
          {ITEMS.map((item, index) => (
            <div
              key={item.id}
              className={`resume-card-wrap${active === index ? " active" : ""}${mounted ? " mounted" : ""}`}
              style={{ transitionDelay: `${index * 55}ms` }}
              onMouseEnter={() => {
                setActive(index);
              }}
              onClick={() => {
                setActive(index);
              }}
            >
              <div className="resume-card">
                <div className="resume-badge">
                  <div className="resume-badge-text">{item.badge}</div>
                </div>
                <div className="resume-card-inner">
                  <div className="resume-title">{item.title}</div>
                  <div className="resume-rank">
                    <div className="resume-rank-label">N°</div>
                    <div className="resume-rank-number">{item.rank}</div>
                  </div>
                </div>
                <div className="resume-subtitle-bar">
                  <div className="resume-subtitle">{item.subtitle}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {active === 0 && (
          <div className="resume-detail-panel">
            <div className="resume-detail-top">
              <div className="resume-detail-top-index">01</div>
              <div className="resume-detail-top-title">FORMATION</div>
              <div className="resume-detail-top-progress">2/2</div>
            </div>

            <div className="resume-detail-list">
              {EDUCATION_ROWS.map((row) => (
                <div className="resume-detail-row" key={row.index}>
                  <div className="resume-detail-row-index">{row.index}</div>
                  <div className="resume-detail-row-title">{row.title}</div>
                  <div className="resume-detail-status">{row.status}</div>
                </div>
              ))}
            </div>

            <div className="resume-detail-bottom">
              <div className="resume-detail-bottom-title">DÉTAILS</div>
              <div className="resume-detail-bullets">
                <div className="resume-detail-bullet">- Baccalauréat général obtenu au lycée Louis Pergaud à Besançon.</div>
                <div className="resume-detail-bullet">- Mention assez bien, spécialités mathématiques et NSI.</div>
                <div className="resume-detail-bullet">- BTS SIO, option SLAM, au lycée Louis Pergaud.</div>
              </div>
            </div>
          </div>
        )}

        {active === 1 && (
          <div className="resume-detail-panel">
            <div className="resume-detail-top">
              <div className="resume-detail-top-index">02</div>
              <div className="resume-detail-top-title">COMPÉTENCES</div>
              <div className="resume-detail-top-progress">3/3</div>
            </div>

            <div className="resume-detail-list">
              {SKILLS_ROWS.map((row) => (
                <div className="resume-detail-row" key={row.index}>
                  <div className="resume-detail-row-index">{row.index}</div>
                  <div className="resume-detail-row-title">{row.title}</div>
                  <div className="resume-detail-status">{row.status}</div>
                </div>
              ))}
            </div>

            <div className="resume-detail-bottom">
              <div className="resume-detail-bottom-title">DÉTAILS</div>
              <div className="resume-detail-bullets">
                <div className="resume-detail-bullet">- Web : PHP 8, HTML5, CSS3, JavaScript et Bootstrap.</div>
                <div className="resume-detail-bullet">- Frameworks : Symfony 6, Twig, Doctrine, React et React Native.</div>
                <div className="resume-detail-bullet">- Données : SQL, PL/SQL, MySQL, MariaDB et SQL Server.</div>
                <div className="resume-detail-bullet">- Cybersécurité appliquée au développement web et outils bureautiques.</div>
              </div>
            </div>
          </div>
        )}

        {active === 2 && (
          <div className="resume-detail-panel">
            <div className="resume-detail-top">
              <div className="resume-detail-top-index">03</div>
              <div className="resume-detail-top-title">PROJETS</div>
              <div className="resume-detail-top-progress">3/3</div>
            </div>

            <div className="resume-detail-list">
              <div className="resume-detail-row">
                <div className="resume-detail-row-index">01</div>
                <div className="resume-detail-row-title">Site vitrine Sonoris</div>
                <div className="resume-detail-status">Web</div>
              </div>
              <div className="resume-detail-row">
                <div className="resume-detail-row-index">02</div>
                <div className="resume-detail-row-title">Gestionnaire de films</div>
                <div className="resume-detail-status">SQL</div>
              </div>
              <div className="resume-detail-row">
                <div className="resume-detail-row-index">03</div>
                <div className="resume-detail-row-title">Portfolio Persona 3</div>
                <div className="resume-detail-status">React</div>
              </div>
            </div>

            <div className="resume-detail-bottom">
              <div className="resume-detail-bottom-title">DÉTAILS</div>
              <div className="resume-detail-bullets">
                <div className="resume-detail-bullet">- Site vitrine présentant une entreprise de matériel musical.</div>
                <div className="resume-detail-bullet">- Application web pour organiser un catalogue de films.</div>
                <div className="resume-detail-bullet">- Portfolio interactif inspiré de Persona 3 Reload.</div>
              </div>
            </div>
          </div>
        )}

        {active === 3 && (
          <div className="resume-detail-panel">
            <div className="resume-detail-top">
              <div className="resume-detail-top-index">04</div>
              <div className="resume-detail-top-title">EXPÉRIENCE</div>
              <div className="resume-detail-top-progress">3/3</div>
            </div>

            <div className="resume-detail-list">
              {EXPERIENCE_ROWS.map((row) => (
                <div className="resume-detail-row" key={row.index}>
                  <div className="resume-detail-row-index">{row.index}</div>
                  <div className="resume-detail-row-title">{row.title}</div>
                  <div className="resume-detail-status">{row.status}</div>
                </div>
              ))}
            </div>

            <div className="resume-detail-bottom">
              <div className="resume-detail-bottom-title">DÉTAILS</div>
              <div className="resume-detail-bullets">
                <div className="resume-detail-bullet">- Stage développeur web chez Vitinfo25, à Besançon.</div>
                <div className="resume-detail-bullet">- Création du site vitrine Immersen et vérification mobile.</div>
                <div className="resume-detail-bullet">- Refonte de la page d’accueil Vitinfo25 avec Webnode.</div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
