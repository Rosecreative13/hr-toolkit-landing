import './index.css'
import Header from './components/Header'
import Hero from './components/Hero'
import ProgrammeSummary from './components/ProgrammeSummary'
import Why from './components/Why'
import Pains from './components/Pains'
import Receive from './components/Receive'
import Map from './components/Map'
import HowItWorks from './components/HowItWorks'
import NotAbout from './components/NotAbout'
import { BenefitsSME, BenefitsYouth } from './components/Benefits'
import LanguagesMaterials from './components/LanguagesMaterials'
import Confidentiality from './components/Confidentiality'
import FAQ from './components/FAQ'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProgrammeSummary />
        <Why />
        <Pains />
        <Receive />
        <Map />
        <HowItWorks />
        <NotAbout />
        <BenefitsSME />
        <BenefitsYouth />
        <LanguagesMaterials />
        <Confidentiality />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}

export default App
