import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Contact from './sections/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-background text-text-primary antialiased relative selection:bg-neutral-800 selection:text-white dark:selection:bg-white dark:selection:text-neutral-950 transition-colors duration-200">
        {/* Subtle background ambient glow */}
        <div className="ambient-glow" aria-hidden="true" />

        {/* Translucent sticky navbar */}
        <Navbar />

        {/* Main Content Area */}
        <main id="main-content" className="flex-1 w-full relative z-10">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
}
