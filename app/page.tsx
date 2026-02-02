import Button from '@/components/ui/Button';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import Portfolio from '@/components/sections/Portfolio';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';

export default function Home() {
    return (
        <main>
            <Hero />
            <About />
            <Services />
            <Portfolio />
            <Contact />
            <Footer />
        </main>
    );
}
