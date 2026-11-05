import { useNavigate } from 'react-router-dom'
import { useAudio } from './useAudio'

export default function BackToMenu() {
  const navigate = useNavigate()
  const { playCancel } = useAudio()

  const returnToMenu = () => {
    playCancel()
    navigate('/menu')
  }

  return (
    <button
      className="back-to-menu"
      type="button"
      aria-label="Retourner au menu principal"
      title="Retour au menu principal"
      onClick={returnToMenu}
    >
      <span aria-hidden="true">←</span>
      <style>{`
        .back-to-menu {
          position: fixed;
          z-index: 2100;
          top: 16px;
          left: 18px;
          display: grid;
          place-items: center;
          width: 40px;
          height: 40px;
          padding: 0;
          border: 1px solid rgba(125, 239, 255, .8);
          background: rgba(4, 17, 47, .9);
          color: #fff;
          clip-path: polygon(0 0, 100% 0, 100% 75%, 75% 100%, 0 100%);
          font: 28px/1 sans-serif;
          cursor: pointer;
          transition: color .18s ease, background .18s ease, transform .18s ease;
        }
        .back-to-menu:hover, .back-to-menu:focus-visible {
          transform: translateX(-3px);
          background: #22d7ee;
          color: #071321;
          outline: 2px solid #fff;
          outline-offset: 2px;
        }
        @media (max-width: 600px) {
          .back-to-menu { top: 10px; left: 12px; width: 36px; height: 36px; }
        }
      `}</style>
    </button>
  )
}