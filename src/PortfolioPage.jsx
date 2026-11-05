import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAudio } from './useAudio'
import { useGamepad } from './useGamepad'
import BackToMenu from './BackToMenu'
import background from './assets/main1.mp4'
import anssiLogo from './assets/logo_anssi.png'
import cnilLogo from './assets/cnil_logo-large-370x95.png'
import pixLogo from './assets/Pix_logo.svg.png'
import pixCertificate from './assets/certification-pix-20250218.pdf'
import persona3 from './assets/P3R.jpg'
import persona5 from './assets/P5R all caracter.png'
import sao from './assets/sao.jpg'
import reZeroSeason4 from './assets/affiche s4 Re zero.png'
import chainsawMan from './assets/CM-cover1.jpg'

const PAGES = {
  projects: {
    title: 'Mes projets',
    eyebrow: 'PORTFOLIO / SÉLECTION',
    intro: 'Des réalisations web autour de la présentation d’une entreprise, de la gestion de données et de la création graphique.',
    cards: [
      {
        category: 'SITE VITRINE',
        title: 'Sonoris — matériel de musique',
        description: 'Création d’un site vitrine pour présenter une entreprise spécialisée dans la vente de matériel de musique et mettre en valeur son offre.',
        tags: ['Web', 'Présentation'],
      },
      {
        category: 'APPLICATION WEB · BASE DE DONNÉES',
        title: 'Gestionnaire de films',
        description: 'Application de gestion de films connectée à une base de données pour centraliser et organiser un catalogue.',
        tags: ['PHP', 'SQL', 'Données'],
      },
      {
        category: 'IDENTITÉ GRAPHIQUE',
        title: 'Portfolio Persona 3 Reload',
        description: 'Portfolio interactif inspiré de Persona 3 Reload, avec une navigation animée et une direction artistique dédiée.',
      },
    ],
  },
  experience: {
    title: 'Expérience professionnelle',
    eyebrow: 'PARCOURS / STAGE',
    intro: 'Stage de première année de BTS SIO effectué à Besançon du 26 mai au 26 juin 2026.',
    cards: [
      {
        category: 'VITINFO25 · BESANÇON',
        title: 'Stage développeur web',
        description: 'En binôme avec le responsable de l’entreprise, j’ai pris en charge le développement des sites à partir des besoins et retours du client.',
        tags: ['26.05 — 26.06.2026', 'HTML', 'CSS', 'JavaScript'],
      },
      {
        category: 'PROJET CLIENT',
        title: 'Site vitrine Immersen',
        description: 'Définition de la structure, création de maquettes, puis réalisation des pages d’accueil, offres, services, à propos et contact. Vérification de l’affichage mobile.',
        tags: ['Maquettes', 'Responsive', 'Dolby Atmos'],
      },
      {
        category: 'REFONTE WEBNODE',
        title: 'Site Vitinfo25',
        description: 'Mise à jour des offres et contenus, modernisation de la page d’accueil, intégration d’icônes et préparation d’un widget d’avis Google.',
        tags: ['Webnode', 'Intégration', 'Relation client'],
      },
    ],
  },
  passions: {
    title: 'Mes passions',
    eyebrow: 'HORS ÉCRAN / MES UNIVERS',
    intro: 'Jeux vidéo, animés, lecture et mangas : quelques univers que j’aime retrouver et explorer.',
    cards: [
      {
        category: 'JEUX VIDÉO',
        title: 'Persona',
        description: 'J’aime les RPG au tour par tour, où chaque combat demande réflexion. La licence Persona fait partie de mes préférées.',
        image: persona3,
        imageAlt: 'Visuel de Persona 3 Reload',
        secondImage: persona5,
        secondImageAlt: 'Personnages de Persona 5 Royal',
      },
      {
        category: 'ANIMÉS',
        title: 'Sword Art Online · Re:Zero',
        description: 'Sword Art Online est mon animé préféré. J’apprécie aussi l’univers de Re:Zero, et j’attends avec impatience sa quatrième saison.',
        image: sao,
        imageAlt: 'Visuel de Sword Art Online',
        secondImage: reZeroSeason4,
        secondImageAlt: 'Affiche de la saison 4 de Re:Zero',
      },
      {
        category: 'LECTURE · MANGAS',
        title: 'Chainsaw Man',
        description: 'J’aime découvrir des univers originaux et leur complexité. Chainsaw Man m’a particulièrement marqué.',
        image: chainsawMan,
        imageAlt: 'Couverture de Chainsaw Man',
      },
    ],
  },
  certifications: {
    title: 'Mes certifications',
    eyebrow: 'VALIDATION / COMPÉTENCES',
    intro: 'Certifications et attestations déjà présentées dans mon portfolio.',
    cards: [
      {
        category: 'CYBERSÉCURITÉ',
        title: 'ANSSI',
        description: 'Certification associée à SecNumacadémie.',
        image: anssiLogo,
        imageAlt: 'Logo de l’ANSSI',
        href: 'https://secnumacademie.gouv.fr/',
        linkLabel: 'Consulter SecNumacadémie',
      },
      {
        category: 'DONNÉES PERSONNELLES',
        title: 'CNIL',
        description: 'Ressources et formation autour de la protection des données.',
        image: cnilLogo,
        imageAlt: 'Logo de la CNIL',
        href: 'https://www.cnil.fr/',
        linkLabel: 'Consulter le site de la CNIL',
      },
      {
        category: 'COMPÉTENCES NUMÉRIQUES',
        title: 'Pix',
        description: 'Attestation Pix ajoutée au portfolio.',
        image: pixLogo,
        imageAlt: 'Logo Pix',
        href: pixCertificate,
        linkLabel: 'Ouvrir l’attestation PDF',
      },
    ],
  },
  watch: {
    title: 'Veille technologique',
    eyebrow: 'OBSERVATION / EN COURS',
    intro: 'Cette rubrique est présente dans le portfolio de référence, mais son contenu reste à compléter.',
    cards: [
      {
        category: 'À COMPLÉTER',
        title: 'Sujet de veille à définir',
        description: 'Le sujet suivi, les sources et les analyses ne sont pas encore renseignés.',
        tags: ['Sujet', 'Sources', 'Synthèses'],
      },
    ],
  },
}

export default function PortfolioPage({ section }) {
  const navigate = useNavigate()
  const { playCancel, playConfirm } = useAudio()
  const page = PAGES[section] ?? PAGES.projects

  useGamepad((event) => {
    if (event.key === 'ArrowLeft' || event.key === 'Escape' || event.key === 'Backspace') {
      playCancel()
      navigate('/menu')
    }
  })

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'ArrowLeft' || event.key === 'Escape' || event.key === 'Backspace') {
        playCancel()
        navigate('/menu')
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [navigate, playCancel])

  return (
    <div id="menu-screen" className="portfolio-page">
      <video src={background} autoPlay loop muted playsInline />
      <BackToMenu />
      <main className="portfolio-panel">
        <header className="portfolio-heading">
          <p>{page.eyebrow}</p>
          <h1>{page.title}</h1>
          <div className="portfolio-intro">{page.intro}</div>
        </header>
        <section className="portfolio-grid" aria-label={page.title}>
          {page.cards.map((card) => (
            <article className="portfolio-card" key={card.title}>
              {card.image && (
                <div className="portfolio-image-row">
                  <img src={card.image} alt={card.imageAlt} />
                  {card.secondImage && <img src={card.secondImage} alt={card.secondImageAlt} />}
                </div>
              )}
              <p className="portfolio-category">{card.category}</p>
              <h2>{card.title}</h2>
              <p className="portfolio-description">{card.description}</p>
              {card.tags && (
                <ul className="portfolio-tags">
                  {card.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
              )}
              {card.href && (
                <a href={card.href} target="_blank" rel="noreferrer" onClick={playConfirm}>
                  {card.linkLabel} <span aria-hidden="true">↗</span>
                </a>
              )}
            </article>
          ))}
        </section>
        <div className="portfolio-back-hint"><span>ESC / ←</span> RETOUR AU MENU</div>
      </main>
      <style>{`
        .portfolio-page { background: #04152f; }
        .portfolio-page::after { content: ''; position: absolute; inset: 0; background: rgba(2, 9, 24, .45); pointer-events: none; }
        .portfolio-panel { position: absolute; z-index: 2; inset: 7vh 6vw 150px; overflow: auto; padding: clamp(20px, 4vw, 48px); color: #f5fbff; background: rgba(4, 17, 47, .93); border-left: 6px solid #22d7ee; box-shadow: 14px 14px 0 rgba(0, 0, 0, .35); }
        .portfolio-heading p, .portfolio-category { color: #65e9ff; font: 700 13px 'Bebas Neue', sans-serif; letter-spacing: 2px; }
        .portfolio-heading h1 { margin: 8px 0 14px; color: white; font: italic 64px/.95 Anton, sans-serif; text-transform: uppercase; }
        .portfolio-intro { max-width: 760px; margin-bottom: 28px; color: #d3e6f4; font: 18px/1.5 'Montserrat', sans-serif; }
        .portfolio-grid { display: grid; grid-template-columns: 1fr; gap: 20px; }
        .portfolio-card { min-width: 0; min-height: 190px; padding: 24px; background: linear-gradient(145deg, rgba(15, 39, 82, .96), rgba(7, 24, 57, .96)); border: 1px solid rgba(103, 226, 255, .24); border-bottom: 3px solid #087ab3; }
        .portfolio-card h2 { margin: 7px 0 10px; color: white; font: 28px/1.05 Anton, sans-serif; text-transform: uppercase; }
        .portfolio-description { color: #d6e5f1; font: 15px/1.55 'Montserrat', sans-serif; }
        .portfolio-image-row { display: flex; gap: 8px; height: clamp(200px, 30vh, 320px); margin: -24px -24px 20px; overflow: hidden; background: #0b2950; }
        .portfolio-image-row img { width: 100%; min-width: 0; height: 100%; object-fit: contain; }
        .portfolio-image-row img + img { border-left: 2px solid #22d7ee; }
        .portfolio-tags { display: flex; flex-wrap: wrap; gap: 7px; padding: 0; margin: 16px 0 0; list-style: none; }
        .portfolio-tags li { padding: 4px 8px; color: #0b1830; background: #7defff; font: 700 12px 'Bebas Neue', sans-serif; }
        .portfolio-card a { display: inline-block; margin-top: 16px; color: #8af2ff; font: 700 14px 'Bebas Neue', sans-serif; text-transform: uppercase; }
        .portfolio-back-hint { display: flex; justify-content: flex-end; gap: 9px; margin-top: 24px; color: rgba(255,255,255,.55); font: 13px 'Bebas Neue', sans-serif; letter-spacing: 1px; }
        .portfolio-back-hint span { color: #7defff; }
        @media (max-width: 680px) { .portfolio-panel { inset: 62px 4vw 140px; padding: 20px; } .portfolio-heading h1 { font-size: 42px; } .portfolio-intro { font-size: 15px; } .portfolio-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  )
}