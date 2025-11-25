import Hero from './components/sections/Hero';
import Intro from './components/sections/Intro';
import Partners from './components/sections/Partners';
import Services from './components/sections/Services';
import Projects from './components/sections/Projects';
import About from './components/sections/About';
import SocialLinks from './components/sections/SocialLinks';
import Contact from './components/sections/Contact';
import Navigation from './components/ui/Navigation';
import Footer from './components/ui/Footer';
import LoadingScreen from './components/ui/LoadingScreen';

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Navigation />
      <main>
        <Hero />
        <Intro />
        <Partners />
        <Services />
        <Projects />
        <About />
        <SocialLinks />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
