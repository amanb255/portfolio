import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import Navigation from "./components/Navigation";
import ThemeToggle from "./components/ThemeToggle";
import Hero from "./components/Hero";
import Expertise from "./components/Expertise";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Articles from "./components/Articles";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Contact from "./components/Contact";
import "./styles/global.css";

function App() {
  useEffect(() => {
    // Set initial theme from localStorage or default to light
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  return (
    <div className="app">
      <ThemeToggle />
      <Navigation />
      <Analytics />
      <main>
        <Hero />
        <Expertise />
        <Projects />
        <Experience />
        <Skills />
        <Education />
        {/* <Articles /> */}
        <Contact />
      </main>
    </div>
  );
}

export default App;
