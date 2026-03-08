import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import GlobalPresence from './pages/Globalpresence'
import BusinessServices from './pages/verticals/BusinessServices'
import MavenAiTech from './pages/verticals/MavenAiTech'
import Contractors from './pages/verticals/Contractors'
import ECommerce from './pages/verticals/ECommerce'
import Impact from './pages/Impact'
import Investors from './pages/Investors'
import Initiative from './pages/Initiative'
import Contact from './pages/Contact'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/presence" element={<GlobalPresence />} />
        <Route path="/verticals/business-services" element={<BusinessServices />} />
        <Route path="/verticals/mavenaitech" element={<MavenAiTech />} />
        <Route path="/verticals/contractors" element={<Contractors />} />
        <Route path="/verticals/ecommerce" element={<ECommerce />} />
        <Route path="/impact" element={<Impact />} />
        <Route path="/investors" element={<Investors />} />
        <Route path="/initiative" element={<Initiative />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App