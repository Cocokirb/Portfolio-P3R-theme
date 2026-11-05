import React, { useEffect, useRef, useState } from "react";
import { AudioContext } from "./audioContext";
import bgmFile from "./assets/lobby.mp3";
import selectFile from "./assets/sellect.mp3";
import backFile from "./assets/back.mp3";
import odtFile from "./assets/odt.mp3";
import cdtFile from "./assets/cdt.mp3";
import ndtFile from "./assets/ndt.mp3";

export function AudioProvider({ children }) {
  const bgmRef = useRef(null);
  const musicVolumeRef = useRef(0.3);
  const [musicVolume, setMusicVolume] = useState(0.3);
  const effectsVolumeRef = useRef(0.2);
  const [effectsVolume, setEffectsVolume] = useState(0.2);
  const hoverRef = useRef();
  const confirmRef = useRef();
  const cancelRef = useRef();
  const odtRef = useRef();
  const cdtRef = useRef();

  useEffect(() => {
    hoverRef.current = new Audio(ndtFile);
    confirmRef.current = new Audio(selectFile);
    cancelRef.current = new Audio(backFile);
    odtRef.current = new Audio(odtFile);
    cdtRef.current = new Audio(cdtFile);

    // Untuk memastikan BGM loop yang stabil
    if (bgmRef.current) {
      bgmRef.current.volume = musicVolumeRef.current;
    }
  }, []);

  const ensureBGM = () => {
    if (bgmRef.current && bgmRef.current.paused) {
      bgmRef.current.play().catch(() => {
        // Ignored
      });
    }
  };

  const updateMusicVolume = (event) => {
    const volume = Number(event.target.value);
    musicVolumeRef.current = volume;
    setMusicVolume(volume);
    if (bgmRef.current) bgmRef.current.volume = volume;
  };

  const updateEffectsVolume = (event) => {
    const volume = Number(event.target.value);
    effectsVolumeRef.current = volume;
    setEffectsVolume(volume);
  };

  const playHover = () => {
    if (hoverRef.current) {
      hoverRef.current.currentTime = 0;
      hoverRef.current.volume = effectsVolumeRef.current;
      hoverRef.current.play().catch(() => {});
      ensureBGM();
    }
  };

  const playConfirm = () => {
    if (confirmRef.current) {
      confirmRef.current.currentTime = 0;
      confirmRef.current.volume = effectsVolumeRef.current;
      confirmRef.current.play().catch(() => {});
      ensureBGM();
    }
  };

  const playCancel = () => {
    if (cancelRef.current) {
      cancelRef.current.currentTime = 0;
      cancelRef.current.volume = effectsVolumeRef.current;
      cancelRef.current.play().catch(() => {});
      ensureBGM();
    }
  };

  const playOpenDetail = () => {
    if (odtRef.current) {
      odtRef.current.currentTime = 0;
      odtRef.current.volume = effectsVolumeRef.current;
      odtRef.current.play().catch(() => {});
      ensureBGM();
    }
  };

  const playCloseDetail = () => {
    if (cdtRef.current) {
      cdtRef.current.currentTime = 0;
      cdtRef.current.volume = effectsVolumeRef.current;
      cdtRef.current.play().catch(() => {});
      ensureBGM();
    }
  };

  return (
    <AudioContext.Provider value={{
      playHover, playConfirm, playCancel,
      playOpenDetail, playCloseDetail,
      ensureBGM,
      musicVolume, effectsVolume,
      updateMusicVolume, updateEffectsVolume
    }}>
      <audio ref={bgmRef} src={bgmFile} loop preload="none" />
      <div className="sound-controls" role="group" aria-label="Réglages audio">
        <label className="volume-control">
          <span>MUSIQUE</span>
          <input
            aria-label="Volume de la musique"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={musicVolume}
            onChange={updateMusicVolume}
          />
          <output>{Math.round(musicVolume * 100)}%</output>
        </label>
        <label className="volume-control">
          <span>EFFETS</span>
          <input
            aria-label="Volume des effets sonores"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={effectsVolume}
            onChange={updateEffectsVolume}
          />
          <output>{Math.round(effectsVolume * 100)}%</output>
        </label>
      </div>
      <style>{`
        .sound-controls {
          position: fixed;
          z-index: 2000;
          left: 22px;
          bottom: 22px;
          display: flex;
          flex-direction: column;
          gap: 7px;
          width: min(230px, calc(100vw - 24px));
          padding: 0;
          background: transparent;
        }
        .volume-control {
          display: grid;
          grid-template-columns: 58px minmax(60px, 1fr) 34px;
          align-items: center;
          gap: 7px;
          color: #e7fbff;
          font: 13px 'Anton', sans-serif;
          letter-spacing: 1px;
        }
        .volume-control input {
          width: 100%;
          height: 18px;
          margin: 0;
          accent-color: #22d7ee;
          cursor: pointer;
        }
        .volume-control output {
          color: #7defff;
          font: 12px 'Bebas Neue', sans-serif;
          text-align: right;
        }
        @media (max-width: 600px) {
          .sound-controls { left: 12px; bottom: 12px; gap: 5px; }
          .volume-control { grid-template-columns: 52px minmax(60px, 1fr) 30px; font-size: 12px; }
        }
      `}</style>
      {children}
    </AudioContext.Provider>
  );
}
