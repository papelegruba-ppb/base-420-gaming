import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Experience from '@/components/Experience';
import Consoles from '@/components/Consoles';
import Gallery from '@/components/Gallery';
import ReservationForm from '@/components/ReservationForm';
import Footer from '@/components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-ink-900 text-white">
      <Navbar />
      <main>
        <Hero />
        <Experience />
        <Consoles />
        <Gallery />
        <ReservationForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;
