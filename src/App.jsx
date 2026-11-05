import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { AudioProvider } from './AudioProvider'
import menuVideo from './assets/main1.mp4'
import main2 from './assets/main1.mp4'
import P3Menu from './P3Menu'
import PageTransition from './PageTransition'
import Socials from './Socials'
import ResumePage from './ResumePage'
import PortfolioPage from './PortfolioPage'
import Loading from './Loading'
import './App.css'

function MenuScreen() {
  const navigate = useNavigate()

  return (
    <div id="menu-screen">
      <video src={menuVideo} autoPlay loop muted playsInline />
      <P3Menu onNavigate={(page) => navigate(`/${page}`)} />
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition><Loading /></PageTransition>
        } />
        <Route path="/menu" element={
          <PageTransition><MenuScreen /></PageTransition>
        } />
        <Route path="/resume" element={
          <PageTransition variant="resume"><ResumePage src={main2} /></PageTransition>
        } />
        <Route path="/projects" element={
          <PageTransition><PortfolioPage section="projects" /></PageTransition>
        } />
        <Route path="/experience" element={
          <PageTransition><PortfolioPage section="experience" /></PageTransition>
        } />
        <Route path="/passions" element={
          <PageTransition><PortfolioPage section="passions" /></PageTransition>
        } />
        <Route path="/certifications" element={
          <PageTransition><PortfolioPage section="certifications" /></PageTransition>
        } />
        <Route path="/watch" element={
          <PageTransition><PortfolioPage section="watch" /></PageTransition>
        } />
        <Route path="/socials" element={
          <PageTransition variant="socials"><Socials /></PageTransition>
        } />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <AudioProvider>
      <AnimatedRoutes />
    </AudioProvider>
  )
}
