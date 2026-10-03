import { Link, Route, Routes } from 'react-router-dom';
import CookieBanner from './components/CookieBanner';
import { openCookieSettings } from './lib/consent';
import Home from './pages/Home';
import Reservar from './pages/Reservar';
import MisReservas from './pages/MisReservas';
import Admin from './pages/Admin';
import Privacidad from './pages/Privacidad';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-zinc-800 px-4 py-3 flex items-center justify-between max-w-5xl w-full mx-auto">
        <Link to="/" className="font-title font-black text-green-400 text-lg">LA BASE 420</Link>
        <nav className="flex gap-4 text-sm">
          <Link to="/reservar" className="hover:text-green-400">Reservar</Link>
          <Link to="/mis-reservas" className="hover:text-green-400">Mis reservas</Link>
        </nav>
      </header>
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reservar" element={<Reservar />} />
          <Route path="/mis-reservas" element={<MisReservas />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/privacidad" element={<Privacidad />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <footer className="border-t border-zinc-800 px-4 py-6 text-sm text-zinc-400 flex flex-wrap gap-x-6 gap-y-2 justify-center">
        <Link to="/privacidad" className="underline">Privacidad y aviso legal</Link>
        <button onClick={openCookieSettings} className="underline">Configurar cookies</button>
        <span>© LA BASE 420 SL</span>
      </footer>
      <CookieBanner />
    </div>
  );
}
