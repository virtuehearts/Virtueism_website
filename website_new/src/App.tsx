import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Principles from './components/Principles';
import Mya from './components/Mya';
import Founder from './components/Founder';
import Join from './components/Join';
import FAQ from './components/FAQ';
import Roadmap from './components/Roadmap';
import Treasury from './components/Treasury';
import Footer from './components/Footer';
import Privacy from './components/Privacy';
import Terms from './components/Terms';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'privacy' | 'terms'>('home');

  // Handle hash-based navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#privacy') {
        setCurrentPage('privacy');
        window.scrollTo(0, 0);
      } else if (hash === '#terms') {
        setCurrentPage('terms');
        window.scrollTo(0, 0);
      } else {
        setCurrentPage('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Render Privacy Page
  if (currentPage === 'privacy') {
    return (
      <div className="relative">
        <div className="stars" />
        <Privacy />
      </div>
    );
  }

  // Render Terms Page
  if (currentPage === 'terms') {
    return (
      <div className="relative">
        <div className="stars" />
        <Terms />
      </div>
    );
  }

  // Render Home Page
  return (
    <div className="relative">
      {/* Background stars */}
      <div className="stars" />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        <Hero />
        <About />
        <Principles />
        <Mya />
        <Founder />
        <Join />
        <FAQ />
        <Roadmap />
        <Treasury />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
