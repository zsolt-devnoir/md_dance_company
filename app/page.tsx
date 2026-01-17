"use client";

import { useState, useEffect } from "react";
import Hero from "./components/sections/Hero";
import Intro from "./components/sections/Intro";
import Partners from "./components/sections/Partners";
import Services from "./components/sections/Services";
import Projects from "./components/sections/Projects";
import About from "./components/sections/About";
import Contact from "./components/sections/Contact";
import Navigation from "./components/ui/Navigation";
import Footer from "./components/ui/Footer";
import LoadingScreen from "./components/ui/LoadingScreen";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <Navigation />
      <main>
        <Hero isLoading={isLoading} />
        <Intro />
        <Partners />
        <Services />
        <Projects />
        <About />
        {/* <SocialLinks /> */}
        <Contact />
      </main>
      <Footer />
    </>
  );
}
