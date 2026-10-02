import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/AboutSection'
import Expertise from './components/Expertise'
import Experience from './components/Experience'
import Works from './components/Works'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <main className="relative bg-[#000000]">
      <Navbar />
      <Hero />
      <About />
      <Expertise />
      <Experience />
      <Works />
      <Contact />
      <Footer />
    </main>
  )
}

export default App
