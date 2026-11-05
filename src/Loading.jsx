import { useNavigate } from "react-router-dom";
import initBg from "./assets/InitBG.jpg";
import { useAudio } from "./useAudio";

export default function Loading() {
  const navigate = useNavigate();
  const { ensureBGM, playConfirm } = useAudio();

  const enterPortfolio = () => {
    ensureBGM();
    playConfirm();
    navigate("/menu");
  };

  return (
    <main className="entry-screen" style={{ backgroundImage: `url(${initBg})` }}>
      <div className="entry-content">
        <p className="entry-eyebrow">PORTFOLIO</p>
        <h1>Corentin Bulle</h1>
        <button className="entry-button" type="button" onClick={enterPortfolio}>
          ENTRER AVEC LA MUSIQUE <span aria-hidden="true">↗</span>
        </button>
      </div>
      <style>{`
        .entry-screen {
          position: fixed;
          inset: 0;
          z-index: 100;
          display: grid;
          place-items: center;
          padding: 24px;
          background-color: #071321;
          background-position: center;
          background-size: cover;
          isolation: isolate;
          color: #fff;
        }
        .entry-screen::before {
          position: absolute;
          z-index: -1;
          inset: 0;
          content: '';
          background: linear-gradient(110deg, rgba(2, 9, 24, .88), rgba(4, 25, 68, .38));
        }
        .entry-content {
          width: min(760px, 100%);
          padding: clamp(24px, 6vw, 64px);
          border-left: 6px solid #22d7ee;
          background: rgba(4, 17, 47, .82);
          box-shadow: 14px 14px 0 rgba(0, 0, 0, 0.35);
          animation: entry-rise .6s cubic-bezier(.22, 1, .36, 1) both;
        }
        .entry-eyebrow {
          margin: 0 0 10px;
          color: #7defff;
          font: 18px 'Bebas Neue', sans-serif;
          letter-spacing: 3px;
        }
        .entry-content h1 {
          margin: 0 0 32px;
          color: #fff;
          font: italic clamp(44px, 9vw, 92px)/.95 Anton, sans-serif;
          text-transform: uppercase;
        }
        .entry-button {
          display: inline-flex;
          align-items: center;
          gap: 18px;
          min-height: 54px;
          padding: 12px 22px;
          border: 0;
          background: #d7193f;
          color: #fff;
          clip-path: polygon(0 0, 100% 0, calc(100% - 13px) 100%, 0 100%);
          font: 22px 'Anton', sans-serif;
          cursor: pointer;
          transition: background .18s ease, transform .18s ease;
        }
        .entry-button:hover, .entry-button:focus-visible {
          background: #22d7ee;
          color: #071321;
          transform: translateX(5px);
          outline: 2px solid #fff;
          outline-offset: 3px;
        }
        @keyframes entry-rise {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 520px) {
          .entry-content { padding: 26px 20px; }
          .entry-button { font-size: 17px; }
        }
      `}</style>
    </main>
  );
}
